"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const forgescript_1 = require("@tryforge/forgescript");
const util_1 = require("../../util");
exports.default = new forgescript_1.NativeFunction({
    name: "$deletePersistentTimeout",
    version: "2.1.0",
    description: "Deletes a persistent set timeout, returns bool",
    brackets: true,
    unwrap: true,
    args: [
        {
            name: "name",
            description: "The name of the timeout",
            rest: false,
            type: forgescript_1.ArgType.String,
            required: true,
        },
    ],
    output: forgescript_1.ArgType.Boolean,
    async execute(ctx, [name]) {
        const success = await util_1.DataBase.timeoutExists(name);
        await util_1.DataBase.timeoutDelete(name);
        return this.success(success);
    },
});
//# sourceMappingURL=deletePersistentTimeout.js.map