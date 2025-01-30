import { ArgType, NativeFunction } from "@tryforge/forgescript"
import { DataBase } from "../../util"

export default new NativeFunction({
    name: "$getPersistentTimeoutTime",
    version: "2.1.0",
    description: "Gets the remaining time of a persistent timeout",
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
    output: ArgType.Number,
    async execute(ctx, [name]) {
        return this.success((await DataBase.timeoutTimeLeft(name)).left)
    },
})