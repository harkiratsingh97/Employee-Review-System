const mongoose = require("mongoose");

const env = require("./environment");


mongoose.connect(env.db).then(() => console.log("DB Connected"));
