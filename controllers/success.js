const nodemailer = require('nodemailer');

const handleFormSubmit = (req, res, db) => {
    console.log(req.body);
     const {name, email, company, description} = req.body;

         db('contact').insert({
             name: name ,
             email: email,
             company: company,
             description: description
         })
       
         .catch(err => res.status(400).json('Unable to insert data into contact table.'))

         //Creating Email Template for User
         const notifyUser = `
         <body bgcolor="#FFFFFF">
			<table width="100%" cellpadding="0" cellspacing="0" border="0" bgcolor="#F0F8FC">
			<tr>
				<td>
					<table width="600" align="center" cellpadding="0" cellspacing="0" border="0" bgcolor="#ffffff">
					<tr>
						<td colspan="3"><a href="http://www.webpoint.io"><img 
							style="display:block;border:0;outline:none;-ms-interpolation-mode:bicubic;" 
							src="http://webpoint.io/dist/images/email-header.png" width="600" height="60" alt="Header" /></a>
						</td>
						<tr>
							<td>&nbsp</td>
						</tr>
					</tr>
					<tr>
						<td width="20"></td>
						<td style="font-family:Arial,Helvetica,sans-serif;font-size:14px;color:#000001;">
						<h3>Submission Successful</h3>
						 
                        <p>Thank you for contacting us. We will get back to you shortly.</p>
                        <p>&nbsp;</P>
					</tr>
					<tr>
						<td colspan="3"><a href="http://webpoint.io"><img 
							style="display:block;border:0;outline:none;-ms-interpolation-mode:bicubic;" 
							src="http://webpoint.io/dist/images/email-footer.png" width="600" height="60" alt="Footer" /></a>
						</td>
						<tr>
							<td>&nbsp</td>
						</tr>
					</tr>
					</table>
				</td>
			</tr>
		</table>
		 
		</body>
             `;

         //Creating Email Template for Admin
         const notifyAdmin = `
         <body bgcolor="#FFFFFF">
         <table width="100%" cellpadding="0" cellspacing="0" border="0" bgcolor="#F0F8FC">
         <tr>
             <td>
          
                 <table width="600" align="center" cellpadding="0" cellspacing="0" border="0" bgcolor="#ffffff">
                 <tr>
                     <td colspan="3"><a href="http://www.webpoint.io"><img 
                         style="display:block;border:0;outline:none;-ms-interpolation-mode:bicubic;" 
                         src="http://webpoint.io/dist/images/email-header.png" width="600" height="60" alt="Header" /></a>
                     </td>
                     <tr>
                         <td>&nbsp</td>
                     </tr>
                 </tr>
                 <tr>
                     <td width="20"></td>
                     <td style="font-family:Arial,Helvetica,sans-serif;font-size:14px;color:#000001;">
                     <p>You have a new contact request.</p>
                     <h3>Contact Details</h3>
                      
                     <ul>
                         <li>Name: ${req.body.name}</li>
                         <li>Email: ${req.body.name}</li>
                         <li>Company: ${req.body.name}</li>
                     </ul>
                     <h3>Message</h3>
                     <p>${req.body.description}</p>
                      
                     Best wishes,<br/>
                     The WebPoint Team
                     </td>
                     <tr>
                         <td>&nbsp;</td>
                     </tr>
                 </tr>
                 <tr>
                     <td colspan="3"><a href="http://webpoint.io"><img 
                         style="display:block;border:0;outline:none;-ms-interpolation-mode:bicubic;" 
                         src="http://webpoint.io/dist/images/email-footer.png" width="600" height="60" alt="Footer" /></a>
                     </td>
                     <tr>
                         <td>&nbsp</td>
                     </tr>
                 </tr>
                 </table>
             </td>
         </tr>
     </table>
      
     </body>
         `;
        // create reusable transporter object using the default SMTP transport
        let transporter = nodemailer.createTransport({
            host: "mail.webpoint.io",
            port: 587,
            secure: false, // true for 465, false for other ports
            auth: {
            user: 'noreply@webpoint.io', // generated ethereal user
            pass: '-GiqJG&0mime' // generated ethereal password
            },
            tls:{
                rejectUnauthorized:false
            }
        });

        // setup email data with unicode symbols for user
        let mailOptions = {
            from: '"webpoint.io" <noreply@webpoint.io>', // sender address
            to: req.body.email, // list of receivers
            subject: "Contact Request Submitted", // Subject line
            text: "Hello world?", // plain text body
            html: notifyUser // html body
        };

          // setup email data with unicode symbols for admin
          let mailOptions2 = {
            from: '"webpoint.io" <noreply@webpoint.io>', // sender address
            to: "manolsharma@icloud.com",// list of receivers
            subject: "Contact Request Submitted", // Subject line
            text: "Hello world?", // plain text body
            html: notifyAdmin // html body
        };

        // send mail with defined transport object for admin
        let info = transporter.sendMail(mailOptions, (error, info) => {
            if(error) {
                return console.log(error);
            }
            console.log("Message sent: %s", info.messageId);
        })

        // send mail with defined transport object for user
        let info2 = transporter.sendMail(mailOptions2, (error, info2) => {
            if(error) {
                return console.log(error);
            }
            console.log("Message sent: %s", info2.messageId);
        }) 
 }

module.exports = {
    handleFormSubmit : handleFormSubmit
};