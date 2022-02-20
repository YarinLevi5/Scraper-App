let mongoose = require("mongoose");
const scrapedEntitiesSchema = new mongoose.Schema({
  title: {
    type: Array,
    required: true,
  },
  site_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Site",
    required: true,
  },
});
const ScrapedEntity = mongoose.model("ScrapedEntity", scrapedEntitiesSchema);

module.exports = ScrapedEntity;
