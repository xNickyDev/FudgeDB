"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const forgescript_1 = require("@tryforge/forgescript");
const util_1 = require("../../util");
exports.default = new forgescript_1.NativeFunction({
    name: "$addDB",
    aliases: ["$addDataBase", "$addRecords"],
    description: "Adds records to the database",
    unwrap: true,
    brackets: true,
    args: [
        {
            name: "data",
            description: "The records data to add to the database",
            rest: false,
            type: forgescript_1.ArgType.Json,
            required: true,
        },
    ],
    async execute(_ctx, [data]) {
        await util_1.DataBase.set(data);
        return this.success();
    },
});
//# sourceMappingURL=addDB.js.map