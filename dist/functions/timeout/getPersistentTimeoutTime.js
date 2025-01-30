"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const forgescript_1 = require("@tryforge/forgescript");
const util_1 = require("../../util");
exports.default = new forgescript_1.NativeFunction({
    name: "$getPersistentTimeoutTime",
    description: "Gets the remaining time of a persistent timeout",
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
    output: forgescript_1.ArgType.Number,
    async execute(ctx, [name]) {
        return this.success((await util_1.DataBase.timeoutTimeLeft(name)).left);
    },
});
//# sourceMappingURL=getPersistentTimeoutTime.js.map