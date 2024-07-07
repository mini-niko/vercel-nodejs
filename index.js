console.clear()
require("dotenv").config()
const print = require("./print")
const fakeDb = require("./fakeDb")

print.print("express", "Configurando...")
const app = require("express")()
const server = require("http").createServer(app)
print.print("express", "Configurado")

console.log(process.env.CORS)

print.print("socket.io", "Configurando...")
const io = require("socket.io")(server, {
    cors: {
        origin: `${process.env.CORS}`
    }
})

var leaderboard = {

}

users = fakeDb.getUsers()
for(user in users) {
    leaderboard[users[user].name] = { clicks: users[user].clicks, active: false }
}

io.on("connection", socket => { 
    print.print("socket.io", `Id ${socket.id} conectado`)
    
    socket.on("disconnect", () => {
        if(socket.data.name) leaderboard[socket.data.name].active = false
        print.print("socket.io", `Id ${socket.id} desconectado`)
    })

    socket.on("login", (user) => {
        userDb = fakeDb.getUserByName(user.name)

        if(userDb != null && userDb.password == user.password) {
            socket.data.name = user.name
            socket.emit("login")
            if(socket.data.name) leaderboard[socket.data.name].active = true
        }
    })

    socket.on("register", (user) => {
        userDb = fakeDb.getUserByName(user.name)

        if(!userDb) {
            user["clicks"] = 0
            fakeDb.addUser(user)
            socket.data.name = user.name
            socket.emit("login")
            leaderboard[socket.data.name] = { clicks: 0, active: false }
            if(socket.data.name) leaderboard[socket.data.name].active = true
        }
    })

    socket.on("clicked", () => {
        leaderboard[socket.data.name].clicks++
    })
})

setInterval(() => io.emit("update leaderboard", leaderboard), 1000)
setInterval(() => {
    let users = []
    for (user in leaderboard) {
        fakeDb.setClicks(user, leaderboard[user].clicks)
    }
}, 3000)

print.print("socket.io", "Configurado")

server.listen(process.env.PORT, () => console.log(`\n🎉 O servidor está aberto na porta ${process.env.PORT}\n`))