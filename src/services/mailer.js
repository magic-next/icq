const nodemailer = require('nodemailer');

const isDev = process.env.NODE_ENV !== 'production';

/**
 * Send the given email
 * @param {object} email
 * @param {string} email.from
 * @param {string} email.to
 * @param {string} email.subject
 * @param {string} email.text
 * @param {string} email.html
 * @returns {Promise}
 */
const sender = (email) => {
  const auth = {};
  if (!isDev) {
    auth.user = process.env.SMTP_USER;
    auth.pass = process.env.SMTP_PASSWORD;
  }

  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: process.env.SMTP_PORT,
    secure: false,
    auth,
  });

  return transporter.sendMail(email);
};

module.exports = sender;
