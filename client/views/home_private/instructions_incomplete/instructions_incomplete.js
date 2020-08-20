Template.HomePrivateInstructionsIncomplete.onCreated(function() {
	
});

Template.HomePrivateInstructionsIncomplete.onDestroyed(function() {
	
});

Template.HomePrivateInstructionsIncomplete.onRendered(function() {
	
	Meteor.defer(function() {
		globalOnRendered();
		$("input[autofocus]").focus();
	});
});

Template.HomePrivateInstructionsIncomplete.events({
	
});

Template.HomePrivateInstructionsIncomplete.helpers({
	
});


var HomePrivateInstructionsIncompleteViewExport = function(fileType) {
	var extraParams = {
		searchText: Session.get("InstructionsIncompletePagedSearchString") || "",
		searchFields: Session.get("InstructionsIncompletePagedSearchFields") || ["bank_ref", "date", "lawyerId", "lawyer.name", "borrower", "banking_segment.name", "collateral", "currencies", "transaction_type", "amount", "update_date", "action_pending_with", "date_completed", "is_staff", "early_drawdown", "amount_kes", "amount_usd", "amount_eur", "amount_gbp", "rm", "undertaking_issued", "undertaking_end_date"],
		sortBy: Session.get("InstructionsIncompletePagedSortBy") || "",
		sortAscending: Session.get("InstructionsIncompletePagedSortAscending") || true
	};

	var exportFields = ["bank_ref", "date", "lawyer.name", "borrower", "banking_segment.name", "collateral", "currencies", "transaction_type", "amount", "update", "update_date", "action_pending_with", "date_completed", "is_staff", "early_drawdown", "amount_kes", "amount_usd", "amount_eur", "amount_gbp", "rm", "undertaking_issued", "undertaking_end_date", "has_delays", "reasons_for_delays"];

	

	Meteor.call("instructionsIncompletePagedExport", extraParams, exportFields, fileType, function(e, data) {
		if(e) {
			alert(e);
			return;
		}

		let filename = "export." + fileType;
		downloadLocalResource(data, filename, "application/octet-stream");
	});
};

Template.HomePrivateInstructionsIncompleteView.onCreated(function() {
	
});

Template.HomePrivateInstructionsIncompleteView.onDestroyed(function() {
	
});

Template.HomePrivateInstructionsIncompleteView.onRendered(function() {
	Session.set("HomePrivateInstructionsIncompleteViewStyle", "table");
	
});

Template.HomePrivateInstructionsIncompleteView.events({
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
				Session.set("InstructionsIncompletePagedSearchString", searchString);
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
					Session.set("InstructionsIncompletePagedSearchString", searchString);
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
					Session.set("InstructionsIncompletePagedSearchString", "");
				}

			}
			return false;
		}

		return true;
	},

	"click #dataview-insert-button": function(e, t) {
		e.preventDefault();
		Router.go("home_private.instructions_incomplete.insert", mergeObjects(Router.currentRouteParams(), {}));
	},

	"click #dataview-export-default": function(e, t) {
		e.preventDefault();
		HomePrivateInstructionsIncompleteViewExport.call(this, "csv");
	},

	"click #dataview-export-csv": function(e, t) {
		e.preventDefault();
		HomePrivateInstructionsIncompleteViewExport.call(this, "csv");
	},

	"click #dataview-export-tsv": function(e, t) {
		e.preventDefault();
		HomePrivateInstructionsIncompleteViewExport.call(this, "tsv");
	},

	"click #dataview-export-json": function(e, t) {
		e.preventDefault();
		HomePrivateInstructionsIncompleteViewExport.call(this, "json");
	},

	"click .prev-page-link": function(e, t) {
		e.preventDefault();
		var currentPage = Session.get("InstructionsIncompletePagedPageNo") || 0;
		if(currentPage > 0) {
			Session.set("InstructionsIncompletePagedPageNo", currentPage - 1);
		}
	},

	"click .next-page-link": function(e, t) {
		e.preventDefault();
		let currentPage = Session.get("InstructionsIncompletePagedPageNo") || 0;
		if(currentPage < this.instructions_incomplete_paged_page_count - 1) {
			Session.set("InstructionsIncompletePagedPageNo", currentPage + 1);
		}
	}

	
});

