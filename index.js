const configEnv = process.env.CONFIG_ENV || "development";

const main = require("./server/main");
main(configEnv);
