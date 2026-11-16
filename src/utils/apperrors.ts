

export class AppError extends Error {
    constructor(message: string, public statusCode: number) {
        super(message);
        this.name = 'AppError';
    }
}

export class UserAlreadyExsistsError extends AppError{
constructor(){
    super('User already exists', 409);
}
}
export class UnauthorizedError extends AppError{
constructor(message:string){
    super(message,401);
}
}