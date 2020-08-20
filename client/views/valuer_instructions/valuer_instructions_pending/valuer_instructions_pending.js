Template.ValuerInstructionsValuerInstructionsPending.onCreated(function() {
	
});

Template.ValuerInstructionsValuerInstructionsPending.onDestroyed(function() {
	
});

Template.ValuerInstructionsValuerInstructionsPending.onRendered(function() {
	
	Meteor.defer(function() {
		globalOnRendered();
		$("input[autofocus]").focus();
	});
});

Template.ValuerInstructionsValuerInstructionsPending.events({
	
});

Template.ValuerInstructionsValuerInstructionsPending.helpers({
	
});


var ValuerInstructionsValuerInstructionsPendingViewExport = function(fileType) {
	var extraParams = {
		searchText: Session.get("ValuerInstructionsPendingListPagedSearchString") || "",
		searchFields: Session.get("ValuerInstructionsPendingListPagedSearchFields") || ["bank_ref", "date", "valuerId", "valuer.name", "borrower", "banking_segmentId", "banking_segment.name", "property", "update", "update_date", "status", "date_closed", "value", "rm", "reasons_for_delay"],
		sortBy: Session.get("ValuerInstructionsPendingListPagedSortBy") || "",
		sortAscending: Session.get("ValuerInstructionsPendingListPagedSortAscending") || true
	};

	var exportFields = ["bank_ref", "date", "valuer.name", "borrower", "banking_segment.name", "property", "update", "update_date", "status", "date_closed", "value", "rm", "has_delays", "report_reviewed", "review_satisfactory", "comments"];

	

	Meteor.call("valuerInstructionsPendingListPagedExport", extraParams, exportFields, fileType, function(e, data) {
		if(e) {
			alert(e);
			return;
		}

		let filename = "export." + fileType;
		downloadLocalResource(data, filename, "application/octet-stream");
	});
};

Template.ValuerInstructionsValuerInstructionsPendingView.onCreated(function() {
	
});

Template.ValuerInstructionsValuerInstructionsPendingView.onDestroyed(function() {
	
});

Template.ValuerInstructionsValuerInstructionsPendingView.onRendered(function() {
	Session.set("ValuerInstructionsValuerInstructionsPendingViewStyle", "table");
	
});

Template.ValuerInstructionsValuerInstructionsPendingView.events({
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
				Session.set("ValuerInstructionsPendingListPagedSearchString", searchString);
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
					Session.set("ValuerInstructionsPendingListPagedSearchString", searchString);
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
					Session.set("ValuerInstructionsPendingListPagedSearchString", "");
				}

			}
			return false;
		}

		return true;
	},

	"click #dataview-insert-button": function(e, t) {
		e.preventDefault();
		Router.go("valuer_instructions.valuer_instructions_pending.insert", mergeObjects(Router.currentRouteParams(), {}));
	},

	"click #dataview-export-default": function(e, t) {
		e.preventDefault();
		ValuerInstructionsValuerInstructionsPendingViewExport.call(this, "csv");
	},

	"click #dataview-export-csv": function(e, t) {
		e.preventDefault();
		ValuerInstructionsValuerInstructionsPendingViewExport.call(this, "csv");
	},

	"click #dataview-export-tsv": function(e, t) {
		e.preventDefault();
		ValuerInstructionsValuerInstructionsPendingViewExport.call(this, "tsv");
	},

	"click #dataview-export-json": function(e, t) {
		e.preventDefault();
		ValuerInstructionsValuerInstructionsPendingViewExport.call(this, "json");
	},

	"click .prev-page-link": function(e, t) {
		e.preventDefault();
		var currentPage = Session.get("ValuerInstructionsPendingListPagedPageNo") || 0;
		if(currentPage > 0) {
			Session.set("ValuerInstructionsPendingListPagedPageNo", currentPage - 1);
		}
	},

	"click .next-page-link": function(e, t) {
		e.preventDefault();
		let currentPage = Session.get("ValuerInstructionsPendingListPagedPageNo") || 0;
		if(currentPage < this.valuer_instructions_pending_list_paged_page_count - 1) {
			Session.set("ValuerInstructionsPendingListPagedPageNo", currentPage + 1);
		}
	}

	
});

