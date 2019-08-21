const jwt = require('jsonwebtoken');

const auth = ({ privateKey }) => {
  const middleware = (ctx, next) => {
    try {
      const { authorization = '' } = ctx.request.headers;
      const token = authorization.replace(/^Bearer\s?/, '');
      const res = jwt.verify(token, privateKey);
      if (res && res.access) {
        return next();
      }
      throw new Error('Unathorized');
    } catch (error) {
      console.error(error);
      ctx.body = 'Unathorized';
      ctx.status = 401;
    }
  };

  return middleware;
};

module.exports = auth;
