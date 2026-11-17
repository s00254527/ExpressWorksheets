import argon2 from 'argon2';
import { UserModel } from '../models/users';
import {mongo} from 'mongoose';
import { UserAlreadyExistsError ,UnauthorizedError} from '../utils/apperrors';
import jwt from 'jsonwebtoken';
import {env} from '../config/env';



//what we put inside the toke. 
//remember can read the payload 
//so never put anything secret like the password has in here 

export interface TokenPayload{
    sub:string; //the user's _id
    email:string;
}

export interface PublicUser{
    _id:string;
    name:string;
    email:string;
}

//QWASP minum settings for Argon2id: 19mib memory 
//iterations, 1 thread

const hasOptions ={
    type:argon2.argon2id,
    memoryCost:19456,
    timeCost:2,
    parallelism:1,
 //never seen this structure before. very weird 
} as const;



export class AuthService{
    async register(name:string,email:string,password:string):
    Promise<PublicUser>{
        const passwordHash = await argon2.hash(password, hasOptions);
try{
     const user = await UserModel.create({name,email,passwordHash});
        //building the response by hand so the hash never leaves the server
        return {_id :user._id.toString(), name:user.name,email:user.email};
}catch(error){
    if(error instanceof mongo.MongoServerError && error.code === 11000){
        throw new UserAlreadyExistsError();
    } 
    throw error;
    }   
}
createToken(payload:TokenPayload):string{
    return jwt.sign(payload, env.jwtSecret, {
        algorithm: 'HS256',
        expiresIn: env.jwtExpiresIN as jwt.SignOptions['expiresIn'],
    });
    }


    verifyToken(token:string):TokenPayload{
        //pin in the algorthim so a token cant choose its own (e.g. none)
        return jwt.verify(token,env.jwtSecret,{algorithms:['HS256']}) as TokenPayload;
    }

    async login(email:string,password:string): Promise<string>{
        const user = await UserModel.findOne({email})

        if(!user){
            throw new UnauthorizedError("Invalid emial or password");
        }
        const valid = await argon2.verify(user.passwordHash, password);
        if(!valid) throw new UnauthorizedError("Invalid email or password");

        //raised the hast since the user was registered,
        //need to rehash while they have their plain-text password 
        if(argon2.needsRehash(user.passwordHash , hasOptions)){
            user.passwordHash = await argon2.hash(password,hasOptions);
            await user.save();
        }
        return this.createToken({sub:user._id.toString(),email:user.email});
    }
}
