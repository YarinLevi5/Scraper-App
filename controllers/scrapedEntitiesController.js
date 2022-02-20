let ScrapedEntity = require("../models/scraped_entities"),
  { getSite } = require("../controllers/siteController");
axios = require("axios");

let insertScrapedEntity = (siteId) => {
  return new Promise((resolve, reject) => {
    getSite(siteId)
      .then((scrapedEntity) => {
        let newScrapedEntity = new ScrapedEntity({
          title: scrapedEntity.data.title,
          site_id: siteId,
        });
        newScrapedEntity
          .save()
          .then((scrapedEntity) => resolve(scrapedEntity))
          .catch((err) => reject(err));
      })
      .catch((err) => console.log(err));
  });
};

let getScrapedEntities = (site_id) => {
  return new Promise((resolve, reject) => {
    ScrapedEntity.findOne({ site_id })
      .then((scrape) => resolve(scrape))
      .catch((err) => reject(err));
  });
};

module.exports = {
  insertScrapedEntity,
  getScrapedEntities,
};
