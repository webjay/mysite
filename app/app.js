/* eslint-env browser */

function getPhotos (url) {
  var request = new XMLHttpRequest();
  request.open('GET', url, true);
  request.onload = function () {
    if (request.status >= 200 && request.status < 400) {
      insertPhotos(JSON.parse(request.responseText));
    }
  };
  request.send();
}

function insertPhotos (photos) {
  var columnCount = 3;
  var rowsCount = Math.floor(photos.length / columnCount);
  var grid = document.getElementById('photos');
  var rows = grid.getElementsByClassName('row');
  var imgNo = 0;
  for (var rowNo = 0; rowNo < rowsCount; rowNo++) {
    var row = (rowNo !== 0) ? rows[0].cloneNode(true) : rows[0];
    var elements = row.getElementsByClassName('card');
    for (var colNo = 0; colNo < columnCount; colNo++) {
      if (!photos[imgNo]) continue;
      var anchor = elements[colNo].getElementsByTagName('a')[0];
      var image = elements[colNo].getElementsByTagName('img')[0];
      anchor.attributes.href.value = photos[imgNo].link;
      image.attributes.src.value = photos[imgNo].images.low_resolution.url;
      image.attributes.alt.value = photos[imgNo].caption.text;
      imgNo++;
    }
    if (rowNo !== 0) {
      grid.appendChild(row);
    }
  }
}

getPhotos('https://d2nb7t6y3zkbd1.cloudfront.net/instagrams.json');
