let express = require("express"),
  router = express.Router(),
  { insertSite, getSite } = require("../controllers/siteController");

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

module.exports = router;
