var fs = require('fs');
var ace = require('brace');
require('brace/mode/markdown');
require('brace/theme/monokai');

var app = require('../app');

app.directive('jeAceEditor', [

	'jeCss',

	function (Css) {

		return {

			restrict: 'A',
			scope: {
				text: '=jeAceEditor'
			},
			template: fs.readFileSync(__dirname + '/../partials/ace-editor.html'),
			replace: true,

			link: function ($scope, element, attributes) {

				var css = fs.readFileSync(__dirname + '/../styles/je-ace-editor.css');
				Css.addStyle(css, 'je_ace_editor_css');

				var textChanging = false;
				var editorSettingText = false;

				// var editorElement = $('.je-ace-editor', element);

				/**
				 * Prefix for editor id
				 * @const
				 * @type {string}
				 */
				var PREFIX_ID = "je_ace_editor_";

				var editor;
				var instance;

				/**
				 * Looks for other divs using the same
				 * editor id.
				 * @param  {string} id
				 * @return {boolean}
				 */
				function idExists (id) {
					return ($('#' + id).length !== 0)
				}

				/**
				 * Creates a an id with the editor's 
				 * prefix id and a number.
				 * @param  {integer} num
				 * @return {string}
				 */
				function createId (num) {
					return PREFIX_ID + num;
				}

				/**
				 * Generates a unique id for this particular
				 * editor.  Recursively increases number until
				 * a unique id is generated.
				 * @param  {integer} num
				 * @return {string}
				 */
				function generateUniqueId (num) {
					
					num = num || 0;
					var id = createId(num);

					if (idExists(id))
						generateUniqueId(num++);
					else
						return id;
				
				}

				/**
				 * Adds the id to the current element's
				 * attributes.
				 * @param {string} id
				 */
				function addIdToElement (id) {
					element.attr('id', id);
				}

				/**
				 * Both generates the id and adds it to
				 * the current elements attributes.
				 * @param {integer} num
				 * @return {string}
				 */
				function addUniqueIdToElement (num) {

					var id = generateUniqueId(num);
					addIdToElement(id);
					return id;

				}

				/**
				 * Creates an Ace Editor with specified
				 * id.
				 * @param  {string} id
				 * @return {object}
				 */
				function createEditor (id) {
					return ace.edit(id);
				}

				/**
				 * Grabs the instance of the specified
				 * editor.
				 * @param  {object} editor
				 * @return {object}
				 */
				function grabInstance (editor) {
					return editor.getSession();
				}

				/**
				 * Sets the editor's instance properties.
				 * @param {object} instance
				 */
				function setInstanceOptions (instance) {
					instance.setMode('ace/mode/markdown');
					instance.setUseWrapMode(true);
				}

				/**
				 * Sets the current theme of the specified
				 * editor.  Currently we only support
				 * monokai.
				 * @param {object} editor
				 */
				function setThemeOnEditor (editor) {
					editor.setTheme('ace/theme/monokai');
				}

				/**
				 * Bootstraps the editor
				 */
				function bootstrapEditor () {

					var id = addUniqueIdToElement();
					editor = createEditor(id);
					instance = grabInstance(editor);
					setInstanceOptions(instance);
					setThemeOnEditor(editor);

				}

				/**
				 * Checks if both the scope text and the
				 * editor's instance text are the same.
				 * @return {boolean}
				 */
				function areTextAndInstanceValueTheSame () {
					return ($scope.text === instance.getValue());
				}

				/**
				 * An editor change event.  It checks whether the
				 * text is triggering the change event, and if so
				 * it does not trigger anthoner apply cycle, as this
				 * would result in an infinite loop.  It also
				 * checks the text and editor instance value to avoid
				 * a digest cycle if they are the same.
				 */
				function editorChanged () {
					if (textChanging || areTextAndInstanceValueTheSame())
						return textChanging = false;

					if (!$scope.$$phase && !$scope.$root.$$phase)
						$scope.$apply(function () {
							editorSettingText = true;
							$scope.text = instance.getValue();
						});
				}

				/**
				 * A scoped text change event.  It checks if the editor
				 * is setting the text, and if it is it avoids setting
				 * the value of the instance to avoid an infinite loop.
				 */
				function textChanged (newValue, oldValue) {
					if (editorSettingText)
						return editorSettingText = false;

					textChanging = true;

					instance.setValue($scope.text);
				}

				bootstrapEditor();

				editor.on('change', editorChanged);
				$scope.$watch('text', textChanged);

			}

		}

	}

]);