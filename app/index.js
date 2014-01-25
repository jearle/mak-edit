require('./globals');

var fs = require('fs');

var app = require('./app');
/**
 * Controllers
 */
require('./controllers/root');

/**
 * Directives
 */
require('./directives/ace-editor');
require('./directives/markdown-preview');

/**
 * Services
 */
require('./services/themes');
require('./services/css');
require('./services/markdown');
require('./services/local-storage');

var rootTemplate = fs.readFileSync(__dirname + '/partials/root.html');

window.scriptNode = $('#je_ace_editor_script');
window.editorDiv = $('<div>')
	.attr('id', 'je_ace_editor_app')
	.html(rootTemplate);
scriptNode.before(editorDiv);

angular.bootstrap(editorDiv, ['jeAceEditor']);