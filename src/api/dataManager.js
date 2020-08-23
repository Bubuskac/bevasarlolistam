const fs = require('fs');

class dataManager {
    db = JSON.parse(fs.readFileSync("database.json", "utf8"));

    getUsers() {
        return this.db.users;
    }

    getUser(token) {
        return this.db.users.find((user) => {
            return user.token === token;
        });
    }

    addNewItem(userId, item) {
        if (this.db.lists[userId]) {
            this.db.lists[userId].push(item);
        } else {
            this.db.lists[userId] = [item];
        }
        fs.writeFileSync("database.json", JSON.stringify(this.db));
    }
}

module.exports = new dataManager();