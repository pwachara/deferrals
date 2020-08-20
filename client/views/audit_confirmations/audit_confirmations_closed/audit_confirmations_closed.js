Template.AuditConfirmationsAuditConfirmationsClosed.onCreated(function() {
	
});

Template.AuditConfirmationsAuditConfirmationsClosed.onDestroyed(function() {
	
});

Template.AuditConfirmationsAuditConfirmationsClosed.onRendered(function() {
	
	Meteor.defer(function() {
		globalOnRendered();
		$("input[autofocus]").focus();
	});
});

Template.AuditConfirmationsAuditConfirmationsClosed.events({
	
});

Template.AuditConfirmationsAuditConfirmationsClosed.helpers({
	
});


var AuditConfirmationsAuditConfirmationsClosedViewExport = function(fileType) {
	var extraParams = {
		searchText: Session.get("AuditsClosedPagedSearchString") || "",
		searchFields: Session.get("AuditsClosedPagedSearchFields") || ["date_received", "customer_name", "customer_number", "sender", "branch", "year_of_audit", "charges_collected", "amount_collected", "date_dispatched", "status", "comments"],
		sortBy: Session.get("AuditsClosedPagedSortBy") || "",
		sortAscending: Session.get("AuditsClosedPagedSortAscending") || true
	};

	var exportFields = ["date_received", "customer_name", "customer_number", "sender", "branch", "year_of_audit", "charges_collected", "amount_collected", "date_dispatched", "status", "comments"];

	

	Meteor.call("auditsClosedPagedExport", extraParams, exportFields, fileType, function(e, data) {
		if(e) {
			alert(e);
			return;
		}

		let filename = "export." + fileType;
		downloadLocalResource(data, filename, "application/octet-stream");
	});
};

Template.AuditConfirmationsAuditConfirmationsClosedView.onCreated(function() {
	
});

Template.AuditConfirmationsAuditConfirmationsClosedView.onDestroyed(function() {
	
});

Template.AuditConfirmationsAuditConfirmationsClosedView.onRendered(function() {
	Session.set("AuditConfirmationsAuditConfirmationsClosedViewStyle", "table");
	
});

Template.AuditConfirmationsAuditConfirmationsClosedView.events({
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
				Session.set("AuditsClosedPagedSearchString", searchString);
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
					Session.set("AuditsClosedPagedSearchString", searchString);
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
					Session.set("AuditsClosedPagedSearchString", "");
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
		AuditConfirmationsAuditConfirmationsClosedViewExport.call(this, "csv");
	},

	"click #dataview-export-csv": function(e, t) {
		e.preventDefault();
		AuditConfirmationsAuditConfirmationsClosedViewExport.call(this, "csv");
	},

	"click #dataview-export-tsv": function(e, t) {
		e.preventDefault();
		AuditConfirmationsAuditConfirmationsClosedViewExport.call(this, "tsv");
	},

	"click #dataview-export-json": function(e, t) {
		e.preventDefault();
		AuditConfirmationsAuditConfirmationsClosedViewExport.call(this, "json");
	},

	"click .prev-page-link": function(e, t) {
		e.preventDefault();
		var currentPage = Session.get("AuditsClosedPagedPageNo") || 0;
		if(currentPage > 0) {
			Session.set("AuditsClosedPagedPageNo", currentPage - 1);
		}
	},

	"click .next-page-link": function(e, t) {
		e.preventDefault();
		let currentPage = Session.get("AuditsClosedPagedPageNo") || 0;
		if(currentPage < this.audits_closed_paged_page_count - 1) {
			Session.set("AuditsClosedPagedPageNo", currentPage + 1);
		}
	}

	
});

Template.AuditConfirmationsAuditConfirmationsClosedView.helpers({

	"insertButtonClass": function() {
		return AuditConfirmations.userCanInsert(Meteor.userId(), {}) ? "" : "hidden";
	},

	"isEmpty": function() {
		return !this.audits_closed_paged || this.audits_closed_paged.count() == 0;
	},
	"isNotEmpty": function() {
		return this.audits_closed_paged && this.audits_closed_paged.count() > 0;
	},
	"isNotFound": function() {
		return this.audits_closed_paged && this.audits_closed_paged.count() == 0 && Session.get("AuditsClosedPagedSearchString");
	},
	"gotPrevPage": function() {
		return !!Session.get("AuditsClosedPagedPageNo");
	},
	"gotNextPage": function() {
		return (Session.get("AuditsClosedPagedPageNo") || 0) < this.audits_closed_paged_page_count - 1;
	},
	"searchString": function() {
		return Session.get("AuditsClosedPagedSearchString");
	},
	"viewAsTable": function() {
		return Session.get("AuditConfirmationsAuditConfirmationsClosedViewStyle") == "table";
	},
	"viewAsBlog": function() {
		return Session.get("AuditConfirmationsAuditConfirmationsClosedViewStyle") == "blog";
	},
	"viewAsList": function() {
		return Session.get("AuditConfirmationsAuditConfirmationsClosedViewStyle") == "list";
	},
	"viewAsGallery": function() {
		return Session.get("AuditConfirmationsAuditConfirmationsClosedViewStyle") == "gallery";
	}

	
});


Template.AuditConfirmationsAuditConfirmationsClosedViewTable.onCreated(function() {
	
});

Template.AuditConfirmationsAuditConfirmationsClosedViewTable.onDestroyed(function() {
	
});

Template.AuditConfirmationsAuditConfirmationsClosedViewTable.onRendered(function() {
	
});

Template.AuditConfirmationsAuditConfirmationsClosedViewTable.events({
	"click .th-sortable": function(e, t) {
		e.preventDefault();
		var oldSortBy = Session.get("AuditsClosedPagedSortBy");
		var newSortBy = $(e.target).attr("data-sort");

		Session.set("AuditsClosedPagedSortBy", newSortBy);
		if(oldSortBy == newSortBy) {
			var sortAscending = Session.get("AuditsClosedPagedSortAscending");
			if(typeof sortAscending == "undefined") {
				sortAscending = true;
			}
			Session.set("AuditsClosedPagedSortAscending", !sortAscending);
		} else {
			Session.set("AuditsClosedPagedSortAscending", true);
		}
	}
});

Template.AuditConfirmationsAuditConfirmationsClosedViewTable.helpers({
});


Template.AuditConfirmationsAuditConfirmationsClosedViewTableItems.onCreated(function() {
	
});

Template.AuditConfirmationsAuditConfirmationsClosedViewTableItems.onDestroyed(function() {
	
});

Template.AuditConfirmationsAuditConfirmationsClosedViewTableItems.onRendered(function() {
	
});

Template.AuditConfirmationsAuditConfirmationsClosedViewTableItems.events({
	

	"click td": function(e, t) {
		e.preventDefault();
		var item = this;
		var itemId = item ? item._id : null;

		
		Router.go("audit_confirmations.audit_confirmations_closed.details", mergeObjects(Router.currentRouteParams(), {auditId: this._id}));
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
		Router.go("audit_confirmations.audit_confirmations_closed.edit", mergeObjects(Router.currentRouteParams(), {auditId: this._id}));
		return false;
	}
});

Template.AuditConfirmationsAuditConfirmationsClosedViewTableItems.helpers({
	

	"checked": function(value) { return value ? "checked" : "" }, 
	"editButtonClass": function() {
		return AuditConfirmations.userCanUpdate(Meteor.userId(), this) ? "" : "hidden";
	},

	"deleteButtonClass": function() {
		return AuditConfirmations.userCanRemove(Meteor.userId(), this) ? "" : "hidden";
	}
});
