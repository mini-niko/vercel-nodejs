const modulesPrint = {
    "express": {
        "tag": "[Express]",
        "color": "\u001b[1;33m"
    },
    "socket.io": {
        "tag": "[Socket.io]",
        "color": "\u001b[1;36m"
    }
}

function print(module, message) {
    let modulePrint = modulesPrint[module] || { "tag": `[${module.charAt(0).toUpperCase() + module.slice(1)}]`, "color": "\u001b[0;37m" }
    let reset = "\u001b[0m"
    let tag = `${modulePrint.color}${modulePrint.tag} ${reset}`;

    console.log(tag + message)
}

module.exports = { print }