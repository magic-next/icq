const render = require('../services/render');
const send = require('../services/mailer');

const handler = async (ctx) => {
  const { body = {} } = ctx.request;
  const email = render(body.type, body.data);
  try {
    await send({
      ...email,
      to: body.email,
    });
    ctx.body = { success: true };
  } catch (error) {
    ctx.status = 500;
    ctx.body = { success: false };
  }
};

module.exports = handler;
