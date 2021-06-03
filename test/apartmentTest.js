const expect = require("chai").expect;
const request = require("supertest");
const Apartment = require("../models/apartmentModel");
const app = require("../app");
let token;

describe("/apartment/add", () => {

    //before(async () => {
    //    const res = await request(app)
    //        .post("/auth/login")
    //        .send({
    //            email: "esteve@gmail.com",
    //            password: "spain@S4"
    //        });
    //    token = res.body.token;
    //    console.log("&&&&&&&&&&&&&&&&&&&&&&& "+token)
        
    //});

    it("should return 401 not authorized", async () => {
        const res = await request(app)
            .post("/apartment/add")
            .send({ "name": "Studio apartment", "city": "Berlin", "address": "yumxo sjjis", "lat": 52.5978114, "lon": 13.2952603, "noOfRooms": 2, "country": "Germany" });
        const data = res.body;
        expect(res.status).to.equal(401);
    });

    it("should return 200 on adding apartment", async () => {
        const loginRes = await request(app)
            .post("/auth/login")
            .send({
                email: "esteve@gmail.com",
                password: "spain@S4"
            });
        const res = await request(app)
            .post("/apartment/add")
            .set({ "Authorization": loginRes.body.token })
            .send({ "name": "Studio apartment", "city": "Berlin", "address": "yumxo sjjis", "lat": 52.5978114, "lon": 13.2952603, "noOfRooms": 2, "country": "Germany" });
        const data = res.body;
        expect(res.status).to.equal(200);
        expect(data).to.have.property("id");

        const apartment = await Apartment.findOne({ _id: data.id });
        expect(apartment.name).to.equal('Studio apartment');
        expect(apartment.city).to.equal('Berlin');
    });

})

    //describe("GET /", () => {
    //    it("should return all users", async () => {
    //        const users = [
    //            { name: "george", email: "geo@gmail.com", country: "romania" },
    //            { name: "maria", email: "maria@gmail.com", country: "spain" }
    //        ];
    //        await User.insertMany(users);
    //        console.log(users);
    //        const res = await request(app).get("/api/users");
    //        expect(res.status).to.equal(200);
    //        expect(res.body.length).to.equal(2);
    //    });
    //});

    //describe("GET/:id", () => {
    //    it("should return a user if valid id is passed", async () => {
    //        const user = new User({
    //            name: "florian",
    //            email: "florian@gmail.com",
    //            country: "germany"
    //        });
    //        await user.save();
    //        const res = await request(app).get("/api/users/" + user._id);
    //        expect(res.status).to.equal(200);
    //        expect(res.body).to.have.property("name", user.name);
    //    });

    //    it("should return 400 error when invalid object id is passed", async () => {
    //        const res = await request(app).get("/api/users/1");
    //        expect(res.status).to.equal(400);
    //    });

    //    it("should return 404 error when valid object id is passed but does not exist", async () => {
    //        const res = await request(app).get("/api/users/5f43ef20c1d4a133e4628181");
    //        expect(res.status).to.equal(404);
    //    });
    //});

