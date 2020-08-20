Template.HomePrivateInstructionsAll.onCreated(function() {
	
});

Template.HomePrivateInstructionsAll.onDestroyed(function() {
	
});

Template.HomePrivateInstructionsAll.onRendered(function() {
	
	Meteor.defer(function() {
		globalOnRendered();
		$("input[autofocus]").focus();
	});
});

Template.HomePrivateInstructionsAll.events({
	
});

Template.HomePrivateInstructionsAll.helpers({
	
});


var HomePrivateInstructionsAllViewExport = function(fileType) {
	var extraParams = {
		searchText: Session.get("InstructionsAllPagedSearchString") || "",
		searchFields: Session.get("InstructionsAllPagedSearchFields") || ["bank_ref", "date", "lawyerId", "lawyer.name", "borrower", "banking_segment.name", "collateral", "currencies", "transaction_type", "amount", "update_date", "action_pending_with", "date_completed", "is_staff", "early_drawdown", "amount_kes", "amount_usd", "amount_eur", "amount_gbp", "rm", "undertaking_issued", "undertaking_end_date"],
		sortBy: Session.get("InstructionsAllPagedSortBy") || "",
		sortAscending: Session.get("InstructionsAllPagedSortAscending") || true
	};

	var exportFields = ["bank_ref", "date", "lawyer.name", "borrower", "banking_segment.name", "collateral", "currencies", "transaction_type", "amount", "update", "update_date", "action_pending_with", "date_completed", "is_staff", "early_drawdown", "amount_kes", "amount_usd", "amount_eur", "amount_gbp", "rm", "undertaking_issued", "undertaking_end_date", "has_delays", "reasons_for_delays"];

	

	Meteor.call("instructionsAllPagedExport", extraParams, exportFields, fileType, function(e, data) {
		if(e) {
			alert(e);
			return;
		}

		let filename = "export." + fileType;
		downloadLocalResource(data, filename, "application/octet-stream");
	});
};

Template.HomePrivateInstructionsAllView.onCreated(function() {
	
});

Template.HomePrivateInstructionsAllView.onDestroyed(function() {
	
});

Template.HomePrivateInstructionsAllView.onRendered(function() {
	Session.set("HomePrivateInstructionsAllViewStyle", "table");
	
});

Template.HomePrivateInstructionsAllView.events({
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
				Session.set("InstructionsAllPagedSearchString", searchString);
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
					Session.set("InstructionsAllPagedSearchString", searchString);
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
					Session.set("InstructionsAllPagedSearchString", "");
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
		HomePrivateInstructionsAllViewExport.call(this, "csv");
	},

	"click #dataview-export-csv": function(e, t) {
		e.preventDefault();
		HomePrivateInstructionsAllViewExport.call(this, "csv");
	},

	"click #dataview-export-tsv": function(e, t) {
		e.preventDefault();
		HomePrivateInstructionsAllViewExport.call(this, "tsv");
	},

	"click #dataview-export-json": function(e, t) {
		e.preventDefault();
		HomePrivateInstructionsAllViewExport.call(this, "json");
	},

	"click .prev-page-link": function(e, t) {
		e.preventDefault();
		var currentPage = Session.get("InstructionsAllPagedPageNo") || 0;
		if(currentPage > 0) {
			Session.set("InstructionsAllPagedPageNo", currentPage - 1);
		}
	},

	"click .next-page-link": function(e, t) {
		e.preventDefault();
		let currentPage = Session.get("InstructionsAllPagedPageNo") || 0;
		if(currentPage < this.instructions_all_paged_page_count - 1) {
			Session.set("InstructionsAllPagedPageNo", currentPage + 1);
		}
	}

	
});

Template.HomePrivateInstructionsAllView.helpers({

	"insertButtonClass": function() {
		return Instructions.userCanInsert(Meteor.userId(), {}) ? "" : "hidden";
	},

	"isEmpty": function() {
		return !this.instructions_all_paged || this.instructions_all_paged.count() == 0;
	},
	"isNotEmpty": function() {
		return this.instructions_all_paged && this.instructions_all_paged.count() > 0;
	},
	"isNotFound": function() {
		return this.instructions_all_paged && this.instructions_all_paged.count() == 0 && Session.get("InstructionsAllPagedSearchString");
	},
	"gotPrevPage": function() {
		return !!Session.get("InstructionsAllPagedPageNo");
	},
	"gotNextPage": function() {
		return (Session.get("InstructionsAllPagedPageNo") || 0) < this.instructions_all_paged_page_count - 1;
	},
	"searchString": function() {
		return Session.get("InstructionsAllPagedSearchString");
	},
	"viewAsTable": function() {
		return Session.get("HomePrivateInstructionsAllViewStyle") == "table";
	},
	"viewAsBlog": function() {
		return Session.get("HomePrivateInstructionsAllViewStyle") == "blog";
	},
	"viewAsList": function() {
		return Session.get("HomePrivateInstructionsAllViewStyle") == "list";
	},
	"viewAsGallery": function() {
		return Session.get("HomePrivateInstructionsAllViewStyle") == "gallery";
	}

	
});


Template.HomePrivateInstructionsAllViewTable.onCreated(function() {
	
});

Template.HomePrivateInstructionsAllViewTable.onDestroyed(function() {
	
});

Template.HomePrivateInstructionsAllViewTable.onRendered(function() {
	
});

Template.HomePrivateInstructionsAllViewTable.events({
	"click .th-sortable": function(e, t) {
		e.preventDefault();
		var oldSortBy = Session.get("InstructionsAllPagedSortBy");
		var newSortBy = $(e.target).attr("data-sort");

		Session.set("InstructionsAllPagedSortBy", newSortBy);
		if(oldSortBy == newSortBy) {
			var sortAscending = Session.get("InstructionsAllPagedSortAscending");
			if(typeof sortAscending == "undefined") {
				sortAscending = true;
			}
			Session.set("InstructionsAllPagedSortAscending", !sortAscending);
		} else {
			Session.set("InstructionsAllPagedSortAscending", true);
		}
	}
});

Template.HomePrivateInstructionsAllViewTable.helpers({
});


Template.HomePrivateInstructionsAllViewTableItems.onCreated(function() {
	
});

Template.HomePrivateInstructionsAllViewTableItems.onDestroyed(function() {
	
});

Template.HomePrivateInstructionsAllViewTableItems.onRendered(function() {
	
});

Template.HomePrivateInstructionsAllViewTableItems.events({
	

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

Template.HomePrivateInstructionsAllViewTableItems.helpers({
	

	"checked": function(value) { return value ? "checked" : "" }, 
	"editButtonClass": function() {
		return Instructions.userCanUpdate(Meteor.userId(), this) ? "" : "hidden";
	},

	"deleteButtonClass": function() {
		return Instructions.userCanRemove(Meteor.userId(), this) ? "" : "hidden";
	}
});
