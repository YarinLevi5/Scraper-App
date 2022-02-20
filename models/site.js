let mongoose = require("mongoose");
require("mongoose-type-url");

const sitesSchema = new mongoose.Schema({
  siteName: {
    type: String,
    required: true,
  },
  siteUrl: {
    type: mongoose.SchemaTypes.Url,
    required: true,
  },
});
const Site = mongoose.model("Site", sitesSchema);

module.exports = Site;
