Template.BrdsBrdsClosed.onCreated(function() {
	
});

Template.BrdsBrdsClosed.onDestroyed(function() {
	
});

Template.BrdsBrdsClosed.onRendered(function() {
	
	Meteor.defer(function() {
		globalOnRendered();
		$("input[autofocus]").focus();
	});
});

Template.BrdsBrdsClosed.events({
	
});

Template.BrdsBrdsClosed.helpers({
	
});


var BrdsBrdsClosedViewExport = function(fileType) {
	var extraParams = {
		searchText: Session.get("BrdsClosedPagedSearchString") || "",
		searchFields: Session.get("BrdsClosedPagedSearchFields") || ["description", "ict_contact", "raised_by", "date_raised", "expected_date_of_closure", "status", "remarks", "date_closed"],
		sortBy: Session.get("BrdsClosedPagedSortBy") || "",
		sortAscending: Session.get("BrdsClosedPagedSortAscending") || true
	};

	var exportFields = ["description", "ict_contact", "raised_by", "date_raised", "expected_date_of_closure", "status", "remarks", "date_closed"];

	

	Meteor.call("brdsClosedPagedExport", extraParams, exportFields, fileType, function(e, data) {
		if(e) {
			alert(e);
			return;
		}

		let filename = "export." + fileType;
		downloadLocalResource(data, filename, "application/octet-stream");
	});
};

Template.BrdsBrdsClosedView.onCreated(function() {
	
});

Template.BrdsBrdsClosedView.onDestroyed(function() {
	
});

Template.BrdsBrdsClosedView.onRendered(function() {
	Session.set("BrdsBrdsClosedViewStyle", "table");
	
});

Template.BrdsBrdsClosedView.events({
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
				Session.set("BrdsClosedPagedSearchString", searchString);
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
					Session.set("BrdsClosedPagedSearchString", searchString);
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
					Session.set("BrdsClosedPagedSearchString", "");
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
		BrdsBrdsClosedViewExport.call(this, "csv");
	},

	"click #dataview-export-csv": function(e, t) {
		e.preventDefault();
		BrdsBrdsClosedViewExport.call(this, "csv");
	},

	"click #dataview-export-tsv": function(e, t) {
		e.preventDefault();
		BrdsBrdsClosedViewExport.call(this, "tsv");
	},

	"click #dataview-export-json": function(e, t) {
		e.preventDefault();
		BrdsBrdsClosedViewExport.call(this, "json");
	},

	"click .prev-page-link": function(e, t) {
		e.preventDefault();
		var currentPage = Session.get("BrdsClosedPagedPageNo") || 0;
		if(currentPage > 0) {
			Session.set("BrdsClosedPagedPageNo", currentPage - 1);
		}
	},

	"click .next-page-link": function(e, t) {
		e.preventDefault();
		let currentPage = Session.get("BrdsClosedPagedPageNo") || 0;
		if(currentPage < this.brds_closed_paged_page_count - 1) {
			Session.set("BrdsClosedPagedPageNo", currentPage + 1);
		}
	}

	
});

Template.BrdsBrdsClosedView.helpers({

	"insertButtonClass": function() {
		return Brds.userCanInsert(Meteor.userId(), {}) ? "" : "hidden";
	},

	"isEmpty": function() {
		return !this.brds_closed_paged || this.brds_closed_paged.count() == 0;
	},
	"isNotEmpty": function() {
		return this.brds_closed_paged && this.brds_closed_paged.count() > 0;
	},
	"isNotFound": function() {
		return this.brds_closed_paged && this.brds_closed_paged.count() == 0 && Session.get("BrdsClosedPagedSearchString");
	},
	"gotPrevPage": function() {
		return !!Session.get("BrdsClosedPagedPageNo");
	},
	"gotNextPage": function() {
		return (Session.get("BrdsClosedPagedPageNo") || 0) < this.brds_closed_paged_page_count - 1;
	},
	"searchString": function() {
		return Session.get("BrdsClosedPagedSearchString");
	},
	"viewAsTable": function() {
		return Session.get("BrdsBrdsClosedViewStyle") == "table";
	},
	"viewAsBlog": function() {
		return Session.get("BrdsBrdsClosedViewStyle") == "blog";
	},
	"viewAsList": function() {
		return Session.get("BrdsBrdsClosedViewStyle") == "list";
	},
	"viewAsGallery": function() {
		return Session.get("BrdsBrdsClosedViewStyle") == "gallery";
	}

	
});


Template.BrdsBrdsClosedViewTable.onCreated(function() {
	
});

Template.BrdsBrdsClosedViewTable.onDestroyed(function() {
	
});

Template.BrdsBrdsClosedViewTable.onRendered(function() {
	
});

Template.BrdsBrdsClosedViewTable.events({
	"click .th-sortable": function(e, t) {
		e.preventDefault();
		var oldSortBy = Session.get("BrdsClosedPagedSortBy");
		var newSortBy = $(e.target).attr("data-sort");

		Session.set("BrdsClosedPagedSortBy", newSortBy);
		if(oldSortBy == newSortBy) {
			var sortAscending = Session.get("BrdsClosedPagedSortAscending");
			if(typeof sortAscending == "undefined") {
				sortAscending = true;
			}
			Session.set("BrdsClosedPagedSortAscending", !sortAscending);
		} else {
			Session.set("BrdsClosedPagedSortAscending", true);
		}
	}
});

Template.BrdsBrdsClosedViewTable.helpers({
});


Template.BrdsBrdsClosedViewTableItems.onCreated(function() {
	
});

Template.BrdsBrdsClosedViewTableItems.onDestroyed(function() {
	
});

Template.BrdsBrdsClosedViewTableItems.onRendered(function() {
	
});

Template.BrdsBrdsClosedViewTableItems.events({
	

	"click td": function(e, t) {
		e.preventDefault();
		var item = this;
		var itemId = item ? item._id : null;

		
		Router.go("brds.brds_closed.details", mergeObjects(Router.currentRouteParams(), {brdId: this._id}));
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
		Router.go("brds.brds_closed.edit", mergeObjects(Router.currentRouteParams(), {brdId: this._id}));
		return false;
	}
});

Template.BrdsBrdsClosedViewTableItems.helpers({
	

	"checked": function(value) { return value ? "checked" : "" }, 
	"editButtonClass": function() {
		return Brds.userCanUpdate(Meteor.userId(), this) ? "" : "hidden";
	},

	"deleteButtonClass": function() {
		return Brds.userCanRemove(Meteor.userId(), this) ? "" : "hidden";
	}
});
