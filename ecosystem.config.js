module.exports = {
    apps: [
        {
            name: "realtime",
            script: "npm run start",
            cwd: "./Development/realtime/",
            watch: true,
            max_memory_restart: '1000M',
            env: {
                NODE_ENV: "development",
            },
            env_production: {
                NODE_ENV: "production",
            }
        },
        {
            name: "storage",
            script: "npm run start",
            cwd: "./Development/storage/",
            watch: true,
            env: {
                NODE_ENV: "development",
            },
            env_production: {
                NODE_ENV: "production",

            }

        },
        {
            name: "webapp",
            script: "npm run start",
            cwd: "./Development/webapp/",
            env: {
                NODE_ENV: "development",
            },
            env_production: {
                NODE_ENV: "production",
            }
        }

    ]
}
