import * as config from 'config';
import * as jwt from 'jsonwebtoken';
import * as nodemailer from 'nodemailer';
import User from '../models/users';

const jwtKey = config.get('jwtKey');

class UsersControllers {
  /**
   * Get all users data
   * @param {ctx} Koa Context
   */
  public async find(ctx) {
	  ctx.body = await User.find();
  }

  /**
   * Find a user
   * @param {ctx} Koa Context
   */
  public async findById(ctx) {
		try {
			const data = await User.findById(ctx.params.id);
			if (!data) {
				ctx.throw(404);
			}
			ctx.body = data;
		} catch (err) {
			if (err.name === 'CastError' || err.name === 'NotFoundError') {
				ctx.throw(404);
			}
			ctx.throw(500);
		}
  }

  /**
   * Update a data
   * @param {ctx} Koa Context
   */
  public async update(ctx) {
	try {
		const data = await User.findByIdAndUpdate(ctx.params.id, ctx.request.body);
  if (!data) {
		ctx.throw(404);
		}
		ctx.body = data;
	} catch (err) {
		if (err.name === 'CastError' || err.name === 'NotFoundError') {
		ctx.throw(404);
		}
		ctx.throw(500);
	}
  }

  /**
   * Delete a data
   * @param {ctx} Koa Context
   */
  public async delete(ctx) {
	try {
		const data = await User.findByIdAndRemove(ctx.params.id);
		if (!data) {
		ctx.throw(404);
		}
		ctx.body = data;
	} catch (err) {
		if (err.name === 'CastError' || err.name === 'NotFoundError') {
		ctx.throw(404);
		}
		ctx.throw(500);
	}
  }

  /**
   * Register a user
   * @param {ctx} Koa Context
   */
  public async register(ctx) {
		const { username, email } = ctx.request.body;
		const canidate: any = await User.findOne({ $or: [{ username }, { email }] });

		// Check if username or email is used yet
		if (canidate && canidate.username === username) {
			ctx.status = 400;
			ctx.body = {
				alert: 'warning',
				message: 'That username is already taken',
				success: false,
			};
			return;
		}	else if (canidate && canidate.email === email) {
			ctx.status = 400;
			ctx.body = {
				alert: 'warning',
				message: 'That email is already taken',
				success: false,
			};
			return;
		}

		// Add the new user
		try {
			const rolesArray = {roles: ['user']};
			const requestBody = Object.assign({}, ctx.request.body, rolesArray);
			const data: any = await new User(requestBody).save();
			if (data) {
				// ctx.status = 307;
				// ctx.redirect('/authenticate');
				// ctx.body = data;
				// Send Email with token
				console.log('data 😊:', data);
				const token = jwt.sign({
					roles: data.roles,
					userid: data._id,
					username: data.username,
				}, jwtKey, { expiresIn: '1d' });
				// Send verification email
				// create reusable transporter object using the default SMTP transport
				const transporter = nodemailer.createTransport({
					auth: {
						pass: process.env.GOOGLEPW,
						user: process.env.GOOGLEEMAIL,
					},
					host: 'smtp.gmail.com',
					port: 465,
					secure: true,
				});

				// setup email data with unicode symbols
				const mailOptions = {
					from: '"' + process.env.GOOGLEUSER + '" <' + process.env.GOOGLEMAIL + '>', // sender address
					to: data.email, // list of receivers
					// tslint:disable-next-line:object-literal-sort-keys
					subject: 'Confirm account ✔', // Subject line
					// tslint:disable-next-line:max-line-length
					text: 'Please confirm your account.\n\n' +
						// tslint:disable-next-line:max-line-length
						'Please click on the following link, or paste this into your browser to complete the process:\n\n' + ctx.req.headers.origin + '/confirm-account/' + token + '\n\n' +
						'If you did not request this, please ignore this email and your account will remain unverified.\n',
				};
				// send mail with defined transport object
				transporter.sendMail(mailOptions, (error, info) => {
					if (error) {
						return console.log('Roh oh', error);
					}
					console.log('Message sent: %s', info.messageId);
					// Preview only available when sending through an Ethereal account
					console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
				});
				ctx.body = {
					alert: 'info',
					message: `An email has been sent to ${email} with further instructions`,
					success: true,
				};
			} else {
				ctx.status = 400;
				ctx.body = { status: 'Forbidden' };
			}
		} catch (err) {
			console.log('Register error:', err);
			ctx.throw(422);
		}
	}
}
export default new UsersControllers();
