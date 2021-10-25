const Engineer = require('../lib/Engineer');

test('create engineer', () => {
    const engineer = new Engineer('Jay', 26, 'grossjaylin@gmail.com','Jaygross');

    expect(engineer.github).toEqual(expect.any(String));
});


test('engineer github', () => {
    const engineer = new Engineer('Jay', 26, 'grossjaylin@gmail.com', 'Jaygross');

    expect(engineer.getGithub()).toEqual(expect.stringContaining(engineer.email.toString()));
});

test('engineer role', () => {
    const engineer = new Engineer('Jay', 26, 'grossjaylin@gmail.com','Jaygross');

    expect(engineer.getRole()).toEqual("Engineer");
});