Template.QsInstructionsQsInstructionsPending.onCreated(function() {
	
});

Template.QsInstructionsQsInstructionsPending.onDestroyed(function() {
	
});

Template.QsInstructionsQsInstructionsPending.onRendered(function() {
	
	Meteor.defer(function() {
		globalOnRendered();
		$("input[autofocus]").focus();
	});
});

Template.QsInstructionsQsInstructionsPending.events({
	
});

Template.QsInstructionsQsInstructionsPending.helpers({
	
});


var QsInstructionsQsInstructionsPendingViewExport = function(fileType) {
	var extraParams = {
		searchText: Session.get("QsInstructionsPendingListPagedSearchString") || "",
		searchFields: Session.get("QsInstructionsPendingListPagedSearchFields") || ["reference", "qs.name", "borrower", "Plot_Details", "rm", "action_pending_with", "date_closed"],
		sortBy: Session.get("QsInstructionsPendingListPagedSortBy") || "",
		sortAscending: Session.get("QsInstructionsPendingListPagedSortAscending") || true
	};

	var exportFields = ["date", "qs.name", "borrower", "currency", "amount", "Plot_Details", "rm", "action_pending_with", "date_closed"];

	

	Meteor.call("qsInstructionsPendingListPagedExport", extraParams, exportFields, fileType, function(e, data) {
		if(e) {
			alert(e);
			return;
		}

		let filename = "export." + fileType;
		downloadLocalResource(data, filename, "application/octet-stream");
	});
};

Template.QsInstructionsQsInstructionsPendingView.onCreated(function() {
	
});

Template.QsInstructionsQsInstructionsPendingView.onDestroyed(function() {
	
});

Template.QsInstructionsQsInstructionsPendingView.onRendered(function() {
	Session.set("QsInstructionsQsInstructionsPendingViewStyle", "table");
	
});

Template.QsInstructionsQsInstructionsPendingView.events({
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
				Session.set("QsInstructionsPendingListPagedSearchString", searchString);
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
					Session.set("QsInstructionsPendingListPagedSearchString", searchString);
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
					Session.set("QsInstructionsPendingListPagedSearchString", "");
				}

			}
			return false;
		}

		return true;
	},

	"click #dataview-insert-button": function(e, t) {
		e.preventDefault();
		Router.go("qs_instructions.qs_instructions_pending.insert", mergeObjects(Router.currentRouteParams(), {}));
	},

	"click #dataview-export-default": function(e, t) {
		e.preventDefault();
		QsInstructionsQsInstructionsPendingViewExport.call(this, "csv");
	},

	"click #dataview-export-csv": function(e, t) {
		e.preventDefault();
		QsInstructionsQsInstructionsPendingViewExport.call(this, "csv");
	},

	"click #dataview-export-tsv": function(e, t) {
		e.preventDefault();
		QsInstructionsQsInstructionsPendingViewExport.call(this, "tsv");
	},

	"click #dataview-export-json": function(e, t) {
		e.preventDefault();
		QsInstructionsQsInstructionsPendingViewExport.call(this, "json");
	},

	"click .prev-page-link": function(e, t) {
		e.preventDefault();
		var currentPage = Session.get("QsInstructionsPendingListPagedPageNo") || 0;
		if(currentPage > 0) {
			Session.set("QsInstructionsPendingListPagedPageNo", currentPage - 1);
		}
	},

	"click .next-page-link": function(e, t) {
		e.preventDefault();
		let currentPage = Session.get("QsInstructionsPendingListPagedPageNo") || 0;
		if(currentPage < this.qs_instructions_pending_list_paged_page_count - 1) {
			Session.set("QsInstructionsPendingListPagedPageNo", currentPage + 1);
		}
	}

	
});

