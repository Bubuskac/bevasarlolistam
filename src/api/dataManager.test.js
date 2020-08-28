let written = false;
jest.mock('fs', () => {
    return { 
        readFileSync: () => {
            return "{}";
        },
        writeFileSync: () => {
            written = true;
        }
    };
});
const dataManager = require('./dataManager.js');

beforeEach(() => {
    written = false;
    dataManager.db = {
        "users":[{"userId":1,"email":"teszt.elemer@teszt.hu","password":"4321","token":"fjiweojgtithpefeij"}],
        "lists":{"1":["vaj","sajt","Tej"]}
    };
});

test('Returning the users', () => {
    const result = dataManager.getUsers();
    expect(result).toStrictEqual([{"userId":1,"email":"teszt.elemer@teszt.hu","password":"4321","token":"fjiweojgtithpefeij"}]);
});

test('Returning a user', () => {
    const result = dataManager.getUser("fjiweojgtithpefeij");
    expect(result).toStrictEqual({"userId":1,"email":"teszt.elemer@teszt.hu","password":"4321","token":"fjiweojgtithpefeij"});
});

test('No such user', () => {
    const result = dataManager.getUser("fjiweojgthpefeij");
    expect(result).toBeUndefined();
});

test('Adding an item', () => {
    dataManager.addNewItem(1, "kakaó");
    expect(written).toBe(true);
});

test('Adding an item throws error because duplicate item', () => {
    expect(() => {dataManager.addNewItem(1, "sajt")}).toThrow('Invalid Item');
    expect(written).toBe(false);
});

test('Adding an item throws error because empty item', () => {
    expect(() => {dataManager.addNewItem(1, "")}).toThrow('Invalid Item');
    expect(written).toBe(false);
});

test('Emtying list', () => {
    dataManager.emptyList(1);
    expect(written).toBe(true);
});

test('Remove item', () => {
    dataManager.removeItem(1, "sajt");
    expect(written).toBe(true);
});

test('Get item list', () => {
    const result = dataManager.getItems(1);
    expect(result).toStrictEqual(["vaj","sajt","Tej"]);
});