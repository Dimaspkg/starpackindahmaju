import nodemailer from 'nodemailer';
import pool from './db';

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: parseInt(process.env.SMTP_PORT || '587'),
  secure: process.env.SMTP_SECURE === 'true',
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

async function getSettings() {
  try {
    const [rows] = await pool.execute('SELECT setting_key, setting_value FROM settings');
    return (rows as any[]).reduce((acc, row) => {
      acc[row.setting_key] = row.setting_value;
      return acc;
    }, {});
  } catch (error) {
    return {};
  }
}

export function getEmailTemplate(data: {
  name: string;
  company?: string;
  email: string;
  phone?: string;
  interest: string;
  message: string;
  footer?: string;
  senderName?: string;
}) {
  const { name, company, email, phone, interest, message, footer, senderName } = data;
  const logoUrl = `${process.env.NEXTAUTH_URL || 'http://localhost:3000'}/logo_starpack.png`;

  return `
    <div style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; max-width: 600px; margin: 0 auto; background-color: #f9f9f9; padding: 20px; color: #333;">
      <div style="background-color: #ffffff; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 10px rgba(0,0,0,0.05); border: 1px solid #eeeeee;">
        <!-- Header -->
        <div style="background-color: #ffffff; padding: 30px; text-align: center; border-bottom: 1px solid #eeeeee;">
          <img src="${logoUrl}" alt="PT. STARPACK INDAHMAJU" style="max-height: 40px; width: auto;" />
        </div>
        
        <!-- Content -->
        <div style="padding: 30px;">
          <h2 style="color: #111111; margin-top: 0; font-size: 20px; border-bottom: 2px solid #ff0000; padding-bottom: 10px; display: inline-block;">New Lead Notification</h2>
          <p style="color: #666; font-size: 14px; margin-top: 15px;">You have received a new inquiry from the website contact form.</p>
          
          <table style="width: 100%; border-collapse: collapse; margin-top: 20px;">
            <tr>
              <td style="padding: 10px 0; border-bottom: 1px solid #eee; color: #888; font-size: 13px; width: 120px;">Customer Name</td>
              <td style="padding: 10px 0; border-bottom: 1px solid #eee; color: #111; font-weight: 600;">${name}</td>
            </tr>
            <tr>
              <td style="padding: 10px 0; border-bottom: 1px solid #eee; color: #888; font-size: 13px;">Company</td>
              <td style="padding: 10px 0; border-bottom: 1px solid #eee; color: #111;">${company || '—'}</td>
            </tr>
            <tr>
              <td style="padding: 10px 0; border-bottom: 1px solid #eee; color: #888; font-size: 13px;">Email Address</td>
              <td style="padding: 10px 0; border-bottom: 1px solid #eee; color: #ff0000; font-weight: 500;">${email}</td>
            </tr>
            <tr>
              <td style="padding: 10px 0; border-bottom: 1px solid #eee; color: #888; font-size: 13px;">WhatsApp / Phone</td>
              <td style="padding: 10px 0; border-bottom: 1px solid #eee; color: #111;">${phone || '—'}</td>
            </tr>
            <tr>
              <td style="padding: 10px 0; border-bottom: 1px solid #eee; color: #888; font-size: 13px;">Product Interest</td>
              <td style="padding: 10px 0; border-bottom: 1px solid #eee; color: #111;"><span style="background-color: #f0f0f0; padding: 2px 8px; border-radius: 4px; font-size: 12px;">${interest}</span></td>
            </tr>
          </table>
          
          <div style="margin-top: 30px;">
            <p style="font-size: 13px; color: #888; margin-bottom: 10px;">Message Details:</p>
            <div style="background-color: #f5f5f5; padding: 20px; border-radius: 8px; font-size: 14px; line-height: 1.6; color: #444; border-left: 4px solid #ff0000;">
              ${message.replace(/\n/g, '<br/>')}
            </div>
          </div>
                    <div style="margin-top: 30px;">
              <p style="font-size: 13px; color: #888; margin-bottom: 15px;">Quick Actions:</p>
              <div style="display: flex; gap: 10px;">
                <a href="https://wa.me/${phone?.replace(/\D/g, '').replace(/^0/, '62')}" style="flex: 1; text-align: center; background-color: #25D366; color: #ffffff; padding: 10px; border-radius: 6px; text-decoration: none; font-weight: 600; font-size: 13px; display: inline-block;">
                  Chat via WhatsApp
                </a>
                <a href="mailto:${email}" style="flex: 1; text-align: center; background-color: #111111; color: #ffffff; padding: 10px; border-radius: 6px; text-decoration: none; font-weight: 600; font-size: 13px; display: inline-block; margin-left: 10px;">
                  Reply via Email
                </a>
              </div>
            </div>

            <div style="margin-top: 20px; text-align: center;">
              <a href="${process.env.NEXTAUTH_URL || 'http://localhost:3000'}/admin/leads" style="display: inline-block; color: #ff0000; text-decoration: underline; font-weight: 600; font-size: 13px;">View in Admin Dashboard</a>
            </div>
        </div>
        
        <!-- Footer -->
        <div style="background-color: #f0f0f0; padding: 20px; text-align: center; border-top: 1px solid #eeeeee;">
          <p style="margin: 0; font-size: 12px; color: #999;">${footer || ''}</p>
          <p style="margin: 5px 0 0 0; font-size: 11px; color: #bbb;">&copy; 2026 PT. Starpack Indahmaju. All rights reserved.</p>
        </div>
      </div>
    </div>
  `;
}

export async function sendInquiryEmail(data: {
  name: string;
  company?: string;
  email: string;
  phone?: string;
  interest: string;
  message: string;
}) {
  const settings = await getSettings();
  
  if (settings.email_routing_enabled === 'false') {
    return;
  }

  const { name, company, email, phone, interest, message } = data;
  const recipient = settings.notification_recipient || process.env.SMTP_TO || process.env.SMTP_USER;
  const senderName = settings.smtp_sender_name || "Starpack Web Inquiry";
  const footer = settings.email_footer || "";

  const mailOptions = {
    from: `"${senderName}" <${process.env.SMTP_FROM}>`,
    to: recipient,
    subject: `🚀 New Inquiry: ${name} - ${interest}`,
    text: `New Inquiry from ${name}\n\nName: ${name}\nCompany: ${company || 'N/A'}\nEmail: ${email}\nPhone: ${phone || 'N/A'}\nInterest: ${interest}\n\nMessage:\n${message}\n\n---\n${footer}`,
    html: getEmailTemplate({ ...data, footer, senderName }),
  };

  return await transporter.sendMail(mailOptions);
}
