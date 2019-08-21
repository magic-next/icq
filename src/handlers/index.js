const mailer = require('../services/mailer');

const handler = async (ctx) => {
  const { body = {} } = ctx.request;
  try {
    await mailer(body);
    ctx.body = { success: true };
  } catch (error) {
    ctx.status = 500;
    ctx.body = { success: false };
  }
};

module.exports = handler;
