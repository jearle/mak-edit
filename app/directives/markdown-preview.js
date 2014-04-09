var fs = require('fs');
var app = require('../app');

app.directive('jeMarkdownPreview', [

	'$sce',
	'jeCss',
	'jeMarkdown',

	function ($sce, Css, Markdown) {

		return {

			restrict: 'A',
			scope: {
				markdown: '=jeMarkdownPreview'
			},
			template: fs.readFileSync(__dirname + '/../partials/markdown-preview.html'),

			link: function ($scope, element, attributes) {

				function markdownChanged () {
					var unsafeHtml = Markdown.toHtml($scope.markdown)
					$scope.html = $sce.trustAsHtml(unsafeHtml);
				}

				$scope.$watch('markdown', markdownChanged);

			}

		}

	}

]);
