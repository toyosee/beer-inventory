const nodemailer = require("nodemailer");
const fs = require("fs");

export const transporter = nodemailer.createTransport({
  host: process.env.SMTP_MAIL_HOST || "smtp.forwardemail.net",
  port: process.env.SMTP_MAIL_HOST || 465,
  secure: true,
  auth: {
    // TODO: replace `user` and `pass` values from <https://forwardemail.net>
    user: process.env.SMTP_MAIL_USER,
    pass: process.env.SMTP_MAIL_PASSWORD,
  },
});

// async..await is not allowed in global scope, must use a wrapper
export async function sendMail({ senderName, senderMail, recipients, subject, body, html, attachments }) {
  // send mail with defined transport object
  const mail = await transporter.sendMail({
    from: `"${senderName}" <${senderMail}>`,
    to: recipients, // list of receivers
    subject,
    text: body,
    html,
    attachments, // Array.of {filename: 'filename.txt/jpg/pdf/csv', content: "file data"}
  });

  console.log("Message sent: %s", mail.messageId);
  // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>
}


export async function readFile(fname){
  fs.readFile(fname, 'utf-8', (err, data) => {
    if (err){
      throw err
    }
  
    return data 
  })
}

module.exports = {
  sendMail,
  mailTransporter,
  readFile,
}