Template.QsInstructionsQsInstructionsPendingView.helpers({

	"insertButtonClass": function() {
		return QsInstructions.userCanInsert(Meteor.userId(), {}) ? "" : "hidden";
	},

	"isEmpty": function() {
		return !this.qs_instructions_pending_list_paged || this.qs_instructions_pending_list_paged.count() == 0;
	},
	"isNotEmpty": function() {
		return this.qs_instructions_pending_list_paged && this.qs_instructions_pending_list_paged.count() > 0;
	},
	"isNotFound": function() {
		return this.qs_instructions_pending_list_paged && this.qs_instructions_pending_list_paged.count() == 0 && Session.get("QsInstructionsPendingListPagedSearchString");
	},
	"gotPrevPage": function() {
		return !!Session.get("QsInstructionsPendingListPagedPageNo");
	},
	"gotNextPage": function() {
		return (Session.get("QsInstructionsPendingListPagedPageNo") || 0) < this.qs_instructions_pending_list_paged_page_count - 1;
	},
	"searchString": function() {
		return Session.get("QsInstructionsPendingListPagedSearchString");
	},
	"viewAsTable": function() {
		return Session.get("QsInstructionsQsInstructionsPendingViewStyle") == "table";
	},
	"viewAsBlog": function() {
		return Session.get("QsInstructionsQsInstructionsPendingViewStyle") == "blog";
	},
	"viewAsList": function() {
		return Session.get("QsInstructionsQsInstructionsPendingViewStyle") == "list";
	},
	"viewAsGallery": function() {
		return Session.get("QsInstructionsQsInstructionsPendingViewStyle") == "gallery";
	}

	
});


Template.QsInstructionsQsInstructionsPendingViewTable.onCreated(function() {
	
});

Template.QsInstructionsQsInstructionsPendingViewTable.onDestroyed(function() {
	
});

Template.QsInstructionsQsInstructionsPendingViewTable.onRendered(function() {
	
});

Template.QsInstructionsQsInstructionsPendingViewTable.events({
	"click .th-sortable": function(e, t) {
		e.preventDefault();
		var oldSortBy = Session.get("QsInstructionsPendingListPagedSortBy");
		var newSortBy = $(e.target).attr("data-sort");

		Session.set("QsInstructionsPendingListPagedSortBy", newSortBy);
		if(oldSortBy == newSortBy) {
			var sortAscending = Session.get("QsInstructionsPendingListPagedSortAscending");
			if(typeof sortAscending == "undefined") {
				sortAscending = true;
			}
			Session.set("QsInstructionsPendingListPagedSortAscending", !sortAscending);
		} else {
			Session.set("QsInstructionsPendingListPagedSortAscending", true);
		}
	}
});

Template.QsInstructionsQsInstructionsPendingViewTable.helpers({
});


Template.QsInstructionsQsInstructionsPendingViewTableItems.onCreated(function() {
	
});

Template.QsInstructionsQsInstructionsPendingViewTableItems.onDestroyed(function() {
	
});

Template.QsInstructionsQsInstructionsPendingViewTableItems.onRendered(function() {
	
});

Template.QsInstructionsQsInstructionsPendingViewTableItems.events({
	

	"click td": function(e, t) {
		e.preventDefault();
		var item = this;
		var itemId = item ? item._id : null;

		
		Router.go("qs_instructions.qs_instructions_pending.details", mergeObjects(Router.currentRouteParams(), {qsInstructionsPendingId: this._id}));
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
		Router.go("qs_instructions.qs_instructions_pending.update", mergeObjects(Router.currentRouteParams(), {qsInstructionsPendingId: this._id}));
		return false;
	}
});

Template.QsInstructionsQsInstructionsPendingViewTableItems.helpers({
	

	"checked": function(value) { return value ? "checked" : "" }, 
	"editButtonClass": function() {
		return QsInstructions.userCanUpdate(Meteor.userId(), this) ? "" : "hidden";
	},

	"deleteButtonClass": function() {
		return QsInstructions.userCanRemove(Meteor.userId(), this) ? "" : "hidden";
	}
});
