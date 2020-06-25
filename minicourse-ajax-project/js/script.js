function loadData() {
  var $body = $("body");
  var $wikiElem = $("#wikipedia-links");
  var $nytHeaderElem = $("#nytimes-header");
  var $nytElem = $("#nytimes-article");
  var $greeting = $("#greeting");

  // clear out old data before new request
  $wikiElem.text("");
  $nytElem.text("");
  // load streetview

  // YOUR CODE GOES HERE!
  // img
  var street = $("#street").val();
  var city = $("#city").val();
  var loc = street + "," + city;

  $greeting.text("So,you want to live at " + loc + "? nice choice");
  $greeting.css({
    color: "rgb(0, 0, 0)",
    "text-shadow": "1px 1px 5px rgb(240, 238, 238)",
    "text-align": "center",
  });
  $body.append(
    `<img class="bgimg" src="https://www.w3schools.com/tags/img_girl.jpg" >`
  );
  //`<img class="bgimg" src="https://i.ibb.co/vxghf76/50031302097-399061dc4a-o.jpg" >`
  //`<img class="bgimg" src="https://www.w3schools.com/tags/img_girl.jpg" >`
  //`<img class="bgimg" src="http://maps.googleapis.com/maps/api/streetview?size=600x300&location=` +loc + `" >` it is 403 forbidden
  // console.log(loc);

  //article   hH C9C modernN familycY
  var YOURkey = "uIRfGgu2h6G1c34cKJqANzrGfwAy9Ynp";
  var URL =
    "https://api.nytimes.com/svc/search/v2/articlesearch.json?q=" +
    city +
    "&sort=newest&api-key=" +
    YOURkey;
  $.getJSON(URL, function (data) {
    $nytHeaderElem.text("New York Times Articles about " + city);

    $("#article").remove(); //remove old articles from page
    var fetch_data = data.response.docs;
    var items = [];
    $.each(fetch_data, function (k, v) {
      var res =
        "<li class='article'><a href='" +
        v.web_url +
        "'><p>" +
        v.headline.main +
        "</p></a><p>" +
        v.snippet +
        "</p></li>";
      items.push(res);
      // console.log(v);
      $(".article-list").append(res);
    });

    //   create new ul and add li to specific class = article-list
    //   $("<ul/>", {
    //     class: "article-list",
    //     html: items.join(""),
    //   }).appendTo("body");
    //   //
    $nytElem.append(items);
  }).fail(function (e) {
    $nytHeaderElem.text("New York Times Articles API found error");
    console.log(e);
  });

  //wikipedia
  var URL =
    "https://en.wikipedia.org/w/api.php?action=opensearch&search=" +
    city +
    "&format=json&callback=callbackfucn";
  //for error handling in jsonp it not have any default so we create by timeout
  var time = setTimeout(function () {
    $wikiElem.text("failed to get Wikipedia resources");
  }, 8000);
  $.ajax({
    url: URL,
    dataType: "jsonp",
    success: function (data) {
      $("#wikipedia-header").text("Relevant wikipedia Link :");
      // console.log(data);
      var data_t = data[1];
      var data_url = data[3];
      for (var i = 0; i < data_t.length; i++) {
        var res =
          "<li ><a href = '" + data_url[i] + "'  >" + data_t[i] + "</a></li>";
        // console.log(data_url[i], data_t[i]);
        $wikiElem.append(res);
      }
      clearTimeout(time);
    },
  });

  return false;
}

$("#form-container").submit(loadData);

// loadData();
