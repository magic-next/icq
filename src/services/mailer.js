const nodemailer = require('nodemailer');
const Email = require('email-templates');

const isDev = process.env.NODE_ENV !== 'production';
const sender = process.env.EMAIL_SENDER;

/**
 * Get transport of the email
 */
const getTransport = () => {
  if (isDev) {
    return nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: process.env.SMTP_PORT,
    });
  }

  const auth = {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASSWORD,
  };

  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth,
  });

  return transporter;
};

/**
 * Send the given email
 * @param {object} config
 * @param {string} config.email
 * @param {string} config.type
 * @param {object} config.data
 * @returns {Promise}
 */
const send = (config) => {
  const email = new Email({
    message: {
      from: sender,
    },
    juiceResources: {
      preserveImportant: true,
      webResources: {
        images: true,
      },
    },
    send: true,
    preview: false,
    transport: getTransport(),
  });

  return email.send({
    template: config.type.replace(/\./g, '/'),
    message: {
      to: config.email,
    },
    locals: config.data,
  });
};

module.exports = send;
