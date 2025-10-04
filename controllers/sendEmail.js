const nodemailer = require("nodemailer")
const {BadRequestError} = require("../errors")

const transporter = nodemailer.createTransport({
    service: "gmail",
    auth:{
        user:"hadjahmedbenferhat@gmail.com",
        pass: process.env.EMAIL_PASSWORD
    },

});


const sendEmail =  (email,firstName, lastName ,gender)=>{

    let abbreviation

    if (!email) {
        throw new BadRequestError('Please provide a phone number')
    }
    if (!gender) {
        throw new BadRequestError('Please give us your gender')
    }
    if (gender ==='f'||gender === 'F') {
        abbreviation = "Madame"      
    }
    if (gender ==='m'||gender === 'M') {
        abbreviation = "Mr"      
    }

    const mailOptions = {
      from: 'hadjahmedbenferhat@gmail.com',
      to: email,
      subject: 'DEMADE D\'ADHESION',
      html: `
        <div style="font-family: Arial, sans-serif; padding: 10px; border: 2px solid #ccc; border-radius: 10px;">
          <h1 style="text-align: center;">Bonjour ${firstName} ${lastName}!</h1>
          <p style="text-align: justify;">
            Nous sommes ravis de vous informer que votre inscription a été bien enregistrée!.
            Vous aurez une reponse de notre part trés bientot!
          </p>
        </div>
      `
    }

    transporter.sendMail(mailOptions, function(error, info){
        if (error) {
          throw new BadRequestError("email couldn't be sent")
        } else {
          res.status(200).json({msg:"email sent successfuly"})
        }
    });
}

// const sendAcceptenceEmail =  (email,name,username,password)=>{

//     // :let abbreviation

//     if (!email) {
//         throw new BadRequestError('Please provide a phone number')
//     }
//     if (!name) {
//         throw new BadRequestError('Please give us a username')
//     }
//     // if (gender ==='f'||gender === 'F') {//
//     //     abbreviation = "Madame"      
//     // }
//     // if (gender ==='m'||gender === 'M') {
//     //     abbreviation = "Mr"      
//     // }

//     const mailOptions = {
//         from: "hadjahmedbenferhat@gmail.com",
//         to: email,
//         subject: "FELICITATION DEMADE D'ADHESION RETENUE",
//         text: `bonjour /*abbreviation*/ ${name} nous tenons a vous informer que vous faites partie de notre communaute vous pouvez des maintenant acceder a votre espace via notre site en utilisant ces informations\nUsername: ${username} \nMot De Passe: ${password} `
//     }
  
