import { ArgType, IExtendedCompiledFunctionField, NativeFunction } from "@tryforge/forgescript"
import { DataBase } from "../../util"

export default new NativeFunction({
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
            type: ArgType.String,
            required: true,
        },
        {
            name: "time",
            description: "How long to wait for before running this code",
            rest: false,
            required: true,
            type: ArgType.Time,
        },
        {
            name: "code",
            description: "The code to execute",
            rest: false,
            required: true,
            type: ArgType.String,
        },
    ],
    async execute(ctx) {
        const [, , code] = this.data.fields! as IExtendedCompiledFunctionField[]
        const nameV = await this["resolveUnhandledArg"](ctx, 0)
        if (!this["isValidReturnType"](nameV)) return nameV
        
        const time = await this["resolveUnhandledArg"](ctx, 1)
        if (!this["isValidReturnType"](time)) return time

        await DataBase.timeoutAdd({name: nameV.value as string, time: time.value as number, code: this, ctx: ctx})

        setTimeout(async () => {
            console.log(code)
            await this["resolveCode"](ctx, code)
            await DataBase.timeoutDelete(DataBase.make_timeoutIdentifier({name: nameV.value}))
        }, time.value as number)

        return this.success()
    },
})