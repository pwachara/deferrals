Template.QsInstructionsQsInstructionsPendingDetailsQsInstructionsHistory.onCreated(function() {
	
});

Template.QsInstructionsQsInstructionsPendingDetailsQsInstructionsHistory.onDestroyed(function() {
	
});

Template.QsInstructionsQsInstructionsPendingDetailsQsInstructionsHistory.onRendered(function() {
	
	Meteor.defer(function() {
		globalOnRendered();
		$("input[autofocus]").focus();
	});
});

Template.QsInstructionsQsInstructionsPendingDetailsQsInstructionsHistory.events({
	
});

Template.QsInstructionsQsInstructionsPendingDetailsQsInstructionsHistory.helpers({
	
});


var QsInstructionsQsInstructionsPendingDetailsQsInstructionsHistoryViewExport = function(fileType) {
	var extraParams = {
		searchText: Session.get("QsInstructionsHistoryListPagedSearchString") || "",
		searchFields: Session.get("QsInstructionsHistoryListPagedSearchFields") || ["date", "update"],
		sortBy: Session.get("QsInstructionsHistoryListPagedSortBy") || "",
		sortAscending: Session.get("QsInstructionsHistoryListPagedSortAscending") || true
	};

	var exportFields = ["date", "update"];

	

	Meteor.call("qsInstructionsHistoryListPagedExport", this.params.qsInstructionsPendingId, extraParams, exportFields, fileType, function(e, data) {
		if(e) {
			alert(e);
			return;
		}

		let filename = "export." + fileType;
		downloadLocalResource(data, filename, "application/octet-stream");
	});
};

Template.QsInstructionsQsInstructionsPendingDetailsQsInstructionsHistoryView.onCreated(function() {
	
});

Template.QsInstructionsQsInstructionsPendingDetailsQsInstructionsHistoryView.onDestroyed(function() {
	
});

Template.QsInstructionsQsInstructionsPendingDetailsQsInstructionsHistoryView.onRendered(function() {
	Session.set("QsInstructionsQsInstructionsPendingDetailsQsInstructionsHistoryViewStyle", "table");
	
});

Template.QsInstructionsQsInstructionsPendingDetailsQsInstructionsHistoryView.events({
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
				Session.set("QsInstructionsHistoryListPagedSearchString", searchString);
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
					Session.set("QsInstructionsHistoryListPagedSearchString", searchString);
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
					Session.set("QsInstructionsHistoryListPagedSearchString", "");
				}

			}
			return false;
		}

		return true;
	},

	"click #dataview-insert-button": function(e, t) {
		e.preventDefault();
		Router.go("qs_instructions.qs_instructions_pending.details.insert", mergeObjects(Router.currentRouteParams(), {}));
	},

	"click #dataview-export-default": function(e, t) {
		e.preventDefault();
		QsInstructionsQsInstructionsPendingDetailsQsInstructionsHistoryViewExport.call(this, "csv");
	},

	"click #dataview-export-csv": function(e, t) {
		e.preventDefault();
		QsInstructionsQsInstructionsPendingDetailsQsInstructionsHistoryViewExport.call(this, "csv");
	},

	"click #dataview-export-tsv": function(e, t) {
		e.preventDefault();
		QsInstructionsQsInstructionsPendingDetailsQsInstructionsHistoryViewExport.call(this, "tsv");
	},

	"click #dataview-export-json": function(e, t) {
		e.preventDefault();
		QsInstructionsQsInstructionsPendingDetailsQsInstructionsHistoryViewExport.call(this, "json");
	},

	"click .prev-page-link": function(e, t) {
		e.preventDefault();
		var currentPage = Session.get("QsInstructionsHistoryListPagedPageNo") || 0;
		if(currentPage > 0) {
			Session.set("QsInstructionsHistoryListPagedPageNo", currentPage - 1);
		}
	},

	"click .next-page-link": function(e, t) {
		e.preventDefault();
		let currentPage = Session.get("QsInstructionsHistoryListPagedPageNo") || 0;
		if(currentPage < this.qs_instructions_history_list_paged_page_count - 1) {
			Session.set("QsInstructionsHistoryListPagedPageNo", currentPage + 1);
		}
	}

	
});

