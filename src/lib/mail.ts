import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: parseInt(process.env.SMTP_PORT || '587'),
  secure: process.env.SMTP_SECURE === 'true', // true for 465, false for other ports
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

export async function sendInquiryEmail(data: {
  name: string;
  company?: string;
  email: string;
  interest: string;
  message: string;
}) {
  const { name, company, email, interest, message } = data;

  const mailOptions = {
    from: `"Starpack Web Inquiry" <${process.env.SMTP_FROM}>`,
    to: process.env.SMTP_TO || process.env.SMTP_USER, // Send to owner
    subject: `New Inquiry from ${name} - ${interest}`,
    text: `
      New Inquiry Details:
      Name: ${name}
      Company: ${company || 'N/A'}
      Email: ${email}
      Interest: ${interest}
      
      Message:
      ${message}
    `,
    html: `
      <h3>New Inquiry Details</h3>
      <p><strong>Name:</strong> ${name}</p>
      <p><strong>Company:</strong> ${company || 'N/A'}</p>
      <p><strong>Email:</strong> ${email}</p>
      <p><strong>Interest:</strong> ${interest}</p>
      <br/>
      <p><strong>Message:</strong></p>
      <p>${message.replace(/\n/g, '<br/>')}</p>
    `,
  };

  return await transporter.sendMail(mailOptions);
}
