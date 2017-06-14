/* eslint-env browser */
'use strict';

var tagstrip_re = /(\.|\?|!)(\s#\w+)+$/m;
var url = 'https://d2nb7t6y3zkbd1.cloudfront.net/instagrams.json';

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
      var caption = columns[colNo].getElementsByClassName('card-text')[0];
      anchor.attributes.href.value = photos[imgNo].link;
      image.attributes.src.value = photos[imgNo].images.low_resolution.url;
      image.attributes.alt.value = photos[imgNo].tags.join();
      if (photos[imgNo].caption !== null) {
        caption.textContent = photos[imgNo].caption.text.replace(tagstrip_re, '$1');
      } else {
        caption.textContent = '';
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
  getPhotos(url, insertPhotos);
}

document.addEventListener('DOMContentLoaded', init);
if (document.readyState !== 'loading') {
  init();
}

;
;
;/* jshint ignore:start */
(function() {
  var WebSocket = window.WebSocket || window.MozWebSocket;
  var br = window.brunch = (window.brunch || {});
  var ar = br['auto-reload'] = (br['auto-reload'] || {});
  if (!WebSocket || ar.disabled) return;
  if (window._ar) return;
  window._ar = true;

  var cacheBuster = function(url){
    var date = Math.round(Date.now() / 1000).toString();
    url = url.replace(/(\&|\\?)cacheBuster=\d*/, '');
    return url + (url.indexOf('?') >= 0 ? '&' : '?') +'cacheBuster=' + date;
  };

  var browser = navigator.userAgent.toLowerCase();
  var forceRepaint = ar.forceRepaint || browser.indexOf('chrome') > -1;

  var reloaders = {
    page: function(){
      window.location.reload(true);
    },

    stylesheet: function(){
      [].slice
        .call(document.querySelectorAll('link[rel=stylesheet]'))
        .filter(function(link) {
          var val = link.getAttribute('data-autoreload');
          return link.href && val != 'false';
        })
        .forEach(function(link) {
          link.href = cacheBuster(link.href);
        });

      // Hack to force page repaint after 25ms.
      if (forceRepaint) setTimeout(function() { document.body.offsetHeight; }, 25);
    },

    javascript: function(){
      var scripts = [].slice.call(document.querySelectorAll('script'));
      var textScripts = scripts.map(function(script) { return script.text }).filter(function(text) { return text.length > 0 });
      var srcScripts = scripts.filter(function(script) { return script.src });

      var loaded = 0;
      var all = srcScripts.length;
      var onLoad = function() {
        loaded = loaded + 1;
        if (loaded === all) {
          textScripts.forEach(function(script) { eval(script); });
        }
      }

      srcScripts
        .forEach(function(script) {
          var src = script.src;
          script.remove();
          var newScript = document.createElement('script');
          newScript.src = cacheBuster(src);
          newScript.async = true;
          newScript.onload = onLoad;
          document.head.appendChild(newScript);
        });
    }
  };
  var port = ar.port || 9485;
  var host = br.server || window.location.hostname || 'localhost';

  var connect = function(){
    var connection = new WebSocket('ws://' + host + ':' + port);
    connection.onmessage = function(event){
      if (ar.disabled) return;
      var message = event.data;
      var reloader = reloaders[message] || reloaders.page;
      reloader();
    };
    connection.onerror = function(){
      if (connection.readyState) connection.close();
    };
    connection.onclose = function(){
      window.setTimeout(connect, 1000);
    };
  };
  connect();
})();
/* jshint ignore:end */

;
//# sourceMappingURL=app.js.map