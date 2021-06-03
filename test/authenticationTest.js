const expect = require("chai").expect;
const request = require("supertest");
const User = require("../models/userModel");
const app = require("../app");


describe("/auth/signup", () => {
    before(async () => {
        // before each test delete all users table data
        await User.deleteMany({});
    });

    it("should return 200 on signup with auth token", async () => {
        const res = await request(app)
            .post("/auth/signup")
            .send({
                name: "esteve",
                email: "esteve@gmail.com",
                password: "spain@S4"
            });
        const data = res.body;
        expect(res.status).to.equal(200);
        expect(data).to.have.property("id");
        expect(data).to.have.property("token");

        const user = await User.findOne({ email: 'esteve@gmail.com' });
        expect(user.name).to.equal('esteve');
        expect(user.email).to.equal('esteve@gmail.com');
    });

    it("should return user already exists if user is available in DB", async () => {
        const res = await request(app)
            .post("/auth/signup")
            .send({
                name: "esteve",
                email: "esteve@gmail.com",
                password: "spain@S4"
            });
        expect(res.status).to.equal(409);
    });

    
})

describe("/auth/login", () => {

    it("should return 200 on login with auth token", async () => {
        const res = await request(app)
            .post("/auth/login")
            .send({
                email: "esteve@gmail.com",
                password: "spain@S4"
            });
        const data = res.body;
        expect(res.status).to.equal(200);
        expect(data).to.have.property("id");
        expect(data).to.have.property("token");
    });

    it("should return invalid password 400", async () => {
        const res = await request(app)
            .post("/auth/login")
            .send({
                email: "esteve@gmail.com",
                password: "spain@S"
            });
        expect(res.status).to.equal(400);
    });


    it("should return user not found 404", async () => {
        const res = await request(app)
            .post("/auth/login")
            .send({
                email: "esteve@gmaill.com",
                password: "spain@S"
            });
        expect(res.status).to.equal(404);
    });


})


  