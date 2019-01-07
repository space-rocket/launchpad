export interface IUser {
  username: string;
  email: string;
  password: string;
  hash: string;
  salt: string;
  isVerified: boolean;
}
