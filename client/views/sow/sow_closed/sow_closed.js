Template.SowSowClosed.onCreated(function() {
	
});

Template.SowSowClosed.onDestroyed(function() {
	
});

Template.SowSowClosed.onRendered(function() {
	
	Meteor.defer(function() {
		globalOnRendered();
		$("input[autofocus]").focus();
	});
});

Template.SowSowClosed.events({
	
});

Template.SowSowClosed.helpers({
	
});


var SowSowClosedViewExport = function(fileType) {
	var extraParams = {
		searchText: Session.get("SowClosedListPagedSearchString") || "",
		searchFields: Session.get("SowClosedListPagedSearchFields") || ["borrower", "amount", "rm"],
		sortBy: Session.get("SowClosedListPagedSortBy") || "",
		sortAscending: Session.get("SowClosedListPagedSortAscending") || true
	};

	var exportFields = ["loo_date", "borrower", "amount", "sow_deadline", "status", "date_closed", "penalty_af_collected", "af_collected", "date_af_collected", "rm"];

	

	Meteor.call("sowClosedListPagedExport", extraParams, exportFields, fileType, function(e, data) {
		if(e) {
			alert(e);
			return;
		}

		let filename = "export." + fileType;
		downloadLocalResource(data, filename, "application/octet-stream");
	});
};

Template.SowSowClosedView.onCreated(function() {
	
});

Template.SowSowClosedView.onDestroyed(function() {
	
});

Template.SowSowClosedView.onRendered(function() {
	Session.set("SowSowClosedViewStyle", "table");
	
});

Template.SowSowClosedView.events({
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
				Session.set("SowClosedListPagedSearchString", searchString);
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
					Session.set("SowClosedListPagedSearchString", searchString);
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
					Session.set("SowClosedListPagedSearchString", "");
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
		SowSowClosedViewExport.call(this, "csv");
	},

	"click #dataview-export-csv": function(e, t) {
		e.preventDefault();
		SowSowClosedViewExport.call(this, "csv");
	},

	"click #dataview-export-tsv": function(e, t) {
		e.preventDefault();
		SowSowClosedViewExport.call(this, "tsv");
	},

	"click #dataview-export-json": function(e, t) {
		e.preventDefault();
		SowSowClosedViewExport.call(this, "json");
	},

	"click .prev-page-link": function(e, t) {
		e.preventDefault();
		var currentPage = Session.get("SowClosedListPagedPageNo") || 0;
		if(currentPage > 0) {
			Session.set("SowClosedListPagedPageNo", currentPage - 1);
		}
	},

	"click .next-page-link": function(e, t) {
		e.preventDefault();
		let currentPage = Session.get("SowClosedListPagedPageNo") || 0;
		if(currentPage < this.sow_closed_list_paged_page_count - 1) {
			Session.set("SowClosedListPagedPageNo", currentPage + 1);
		}
	}

	
});

Template.SowSowClosedView.helpers({

	"insertButtonClass": function() {
		return Sow.userCanInsert(Meteor.userId(), {}) ? "" : "hidden";
	},

	"isEmpty": function() {
		return !this.sow_closed_list_paged || this.sow_closed_list_paged.count() == 0;
	},
	"isNotEmpty": function() {
		return this.sow_closed_list_paged && this.sow_closed_list_paged.count() > 0;
	},
	"isNotFound": function() {
		return this.sow_closed_list_paged && this.sow_closed_list_paged.count() == 0 && Session.get("SowClosedListPagedSearchString");
	},
	"gotPrevPage": function() {
		return !!Session.get("SowClosedListPagedPageNo");
	},
	"gotNextPage": function() {
		return (Session.get("SowClosedListPagedPageNo") || 0) < this.sow_closed_list_paged_page_count - 1;
	},
	"searchString": function() {
		return Session.get("SowClosedListPagedSearchString");
	},
	"viewAsTable": function() {
		return Session.get("SowSowClosedViewStyle") == "table";
	},
	"viewAsBlog": function() {
		return Session.get("SowSowClosedViewStyle") == "blog";
	},
	"viewAsList": function() {
		return Session.get("SowSowClosedViewStyle") == "list";
	},
	"viewAsGallery": function() {
		return Session.get("SowSowClosedViewStyle") == "gallery";
	}

	
});


Template.SowSowClosedViewTable.onCreated(function() {
	
});

Template.SowSowClosedViewTable.onDestroyed(function() {
	
});

Template.SowSowClosedViewTable.onRendered(function() {
	
});

Template.SowSowClosedViewTable.events({
	"click .th-sortable": function(e, t) {
		e.preventDefault();
		var oldSortBy = Session.get("SowClosedListPagedSortBy");
		var newSortBy = $(e.target).attr("data-sort");

		Session.set("SowClosedListPagedSortBy", newSortBy);
		if(oldSortBy == newSortBy) {
			var sortAscending = Session.get("SowClosedListPagedSortAscending");
			if(typeof sortAscending == "undefined") {
				sortAscending = true;
			}
			Session.set("SowClosedListPagedSortAscending", !sortAscending);
		} else {
			Session.set("SowClosedListPagedSortAscending", true);
		}
	}
});

Template.SowSowClosedViewTable.helpers({
});


Template.SowSowClosedViewTableItems.onCreated(function() {
	
});

Template.SowSowClosedViewTableItems.onDestroyed(function() {
	
});

Template.SowSowClosedViewTableItems.onRendered(function() {
	
});

Template.SowSowClosedViewTableItems.events({
	

	"click td": function(e, t) {
		e.preventDefault();
		var item = this;
		var itemId = item ? item._id : null;

		
		Router.go("sow.sow_closed.details", mergeObjects(Router.currentRouteParams(), {sowClosedId: this._id}));
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
		Router.go("sow.sow_closed.update", mergeObjects(Router.currentRouteParams(), {sowClosedId: this._id}));
		return false;
	}
});

Template.SowSowClosedViewTableItems.helpers({
	

	"checked": function(value) { return value ? "checked" : "" }, 
	"editButtonClass": function() {
		return Sow.userCanUpdate(Meteor.userId(), this) ? "" : "hidden";
	},

	"deleteButtonClass": function() {
		return Sow.userCanRemove(Meteor.userId(), this) ? "" : "hidden";
	}
});
