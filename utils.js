const nodemailer = require("nodemailer");
const fs = require("fs");
// const PDFDocument = require('pdfkit');
const pdf = require('pdfjs');


const mailTransporter = nodemailer.createTransport({
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
async function sendMail({ senderName, senderMail, recipients, subject, body, html, attachments }) {
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


async function readFile(fname){
  fs.readFile(fname, 'utf-8', (err, data) => {
    if (err){
      throw err
    }
  
    return data 
  })
}

function makePDF(data){
  let now;
  now = Date.now().toString().split(' T')
  now = now[0]
  const fname = `${process.cwd()}/files/beer-order-${now}.pdf`;
  const doc = new pdf.Document({
    font:    require('pdfjs/font/Helvetica'),
    padding: 20,
    fontSize: 8
  })
  doc.pipe(fs.createWriteStream(fname))

  // pdf Header
  const header = doc.header().text("Beer Order List to Brewery")

  // text -> pdf body
  doc.text("Here are the latest order", {
    alignment: 'center',
    fontSize: 10,
  })

  const table = doc.table({
    widths: [70, 70, 70, 70, 70, 70, 70],
    borderWidth: 1,
    width: 700,    
    padding: 5,
  })
  
  const th = table.header()

  th.cell('Beer Name')
  th.cell('Supplier Name')
  th.cell('Brewery')
  th.cell('Arrival Date')
  th.cell('Keg Size')
  th.cell('Price Per Keg')
  th.cell('Number of Kegs ordered')

  
  for(let item of data.orderedItems){
    const row = table.row()
    row.cell(item.name)
    row.cell(item.keg_size)
    // other cols
  }
  
  doc.end(); // stop editing
  return fname
}

module.exports = {
  sendMail,
  mailTransporter,
  readFile,
  makePDF,
}

