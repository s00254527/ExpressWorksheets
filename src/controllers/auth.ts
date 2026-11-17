import { Request,Response } from "express";
import { AuthService } from "../services/auth";


const authService = new AuthService();

export class AuthController{

    register = async (req:Request,  res:Response):Promise<void>=>{
        const {name,email,password} = req.body;
        const user = await authService.register(name,email,password);
        res.status(201).json(user);

    };
    login = async (req:Request, res:Response): Promise<void> =>{
        const {email,password} = req.body;
        const token = await authService.login(email,password);

        res.status(200).json({token});
    }
    me = async (req:Request,res:Response):Promise<void> =>{
        const user = await authService. getUserById(req.user!.sub);
        res.status(200).json(user);
    }
}