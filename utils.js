const nodemailer = require("nodemailer");
const fs = require("fs");
const pdf = require('pdfjs');
const cheerio = require('cheerio');
const winston = require('winston');


const mailTransporter = nodemailer.createTransport({
  host: process.env.SMTP_MAIL_HOST || "smtp.forwardemail.net",
  port: process.env.SMTP_MAIL_HOST || 465,
  secure: true,
  auth: {
    // TODO: replace `user` and `pass` values from cpanel
    user: process.env.SMTP_MAIL_USER,
    pass: process.env.SMTP_MAIL_PASSWORD,
  },
});


// Create a logger with a file transport

// const logger = winston.createLogger({
//   transports: [
//     new winston.transports.File({ filename: `${process.cwd()}/server-logs.log` })
//   ]
// });


// async..await is not allowed in global scope, must use a wrapper
async function sendMail({user, attachments}) {
  
  const message = `
    ${user} has placed a new order for ${breweryName} from ${supplierName}. 
    Please print and replace your Ordered Beers List.
    ${pdfFile}
  `

  try{
    // send mail with defined transport object
    const mail = await transporter.sendMail({
      from: `"University Of Beer" <${senderMail}>`,
      to: '', // list of receivers
      subject: `${user} Just Placed A New Beer Order!`,
      text: message,
      attachments // Array.of {filename: 'filename.txt/jpg/pdf/csv', content: "file data"}
    });
    console.log("Message sent: %s", mail.messageId)
  }catch(err){
    console.error()
  }
}

// async..await is not allowed in global scope, must use a wrapper
async function sendTestMail({user, attachments}) {
  
  const message = `
    This is a test email
  `

  try{
    // send mail with defined transport object
    const mail = await transporter.sendMail({
      from: `"University Of Beer" <no-reply@beer.binsoft.online>`,
      to: '', // list of receivers
      subject: `Just Placed A New Beer Order!`,
      text: message,
      attachments // Array.of {filename: 'filename.txt/jpg/pdf/csv', content: "file data"}
    });
    console.log("Message sent: %s", mail.messageId)
    return mail.messageId
  }catch(err){
    console.error(err)
    throw err
  }
}


// Function to log messages in a structured format
// function logError(error, origin) {
//   const timestamp = new Date().toISOString();
//   const logMessage = `
//     ---------------- Error -------------------------
//     Timestamp: [${timestamp}]
//     Error: ${error.stack || error.message || error}
//     Origin: ${origin || "Origin not specified"}
//     ------------------------------------------------
//     \n\n
//   `;
//   logger.error(logMessage);
// }


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

  
  // text -> pdf body
  
  doc.text("Here are the latest order\n", 0, 0, {
    alignment: 'center',
    fontSize: 20,
    paddingBottom: 10,
    textAlign: 'center'
  });

  // pdf Header
  doc.table({
    width: 500,
    padding: 10,
    backgroundColor: '#000',
    color: '#fff',
    widths: ['*'],
    lineHeight: 2,
  })
  .header({
    paddingBottom: 10,
    paddingTop: 10
  })
  .cell(
    "If a keg doesn't come in or if something arrives that is not on this list, call Bob Janis immediately (916)759-7739"
  )


  // create the table 
  const table = doc.table({
    widths: [30, 70, 70, 70, 70, 70, 70,],
    borderWidth: 1,
    width: 700,    
    padding: 5,
  });
  
  // The table header
  const th = table.header()
  th.cell('S/N')
  th.cell('Expected Delivery Date')
  th.cell('Supplier')
  th.cell('Beer Name')
  th.cell('Price Per Keg')
  th.cell('Brewery')
  th.cell('Keg Size')

  // INFO: write the rows of ordered items
  if (data){
    for(let item of data.orderedItems){
      const row = table.row();
      row.cell(item.name)
      row.cell(item.type)
      row.cell(item.supplier)
      row.cell(item.brewery)
      row.cell(item.arrival_date)
      row.cell(item.keg_size)
      row.cell(item.price_per_keg)
    }
  }else{

  }
  doc.end(); // stop editing
  return fname
}


function htmlToText(htmlMessage) {
  // Load the HTML into cheerio
  const $ = cheerio.load(htmlMessage, isDocument=false);

  // Extract the text content
  const textContent = $('body').text();
  return textContent;
}


module.exports = {
  sendMail,
  mailTransporter,
  readFile,
  makePDF,
//  logError,
  sendTestMail,
  htmlToText,
}

