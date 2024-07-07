const { print } = require("../../print")

module.exports = {
    name: "connect",
    run(socket) {
        print.print("socket.io", `Id ${socket.id} conectado`)
    }
}