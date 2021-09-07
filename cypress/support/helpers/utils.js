const faker = require("faker");

module.exports = {
    // Generates mock data using faker.js
    getUserMockData: () => {
        return {
            name: faker.name.findName(),
            email: faker.internet.email(),
            age: faker.random.number({
                min: 25,
                max: 50
            }),
            phone: faker.phone.phoneNumber('##########'),
            password: faker.internet.password(20, false, "", "demo@A545"),
            homepage: faker.internet.url()
        }
    }
}