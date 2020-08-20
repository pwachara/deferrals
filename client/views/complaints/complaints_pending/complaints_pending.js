Template.ComplaintsComplaintsPending.onCreated(function() {
	
});

Template.ComplaintsComplaintsPending.onDestroyed(function() {
	
});

Template.ComplaintsComplaintsPending.onRendered(function() {
	
	Meteor.defer(function() {
		globalOnRendered();
		$("input[autofocus]").focus();
	});
});

Template.ComplaintsComplaintsPending.events({
	
});

Template.ComplaintsComplaintsPending.helpers({
	
});


var ComplaintsComplaintsPendingViewExport = function(fileType) {
	var extraParams = {
		searchText: Session.get("ComplaintsPendingPagedSearchString") || "",
		searchFields: Session.get("ComplaintsPendingPagedSearchFields") || ["complaint_date", "unit", "staff_name", "complainant", "is_staff", "complainant_contact", "complaint_description", "how_resolved", "status", "date_closed"],
		sortBy: Session.get("ComplaintsPendingPagedSortBy") || "",
		sortAscending: Session.get("ComplaintsPendingPagedSortAscending") || true
	};

	var exportFields = ["complaint_date", "unit", "staff_name", "complainant", "is_staff", "complainant_contact", "complaint_description", "how_resolved", "status", "date_closed"];

	

	Meteor.call("complaintsPendingPagedExport", extraParams, exportFields, fileType, function(e, data) {
		if(e) {
			alert(e);
			return;
		}

		let filename = "export." + fileType;
		downloadLocalResource(data, filename, "application/octet-stream");
	});
};

Template.ComplaintsComplaintsPendingView.onCreated(function() {
	
});

Template.ComplaintsComplaintsPendingView.onDestroyed(function() {
	
});

Template.ComplaintsComplaintsPendingView.onRendered(function() {
	Session.set("ComplaintsComplaintsPendingViewStyle", "table");
	
});

Template.ComplaintsComplaintsPendingView.events({
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
				Session.set("ComplaintsPendingPagedSearchString", searchString);
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
					Session.set("ComplaintsPendingPagedSearchString", searchString);
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
					Session.set("ComplaintsPendingPagedSearchString", "");
				}

			}
			return false;
		}

		return true;
	},

	"click #dataview-insert-button": function(e, t) {
		e.preventDefault();
		Router.go("complaints.complaints_pending.insert", mergeObjects(Router.currentRouteParams(), {}));
	},

	"click #dataview-export-default": function(e, t) {
		e.preventDefault();
		ComplaintsComplaintsPendingViewExport.call(this, "csv");
	},

	"click #dataview-export-csv": function(e, t) {
		e.preventDefault();
		ComplaintsComplaintsPendingViewExport.call(this, "csv");
	},

	"click #dataview-export-tsv": function(e, t) {
		e.preventDefault();
		ComplaintsComplaintsPendingViewExport.call(this, "tsv");
	},

	"click #dataview-export-json": function(e, t) {
		e.preventDefault();
		ComplaintsComplaintsPendingViewExport.call(this, "json");
	},

	"click .prev-page-link": function(e, t) {
		e.preventDefault();
		var currentPage = Session.get("ComplaintsPendingPagedPageNo") || 0;
		if(currentPage > 0) {
			Session.set("ComplaintsPendingPagedPageNo", currentPage - 1);
		}
	},

	"click .next-page-link": function(e, t) {
		e.preventDefault();
		let currentPage = Session.get("ComplaintsPendingPagedPageNo") || 0;
		if(currentPage < this.complaints_pending_paged_page_count - 1) {
			Session.set("ComplaintsPendingPagedPageNo", currentPage + 1);
		}
	}

	
});

