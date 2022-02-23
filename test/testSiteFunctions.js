let chai = require("chai"),
  assert = require("assert");
(chaiHttp = require("chai-http")), ({ expect } = chai);

chai.use(chaiHttp);
chai.should();

describe("Site controller functions", () => {
  it("Should insert site", async function () {
    let res = await chai
      .request("http://localhost:4000")
      .post("/site")
      .send({ siteName: "one", siteUrl: "one.co.il" });
    assert.equal(res.status, 200);
    assert.equal(res.type, "application/json");
  });

  it("Should get scrape by site ID", async function () {
    let siteId = "6214b658b3642ebcf48ba9c6";
    let res = await chai
      .request("http://localhost:4000")
      .get("/site/scrape/" + siteId);
    assert.equal(res.type, "application/json");
    assert.equal(res.status, 200);
  });

  it("Get all sites", async function () {
    let res = await chai.request("http://localhost:4000").get("/site");
    assert.equal(res.status, 200);
    res.body.length.should.greaterThan(0);
  });

  it("Get one site", async function () {
    let siteId = "62139f03ec3ceda01e5481b8";
    let res = await chai
      .request("http://localhost:4000")
      .get("/site/" + siteId);
    assert.equal(res.status, 200);
  });

  it("update one site", async function () {
    let siteId = "62139f03ec3ceda01e5481b8";
    let res = await chai
      .request("http://localhost:4000")
      .put("/site/update/" + siteId)
      .send({ siteName: "walla" });
    assert.equal(res.status, 200);
  });

  it("Delete one site", async function () {
    let siteId = "62139f03ec3ceda01e5481b8";
    let res = await chai
      .request("http://localhost:4000")
      .delete("/site/delete/" + siteId);
    res.should.have.status(200);
  });
});
