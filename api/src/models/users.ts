import * as Bcrypt from 'bcryptjs';
import { Document, Model, model, Schema} from 'mongoose';
import {IUser} from '../interfaces/IUser';

const SALT_WORK_FACTOR = 10;

export interface IUserModel extends Document {
  comparePassword(password: string): boolean;
}

const UserSchema = new Schema({
  email: {
	  required: true,
	  type: String,
  },
	id: Schema.Types.ObjectId,
	isVerified: {
		default: false,
		type: Boolean,
	},
  password: {
	  required: true,
	  type: String,
  },
  username: {
	  required: true,
	  type: String,
  },
});

UserSchema.pre('save', async function hashPassword(next) {
  try {
		const user: any = this;
		// only hash the password if it has been modified (or is new)
		if (!user.isModified('password')) {
			return next();
		}
		const salt = await Bcrypt.genSalt(SALT_WORK_FACTOR);
		const hash = await Bcrypt.hash(user.password, salt);
		// override the cleartext password with the hashed one
		user.password = hash;
		return next();
  } catch (e) {
		return next(e);
  }
});

UserSchema.methods.comparePassword = function(candidatePassword, cb) {
	Bcrypt.compare(candidatePassword, this.password, (err, isMatch) => {
		if (err) { return cb(err); }
		cb(null, isMatch);
	});
};

export const User: Model<IUserModel> = model<IUserModel>('User', UserSchema);
export default model('User', UserSchema);
