const nodemailer = require('nodemailer');
  //let name;
  const transporter = nodemailer.createTransport({
    service: "Gmail",
    host: "smtp.gmail.com",
    port: 465,
    secure: false, // Use `true` for port 465, `false` for all other ports
    auth: {
      user: "testlalit81@gmail.com",
      pass: "xieqvjhgjgxgxtpq",
    },
  });
  let name;


 function gethtml() {
    return  html=`
    <!DOCTYPE html>
    <html>
    <head>
    <style>
          body {
              font-family: Arial, sans-serif;
              color: #333333;
          }
          .content {
            padding: 20px;
        }
        a {
          color: #0066cc;
      }
    </style>
  
    </head>
    <body>
      <div class="content">
        <h3>Hi ${name},</h3>
        <p>Your Leave Application has been applied Sccessufully!!</p>
        <p>For more information, visit our <a href="https://iris.nitk.ac.in/hrms">website</a>.</p>
        <p>Best regards,<br>
        The IRIS Team</p>
      </div>
    </body>
    </html>
  `
  };
  function getmailData(){
    return mailOptions = {
      from: "testlalit81@gmail.com",
      to: "lalitver10@gmail.com",
      subject: "Leave Application has been Applied Successfully!!",
      text: "This is a test email sent using Nodemailer.",
      html:gethtml(),
    };
  }


// Send email
async function sentMail(nam){
  name=nam;
  const mailData=getmailData();
 const data= await transporter.sendMail(mailData, (error, info) => {
    if (error) {
        return console.log(error);
    }
  });
}
module.exports = {
    sentMail
  };