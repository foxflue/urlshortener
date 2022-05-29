import jwt from "jsonwebtoken";

export const createdToken = async (email: string) => {
    return jwt.sign(
        {email} ,
        process.env.JWT_SECRET as string,
        {
        expiresIn: 1000 * 60 * 60 * 24,
        }
    );
};

export const tokenVerification = async (token : string) => {
    return jwt.verify(token, process.env.JWT_SECRET as string);
}