Template.LawyerInstructionsLawyerInstructionsPending.onCreated(function() {
	
});

Template.LawyerInstructionsLawyerInstructionsPending.onDestroyed(function() {
	
});

Template.LawyerInstructionsLawyerInstructionsPending.onRendered(function() {
	
	Meteor.defer(function() {
		globalOnRendered();
		$("input[autofocus]").focus();
	});
});

Template.LawyerInstructionsLawyerInstructionsPending.events({
	
});

Template.LawyerInstructionsLawyerInstructionsPending.helpers({
	
});


var LawyerInstructionsLawyerInstructionsPendingViewExport = function(fileType) {
	var extraParams = {
		searchText: Session.get("LawyerInstructionsPendingListPagedSearchString") || "",
		searchFields: Session.get("LawyerInstructionsPendingListPagedSearchFields") || ["bank_ref", "date", "lawyerId", "lawyer.name", "borrower", "banking_segment.name", "collateral", "currencies", "transaction_type", "amount", "update_date", "action_pending_with", "date_completed", "is_staff", "early_drawdown", "amount_kes", "amount_usd", "amount_eur", "amount_gbp", "rm", "undertaking_issued", "undertaking_end_date"],
		sortBy: Session.get("LawyerInstructionsPendingListPagedSortBy") || "",
		sortAscending: Session.get("LawyerInstructionsPendingListPagedSortAscending") || true
	};

	var exportFields = ["bank_ref", "date", "lawyer.name", "borrower", "banking_segment.name", "collateral", "currencies", "transaction_type", "amount", "update", "update_date", "action_pending_with", "date_completed", "is_staff", "early_drawdown", "amount_kes", "amount_usd", "amount_eur", "amount_gbp", "rm", "undertaking_issued", "undertaking_end_date", "has_delays", "reasons_for_delays"];

	

	Meteor.call("lawyerInstructionsPendingListPagedExport", extraParams, exportFields, fileType, function(e, data) {
		if(e) {
			alert(e);
			return;
		}

		let filename = "export." + fileType;
		downloadLocalResource(data, filename, "application/octet-stream");
	});
};

Template.LawyerInstructionsLawyerInstructionsPendingView.onCreated(function() {
	
});

Template.LawyerInstructionsLawyerInstructionsPendingView.onDestroyed(function() {
	
});

Template.LawyerInstructionsLawyerInstructionsPendingView.onRendered(function() {
	Session.set("LawyerInstructionsLawyerInstructionsPendingViewStyle", "table");
	
});

Template.LawyerInstructionsLawyerInstructionsPendingView.events({
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
				Session.set("LawyerInstructionsPendingListPagedSearchString", searchString);
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
					Session.set("LawyerInstructionsPendingListPagedSearchString", searchString);
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
					Session.set("LawyerInstructionsPendingListPagedSearchString", "");
				}

			}
			return false;
		}

		return true;
	},

	"click #dataview-insert-button": function(e, t) {
		e.preventDefault();
		Router.go("lawyer_instructions.lawyer_instructions_pending.insert", mergeObjects(Router.currentRouteParams(), {}));
	},

	"click #dataview-export-default": function(e, t) {
		e.preventDefault();
		LawyerInstructionsLawyerInstructionsPendingViewExport.call(this, "csv");
	},

	"click #dataview-export-csv": function(e, t) {
		e.preventDefault();
		LawyerInstructionsLawyerInstructionsPendingViewExport.call(this, "csv");
	},

	"click #dataview-export-tsv": function(e, t) {
		e.preventDefault();
		LawyerInstructionsLawyerInstructionsPendingViewExport.call(this, "tsv");
	},

	"click #dataview-export-json": function(e, t) {
		e.preventDefault();
		LawyerInstructionsLawyerInstructionsPendingViewExport.call(this, "json");
	},

	"click .prev-page-link": function(e, t) {
		e.preventDefault();
		var currentPage = Session.get("LawyerInstructionsPendingListPagedPageNo") || 0;
		if(currentPage > 0) {
			Session.set("LawyerInstructionsPendingListPagedPageNo", currentPage - 1);
		}
	},

	"click .next-page-link": function(e, t) {
		e.preventDefault();
		let currentPage = Session.get("LawyerInstructionsPendingListPagedPageNo") || 0;
		if(currentPage < this.lawyer_instructions_pending_list_paged_page_count - 1) {
			Session.set("LawyerInstructionsPendingListPagedPageNo", currentPage + 1);
		}
	}

	
});

