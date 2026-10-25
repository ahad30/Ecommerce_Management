const nodemailer = require("nodemailer");

class SendEmailUtility {
  constructor() {
    this.transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: Number(process.env.SMTP_PORT),
      secure: false,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
      tls: {
        rejectUnauthorized: false,
      },
    });
  }

  async sendEmail(emailTo, emailText, emailSubject) {
    try {
      const mailOptions = {
        from: process.env.MAIL_FROM,
        to: emailTo,
        subject: emailSubject,
        html: emailText,
      };

      return await this.transporter.sendMail(mailOptions);
    } catch (error) {
      console.error("Error sending email:", error);
      throw new Error("Failed to send email");
    }
  }
}

module.exports = new SendEmailUtility();
