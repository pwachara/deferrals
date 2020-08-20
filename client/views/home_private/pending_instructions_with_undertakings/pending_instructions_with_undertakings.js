Template.HomePrivatePendingInstructionsWithUndertakings.onCreated(function() {
	
});

Template.HomePrivatePendingInstructionsWithUndertakings.onDestroyed(function() {
	
});

Template.HomePrivatePendingInstructionsWithUndertakings.onRendered(function() {
	
	Meteor.defer(function() {
		globalOnRendered();
		$("input[autofocus]").focus();
	});
});

Template.HomePrivatePendingInstructionsWithUndertakings.events({
	
});

Template.HomePrivatePendingInstructionsWithUndertakings.helpers({
	
});


var HomePrivatePendingInstructionsWithUndertakingsViewExport = function(fileType) {
	var extraParams = {
		searchText: Session.get("InstructionsWithUndertakingPagedSearchString") || "",
		searchFields: Session.get("InstructionsWithUndertakingPagedSearchFields") || ["bank_ref", "date", "lawyerId", "lawyer.name", "borrower", "banking_segment.name", "collateral", "currencies", "transaction_type", "amount", "update_date", "action_pending_with", "date_completed", "is_staff", "early_drawdown", "amount_kes", "amount_usd", "amount_eur", "amount_gbp", "rm", "undertaking_issued", "undertaking_end_date"],
		sortBy: Session.get("InstructionsWithUndertakingPagedSortBy") || "",
		sortAscending: Session.get("InstructionsWithUndertakingPagedSortAscending") || true
	};

	var exportFields = ["bank_ref", "date", "lawyer.name", "borrower", "banking_segment.name", "collateral", "currencies", "transaction_type", "amount", "update", "update_date", "action_pending_with", "date_completed", "is_staff", "early_drawdown", "amount_kes", "amount_usd", "amount_eur", "amount_gbp", "rm", "undertaking_issued", "undertaking_end_date", "has_delays", "reasons_for_delays"];

	

	Meteor.call("instructionsWithUndertakingPagedExport", extraParams, exportFields, fileType, function(e, data) {
		if(e) {
			alert(e);
			return;
		}

		let filename = "export." + fileType;
		downloadLocalResource(data, filename, "application/octet-stream");
	});
};

Template.HomePrivatePendingInstructionsWithUndertakingsView.onCreated(function() {
	
});

Template.HomePrivatePendingInstructionsWithUndertakingsView.onDestroyed(function() {
	
});

Template.HomePrivatePendingInstructionsWithUndertakingsView.onRendered(function() {
	Session.set("HomePrivatePendingInstructionsWithUndertakingsViewStyle", "table");
	
});

Template.HomePrivatePendingInstructionsWithUndertakingsView.events({
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
				Session.set("InstructionsWithUndertakingPagedSearchString", searchString);
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
					Session.set("InstructionsWithUndertakingPagedSearchString", searchString);
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
					Session.set("InstructionsWithUndertakingPagedSearchString", "");
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
		HomePrivatePendingInstructionsWithUndertakingsViewExport.call(this, "csv");
	},

	"click #dataview-export-csv": function(e, t) {
		e.preventDefault();
		HomePrivatePendingInstructionsWithUndertakingsViewExport.call(this, "csv");
	},

	"click #dataview-export-tsv": function(e, t) {
		e.preventDefault();
		HomePrivatePendingInstructionsWithUndertakingsViewExport.call(this, "tsv");
	},

	"click #dataview-export-json": function(e, t) {
		e.preventDefault();
		HomePrivatePendingInstructionsWithUndertakingsViewExport.call(this, "json");
	},

	"click .prev-page-link": function(e, t) {
		e.preventDefault();
		var currentPage = Session.get("InstructionsWithUndertakingPagedPageNo") || 0;
		if(currentPage > 0) {
			Session.set("InstructionsWithUndertakingPagedPageNo", currentPage - 1);
		}
	},

	"click .next-page-link": function(e, t) {
		e.preventDefault();
		let currentPage = Session.get("InstructionsWithUndertakingPagedPageNo") || 0;
		if(currentPage < this.instructions_with_undertaking_paged_page_count - 1) {
			Session.set("InstructionsWithUndertakingPagedPageNo", currentPage + 1);
		}
	}

	
});

