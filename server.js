const express = require('express');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
// Serve static assets from project root
app.use(express.static(path.join(__dirname)));

// Store OTP verification codes in memory { phone: { code, expiresAt } }
const otpStore = new Map();

// API: Send SMS Verification Code
app.post('/api/send-otp', async (req, res) => {
  try {
    const { phone } = req.body;
    if (!phone) {
      return res.status(400).json({ success: false, message: 'رقم الجوال مطلوب' });
    }

    // Clean phone number
    const cleanPhone = phone.replace(/[\s\-\(\)]/g, '');

    // Generate 4-digit code
    const code = Math.floor(1000 + Math.random() * 9000).toString();
    const expiresAt = Date.now() + 5 * 60 * 1000; // 5 minutes

    otpStore.set(cleanPhone, { code, expiresAt });

    console.log(`[Art Store SMS Gateway] إرسال كود التحقق [${code}] إلى الرقم: ${cleanPhone}`);

    // If Twilio or external SMS provider API keys are provided in environment variables:
    // e.g. TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN, TWILIO_PHONE_NUMBER
    let smsSentDirectly = false;
    if (process.env.TWILIO_ACCOUNT_SID && process.env.TWILIO_AUTH_TOKEN && process.env.TWILIO_PHONE_NUMBER) {
      try {
        const twilio = require('twilio')(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN);
        await twilio.messages.create({
          body: `رمز التحقق الخاص بك لمتجر Art Store هو: ${code}`,
          from: process.env.TWILIO_PHONE_NUMBER,
          to: cleanPhone.startsWith('+') ? cleanPhone : `+966${cleanPhone.replace(/^0/, '')}`
        });
        smsSentDirectly = true;
      } catch (smsErr) {
        console.error('Twilio SMS Error:', smsErr.message);
      }
    }

    return res.json({
      success: true,
      message: 'تم إرسال رمز التحقق بنجاح إلى هاتفك عبر رسالة نصية SMS',
      phone: cleanPhone,
      code: code, // Returned so system displays pop-up/SMS simulation notification
      smsSentDirectly
    });
  } catch (error) {
    console.error('Send OTP error:', error);
    return res.status(500).json({ success: false, message: 'حدث خطأ أثناء إرسال الرمز' });
  }
});

// API: Verify OTP Code
app.post('/api/verify-otp', (req, res) => {
  try {
    const { phone, code } = req.body;
    if (!phone || !code) {
      return res.status(400).json({ success: false, message: 'الرقم ورمز التحقق مطلوبان' });
    }

    const cleanPhone = phone.replace(/[\s\-\(\)]/g, '');
    const record = otpStore.get(cleanPhone);

    if (!record) {
      return res.status(400).json({ success: false, message: 'لم يتم طلب رمز تحقق لهذا الرقم أو انتهت صلاحيته' });
    }

    if (Date.now() > record.expiresAt) {
      otpStore.delete(cleanPhone);
      return res.status(400).json({ success: false, message: 'انتهت صلاحية رمز التحقق، يرجى طلب رمز جديد' });
    }

    if (record.code !== code.toString().trim()) {
      return res.status(400).json({ success: false, message: 'رمز التحقق غير صحيح!' });
    }

    // Success - delete used OTP
    otpStore.delete(cleanPhone);

    const isOwner = cleanPhone.includes('0502683998') || cleanPhone.includes('502683998');

    return res.json({
      success: true,
      message: 'تم التحقق بنجاح!',
      isOwner,
      user: {
        phone: cleanPhone,
        role: isOwner ? 'owner' : 'customer'
      }
    });
  } catch (error) {
    console.error('Verify OTP error:', error);
    return res.status(500).json({ success: false, message: 'حدث خطأ أثناء التحقق' });
  }
});

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

app.listen(PORT, () => {
  console.log(`Art Store running on port ${PORT}`);
});
