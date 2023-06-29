const request = require("supertest");
const app = require("../app");

describe("Test Get /launches", () => {
  test("It should respond with 200 success", async () => {
    const response = await request(app)
      .get("/launches")
      .expect("Content-Type", /json/)
      .expect(200);
  });
});

describe("Test POST /launches", () => {
  const data = {
    mission: "Test Mission",
    rocket: "rocket 1",
    target: "target 1",
    launchDate: "2020-01-01",
    destination: "200km",
  };
  const dataWithoutDate = {
    mission: "Test Mission",
    rocket: "rocket 1",
    target: "target 1",
    destination: "200km",
  };
  test("It should respond with 201 created", async () => {
    const response = await request(app)
      .post("/launches")
      .send(data)
      .expect("Content-Type", /json/)
      .expect(201);

    const requestDate = data.launchDate;
    const responseDate = response.body.launchDate;
    expect(response.body).toMatchObject(dataWithoutDate);
    expect(new Date(responseDate)).toEqual(new Date(requestDate));
  });

  test("It should catch missing required properties", async () => {
    const response = await request(app)
      .post("/launches")
      .send({})
      .expect("Content-Type", /json/)
      .expect(400);

    expect(response.body).toStrictEqual({
      error: "Missing required launch property",
    });
    
  });

  test("It should catch invalid dates", async () => {
    const response = await request(app)
      .post("/launches")
      .send({
        mission: "Test Mission",
        rocket: "rocket 1",
        target: "target 1",
        launchDate: "not a date",
        destination: "200km",
      })
      .expect("Content-Type", /json/)
      .expect(400);

    expect(response.body).toStrictEqual({
      error: "Invalid launch date",
    });
  });


});





