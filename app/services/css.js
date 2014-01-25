var app = require('../app');

app.factory('jeCss', [

	function () {

		function addStyle (css, id) {
			var currentStyle = $('#' + id);
			
			if (currentStyle.length > 0)
				currentStyle.html(css);
			else
				currentStyle = $('<style>')
					.attr('id', id)
					.attr('type', 'text/css')
					.html(css);

			$('head').append(currentStyle);
		}

		return {
			addStyle: addStyle
		};

	}

]);