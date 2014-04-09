require('./globals');

var fs = require('fs');

// var uuid = require('./helpers/uuid');

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

var uniqueId = uuid();
// console.log(uniqueId);

var scriptNode = $('#je_ace_editor_script');
var editorDiv = $('<div>')
  .attr('id', 'je_ace_editor_app')
  .html(rootTemplate);

scriptNode.before(editorDiv);

app.value('jeAceEditorScriptNode', scriptNode);

angular.bootstrap(editorDiv, ['jeAceEditor']);
