import { FreeEntity } from './entity/FreeEntity';
import { PremiumEntity } from './entity/PremiumEntity';
export type * from './ImgflipTypes';
import { inspect } from 'node:util';
import type { Context, Feature } from './types';
import { config } from './Config';
import { ImgflipEntityBase } from './ImgflipEntityBase';
import { Utility } from './utility/Utility';
import { BaseFeature } from './feature/base/BaseFeature';
declare const stdutil: Utility;
declare class ImgflipSDK {
    _mode: string;
    _options: any;
    _utility: Utility;
    _features: Feature[];
    _rootctx: Context;
    constructor(options?: any);
    options(): any;
    utility(): any;
    prepare(fetchargs?: any): Promise<any>;
    direct(fetchargs?: any): Promise<Error | {
        ok: boolean;
        status: number;
        headers: any;
        data: any;
        err?: undefined;
    } | {
        ok: boolean;
        err: any;
        status?: undefined;
        headers?: undefined;
        data?: undefined;
    }>;
    _rawRequest(fetchargs?: any): Promise<Error | {
        ok: boolean;
        status: number;
        headers: any;
        data: any;
        err?: undefined;
    } | {
        ok: boolean;
        err: any;
        status?: undefined;
        headers?: undefined;
        data?: undefined;
    }>;
    graphql(query: string, variables?: any, ctrl?: any): Promise<any>;
    Free(entopts?: Record<string, any>): FreeEntity;
    Premium(entopts?: Record<string, any>): PremiumEntity;
    static test(testoptsarg?: any, sdkoptsarg?: any): ImgflipSDK;
    tester(testopts?: any, sdkopts?: any): ImgflipSDK;
    toJSON(): {
        name: string;
    };
    toString(): string;
    [inspect.custom](): string;
}
declare const SDK: typeof ImgflipSDK;
export { stdutil, config, BaseFeature, ImgflipEntityBase, ImgflipSDK, SDK, };
