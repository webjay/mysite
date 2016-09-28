/* eslint-env browser */
'use strict';

function getPhotos (url, handler) {
  var request = new XMLHttpRequest();
  request.open('GET', url, true);
  request.onload = function () {
    if (request.status >= 200 && request.status < 400) {
      handler(JSON.parse(request.responseText));
    }
  };
  request.send();
}

function insertPhotos (photos) {
  if (photos.length === 0) return;
  var columnCount = 3;
  var rowsCount = Math.floor(photos.length / columnCount);
  if (rowsCount === 0) return;
  var grid = document.getElementById('photos');
  var firstrow = grid.getElementsByClassName('row')[0];
  var fragment = document.createDocumentFragment();
  var imgNo = 0;
  for (var rowNo = 0; rowNo < rowsCount; rowNo++) {
    var row = (rowNo !== 0) ? firstrow.cloneNode(true) : firstrow;
    var columns = row.getElementsByClassName('card');
    for (var colNo = 0; colNo < columnCount; colNo++) {
      var anchor = columns[colNo].getElementsByTagName('a')[0];
      var image = columns[colNo].getElementsByTagName('img')[0];
      anchor.attributes.href.value = photos[imgNo].link;
      image.attributes.src.value = photos[imgNo].images.low_resolution.url;
      if (photos[imgNo].caption !== null) {
        image.attributes.alt.value = photos[imgNo].caption.text;
      }
      imgNo++;
    }
    if (rowNo !== 0) {
      fragment.appendChild(row);
    }
  }
  grid.appendChild(fragment);
}

function init () {
  var url = 'https://d2nb7t6y3zkbd1.cloudfront.net/instagrams.json';
  getPhotos(url, insertPhotos);
}

document.addEventListener('DOMContentLoaded', init);
if (document.readyState !== 'loading') {
  init();
}
