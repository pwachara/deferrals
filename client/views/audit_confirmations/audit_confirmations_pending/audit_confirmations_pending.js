Template.AuditConfirmationsAuditConfirmationsPending.onCreated(function() {
	
});

Template.AuditConfirmationsAuditConfirmationsPending.onDestroyed(function() {
	
});

Template.AuditConfirmationsAuditConfirmationsPending.onRendered(function() {
	
	Meteor.defer(function() {
		globalOnRendered();
		$("input[autofocus]").focus();
	});
});

Template.AuditConfirmationsAuditConfirmationsPending.events({
	
});

Template.AuditConfirmationsAuditConfirmationsPending.helpers({
	
});


var AuditConfirmationsAuditConfirmationsPendingViewExport = function(fileType) {
	var extraParams = {
		searchText: Session.get("AuditsPendingPagedSearchString") || "",
		searchFields: Session.get("AuditsPendingPagedSearchFields") || ["date_received", "customer_name", "customer_number", "sender", "branch", "year_of_audit", "charges_collected", "amount_collected", "date_dispatched", "status", "comments"],
		sortBy: Session.get("AuditsPendingPagedSortBy") || "",
		sortAscending: Session.get("AuditsPendingPagedSortAscending") || true
	};

	var exportFields = ["date_received", "customer_name", "customer_number", "sender", "branch", "year_of_audit", "charges_collected", "amount_collected", "date_dispatched", "status", "comments"];

	

	Meteor.call("auditsPendingPagedExport", extraParams, exportFields, fileType, function(e, data) {
		if(e) {
			alert(e);
			return;
		}

		let filename = "export." + fileType;
		downloadLocalResource(data, filename, "application/octet-stream");
	});
};

Template.AuditConfirmationsAuditConfirmationsPendingView.onCreated(function() {
	
});

Template.AuditConfirmationsAuditConfirmationsPendingView.onDestroyed(function() {
	
});

Template.AuditConfirmationsAuditConfirmationsPendingView.onRendered(function() {
	Session.set("AuditConfirmationsAuditConfirmationsPendingViewStyle", "table");
	
});

Template.AuditConfirmationsAuditConfirmationsPendingView.events({
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
				Session.set("AuditsPendingPagedSearchString", searchString);
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
					Session.set("AuditsPendingPagedSearchString", searchString);
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
					Session.set("AuditsPendingPagedSearchString", "");
				}

			}
			return false;
		}

		return true;
	},

	"click #dataview-insert-button": function(e, t) {
		e.preventDefault();
		Router.go("audit_confirmations.audit_confirmations_pending.insert", mergeObjects(Router.currentRouteParams(), {}));
	},

	"click #dataview-export-default": function(e, t) {
		e.preventDefault();
		AuditConfirmationsAuditConfirmationsPendingViewExport.call(this, "csv");
	},

	"click #dataview-export-csv": function(e, t) {
		e.preventDefault();
		AuditConfirmationsAuditConfirmationsPendingViewExport.call(this, "csv");
	},

	"click #dataview-export-tsv": function(e, t) {
		e.preventDefault();
		AuditConfirmationsAuditConfirmationsPendingViewExport.call(this, "tsv");
	},

	"click #dataview-export-json": function(e, t) {
		e.preventDefault();
		AuditConfirmationsAuditConfirmationsPendingViewExport.call(this, "json");
	},

	"click .prev-page-link": function(e, t) {
		e.preventDefault();
		var currentPage = Session.get("AuditsPendingPagedPageNo") || 0;
		if(currentPage > 0) {
			Session.set("AuditsPendingPagedPageNo", currentPage - 1);
		}
	},

	"click .next-page-link": function(e, t) {
		e.preventDefault();
		let currentPage = Session.get("AuditsPendingPagedPageNo") || 0;
		if(currentPage < this.audits_pending_paged_page_count - 1) {
			Session.set("AuditsPendingPagedPageNo", currentPage + 1);
		}
	}

	
});

