// Import the dependencies for testing
import chai from "chai"
import chaiHttp from "chai-http"
var rimraf = require("rimraf")
import app from "../src/server"

// Configure chai
chai.use(chaiHttp)
chai.should()
var expect = chai.expect

const sharedInfo = {}
let authorization = null

rimraf(".tmp/localDiskDb/*", () => {
  console.log("  Cleared setup dir")
})

describe("Setup", () => {
  before(function (done) {
    this.timeout(4000) // wait for db connections etc.

    setTimeout(done, 4000)
  })

  describe("OPS", function () {
    it("Health check should return 200", done => {
      chai
        .request(app)
        .get("/health")
        .end((err, res) => {
          res.should.have.status(200)

          done()
        })
    })
  })
})

describe("Hello", () => {
  it("Should say Hello", done => {
    chai
      .request(app)
      .post("/graph")
      .set("content-type", "application/json")
      .send({
        query: `{ hello }`
      })
      .end((err, res) => {
        res.should.have.status(200)

        expect(res.body).to.be.an("object")
        expect(res.body.data.hello).to.be.a("string")
        expect(res.body.data.hello).to.be.equal("Hello query")
        done()
      })
  })
})

describe("Tables", () => {
  it("should make a table", done => {
    chai
      .request(app)
      .post("/graph")
      .set("content-type", "application/json")
      .send({
        query: `mutation($table: Itable!){
          tables{
            create(table: $table){
              id
            }
          }
        }`,
        variables: {
          table: {
            seats: 4,
            device: "device-id-001",
            number: 15
          }
        }
      })
      .end((err, res) => {
        res.should.have.status(200)

        expect(res.body).to.be.an("object")
        expect(res.body.data.tables.create.id).to.be.a("string")

        sharedInfo.tableId = res.body.data.tables.create.id
        done()
      })
  })

  it("should update a table", done => {
    chai
      .request(app)
      .post("/graph")
      .set("content-type", "application/json")
      .send({
        query: `mutation($table: Utable!){
          tables{
            update(table: $table){
              id
            }
          }
        }`,
        variables: {
          table: {
            id: sharedInfo.tableId,
            seats: 6,
          }
        }
      })
      .end((err, res) => {
        res.should.have.status(200)

        expect(res.body).to.be.an("object")
        expect(res.body.data.tables.update.id).to.be.a("string")

        done()
      })
  })

  it("should archive a table", done => {
    chai
      .request(app)
      .post("/graph")
      .set("content-type", "application/json")
      .send({
        query: `mutation($table: Utable!){
          tables{
            archive(table: $table){
              id
            }
          }
        }`,
        variables: {
          table: {
            id: sharedInfo.tableId
          }
        }
      })
      .end((err, res) => {
        res.should.have.status(200)

        expect(res.body).to.be.an("object")
        expect(res.body.data.tables.archive.id).to.be.a("string")

        done()
      })
  })

  it("should restore a table", done => {
    chai
      .request(app)
      .post("/graph")
      .set("content-type", "application/json")
      .send({
        query: `mutation($table: Utable!){
          tables{
            restore(table: $table){
              id
            }
          }
        }`,
        variables: {
          table: {
            id: sharedInfo.tableId
          }
        }
      })
      .end((err, res) => {
        res.should.have.status(200)

        expect(res.body).to.be.an("object")
        expect(res.body.data.tables.restore.id).to.be.a("string")

        done()
      })
  })
})

