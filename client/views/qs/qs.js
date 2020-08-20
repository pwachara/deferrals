Template.Qs.onCreated(function() {
	
});

Template.Qs.onDestroyed(function() {
	
});

Template.Qs.onRendered(function() {
	
	Meteor.defer(function() {
		globalOnRendered();
		$("input[autofocus]").focus();
	});
});

Template.Qs.events({
	
});

Template.Qs.helpers({
	
});


var QsViewExport = function(fileType) {
	var extraParams = {
		searchText: Session.get("QsListPagedSearchString") || "",
		searchFields: Session.get("QsListPagedSearchFields") || ["name", "insurer.name", "contacts", "notes"],
		sortBy: Session.get("QsListPagedSortBy") || "",
		sortAscending: Session.get("QsListPagedSortAscending") || true
	};

	var exportFields = ["indemnity_cover", "insurer.name", "indemnity_expiry", "in_panel"];

	

	Meteor.call("qsListPagedExport", extraParams, exportFields, fileType, function(e, data) {
		if(e) {
			alert(e);
			return;
		}

		let filename = "export." + fileType;
		downloadLocalResource(data, filename, "application/octet-stream");
	});
};

Template.QsView.onCreated(function() {
	
});

Template.QsView.onDestroyed(function() {
	
});

Template.QsView.onRendered(function() {
	Session.set("QsViewStyle", "table");
	
});

Template.QsView.events({
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
				Session.set("QsListPagedSearchString", searchString);
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
					Session.set("QsListPagedSearchString", searchString);
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
					Session.set("QsListPagedSearchString", "");
				}

			}
			return false;
		}

		return true;
	},

	"click #dataview-insert-button": function(e, t) {
		e.preventDefault();
		Router.go("qs.insert", mergeObjects(Router.currentRouteParams(), {}));
	},

	"click #dataview-export-default": function(e, t) {
		e.preventDefault();
		QsViewExport.call(this, "csv");
	},

	"click #dataview-export-csv": function(e, t) {
		e.preventDefault();
		QsViewExport.call(this, "csv");
	},

	"click #dataview-export-tsv": function(e, t) {
		e.preventDefault();
		QsViewExport.call(this, "tsv");
	},

	"click #dataview-export-json": function(e, t) {
		e.preventDefault();
		QsViewExport.call(this, "json");
	},

	"click .prev-page-link": function(e, t) {
		e.preventDefault();
		var currentPage = Session.get("QsListPagedPageNo") || 0;
		if(currentPage > 0) {
			Session.set("QsListPagedPageNo", currentPage - 1);
		}
	},

	"click .next-page-link": function(e, t) {
		e.preventDefault();
		let currentPage = Session.get("QsListPagedPageNo") || 0;
		if(currentPage < this.qs_list_paged_page_count - 1) {
			Session.set("QsListPagedPageNo", currentPage + 1);
		}
	}

	
});

Template.QsView.helpers({

	"insertButtonClass": function() {
		return Qs.userCanInsert(Meteor.userId(), {}) ? "" : "hidden";
	},

	"isEmpty": function() {
		return !this.qs_list_paged || this.qs_list_paged.count() == 0;
	},
	"isNotEmpty": function() {
		return this.qs_list_paged && this.qs_list_paged.count() > 0;
	},
	"isNotFound": function() {
		return this.qs_list_paged && this.qs_list_paged.count() == 0 && Session.get("QsListPagedSearchString");
	},
	"gotPrevPage": function() {
		return !!Session.get("QsListPagedPageNo");
	},
	"gotNextPage": function() {
		return (Session.get("QsListPagedPageNo") || 0) < this.qs_list_paged_page_count - 1;
	},
	"searchString": function() {
		return Session.get("QsListPagedSearchString");
	},
	"viewAsTable": function() {
		return Session.get("QsViewStyle") == "table";
	},
	"viewAsBlog": function() {
		return Session.get("QsViewStyle") == "blog";
	},
	"viewAsList": function() {
		return Session.get("QsViewStyle") == "list";
	},
	"viewAsGallery": function() {
		return Session.get("QsViewStyle") == "gallery";
	}

	
});


Template.QsViewTable.onCreated(function() {
	
});

Template.QsViewTable.onDestroyed(function() {
	
});

Template.QsViewTable.onRendered(function() {
	
});

Template.QsViewTable.events({
	"click .th-sortable": function(e, t) {
		e.preventDefault();
		var oldSortBy = Session.get("QsListPagedSortBy");
		var newSortBy = $(e.target).attr("data-sort");

		Session.set("QsListPagedSortBy", newSortBy);
		if(oldSortBy == newSortBy) {
			var sortAscending = Session.get("QsListPagedSortAscending");
			if(typeof sortAscending == "undefined") {
				sortAscending = true;
			}
			Session.set("QsListPagedSortAscending", !sortAscending);
		} else {
			Session.set("QsListPagedSortAscending", true);
		}
	}
});

Template.QsViewTable.helpers({
});


Template.QsViewTableItems.onCreated(function() {
	
});

Template.QsViewTableItems.onDestroyed(function() {
	
});

Template.QsViewTableItems.onRendered(function() {
	
});

Template.QsViewTableItems.events({
	

	"click td": function(e, t) {
		e.preventDefault();
		var item = this;
		var itemId = item ? item._id : null;

		
		Router.go("qs.details", mergeObjects(Router.currentRouteParams(), {qsId: this._id}));
		return false;
	},

	"click .inline-checkbox": function(e, t) {
		e.preventDefault();

		if(!this || !this._id) return false;

		var fieldName = $(e.currentTarget).attr("data-field");
		if(!fieldName) return false;

		var values = {};
		values[fieldName] = !this[fieldName];

		Meteor.call("qsUpdate", this._id, values, function(err, res) {
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
						Meteor.call("qsRemove", me._id, function(err, res) {
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
		Router.go("qs.update", mergeObjects(Router.currentRouteParams(), {qsId: this._id}));
		return false;
	}
});

Template.QsViewTableItems.helpers({
	

	"checked": function(value) { return value ? "checked" : "" }, 
	"editButtonClass": function() {
		return Qs.userCanUpdate(Meteor.userId(), this) ? "" : "hidden";
	},

	"deleteButtonClass": function() {
		return Qs.userCanRemove(Meteor.userId(), this) ? "" : "hidden";
	}
});
