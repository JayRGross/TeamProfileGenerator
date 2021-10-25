const Manager = require('../lib/Manager');

test('create manager', () => {
    const manager = new Manager('Jay', 26, 'grossjaylin@gmail.com', 3);

    expect(manager.officeNumber).toEqual(expect.any(Number));
});


test('manager role', () => {
    const manager = new Manager('Jay', 26, 'grossjaylin@gmail.com');

    expect(manager.getRole()).toEqual("Manager");
});