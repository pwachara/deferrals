Template.DeferralsClosedDeferrals.onCreated(function() {
	
});

Template.DeferralsClosedDeferrals.onDestroyed(function() {
	
});

Template.DeferralsClosedDeferrals.onRendered(function() {
	
	Meteor.defer(function() {
		globalOnRendered();
		$("input[autofocus]").focus();
	});
});

Template.DeferralsClosedDeferrals.events({
	
});

Template.DeferralsClosedDeferrals.helpers({
	
});


var DeferralsClosedDeferralsViewExport = function(fileType) {
	var extraParams = {
		searchText: Session.get("DeferralsClosedPagedSearchString") || "",
		searchFields: Session.get("DeferralsClosedPagedSearchFields") || ["deferral_date", "rm", "borrower", "customer_number", "banking_segment.name", "item_deferred", "due_date", "authorizer", "status", "date_closed"],
		sortBy: Session.get("DeferralsClosedPagedSortBy") || "",
		sortAscending: Session.get("DeferralsClosedPagedSortAscending") || true
	};

	var exportFields = ["deferral_date", "rm", "borrower", "customer_number", "banking_segment.name", "item_deferred", "due_date", "authorizer", "status", "date_closed"];

	

	Meteor.call("deferralsClosedPagedExport", extraParams, exportFields, fileType, function(e, data) {
		if(e) {
			alert(e);
			return;
		}

		let filename = "export." + fileType;
		downloadLocalResource(data, filename, "application/octet-stream");
	});
};

Template.DeferralsClosedDeferralsView.onCreated(function() {
	
});

Template.DeferralsClosedDeferralsView.onDestroyed(function() {
	
});

Template.DeferralsClosedDeferralsView.onRendered(function() {
	Session.set("DeferralsClosedDeferralsViewStyle", "table");
	
});

Template.DeferralsClosedDeferralsView.events({
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
				Session.set("DeferralsClosedPagedSearchString", searchString);
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
					Session.set("DeferralsClosedPagedSearchString", searchString);
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
					Session.set("DeferralsClosedPagedSearchString", "");
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
		DeferralsClosedDeferralsViewExport.call(this, "csv");
	},

	"click #dataview-export-csv": function(e, t) {
		e.preventDefault();
		DeferralsClosedDeferralsViewExport.call(this, "csv");
	},

	"click #dataview-export-tsv": function(e, t) {
		e.preventDefault();
		DeferralsClosedDeferralsViewExport.call(this, "tsv");
	},

	"click #dataview-export-json": function(e, t) {
		e.preventDefault();
		DeferralsClosedDeferralsViewExport.call(this, "json");
	},

	"click .prev-page-link": function(e, t) {
		e.preventDefault();
		var currentPage = Session.get("DeferralsClosedPagedPageNo") || 0;
		if(currentPage > 0) {
			Session.set("DeferralsClosedPagedPageNo", currentPage - 1);
		}
	},

	"click .next-page-link": function(e, t) {
		e.preventDefault();
		let currentPage = Session.get("DeferralsClosedPagedPageNo") || 0;
		if(currentPage < this.deferrals_closed_paged_page_count - 1) {
			Session.set("DeferralsClosedPagedPageNo", currentPage + 1);
		}
	}

	
});

Template.DeferralsClosedDeferralsView.helpers({

	"insertButtonClass": function() {
		return Deferrals.userCanInsert(Meteor.userId(), {}) ? "" : "hidden";
	},

	"isEmpty": function() {
		return !this.deferrals_closed_paged || this.deferrals_closed_paged.count() == 0;
	},
	"isNotEmpty": function() {
		return this.deferrals_closed_paged && this.deferrals_closed_paged.count() > 0;
	},
	"isNotFound": function() {
		return this.deferrals_closed_paged && this.deferrals_closed_paged.count() == 0 && Session.get("DeferralsClosedPagedSearchString");
	},
	"gotPrevPage": function() {
		return !!Session.get("DeferralsClosedPagedPageNo");
	},
	"gotNextPage": function() {
		return (Session.get("DeferralsClosedPagedPageNo") || 0) < this.deferrals_closed_paged_page_count - 1;
	},
	"searchString": function() {
		return Session.get("DeferralsClosedPagedSearchString");
	},
	"viewAsTable": function() {
		return Session.get("DeferralsClosedDeferralsViewStyle") == "table";
	},
	"viewAsBlog": function() {
		return Session.get("DeferralsClosedDeferralsViewStyle") == "blog";
	},
	"viewAsList": function() {
		return Session.get("DeferralsClosedDeferralsViewStyle") == "list";
	},
	"viewAsGallery": function() {
		return Session.get("DeferralsClosedDeferralsViewStyle") == "gallery";
	}

	
});


Template.DeferralsClosedDeferralsViewTable.onCreated(function() {
	
});

Template.DeferralsClosedDeferralsViewTable.onDestroyed(function() {
	
});

Template.DeferralsClosedDeferralsViewTable.onRendered(function() {
	
});

Template.DeferralsClosedDeferralsViewTable.events({
	"click .th-sortable": function(e, t) {
		e.preventDefault();
		var oldSortBy = Session.get("DeferralsClosedPagedSortBy");
		var newSortBy = $(e.target).attr("data-sort");

		Session.set("DeferralsClosedPagedSortBy", newSortBy);
		if(oldSortBy == newSortBy) {
			var sortAscending = Session.get("DeferralsClosedPagedSortAscending");
			if(typeof sortAscending == "undefined") {
				sortAscending = true;
			}
			Session.set("DeferralsClosedPagedSortAscending", !sortAscending);
		} else {
			Session.set("DeferralsClosedPagedSortAscending", true);
		}
	}
});

Template.DeferralsClosedDeferralsViewTable.helpers({
});


Template.DeferralsClosedDeferralsViewTableItems.onCreated(function() {
	
});

Template.DeferralsClosedDeferralsViewTableItems.onDestroyed(function() {
	
});

Template.DeferralsClosedDeferralsViewTableItems.onRendered(function() {
	
});

Template.DeferralsClosedDeferralsViewTableItems.events({
	

	"click td": function(e, t) {
		e.preventDefault();
		var item = this;
		var itemId = item ? item._id : null;

		
		Router.go("deferrals.closed_deferrals.details", mergeObjects(Router.currentRouteParams(), {deferralId: this._id}));
		return false;
	},

	"click .inline-checkbox": function(e, t) {
		e.preventDefault();

		if(!this || !this._id) return false;

		var fieldName = $(e.currentTarget).attr("data-field");
		if(!fieldName) return false;

		var values = {};
		values[fieldName] = !this[fieldName];

		Meteor.call("deferralsUpdate", this._id, values, function(err, res) {
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
						Meteor.call("deferralsRemove", me._id, function(err, res) {
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
		Router.go("deferrals.closed_deferrals.edit", mergeObjects(Router.currentRouteParams(), {deferralId: this._id}));
		return false;
	}
});

Template.DeferralsClosedDeferralsViewTableItems.helpers({
	

	"checked": function(value) { return value ? "checked" : "" }, 
	"editButtonClass": function() {
		return Deferrals.userCanUpdate(Meteor.userId(), this) ? "" : "hidden";
	},

	"deleteButtonClass": function() {
		return Deferrals.userCanRemove(Meteor.userId(), this) ? "" : "hidden";
	}
});
