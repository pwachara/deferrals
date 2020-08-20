Template.Branches.onCreated(function() {
	
});

Template.Branches.onDestroyed(function() {
	
});

Template.Branches.onRendered(function() {
	
	Meteor.defer(function() {
		globalOnRendered();
		$("input[autofocus]").focus();
	});
});

Template.Branches.events({
	
});

Template.Branches.helpers({
	
});


var BranchesViewExport = function(fileType) {
	var extraParams = {
		searchText: Session.get("BranchListPagedSearchString") || "",
		searchFields: Session.get("BranchListPagedSearchFields") || ["name"],
		sortBy: Session.get("BranchListPagedSortBy") || "",
		sortAscending: Session.get("BranchListPagedSortAscending") || true
	};

	var exportFields = ["name"];

	

	Meteor.call("branchListPagedExport", extraParams, exportFields, fileType, function(e, data) {
		if(e) {
			alert(e);
			return;
		}

		let filename = "export." + fileType;
		downloadLocalResource(data, filename, "application/octet-stream");
	});
};

Template.BranchesView.onCreated(function() {
	
});

Template.BranchesView.onDestroyed(function() {
	
});

Template.BranchesView.onRendered(function() {
	Session.set("BranchesViewStyle", "table");
	
});

Template.BranchesView.events({
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
				Session.set("BranchListPagedSearchString", searchString);
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
					Session.set("BranchListPagedSearchString", searchString);
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
					Session.set("BranchListPagedSearchString", "");
				}

			}
			return false;
		}

		return true;
	},

	"click #dataview-insert-button": function(e, t) {
		e.preventDefault();
		Router.go("branches.insert", mergeObjects(Router.currentRouteParams(), {}));
	},

	"click #dataview-export-default": function(e, t) {
		e.preventDefault();
		BranchesViewExport.call(this, "csv");
	},

	"click #dataview-export-csv": function(e, t) {
		e.preventDefault();
		BranchesViewExport.call(this, "csv");
	},

	"click #dataview-export-tsv": function(e, t) {
		e.preventDefault();
		BranchesViewExport.call(this, "tsv");
	},

	"click #dataview-export-json": function(e, t) {
		e.preventDefault();
		BranchesViewExport.call(this, "json");
	},

	"click .prev-page-link": function(e, t) {
		e.preventDefault();
		var currentPage = Session.get("BranchListPagedPageNo") || 0;
		if(currentPage > 0) {
			Session.set("BranchListPagedPageNo", currentPage - 1);
		}
	},

	"click .next-page-link": function(e, t) {
		e.preventDefault();
		let currentPage = Session.get("BranchListPagedPageNo") || 0;
		if(currentPage < this.branch_list_paged_page_count - 1) {
			Session.set("BranchListPagedPageNo", currentPage + 1);
		}
	}

	
});

Template.BranchesView.helpers({

	"insertButtonClass": function() {
		return Branches.userCanInsert(Meteor.userId(), {}) ? "" : "hidden";
	},

	"isEmpty": function() {
		return !this.branch_list_paged || this.branch_list_paged.count() == 0;
	},
	"isNotEmpty": function() {
		return this.branch_list_paged && this.branch_list_paged.count() > 0;
	},
	"isNotFound": function() {
		return this.branch_list_paged && this.branch_list_paged.count() == 0 && Session.get("BranchListPagedSearchString");
	},
	"gotPrevPage": function() {
		return !!Session.get("BranchListPagedPageNo");
	},
	"gotNextPage": function() {
		return (Session.get("BranchListPagedPageNo") || 0) < this.branch_list_paged_page_count - 1;
	},
	"searchString": function() {
		return Session.get("BranchListPagedSearchString");
	},
	"viewAsTable": function() {
		return Session.get("BranchesViewStyle") == "table";
	},
	"viewAsBlog": function() {
		return Session.get("BranchesViewStyle") == "blog";
	},
	"viewAsList": function() {
		return Session.get("BranchesViewStyle") == "list";
	},
	"viewAsGallery": function() {
		return Session.get("BranchesViewStyle") == "gallery";
	}

	
});


Template.BranchesViewTable.onCreated(function() {
	
});

Template.BranchesViewTable.onDestroyed(function() {
	
});

Template.BranchesViewTable.onRendered(function() {
	
});

Template.BranchesViewTable.events({
	"click .th-sortable": function(e, t) {
		e.preventDefault();
		var oldSortBy = Session.get("BranchListPagedSortBy");
		var newSortBy = $(e.target).attr("data-sort");

		Session.set("BranchListPagedSortBy", newSortBy);
		if(oldSortBy == newSortBy) {
			var sortAscending = Session.get("BranchListPagedSortAscending");
			if(typeof sortAscending == "undefined") {
				sortAscending = true;
			}
			Session.set("BranchListPagedSortAscending", !sortAscending);
		} else {
			Session.set("BranchListPagedSortAscending", true);
		}
	}
});

Template.BranchesViewTable.helpers({
});


Template.BranchesViewTableItems.onCreated(function() {
	
});

Template.BranchesViewTableItems.onDestroyed(function() {
	
});

Template.BranchesViewTableItems.onRendered(function() {
	
});

Template.BranchesViewTableItems.events({
	

	"click td": function(e, t) {
		e.preventDefault();
		var item = this;
		var itemId = item ? item._id : null;

		
		Router.go("branches.details", mergeObjects(Router.currentRouteParams(), {branchId: this._id}));
		return false;
	},

	"click .inline-checkbox": function(e, t) {
		e.preventDefault();

		if(!this || !this._id) return false;

		var fieldName = $(e.currentTarget).attr("data-field");
		if(!fieldName) return false;

		var values = {};
		values[fieldName] = !this[fieldName];

		Meteor.call("branchesUpdate", this._id, values, function(err, res) {
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
						Meteor.call("branchesRemove", me._id, function(err, res) {
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
		Router.go("branches.update", mergeObjects(Router.currentRouteParams(), {branchId: this._id}));
		return false;
	}
});

Template.BranchesViewTableItems.helpers({
	

	"checked": function(value) { return value ? "checked" : "" }, 
	"editButtonClass": function() {
		return Branches.userCanUpdate(Meteor.userId(), this) ? "" : "hidden";
	},

	"deleteButtonClass": function() {
		return Branches.userCanRemove(Meteor.userId(), this) ? "" : "hidden";
	}
});
