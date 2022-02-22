$(function () {
  let catchNameField = () => {
    return $('[data-role="name"]').val();
  };
  let catchUrlField = () => {
    return $('[data-role="url"]').val();
  };

  function insertNewSite() {
    let newSite = {};
    newSite["siteName"] = catchNameField();
    newSite["siteUrl"] = catchUrlField();
    return newSite;
  }

  $('[data-role="insertBtn"]').click(() => {
    let siteObject = insertNewSite();
    $.post("/site", siteObject, (data) => {
      $.post("/scrapedEntity/" + data._id, (scrape) => {
        console.log(scrape);
      });
      alert("Data was sent successfully");
      resetFields();
    });
  });

  fetch("/site")
    .then((response) => response.json())
    .then((sites) => {
      loopOverSites(sites, "#findList");
      $("#findList").change(() => {
        $.get("/site/" + $("#findList").val(), (site) => {
          displaySiteData(site);
        });
      });
      loopOverSites(sites, "#updateList");
      loopOverSites(sites, "#deleteList");
    })
    .catch((err) => console.log(err));

  function loopOverSites(sites, select) {
    $.each(sites, (_, field) => {
      $(select).append(
        $("<option>").text(field.siteName).attr("value", field._id)
      );
    });
  }

  $("#updateList").change(() => {
    $.get("/site/" + $("#updateList").val(), (site) => {
      $('[data-role="update-name"]').val(site.siteName);
      $('[data-role="update-url"]').val(site.siteUrl);
    });
  });

  $('[data-role="updateBtn"]').click(() => {
    let newSite = {
      siteName: $('[data-role="update-name"]').val(),
      siteUrl: $('[data-role="update-url"]').val(),
    };
    $.ajax({
      url: "/site/update/" + $("#updateList").val(),
      type: "PUT",
      data: newSite,
      success: function () {
        alert("Data was saved.");
      },
    });
    resetFields();
  });

  $("#deleteList").change(() => {
    $.ajax({
      url: "/site/delete/" + $("#deleteList").val(),
      type: "DELETE",
      success: function () {
        alert("Site deleted");
      },
    });
  });

  let displaySiteData = (site) => {
    let div = $(`<div data-role=${site._id}>`);
    let p = $(`<p>Name: ${site.siteName}</p><p>Url: ${site.siteUrl}</p>`);
    div.append(p);
    $(".findSite").append(div);
  };

  let resetFields = () => {
    $("input[type=text]").val("");
  };
});
