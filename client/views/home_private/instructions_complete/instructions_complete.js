Template.HomePrivateInstructionsComplete.onCreated(function() {
	
});

Template.HomePrivateInstructionsComplete.onDestroyed(function() {
	
});

Template.HomePrivateInstructionsComplete.onRendered(function() {
	
	Meteor.defer(function() {
		globalOnRendered();
		$("input[autofocus]").focus();
	});
});

Template.HomePrivateInstructionsComplete.events({
	
});

Template.HomePrivateInstructionsComplete.helpers({
	
});


var HomePrivateInstructionsCompleteViewExport = function(fileType) {
	var extraParams = {
		searchText: Session.get("InstructionsCompletePagedSearchString") || "",
		searchFields: Session.get("InstructionsCompletePagedSearchFields") || ["bank_ref", "date", "lawyerId", "lawyer.name", "borrower", "banking_segment.name", "collateral", "currencies", "transaction_type", "amount", "update_date", "action_pending_with", "date_completed", "is_staff", "early_drawdown", "amount_kes", "amount_usd", "amount_eur", "amount_gbp", "rm", "undertaking_issued", "undertaking_end_date"],
		sortBy: Session.get("InstructionsCompletePagedSortBy") || "",
		sortAscending: Session.get("InstructionsCompletePagedSortAscending") || true
	};

	var exportFields = ["bank_ref", "date", "lawyer.name", "borrower", "banking_segment.name", "collateral", "currencies", "transaction_type", "amount", "update", "update_date", "action_pending_with", "date_completed", "is_staff", "early_drawdown", "amount_kes", "amount_usd", "amount_eur", "amount_gbp", "rm", "undertaking_issued", "undertaking_end_date", "has_delays", "reasons_for_delays"];

	

	Meteor.call("instructionsCompletePagedExport", extraParams, exportFields, fileType, function(e, data) {
		if(e) {
			alert(e);
			return;
		}

		let filename = "export." + fileType;
		downloadLocalResource(data, filename, "application/octet-stream");
	});
};

Template.HomePrivateInstructionsCompleteView.onCreated(function() {
	
});

Template.HomePrivateInstructionsCompleteView.onDestroyed(function() {
	
});

Template.HomePrivateInstructionsCompleteView.onRendered(function() {
	Session.set("HomePrivateInstructionsCompleteViewStyle", "table");
	
});

Template.HomePrivateInstructionsCompleteView.events({
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
				Session.set("InstructionsCompletePagedSearchString", searchString);
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
					Session.set("InstructionsCompletePagedSearchString", searchString);
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
					Session.set("InstructionsCompletePagedSearchString", "");
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
		HomePrivateInstructionsCompleteViewExport.call(this, "csv");
	},

	"click #dataview-export-csv": function(e, t) {
		e.preventDefault();
		HomePrivateInstructionsCompleteViewExport.call(this, "csv");
	},

	"click #dataview-export-tsv": function(e, t) {
		e.preventDefault();
		HomePrivateInstructionsCompleteViewExport.call(this, "tsv");
	},

	"click #dataview-export-json": function(e, t) {
		e.preventDefault();
		HomePrivateInstructionsCompleteViewExport.call(this, "json");
	},

	"click .prev-page-link": function(e, t) {
		e.preventDefault();
		var currentPage = Session.get("InstructionsCompletePagedPageNo") || 0;
		if(currentPage > 0) {
			Session.set("InstructionsCompletePagedPageNo", currentPage - 1);
		}
	},

	"click .next-page-link": function(e, t) {
		e.preventDefault();
		let currentPage = Session.get("InstructionsCompletePagedPageNo") || 0;
		if(currentPage < this.instructions_complete_paged_page_count - 1) {
			Session.set("InstructionsCompletePagedPageNo", currentPage + 1);
		}
	}

	
});

Template.HomePrivateInstructionsCompleteView.helpers({

	"insertButtonClass": function() {
		return Instructions.userCanInsert(Meteor.userId(), {}) ? "" : "hidden";
	},

	"isEmpty": function() {
		return !this.instructions_complete_paged || this.instructions_complete_paged.count() == 0;
	},
	"isNotEmpty": function() {
		return this.instructions_complete_paged && this.instructions_complete_paged.count() > 0;
	},
	"isNotFound": function() {
		return this.instructions_complete_paged && this.instructions_complete_paged.count() == 0 && Session.get("InstructionsCompletePagedSearchString");
	},
	"gotPrevPage": function() {
		return !!Session.get("InstructionsCompletePagedPageNo");
	},
	"gotNextPage": function() {
		return (Session.get("InstructionsCompletePagedPageNo") || 0) < this.instructions_complete_paged_page_count - 1;
	},
	"searchString": function() {
		return Session.get("InstructionsCompletePagedSearchString");
	},
	"viewAsTable": function() {
		return Session.get("HomePrivateInstructionsCompleteViewStyle") == "table";
	},
	"viewAsBlog": function() {
		return Session.get("HomePrivateInstructionsCompleteViewStyle") == "blog";
	},
	"viewAsList": function() {
		return Session.get("HomePrivateInstructionsCompleteViewStyle") == "list";
	},
	"viewAsGallery": function() {
		return Session.get("HomePrivateInstructionsCompleteViewStyle") == "gallery";
	}

	
});


Template.HomePrivateInstructionsCompleteViewTable.onCreated(function() {
	
});

Template.HomePrivateInstructionsCompleteViewTable.onDestroyed(function() {
	
});

Template.HomePrivateInstructionsCompleteViewTable.onRendered(function() {
	
});

Template.HomePrivateInstructionsCompleteViewTable.events({
	"click .th-sortable": function(e, t) {
		e.preventDefault();
		var oldSortBy = Session.get("InstructionsCompletePagedSortBy");
		var newSortBy = $(e.target).attr("data-sort");

		Session.set("InstructionsCompletePagedSortBy", newSortBy);
		if(oldSortBy == newSortBy) {
			var sortAscending = Session.get("InstructionsCompletePagedSortAscending");
			if(typeof sortAscending == "undefined") {
				sortAscending = true;
			}
			Session.set("InstructionsCompletePagedSortAscending", !sortAscending);
		} else {
			Session.set("InstructionsCompletePagedSortAscending", true);
		}
	}
});

Template.HomePrivateInstructionsCompleteViewTable.helpers({
});


Template.HomePrivateInstructionsCompleteViewTableItems.onCreated(function() {
	
});

Template.HomePrivateInstructionsCompleteViewTableItems.onDestroyed(function() {
	
});

Template.HomePrivateInstructionsCompleteViewTableItems.onRendered(function() {
	
});

Template.HomePrivateInstructionsCompleteViewTableItems.events({
	

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
		/**/
		return false;
	}
});

Template.HomePrivateInstructionsCompleteViewTableItems.helpers({
	

	"checked": function(value) { return value ? "checked" : "" }, 
	"editButtonClass": function() {
		return Instructions.userCanUpdate(Meteor.userId(), this) ? "" : "hidden";
	},

	"deleteButtonClass": function() {
		return Instructions.userCanRemove(Meteor.userId(), this) ? "" : "hidden";
	}
});
