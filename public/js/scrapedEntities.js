$(function () {
  let scrapedList = $("#scrapedList");

  $.get("/scrapedEntity", (scrapedTitles) => {
    $.each(scrapedTitles, (_, field) => {
      $(scrapedList).append(
        $("<option>")
          .text(field.site_id.siteName)
          .attr("value", field.site_id._id)
      );
    });
  });

  scrapedList.change(function () {
    $.get("/scrapedEntity/" + scrapedList.val(), (site) => {
      let titlesDiv = $(`<div data-role=${site._id}>`);
      $.each(site.title, (_, title) => {
        console.log(title);
        let titles = $(`<p>${title}</p>`);
        titlesDiv.append(titles);
        $(".entity").append(titlesDiv);
      });
    });
  });
});
