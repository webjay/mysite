/* eslint-env browser */
'use strict';

var url = 'https://d2nb7t6y3zkbd1.cloudfront.net/instagrams.json';
var classHolder;

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
  var grid = document.getElementById('photos');
  var imgbox = grid.getElementsByClassName('imgbox')[0];
  var fragment = document.createDocumentFragment();
  for (var i = 0; i < photos.length; i++) {
    var clone = (i === 0) ? imgbox : imgbox.cloneNode(true);
    var anchor = clone.getElementsByTagName('a')[0];
    var image = clone.getElementsByTagName('img')[0];
    anchor.setAttribute('href', photos[i].link);
    image.setAttribute('src', photos[i].images.low_resolution.url);
    image.setAttribute('alt', photos[i].tags.join());
    image.setAttribute('id', 'p' + photos[i].id);
    image.onclick = clickHandlerOn.bind(null, photos[i]);
    fragment.appendChild(clone);
  }
  grid.appendChild(fragment);
}

function clickHandlerOn (photo, event) {
  event.preventDefault();
  var img = event.target;
  var imgbox = img.parentNode.parentNode;
  classHolder = img.parentNode.parentNode.getAttribute('class');
  imgbox.setAttribute('class', classHolder + 'mx-auto d-block');
  img.setAttribute('src', photo.images.standard_resolution.url);
  img.setAttribute('class', 'img-big');
  imgbox.scrollIntoView();
  img.onclick = clickHandlerOff.bind(null, photo);
}

function clickHandlerOff (photo, event) {
  event.preventDefault();
  var img = event.target;
  var imgbox = img.parentNode.parentNode;
  imgbox.setAttribute('class', classHolder);
  img.setAttribute('class', 'img-std');
  imgbox.scrollIntoView();
  img.onclick = clickHandlerOn.bind(null, photo);
}

function preload (photos) {
  for (var i = 0; i < photos.length; i++) {
    (new Image()).setAttribute('src', photos[i].images.standard_resolution.url);
  }
}

function init () {
  getPhotos(url, function (photos) {
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', insertPhotos.bind(null, photos));
    } else {
      insertPhotos(photos);
    }
    preload(photos);
  });
}

init();
