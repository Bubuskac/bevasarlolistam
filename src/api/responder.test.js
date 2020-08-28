jest.mock('./dataManager.js', () => {
    return { 
        getUsers: () => {
            return [{"userId":1,"email":"teszt.elemer@teszt.hu","password":"12345","token":"vdfijgreigjojeiorji43joi"}];
        },
        getUser: (token) => {
            return [
                {"userId":1,"email":"teszt.elemer@teszt.hu","password":"12345","token":"vdfijgreigjojeiorji43joi"}
            ].find((item) => {return token === item.token});
        },
        addNewItem: (userId, item) => {
            if (item == "") {
                throw 'Invalid Item';
            }
        },
        emptyList: () => {},
        removeItem: () => {},
        getItems: () => {
            return ["sajt"];
        }
    };
});
const responder = require('./responder.js');

test('Login is successful', () => {
    const result = responder.login({email: "teszt.elemer@teszt.hu", password: "12345"});
    expect(result).toBe('{"success":true,"token":"vdfijgreigjojeiorji43joi"}');
});
test('Login is failed because of user', () => {
    const result = responder.login({email: "teszt.elek@teszt.hu", password: "12345"});
    expect(result).toBe('{"success":false,"message":"Invalid Credentials"}');
});

test('Login is failed beause of password', () => {
    const result = responder.login({email: "teszt.elemer@teszt.hu", password: "1234"});
    expect(result).toBe('{"success":false,"message":"Invalid Credentials"}');
});

test('Adding new item', () => {
    const result = responder.add({token: "vdfijgreigjojeiorji43joi", newElement: "sajt"});
    expect(result).toBe('{"success":true}');
});

test('Adding new item fails', () => {
    const result = responder.add({token: "vdfijgreigjojeiorji43joi", newElement: ""});
    expect(result).toBe('{"success":false,"message":"Error"}');
});

test('Adding new item fails because of token', () => {
    const result = responder.add({token: "vdfijgreigjojeiorji43j", newElement: "sajt"});
    expect(result).toBe('{"success":false,"message":"Invalid Token"}');
});

test('Empty list fails because of token', () => {
    const result = responder.emptyList({token: "vdfijgreigjojeiorji43j"});
    expect(result).toBe('{"success":false,"message":"Invalid Token"}');
});

test('Empty list', () => {
    const result = responder.emptyList({token: "vdfijgreigjojeiorji43joi"});
    expect(result).toBe('{"success":true}');
});

test('Deleting item', () => {
    const result = responder.delete({token: "vdfijgreigjojeiorji43joi", deleteElement: "sajt"});
    expect(result).toBe('{"success":true}');
});

test('Deleting item fails because of token', () => {
    const result = responder.delete({token: "vdfijgreigjojeiorji43j", deleteElement: "sajt"});
    expect(result).toBe('{"success":false,"message":"Invalid Token"}');
});

test('Loading items', () => {
    const result = responder.load({token: "vdfijgreigjojeiorji43joi"});
    expect(result).toBe('{"success":true,"list":["sajt"]}');
});

test('Loading items fails because of token', () => {
    const result = responder.load({token: "vdfijgreigjojeiorji43j"});
    expect(result).toBe('{"success":false,"message":"Invalid Token"}');
});