Template.HomePrivatePendingInstructionsWithUndertakingsView.helpers({

	"insertButtonClass": function() {
		return Instructions.userCanInsert(Meteor.userId(), {}) ? "" : "hidden";
	},

	"isEmpty": function() {
		return !this.instructions_with_undertaking_paged || this.instructions_with_undertaking_paged.count() == 0;
	},
	"isNotEmpty": function() {
		return this.instructions_with_undertaking_paged && this.instructions_with_undertaking_paged.count() > 0;
	},
	"isNotFound": function() {
		return this.instructions_with_undertaking_paged && this.instructions_with_undertaking_paged.count() == 0 && Session.get("InstructionsWithUndertakingPagedSearchString");
	},
	"gotPrevPage": function() {
		return !!Session.get("InstructionsWithUndertakingPagedPageNo");
	},
	"gotNextPage": function() {
		return (Session.get("InstructionsWithUndertakingPagedPageNo") || 0) < this.instructions_with_undertaking_paged_page_count - 1;
	},
	"searchString": function() {
		return Session.get("InstructionsWithUndertakingPagedSearchString");
	},
	"viewAsTable": function() {
		return Session.get("HomePrivatePendingInstructionsWithUndertakingsViewStyle") == "table";
	},
	"viewAsBlog": function() {
		return Session.get("HomePrivatePendingInstructionsWithUndertakingsViewStyle") == "blog";
	},
	"viewAsList": function() {
		return Session.get("HomePrivatePendingInstructionsWithUndertakingsViewStyle") == "list";
	},
	"viewAsGallery": function() {
		return Session.get("HomePrivatePendingInstructionsWithUndertakingsViewStyle") == "gallery";
	}

	
});


Template.HomePrivatePendingInstructionsWithUndertakingsViewTable.onCreated(function() {
	
});

Template.HomePrivatePendingInstructionsWithUndertakingsViewTable.onDestroyed(function() {
	
});

Template.HomePrivatePendingInstructionsWithUndertakingsViewTable.onRendered(function() {
	
});

Template.HomePrivatePendingInstructionsWithUndertakingsViewTable.events({
	"click .th-sortable": function(e, t) {
		e.preventDefault();
		var oldSortBy = Session.get("InstructionsWithUndertakingPagedSortBy");
		var newSortBy = $(e.target).attr("data-sort");

		Session.set("InstructionsWithUndertakingPagedSortBy", newSortBy);
		if(oldSortBy == newSortBy) {
			var sortAscending = Session.get("InstructionsWithUndertakingPagedSortAscending");
			if(typeof sortAscending == "undefined") {
				sortAscending = true;
			}
			Session.set("InstructionsWithUndertakingPagedSortAscending", !sortAscending);
		} else {
			Session.set("InstructionsWithUndertakingPagedSortAscending", true);
		}
	}
});

Template.HomePrivatePendingInstructionsWithUndertakingsViewTable.helpers({
});


Template.HomePrivatePendingInstructionsWithUndertakingsViewTableItems.onCreated(function() {
	
});

Template.HomePrivatePendingInstructionsWithUndertakingsViewTableItems.onDestroyed(function() {
	
});

Template.HomePrivatePendingInstructionsWithUndertakingsViewTableItems.onRendered(function() {
	
});

Template.HomePrivatePendingInstructionsWithUndertakingsViewTableItems.events({
	

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

Template.HomePrivatePendingInstructionsWithUndertakingsViewTableItems.helpers({
	

	"checked": function(value) { return value ? "checked" : "" }, 
	"editButtonClass": function() {
		return Instructions.userCanUpdate(Meteor.userId(), this) ? "" : "hidden";
	},

	"deleteButtonClass": function() {
		return Instructions.userCanRemove(Meteor.userId(), this) ? "" : "hidden";
	}
});
