Template.BranchFacilitiesLooReceived.onCreated(function() {
	
});

Template.BranchFacilitiesLooReceived.onDestroyed(function() {
	
});

Template.BranchFacilitiesLooReceived.onRendered(function() {
	
	Meteor.defer(function() {
		globalOnRendered();
		$("input[autofocus]").focus();
	});
});

Template.BranchFacilitiesLooReceived.events({
	
});

Template.BranchFacilitiesLooReceived.helpers({
	
});


var BranchFacilitiesLooReceivedViewExport = function(fileType) {
	var extraParams = {
		searchText: Session.get("LooReceivedListPagedSearchString") || "",
		searchFields: Session.get("LooReceivedListPagedSearchFields") || ["reference", "borrower", "facility_type", "currency", "amount", "branch.name", "rm", "rm_email", "bm_email"],
		sortBy: Session.get("LooReceivedListPagedSortBy") || "",
		sortAscending: Session.get("LooReceivedListPagedSortAscending") || true
	};

	var exportFields = ["date", "borrower", "facility_type", "currency", "amount", "branch.name", "loo_received", "date_loo_received", "rm"];

	

	Meteor.call("looReceivedListPagedExport", extraParams, exportFields, fileType, function(e, data) {
		if(e) {
			alert(e);
			return;
		}

		let filename = "export." + fileType;
		downloadLocalResource(data, filename, "application/octet-stream");
	});
};

Template.BranchFacilitiesLooReceivedView.onCreated(function() {
	
});

Template.BranchFacilitiesLooReceivedView.onDestroyed(function() {
	
});

Template.BranchFacilitiesLooReceivedView.onRendered(function() {
	Session.set("BranchFacilitiesLooReceivedViewStyle", "table");
	
});

Template.BranchFacilitiesLooReceivedView.events({
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
				Session.set("LooReceivedListPagedSearchString", searchString);
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
					Session.set("LooReceivedListPagedSearchString", searchString);
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
					Session.set("LooReceivedListPagedSearchString", "");
				}

			}
			return false;
		}

		return true;
	},

	"click #dataview-insert-button": function(e, t) {
		e.preventDefault();
		Router.go("branch_facilities.loo_received.insert", mergeObjects(Router.currentRouteParams(), {}));
	},

	"click #dataview-export-default": function(e, t) {
		e.preventDefault();
		BranchFacilitiesLooReceivedViewExport.call(this, "csv");
	},

	"click #dataview-export-csv": function(e, t) {
		e.preventDefault();
		BranchFacilitiesLooReceivedViewExport.call(this, "csv");
	},

	"click #dataview-export-tsv": function(e, t) {
		e.preventDefault();
		BranchFacilitiesLooReceivedViewExport.call(this, "tsv");
	},

	"click #dataview-export-json": function(e, t) {
		e.preventDefault();
		BranchFacilitiesLooReceivedViewExport.call(this, "json");
	},

	"click .prev-page-link": function(e, t) {
		e.preventDefault();
		var currentPage = Session.get("LooReceivedListPagedPageNo") || 0;
		if(currentPage > 0) {
			Session.set("LooReceivedListPagedPageNo", currentPage - 1);
		}
	},

	"click .next-page-link": function(e, t) {
		e.preventDefault();
		let currentPage = Session.get("LooReceivedListPagedPageNo") || 0;
		if(currentPage < this.loo_received_list_paged_page_count - 1) {
			Session.set("LooReceivedListPagedPageNo", currentPage + 1);
		}
	}

	
});

Template.BranchFacilitiesLooReceivedView.helpers({

	"insertButtonClass": function() {
		return BranchFacilities.userCanInsert(Meteor.userId(), {}) ? "" : "hidden";
	},

	"isEmpty": function() {
		return !this.loo_received_list_paged || this.loo_received_list_paged.count() == 0;
	},
	"isNotEmpty": function() {
		return this.loo_received_list_paged && this.loo_received_list_paged.count() > 0;
	},
	"isNotFound": function() {
		return this.loo_received_list_paged && this.loo_received_list_paged.count() == 0 && Session.get("LooReceivedListPagedSearchString");
	},
	"gotPrevPage": function() {
		return !!Session.get("LooReceivedListPagedPageNo");
	},
	"gotNextPage": function() {
		return (Session.get("LooReceivedListPagedPageNo") || 0) < this.loo_received_list_paged_page_count - 1;
	},
	"searchString": function() {
		return Session.get("LooReceivedListPagedSearchString");
	},
	"viewAsTable": function() {
		return Session.get("BranchFacilitiesLooReceivedViewStyle") == "table";
	},
	"viewAsBlog": function() {
		return Session.get("BranchFacilitiesLooReceivedViewStyle") == "blog";
	},
	"viewAsList": function() {
		return Session.get("BranchFacilitiesLooReceivedViewStyle") == "list";
	},
	"viewAsGallery": function() {
		return Session.get("BranchFacilitiesLooReceivedViewStyle") == "gallery";
	}

	
});


Template.BranchFacilitiesLooReceivedViewTable.onCreated(function() {
	
});

Template.BranchFacilitiesLooReceivedViewTable.onDestroyed(function() {
	
});

Template.BranchFacilitiesLooReceivedViewTable.onRendered(function() {
	
});

Template.BranchFacilitiesLooReceivedViewTable.events({
	"click .th-sortable": function(e, t) {
		e.preventDefault();
		var oldSortBy = Session.get("LooReceivedListPagedSortBy");
		var newSortBy = $(e.target).attr("data-sort");

		Session.set("LooReceivedListPagedSortBy", newSortBy);
		if(oldSortBy == newSortBy) {
			var sortAscending = Session.get("LooReceivedListPagedSortAscending");
			if(typeof sortAscending == "undefined") {
				sortAscending = true;
			}
			Session.set("LooReceivedListPagedSortAscending", !sortAscending);
		} else {
			Session.set("LooReceivedListPagedSortAscending", true);
		}
	}
});

Template.BranchFacilitiesLooReceivedViewTable.helpers({
});


Template.BranchFacilitiesLooReceivedViewTableItems.onCreated(function() {
	
});

Template.BranchFacilitiesLooReceivedViewTableItems.onDestroyed(function() {
	
});

Template.BranchFacilitiesLooReceivedViewTableItems.onRendered(function() {
	
});

Template.BranchFacilitiesLooReceivedViewTableItems.events({
	

	"click td": function(e, t) {
		e.preventDefault();
		var item = this;
		var itemId = item ? item._id : null;

		
		Router.go("branch_facilities.loo_received.details", mergeObjects(Router.currentRouteParams(), {looReceivedId: this._id}));
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
		Router.go("branch_facilities.loo_received.update", mergeObjects(Router.currentRouteParams(), {looReceivedId: this._id}));
		return false;
	}
});

Template.BranchFacilitiesLooReceivedViewTableItems.helpers({
	

	"checked": function(value) { return value ? "checked" : "" }, 
	"editButtonClass": function() {
		return BranchFacilities.userCanUpdate(Meteor.userId(), this) ? "" : "hidden";
	},

	"deleteButtonClass": function() {
		return BranchFacilities.userCanRemove(Meteor.userId(), this) ? "" : "hidden";
	}
});
