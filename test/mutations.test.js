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

describe("Menus", () => {
  it("should make a menu", done => {
    chai
      .request(app)
      .post("/graph")
      .set("content-type", "application/json")
      .send({
        query: `mutation($menu: Imenu!){
          menus{
            create(menu: $menu){
              id
            }
          }
        }`,
        variables: {
          menu: {
            name: "KFC",
          }
        }
      })
      .end((err, res) => {
        res.should.have.status(200)

        console.log(res.body)

        expect(res.body).to.be.an("object")
        expect(res.body.data.menus.create.id).to.be.a("string")

        sharedInfo.menuId = res.body.data.menus.create.id
        done()
      })
  })

  it("should update a menu", done => {
    chai
      .request(app)
      .post("/graph")
      .set("content-type", "application/json")
      .send({
        query: `mutation($menu: Umenu!){
          menus{
            update(menu: $menu){
              id
            }
          }
        }`,
        variables: {
          menu: {
            id: sharedInfo.menuId,
            name: "KFC Chicken Buckets",
          }
        }
      })
      .end((err, res) => {
        res.should.have.status(200)

        expect(res.body).to.be.an("object")
        expect(res.body.data.menus.update.id).to.be.a("string")

        done()
      })
  })

  it("should archive a menu", done => {
    chai
      .request(app)
      .post("/graph")
      .set("content-type", "application/json")
      .send({
        query: `mutation($menu: Umenu!){
          menus{
            archive(menu: $menu){
              id
            }
          }
        }`,
        variables: {
          menu: {
            id: sharedInfo.menuId
          }
        }
      })
      .end((err, res) => {
        res.should.have.status(200)

        expect(res.body).to.be.an("object")
        expect(res.body.data.menus.archive.id).to.be.a("string")

        done()
      })
  })

  it("should restore a menu", done => {
    chai
      .request(app)
      .post("/graph")
      .set("content-type", "application/json")
      .send({
        query: `mutation($menu: Umenu!){
          menus{
            restore(menu: $menu){
              id
            }
          }
        }`,
        variables: {
          menu: {
            id: sharedInfo.menuId
          }
        }
      })
      .end((err, res) => {
        res.should.have.status(200)

        expect(res.body).to.be.an("object")
        expect(res.body.data.menus.restore.id).to.be.a("string")
        
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
            menu: sharedInfo.menuId,
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

describe("Sessions", () => {
  it("should make a session", done => {
    chai
      .request(app)
      .post("/graph")
      .set("content-type", "application/json")
      .send({
        query: `mutation($session: Isession!){
          sessions{
            create(session: $session){
              id
            }
          }
        }`,
        variables: {
          session: {
            table: sharedInfo.tableId
          }
        }
      })
      .end((err, res) => {
        res.should.have.status(200)

        expect(res.body).to.be.an("object")
        expect(res.body.data.sessions.create.id).to.be.a("string")

        sharedInfo.sessionId = res.body.data.sessions.create.id
        done()
      })
  })

  it("should update a session", done => {
    chai
      .request(app)
      .post("/graph")
      .set("content-type", "application/json")
      .send({
        query: `mutation($session: Usession!){
          sessions{
            update(session: $session){
              id
            }
          }
        }`,
        variables: {
          session: {
            id: sharedInfo.sessionId,
            end_time: new Date().toLocaleString(),
          }
        }
      })
      .end((err, res) => {
        res.should.have.status(200)

        expect(res.body).to.be.an("object")
        expect(res.body.data.sessions.update.id).to.be.a("string")

        done()
      })
  })

  it("should archive a session", done => {
    chai
      .request(app)
      .post("/graph")
      .set("content-type", "application/json")
      .send({
        query: `mutation($session: Usession!){
          sessions{
            archive(session: $session){
              id
            }
          }
        }`,
        variables: {
          session: {
            id: sharedInfo.sessionId
          }
        }
      })
      .end((err, res) => {
        res.should.have.status(200)

        expect(res.body).to.be.an("object")
        expect(res.body.data.sessions.archive.id).to.be.a("string")

        done()
      })
  })

  it("should restore a session", done => {
    chai
      .request(app)
      .post("/graph")
      .set("content-type", "application/json")
      .send({
        query: `mutation($session: Usession!){
          sessions{
            restore(session: $session){
              id
            }
          }
        }`,
        variables: {
          session: {
            id: sharedInfo.sessionId
          }
        }
      })
      .end((err, res) => {
        res.should.have.status(200)

        expect(res.body).to.be.an("object")
        expect(res.body.data.sessions.restore.id).to.be.a("string")
        
        done()
      })
  })
})

describe("Orders", () => {
  it("should make an order", done => {
    chai
      .request(app)
      .post("/graph")
      .set("content-type", "application/json")
      .send({
        query: `mutation($order: Iorder!){
          orders{
            create(order: $order){
              id
            }
          }
        }`,
        variables: {
          order: {
            session: sharedInfo.sessionId,
            status: "NEW",
          }
        }
      })
      .end((err, res) => {
        res.should.have.status(200)

        expect(res.body).to.be.an("object")
        expect(res.body.data.orders.create.id).to.be.a("string")

        sharedInfo.orderId = res.body.data.orders.create.id
        done()
      })
  })

  it("should update an order", done => {
    chai
      .request(app)
      .post("/graph")
      .set("content-type", "application/json")
      .send({
        query: `mutation($order: Uorder!){
          orders{
            update(order: $order){
              id
            }
          }
        }`,
        variables: {
          order: {
            id: sharedInfo.orderId,
            status: "PENDING",
          }
        }
      })
      .end((err, res) => {
        res.should.have.status(200)

        expect(res.body).to.be.an("object")
        expect(res.body.data.orders.update.id).to.be.a("string")
        done()
      })
  })

  it("should archive an order", done => {
    chai
      .request(app)
      .post("/graph")
      .set("content-type", "application/json")
      .send({
        query: `mutation($order: Uorder!){
          orders{
            archive(order: $order){
              id
            }
          }
        }`,
        variables: {
          order: {
            id: sharedInfo.orderId
          }
        }
      })
      .end((err, res) => {
        res.should.have.status(200)

        expect(res.body).to.be.an("object")
        expect(res.body.data.orders.archive.id).to.be.a("string")

        done()
      })
  })

  it("should restore an order", done => {
    chai
      .request(app)
      .post("/graph")
      .set("content-type", "application/json")
      .send({
        query: `mutation($order: Uorder!){
          orders{
            restore(order: $order){
              id
            }
          }
        }`,
        variables: {
          order: {
            id: sharedInfo.orderId
          }
        }
      })
      .end((err, res) => {
        res.should.have.status(200)

        expect(res.body).to.be.an("object")
        expect(res.body.data.orders.restore.id).to.be.a("string")
        
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
            order: sharedInfo.orderId,
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

describe("Bills", () => {
  it("should make a bill", done => {
    chai
      .request(app)
      .post("/graph")
      .set("content-type", "application/json")
      .send({
        query: `mutation($bill: Ibill!){
          bills{
            create(bill: $bill){
              id
            }
          }
        }`,
        variables: {
          bill: {
            session: sharedInfo.sessionId
          }
        }
      })
      .end((err, res) => {
        res.should.have.status(200)

        expect(res.body).to.be.an("object")
        expect(res.body.data.bills.create.id).to.be.a("string")

        sharedInfo.billId = res.body.data.bills.create.id
        done()
      })
  })

  it("should archive a bill", done => {
    chai
      .request(app)
      .post("/graph")
      .set("content-type", "application/json")
      .send({
        query: `mutation($bill: Ubill!){
          bills{
            archive(bill: $bill){
              id
            }
          }
        }`,
        variables: {
          bill: {
            id: sharedInfo.billId
          }
        }
      })
      .end((err, res) => {
        res.should.have.status(200)

        expect(res.body).to.be.an("object")
        expect(res.body.data.bills.archive.id).to.be.a("string")

        done()
      })
  })

  it("should restore a bill", done => {
    chai
      .request(app)
      .post("/graph")
      .set("content-type", "application/json")
      .send({
        query: `mutation($bill: Ubill!){
          bills{
            restore(bill: $bill){
              id
            }
          }
        }`,
        variables: {
          bill: {
            id: sharedInfo.billId
          }
        }
      })
      .end((err, res) => {
        res.should.have.status(200)

        expect(res.body).to.be.an("object")
        expect(res.body.data.bills.restore.id).to.be.a("string")
        
        done()
      })
  })
})

describe("Payments", () => {
  it("should make a payment", done => {
    chai
      .request(app)
      .post("/graph")
      .set("content-type", "application/json")
      .send({
        query: `mutation($payment: Ipayment!){
          payments{
            create(payment: $payment){
              id
            }
          }
        }`,
        variables: {
          payment: {
            bill: sharedInfo.billId,
            method: "dummy payment method",
            amount: 399.99
          }
        }
      })
      .end((err, res) => {
        res.should.have.status(200)

        expect(res.body).to.be.an("object")
        expect(res.body.data.payments.create.id).to.be.a("string")

        sharedInfo.paymentId = res.body.data.payments.create.id
        done()
      })
  })

  it("should update a payment", done => {
      chai
        .request(app)
        .post("/graph")
        .set("content-type", "application/json")
        .send({
          query: `mutation($payment: Upayment!){
            payments{
              update(payment: $payment){
                id
              }
            }
          }`,
          variables: {
            payment: {
              id: sharedInfo.paymentId,
              amount: 1500.00,
            }
          }
        })
        .end((err, res) => {
          res.should.have.status(200)
  
          expect(res.body).to.be.an("object")
          expect(res.body.data.payments.update.id).to.be.a("string")
  
          done()
        })
    })

  it("should archive a payment", done => {
    chai
      .request(app)
      .post("/graph")
      .set("content-type", "application/json")
      .send({
        query: `mutation($payment: Upayment!){
          payments{
            archive(payment: $payment){
              id
            }
          }
        }`,
        variables: {
          payment: {
            id: sharedInfo.paymentId
          }
        }
      })
      .end((err, res) => {
        res.should.have.status(200)

        expect(res.body).to.be.an("object")
        expect(res.body.data.payments.archive.id).to.be.a("string")

        done()
      })
  })

  it("should restore a payment", done => {
    chai
      .request(app)
      .post("/graph")
      .set("content-type", "application/json")
      .send({
        query: `mutation($payment: Upayment!){
          payments{
            restore(payment: $payment){
              id
            }
          }
        }`,
        variables: {
          payment: {
            id: sharedInfo.paymentId
          }
        }
      })
      .end((err, res) => {
        res.should.have.status(200)

        expect(res.body).to.be.an("object")
        expect(res.body.data.payments.restore.id).to.be.a("string")
        
        done()
      })
  })
})