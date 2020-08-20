Template.BranchFacilitiesLooPending.onCreated(function() {
	
});

Template.BranchFacilitiesLooPending.onDestroyed(function() {
	
});

Template.BranchFacilitiesLooPending.onRendered(function() {
	
	Meteor.defer(function() {
		globalOnRendered();
		$("input[autofocus]").focus();
	});
});

Template.BranchFacilitiesLooPending.events({
	
});

Template.BranchFacilitiesLooPending.helpers({
	
});


var BranchFacilitiesLooPendingViewExport = function(fileType) {
	var extraParams = {
		searchText: Session.get("LooPendingList1PagedSearchString") || "",
		searchFields: Session.get("LooPendingList1PagedSearchFields") || ["reference", "borrower", "facility_type", "currency", "amount", "branch.name", "rm", "rm_email", "bm_email"],
		sortBy: Session.get("LooPendingList1PagedSortBy") || "",
		sortAscending: Session.get("LooPendingList1PagedSortAscending") || true
	};

	var exportFields = ["date", "borrower", "facility_type", "currency", "amount", "branch.name", "loo_received", "date_loo_received", "rm"];

	

	Meteor.call("looPendingList1PagedExport", extraParams, exportFields, fileType, function(e, data) {
		if(e) {
			alert(e);
			return;
		}

		let filename = "export." + fileType;
		downloadLocalResource(data, filename, "application/octet-stream");
	});
};

Template.BranchFacilitiesLooPendingView.onCreated(function() {
	
});

Template.BranchFacilitiesLooPendingView.onDestroyed(function() {
	
});

Template.BranchFacilitiesLooPendingView.onRendered(function() {
	Session.set("BranchFacilitiesLooPendingViewStyle", "table");
	
});

Template.BranchFacilitiesLooPendingView.events({
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
				Session.set("LooPendingList1PagedSearchString", searchString);
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
					Session.set("LooPendingList1PagedSearchString", searchString);
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
					Session.set("LooPendingList1PagedSearchString", "");
				}

			}
			return false;
		}

		return true;
	},

	"click #dataview-insert-button": function(e, t) {
		e.preventDefault();
		Router.go("branch_facilities.loo_pending.insert", mergeObjects(Router.currentRouteParams(), {}));
	},

	"click #dataview-export-default": function(e, t) {
		e.preventDefault();
		BranchFacilitiesLooPendingViewExport.call(this, "csv");
	},

	"click #dataview-export-csv": function(e, t) {
		e.preventDefault();
		BranchFacilitiesLooPendingViewExport.call(this, "csv");
	},

	"click #dataview-export-tsv": function(e, t) {
		e.preventDefault();
		BranchFacilitiesLooPendingViewExport.call(this, "tsv");
	},

	"click #dataview-export-json": function(e, t) {
		e.preventDefault();
		BranchFacilitiesLooPendingViewExport.call(this, "json");
	},

	"click .prev-page-link": function(e, t) {
		e.preventDefault();
		var currentPage = Session.get("LooPendingList1PagedPageNo") || 0;
		if(currentPage > 0) {
			Session.set("LooPendingList1PagedPageNo", currentPage - 1);
		}
	},

	"click .next-page-link": function(e, t) {
		e.preventDefault();
		let currentPage = Session.get("LooPendingList1PagedPageNo") || 0;
		if(currentPage < this.loo_pending_list1paged_page_count - 1) {
			Session.set("LooPendingList1PagedPageNo", currentPage + 1);
		}
	}

	
});

