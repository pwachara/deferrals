Template.ValuerInstructionsValuerInstructionsClosed.onCreated(function() {
	
});

Template.ValuerInstructionsValuerInstructionsClosed.onDestroyed(function() {
	
});

Template.ValuerInstructionsValuerInstructionsClosed.onRendered(function() {
	
	Meteor.defer(function() {
		globalOnRendered();
		$("input[autofocus]").focus();
	});
});

Template.ValuerInstructionsValuerInstructionsClosed.events({
	
});

Template.ValuerInstructionsValuerInstructionsClosed.helpers({
	
});


var ValuerInstructionsValuerInstructionsClosedViewExport = function(fileType) {
	var extraParams = {
		searchText: Session.get("ValuerInstructionsClosedListPagedSearchString") || "",
		searchFields: Session.get("ValuerInstructionsClosedListPagedSearchFields") || ["bank_ref", "date", "valuerId", "valuer.name", "borrower", "banking_segment.name", "property", "update", "update_date", "status", "date_closed", "value", "rm", "reasons_for_delay"],
		sortBy: Session.get("ValuerInstructionsClosedListPagedSortBy") || "",
		sortAscending: Session.get("ValuerInstructionsClosedListPagedSortAscending") || true
	};

	var exportFields = ["bank_ref", "date", "valuer.name", "borrower", "banking_segment.name", "property", "update", "update_date", "status", "date_closed", "value", "rm", "has_delays", "report_reviewed", "review_satisfactory", "comments"];

	

	Meteor.call("valuerInstructionsClosedListPagedExport", extraParams, exportFields, fileType, function(e, data) {
		if(e) {
			alert(e);
			return;
		}

		let filename = "export." + fileType;
		downloadLocalResource(data, filename, "application/octet-stream");
	});
};

Template.ValuerInstructionsValuerInstructionsClosedView.onCreated(function() {
	
});

Template.ValuerInstructionsValuerInstructionsClosedView.onDestroyed(function() {
	
});

Template.ValuerInstructionsValuerInstructionsClosedView.onRendered(function() {
	Session.set("ValuerInstructionsValuerInstructionsClosedViewStyle", "table");
	
});

Template.ValuerInstructionsValuerInstructionsClosedView.events({
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
				Session.set("ValuerInstructionsClosedListPagedSearchString", searchString);
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
					Session.set("ValuerInstructionsClosedListPagedSearchString", searchString);
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
					Session.set("ValuerInstructionsClosedListPagedSearchString", "");
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
		ValuerInstructionsValuerInstructionsClosedViewExport.call(this, "csv");
	},

	"click #dataview-export-csv": function(e, t) {
		e.preventDefault();
		ValuerInstructionsValuerInstructionsClosedViewExport.call(this, "csv");
	},

	"click #dataview-export-tsv": function(e, t) {
		e.preventDefault();
		ValuerInstructionsValuerInstructionsClosedViewExport.call(this, "tsv");
	},

	"click #dataview-export-json": function(e, t) {
		e.preventDefault();
		ValuerInstructionsValuerInstructionsClosedViewExport.call(this, "json");
	},

	"click .prev-page-link": function(e, t) {
		e.preventDefault();
		var currentPage = Session.get("ValuerInstructionsClosedListPagedPageNo") || 0;
		if(currentPage > 0) {
			Session.set("ValuerInstructionsClosedListPagedPageNo", currentPage - 1);
		}
	},

	"click .next-page-link": function(e, t) {
		e.preventDefault();
		let currentPage = Session.get("ValuerInstructionsClosedListPagedPageNo") || 0;
		if(currentPage < this.valuer_instructions_closed_list_paged_page_count - 1) {
			Session.set("ValuerInstructionsClosedListPagedPageNo", currentPage + 1);
		}
	}

	
});

