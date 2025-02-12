"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MongoTimeout = exports.MongoCooldown = exports.MongoRecord = exports.Timeout = exports.Cooldown = exports.SQLiteRecord = exports.Record = void 0;
const typeorm_1 = require("typeorm");
const forgescript_1 = require("@tryforge/forgescript");
let Record = class Record {
    identifier;
    name;
    id;
    type;
    value;
    guildId;
};
exports.Record = Record;
__decorate([
    (0, typeorm_1.PrimaryColumn)(),
    __metadata("design:type", String)
], Record.prototype, "identifier", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Record.prototype, "name", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], Record.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Record.prototype, "type", void 0);
__decorate([
    (0, typeorm_1.Column)("mediumtext"),
    __metadata("design:type", String)
], Record.prototype, "value", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], Record.prototype, "guildId", void 0);
exports.Record = Record = __decorate([
    (0, typeorm_1.Entity)()
], Record);
let SQLiteRecord = class SQLiteRecord {
    identifier;
    name;
    id;
    type;
    value;
    guildId;
};
exports.SQLiteRecord = SQLiteRecord;
__decorate([
    (0, typeorm_1.PrimaryColumn)(),
    __metadata("design:type", String)
], SQLiteRecord.prototype, "identifier", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], SQLiteRecord.prototype, "name", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], SQLiteRecord.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], SQLiteRecord.prototype, "type", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], SQLiteRecord.prototype, "value", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], SQLiteRecord.prototype, "guildId", void 0);
exports.SQLiteRecord = SQLiteRecord = __decorate([
    (0, typeorm_1.Entity)()
], SQLiteRecord);
let Cooldown = class Cooldown {
    identifier;
    name;
    id;
    startedAt;
    duration;
};
exports.Cooldown = Cooldown;
__decorate([
    (0, typeorm_1.PrimaryColumn)(),
    __metadata("design:type", String)
], Cooldown.prototype, "identifier", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Cooldown.prototype, "name", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], Cooldown.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], Cooldown.prototype, "startedAt", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], Cooldown.prototype, "duration", void 0);
exports.Cooldown = Cooldown = __decorate([
    (0, typeorm_1.Entity)()
], Cooldown);
let Timeout = class Timeout {
    name;
    startedAt;
    time;
    code;
};
exports.Timeout = Timeout;
__decorate([
    (0, typeorm_1.PrimaryColumn)(),
    __metadata("design:type", String)
], Timeout.prototype, "name", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], Timeout.prototype, "startedAt", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], Timeout.prototype, "time", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", forgescript_1.CompiledFunction)
], Timeout.prototype, "code", void 0);
exports.Timeout = Timeout = __decorate([
    (0, typeorm_1.Entity)()
], Timeout);
let MongoRecord = class MongoRecord extends Record {
    mongoId;
};
exports.MongoRecord = MongoRecord;
__decorate([
    (0, typeorm_1.ObjectIdColumn)(),
    __metadata("design:type", String)
], MongoRecord.prototype, "mongoId", void 0);
exports.MongoRecord = MongoRecord = __decorate([
    (0, typeorm_1.Entity)()
], MongoRecord);
let MongoCooldown = class MongoCooldown extends Cooldown {
    mongoId;
};
exports.MongoCooldown = MongoCooldown;
__decorate([
    (0, typeorm_1.ObjectIdColumn)(),
    __metadata("design:type", String)
], MongoCooldown.prototype, "mongoId", void 0);
exports.MongoCooldown = MongoCooldown = __decorate([
    (0, typeorm_1.Entity)()
], MongoCooldown);
let MongoTimeout = class MongoTimeout extends Timeout {
    mongoId;
};
exports.MongoTimeout = MongoTimeout;
__decorate([
    (0, typeorm_1.ObjectIdColumn)(),
    __metadata("design:type", String)
], MongoTimeout.prototype, "mongoId", void 0);
exports.MongoTimeout = MongoTimeout = __decorate([
    (0, typeorm_1.Entity)()
], MongoTimeout);
//# sourceMappingURL=types.js.map