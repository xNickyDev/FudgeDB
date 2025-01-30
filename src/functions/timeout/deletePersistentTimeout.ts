import { ArgType, NativeFunction } from "@tryforge/forgescript"
import { DataBase } from "../../util"

export default new NativeFunction({
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
            type: ArgType.String,
            required: true,
        },
    ],
    output: ArgType.Boolean,
    async execute(ctx, [name]) {
        const success = await DataBase.timeoutExists(name)
        await DataBase.timeoutDelete(name)
        return this.success(success)
    },
})