//     transporter.sendMail(mailOptions, function(error, info){
//         if (error) {
//           throw new BadRequestError("email couldn't be sent")
//         } else {
//           res.status(200).json({msg:"email sent successfuly"})
//         }
//     });
// }
const sendAcceptenceEmail = (email, firstName, lastName, username, password) => {
    if (!email) {
      throw new BadRequestError('Veuillez inserer un Email');
    }
    if (!firstName) {
      throw new BadRequestError('Veuillez inserer un Prénom');
    }
    if (!lastName) {
      throw new BadRequestError('Veuillez inserer un Nom');
    }
  
    const mailOptions = {
      from: 'hadjahmedbenferhat@gmail.com',
      to: email,
      subject: 'FELICITATION DEMADE D\'ADHESION RETENUE',
      html: `
        <div style="font-family: Arial, sans-serif; padding: 10px; border: 2px solid #ccc; border-radius: 10px;">
          <h1 style="text-align: center;">Félicitations ${firstName} ${lastName}!</h1>
          <p style="text-align: justify;">
            Nous sommes ravis de vous informer que vous avez été accepté dans notre communauté.
            Vous pouvez maintenant accéder à votre espace en utilisant les informations de connexion suivantes :
          </p>
          <ul style="list-style-type: none; margin-left: 0; padding-left: 0;">
            <li><strong>Username:</strong> ${username}</li>
            <li><strong>Mot de passe:</strong> ${password}</li>
          </ul>
          <p style="text-align: center;">
            Nous sommes impatients de travailler avec vous et de vous aider à atteindre vos objectifs.
          </p>
          <p style="text-align: center;">
            Cordialement,<br>
            L'équipe de notre communauté
          </p>
        </div>
      `
    }
  
    transporter.sendMail(mailOptions, function(error, info) {
      if (error) {
        throw new BadRequestError('Email could not be sent')
      } else {
        res.status(200).json({msg: 'Email sent successfully'})
      }
    });
  }


  const sendSuppressionEmail = (email, firstName, lastName, /*gender*/) => {
    if (!email) {
      throw new BadRequestError('Please provide an email')
    }
    if (!firstName) {
      throw new BadRequestError('Please provide a firstname')
    }
    if (!lastName) {
      throw new BadRequestError('Please provide a lastname')
    }

    const mailOptions = {
      from: 'hadjahmedbenferhat@gmail.com',
      to: email,
      subject: "IMPORTANT: RETRAIT DE VOTRE ADHESION DE SOURIRE",
      html: `
        <div style="font-family: Arial, sans-serif; padding: 10px; border: 2px solid #ccc; border-radius: 10px;">
          <h1 style="text-align: center;">Félicitations ${firstName} ${lastName}!</h1>
          <p style="text-align: justify;">
          nous tenons a vous informer que vous ne faites plus partie de notre communaute et de ce fait vous ne pouvez plus acceder a votre espace utilisateur de notre platforme 
          </p>
          <p style="text-align: center;">
            Nous Vous rmercions d'etre partie de notre communauté et  de travailler avec vous et de nous aider à atteindre nos objectifs.
          </p>
          <p style="text-align: center;">
            Cordialement,<br>
            L'équipe de notre communauté
          </p>
        </div>
      `
    }
  
    transporter.sendMail(mailOptions, function(error, info){
        if (error) {
            throw new BadRequestError("email couldn't be sent");
        } else {
            res.status(200).json({msg:"email sent successfuly"})
        }
    });
  }

// const sendSuppressionEmail =  (email,name,gender)=>{

//     let abbreviation

//     if (!email) {
//         throw new BadRequestError('Please provide a phone number')
//     }
//     if (!name) {
//         throw new BadRequestError('Please give us a username')
//     }
//     if (gender ==='f'||gender === 'F') {
//         abbreviation = "Madame"      
//     }
//     if (gender ==='m'||gender === 'M') {
//         abbreviation = "Mr"      
//     }
//     const mailOptions = {
//         from: "hadjahmedbenferhat@gmail.com",
//         to: email,
//         subject: "IMPORTANT: RETRAIT DE VOTRE ADHESION DE SOURIRE",
//         text: `bonjour ${abbreviation} ${name} nous tenons a vous informer que vous ne faites plus partie de notre communaute et de ce fait vous ne pouvez plus acceder a votre espace utilisateur de notre platforme `
//     }
  
//     transporter.sendMail(mailOptions, function(error, info){
//         if (error) {
//             throw new BadRequestError("email couldn't be sent");
//         } else {
//             res.status(200).json({msg:"email sent successfuly"})
//         }
//     });
// }

const sendConfimationEmail = (email,code)=>{

    const mailOptions = {
        from: "hadjahmedbenferhat@gmail.com",
        to: email,
        subject: "EMAIL DE CONFIRMATION",
        text: `votre code de confirmation et le suivant: \n ${code}`
    }
  
    transporter.sendMail(mailOptions, function(error, info){
        if (error) {
            throw new BadRequestError("email couldn't be sent")
        } else {
            res.status(200).json({msg:"email sent successfuly"})
        }
    });
}




module.exports = {sendEmail,sendAcceptenceEmail,sendSuppressionEmail,sendConfimationEmail}

