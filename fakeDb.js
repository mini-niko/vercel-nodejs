const fs = require('fs');
const path = require('path');

const dbPath = path.join(__dirname, 'db.json');

function readDB() {
    const data = fs.readFileSync(dbPath, 'utf8');
    return JSON.parse(data);
}

function writeDB(data) {
    fs.writeFileSync(dbPath, JSON.stringify(data, null, 2));
}

function addUser(user) {
    const db = readDB();
    db.users.push(user);
    writeDB(db);
}

function getUsers() {
    const db = readDB();
    return db.users;
}

function getUserByName(name) {
    const db = readDB();
    return db.users.find(u => u.name == name);
}

function setClicks(name, clicks) {
    const db = readDB();
    db.users.find(u => u.name == name).clicks = clicks;
    writeDB(db);    
}

module.exports = {
    addUser,
    getUsers,
    getUserByName,
    setClicks
};