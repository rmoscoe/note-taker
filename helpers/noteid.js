const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
const usedIds = [];

function generateId () {
    let newId = "";
    for (let i = 0; i < 8; i++) {
        newId += chars[Math.floor(Math.random() * chars.length)];
    }
    if (usedIds.includes(newId)) {
        return generateId();
    }
    usedIds.push(newId);
    return newId;
}

module.exports = generateId;