// drizzle.config.ts

import { type Config } from "drizzle-kit";
import { env } from "~/env";

export default {
    schema: "./src/server/db/schema.ts",
    dialect: "singlestore",
    dbCredentials: {
        host: env.SINGLESTORE_HOST,
        port: parseInt(env.SINGLESTORE_PORT),
        user: env.SINGLESTORE_USR,
        password: env.SINGLESTORE_PW,
        database: env.SINGLESTORE_DB,
        ssl: {}
    },
    tablesFilter: ['drive-tutorial_*'],
} satisfies Config;