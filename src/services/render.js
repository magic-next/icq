const _ = require('lodash');

const emails = {
  account: {
    create: {
      from: '"Equipe Magic Next" <me@zerodois.dev>',
      subject: 'Bem vindo ao Magic Next',
      template: 'template-path',
    },
  },
};

const renderize = (type) => {
  const email = _.get(emails, type);
  return {
    from: email.from,
    subject: email.subject,
    html: '<h1>PUTA EMAIL DAORA MEO</h1>',
  };
};

module.exports = renderize;
