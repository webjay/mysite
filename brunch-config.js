'use strict';

const staticBrunch = require('html-brunch-static');

const htmlTag_re = /<[^>]*>/g;

exports.modules = {
  wrapper: false,
  definition: false
};

exports.npm = {
  enabled: false
};

exports.files = {
  javascripts: {
    joinTo: {
      // 'lib/vendor.js': /^node_modules/,
      'lib/app.js': /^app/
    },
  //   order: {
  //     before: [
  //       'node_modules/jquery/**',
  //       'node_modules/tether/**',
  //       'node_modules/bootstrap/**'
  //     ]
  //   }
  },
  stylesheets: {
    joinTo: 'lib/style.css'
  },
  // templates: {
  //   joinTo: 'lib/tmpl.js'
  // }
};

exports.plugins = {
  static: {
    processors: [
      staticBrunch({
        handlebars: {
          enableProcessor: true,
          strict: true,
          helpers: {
            striptags: (txt) => {
              if (txt === undefined) return;
              return txt.replace(htmlTag_re, '');
            }
          }
        },
        defaultContext: {
          _options: {
            layout: 'app/layouts/main.static.hbs',
            // partials: [
            //   'app/partials/header.static.hbs'
            // ]
          }
        }
      })
    ]
  },
  cleancss: {
    keepSpecialComments: 0,
    removeEmpty: true
  },
  uglify: {
    mangle: true,
    compress: {
      global_defs: {
        DEBUG: false
      }
    }
  }
};

exports.overrides = {
  production: {
    optimize: true,
    sourceMaps: false,
    plugins: {
      autoReload: {
        enabled: false
      }
    }
  }
};
