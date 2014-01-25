var marked = require('marked');
var hljs = require('highlight.js');

var app = require('../app');

app.factory('jeMarkdown', [

	function () {

		return {
			toHtml: function (md) {
				return marked(
					md, 
					{
						highlight: function (code, lang, callback) {
							return hljs.highlight(lang, code).value;	
						}
					}
				);
			}
		};

	}

]);