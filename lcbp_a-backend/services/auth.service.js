import bcrypt from "bcryptjs";
import jwt from 'jsonwebtoken';

const {JWT_KEY} = process.env;

// Auth Service
export function pswHash(pswd) {
    return bcrypt.hashSync(pswd,10);
}

export function pswCheck(pswd,hash) {
    return bcrypt.compareSync(pswd,hash);
}

export function jwtEncode(payload,expiresIn="2d") {
    return jwt.sign(payload,JWT_KEY,{expiresIn})
}

export function jwtDecode(token) {
    try {
        // console.log(jwt.verify(token,JWT_KEY)); 
        console.log("decode");
        console.log(token,"       ",JWT_KEY);
        
        jwt.verify(token,JWT_KEY);
        console.log(jwt.decode(token,JWT_KEY));             
        // return jwt.verify(token,JWT_KEY);
        return jwt.decode(token,JWT_KEY);
    } catch (error) {
        console.log("jwt Error : ",error.message);
    }
    return false;
}

export function checkJwt(req,res) {
    // console.log("My Req H Auth : ",req.headers.authorization );

    try {
        let token = req.body.token;
        console.log(token);
        
        // let token = req.headers.authorization.split(' ').pop();
        jwt.verify(token,JWT_KEY);
        console.log("Token is : ",token);
        return true
        // next();
    } catch (error) {        
        console.log("ERROR jwtDecode : ", error.message);        
        res.sendStatus(401); // Unauthorized
    }
}

// export function checkJwt(req,res,next) {
//     // console.log("My Req H Auth : ",req.headers.authorization );

//     try {
//         let token = sessionStorage.getItem("LCBPauth");
//         // let token = req.headers.authorization.split(' ').pop();
//         req.payload = jwt.verify(token,JWT_KEY);
//         console.log("Token is : ",token);
        
//         next();
//     } catch (error) {        
//         console.log("ERROR jwtDecode : ", error.message);        
//         res.sendStatus(401); // Unauthorized
//     }
// }