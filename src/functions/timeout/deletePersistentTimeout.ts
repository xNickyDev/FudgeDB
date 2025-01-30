import { ArgType, IExtendedCompiledFunctionField, NativeFunction } from "@tryforge/forgescript"
import { DataBase } from "../../util"

export default new NativeFunction({
    name: "$setPersistentTimeout",
    description: "Deletes a persistent set timeout, returns bool",
    brackets: true,
    unwrap: true,
    args: [
        {
            name: "name",
            description: "The name of the timeout",
            rest: false,
            type: ArgType.String,
            required: true,
        },
    ],
    output: ArgType.Boolean,
    async execute(ctx, [name]) {
        return this.success(!!(await DataBase.timeoutDelete(name)))
    },
})