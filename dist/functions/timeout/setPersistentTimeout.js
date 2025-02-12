"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const forgescript_1 = require("@tryforge/forgescript");
const util_1 = require("../../util");
exports.default = new forgescript_1.NativeFunction({
    name: "$setPersistentTimeout",
    version: "2.1.0",
    description: "Executes code after given duration, continues after restart",
    brackets: true,
    unwrap: false,
    args: [
        {
            name: "name",
            description: "The name of the timeout",
            rest: false,
            type: forgescript_1.ArgType.String,
            required: true,
        },
        {
            name: "time",
            description: "How long to wait for before running this code",
            rest: false,
            required: true,
            type: forgescript_1.ArgType.Time,
        },
        {
            name: "code",
            description: "The code to execute",
            rest: false,
            required: true,
            type: forgescript_1.ArgType.String,
        },
    ],
    async execute(ctx) {
        const [, , code] = this.data.fields;
        const nameV = await this["resolveUnhandledArg"](ctx, 0);
        if (!this["isValidReturnType"](nameV))
            return nameV;
        const time = await this["resolveUnhandledArg"](ctx, 1);
        if (!this["isValidReturnType"](time))
            return time;
        await util_1.DataBase.timeoutAdd({ name: nameV.value, time: time.value });
        setTimeout(async () => {
            if (await util_1.DataBase.timeoutExists(nameV.value)) {
                await this["resolveCode"](ctx, code);
                await util_1.DataBase.timeoutDelete(nameV.value);
            }
        }, time.value);
        return this.success();
    },
});
//# sourceMappingURL=setPersistentTimeout.js.map