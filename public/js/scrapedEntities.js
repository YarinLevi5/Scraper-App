$(function () {
  let scrapedList = $("#scrapedList");

  $.get("/scrapedEntity", (scrapedTitles) => {
    $.each(scrapedTitles, (_, field) => {
      $(scrapedList).append(
        $("<option>").text(field.site_id.siteName).attr("value", field._id)
      );
    });
  });
});