describe("Meals", () => {
  it("should make a meal", done => {
    chai
      .request(app)
      .post("/graph")
      .set("content-type", "application/json")
      .send({
        query: `mutation($meal: Imeal!){
          meals{
            create(meal: $meal){
              id
            }
          }
        }`,
        variables: {
          meal: {
            name: "KFC Streetwise 1",
            items: ["Spicy fried chicken", "French fries side"],
            img: "http://localhost/images/kfc-streetwise-1.png",
            price: 399.00
          }
        }
      })
      .end((err, res) => {
        res.should.have.status(200)

        expect(res.body).to.be.an("object")
        expect(res.body.data.meals.create.id).to.be.a("string")

        sharedInfo.mealId = res.body.data.meals.create.id
        done()
      })
  })

  it("should update a meal", done => {
    chai
      .request(app)
      .post("/graph")
      .set("content-type", "application/json")
      .send({
        query: `mutation($meal: Umeal!){
          meals{
            update(meal: $meal){
              id
            }
          }
        }`,
        variables: {
          meal: {
            id: sharedInfo.mealId,
            name: "Streetwise One by KFC",
          }
        }
      })
      .end((err, res) => {
        res.should.have.status(200)

        expect(res.body).to.be.an("object")
        expect(res.body.data.meals.update.id).to.be.a("string")

        done()
      })
  })

  it("should archive a meal", done => {
    chai
      .request(app)
      .post("/graph")
      .set("content-type", "application/json")
      .send({
        query: `mutation($meal: Umeal!){
          meals{
            archive(meal: $meal){
              id
            }
          }
        }`,
        variables: {
          meal: {
            id: sharedInfo.mealId
          }
        }
      })
      .end((err, res) => {
        res.should.have.status(200)

        expect(res.body).to.be.an("object")
        expect(res.body.data.meals.archive.id).to.be.a("string")

        done()
      })
  })

  it("should restore a meal", done => {
    chai
      .request(app)
      .post("/graph")
      .set("content-type", "application/json")
      .send({
        query: `mutation($meal: Umeal!){
          meals{
            restore(meal: $meal){
              id
            }
          }
        }`,
        variables: {
          meal: {
            id: sharedInfo.mealId
          }
        }
      })
      .end((err, res) => {
        res.should.have.status(200)

        expect(res.body).to.be.an("object")
        expect(res.body.data.meals.restore.id).to.be.a("string")
        
        done()
      })
  })
})

describe("Meal Instances", () => {
  it("should make a instance", done => {
    chai
      .request(app)
      .post("/graph")
      .set("content-type", "application/json")
      .send({
        query: `mutation($instance: Iinstance!){
          instances{
            create(instance: $instance){
              id
            }
          }
        }`,
        variables: {
          instance: {
            meal: sharedInfo.mealId,
            amount: 3
          }
        }
      })
      .end((err, res) => {
        res.should.have.status(200)

        expect(res.body).to.be.an("object")
        expect(res.body.data.instances.create.id).to.be.a("string")

        sharedInfo.instanceId = res.body.data.instances.create.id
        done()
      })
  })

  it("should update a instance", done => {
    chai
      .request(app)
      .post("/graph")
      .set("content-type", "application/json")
      .send({
        query: `mutation($instance: Uinstance!){
          instances{
            update(instance: $instance){
              id
            }
          }
        }`,
        variables: {
          instance: {
            id: sharedInfo.instanceId,
            amount: 4,
          }
        }
      })
      .end((err, res) => {
        res.should.have.status(200)

        expect(res.body).to.be.an("object")
        expect(res.body.data.instances.update.id).to.be.a("string")

        done()
      })
  })

  it("should archive a instance", done => {
    chai
      .request(app)
      .post("/graph")
      .set("content-type", "application/json")
      .send({
        query: `mutation($instance: Uinstance!){
          instances{
            archive(instance: $instance){
              id
            }
          }
        }`,
        variables: {
          instance: {
            id: sharedInfo.instanceId
          }
        }
      })
      .end((err, res) => {
        res.should.have.status(200)

        expect(res.body).to.be.an("object")
        expect(res.body.data.instances.archive.id).to.be.a("string")

        done()
      })
  })

  it("should restore a instance", done => {
    chai
      .request(app)
      .post("/graph")
      .set("content-type", "application/json")
      .send({
        query: `mutation($instance: Uinstance!){
          instances{
            restore(instance: $instance){
              id
            }
          }
        }`,
        variables: {
          instance: {
            id: sharedInfo.instanceId
          }
        }
      })
      .end((err, res) => {
        res.should.have.status(200)

        expect(res.body).to.be.an("object")
        expect(res.body.data.instances.restore.id).to.be.a("string")
        
        done()
      })
  })
})