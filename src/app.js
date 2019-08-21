require('dotenv').config();
const Koa = require('koa');
const logger = require('koa-logger');
const bodyParser = require('koa-bodyparser');
const handler = require('./handlers');
const auth = require('./middlewares/auth');

const PORT = process.env.PORT || 3000;
const app = new Koa();
const privateKey = process.env.APPLICATION_KEY;

app.use(logger());
app.use(bodyParser({ jsonLimit: '10mb' }));
app.use(auth({ privateKey }));

app.use(handler);

app.listen(PORT, () => {
  console.log(`Done! Listening on http://localhost:${PORT}`);
});
