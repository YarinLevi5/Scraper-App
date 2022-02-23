let chai = require("chai"),
  assert = require("assert");
(chaiHttp = require("chai-http")), ({ expect } = chai);

chai.use(chaiHttp);
chai.should();

describe("Scraped Entities controller functions", () => {
  it("Should insert scraped Entity", async function () {
    let siteId = "6214b658b3642ebcf48ba9c6";
    let res = await chai
      .request("http://localhost:4000")
      .post("/scrapedEntity/" + siteId);
    assert.equal(res.status, 200);
  });

  it("Get all scraped entities", async function () {
    let res = await chai.request("http://localhost:4000").get("/scrapedEntity");
    assert.equal(res.status, 200);
    res.body.length.should.greaterThan(0);
  });

  it("Get one scraped entity", async function () {
    let siteId = "621619e48915b2d2863df681";
    let res = await chai
      .request("http://localhost:4000")
      .get("/scrapedEntity/" + siteId);
    assert.equal(res.status, 200);
  });
});
