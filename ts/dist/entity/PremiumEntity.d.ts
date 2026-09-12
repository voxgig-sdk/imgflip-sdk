import { ImgflipEntityBase } from '../ImgflipEntityBase';
import type { ImgflipSDK } from '../ImgflipSDK';
import type { Control } from '../types';
import type { Premium, PremiumCreateData } from '../ImgflipTypes';
declare class PremiumEntity extends ImgflipEntityBase<Premium> {
    constructor(client: ImgflipSDK, entopts: any);
    make(this: PremiumEntity): PremiumEntity;
    create(this: any, reqdata?: PremiumCreateData, ctrl?: Control): Promise<PremiumEntity>;
}
export { PremiumEntity };
