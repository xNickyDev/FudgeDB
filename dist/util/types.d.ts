import { IDBEvents } from "../structures";
import { IExtendedCompiledFunctionField } from "@tryforge/forgescript";
export type IDataBaseOptions = ({
    type: "mysql" | "postgres";
    url?: string;
    host?: string;
    port?: number;
    username?: string;
    password?: string;
    database?: string;
} | {
    type: "mongodb";
    url: string;
} | {
    type: "better-sqlite3" | "sqlite";
    folder?: string;
}) & {
    events?: Array<keyof IDBEvents>;
};
export declare class Record {
    identifier: string;
    name: string;
    id: string;
    type: 'user' | 'channel' | 'role' | 'message' | 'member' | 'custom' | 'guild' | 'old';
    value: string;
    guildId?: string;
}
export declare class SQLiteRecord {
    identifier: string;
    name: string;
    id: string;
    type: 'user' | 'channel' | 'role' | 'message' | 'member' | 'custom' | 'guild' | 'old';
    value: string;
    guildId?: string;
}
export type BaseData = {
    identifier?: string;
    name?: string;
    id?: string;
    value?: string;
};
export type GuildData = BaseData & {
    type?: 'member' | 'channel' | 'role';
    guildId: string;
};
export type NonGuildData = BaseData & {
    type?: 'user' | 'message' | 'custom' | 'guild' | 'old';
};
export type RecordData = BaseData & (GuildData | NonGuildData);
export declare class Cooldown {
    identifier: string;
    name: string;
    id?: string;
    startedAt: number;
    duration: number;
}
export type CooldownData = {
    identifier?: string;
    name?: string;
    id?: string;
    startedAt?: number;
    duration?: number;
};
export declare class Timeout {
    identifier: string;
    name: string;
    startedAt: number;
    time: number;
    code: string;
}
export type TimeoutData = {
    identifier?: string;
    name?: string;
    startedAt?: number;
    time?: number;
    code?: IExtendedCompiledFunctionField;
};
export declare class MongoRecord extends Record {
    mongoId?: string;
}
export declare class MongoCooldown extends Cooldown {
    mongoId?: string;
}
export declare class MongoTimeout extends Timeout {
    mongoId?: string;
}
//# sourceMappingURL=types.d.ts.map