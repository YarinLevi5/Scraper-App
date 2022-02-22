let express = require("express");
(router = express.Router()),
  ({
    insertSite,
    getSite,
    getAllSites,
    getOneSite,
    updateOneSite,
    deleteOneSite,
  } = require("../controllers/siteController"));

router.post("/", (req, res) => {
  let { siteName, siteUrl } = req.body;
  insertSite(siteName, siteUrl)
    .then((site) => res.status(200).json(site))
    .catch((err) => res.status(404).json(err));
});

router.get("/scrape/:siteId", (req, res) => {
  getSite(req.params.siteId)
    .then((site) => res.status(200).json(site))
    .catch((err) => res.status(404).json(err));
});

router.get("/", (req, res) => {
  getAllSites()
    .then((sites) => res.status(200).json(sites))
    .catch((err) => res.status(404).json(err));
});

router.get("/:siteId", (req, res) => {
  getOneSite(req.params.siteId)
    .then((site) => res.status(200).json(site))
    .catch((err) => res.status(404).json(err));
});

router.put("/update/:siteId", (req, res) => {
  updateOneSite(req.params.siteId, req.body)
    .then((site) => res.status(200).json(site))
    .catch((err) => res.status(404).json(err));
});

router.delete("/delete/:siteId", (req, res) => {
  deleteOneSite(req.params.siteId)
    .then((site) => res.status(200).json(site))
    .catch((err) => res.status(404).json(err));
});

module.exports = router;
