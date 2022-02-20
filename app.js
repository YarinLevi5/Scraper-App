const express = require("express");
app = express();
(mongoose = require("mongoose")),
  (port = process.env.PORT || 3000),
  (siteRouter = require("./routes/siteRouter")),
  (ScrapedEntityRouter = require("./routes/scrapedEntitiesRouter"));

app.use(express.json());
app.use(
  express.urlencoded({
    extended: true,
  })
);
app.use("/site", siteRouter);
app.use("/scrapedEntity", ScrapedEntityRouter);

mongoose
  .connect("mongodb://0.0.0.0:27017/scraperApp")
  .then(() => {
    app.listen(port, () => {
      console.info(`start server start listening on port ${port}`);
    });
  })
  .catch((err) => console.error(err));
