const mongoose = require("mongoose");

const schema = new mongoose.Schema({ name: String, created_by: String },
    { versionKey: false }
)

roleModel = new mongoose.model("roles", schema)

module.exports = roleModel