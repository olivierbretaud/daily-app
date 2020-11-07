const nodemailer = require('nodemailer');

module.exports.transporter = nodemailer.createTransport({
  host: 'smtp.live.com',
  port: 25,
  secure: false,
  auth: {
    user: process.env.EMAIL_LOGIN,
    pass: process.env.EMAIL_PASSWORD
  }
});

module.exports.getPasswordResetURL = (user, token ) => {
  return `${process.env.CLIENT_URL}/password/reset/${user.id}/${token}`
};

module.exports.resetPasswordTemplate = (user , url ) => {
  const from = process.env.EMAIL_LOGIN;
  const to = user.email;
  const subject = "Password reset";
  const html = `
    <p>Hey ${user.name || user.email},</p>
    <p>We heard that you lost your Backwoods password. Sorry about that!</p>
    <p>But don’t worry! You can use the following link to reset your password:</p>
    <a href=${url}>${url}</a>
    <p>If you don’t use this link within 1 hour, it will expire.</p>
    <p>Do something outside today! </p>
    <p>–Your friend Olivier ;)</p>
  `;

  console.log(from , process.env.EMAIL_PASSWORD)
  return { from , to , subject , html };

};

