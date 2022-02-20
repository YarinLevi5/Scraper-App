let express = require("express"),
  router = express.Router(),
  {
    insertScrapedEntity,
    getScrapedEntities,
  } = require("../controllers/scrapedEntitiesController");

router.post("/:siteId", (req, res) => {
  insertScrapedEntity(req.params.siteId)
    .then((scrapedEntity) => res.status(200).json(scrapedEntity))
    .catch((err) => res.status(404).json(err));
});

router.get("/scrapedEntity/:siteId", (req, res) => {
  getScrapedEntities(req.params.siteId)
    .then((scrapedEntity) => res.status(200).json(scrapedEntity))
    .catch((err) => res.status(404).json(err));
});

module.exports = router;
