import * as Router from 'koa-router';
import PasswordsControllers from './controllers/passwords';
import UsersControllers from './controllers/users';
import Authenticate from './middlewares/authenticate';
import jwt from './middlewares/jwt';

const router = new Router();

router
  .get('/api/users/', UsersControllers.find)
  .get('/api/users/:id', UsersControllers.findById)
  .post('/api/users/',  UsersControllers.register)
  .put('/api/users/:id', jwt, UsersControllers.update)
  .delete('/api/users/:id', jwt, UsersControllers.delete)
  // Authentication Routes
  .post('/authenticate', Authenticate)
  .post('/login/', Authenticate)

  // Password reset
  .post('/api/forgot-password/', PasswordsControllers.forgot)
  .get('/api/reset-password/', jwt, PasswordsControllers.reset)
  .post('/api/update-password/', jwt, PasswordsControllers.update)
  .get('/api/confirm-account/', PasswordsControllers.confirm)

  .get('/', (ctx) => {
	  return ctx.render('home', { name: 'world' });
  });

export default router;
