// This file is licensed under the
// Creative Commons Attribution-Share Alike 3.0 Unported license.
// http://creativecommons.org/licenses/by-sa/3.0/deed.en
(function() {
  'use strict';

  // Intercept webapps-launch event
  window.addEventListener('webapps-launch', function(evt) {
    var manifest = evt.detail.manifestURL;
    var origin = manifest.replace('/manifest.webapp', '');

    if (isSearchApp(manifest)) {
      var app = getApp(origin);
      if (app && !app.isActive()) {
        evt.preventDefault();
        evt.stopImmediatePropagation();
        app.requestOpen();
      }
    }

    function getApp(origin) {
      var foundApp;
      var windowManager = wrappedJSObject.appWindowManager;
      for (var id in windowManager._apps) {
        var app = windowManager._apps[id];
        if (app.origin === origin) {
          foundApp = app;
        }
      }
      return foundApp;
    }
  }, true);

  function isSearchApp(manifest) {
    return (manifest.indexOf('search') > -1);
  }
}());
