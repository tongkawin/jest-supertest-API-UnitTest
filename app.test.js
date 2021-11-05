const request = require("supertest");

const app = require("./app");

let elementId;

describe("Test example", () => {
    test("GET /", (done) => {
        request(app)
            .get("/")
            .expect("Content-Type", /json/)
            .expect(200)
            .expect((res) => {
                res.body.data.length = 1;
                res.body.data[0].email = "test@example.com";
            })
            .end((err, res) => {
                if (err) return done(err);
                return done();
            });
    });

    test("POST /send", (done) => {
        request(app)
            .post("/send")
            .expect("Content-Type", /json/)
            .send({
                email: "francisco@example.com",
            })
            .expect(201)
            .expect((res) => {
                res.body.data.length = 2;
                res.body.data[0].email = "test@example.com";
                res.body.data[1].email = "francisco@example.com";
            })
            .end((err, res) => {
                if (err) return done(err);
                elementId = res.body.data[1].id;
                return done();
            });
    });

    test("PUT /update/:id", (done) => {
        request(app)
            .put(`/update/${elementId}`)
            .expect("Content-Type", /json/)
            .send({
                email: "mendes@example.com",
            })
            .expect(200)
            .expect((res) => {
                res.body.data.length = 2;
                res.body.data[0].email = "test@example.com";
                res.body.data[1].id = elementId;
                res.body.data[1].email = "mendes@example.com";
            })
            .end((err, res) => {
                if (err) return done(err);
                return done();
            });
    });

    test("DELETE /delete/:id", (done) => {
        request(app)
            .delete(`/delete/${elementId}`)
            .expect("Content-Type", /json/)
            .expect(200)
            .expect((res) => {
                res.body.data.length = 1;
                res.body.data[0].email = "test@example.com";
            })
            .end((err, res) => {
                if (err) return done(err);
                return done();
            });
    });
});