Template.QsInstructionsQsInstructionsPendingDetailsQsInstructionsHistoryView.helpers({

	"insertButtonClass": function() {
		return QsInstructionsHistory.userCanInsert(Meteor.userId(), {}) ? "" : "hidden";
	},

	"isEmpty": function() {
		return !this.qs_instructions_history_list_paged || this.qs_instructions_history_list_paged.count() == 0;
	},
	"isNotEmpty": function() {
		return this.qs_instructions_history_list_paged && this.qs_instructions_history_list_paged.count() > 0;
	},
	"isNotFound": function() {
		return this.qs_instructions_history_list_paged && this.qs_instructions_history_list_paged.count() == 0 && Session.get("QsInstructionsHistoryListPagedSearchString");
	},
	"gotPrevPage": function() {
		return !!Session.get("QsInstructionsHistoryListPagedPageNo");
	},
	"gotNextPage": function() {
		return (Session.get("QsInstructionsHistoryListPagedPageNo") || 0) < this.qs_instructions_history_list_paged_page_count - 1;
	},
	"searchString": function() {
		return Session.get("QsInstructionsHistoryListPagedSearchString");
	},
	"viewAsTable": function() {
		return Session.get("QsInstructionsQsInstructionsPendingDetailsQsInstructionsHistoryViewStyle") == "table";
	},
	"viewAsBlog": function() {
		return Session.get("QsInstructionsQsInstructionsPendingDetailsQsInstructionsHistoryViewStyle") == "blog";
	},
	"viewAsList": function() {
		return Session.get("QsInstructionsQsInstructionsPendingDetailsQsInstructionsHistoryViewStyle") == "list";
	},
	"viewAsGallery": function() {
		return Session.get("QsInstructionsQsInstructionsPendingDetailsQsInstructionsHistoryViewStyle") == "gallery";
	}

	
});


Template.QsInstructionsQsInstructionsPendingDetailsQsInstructionsHistoryViewTable.onCreated(function() {
	
});

Template.QsInstructionsQsInstructionsPendingDetailsQsInstructionsHistoryViewTable.onDestroyed(function() {
	
});

Template.QsInstructionsQsInstructionsPendingDetailsQsInstructionsHistoryViewTable.onRendered(function() {
	
});

Template.QsInstructionsQsInstructionsPendingDetailsQsInstructionsHistoryViewTable.events({
	"click .th-sortable": function(e, t) {
		e.preventDefault();
		var oldSortBy = Session.get("QsInstructionsHistoryListPagedSortBy");
		var newSortBy = $(e.target).attr("data-sort");

		Session.set("QsInstructionsHistoryListPagedSortBy", newSortBy);
		if(oldSortBy == newSortBy) {
			var sortAscending = Session.get("QsInstructionsHistoryListPagedSortAscending");
			if(typeof sortAscending == "undefined") {
				sortAscending = true;
			}
			Session.set("QsInstructionsHistoryListPagedSortAscending", !sortAscending);
		} else {
			Session.set("QsInstructionsHistoryListPagedSortAscending", true);
		}
	}
});

Template.QsInstructionsQsInstructionsPendingDetailsQsInstructionsHistoryViewTable.helpers({
});


Template.QsInstructionsQsInstructionsPendingDetailsQsInstructionsHistoryViewTableItems.onCreated(function() {
	
});

Template.QsInstructionsQsInstructionsPendingDetailsQsInstructionsHistoryViewTableItems.onDestroyed(function() {
	
});

Template.QsInstructionsQsInstructionsPendingDetailsQsInstructionsHistoryViewTableItems.onRendered(function() {
	
});

Template.QsInstructionsQsInstructionsPendingDetailsQsInstructionsHistoryViewTableItems.events({
	

	"click td": function(e, t) {
		e.preventDefault();
		var item = this;
		var itemId = item ? item._id : null;

		
		/**/
		return false;
	},

	"click .inline-checkbox": function(e, t) {
		e.preventDefault();

		if(!this || !this._id) return false;

		var fieldName = $(e.currentTarget).attr("data-field");
		if(!fieldName) return false;

		var values = {};
		values[fieldName] = !this[fieldName];

		Meteor.call("qsInstructionsHistoryUpdate", this._id, values, function(err, res) {
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
						Meteor.call("qsInstructionsHistoryRemove", me._id, function(err, res) {
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
		/**/
		return false;
	}
});

Template.QsInstructionsQsInstructionsPendingDetailsQsInstructionsHistoryViewTableItems.helpers({
	

	"checked": function(value) { return value ? "checked" : "" }, 
	"editButtonClass": function() {
		return QsInstructionsHistory.userCanUpdate(Meteor.userId(), this) ? "" : "hidden";
	},

	"deleteButtonClass": function() {
		return QsInstructionsHistory.userCanRemove(Meteor.userId(), this) ? "" : "hidden";
	}
});
