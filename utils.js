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
async function sendMail({user, breweryName, supplierName, pdfFile}) {
  
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
      subject: `New ${supplierName} Beer Order Placed for ${breweryName}`,
      text: message,
      attachments: [
        {
          filename: `ordered-items-details.pdf`, content: ""
        }
      ], // Array.of {filename: 'filename.txt/jpg/pdf/csv', content: "file data"}
    });
    console.log("Message sent: %s", mail.messageId)
  }catch(err){
    console.error()
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

  // pdf Header
  const header = doc.header().text(`Beer Order List to Brewery: ${breweryName}`)

  // text -> pdf body
  doc.text("Here are the latest order", {
    alignment: 'center',
    fontSize: 10,
  })

  // create the table 
  const table = doc.table({
    widths: [70, 70, 70, 70, 70, 70, 70],
    borderWidth: 1,
    width: 700,    
    padding: 5,
  })
  
  // The table header
  const th = table.header()
  th.cell('Beer Name')
  th.cell('Beer Type')
  th.cell('Supplier')
  th.cell('Brewery')
  th.cell('Arrival Date')
  th.cell('Keg Size')
  th.cell('Price Per Keg')

  // INFO: write the rows of ordered items
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
  htmlToText,
}

