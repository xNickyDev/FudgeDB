import { ArgType, NativeFunction } from "@tryforge/forgescript"
import { DataBase, RecordData } from "../../util"

export default new NativeFunction({
    name: "$addDB",
    version: "2.1.0",
    aliases: ["$addDataBase", "$addRecords"],
    description: "Adds records to the database",
    unwrap: true,
    brackets: true,
    args: [
        {
            name: "data",
            description: "The records data to add to the database",
            rest: false,
            type: ArgType.Json,
            required: true,
        },
    ],
    async execute(_ctx, [data]) {
        await DataBase.set(data as RecordData)
        return this.success()
    },
})