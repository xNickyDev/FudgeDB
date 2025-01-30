import { Cooldown, IDataBaseOptions, MongoCooldown, MongoRecord, MongoTimeout, Record, RecordData, SQLiteRecord, Timeout } from './types';
import { TypedEmitter } from 'tiny-typed-emitter';
import { IDBEvents } from '../structures';
import { TransformEvents } from '..';
import 'reflect-metadata';
import { DataBaseManager } from './databaseManager';
import { CompiledFunction, Context } from '@tryforge/forgescript';
export declare class DataBase extends DataBaseManager {
    private emitter;
    database: string;
    entityManager: {
        sqlite: (typeof SQLiteRecord | typeof Cooldown | typeof Timeout)[];
        mongo: (typeof MongoRecord | typeof MongoCooldown | typeof MongoTimeout)[];
        mysql: (typeof Record | typeof Cooldown | typeof Timeout)[];
        postgres: (typeof Record | typeof Cooldown | typeof Timeout)[];
    };
    private static entities;
    private db;
    private static db;
    private static emitter;
    constructor(emitter: TypedEmitter<TransformEvents<IDBEvents>>, options?: IDataBaseOptions);
    init(ctx?: Context): Promise<void>;
    static make_intetifier(data: RecordData): string;
    static set(data: RecordData): Promise<void>;
    static get(data: RecordData): Promise<Record | null>;
    static getAll(): Promise<Record[]>;
    static find(data?: RecordData): Promise<Record[]>;
    static delete(data: RecordData): Promise<import("typeorm").DeleteResult>;
    static wipe(): Promise<void>;
    static cdWipe(): Promise<void>;
    static timeoutWipe(): Promise<void>;
    static make_cdIdentifier(data: {
        name?: string;
        id?: string;
    }): string;
    static make_timeoutIdentifier(data: {
        name?: string;
    }): string;
    static cdAdd(data: {
        name: string;
        id?: string;
        duration: number;
    }): Promise<Cooldown | import("typeorm").UpdateResult>;
    static timeoutAdd(data: {
        name: string;
        time: number;
        code: CompiledFunction;
    }): Promise<Timeout | import("typeorm").UpdateResult>;
    static cdDelete(identifier: string): Promise<void>;
    static timeoutDelete(identifier: string): Promise<void>;
    static cdTimeLeft(identifier: string): Promise<{
        left: number;
        identifier: string;
        name: string;
        id?: string;
        startedAt: number;
        duration: number;
    } | {
        left: number;
    }>;
    static timeoutTimeLeft(identifier: string): Promise<{
        left: number;
        identifier: string;
        name: string;
        startedAt: number;
        time: number;
        code: string;
    } | {
        left: number;
    }>;
    static restoreTimeouts(ctx?: Context): Promise<void>;
    static query(query: string): Promise<any>;
}
//# sourceMappingURL=database.d.ts.map