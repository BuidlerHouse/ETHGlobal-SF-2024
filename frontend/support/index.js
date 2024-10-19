const express = require("express")
const axios = require("axios")
const exec = require("child_process").exec
const app = express()
const port = 3559
const { spawn } = require("child_process")

app.use(express.json())

function executeCommand(command) {
    return new Promise((resolve, reject) => {
        const parts = command.split(" ")
        const cmd = parts.shift()
        const args = parts

        const child = spawn(cmd, args, { shell: true })

        // Listen for data events (stdout)
        child.stdout.on("data", (data) => {
            console.log(data.toString())
        })

        // Listen for data events (stderr)
        child.stderr.on("data", (data) => {
            console.error(data.toString())
        })

        // Listen for the 'close' event
        child.on("close", (code) => {
            if (code === 0) {
                resolve()
            } else {
                reject(new Error(`Command '${command}' failed with exit code ${code}`))
            }
        })
    })
}

app.post("/siafrontend", (req, res) => {
    res.sendStatus(200)
    const util = require("util")
    const exec = util.promisify(require("child_process").exec)

    async function updateAndRestart() {
        try {
            if (req.body.ref.includes("main")) {
                // Step 1: pull the code
                await executeCommand("cd /var/www/address/ && git pull")

                // Step 2: Build the new Docker image
                await executeCommand(
                    "cd /var/www/address/ && docker-compose up -build -d"
                )


                data = {
                    msg_type: "text",
                    content: {
                        text: `New push in ${req.body.repository.full_name} by ${
                            req.body.sender.login
                        } has been deployed\ndescription:${req.body.head_commit.message}\nBranch:${
                            req.body.ref
                        }\nModified Files:${req.body.head_commit.modified.join("\n")}`,
                    },
                }
            }
        } catch (error) {
            console.error(error)
        }
    }

    updateAndRestart()
})

app.listen(port, () => {
    console.log(`Webhook listener started at http://localhost:${port}`)
})
