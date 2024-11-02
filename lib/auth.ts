import { randomBytes, scryptSync, timingSafeEqual } from "crypto";
import jwt from 'jsonwebtoken';

const LOGIN_DURATION = "1h";

export function hashPassword(password: string) {
    const salt = randomBytes(16).toString("hex");
    const hashedPassword = scryptSync(password, salt, 64).toString("hex");

    return `${salt}:${hashedPassword}`;
}

export function checkPasswordMatch(password: string, hashedPassword: string) {
    const [salt, key] = hashedPassword.split(":");
    const hashedBuffer = scryptSync(password, salt, 64);
    const keyBuffer = Buffer.from(key, "hex");
    const match = timingSafeEqual(hashedBuffer, keyBuffer);

    if (match) return true;
    return false;
}

export const getProfile = async (token: string) => {
    const payload = jwt.verify(token, process.env.JWT_SECRET_KEY as string);
    console.log(payload)
    return payload;
}

export const getProfileFromRequest = async (request: Request) => {
    const authorization = request.headers.get('authorization');
    if (!authorization) return null;
    const token = authorization.replace('Bearer ', '');
    if (!token) return null;
    const payload = await getProfile(token);
    return payload;
}

export const createToken = (payload: any, expiresIn=LOGIN_DURATION) => {
    const token = jwt.sign(payload, process.env.JWT_SECRET_KEY as string, {
        expiresIn,
    });
    return token;
}