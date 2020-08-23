const dataManager = require('./dataManager.js');

class responder {
    login(data) {
        const {email: email, password: password} = data;
        const users = dataManager.getUsers();
        const currentUser = users.find((user) => {
            return user.email === email && user.password == password;
        });
        let result = { success: true };
        if (currentUser) {
            result.token = currentUser.token;
        } else {
            result.success = false;
            result.message = 'Invalid Credentials';
        }
        return JSON.stringify(result);
    }

    add(data) {
        const {token: token, newElement: item} = data;
        const user = dataManager.getUser(token);
        let result = { success: true };
        if (user) {
            try {
                dataManager.addNewItem(user.userId, item);
            } catch (e) {
                result.success = false;
                result.message = 'Error';
            }
        } else {
            result.success = false;
            result.message = 'Invalid Token';
        }
        return JSON.stringify(result);
    }

    emptyList(data) {
        const {token: token} = data;
        const user = dataManager.getUser(token);
        let result = { success: true };
        if (user) {
            try {
                dataManager.emptyList(user.userId);
            } catch (e) {
                result.success = false;
                result.message = 'Error';
            }
        } else {
            result.success = false;
            result.message = 'Invalid Token';
        }
        return JSON.stringify(result);
    }
}

module.exports = new responder();