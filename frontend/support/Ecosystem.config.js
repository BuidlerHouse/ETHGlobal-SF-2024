module.exports = {
    apps: [
        {
            name: "github-hook",
            script: "npm",
            args: "start",
            env: {
                NODE_ENV: "production",
            },
            max_memory_restart: "70M",
        },
    ],
}
