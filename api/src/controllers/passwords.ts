import * as config from 'config';
import * as jwt from 'jsonwebtoken';
import * as nodemailer from 'nodemailer';
import decoder from '../middlewares/decoder';
import User from '../models/users';

const jwtKey = config.get('jwtKey');

class PasswordsControllers {
	/**
	 * Get all users data
	 * @param {ctx} Koa Context
	 */
  public async forgot(ctx) {
		const { email } = ctx.request.body;
		const canidate: any = await User.findOne({ $or: [{ email }] });

		if (canidate) {
			// Create JWT
			const token = jwt.sign({
				roles: canidate.roles,
				userid: canidate._id,
				username: canidate.username,
			}, jwtKey, { expiresIn: '1d' });
			console.log('token :', token);
			console.log('ctx.req.headers', ctx.req.headers);
			// create reusable transporter object using the default SMTP transport
			const transporter = nodemailer.createTransport({
				auth: {
					pass: process.env.GOOGLEPW,
					user: process.env.GOOGLEMAIL,
				},
				host: 'smtp.gmail.com',
				port: 465,
				secure: true,
			});

			// setup email data with unicode symbols
			const mailOptions = {
				from: '"' + process.env.GOOGLEUSER + '" <' + process.env.GOOGLEMAIL + '>', // sender address
				to: email, // list of receivers
				// tslint:disable-next-line:object-literal-sort-keys
				subject: 'Password Reset ✔', // Subject line
				// tslint:disable-next-line:max-line-length
				text: 'You are receiving this because you (or someone else) have requested the reset of the password for your account.\n\n' +
				// tslint:disable-next-line:max-line-length
				'Please click on the following link, or paste this into your browser to complete the process:\n\n' + ctx.req.headers.origin + '/reset-password/' + token + '\n\n' +
				'If you did not request this, please ignore this email and your password will remain unchanged.\n',
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
			ctx.body = {
				alert: 'danger',
				message: `No account with that email address exists.`,
				success: false,
			};
			console.log('email does not exist');
		}
	}

	/**
	 * Reset
	 * @param {ctx} Koa Context
	 */
	public async reset(ctx) {
		const decoded = await decoder(ctx);
		console.log('decoded.userid 🐱:', decoded.userid);

		try {
			const data = await User.findById(decoded.userid);
			console.log('data 🐱:', data);
			if (!data) {
				ctx.throw(404);
			}
			ctx.body = {
				data,
				message: ``,
				success: true,
			};
		} catch (err) {
			if (err.name === 'CastError' || err.name === 'NotFoundError') {
				// ctx.throw(404)
				ctx.body = { success: false, message: `Token is not valid 404` };
			}
			// ctx.throw(500)
			ctx.body = { status: 500, success: false, message: `Password reset token is invalid or has expired.` };
		}
	}
	/**
	 * Update
	 * @param {ctx} Koa Context
	 */
	public async update(ctx) {
		const decoded = await decoder(ctx);
		const userid = decoded.userid;
		const password = ctx.request.body.password;
		const confirmPassword = ctx.request.body.confirm;
		if (password !== confirmPassword) {
			console.log('Dont match!');
			return ctx.body = {
				alert: 'warning',
				message: `Passwords don't match. Please try again.`,
				success: false,
			};
		}
		// Also check expiration date

		try {
			const data: any = await User.findById(userid, (err, user: any) => {
				if (err) { return false; }
				user.password = password;
				// tslint:disable-next-line:no-shadowed-variable
				user.save((err: any) => {
					if (err) {
						return;
					}
					const transporter = nodemailer.createTransport({
						auth: {
							pass: process.env.GOOGLEPW,
							user: process.env.GOOGLEMAIL,
						},
						host: 'smtp.gmail.com',
						port: 465,
						secure: true,
					});

					// setup email data with unicode symbols
					const mailOptions = {
						from: '"' + process.env.GOOGLEUSER + '" <' + process.env.GOOGLEMAIL + '>',
						subject: 'Your password has been changed ✔',
						to: user.email,
						// tslint:disable-next-line:object-literal-sort-keys
						text: 'Hello,\n\n' +
							'This is a confirmation that the password for your account ' + user.email + ' has just been changed.\n',
						// html: '<b>Password reset. Here have a token: </b>'
					};

					// send mail with defined transport object
					transporter.sendMail(mailOptions, (error, info) => {
						if (error) {
							return console.log('Roh oh', error);
						}
						console.log('Message sent: %s', info.messageId);
						// Preview only available when sending through an Ethereal account
						console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));

						// Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>
						// Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
					});
				});
				ctx.body = {
					alert: 'success',
					data,
					message: `Success! Your password has been changed.`,
					success: false,
				};
			});
			if (!data) {
				ctx.throw(404);
			}
		} catch (err) {
			if (err.name === 'CastError' || err.name === 'NotFoundError') {
				ctx.throw(404);
			}
			ctx.throw(500);
		}
	}
	/**
	 * Confirm
	 * @param {ctx} Koa Context
	 */
	public async confirm(ctx) {
		const decoded = await decoder(ctx);
		console.log('decoded 😍', decoded);
		const userid = decoded.userid;
		console.log('userid 😍', userid);
		// @TODO: Also check expiration date
		try {
			const data = await User.findById(userid, (err, user: any) => {
			if (err) { return false; }
			console.log('data 😍', data);
			console.log('user 😍', user);
			if (user) {
				user.isVerified = true;
				console.log('user2 😍', user);
				// tslint:disable-next-line:no-shadowed-variable
				user.save((err: any) => {
					if (err) {
						return;
					}
					ctx.body = {
						alert: 'success',
						message: `Thank you. You're account is now verified. You can now login`,
						success: true,
						user,
					};
				});
			} else {
				console.log('no user found 😱');
			}
		});
			if (!data) {
				// ctx.throw(404);
				ctx.body = {
					alert: 'fail',
					message: `Nope`,
					success: false,

				};
			}
		} catch (err) {
			if (err.name === 'CastError' || err.name === 'NotFoundError') {
				// ctx.throw(404);
				ctx.body = {
					alert: 'fail',
					message: `Nope`,
					success: false,
				};
			}
			// ctx.throw(500);
			ctx.body = {
				alert: 'fail',
				message: `Nope`,
				success: false,
			};
		}
	}
}
export default new PasswordsControllers();
