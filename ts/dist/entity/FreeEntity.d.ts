import { ImgflipEntityBase } from '../ImgflipEntityBase';
import type { ImgflipSDK } from '../ImgflipSDK';
import type { Control } from '../types';
import type { Free, FreeLoadMatch, FreeCreateData } from '../ImgflipTypes';
declare class FreeEntity extends ImgflipEntityBase<Free> {
    constructor(client: ImgflipSDK, entopts: any);
    make(this: FreeEntity): FreeEntity;
    load(this: any, reqmatch?: FreeLoadMatch, ctrl?: Control): Promise<FreeEntity>;
    create(this: any, reqdata?: FreeCreateData, ctrl?: Control): Promise<FreeEntity>;
}
export { FreeEntity };
