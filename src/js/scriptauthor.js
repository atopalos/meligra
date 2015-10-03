(function() {

	/**
	 * The script author class
	 */
	var ScriptAuthor = function( hostDOM, textareaDOM ) {

		// Create a header and a body
		this.header = $('<div class="sa-header"></div>').appendTo(hostDOM);
		this.body = $('<div class="sa-body"></div>').appendTo(hostDOM);

		// The rows of strip panels
		this.masterRow = this.createStripRow().appendTo(this.body);
		this.recalculatePanelSizes( this.masterRow.children(".sa-content") );

		// Keep a reference of the text area dom
		this.textareaDOM = textareaDOM;

	};

	/**
	 * Serialize structure and save in textarea
	 */
	ScriptAuthor.prototype.serialize = function() {
		
	}

	/**
	 * De-Serialize structure and save in textarea
	 */
	ScriptAuthor.prototype.deserialze = function() {

	}

	/**
	 * Recalculates all panel sizes within the speciied row
	 */
	ScriptAuthor.prototype.recalculatePanelSizes = function( row ) {

		// Get all strips
		var strips = row.children();

		// Calculate how many columns each strip will occupy
		var cols = parseInt(12 / strips.length); 

		// Apply the appropriate class to all strips
		strips.attr("class", "sa-strip col-xs-"+cols);

	}

	/**
	 * Creats a strip panel with a plus button
	 */
	ScriptAuthor.prototype.createStripPanel = function() {
		var dom = $('<div class="sa-strip"></diV>'),
			domContent = $('<div class="sa-content"></div>').appendTo(dom),
			domAddBtn = $('<button class="sa-btn-add"><span class="glyphicon glyphicon-plus"></span></button>').appendTo(dom);

		// Add one after
		domAddBtn.click((function() {

			// Crete new panel
			var panel = this.createStripPanel();
			// Insert panel after us
			panel.insertAfter( dom );

			// Redistribute the panels in the row
			var rowContent = dom.parent();
			this.recalculatePanelSizes( rowContent );

		}).bind(this));

		// Return new panel object
		return dom;
	}

	/**
	 * Creats a strip row that hosts panels
	 */
	ScriptAuthor.prototype.createStripRow = function( id ) {
		var dom = $('<div class="sa-strip-row"></div>'),
			domContent = $('<div class="sa-content row"></div>').appendTo(dom),
			domAddBtn = $('<button class="sa-btn-add"><span class="glyphicon glyphicon-plus"></span></button>').appendTo(dom);

		// Create the first panel
		domContent.append( this.createStripPanel() );

		// Add one after
		domAddBtn.click((function() {
			// Crete new row
			var row = this.createStripRow();
			// Insert panel after us
			row.insertAfter( dom );
		}).bind(this));

		// Return a new row object
		return dom;
	}

	// Aply this class on all elements with '.script-author' class
	$(function() {
		$("textarea.script-author").each(function(index, element) {

			// Get and hide textarea
			var textarea = $(element).css({ 'display': 'none' });

			// Create a new container for the editor
			var container = $('<div class="sa-master container"></div>').insertAfter(textarea);

			// Create new script author controller over the container
			var controller = new ScriptAuthor( container, textarea );

		});
	});

})();

