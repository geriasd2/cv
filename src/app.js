const express = require("express")
const path = require("path")
const app = express()
var nodemailer = require('nodemailer');

app.use(express.static(path.join(__dirname + "/pages")));

app.get("/", function(req, res) {
    res.sendFile(path.join(__dirname + "/pages/index.html"));
});

app.post('/mailme', function (req, res) {
    emailMe({
        "from": process.env.MailServiceAccount,
        "subject": "test",
        "text": "gfdvgz"
    })
    res.end("done")
    });

app.listen(3000, () => console.log("Example app listening on port 3000!"))

function emailMe(email_object){
    var transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: email_object.from,
          pass: process.env.MailServiceAccountPw
        }
      });
      
      var mailOptions = {
        from: email_object.from,
        to: process.env.Recipient,
        subject: email_object.subject,
        text: email_object.text
      };
      
      transporter.sendMail(mailOptions, function(error, info){
        if (error) {
          console.log(error);
        } else {
          console.log('Email sent: ' + info.response);
        }
      });
}