Template.LawyerInstructionsLawyerInstructionsPendingView.helpers({

	"insertButtonClass": function() {
		return Instructions.userCanInsert(Meteor.userId(), {}) ? "" : "hidden";
	},

	"isEmpty": function() {
		return !this.lawyer_instructions_pending_list_paged || this.lawyer_instructions_pending_list_paged.count() == 0;
	},
	"isNotEmpty": function() {
		return this.lawyer_instructions_pending_list_paged && this.lawyer_instructions_pending_list_paged.count() > 0;
	},
	"isNotFound": function() {
		return this.lawyer_instructions_pending_list_paged && this.lawyer_instructions_pending_list_paged.count() == 0 && Session.get("LawyerInstructionsPendingListPagedSearchString");
	},
	"gotPrevPage": function() {
		return !!Session.get("LawyerInstructionsPendingListPagedPageNo");
	},
	"gotNextPage": function() {
		return (Session.get("LawyerInstructionsPendingListPagedPageNo") || 0) < this.lawyer_instructions_pending_list_paged_page_count - 1;
	},
	"searchString": function() {
		return Session.get("LawyerInstructionsPendingListPagedSearchString");
	},
	"viewAsTable": function() {
		return Session.get("LawyerInstructionsLawyerInstructionsPendingViewStyle") == "table";
	},
	"viewAsBlog": function() {
		return Session.get("LawyerInstructionsLawyerInstructionsPendingViewStyle") == "blog";
	},
	"viewAsList": function() {
		return Session.get("LawyerInstructionsLawyerInstructionsPendingViewStyle") == "list";
	},
	"viewAsGallery": function() {
		return Session.get("LawyerInstructionsLawyerInstructionsPendingViewStyle") == "gallery";
	}

	
});


Template.LawyerInstructionsLawyerInstructionsPendingViewTable.onCreated(function() {
	
});

Template.LawyerInstructionsLawyerInstructionsPendingViewTable.onDestroyed(function() {
	
});

Template.LawyerInstructionsLawyerInstructionsPendingViewTable.onRendered(function() {
	
});

Template.LawyerInstructionsLawyerInstructionsPendingViewTable.events({
	"click .th-sortable": function(e, t) {
		e.preventDefault();
		var oldSortBy = Session.get("LawyerInstructionsPendingListPagedSortBy");
		var newSortBy = $(e.target).attr("data-sort");

		Session.set("LawyerInstructionsPendingListPagedSortBy", newSortBy);
		if(oldSortBy == newSortBy) {
			var sortAscending = Session.get("LawyerInstructionsPendingListPagedSortAscending");
			if(typeof sortAscending == "undefined") {
				sortAscending = true;
			}
			Session.set("LawyerInstructionsPendingListPagedSortAscending", !sortAscending);
		} else {
			Session.set("LawyerInstructionsPendingListPagedSortAscending", true);
		}
	}
});

Template.LawyerInstructionsLawyerInstructionsPendingViewTable.helpers({
});


Template.LawyerInstructionsLawyerInstructionsPendingViewTableItems.onCreated(function() {
	
});

Template.LawyerInstructionsLawyerInstructionsPendingViewTableItems.onDestroyed(function() {
	
});

Template.LawyerInstructionsLawyerInstructionsPendingViewTableItems.onRendered(function() {
	
});

Template.LawyerInstructionsLawyerInstructionsPendingViewTableItems.events({
	

	"click td": function(e, t) {
		e.preventDefault();
		var item = this;
		var itemId = item ? item._id : null;

		
		Router.go("lawyer_instructions.lawyer_instructions_pending.details", mergeObjects(Router.currentRouteParams(), {lawyerInstructionsPendingId: this._id}));
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
		Router.go("lawyer_instructions.lawyer_instructions_pending.update", mergeObjects(Router.currentRouteParams(), {lawyerInstructionsPendingId: this._id}));
		return false;
	}
});

Template.LawyerInstructionsLawyerInstructionsPendingViewTableItems.helpers({
	

	"checked": function(value) { return value ? "checked" : "" }, 
	"editButtonClass": function() {
		return Instructions.userCanUpdate(Meteor.userId(), this) ? "" : "hidden";
	},

	"deleteButtonClass": function() {
		return Instructions.userCanRemove(Meteor.userId(), this) ? "" : "hidden";
	}
});
