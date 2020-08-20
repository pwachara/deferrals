Template.LawyerInstructionsLawyerInstructionsClosed.onCreated(function() {
	
});

Template.LawyerInstructionsLawyerInstructionsClosed.onDestroyed(function() {
	
});

Template.LawyerInstructionsLawyerInstructionsClosed.onRendered(function() {
	
	Meteor.defer(function() {
		globalOnRendered();
		$("input[autofocus]").focus();
	});
});

Template.LawyerInstructionsLawyerInstructionsClosed.events({
	
});

Template.LawyerInstructionsLawyerInstructionsClosed.helpers({
	
});


var LawyerInstructionsLawyerInstructionsClosedViewExport = function(fileType) {
	var extraParams = {
		searchText: Session.get("LawyerInstructionsClosedListPagedSearchString") || "",
		searchFields: Session.get("LawyerInstructionsClosedListPagedSearchFields") || ["bank_ref", "date", "lawyerId", "lawyer.name", "borrower", "banking_segment.name", "collateral", "currencies", "transaction_type", "amount", "update_date", "action_pending_with", "date_completed", "is_staff", "early_drawdown", "amount_kes", "amount_usd", "amount_eur", "amount_gbp", "rm", "undertaking_issued", "undertaking_end_date"],
		sortBy: Session.get("LawyerInstructionsClosedListPagedSortBy") || "",
		sortAscending: Session.get("LawyerInstructionsClosedListPagedSortAscending") || true
	};

	var exportFields = ["bank_ref", "date", "lawyer.name", "borrower", "banking_segment.name", "collateral", "currencies", "transaction_type", "amount", "update", "update_date", "action_pending_with", "date_completed", "is_staff", "early_drawdown", "amount_kes", "amount_usd", "amount_eur", "amount_gbp", "rm", "undertaking_issued", "undertaking_end_date", "has_delays", "reasons_for_delays"];

	

	Meteor.call("lawyerInstructionsClosedListPagedExport", extraParams, exportFields, fileType, function(e, data) {
		if(e) {
			alert(e);
			return;
		}

		let filename = "export." + fileType;
		downloadLocalResource(data, filename, "application/octet-stream");
	});
};

Template.LawyerInstructionsLawyerInstructionsClosedView.onCreated(function() {
	
});

Template.LawyerInstructionsLawyerInstructionsClosedView.onDestroyed(function() {
	
});

Template.LawyerInstructionsLawyerInstructionsClosedView.onRendered(function() {
	Session.set("LawyerInstructionsLawyerInstructionsClosedViewStyle", "table");
	
});

Template.LawyerInstructionsLawyerInstructionsClosedView.events({
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
				Session.set("LawyerInstructionsClosedListPagedSearchString", searchString);
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
					Session.set("LawyerInstructionsClosedListPagedSearchString", searchString);
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
					Session.set("LawyerInstructionsClosedListPagedSearchString", "");
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
		LawyerInstructionsLawyerInstructionsClosedViewExport.call(this, "csv");
	},

	"click #dataview-export-csv": function(e, t) {
		e.preventDefault();
		LawyerInstructionsLawyerInstructionsClosedViewExport.call(this, "csv");
	},

	"click #dataview-export-tsv": function(e, t) {
		e.preventDefault();
		LawyerInstructionsLawyerInstructionsClosedViewExport.call(this, "tsv");
	},

	"click #dataview-export-json": function(e, t) {
		e.preventDefault();
		LawyerInstructionsLawyerInstructionsClosedViewExport.call(this, "json");
	},

	"click .prev-page-link": function(e, t) {
		e.preventDefault();
		var currentPage = Session.get("LawyerInstructionsClosedListPagedPageNo") || 0;
		if(currentPage > 0) {
			Session.set("LawyerInstructionsClosedListPagedPageNo", currentPage - 1);
		}
	},

	"click .next-page-link": function(e, t) {
		e.preventDefault();
		let currentPage = Session.get("LawyerInstructionsClosedListPagedPageNo") || 0;
		if(currentPage < this.lawyer_instructions_closed_list_paged_page_count - 1) {
			Session.set("LawyerInstructionsClosedListPagedPageNo", currentPage + 1);
		}
	}

	
});

