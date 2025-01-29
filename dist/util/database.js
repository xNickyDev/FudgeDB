"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DataBase = void 0;
const types_1 = require("./types");
require("reflect-metadata");
const databaseManager_1 = require("./databaseManager");
function isGuildData(data) {
    return ['member', 'channel', 'role'].includes(data.type);
}
class DataBase extends databaseManager_1.DataBaseManager {
    emitter;
    database = "forge.db";
    entityManager = {
        sqlite: [types_1.SQLiteRecord, types_1.Cooldown, types_1.Timeout],
        mongo: [types_1.MongoRecord, types_1.MongoCooldown, types_1.MongoTimeout],
        mysql: [types_1.Record, types_1.Cooldown, types_1.Timeout],
        postgres: [types_1.Record, types_1.Cooldown, types_1.Timeout],
    };
    static entities;
    db;
    static db;
    static emitter;
    constructor(emitter, options) {
        super(options);
        this.emitter = emitter;
        this.db = this.getDB();
        DataBase.entities = {
            Record: this.type == "mongodb" ? types_1.MongoRecord : (this.type == "sqlite" || this.type == "better-sqlite3") ? types_1.SQLiteRecord : types_1.Record,
            Cooldown: this.type == "mongodb" ? types_1.MongoCooldown : types_1.Cooldown,
            Timeout: this.type == "mongodb" ? types_1.MongoTimeout : types_1.Timeout
        };
    }
    async init(ctx) {
        DataBase.emitter = this.emitter;
        DataBase.db = await this.db;
        DataBase.emitter.emit("connect");
        await DataBase.restoreTimeouts(ctx);
    }
    static make_intetifier(data) {
        return `${data.type}_${data.name}_${isGuildData(data) ? data.guildId + '_' : ''}${data.id}`;
    }
    static async set(data) {
        const newData = new this.entities.Record();
        newData.identifier = this.make_intetifier(data);
        newData.name = data.name;
        newData.id = data.id;
        newData.type = data.type;
        newData.value = data.value;
        if (isGuildData(data))
            newData.guildId = data.guildId;
        const oldData = await this.db.getRepository(this.entities.Record).findOneBy({ identifier: this.make_intetifier(data) });
        if (oldData && this.type == 'mongodb') {
            this.emitter.emit("variableUpdate", { newData, oldData });
            this.db.getRepository(this.entities.Record).update(oldData, newData);
        }
        else {
            oldData ? this.emitter.emit("variableUpdate", { newData, oldData }) : this.emitter.emit('variableCreate', { data: newData });
            await this.db.getRepository(this.entities.Record).save(newData);
        }
    }
    static async get(data) {
        const identifier = data.identifier ?? this.make_intetifier(data);
        return await this.db.getRepository(this.entities.Record).findOneBy({ identifier });
    }
    static async getAll() {
        return await this.db.getRepository(this.entities.Record).find();
    }
    static async find(data) {
        return await this.db.getRepository(this.entities.Record).find({
            where: { ...data }
        });
    }
    static async delete(data) {
        const identifier = data.identifier ?? this.make_intetifier(data);
        this.emitter.emit('variableDelete', { data: await this.db.getRepository(this.entities.Record).findOneBy({ identifier }) });
        return await this.db.getRepository(this.entities.Record).delete({ identifier });
    }
    static async wipe() {
        return await this.db.getRepository(this.entities.Record).clear();
    }
    static async cdWipe() {
        return await this.db.getRepository(this.entities.Cooldown).clear();
    }
    static async timeoutWipe() {
        return await this.db.getRepository(this.entities.Timeout).clear();
    }
    static make_cdIdentifier(data) {
        return `${data.name}${data.id ? '_' + data.id : ''}`;
    }
    static make_timeoutIdentifier(data) {
        return `${data.name}`;
    }
    static async cdAdd(data) {
        const cd = new this.entities.Cooldown();
        cd.identifier = this.make_cdIdentifier(data);
        cd.name = data.name;
        cd.id = data.id;
        cd.startedAt = Date.now();
        cd.duration = data.duration;
        const oldCD = await this.db.getRepository(this.entities.Cooldown).findOneBy({ identifier: this.make_cdIdentifier(data) });
        if (oldCD && this.type == 'mongodb')
            return await this.db.getRepository(this.entities.Cooldown).update(oldCD, cd);
        else
            return await this.db.getRepository(this.entities.Cooldown).save(cd);
    }
    static async timeoutAdd(data) {
        const to = new this.entities.Timeout();
        to.identifier = this.make_timeoutIdentifier(data);
        to.name = data.name;
        to.startedAt = Date.now();
        to.time = data.time;
        to.code = JSON.stringify(data.code);
        const oldTO = await this.db.getRepository(this.entities.Timeout).findOneBy({ identifier: this.make_timeoutIdentifier(data) });
        if (oldTO && this.type == 'mongodb')
            return await this.db.getRepository(this.entities.Timeout).update(oldTO, to);
        else
            return await this.db.getRepository(this.entities.Timeout).save(to);
    }
    static async cdDelete(identifier) {
        await this.db.getRepository(this.entities.Cooldown).delete({ identifier });
    }
    static async timeoutDelete(identifier) {
        await this.db.getRepository(this.entities.Timeout).delete({ identifier });
    }
    static async cdTimeLeft(identifier) {
        const data = await this.db.getRepository(this.entities.Cooldown).findOneBy({ identifier });
        return data ? { ...data, left: Math.max(data.duration - (Date.now() - data.startedAt), 0) } : { left: 0 };
    }
    static async timeoutTimeLeft(identifier) {
        const data = await this.db.getRepository(this.entities.Timeout).findOneBy({ identifier });
        return data ? { ...data, left: Math.max(data.time - (Date.now() - data.startedAt), 0) } : { left: 0 };
    }
    static async restoreTimeouts(ctx) {
        const timeouts = await this.db.getRepository(this.entities.Timeout).find();
        for (const timeout of timeouts) {
            const code = JSON.parse(timeout.code);
            const timeLeft = (await this.timeoutTimeLeft(timeout.identifier)).left;
            if (timeLeft > 0) {
                setTimeout(async () => {
                    console.log("called delayed restore");
                    await code.functions[0]["resolveCode"](ctx, code);
                    await this.timeoutDelete(timeout.identifier);
                }, timeLeft);
            }
            else {
                console.log("called instant restore");
                console.log(code.functions[0]["resolveCode"]);
                await code.functions[0]["resolveCode"];
                await this.timeoutDelete(timeout.identifier);
            }
        }
    }
    static async query(query) {
        return await this.db.query(query);
    }
}
exports.DataBase = DataBase;
//# sourceMappingURL=database.js.map