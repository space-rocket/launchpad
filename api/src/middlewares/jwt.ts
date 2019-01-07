import * as config from 'config';
import * as jwt from 'koa-jwt';

const jwtKey = config.get('jwtKey');

export default jwt({
  secret: jwtKey,
});