Template.ValuerInstructionsValuerInstructionsClosedView.helpers({

	"insertButtonClass": function() {
		return ValuerInstructions.userCanInsert(Meteor.userId(), {}) ? "" : "hidden";
	},

	"isEmpty": function() {
		return !this.valuer_instructions_closed_list_paged || this.valuer_instructions_closed_list_paged.count() == 0;
	},
	"isNotEmpty": function() {
		return this.valuer_instructions_closed_list_paged && this.valuer_instructions_closed_list_paged.count() > 0;
	},
	"isNotFound": function() {
		return this.valuer_instructions_closed_list_paged && this.valuer_instructions_closed_list_paged.count() == 0 && Session.get("ValuerInstructionsClosedListPagedSearchString");
	},
	"gotPrevPage": function() {
		return !!Session.get("ValuerInstructionsClosedListPagedPageNo");
	},
	"gotNextPage": function() {
		return (Session.get("ValuerInstructionsClosedListPagedPageNo") || 0) < this.valuer_instructions_closed_list_paged_page_count - 1;
	},
	"searchString": function() {
		return Session.get("ValuerInstructionsClosedListPagedSearchString");
	},
	"viewAsTable": function() {
		return Session.get("ValuerInstructionsValuerInstructionsClosedViewStyle") == "table";
	},
	"viewAsBlog": function() {
		return Session.get("ValuerInstructionsValuerInstructionsClosedViewStyle") == "blog";
	},
	"viewAsList": function() {
		return Session.get("ValuerInstructionsValuerInstructionsClosedViewStyle") == "list";
	},
	"viewAsGallery": function() {
		return Session.get("ValuerInstructionsValuerInstructionsClosedViewStyle") == "gallery";
	}

	
});


Template.ValuerInstructionsValuerInstructionsClosedViewTable.onCreated(function() {
	
});

Template.ValuerInstructionsValuerInstructionsClosedViewTable.onDestroyed(function() {
	
});

Template.ValuerInstructionsValuerInstructionsClosedViewTable.onRendered(function() {
	
});

Template.ValuerInstructionsValuerInstructionsClosedViewTable.events({
	"click .th-sortable": function(e, t) {
		e.preventDefault();
		var oldSortBy = Session.get("ValuerInstructionsClosedListPagedSortBy");
		var newSortBy = $(e.target).attr("data-sort");

		Session.set("ValuerInstructionsClosedListPagedSortBy", newSortBy);
		if(oldSortBy == newSortBy) {
			var sortAscending = Session.get("ValuerInstructionsClosedListPagedSortAscending");
			if(typeof sortAscending == "undefined") {
				sortAscending = true;
			}
			Session.set("ValuerInstructionsClosedListPagedSortAscending", !sortAscending);
		} else {
			Session.set("ValuerInstructionsClosedListPagedSortAscending", true);
		}
	}
});

Template.ValuerInstructionsValuerInstructionsClosedViewTable.helpers({
});


Template.ValuerInstructionsValuerInstructionsClosedViewTableItems.onCreated(function() {
	
});

Template.ValuerInstructionsValuerInstructionsClosedViewTableItems.onDestroyed(function() {
	
});

Template.ValuerInstructionsValuerInstructionsClosedViewTableItems.onRendered(function() {
	
});

Template.ValuerInstructionsValuerInstructionsClosedViewTableItems.events({
	

	"click td": function(e, t) {
		e.preventDefault();
		var item = this;
		var itemId = item ? item._id : null;

		
		Router.go("valuer_instructions.valuer_instructions_closed.details", mergeObjects(Router.currentRouteParams(), {valuerInstructionsClosedId: this._id}));
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
		Router.go("valuer_instructions.valuer_instructions_closed.update", mergeObjects(Router.currentRouteParams(), {valuerInstructionsClosedId: this._id}));
		return false;
	}
});

Template.ValuerInstructionsValuerInstructionsClosedViewTableItems.helpers({
	

	"checked": function(value) { return value ? "checked" : "" }, 
	"editButtonClass": function() {
		return ValuerInstructions.userCanUpdate(Meteor.userId(), this) ? "" : "hidden";
	},

	"deleteButtonClass": function() {
		return ValuerInstructions.userCanRemove(Meteor.userId(), this) ? "" : "hidden";
	}
});