Template.LawyerInstructionsLawyerInstructionsClosedView.helpers({

	"insertButtonClass": function() {
		return Instructions.userCanInsert(Meteor.userId(), {}) ? "" : "hidden";
	},

	"isEmpty": function() {
		return !this.lawyer_instructions_closed_list_paged || this.lawyer_instructions_closed_list_paged.count() == 0;
	},
	"isNotEmpty": function() {
		return this.lawyer_instructions_closed_list_paged && this.lawyer_instructions_closed_list_paged.count() > 0;
	},
	"isNotFound": function() {
		return this.lawyer_instructions_closed_list_paged && this.lawyer_instructions_closed_list_paged.count() == 0 && Session.get("LawyerInstructionsClosedListPagedSearchString");
	},
	"gotPrevPage": function() {
		return !!Session.get("LawyerInstructionsClosedListPagedPageNo");
	},
	"gotNextPage": function() {
		return (Session.get("LawyerInstructionsClosedListPagedPageNo") || 0) < this.lawyer_instructions_closed_list_paged_page_count - 1;
	},
	"searchString": function() {
		return Session.get("LawyerInstructionsClosedListPagedSearchString");
	},
	"viewAsTable": function() {
		return Session.get("LawyerInstructionsLawyerInstructionsClosedViewStyle") == "table";
	},
	"viewAsBlog": function() {
		return Session.get("LawyerInstructionsLawyerInstructionsClosedViewStyle") == "blog";
	},
	"viewAsList": function() {
		return Session.get("LawyerInstructionsLawyerInstructionsClosedViewStyle") == "list";
	},
	"viewAsGallery": function() {
		return Session.get("LawyerInstructionsLawyerInstructionsClosedViewStyle") == "gallery";
	}

	
});


Template.LawyerInstructionsLawyerInstructionsClosedViewTable.onCreated(function() {
	
});

Template.LawyerInstructionsLawyerInstructionsClosedViewTable.onDestroyed(function() {
	
});

Template.LawyerInstructionsLawyerInstructionsClosedViewTable.onRendered(function() {
	
});

Template.LawyerInstructionsLawyerInstructionsClosedViewTable.events({
	"click .th-sortable": function(e, t) {
		e.preventDefault();
		var oldSortBy = Session.get("LawyerInstructionsClosedListPagedSortBy");
		var newSortBy = $(e.target).attr("data-sort");

		Session.set("LawyerInstructionsClosedListPagedSortBy", newSortBy);
		if(oldSortBy == newSortBy) {
			var sortAscending = Session.get("LawyerInstructionsClosedListPagedSortAscending");
			if(typeof sortAscending == "undefined") {
				sortAscending = true;
			}
			Session.set("LawyerInstructionsClosedListPagedSortAscending", !sortAscending);
		} else {
			Session.set("LawyerInstructionsClosedListPagedSortAscending", true);
		}
	}
});

Template.LawyerInstructionsLawyerInstructionsClosedViewTable.helpers({
});


Template.LawyerInstructionsLawyerInstructionsClosedViewTableItems.onCreated(function() {
	
});

Template.LawyerInstructionsLawyerInstructionsClosedViewTableItems.onDestroyed(function() {
	
});

Template.LawyerInstructionsLawyerInstructionsClosedViewTableItems.onRendered(function() {
	
});

Template.LawyerInstructionsLawyerInstructionsClosedViewTableItems.events({
	

	"click td": function(e, t) {
		e.preventDefault();
		var item = this;
		var itemId = item ? item._id : null;

		
		Router.go("lawyer_instructions.lawyer_instructions_closed.details", mergeObjects(Router.currentRouteParams(), {lawyerInstructionsClosedId: this._id}));
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
		Router.go("lawyer_instructions.lawyer_instructions_closed.update", mergeObjects(Router.currentRouteParams(), {lawyerInstructionsClosedId: this._id}));
		return false;
	}
});

Template.LawyerInstructionsLawyerInstructionsClosedViewTableItems.helpers({
	

	"checked": function(value) { return value ? "checked" : "" }, 
	"editButtonClass": function() {
		return Instructions.userCanUpdate(Meteor.userId(), this) ? "" : "hidden";
	},

	"deleteButtonClass": function() {
		return Instructions.userCanRemove(Meteor.userId(), this) ? "" : "hidden";
	}
});
