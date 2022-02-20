let ScrapedEntity = require("../models/scraped_entities"),
  axios = require("axios");

let insertScrapedEntity = (siteId) => {
  return new Promise((resolve, reject) => {
    axios
      .get(`http://localhost:4000/site/scrape/${siteId}`, { timeout: 6000 })
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