Template.ComplaintsComplaintsPendingView.helpers({

	"insertButtonClass": function() {
		return Complaints.userCanInsert(Meteor.userId(), {}) ? "" : "hidden";
	},

	"isEmpty": function() {
		return !this.complaints_pending_paged || this.complaints_pending_paged.count() == 0;
	},
	"isNotEmpty": function() {
		return this.complaints_pending_paged && this.complaints_pending_paged.count() > 0;
	},
	"isNotFound": function() {
		return this.complaints_pending_paged && this.complaints_pending_paged.count() == 0 && Session.get("ComplaintsPendingPagedSearchString");
	},
	"gotPrevPage": function() {
		return !!Session.get("ComplaintsPendingPagedPageNo");
	},
	"gotNextPage": function() {
		return (Session.get("ComplaintsPendingPagedPageNo") || 0) < this.complaints_pending_paged_page_count - 1;
	},
	"searchString": function() {
		return Session.get("ComplaintsPendingPagedSearchString");
	},
	"viewAsTable": function() {
		return Session.get("ComplaintsComplaintsPendingViewStyle") == "table";
	},
	"viewAsBlog": function() {
		return Session.get("ComplaintsComplaintsPendingViewStyle") == "blog";
	},
	"viewAsList": function() {
		return Session.get("ComplaintsComplaintsPendingViewStyle") == "list";
	},
	"viewAsGallery": function() {
		return Session.get("ComplaintsComplaintsPendingViewStyle") == "gallery";
	}

	
});


Template.ComplaintsComplaintsPendingViewTable.onCreated(function() {
	
});

Template.ComplaintsComplaintsPendingViewTable.onDestroyed(function() {
	
});

Template.ComplaintsComplaintsPendingViewTable.onRendered(function() {
	
});

Template.ComplaintsComplaintsPendingViewTable.events({
	"click .th-sortable": function(e, t) {
		e.preventDefault();
		var oldSortBy = Session.get("ComplaintsPendingPagedSortBy");
		var newSortBy = $(e.target).attr("data-sort");

		Session.set("ComplaintsPendingPagedSortBy", newSortBy);
		if(oldSortBy == newSortBy) {
			var sortAscending = Session.get("ComplaintsPendingPagedSortAscending");
			if(typeof sortAscending == "undefined") {
				sortAscending = true;
			}
			Session.set("ComplaintsPendingPagedSortAscending", !sortAscending);
		} else {
			Session.set("ComplaintsPendingPagedSortAscending", true);
		}
	}
});

Template.ComplaintsComplaintsPendingViewTable.helpers({
});


Template.ComplaintsComplaintsPendingViewTableItems.onCreated(function() {
	
});

Template.ComplaintsComplaintsPendingViewTableItems.onDestroyed(function() {
	
});

Template.ComplaintsComplaintsPendingViewTableItems.onRendered(function() {
	
});

Template.ComplaintsComplaintsPendingViewTableItems.events({
	

	"click td": function(e, t) {
		e.preventDefault();
		var item = this;
		var itemId = item ? item._id : null;

		
		Router.go("complaints.complaints_pending.details", mergeObjects(Router.currentRouteParams(), {complaintId: this._id}));
		return false;
	},

	"click .inline-checkbox": function(e, t) {
		e.preventDefault();

		if(!this || !this._id) return false;

		var fieldName = $(e.currentTarget).attr("data-field");
		if(!fieldName) return false;

		var values = {};
		values[fieldName] = !this[fieldName];

		Meteor.call("complaintsUpdate", this._id, values, function(err, res) {
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
						Meteor.call("complaintsRemove", me._id, function(err, res) {
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
		Router.go("complaints.complaints_pending.edit", mergeObjects(Router.currentRouteParams(), {complaintId: this._id}));
		return false;
	}
});

Template.ComplaintsComplaintsPendingViewTableItems.helpers({
	

	"checked": function(value) { return value ? "checked" : "" }, 
	"editButtonClass": function() {
		return Complaints.userCanUpdate(Meteor.userId(), this) ? "" : "hidden";
	},

	"deleteButtonClass": function() {
		return Complaints.userCanRemove(Meteor.userId(), this) ? "" : "hidden";
	}
});
