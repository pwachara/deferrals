Template.CovidlofsPendingLofs.onCreated(function() {
	
});

Template.CovidlofsPendingLofs.onDestroyed(function() {
	
});

Template.CovidlofsPendingLofs.onRendered(function() {
	
	Meteor.defer(function() {
		globalOnRendered();
		$("input[autofocus]").focus();
	});
});

Template.CovidlofsPendingLofs.events({
	
});

Template.CovidlofsPendingLofs.helpers({
	
});


var CovidlofsPendingLofsViewExport = function(fileType) {
	var extraParams = {
		searchText: Session.get("PendingLofListPagedSearchString") || "",
		searchFields: Session.get("PendingLofListPagedSearchFields") || ["borrower", "rm", "rm_email", "lof_received", "banking_segment"],
		sortBy: Session.get("PendingLofListPagedSortBy") || "",
		sortAscending: Session.get("PendingLofListPagedSortAscending") || true
	};

	var exportFields = ["date", "borrower", "rm", "rm_email", "lof_received", "date_received", "banking_segment"];

	

	Meteor.call("pendingLofListPagedExport", extraParams, exportFields, fileType, function(e, data) {
		if(e) {
			alert(e);
			return;
		}

		let filename = "export." + fileType;
		downloadLocalResource(data, filename, "application/octet-stream");
	});
};

Template.CovidlofsPendingLofsView.onCreated(function() {
	
});

Template.CovidlofsPendingLofsView.onDestroyed(function() {
	
});

Template.CovidlofsPendingLofsView.onRendered(function() {
	Session.set("CovidlofsPendingLofsViewStyle", "table");
	
});

Template.CovidlofsPendingLofsView.events({
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
				Session.set("PendingLofListPagedSearchString", searchString);
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
					Session.set("PendingLofListPagedSearchString", searchString);
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
					Session.set("PendingLofListPagedSearchString", "");
				}

			}
			return false;
		}

		return true;
	},

	"click #dataview-insert-button": function(e, t) {
		e.preventDefault();
		Router.go("covidlofs.pending_lofs.insert", mergeObjects(Router.currentRouteParams(), {}));
	},

	"click #dataview-export-default": function(e, t) {
		e.preventDefault();
		CovidlofsPendingLofsViewExport.call(this, "csv");
	},

	"click #dataview-export-csv": function(e, t) {
		e.preventDefault();
		CovidlofsPendingLofsViewExport.call(this, "csv");
	},

	"click #dataview-export-tsv": function(e, t) {
		e.preventDefault();
		CovidlofsPendingLofsViewExport.call(this, "tsv");
	},

	"click #dataview-export-json": function(e, t) {
		e.preventDefault();
		CovidlofsPendingLofsViewExport.call(this, "json");
	},

	"click .prev-page-link": function(e, t) {
		e.preventDefault();
		var currentPage = Session.get("PendingLofListPagedPageNo") || 0;
		if(currentPage > 0) {
			Session.set("PendingLofListPagedPageNo", currentPage - 1);
		}
	},

	"click .next-page-link": function(e, t) {
		e.preventDefault();
		let currentPage = Session.get("PendingLofListPagedPageNo") || 0;
		if(currentPage < this.pending_lof_list_paged_page_count - 1) {
			Session.set("PendingLofListPagedPageNo", currentPage + 1);
		}
	}

	
});

Template.CovidlofsPendingLofsView.helpers({

	"insertButtonClass": function() {
		return Covidlofs.userCanInsert(Meteor.userId(), {}) ? "" : "hidden";
	},

	"isEmpty": function() {
		return !this.pending_lof_list_paged || this.pending_lof_list_paged.count() == 0;
	},
	"isNotEmpty": function() {
		return this.pending_lof_list_paged && this.pending_lof_list_paged.count() > 0;
	},
	"isNotFound": function() {
		return this.pending_lof_list_paged && this.pending_lof_list_paged.count() == 0 && Session.get("PendingLofListPagedSearchString");
	},
	"gotPrevPage": function() {
		return !!Session.get("PendingLofListPagedPageNo");
	},
	"gotNextPage": function() {
		return (Session.get("PendingLofListPagedPageNo") || 0) < this.pending_lof_list_paged_page_count - 1;
	},
	"searchString": function() {
		return Session.get("PendingLofListPagedSearchString");
	},
	"viewAsTable": function() {
		return Session.get("CovidlofsPendingLofsViewStyle") == "table";
	},
	"viewAsBlog": function() {
		return Session.get("CovidlofsPendingLofsViewStyle") == "blog";
	},
	"viewAsList": function() {
		return Session.get("CovidlofsPendingLofsViewStyle") == "list";
	},
	"viewAsGallery": function() {
		return Session.get("CovidlofsPendingLofsViewStyle") == "gallery";
	}

	
});


Template.CovidlofsPendingLofsViewTable.onCreated(function() {
	
});

Template.CovidlofsPendingLofsViewTable.onDestroyed(function() {
	
});

Template.CovidlofsPendingLofsViewTable.onRendered(function() {
	
});

Template.CovidlofsPendingLofsViewTable.events({
	"click .th-sortable": function(e, t) {
		e.preventDefault();
		var oldSortBy = Session.get("PendingLofListPagedSortBy");
		var newSortBy = $(e.target).attr("data-sort");

		Session.set("PendingLofListPagedSortBy", newSortBy);
		if(oldSortBy == newSortBy) {
			var sortAscending = Session.get("PendingLofListPagedSortAscending");
			if(typeof sortAscending == "undefined") {
				sortAscending = true;
			}
			Session.set("PendingLofListPagedSortAscending", !sortAscending);
		} else {
			Session.set("PendingLofListPagedSortAscending", true);
		}
	}
});

Template.CovidlofsPendingLofsViewTable.helpers({
});


Template.CovidlofsPendingLofsViewTableItems.onCreated(function() {
	
});

Template.CovidlofsPendingLofsViewTableItems.onDestroyed(function() {
	
});

Template.CovidlofsPendingLofsViewTableItems.onRendered(function() {
	
});

Template.CovidlofsPendingLofsViewTableItems.events({
	

	"click td": function(e, t) {
		e.preventDefault();
		var item = this;
		var itemId = item ? item._id : null;

		
		Router.go("covidlofs.pending_lofs.details", mergeObjects(Router.currentRouteParams(), {pendingLofId: this._id}));
		return false;
	},

	"click .inline-checkbox": function(e, t) {
		e.preventDefault();

		if(!this || !this._id) return false;

		var fieldName = $(e.currentTarget).attr("data-field");
		if(!fieldName) return false;

		var values = {};
		values[fieldName] = !this[fieldName];

		Meteor.call("covidlofsUpdate", this._id, values, function(err, res) {
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
						Meteor.call("covidlofsRemove", me._id, function(err, res) {
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
		Router.go("covidlofs.pending_lofs.update", mergeObjects(Router.currentRouteParams(), {pendingLofId: this._id}));
		return false;
	}
});

Template.CovidlofsPendingLofsViewTableItems.helpers({
	

	"checked": function(value) { return value ? "checked" : "" }, 
	"editButtonClass": function() {
		return Covidlofs.userCanUpdate(Meteor.userId(), this) ? "" : "hidden";
	},

	"deleteButtonClass": function() {
		return Covidlofs.userCanRemove(Meteor.userId(), this) ? "" : "hidden";
	}
});
