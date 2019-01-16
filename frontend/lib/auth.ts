import cookies from 'next-cookies'
import jwt from 'jsonwebtoken'

export function auth(token) {
    const decoded = jwt.decode(token);
    const seconds = 1000;
    const d = new Date();
    const t = d.getTime();
    console.log("decoded 🐱:", decoded)
    console.log(" Math.round(t / seconds):🐱", Math.round(t / seconds))
     
    if (decoded.exp < Math.round(t / seconds)) {
        // console.log("token expired 🐱:")
        return false
    } else {
        // console.log("token not expired 🐱:")
        return decoded
    }

}
