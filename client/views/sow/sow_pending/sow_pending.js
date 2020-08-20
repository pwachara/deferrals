Template.SowSowPending.onCreated(function() {
	
});

Template.SowSowPending.onDestroyed(function() {
	
});

Template.SowSowPending.onRendered(function() {
	
	Meteor.defer(function() {
		globalOnRendered();
		$("input[autofocus]").focus();
	});
});

Template.SowSowPending.events({
	
});

Template.SowSowPending.helpers({
	
});


var SowSowPendingViewExport = function(fileType) {
	var extraParams = {
		searchText: Session.get("SowPendingListPagedSearchString") || "",
		searchFields: Session.get("SowPendingListPagedSearchFields") || ["borrower", "amount", "rm"],
		sortBy: Session.get("SowPendingListPagedSortBy") || "",
		sortAscending: Session.get("SowPendingListPagedSortAscending") || true
	};

	var exportFields = ["loo_date", "borrower", "amount", "sow_deadline", "status", "date_closed", "penalty_af_collected", "af_collected", "date_af_collected", "rm"];

	

	Meteor.call("sowPendingListPagedExport", extraParams, exportFields, fileType, function(e, data) {
		if(e) {
			alert(e);
			return;
		}

		let filename = "export." + fileType;
		downloadLocalResource(data, filename, "application/octet-stream");
	});
};

Template.SowSowPendingView.onCreated(function() {
	
});

Template.SowSowPendingView.onDestroyed(function() {
	
});

Template.SowSowPendingView.onRendered(function() {
	Session.set("SowSowPendingViewStyle", "table");
	
});

Template.SowSowPendingView.events({
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
				Session.set("SowPendingListPagedSearchString", searchString);
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
					Session.set("SowPendingListPagedSearchString", searchString);
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
					Session.set("SowPendingListPagedSearchString", "");
				}

			}
			return false;
		}

		return true;
	},

	"click #dataview-insert-button": function(e, t) {
		e.preventDefault();
		Router.go("sow.sow_pending.insert", mergeObjects(Router.currentRouteParams(), {}));
	},

	"click #dataview-export-default": function(e, t) {
		e.preventDefault();
		SowSowPendingViewExport.call(this, "csv");
	},

	"click #dataview-export-csv": function(e, t) {
		e.preventDefault();
		SowSowPendingViewExport.call(this, "csv");
	},

	"click #dataview-export-tsv": function(e, t) {
		e.preventDefault();
		SowSowPendingViewExport.call(this, "tsv");
	},

	"click #dataview-export-json": function(e, t) {
		e.preventDefault();
		SowSowPendingViewExport.call(this, "json");
	},

	"click .prev-page-link": function(e, t) {
		e.preventDefault();
		var currentPage = Session.get("SowPendingListPagedPageNo") || 0;
		if(currentPage > 0) {
			Session.set("SowPendingListPagedPageNo", currentPage - 1);
		}
	},

	"click .next-page-link": function(e, t) {
		e.preventDefault();
		let currentPage = Session.get("SowPendingListPagedPageNo") || 0;
		if(currentPage < this.sow_pending_list_paged_page_count - 1) {
			Session.set("SowPendingListPagedPageNo", currentPage + 1);
		}
	}

	
});

Template.SowSowPendingView.helpers({

	"insertButtonClass": function() {
		return Sow.userCanInsert(Meteor.userId(), {}) ? "" : "hidden";
	},

	"isEmpty": function() {
		return !this.sow_pending_list_paged || this.sow_pending_list_paged.count() == 0;
	},
	"isNotEmpty": function() {
		return this.sow_pending_list_paged && this.sow_pending_list_paged.count() > 0;
	},
	"isNotFound": function() {
		return this.sow_pending_list_paged && this.sow_pending_list_paged.count() == 0 && Session.get("SowPendingListPagedSearchString");
	},
	"gotPrevPage": function() {
		return !!Session.get("SowPendingListPagedPageNo");
	},
	"gotNextPage": function() {
		return (Session.get("SowPendingListPagedPageNo") || 0) < this.sow_pending_list_paged_page_count - 1;
	},
	"searchString": function() {
		return Session.get("SowPendingListPagedSearchString");
	},
	"viewAsTable": function() {
		return Session.get("SowSowPendingViewStyle") == "table";
	},
	"viewAsBlog": function() {
		return Session.get("SowSowPendingViewStyle") == "blog";
	},
	"viewAsList": function() {
		return Session.get("SowSowPendingViewStyle") == "list";
	},
	"viewAsGallery": function() {
		return Session.get("SowSowPendingViewStyle") == "gallery";
	}

	
});


Template.SowSowPendingViewTable.onCreated(function() {
	
});

Template.SowSowPendingViewTable.onDestroyed(function() {
	
});

Template.SowSowPendingViewTable.onRendered(function() {
	
});

Template.SowSowPendingViewTable.events({
	"click .th-sortable": function(e, t) {
		e.preventDefault();
		var oldSortBy = Session.get("SowPendingListPagedSortBy");
		var newSortBy = $(e.target).attr("data-sort");

		Session.set("SowPendingListPagedSortBy", newSortBy);
		if(oldSortBy == newSortBy) {
			var sortAscending = Session.get("SowPendingListPagedSortAscending");
			if(typeof sortAscending == "undefined") {
				sortAscending = true;
			}
			Session.set("SowPendingListPagedSortAscending", !sortAscending);
		} else {
			Session.set("SowPendingListPagedSortAscending", true);
		}
	}
});

Template.SowSowPendingViewTable.helpers({
});


Template.SowSowPendingViewTableItems.onCreated(function() {
	
});

Template.SowSowPendingViewTableItems.onDestroyed(function() {
	
});

Template.SowSowPendingViewTableItems.onRendered(function() {
	
});

Template.SowSowPendingViewTableItems.events({
	

	"click td": function(e, t) {
		e.preventDefault();
		var item = this;
		var itemId = item ? item._id : null;

		
		Router.go("sow.sow_pending.details", mergeObjects(Router.currentRouteParams(), {sowPendingId: this._id}));
		return false;
	},

	"click .inline-checkbox": function(e, t) {
		e.preventDefault();

		if(!this || !this._id) return false;

		var fieldName = $(e.currentTarget).attr("data-field");
		if(!fieldName) return false;

		var values = {};
		values[fieldName] = !this[fieldName];

		Meteor.call("sowUpdate", this._id, values, function(err, res) {
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
						Meteor.call("sowRemove", me._id, function(err, res) {
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
		Router.go("sow.sow_pending.update", mergeObjects(Router.currentRouteParams(), {sowPendingId: this._id}));
		return false;
	}
});

Template.SowSowPendingViewTableItems.helpers({
	

	"checked": function(value) { return value ? "checked" : "" }, 
	"editButtonClass": function() {
		return Sow.userCanUpdate(Meteor.userId(), this) ? "" : "hidden";
	},

	"deleteButtonClass": function() {
		return Sow.userCanRemove(Meteor.userId(), this) ? "" : "hidden";
	}
});