Template.HomePrivateInstructionsIncompleteView.helpers({

	"insertButtonClass": function() {
		return Instructions.userCanInsert(Meteor.userId(), {}) ? "" : "hidden";
	},

	"isEmpty": function() {
		return !this.instructions_incomplete_paged || this.instructions_incomplete_paged.count() == 0;
	},
	"isNotEmpty": function() {
		return this.instructions_incomplete_paged && this.instructions_incomplete_paged.count() > 0;
	},
	"isNotFound": function() {
		return this.instructions_incomplete_paged && this.instructions_incomplete_paged.count() == 0 && Session.get("InstructionsIncompletePagedSearchString");
	},
	"gotPrevPage": function() {
		return !!Session.get("InstructionsIncompletePagedPageNo");
	},
	"gotNextPage": function() {
		return (Session.get("InstructionsIncompletePagedPageNo") || 0) < this.instructions_incomplete_paged_page_count - 1;
	},
	"searchString": function() {
		return Session.get("InstructionsIncompletePagedSearchString");
	},
	"viewAsTable": function() {
		return Session.get("HomePrivateInstructionsIncompleteViewStyle") == "table";
	},
	"viewAsBlog": function() {
		return Session.get("HomePrivateInstructionsIncompleteViewStyle") == "blog";
	},
	"viewAsList": function() {
		return Session.get("HomePrivateInstructionsIncompleteViewStyle") == "list";
	},
	"viewAsGallery": function() {
		return Session.get("HomePrivateInstructionsIncompleteViewStyle") == "gallery";
	}

	
});


Template.HomePrivateInstructionsIncompleteViewTable.onCreated(function() {
	
});

Template.HomePrivateInstructionsIncompleteViewTable.onDestroyed(function() {
	
});

Template.HomePrivateInstructionsIncompleteViewTable.onRendered(function() {
	
});

Template.HomePrivateInstructionsIncompleteViewTable.events({
	"click .th-sortable": function(e, t) {
		e.preventDefault();
		var oldSortBy = Session.get("InstructionsIncompletePagedSortBy");
		var newSortBy = $(e.target).attr("data-sort");

		Session.set("InstructionsIncompletePagedSortBy", newSortBy);
		if(oldSortBy == newSortBy) {
			var sortAscending = Session.get("InstructionsIncompletePagedSortAscending");
			if(typeof sortAscending == "undefined") {
				sortAscending = true;
			}
			Session.set("InstructionsIncompletePagedSortAscending", !sortAscending);
		} else {
			Session.set("InstructionsIncompletePagedSortAscending", true);
		}
	}
});

Template.HomePrivateInstructionsIncompleteViewTable.helpers({
});


Template.HomePrivateInstructionsIncompleteViewTableItems.onCreated(function() {
	
});

Template.HomePrivateInstructionsIncompleteViewTableItems.onDestroyed(function() {
	
});

Template.HomePrivateInstructionsIncompleteViewTableItems.onRendered(function() {
	
});

Template.HomePrivateInstructionsIncompleteViewTableItems.events({
	

	"click td": function(e, t) {
		e.preventDefault();
		var item = this;
		var itemId = item ? item._id : null;

		
		Router.go("home_private.instructions_incomplete.details", mergeObjects(Router.currentRouteParams(), {instructionId: this._id}));
		return false;
	},

	"click .inline-checkbox": function(e, t) {
		e.preventDefault();

		if(!this || !this._id) return false;

		var fieldName = $(e.currentTarget).attr("data-field");
		if(!fieldName) return false;

		var values = {};
		values[fieldName] = !this[fieldName];

		Meteor.call("instructionsUpdate", this._id, values, function(err, res) {
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
						Meteor.call("instructionsRemove", me._id, function(err, res) {
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
		Router.go("home_private.instructions_incomplete.edit", mergeObjects(Router.currentRouteParams(), {instructionId: this._id}));
		return false;
	}
});

Template.HomePrivateInstructionsIncompleteViewTableItems.helpers({
	

	"checked": function(value) { return value ? "checked" : "" }, 
	"editButtonClass": function() {
		return Instructions.userCanUpdate(Meteor.userId(), this) ? "" : "hidden";
	},

	"deleteButtonClass": function() {
		return Instructions.userCanRemove(Meteor.userId(), this) ? "" : "hidden";
	}
});
