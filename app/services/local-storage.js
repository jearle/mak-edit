var app = require('../app');

app.factory('jeLocalStorage', [

  '$window',

  function ($window) {

    /**
     * Key for storing markdown in localstorage.
     * @const {string}
     */
    var LOCAL_STORAGE_KEY = 'je_ace_editor_md';

    function localStorageAvailable () {
      return !!$window.localStorage;
    }

    function jeStorageExists () {
      return !!$window.localStorage[LOCAL_STORAGE_KEY];
    }

    function store (md) {

      if (md)
        return $window.localStorage[LOCAL_STORAGE_KEY] = md;

      return $window.localStorage[LOCAL_STORAGE_KEY];

    }

    function storage (md) {

      if (md && localStorageAvailable())
        return store(md);
      else if (localStorageAvailable() && jeStorageExists())
        return store();

      return '';

    }

    return {
      storage: storage
    };

  }

]);