Template.AuditConfirmationsAuditConfirmationsPendingView.helpers({

	"insertButtonClass": function() {
		return AuditConfirmations.userCanInsert(Meteor.userId(), {}) ? "" : "hidden";
	},

	"isEmpty": function() {
		return !this.audits_pending_paged || this.audits_pending_paged.count() == 0;
	},
	"isNotEmpty": function() {
		return this.audits_pending_paged && this.audits_pending_paged.count() > 0;
	},
	"isNotFound": function() {
		return this.audits_pending_paged && this.audits_pending_paged.count() == 0 && Session.get("AuditsPendingPagedSearchString");
	},
	"gotPrevPage": function() {
		return !!Session.get("AuditsPendingPagedPageNo");
	},
	"gotNextPage": function() {
		return (Session.get("AuditsPendingPagedPageNo") || 0) < this.audits_pending_paged_page_count - 1;
	},
	"searchString": function() {
		return Session.get("AuditsPendingPagedSearchString");
	},
	"viewAsTable": function() {
		return Session.get("AuditConfirmationsAuditConfirmationsPendingViewStyle") == "table";
	},
	"viewAsBlog": function() {
		return Session.get("AuditConfirmationsAuditConfirmationsPendingViewStyle") == "blog";
	},
	"viewAsList": function() {
		return Session.get("AuditConfirmationsAuditConfirmationsPendingViewStyle") == "list";
	},
	"viewAsGallery": function() {
		return Session.get("AuditConfirmationsAuditConfirmationsPendingViewStyle") == "gallery";
	}

	
});


Template.AuditConfirmationsAuditConfirmationsPendingViewTable.onCreated(function() {
	
});

Template.AuditConfirmationsAuditConfirmationsPendingViewTable.onDestroyed(function() {
	
});

Template.AuditConfirmationsAuditConfirmationsPendingViewTable.onRendered(function() {
	
});

Template.AuditConfirmationsAuditConfirmationsPendingViewTable.events({
	"click .th-sortable": function(e, t) {
		e.preventDefault();
		var oldSortBy = Session.get("AuditsPendingPagedSortBy");
		var newSortBy = $(e.target).attr("data-sort");

		Session.set("AuditsPendingPagedSortBy", newSortBy);
		if(oldSortBy == newSortBy) {
			var sortAscending = Session.get("AuditsPendingPagedSortAscending");
			if(typeof sortAscending == "undefined") {
				sortAscending = true;
			}
			Session.set("AuditsPendingPagedSortAscending", !sortAscending);
		} else {
			Session.set("AuditsPendingPagedSortAscending", true);
		}
	}
});

Template.AuditConfirmationsAuditConfirmationsPendingViewTable.helpers({
});


Template.AuditConfirmationsAuditConfirmationsPendingViewTableItems.onCreated(function() {
	
});

Template.AuditConfirmationsAuditConfirmationsPendingViewTableItems.onDestroyed(function() {
	
});

Template.AuditConfirmationsAuditConfirmationsPendingViewTableItems.onRendered(function() {
	
});

Template.AuditConfirmationsAuditConfirmationsPendingViewTableItems.events({
	

	"click td": function(e, t) {
		e.preventDefault();
		var item = this;
		var itemId = item ? item._id : null;

		
		Router.go("audit_confirmations.audit_confirmations_pending.details", mergeObjects(Router.currentRouteParams(), {auditId: this._id}));
		return false;
	},

	"click .inline-checkbox": function(e, t) {
		e.preventDefault();

		if(!this || !this._id) return false;

		var fieldName = $(e.currentTarget).attr("data-field");
		if(!fieldName) return false;

		var values = {};
		values[fieldName] = !this[fieldName];

		Meteor.call("auditConfirmationsUpdate", this._id, values, function(err, res) {
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
						Meteor.call("auditConfirmationsRemove", me._id, function(err, res) {
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
		Router.go("audit_confirmations.audit_confirmations_pending.edit", mergeObjects(Router.currentRouteParams(), {auditId: this._id}));
		return false;
	}
});

Template.AuditConfirmationsAuditConfirmationsPendingViewTableItems.helpers({
	

	"checked": function(value) { return value ? "checked" : "" }, 
	"editButtonClass": function() {
		return AuditConfirmations.userCanUpdate(Meteor.userId(), this) ? "" : "hidden";
	},

	"deleteButtonClass": function() {
		return AuditConfirmations.userCanRemove(Meteor.userId(), this) ? "" : "hidden";
	}
});
