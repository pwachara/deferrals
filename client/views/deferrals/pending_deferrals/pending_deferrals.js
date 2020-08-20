Template.DeferralsPendingDeferrals.onCreated(function() {
	
});

Template.DeferralsPendingDeferrals.onDestroyed(function() {
	
});

Template.DeferralsPendingDeferrals.onRendered(function() {
	
	Meteor.defer(function() {
		globalOnRendered();
		$("input[autofocus]").focus();
	});
});

Template.DeferralsPendingDeferrals.events({
	
});

Template.DeferralsPendingDeferrals.helpers({
	
});


var DeferralsPendingDeferralsViewExport = function(fileType) {
	var extraParams = {
		searchText: Session.get("DeferralsPendingPagedSearchString") || "",
		searchFields: Session.get("DeferralsPendingPagedSearchFields") || ["deferral_date", "rm", "borrower", "customer_number", "banking_segment.name", "item_deferred", "due_date", "authorizer", "status", "date_closed"],
		sortBy: Session.get("DeferralsPendingPagedSortBy") || "",
		sortAscending: Session.get("DeferralsPendingPagedSortAscending") || true
	};

	var exportFields = ["deferral_date", "rm", "borrower", "customer_number", "banking_segment.name", "item_deferred", "due_date", "authorizer", "status", "date_closed"];

	

	Meteor.call("deferralsPendingPagedExport", extraParams, exportFields, fileType, function(e, data) {
		if(e) {
			alert(e);
			return;
		}

		let filename = "export." + fileType;
		downloadLocalResource(data, filename, "application/octet-stream");
	});
};

Template.DeferralsPendingDeferralsView.onCreated(function() {
	
});

Template.DeferralsPendingDeferralsView.onDestroyed(function() {
	
});

Template.DeferralsPendingDeferralsView.onRendered(function() {
	Session.set("DeferralsPendingDeferralsViewStyle", "table");
	
});

Template.DeferralsPendingDeferralsView.events({
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
				Session.set("DeferralsPendingPagedSearchString", searchString);
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
					Session.set("DeferralsPendingPagedSearchString", searchString);
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
					Session.set("DeferralsPendingPagedSearchString", "");
				}

			}
			return false;
		}

		return true;
	},

	"click #dataview-insert-button": function(e, t) {
		e.preventDefault();
		Router.go("deferrals.pending_deferrals.insert", mergeObjects(Router.currentRouteParams(), {}));
	},

	"click #dataview-export-default": function(e, t) {
		e.preventDefault();
		DeferralsPendingDeferralsViewExport.call(this, "csv");
	},

	"click #dataview-export-csv": function(e, t) {
		e.preventDefault();
		DeferralsPendingDeferralsViewExport.call(this, "csv");
	},

	"click #dataview-export-tsv": function(e, t) {
		e.preventDefault();
		DeferralsPendingDeferralsViewExport.call(this, "tsv");
	},

	"click #dataview-export-json": function(e, t) {
		e.preventDefault();
		DeferralsPendingDeferralsViewExport.call(this, "json");
	},

	"click .prev-page-link": function(e, t) {
		e.preventDefault();
		var currentPage = Session.get("DeferralsPendingPagedPageNo") || 0;
		if(currentPage > 0) {
			Session.set("DeferralsPendingPagedPageNo", currentPage - 1);
		}
	},

	"click .next-page-link": function(e, t) {
		e.preventDefault();
		let currentPage = Session.get("DeferralsPendingPagedPageNo") || 0;
		if(currentPage < this.deferrals_pending_paged_page_count - 1) {
			Session.set("DeferralsPendingPagedPageNo", currentPage + 1);
		}
	}

	
});

Template.DeferralsPendingDeferralsView.helpers({

	"insertButtonClass": function() {
		return Deferrals.userCanInsert(Meteor.userId(), {}) ? "" : "hidden";
	},

	"isEmpty": function() {
		return !this.deferrals_pending_paged || this.deferrals_pending_paged.count() == 0;
	},
	"isNotEmpty": function() {
		return this.deferrals_pending_paged && this.deferrals_pending_paged.count() > 0;
	},
	"isNotFound": function() {
		return this.deferrals_pending_paged && this.deferrals_pending_paged.count() == 0 && Session.get("DeferralsPendingPagedSearchString");
	},
	"gotPrevPage": function() {
		return !!Session.get("DeferralsPendingPagedPageNo");
	},
	"gotNextPage": function() {
		return (Session.get("DeferralsPendingPagedPageNo") || 0) < this.deferrals_pending_paged_page_count - 1;
	},
	"searchString": function() {
		return Session.get("DeferralsPendingPagedSearchString");
	},
	"viewAsTable": function() {
		return Session.get("DeferralsPendingDeferralsViewStyle") == "table";
	},
	"viewAsBlog": function() {
		return Session.get("DeferralsPendingDeferralsViewStyle") == "blog";
	},
	"viewAsList": function() {
		return Session.get("DeferralsPendingDeferralsViewStyle") == "list";
	},
	"viewAsGallery": function() {
		return Session.get("DeferralsPendingDeferralsViewStyle") == "gallery";
	}

	
});


Template.DeferralsPendingDeferralsViewTable.onCreated(function() {
	
});

Template.DeferralsPendingDeferralsViewTable.onDestroyed(function() {
	
});

Template.DeferralsPendingDeferralsViewTable.onRendered(function() {
	
});

Template.DeferralsPendingDeferralsViewTable.events({
	"click .th-sortable": function(e, t) {
		e.preventDefault();
		var oldSortBy = Session.get("DeferralsPendingPagedSortBy");
		var newSortBy = $(e.target).attr("data-sort");

		Session.set("DeferralsPendingPagedSortBy", newSortBy);
		if(oldSortBy == newSortBy) {
			var sortAscending = Session.get("DeferralsPendingPagedSortAscending");
			if(typeof sortAscending == "undefined") {
				sortAscending = true;
			}
			Session.set("DeferralsPendingPagedSortAscending", !sortAscending);
		} else {
			Session.set("DeferralsPendingPagedSortAscending", true);
		}
	}
});

Template.DeferralsPendingDeferralsViewTable.helpers({
});


Template.DeferralsPendingDeferralsViewTableItems.onCreated(function() {
	
});

Template.DeferralsPendingDeferralsViewTableItems.onDestroyed(function() {
	
});

Template.DeferralsPendingDeferralsViewTableItems.onRendered(function() {
	
});

Template.DeferralsPendingDeferralsViewTableItems.events({
	

	"click td": function(e, t) {
		e.preventDefault();
		var item = this;
		var itemId = item ? item._id : null;

		
		Router.go("deferrals.pending_deferrals.details", mergeObjects(Router.currentRouteParams(), {deferralId: this._id}));
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
		Router.go("deferrals.pending_deferrals.edit", mergeObjects(Router.currentRouteParams(), {deferralId: this._id}));
		return false;
	}
});

Template.DeferralsPendingDeferralsViewTableItems.helpers({
	

	"checked": function(value) { return value ? "checked" : "" }, 
	"editButtonClass": function() {
		return Deferrals.userCanUpdate(Meteor.userId(), this) ? "" : "hidden";
	},

	"deleteButtonClass": function() {
		return Deferrals.userCanRemove(Meteor.userId(), this) ? "" : "hidden";
	}
});
