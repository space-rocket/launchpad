import * as dotenv from 'dotenv';
dotenv.config();
import * as cors from '@koa/cors';
import * as config from 'config';
import * as Koa from 'koa';
import * as bodyParser from 'koa-bodyparser';
import * as logger from 'koa-logger';
import * as views from 'koa-views';
import { connect } from 'mongoose';
import router from './routes';
console.log('config 😬 :', config);
const url  = config.get('mongoUrl');
const port = config.get('port');
const frontendUrl = config.get('frontendUrl');

console.log('mongo url 😬 :', url);
console.log('process.env.NODE_ENV 😬 :', process.env.NODE_ENV);
console.log('process.env.LOCALHOST_FRONTEND_URL 😬 :', process.env.LOCALHOST_FRONTEND_URL);

const options = {

};

connect(url, (err) => {
  if (err) { throw err; }
  console.log('Successfully connected to MongoDB');
});

const app = new Koa();

app
  // .use(views(__dirname + '/templates', {
	//   extension: 'hbs',
	//   map: { hbs: 'handlebars'},
  // }))
  .use(logger())
  .use(cors({
	  allowMethods: 'GET,HEAD,PUT,POST,DELETE,PATCH',
	  origin: frontendUrl,
  }))
  .use(bodyParser())
  .use(router.routes())
  .use(router.allowedMethods());

// Start the application
app.listen(port, () =>
  console.log(`Server is running at http://localhost:${port}/`),
);
export default app;
