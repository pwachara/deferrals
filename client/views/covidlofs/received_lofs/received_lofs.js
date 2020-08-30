Template.CovidlofsReceivedLofs.onCreated(function() {
	
});

Template.CovidlofsReceivedLofs.onDestroyed(function() {
	
});

Template.CovidlofsReceivedLofs.onRendered(function() {
	
	Meteor.defer(function() {
		globalOnRendered();
		$("input[autofocus]").focus();
	});
});

Template.CovidlofsReceivedLofs.events({
	
});

Template.CovidlofsReceivedLofs.helpers({
	
});


var CovidlofsReceivedLofsViewExport = function(fileType) {
	var extraParams = {
		searchText: Session.get("ReceivedLofListPagedSearchString") || "",
		searchFields: Session.get("ReceivedLofListPagedSearchFields") || ["borrower", "rm", "rm_email", "lof_received", "banking_segmentId", "banking_segment.name", "lof_due_date"],
		sortBy: Session.get("ReceivedLofListPagedSortBy") || "",
		sortAscending: Session.get("ReceivedLofListPagedSortAscending") || true
	};

	var exportFields = ["date", "borrower", "rm", "rm_email", "escalate_to", "lof_received", "date_received", "banking_segment.name", "lof_due_date"];

	

	Meteor.call("receivedLofListPagedExport", extraParams, exportFields, fileType, function(e, data) {
		if(e) {
			alert(e);
			return;
		}

		let filename = "export." + fileType;
		downloadLocalResource(data, filename, "application/octet-stream");
	});
};

Template.CovidlofsReceivedLofsView.onCreated(function() {
	
});

Template.CovidlofsReceivedLofsView.onDestroyed(function() {
	
});

Template.CovidlofsReceivedLofsView.onRendered(function() {
	Session.set("CovidlofsReceivedLofsViewStyle", "table");
	
});

Template.CovidlofsReceivedLofsView.events({
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
				Session.set("ReceivedLofListPagedSearchString", searchString);
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
					Session.set("ReceivedLofListPagedSearchString", searchString);
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
					Session.set("ReceivedLofListPagedSearchString", "");
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
		CovidlofsReceivedLofsViewExport.call(this, "csv");
	},

	"click #dataview-export-csv": function(e, t) {
		e.preventDefault();
		CovidlofsReceivedLofsViewExport.call(this, "csv");
	},

	"click #dataview-export-tsv": function(e, t) {
		e.preventDefault();
		CovidlofsReceivedLofsViewExport.call(this, "tsv");
	},

	"click #dataview-export-json": function(e, t) {
		e.preventDefault();
		CovidlofsReceivedLofsViewExport.call(this, "json");
	},

	"click .prev-page-link": function(e, t) {
		e.preventDefault();
		var currentPage = Session.get("ReceivedLofListPagedPageNo") || 0;
		if(currentPage > 0) {
			Session.set("ReceivedLofListPagedPageNo", currentPage - 1);
		}
	},

	"click .next-page-link": function(e, t) {
		e.preventDefault();
		let currentPage = Session.get("ReceivedLofListPagedPageNo") || 0;
		if(currentPage < this.received_lof_list_paged_page_count - 1) {
			Session.set("ReceivedLofListPagedPageNo", currentPage + 1);
		}
	}

	
});

Template.CovidlofsReceivedLofsView.helpers({

	"insertButtonClass": function() {
		return Covidlofs.userCanInsert(Meteor.userId(), {}) ? "" : "hidden";
	},

	"isEmpty": function() {
		return !this.received_lof_list_paged || this.received_lof_list_paged.count() == 0;
	},
	"isNotEmpty": function() {
		return this.received_lof_list_paged && this.received_lof_list_paged.count() > 0;
	},
	"isNotFound": function() {
		return this.received_lof_list_paged && this.received_lof_list_paged.count() == 0 && Session.get("ReceivedLofListPagedSearchString");
	},
	"gotPrevPage": function() {
		return !!Session.get("ReceivedLofListPagedPageNo");
	},
	"gotNextPage": function() {
		return (Session.get("ReceivedLofListPagedPageNo") || 0) < this.received_lof_list_paged_page_count - 1;
	},
	"searchString": function() {
		return Session.get("ReceivedLofListPagedSearchString");
	},
	"viewAsTable": function() {
		return Session.get("CovidlofsReceivedLofsViewStyle") == "table";
	},
	"viewAsBlog": function() {
		return Session.get("CovidlofsReceivedLofsViewStyle") == "blog";
	},
	"viewAsList": function() {
		return Session.get("CovidlofsReceivedLofsViewStyle") == "list";
	},
	"viewAsGallery": function() {
		return Session.get("CovidlofsReceivedLofsViewStyle") == "gallery";
	}

	
});


Template.CovidlofsReceivedLofsViewTable.onCreated(function() {
	
});

Template.CovidlofsReceivedLofsViewTable.onDestroyed(function() {
	
});

Template.CovidlofsReceivedLofsViewTable.onRendered(function() {
	
});

Template.CovidlofsReceivedLofsViewTable.events({
	"click .th-sortable": function(e, t) {
		e.preventDefault();
		var oldSortBy = Session.get("ReceivedLofListPagedSortBy");
		var newSortBy = $(e.target).attr("data-sort");

		Session.set("ReceivedLofListPagedSortBy", newSortBy);
		if(oldSortBy == newSortBy) {
			var sortAscending = Session.get("ReceivedLofListPagedSortAscending");
			if(typeof sortAscending == "undefined") {
				sortAscending = true;
			}
			Session.set("ReceivedLofListPagedSortAscending", !sortAscending);
		} else {
			Session.set("ReceivedLofListPagedSortAscending", true);
		}
	}
});

Template.CovidlofsReceivedLofsViewTable.helpers({
});


Template.CovidlofsReceivedLofsViewTableItems.onCreated(function() {
	
});

Template.CovidlofsReceivedLofsViewTableItems.onDestroyed(function() {
	
});

Template.CovidlofsReceivedLofsViewTableItems.onRendered(function() {
	
});

Template.CovidlofsReceivedLofsViewTableItems.events({
	

	"click td": function(e, t) {
		e.preventDefault();
		var item = this;
		var itemId = item ? item._id : null;

		
		Router.go("covidlofs.received_lofs.details", mergeObjects(Router.currentRouteParams(), {receivedLofId: this._id}));
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
		Router.go("covidlofs.received_lofs.update", mergeObjects(Router.currentRouteParams(), {receivedLofId: this._id}));
		return false;
	}
});

Template.CovidlofsReceivedLofsViewTableItems.helpers({
	

	"checked": function(value) { return value ? "checked" : "" }, 
	"editButtonClass": function() {
		return Covidlofs.userCanUpdate(Meteor.userId(), this) ? "" : "hidden";
	},

	"deleteButtonClass": function() {
		return Covidlofs.userCanRemove(Meteor.userId(), this) ? "" : "hidden";
	}
});
