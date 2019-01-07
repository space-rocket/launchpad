import * as config from 'config';
import * as jwt from 'jsonwebtoken';

const jwtKey = config.get('jwtKey');

export default async function decoder(ctx) {
	// Get username from jsonwebtoken
	if (ctx.headers && ctx.headers.authorization) {
		const authorization = ctx.headers.authorization;
		const token = authorization.replace('Bearer ', '');
		try {
			const decoded = jwt.verify(token, jwtKey);
			return decoded;
		} catch (e) {
			console.log('Decoder error 🚑 :', e);
			return ctx.body = { success: false, message: `Token is not valid from decoder` };
		}
	}
}
