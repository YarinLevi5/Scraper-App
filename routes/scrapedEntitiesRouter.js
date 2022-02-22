let express = require("express"),
  router = express.Router(),
  {
    insertScrapedEntity,
    getScrapedEntity,
    getScrapedEntities,
  } = require("../controllers/scrapedEntitiesController");

router.post("/:siteId", (req, res) => {
  insertScrapedEntity(req.params.siteId)
    .then((scrapedEntity) => res.status(200).json(scrapedEntity))
    .catch((err) => res.status(404).json(err));
});

router.get("/:siteId", (req, res) => {
  getScrapedEntity(req.params.siteId)
    .then((scrapedEntity) => res.status(200).json(scrapedEntity))
    .catch((err) => res.status(404).json(err));
});

router.get("/", (req, res) => {
  getScrapedEntities()
    .then((scrapedEntities) => res.status(200).json(scrapedEntities))
    .catch((err) => res.status(404).json(err));
});

module.exports = router;