Template.ValuerInstructionsValuerInstructionsPendingView.helpers({

	"insertButtonClass": function() {
		return ValuerInstructions.userCanInsert(Meteor.userId(), {}) ? "" : "hidden";
	},

	"isEmpty": function() {
		return !this.valuer_instructions_pending_list_paged || this.valuer_instructions_pending_list_paged.count() == 0;
	},
	"isNotEmpty": function() {
		return this.valuer_instructions_pending_list_paged && this.valuer_instructions_pending_list_paged.count() > 0;
	},
	"isNotFound": function() {
		return this.valuer_instructions_pending_list_paged && this.valuer_instructions_pending_list_paged.count() == 0 && Session.get("ValuerInstructionsPendingListPagedSearchString");
	},
	"gotPrevPage": function() {
		return !!Session.get("ValuerInstructionsPendingListPagedPageNo");
	},
	"gotNextPage": function() {
		return (Session.get("ValuerInstructionsPendingListPagedPageNo") || 0) < this.valuer_instructions_pending_list_paged_page_count - 1;
	},
	"searchString": function() {
		return Session.get("ValuerInstructionsPendingListPagedSearchString");
	},
	"viewAsTable": function() {
		return Session.get("ValuerInstructionsValuerInstructionsPendingViewStyle") == "table";
	},
	"viewAsBlog": function() {
		return Session.get("ValuerInstructionsValuerInstructionsPendingViewStyle") == "blog";
	},
	"viewAsList": function() {
		return Session.get("ValuerInstructionsValuerInstructionsPendingViewStyle") == "list";
	},
	"viewAsGallery": function() {
		return Session.get("ValuerInstructionsValuerInstructionsPendingViewStyle") == "gallery";
	}

	
});


Template.ValuerInstructionsValuerInstructionsPendingViewTable.onCreated(function() {
	
});

Template.ValuerInstructionsValuerInstructionsPendingViewTable.onDestroyed(function() {
	
});

Template.ValuerInstructionsValuerInstructionsPendingViewTable.onRendered(function() {
	
});

Template.ValuerInstructionsValuerInstructionsPendingViewTable.events({
	"click .th-sortable": function(e, t) {
		e.preventDefault();
		var oldSortBy = Session.get("ValuerInstructionsPendingListPagedSortBy");
		var newSortBy = $(e.target).attr("data-sort");

		Session.set("ValuerInstructionsPendingListPagedSortBy", newSortBy);
		if(oldSortBy == newSortBy) {
			var sortAscending = Session.get("ValuerInstructionsPendingListPagedSortAscending");
			if(typeof sortAscending == "undefined") {
				sortAscending = true;
			}
			Session.set("ValuerInstructionsPendingListPagedSortAscending", !sortAscending);
		} else {
			Session.set("ValuerInstructionsPendingListPagedSortAscending", true);
		}
	}
});

Template.ValuerInstructionsValuerInstructionsPendingViewTable.helpers({
});


Template.ValuerInstructionsValuerInstructionsPendingViewTableItems.onCreated(function() {
	
});

Template.ValuerInstructionsValuerInstructionsPendingViewTableItems.onDestroyed(function() {
	
});

Template.ValuerInstructionsValuerInstructionsPendingViewTableItems.onRendered(function() {
	
});

Template.ValuerInstructionsValuerInstructionsPendingViewTableItems.events({
	

	"click td": function(e, t) {
		e.preventDefault();
		var item = this;
		var itemId = item ? item._id : null;

		
		Router.go("valuer_instructions.valuer_instructions_pending.details", mergeObjects(Router.currentRouteParams(), {valuerInstructionsPendingId: this._id}));
		return false;
	},

	"click .inline-checkbox": function(e, t) {
		e.preventDefault();

		if(!this || !this._id) return false;

		var fieldName = $(e.currentTarget).attr("data-field");
		if(!fieldName) return false;

		var values = {};
		values[fieldName] = !this[fieldName];

		Meteor.call("valuerInstructionsUpdate", this._id, values, function(err, res) {
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
						Meteor.call("valuerInstructionsRemove", me._id, function(err, res) {
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
		Router.go("valuer_instructions.valuer_instructions_pending.update", mergeObjects(Router.currentRouteParams(), {valuerInstructionsPendingId: this._id}));
		return false;
	}
});

Template.ValuerInstructionsValuerInstructionsPendingViewTableItems.helpers({
	

	"checked": function(value) { return value ? "checked" : "" }, 
	"editButtonClass": function() {
		return ValuerInstructions.userCanUpdate(Meteor.userId(), this) ? "" : "hidden";
	},

	"deleteButtonClass": function() {
		return ValuerInstructions.userCanRemove(Meteor.userId(), this) ? "" : "hidden";
	}
});
