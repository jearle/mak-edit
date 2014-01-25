var app = require('../app');
var marked = require('marked');
var hljs = require('highlight.js');

app.controller('Root', [

	'$scope',
	'jeThemes',
	'jeCss',
	'jeMarkdown',
	'jeLocalStorage',

	function ($scope, Themes, Css, Markdown, LocalStorage) {

		Css.addStyle(Themes.tomorrow(), 'je_tomorrow_theme');

		$scope.markdown = LocalStorage.storage();

		function markdownChanged (newValue, oldValue) {
			
			if (newValue === oldValue) return;

			LocalStorage.storage($scope.markdown);
		}

		$scope.$watch('markdown', markdownChanged);

	}

]);