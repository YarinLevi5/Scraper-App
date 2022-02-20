let Site = require("../models/site"),
  axios = require("axios"),
  { parse } = require("node-html-parser");

let insertSite = (siteName, siteUrl) => {
  return new Promise((resolve, reject) => {
    let site = new Site({
      siteName,
      siteUrl,
    });
    site
      .save()
      .then((site) => resolve(site))
      .catch((err) => reject(err));
  });
};

let getSite = (siteId) => {
  return new Promise((resolve, reject) => {
    let arrayOfTitles = [];
    Site.findOne({ _id: siteId })
      .then((site) => {
        let scrapedObj = {
          site_id: siteId,
        };
        axios
          .get(`${site.siteUrl}`, { timeout: 5000 })
          .then((data) => {
            let response = parse(data.data);
            let headLine = response.querySelector("title").innerText;
            let title = response.querySelector("h2").innerText;
            arrayOfTitles.push(headLine, title);
            scrapedObj["title"] = arrayOfTitles;
            resolve(scrapedObj);
          })
          .catch((err) => reject(err));
      })
      .catch((err) => reject(err));
  });
};

let getAllSites = () => {
  return new Promise((resolve, reject) => {
    Site.find()
      .then((sites) => resolve(sites))
      .catch((err) => reject(err));
  });
};

let getOneSite = (siteId) => {
  return new Promise((resolve, reject) => {
    Site.findOne({ _id: siteId })
      .then((site) => resolve(site))
      .catch((err) => reject(err));
  });
};

let updateOneSite = (siteId, newSite) => {
  return new Promise((resolve, reject) => {
    Site.findByIdAndUpdate({ _id: siteId }, { $set: newSite })
      .then((site) => resolve(site))
      .catch((err) => reject(err));
  });
};

let deleteOneSite = (siteId) => {
  return new Promise((resolve, reject) => {
    Site.findOneAndDelete({ _id: siteId })
      .then((site) => resolve(site))
      .catch((err) => reject(err));
  });
};

module.exports = {
  insertSite,
  getSite,
  getAllSites,
  getOneSite,
  updateOneSite,
  deleteOneSite,
};
