Template.QsInstructionsQsInstructionsClosed.onCreated(function() {
	
});

Template.QsInstructionsQsInstructionsClosed.onDestroyed(function() {
	
});

Template.QsInstructionsQsInstructionsClosed.onRendered(function() {
	
	Meteor.defer(function() {
		globalOnRendered();
		$("input[autofocus]").focus();
	});
});

Template.QsInstructionsQsInstructionsClosed.events({
	
});

Template.QsInstructionsQsInstructionsClosed.helpers({
	
});


var QsInstructionsQsInstructionsClosedViewExport = function(fileType) {
	var extraParams = {
		searchText: Session.get("QsInstructionsClosedListPagedSearchString") || "",
		searchFields: Session.get("QsInstructionsClosedListPagedSearchFields") || ["reference", "qs.name", "borrower", "Plot_Details", "rm", "action_pending_with", "date_closed"],
		sortBy: Session.get("QsInstructionsClosedListPagedSortBy") || "",
		sortAscending: Session.get("QsInstructionsClosedListPagedSortAscending") || true
	};

	var exportFields = ["date", "qs.name", "borrower", "currency", "amount", "Plot_Details", "rm", "action_pending_with", "date_closed"];

	

	Meteor.call("qsInstructionsClosedListPagedExport", extraParams, exportFields, fileType, function(e, data) {
		if(e) {
			alert(e);
			return;
		}

		let filename = "export." + fileType;
		downloadLocalResource(data, filename, "application/octet-stream");
	});
};

Template.QsInstructionsQsInstructionsClosedView.onCreated(function() {
	
});

Template.QsInstructionsQsInstructionsClosedView.onDestroyed(function() {
	
});

Template.QsInstructionsQsInstructionsClosedView.onRendered(function() {
	Session.set("QsInstructionsQsInstructionsClosedViewStyle", "table");
	
});

Template.QsInstructionsQsInstructionsClosedView.events({
	"submit #dataview-controls": function(e, t) {
		return false;
	},

	"click #dataview-search-button": function(e, t) {
		e.preventDefault();
		var form = $(e.currentTarget).closest("form");
		if(form) {
			var searchInput = form.find("#dataview-search-input");
			if(searchInput) {
				searchInput.focus();
				var searchString = searchInput.val();
				Session.set("QsInstructionsClosedListPagedSearchString", searchString);
			}

		}
		return false;
	},

	"keydown #dataview-search-input": function(e, t) {
		if(e.which === 13)
		{
			e.preventDefault();
			var form = $(e.currentTarget).closest("form");
			if(form) {
				var searchInput = form.find("#dataview-search-input");
				if(searchInput) {
					var searchString = searchInput.val();
					Session.set("QsInstructionsClosedListPagedSearchString", searchString);
				}

			}
			return false;
		}

		if(e.which === 27)
		{
			e.preventDefault();
			var form = $(e.currentTarget).closest("form");
			if(form) {
				var searchInput = form.find("#dataview-search-input");
				if(searchInput) {
					searchInput.val("");
					Session.set("QsInstructionsClosedListPagedSearchString", "");
				}

			}
			return false;
		}

		return true;
	},

	"click #dataview-insert-button": function(e, t) {
		e.preventDefault();
		/**/
	},

	"click #dataview-export-default": function(e, t) {
		e.preventDefault();
		QsInstructionsQsInstructionsClosedViewExport.call(this, "csv");
	},

	"click #dataview-export-csv": function(e, t) {
		e.preventDefault();
		QsInstructionsQsInstructionsClosedViewExport.call(this, "csv");
	},

	"click #dataview-export-tsv": function(e, t) {
		e.preventDefault();
		QsInstructionsQsInstructionsClosedViewExport.call(this, "tsv");
	},

	"click #dataview-export-json": function(e, t) {
		e.preventDefault();
		QsInstructionsQsInstructionsClosedViewExport.call(this, "json");
	},

	"click .prev-page-link": function(e, t) {
		e.preventDefault();
		var currentPage = Session.get("QsInstructionsClosedListPagedPageNo") || 0;
		if(currentPage > 0) {
			Session.set("QsInstructionsClosedListPagedPageNo", currentPage - 1);
		}
	},

	"click .next-page-link": function(e, t) {
		e.preventDefault();
		let currentPage = Session.get("QsInstructionsClosedListPagedPageNo") || 0;
		if(currentPage < this.qs_instructions_closed_list_paged_page_count - 1) {
			Session.set("QsInstructionsClosedListPagedPageNo", currentPage + 1);
		}
	}

	
});

