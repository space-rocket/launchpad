import * as Bcrypt from 'bcryptjs';
import * as config from 'config';
import * as jwt from 'jsonwebtoken';
import User from '../models/users';

const jwtKey = config.get('jwtKey');

export default async (ctx: any) => {
  const {username, email, password} = ctx.request.body;
  let user: any = {
	  _id: null,
	  password: null,
	  roles: null,
  };

  try {
		user = await User.findOne({ $or: [{ username }, { email }] }).select('isVerified').select('password').select('roles');
		console.log('user :', user);
		if (!user.isVerified) {
			ctx.body = {
				alert: 'warning',
				message: 'Your account has not been verified.',
			};
			ctx.status = 401;
			return ctx.body;
		}
	} catch (error) {
	  ctx.body = { success: false, message: 'Nope' };
	}

  if (user) {
	  if (Bcrypt.compareSync(ctx.request.body.password, user.password)) {
		  ctx.status = 200;
	  	ctx.body = {
			message: 'Successful Authentication',
		  	token: jwt.sign({
						roles: user.roles,
						userid: user._id,
						username,
					},
					jwtKey, {
						expiresIn: '1d',
				}),
			};
		} else {
			ctx.body = {
				alert: 'warning',
				message: 'Password does not match',
			};
			ctx.status = 401;
		}
  } else {
		ctx.body = {
			alert: 'warning',
			message: 'User does not exist',
		};
		ctx.status = 401;
  }
  console.log('ctx.body: ', ctx.body);
  return ctx;
};
