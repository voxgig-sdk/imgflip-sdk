import { Context } from './Context';
declare class ImgflipError extends Error {
    isImgflipError: boolean;
    sdk: string;
    code: string;
    ctx: Context;
    status: number;
    get notFound(): boolean;
    constructor(code: string, msg: string, ctx: Context);
}
export { ImgflipError };