Template.QsInstructionsQsInstructionsClosedView.helpers({

	"insertButtonClass": function() {
		return QsInstructions.userCanInsert(Meteor.userId(), {}) ? "" : "hidden";
	},

	"isEmpty": function() {
		return !this.qs_instructions_closed_list_paged || this.qs_instructions_closed_list_paged.count() == 0;
	},
	"isNotEmpty": function() {
		return this.qs_instructions_closed_list_paged && this.qs_instructions_closed_list_paged.count() > 0;
	},
	"isNotFound": function() {
		return this.qs_instructions_closed_list_paged && this.qs_instructions_closed_list_paged.count() == 0 && Session.get("QsInstructionsClosedListPagedSearchString");
	},
	"gotPrevPage": function() {
		return !!Session.get("QsInstructionsClosedListPagedPageNo");
	},
	"gotNextPage": function() {
		return (Session.get("QsInstructionsClosedListPagedPageNo") || 0) < this.qs_instructions_closed_list_paged_page_count - 1;
	},
	"searchString": function() {
		return Session.get("QsInstructionsClosedListPagedSearchString");
	},
	"viewAsTable": function() {
		return Session.get("QsInstructionsQsInstructionsClosedViewStyle") == "table";
	},
	"viewAsBlog": function() {
		return Session.get("QsInstructionsQsInstructionsClosedViewStyle") == "blog";
	},
	"viewAsList": function() {
		return Session.get("QsInstructionsQsInstructionsClosedViewStyle") == "list";
	},
	"viewAsGallery": function() {
		return Session.get("QsInstructionsQsInstructionsClosedViewStyle") == "gallery";
	}

	
});


Template.QsInstructionsQsInstructionsClosedViewTable.onCreated(function() {
	
});

Template.QsInstructionsQsInstructionsClosedViewTable.onDestroyed(function() {
	
});

Template.QsInstructionsQsInstructionsClosedViewTable.onRendered(function() {
	
});

Template.QsInstructionsQsInstructionsClosedViewTable.events({
	"click .th-sortable": function(e, t) {
		e.preventDefault();
		var oldSortBy = Session.get("QsInstructionsClosedListPagedSortBy");
		var newSortBy = $(e.target).attr("data-sort");

		Session.set("QsInstructionsClosedListPagedSortBy", newSortBy);
		if(oldSortBy == newSortBy) {
			var sortAscending = Session.get("QsInstructionsClosedListPagedSortAscending");
			if(typeof sortAscending == "undefined") {
				sortAscending = true;
			}
			Session.set("QsInstructionsClosedListPagedSortAscending", !sortAscending);
		} else {
			Session.set("QsInstructionsClosedListPagedSortAscending", true);
		}
	}
});

Template.QsInstructionsQsInstructionsClosedViewTable.helpers({
});


Template.QsInstructionsQsInstructionsClosedViewTableItems.onCreated(function() {
	
});

Template.QsInstructionsQsInstructionsClosedViewTableItems.onDestroyed(function() {
	
});

Template.QsInstructionsQsInstructionsClosedViewTableItems.onRendered(function() {
	
});

Template.QsInstructionsQsInstructionsClosedViewTableItems.events({
	

	"click td": function(e, t) {
		e.preventDefault();
		var item = this;
		var itemId = item ? item._id : null;

		
		Router.go("qs_instructions.qs_instructions_closed.details", mergeObjects(Router.currentRouteParams(), {qsInstructionsClosedId: this._id}));
		return false;
	},

	"click .inline-checkbox": function(e, t) {
		e.preventDefault();

		if(!this || !this._id) return false;

		var fieldName = $(e.currentTarget).attr("data-field");
		if(!fieldName) return false;

		var values = {};
		values[fieldName] = !this[fieldName];

		Meteor.call("qsInstructionsUpdate", this._id, values, function(err, res) {
			if(err) {
				alert(err.message);
			}
		});

		return false;
	},

	"click #delete-button": function(e, t) {
		e.preventDefault();
		var me = this;
		bootbox.dialog({
			message: "Delete? Are you sure?",
			title: "Delete",
			animate: false,
			buttons: {
				success: {
					label: "Yes",
					className: "btn-success",
					callback: function() {
						Meteor.call("qsInstructionsRemove", me._id, function(err, res) {
							if(err) {
								alert(err.message);
							}
						});
					}
				},
				danger: {
					label: "No",
					className: "btn-default"
				}
			}
		});
		return false;
	},
	"click #edit-button": function(e, t) {
		e.preventDefault();
		Router.go("qs_instructions.qs_instructions_closed.update", mergeObjects(Router.currentRouteParams(), {qsInstructionsClosedId: this._id}));
		return false;
	}
});

Template.QsInstructionsQsInstructionsClosedViewTableItems.helpers({
	

	"checked": function(value) { return value ? "checked" : "" }, 
	"editButtonClass": function() {
		return QsInstructions.userCanUpdate(Meteor.userId(), this) ? "" : "hidden";
	},

	"deleteButtonClass": function() {
		return QsInstructions.userCanRemove(Meteor.userId(), this) ? "" : "hidden";
	}
});
