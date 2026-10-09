// api/send-otp.js
import nodemailer from 'nodemailer';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  const { email, code } = req.body;

  if (!email || !code) {
    return res.status(400).json({ error: 'Email and Code are required.' });
  }

  // Ensure environment variables are loaded
  if (!process.env.GMAIL_USER || !process.env.GMAIL_APP_PASS) {
    return res.status(500).json({ error: 'Missing Gmail SMTP credentials in Vercel settings.' });
  }

  const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 465,
    secure: true, // Use TLS
    auth: {
      user: process.env.GMAIL_USER,
      pass: process.env.GMAIL_APP_PASS,
    },
    connectionTimeout: 10000, // 10s timeout
  });

  try {
    await transporter.sendMail({
      from: `"Collab Security" <${process.env.GMAIL_USER}>`,
      to: email,
      subject: `Your Collab Verification Code: ${code}`,
      html: `
        <div style="font-family: Arial, sans-serif; background: #0a0a0c; color: #fff; padding: 2rem; border-radius: 10px; max-width: 480px; margin: 0 auto;">
          <h2 style="color: #0f62fe;">Collab Verification</h2>
          <p>Use the following 6-digit code to verify your account registration:</p>
          <div style="font-size: 2rem; font-weight: 800; letter-spacing: 0.2em; color: #fff; background: #141418; padding: 1rem; border-radius: 8px; text-align: center; margin: 1.5rem 0;">
            ${code}
          </div>
          <p style="color: #a0a0ab; font-size: 0.85rem;">If you did not request this code, please ignore this email.</p>
          <hr style="border-color: #2a2a32; margin-top: 2rem;" />
          <p style="color: #60606a; font-size: 0.75rem; text-align: center;">
            © Copyright (c) Collab Design 2026. A Convex Company. All rights reserved.
          </p>
        </div>
      `,
    });

    return res.status(200).json({ success: true, message: 'Verification email sent.' });
  } catch (error) {
    console.error('SMTP Error:', error);
    return res.status(500).json({ error: error.message || 'Failed to send email via SMTP.' });
  }
}