Template.BranchFacilitiesLooPendingView.helpers({

	"insertButtonClass": function() {
		return BranchFacilities.userCanInsert(Meteor.userId(), {}) ? "" : "hidden";
	},

	"isEmpty": function() {
		return !this.loo_pending_list1_paged || this.loo_pending_list1_paged.count() == 0;
	},
	"isNotEmpty": function() {
		return this.loo_pending_list1_paged && this.loo_pending_list1_paged.count() > 0;
	},
	"isNotFound": function() {
		return this.loo_pending_list1_paged && this.loo_pending_list1_paged.count() == 0 && Session.get("LooPendingList1PagedSearchString");
	},
	"gotPrevPage": function() {
		return !!Session.get("LooPendingList1PagedPageNo");
	},
	"gotNextPage": function() {
		return (Session.get("LooPendingList1PagedPageNo") || 0) < this.loo_pending_list1paged_page_count - 1;
	},
	"searchString": function() {
		return Session.get("LooPendingList1PagedSearchString");
	},
	"viewAsTable": function() {
		return Session.get("BranchFacilitiesLooPendingViewStyle") == "table";
	},
	"viewAsBlog": function() {
		return Session.get("BranchFacilitiesLooPendingViewStyle") == "blog";
	},
	"viewAsList": function() {
		return Session.get("BranchFacilitiesLooPendingViewStyle") == "list";
	},
	"viewAsGallery": function() {
		return Session.get("BranchFacilitiesLooPendingViewStyle") == "gallery";
	}

	
});


Template.BranchFacilitiesLooPendingViewTable.onCreated(function() {
	
});

Template.BranchFacilitiesLooPendingViewTable.onDestroyed(function() {
	
});

Template.BranchFacilitiesLooPendingViewTable.onRendered(function() {
	
});

Template.BranchFacilitiesLooPendingViewTable.events({
	"click .th-sortable": function(e, t) {
		e.preventDefault();
		var oldSortBy = Session.get("LooPendingList1PagedSortBy");
		var newSortBy = $(e.target).attr("data-sort");

		Session.set("LooPendingList1PagedSortBy", newSortBy);
		if(oldSortBy == newSortBy) {
			var sortAscending = Session.get("LooPendingList1PagedSortAscending");
			if(typeof sortAscending == "undefined") {
				sortAscending = true;
			}
			Session.set("LooPendingList1PagedSortAscending", !sortAscending);
		} else {
			Session.set("LooPendingList1PagedSortAscending", true);
		}
	}
});

Template.BranchFacilitiesLooPendingViewTable.helpers({
});


Template.BranchFacilitiesLooPendingViewTableItems.onCreated(function() {
	
});

Template.BranchFacilitiesLooPendingViewTableItems.onDestroyed(function() {
	
});

Template.BranchFacilitiesLooPendingViewTableItems.onRendered(function() {
	
});

Template.BranchFacilitiesLooPendingViewTableItems.events({
	

	"click td": function(e, t) {
		e.preventDefault();
		var item = this;
		var itemId = item ? item._id : null;

		
		Router.go("branch_facilities.loo_pending.details", mergeObjects(Router.currentRouteParams(), {looPendingId: this._id}));
		return false;
	},

	"click .inline-checkbox": function(e, t) {
		e.preventDefault();

		if(!this || !this._id) return false;

		var fieldName = $(e.currentTarget).attr("data-field");
		if(!fieldName) return false;

		var values = {};
		values[fieldName] = !this[fieldName];

		Meteor.call("branchFacilitiesUpdate", this._id, values, function(err, res) {
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
						Meteor.call("branchFacilitiesRemove", me._id, function(err, res) {
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
		Router.go("branch_facilities.loo_pending.update", mergeObjects(Router.currentRouteParams(), {looPendingId: this._id}));
		return false;
	}
});

Template.BranchFacilitiesLooPendingViewTableItems.helpers({
	

	"checked": function(value) { return value ? "checked" : "" }, 
	"editButtonClass": function() {
		return BranchFacilities.userCanUpdate(Meteor.userId(), this) ? "" : "hidden";
	},

	"deleteButtonClass": function() {
		return BranchFacilities.userCanRemove(Meteor.userId(), this) ? "" : "hidden";
	}
});
