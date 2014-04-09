var app = require('../app');
var marked = require('marked');
var hljs = require('highlight.js');

app.controller('Root', [

  '$scope',
  'jeThemes',
  'jeCss',
  'jeMarkdown',
  'jeLocalStorage',
  'jeAceEditorScriptNode',

  function ($scope, Themes, Css, Markdown, LocalStorage, scriptNode) {

    Css.addStyle(Themes.tomorrow(), 'je_tomorrow_theme');

    $scope.markdown = LocalStorage.storage();

    function markdownChanged (newValue, oldValue) {

      if (newValue === oldValue) return;

      scriptNode.trigger(
        'markdownChanged',
        {
          markdown: $scope.markdown
        }
      );

      LocalStorage.storage($scope.markdown);
    }

    $scope.$watch('markdown', markdownChanged);

  }

]);
