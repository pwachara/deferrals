Template.ComplaintsComplaintsClosed.onCreated(function() {
	
});

Template.ComplaintsComplaintsClosed.onDestroyed(function() {
	
});

Template.ComplaintsComplaintsClosed.onRendered(function() {
	
	Meteor.defer(function() {
		globalOnRendered();
		$("input[autofocus]").focus();
	});
});

Template.ComplaintsComplaintsClosed.events({
	
});

Template.ComplaintsComplaintsClosed.helpers({
	
});


var ComplaintsComplaintsClosedViewExport = function(fileType) {
	var extraParams = {
		searchText: Session.get("ComplaintsClosedPagedSearchString") || "",
		searchFields: Session.get("ComplaintsClosedPagedSearchFields") || ["complaint_date", "unit", "staff_name", "complainant", "is_staff", "complainant_contact", "complaint_description", "how_resolved", "status", "date_closed"],
		sortBy: Session.get("ComplaintsClosedPagedSortBy") || "",
		sortAscending: Session.get("ComplaintsClosedPagedSortAscending") || true
	};

	var exportFields = ["complaint_date", "unit", "staff_name", "complainant", "is_staff", "complainant_contact", "complaint_description", "how_resolved", "status", "date_closed"];

	

	Meteor.call("complaintsClosedPagedExport", extraParams, exportFields, fileType, function(e, data) {
		if(e) {
			alert(e);
			return;
		}

		let filename = "export." + fileType;
		downloadLocalResource(data, filename, "application/octet-stream");
	});
};

Template.ComplaintsComplaintsClosedView.onCreated(function() {
	
});

Template.ComplaintsComplaintsClosedView.onDestroyed(function() {
	
});

Template.ComplaintsComplaintsClosedView.onRendered(function() {
	Session.set("ComplaintsComplaintsClosedViewStyle", "table");
	
});

Template.ComplaintsComplaintsClosedView.events({
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
				Session.set("ComplaintsClosedPagedSearchString", searchString);
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
					Session.set("ComplaintsClosedPagedSearchString", searchString);
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
					Session.set("ComplaintsClosedPagedSearchString", "");
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
		ComplaintsComplaintsClosedViewExport.call(this, "csv");
	},

	"click #dataview-export-csv": function(e, t) {
		e.preventDefault();
		ComplaintsComplaintsClosedViewExport.call(this, "csv");
	},

	"click #dataview-export-tsv": function(e, t) {
		e.preventDefault();
		ComplaintsComplaintsClosedViewExport.call(this, "tsv");
	},

	"click #dataview-export-json": function(e, t) {
		e.preventDefault();
		ComplaintsComplaintsClosedViewExport.call(this, "json");
	},

	"click .prev-page-link": function(e, t) {
		e.preventDefault();
		var currentPage = Session.get("ComplaintsClosedPagedPageNo") || 0;
		if(currentPage > 0) {
			Session.set("ComplaintsClosedPagedPageNo", currentPage - 1);
		}
	},

	"click .next-page-link": function(e, t) {
		e.preventDefault();
		let currentPage = Session.get("ComplaintsClosedPagedPageNo") || 0;
		if(currentPage < this.complaints_closed_paged_page_count - 1) {
			Session.set("ComplaintsClosedPagedPageNo", currentPage + 1);
		}
	}

	
});

Template.ComplaintsComplaintsClosedView.helpers({

	"insertButtonClass": function() {
		return Complaints.userCanInsert(Meteor.userId(), {}) ? "" : "hidden";
	},

	"isEmpty": function() {
		return !this.complaints_closed_paged || this.complaints_closed_paged.count() == 0;
	},
	"isNotEmpty": function() {
		return this.complaints_closed_paged && this.complaints_closed_paged.count() > 0;
	},
	"isNotFound": function() {
		return this.complaints_closed_paged && this.complaints_closed_paged.count() == 0 && Session.get("ComplaintsClosedPagedSearchString");
	},
	"gotPrevPage": function() {
		return !!Session.get("ComplaintsClosedPagedPageNo");
	},
	"gotNextPage": function() {
		return (Session.get("ComplaintsClosedPagedPageNo") || 0) < this.complaints_closed_paged_page_count - 1;
	},
	"searchString": function() {
		return Session.get("ComplaintsClosedPagedSearchString");
	},
	"viewAsTable": function() {
		return Session.get("ComplaintsComplaintsClosedViewStyle") == "table";
	},
	"viewAsBlog": function() {
		return Session.get("ComplaintsComplaintsClosedViewStyle") == "blog";
	},
	"viewAsList": function() {
		return Session.get("ComplaintsComplaintsClosedViewStyle") == "list";
	},
	"viewAsGallery": function() {
		return Session.get("ComplaintsComplaintsClosedViewStyle") == "gallery";
	}

	
});


Template.ComplaintsComplaintsClosedViewTable.onCreated(function() {
	
});

Template.ComplaintsComplaintsClosedViewTable.onDestroyed(function() {
	
});

Template.ComplaintsComplaintsClosedViewTable.onRendered(function() {
	
});

Template.ComplaintsComplaintsClosedViewTable.events({
	"click .th-sortable": function(e, t) {
		e.preventDefault();
		var oldSortBy = Session.get("ComplaintsClosedPagedSortBy");
		var newSortBy = $(e.target).attr("data-sort");

		Session.set("ComplaintsClosedPagedSortBy", newSortBy);
		if(oldSortBy == newSortBy) {
			var sortAscending = Session.get("ComplaintsClosedPagedSortAscending");
			if(typeof sortAscending == "undefined") {
				sortAscending = true;
			}
			Session.set("ComplaintsClosedPagedSortAscending", !sortAscending);
		} else {
			Session.set("ComplaintsClosedPagedSortAscending", true);
		}
	}
});

Template.ComplaintsComplaintsClosedViewTable.helpers({
});


Template.ComplaintsComplaintsClosedViewTableItems.onCreated(function() {
	
});

Template.ComplaintsComplaintsClosedViewTableItems.onDestroyed(function() {
	
});

Template.ComplaintsComplaintsClosedViewTableItems.onRendered(function() {
	
});

Template.ComplaintsComplaintsClosedViewTableItems.events({
	

	"click td": function(e, t) {
		e.preventDefault();
		var item = this;
		var itemId = item ? item._id : null;

		
		Router.go("complaints.complaints_closed.details", mergeObjects(Router.currentRouteParams(), {complaintId: this._id}));
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
		Router.go("complaints.complaints_closed.edit", mergeObjects(Router.currentRouteParams(), {complaintId: this._id}));
		return false;
	}
});

Template.ComplaintsComplaintsClosedViewTableItems.helpers({
	

	"checked": function(value) { return value ? "checked" : "" }, 
	"editButtonClass": function() {
		return Complaints.userCanUpdate(Meteor.userId(), this) ? "" : "hidden";
	},

	"deleteButtonClass": function() {
		return Complaints.userCanRemove(Meteor.userId(), this) ? "" : "hidden";
	}
});
