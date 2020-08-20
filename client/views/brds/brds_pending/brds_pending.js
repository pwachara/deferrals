Template.BrdsBrdsPending.onCreated(function() {
	
});

Template.BrdsBrdsPending.onDestroyed(function() {
	
});

Template.BrdsBrdsPending.onRendered(function() {
	
	Meteor.defer(function() {
		globalOnRendered();
		$("input[autofocus]").focus();
	});
});

Template.BrdsBrdsPending.events({
	
});

Template.BrdsBrdsPending.helpers({
	
});


var BrdsBrdsPendingViewExport = function(fileType) {
	var extraParams = {
		searchText: Session.get("BrdsPendingPagedSearchString") || "",
		searchFields: Session.get("BrdsPendingPagedSearchFields") || ["description", "ict_contact", "raised_by", "date_raised", "expected_date_of_closure", "status", "remarks", "date_closed"],
		sortBy: Session.get("BrdsPendingPagedSortBy") || "",
		sortAscending: Session.get("BrdsPendingPagedSortAscending") || true
	};

	var exportFields = ["description", "ict_contact", "raised_by", "date_raised", "expected_date_of_closure", "status", "remarks", "date_closed"];

	

	Meteor.call("brdsPendingPagedExport", extraParams, exportFields, fileType, function(e, data) {
		if(e) {
			alert(e);
			return;
		}

		let filename = "export." + fileType;
		downloadLocalResource(data, filename, "application/octet-stream");
	});
};

Template.BrdsBrdsPendingView.onCreated(function() {
	
});

Template.BrdsBrdsPendingView.onDestroyed(function() {
	
});

Template.BrdsBrdsPendingView.onRendered(function() {
	Session.set("BrdsBrdsPendingViewStyle", "table");
	
});

Template.BrdsBrdsPendingView.events({
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
				Session.set("BrdsPendingPagedSearchString", searchString);
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
					Session.set("BrdsPendingPagedSearchString", searchString);
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
					Session.set("BrdsPendingPagedSearchString", "");
				}

			}
			return false;
		}

		return true;
	},

	"click #dataview-insert-button": function(e, t) {
		e.preventDefault();
		Router.go("brds.brds_pending.insert", mergeObjects(Router.currentRouteParams(), {}));
	},

	"click #dataview-export-default": function(e, t) {
		e.preventDefault();
		BrdsBrdsPendingViewExport.call(this, "csv");
	},

	"click #dataview-export-csv": function(e, t) {
		e.preventDefault();
		BrdsBrdsPendingViewExport.call(this, "csv");
	},

	"click #dataview-export-tsv": function(e, t) {
		e.preventDefault();
		BrdsBrdsPendingViewExport.call(this, "tsv");
	},

	"click #dataview-export-json": function(e, t) {
		e.preventDefault();
		BrdsBrdsPendingViewExport.call(this, "json");
	},

	"click .prev-page-link": function(e, t) {
		e.preventDefault();
		var currentPage = Session.get("BrdsPendingPagedPageNo") || 0;
		if(currentPage > 0) {
			Session.set("BrdsPendingPagedPageNo", currentPage - 1);
		}
	},

	"click .next-page-link": function(e, t) {
		e.preventDefault();
		let currentPage = Session.get("BrdsPendingPagedPageNo") || 0;
		if(currentPage < this.brds_pending_paged_page_count - 1) {
			Session.set("BrdsPendingPagedPageNo", currentPage + 1);
		}
	}

	
});

Template.BrdsBrdsPendingView.helpers({

	"insertButtonClass": function() {
		return Brds.userCanInsert(Meteor.userId(), {}) ? "" : "hidden";
	},

	"isEmpty": function() {
		return !this.brds_pending_paged || this.brds_pending_paged.count() == 0;
	},
	"isNotEmpty": function() {
		return this.brds_pending_paged && this.brds_pending_paged.count() > 0;
	},
	"isNotFound": function() {
		return this.brds_pending_paged && this.brds_pending_paged.count() == 0 && Session.get("BrdsPendingPagedSearchString");
	},
	"gotPrevPage": function() {
		return !!Session.get("BrdsPendingPagedPageNo");
	},
	"gotNextPage": function() {
		return (Session.get("BrdsPendingPagedPageNo") || 0) < this.brds_pending_paged_page_count - 1;
	},
	"searchString": function() {
		return Session.get("BrdsPendingPagedSearchString");
	},
	"viewAsTable": function() {
		return Session.get("BrdsBrdsPendingViewStyle") == "table";
	},
	"viewAsBlog": function() {
		return Session.get("BrdsBrdsPendingViewStyle") == "blog";
	},
	"viewAsList": function() {
		return Session.get("BrdsBrdsPendingViewStyle") == "list";
	},
	"viewAsGallery": function() {
		return Session.get("BrdsBrdsPendingViewStyle") == "gallery";
	}

	
});


Template.BrdsBrdsPendingViewTable.onCreated(function() {
	
});

Template.BrdsBrdsPendingViewTable.onDestroyed(function() {
	
});

Template.BrdsBrdsPendingViewTable.onRendered(function() {
	
});

Template.BrdsBrdsPendingViewTable.events({
	"click .th-sortable": function(e, t) {
		e.preventDefault();
		var oldSortBy = Session.get("BrdsPendingPagedSortBy");
		var newSortBy = $(e.target).attr("data-sort");

		Session.set("BrdsPendingPagedSortBy", newSortBy);
		if(oldSortBy == newSortBy) {
			var sortAscending = Session.get("BrdsPendingPagedSortAscending");
			if(typeof sortAscending == "undefined") {
				sortAscending = true;
			}
			Session.set("BrdsPendingPagedSortAscending", !sortAscending);
		} else {
			Session.set("BrdsPendingPagedSortAscending", true);
		}
	}
});

Template.BrdsBrdsPendingViewTable.helpers({
});


Template.BrdsBrdsPendingViewTableItems.onCreated(function() {
	
});

Template.BrdsBrdsPendingViewTableItems.onDestroyed(function() {
	
});

Template.BrdsBrdsPendingViewTableItems.onRendered(function() {
	
});

Template.BrdsBrdsPendingViewTableItems.events({
	

	"click td": function(e, t) {
		e.preventDefault();
		var item = this;
		var itemId = item ? item._id : null;

		
		Router.go("brds.brds_pending.details", mergeObjects(Router.currentRouteParams(), {brdId: this._id}));
		return false;
	},

	"click .inline-checkbox": function(e, t) {
		e.preventDefault();

		if(!this || !this._id) return false;

		var fieldName = $(e.currentTarget).attr("data-field");
		if(!fieldName) return false;

		var values = {};
		values[fieldName] = !this[fieldName];

		Meteor.call("brdsUpdate", this._id, values, function(err, res) {
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
						Meteor.call("brdsRemove", me._id, function(err, res) {
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
		Router.go("brds.brds_pending.edit", mergeObjects(Router.currentRouteParams(), {brdId: this._id}));
		return false;
	}
});

Template.BrdsBrdsPendingViewTableItems.helpers({
	

	"checked": function(value) { return value ? "checked" : "" }, 
	"editButtonClass": function() {
		return Brds.userCanUpdate(Meteor.userId(), this) ? "" : "hidden";
	},

	"deleteButtonClass": function() {
		return Brds.userCanRemove(Meteor.userId(), this) ? "" : "hidden";
	}
});
