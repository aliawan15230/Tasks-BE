const request = require('supertest')
const app = require('../../app')

describe("given a title and description", () => {

  test("should respond with a 200 status code", async () => {
    const response = await request(app).post("/apis/tasks").send({
      title: "helo",
      description: "hello desc"
    })
    expect(response.statusCode).toBe(200)
  })
})

describe("when the title and description is missing", () => {
  test("should respond with a status code of 200", async () => {
    const bodyData = {}
    const response = await request(app).post("/apis/tasks").send(bodyData)
    expect(response.statusCode).toBe(500)
  })
})