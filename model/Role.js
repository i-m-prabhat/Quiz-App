import mongoose from "mongoose";

const schema = new mongoose.Schema(
    {
        name: String,
        created_by: String
    },
    { versionKey: false }
)

export const roleModel = new mongoose.model("roles", schema);