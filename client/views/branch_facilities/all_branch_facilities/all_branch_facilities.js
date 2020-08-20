Template.BranchFacilitiesAllBranchFacilities.onCreated(function() {
	
});

Template.BranchFacilitiesAllBranchFacilities.onDestroyed(function() {
	
});

Template.BranchFacilitiesAllBranchFacilities.onRendered(function() {
	
	Meteor.defer(function() {
		globalOnRendered();
		$("input[autofocus]").focus();
	});
});

Template.BranchFacilitiesAllBranchFacilities.events({
	
});

Template.BranchFacilitiesAllBranchFacilities.helpers({
	
});


var BranchFacilitiesAllBranchFacilitiesViewExport = function(fileType) {
	var extraParams = {
		searchText: Session.get("AllBranchFacilitiesListPagedSearchString") || "",
		searchFields: Session.get("AllBranchFacilitiesListPagedSearchFields") || ["reference", "borrower", "facility_type", "currency", "amount", "branch.name", "rm", "rm_email", "bm_email"],
		sortBy: Session.get("AllBranchFacilitiesListPagedSortBy") || "",
		sortAscending: Session.get("AllBranchFacilitiesListPagedSortAscending") || true
	};

	var exportFields = ["date", "borrower", "facility_type", "currency", "amount", "branch.name", "loo_received", "date_loo_received", "rm"];

	

	Meteor.call("allBranchFacilitiesListPagedExport", extraParams, exportFields, fileType, function(e, data) {
		if(e) {
			alert(e);
			return;
		}

		let filename = "export." + fileType;
		downloadLocalResource(data, filename, "application/octet-stream");
	});
};

Template.BranchFacilitiesAllBranchFacilitiesView.onCreated(function() {
	
});

Template.BranchFacilitiesAllBranchFacilitiesView.onDestroyed(function() {
	
});

Template.BranchFacilitiesAllBranchFacilitiesView.onRendered(function() {
	Session.set("BranchFacilitiesAllBranchFacilitiesViewStyle", "table");
	
});

Template.BranchFacilitiesAllBranchFacilitiesView.events({
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
				Session.set("AllBranchFacilitiesListPagedSearchString", searchString);
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
					Session.set("AllBranchFacilitiesListPagedSearchString", searchString);
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
					Session.set("AllBranchFacilitiesListPagedSearchString", "");
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
		BranchFacilitiesAllBranchFacilitiesViewExport.call(this, "csv");
	},

	"click #dataview-export-csv": function(e, t) {
		e.preventDefault();
		BranchFacilitiesAllBranchFacilitiesViewExport.call(this, "csv");
	},

	"click #dataview-export-tsv": function(e, t) {
		e.preventDefault();
		BranchFacilitiesAllBranchFacilitiesViewExport.call(this, "tsv");
	},

	"click #dataview-export-json": function(e, t) {
		e.preventDefault();
		BranchFacilitiesAllBranchFacilitiesViewExport.call(this, "json");
	},

	"click .prev-page-link": function(e, t) {
		e.preventDefault();
		var currentPage = Session.get("AllBranchFacilitiesListPagedPageNo") || 0;
		if(currentPage > 0) {
			Session.set("AllBranchFacilitiesListPagedPageNo", currentPage - 1);
		}
	},

	"click .next-page-link": function(e, t) {
		e.preventDefault();
		let currentPage = Session.get("AllBranchFacilitiesListPagedPageNo") || 0;
		if(currentPage < this.all_branch_facilities_list_paged_page_count - 1) {
			Session.set("AllBranchFacilitiesListPagedPageNo", currentPage + 1);
		}
	}

	
});

Template.BranchFacilitiesAllBranchFacilitiesView.helpers({

	"insertButtonClass": function() {
		return BranchFacilities.userCanInsert(Meteor.userId(), {}) ? "" : "hidden";
	},

	"isEmpty": function() {
		return !this.all_branch_facilities_list_paged || this.all_branch_facilities_list_paged.count() == 0;
	},
	"isNotEmpty": function() {
		return this.all_branch_facilities_list_paged && this.all_branch_facilities_list_paged.count() > 0;
	},
	"isNotFound": function() {
		return this.all_branch_facilities_list_paged && this.all_branch_facilities_list_paged.count() == 0 && Session.get("AllBranchFacilitiesListPagedSearchString");
	},
	"gotPrevPage": function() {
		return !!Session.get("AllBranchFacilitiesListPagedPageNo");
	},
	"gotNextPage": function() {
		return (Session.get("AllBranchFacilitiesListPagedPageNo") || 0) < this.all_branch_facilities_list_paged_page_count - 1;
	},
	"searchString": function() {
		return Session.get("AllBranchFacilitiesListPagedSearchString");
	},
	"viewAsTable": function() {
		return Session.get("BranchFacilitiesAllBranchFacilitiesViewStyle") == "table";
	},
	"viewAsBlog": function() {
		return Session.get("BranchFacilitiesAllBranchFacilitiesViewStyle") == "blog";
	},
	"viewAsList": function() {
		return Session.get("BranchFacilitiesAllBranchFacilitiesViewStyle") == "list";
	},
	"viewAsGallery": function() {
		return Session.get("BranchFacilitiesAllBranchFacilitiesViewStyle") == "gallery";
	}

	
});


Template.BranchFacilitiesAllBranchFacilitiesViewTable.onCreated(function() {
	
});

Template.BranchFacilitiesAllBranchFacilitiesViewTable.onDestroyed(function() {
	
});

Template.BranchFacilitiesAllBranchFacilitiesViewTable.onRendered(function() {
	
});

Template.BranchFacilitiesAllBranchFacilitiesViewTable.events({
	"click .th-sortable": function(e, t) {
		e.preventDefault();
		var oldSortBy = Session.get("AllBranchFacilitiesListPagedSortBy");
		var newSortBy = $(e.target).attr("data-sort");

		Session.set("AllBranchFacilitiesListPagedSortBy", newSortBy);
		if(oldSortBy == newSortBy) {
			var sortAscending = Session.get("AllBranchFacilitiesListPagedSortAscending");
			if(typeof sortAscending == "undefined") {
				sortAscending = true;
			}
			Session.set("AllBranchFacilitiesListPagedSortAscending", !sortAscending);
		} else {
			Session.set("AllBranchFacilitiesListPagedSortAscending", true);
		}
	}
});

Template.BranchFacilitiesAllBranchFacilitiesViewTable.helpers({
});


Template.BranchFacilitiesAllBranchFacilitiesViewTableItems.onCreated(function() {
	
});

Template.BranchFacilitiesAllBranchFacilitiesViewTableItems.onDestroyed(function() {
	
});

Template.BranchFacilitiesAllBranchFacilitiesViewTableItems.onRendered(function() {
	
});

Template.BranchFacilitiesAllBranchFacilitiesViewTableItems.events({
	

	"click td": function(e, t) {
		e.preventDefault();
		var item = this;
		var itemId = item ? item._id : null;

		
		Router.go("branch_facilities.all_branch_facilities.details", mergeObjects(Router.currentRouteParams(), {allBranchFacilitiesId: this._id}));
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
		/**/
		return false;
	}
});

Template.BranchFacilitiesAllBranchFacilitiesViewTableItems.helpers({
	

	"checked": function(value) { return value ? "checked" : "" }, 
	"editButtonClass": function() {
		return BranchFacilities.userCanUpdate(Meteor.userId(), this) ? "" : "hidden";
	},

	"deleteButtonClass": function() {
		return BranchFacilities.userCanRemove(Meteor.userId(), this) ? "" : "hidden";
	}
});
