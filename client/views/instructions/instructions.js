Template.Instructions.onCreated(function() {
	
});

Template.Instructions.onDestroyed(function() {
	
});

Template.Instructions.onRendered(function() {
	
	Meteor.defer(function() {
		globalOnRendered();
		$("input[autofocus]").focus();
	});
});

Template.Instructions.events({
	
});

Template.Instructions.helpers({
	
});


var InstructionsViewExport = function(fileType) {
	var extraParams = {
		searchText: Session.get("InstructionsPagedSearchString") || "",
		searchFields: Session.get("InstructionsPagedSearchFields") || ["bank_ref", "date", "lawyerId", "lawyer.name", "borrower", "banking_segment.name", "collateral", "currencies", "transaction_type", "amount", "update_date", "action_pending_with", "date_completed", "is_staff", "early_drawdown", "amount_kes", "amount_usd", "amount_eur", "amount_gbp", "rm", "undertaking_issued", "undertaking_end_date"],
		sortBy: Session.get("InstructionsPagedSortBy") || "",
		sortAscending: Session.get("InstructionsPagedSortAscending") || true
	};

	var exportFields = ["bank_ref", "date", "lawyer.name", "borrower", "banking_segment.name", "collateral", "currencies", "transaction_type", "amount", "update", "update_date", "action_pending_with", "date_completed", "is_staff", "early_drawdown", "amount_kes", "amount_usd", "amount_eur", "amount_gbp", "rm", "undertaking_issued", "undertaking_end_date", "has_delays", "reasons_for_delays"];

	

	Meteor.call("instructionsPagedExport", extraParams, exportFields, fileType, function(e, data) {
		if(e) {
			alert(e);
			return;
		}

		let filename = "export." + fileType;
		downloadLocalResource(data, filename, "application/octet-stream");
	});
};

Template.InstructionsView.onCreated(function() {
	
});

Template.InstructionsView.onDestroyed(function() {
	
});

Template.InstructionsView.onRendered(function() {
	Session.set("InstructionsViewStyle", "table");
	
});

Template.InstructionsView.events({
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
				Session.set("InstructionsPagedSearchString", searchString);
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
					Session.set("InstructionsPagedSearchString", searchString);
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
					Session.set("InstructionsPagedSearchString", "");
				}

			}
			return false;
		}

		return true;
	},

	"click #dataview-insert-button": function(e, t) {
		e.preventDefault();
		Router.go("instructions.insert", mergeObjects(Router.currentRouteParams(), {}));
	},

	"click #dataview-export-default": function(e, t) {
		e.preventDefault();
		InstructionsViewExport.call(this, "csv");
	},

	"click #dataview-export-csv": function(e, t) {
		e.preventDefault();
		InstructionsViewExport.call(this, "csv");
	},

	"click #dataview-export-tsv": function(e, t) {
		e.preventDefault();
		InstructionsViewExport.call(this, "tsv");
	},

	"click #dataview-export-json": function(e, t) {
		e.preventDefault();
		InstructionsViewExport.call(this, "json");
	},

	"click .prev-page-link": function(e, t) {
		e.preventDefault();
		var currentPage = Session.get("InstructionsPagedPageNo") || 0;
		if(currentPage > 0) {
			Session.set("InstructionsPagedPageNo", currentPage - 1);
		}
	},

	"click .next-page-link": function(e, t) {
		e.preventDefault();
		let currentPage = Session.get("InstructionsPagedPageNo") || 0;
		if(currentPage < this.instructions_paged_page_count - 1) {
			Session.set("InstructionsPagedPageNo", currentPage + 1);
		}
	}

	
});

Template.InstructionsView.helpers({

	"insertButtonClass": function() {
		return Instructions.userCanInsert(Meteor.userId(), {}) ? "" : "hidden";
	},

	"isEmpty": function() {
		return !this.instructions_paged || this.instructions_paged.count() == 0;
	},
	"isNotEmpty": function() {
		return this.instructions_paged && this.instructions_paged.count() > 0;
	},
	"isNotFound": function() {
		return this.instructions_paged && this.instructions_paged.count() == 0 && Session.get("InstructionsPagedSearchString");
	},
	"gotPrevPage": function() {
		return !!Session.get("InstructionsPagedPageNo");
	},
	"gotNextPage": function() {
		return (Session.get("InstructionsPagedPageNo") || 0) < this.instructions_paged_page_count - 1;
	},
	"searchString": function() {
		return Session.get("InstructionsPagedSearchString");
	},
	"viewAsTable": function() {
		return Session.get("InstructionsViewStyle") == "table";
	},
	"viewAsBlog": function() {
		return Session.get("InstructionsViewStyle") == "blog";
	},
	"viewAsList": function() {
		return Session.get("InstructionsViewStyle") == "list";
	},
	"viewAsGallery": function() {
		return Session.get("InstructionsViewStyle") == "gallery";
	}

	
});


Template.InstructionsViewTable.onCreated(function() {
	
});

Template.InstructionsViewTable.onDestroyed(function() {
	
});

Template.InstructionsViewTable.onRendered(function() {
	
});

Template.InstructionsViewTable.events({
	"click .th-sortable": function(e, t) {
		e.preventDefault();
		var oldSortBy = Session.get("InstructionsPagedSortBy");
		var newSortBy = $(e.target).attr("data-sort");

		Session.set("InstructionsPagedSortBy", newSortBy);
		if(oldSortBy == newSortBy) {
			var sortAscending = Session.get("InstructionsPagedSortAscending");
			if(typeof sortAscending == "undefined") {
				sortAscending = true;
			}
			Session.set("InstructionsPagedSortAscending", !sortAscending);
		} else {
			Session.set("InstructionsPagedSortAscending", true);
		}
	}
});

Template.InstructionsViewTable.helpers({
});


Template.InstructionsViewTableItems.onCreated(function() {
	
});

Template.InstructionsViewTableItems.onDestroyed(function() {
	
});

Template.InstructionsViewTableItems.onRendered(function() {
	
});

Template.InstructionsViewTableItems.events({
	

	"click td": function(e, t) {
		e.preventDefault();
		var item = this;
		var itemId = item ? item._id : null;

		
		Router.go("instructions.details", mergeObjects(Router.currentRouteParams(), {instructionId: this._id}));
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
		Router.go("instructions.edit", mergeObjects(Router.currentRouteParams(), {instructionId: this._id}));
		return false;
	}
});

Template.InstructionsViewTableItems.helpers({
	

	"checked": function(value) { return value ? "checked" : "" }, 
	"editButtonClass": function() {
		return Instructions.userCanUpdate(Meteor.userId(), this) ? "" : "hidden";
	},

	"deleteButtonClass": function() {
		return Instructions.userCanRemove(Meteor.userId(), this) ? "" : "hidden";
	}
});
