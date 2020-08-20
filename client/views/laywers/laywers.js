Template.Laywers.onCreated(function() {
	
});

Template.Laywers.onDestroyed(function() {
	
});

Template.Laywers.onRendered(function() {
	
	Meteor.defer(function() {
		globalOnRendered();
		$("input[autofocus]").focus();
	});
});

Template.Laywers.events({
	
});

Template.Laywers.helpers({
	
});


var LaywersViewExport = function(fileType) {
	var extraParams = {
		searchText: Session.get("LawyersPagedSearchString") || "",
		searchFields: Session.get("LawyersPagedSearchFields") || ["name", "insurerId", "insurer.name", "is_in_panel", "notes"],
		sortBy: Session.get("LawyersPagedSortBy") || "",
		sortAscending: Session.get("LawyersPagedSortAscending") || true
	};

	var exportFields = ["name", "indemnity_cover_amount", "insurer.name", "pi_expiry_date", "is_in_panel", "contacts", "notes"];

	

	Meteor.call("lawyersPagedExport", extraParams, exportFields, fileType, function(e, data) {
		if(e) {
			alert(e);
			return;
		}

		let filename = "export." + fileType;
		downloadLocalResource(data, filename, "application/octet-stream");
	});
};

Template.LaywersView.onCreated(function() {
	
});

Template.LaywersView.onDestroyed(function() {
	
});

Template.LaywersView.onRendered(function() {
	Session.set("LaywersViewStyle", "table");
	
});

Template.LaywersView.events({
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
				Session.set("LawyersPagedSearchString", searchString);
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
					Session.set("LawyersPagedSearchString", searchString);
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
					Session.set("LawyersPagedSearchString", "");
				}

			}
			return false;
		}

		return true;
	},

	"click #dataview-insert-button": function(e, t) {
		e.preventDefault();
		Router.go("laywers.insert", mergeObjects(Router.currentRouteParams(), {}));
	},

	"click #dataview-export-default": function(e, t) {
		e.preventDefault();
		LaywersViewExport.call(this, "csv");
	},

	"click #dataview-export-csv": function(e, t) {
		e.preventDefault();
		LaywersViewExport.call(this, "csv");
	},

	"click #dataview-export-tsv": function(e, t) {
		e.preventDefault();
		LaywersViewExport.call(this, "tsv");
	},

	"click #dataview-export-json": function(e, t) {
		e.preventDefault();
		LaywersViewExport.call(this, "json");
	},

	"click .prev-page-link": function(e, t) {
		e.preventDefault();
		var currentPage = Session.get("LawyersPagedPageNo") || 0;
		if(currentPage > 0) {
			Session.set("LawyersPagedPageNo", currentPage - 1);
		}
	},

	"click .next-page-link": function(e, t) {
		e.preventDefault();
		let currentPage = Session.get("LawyersPagedPageNo") || 0;
		if(currentPage < this.lawyers_paged_page_count - 1) {
			Session.set("LawyersPagedPageNo", currentPage + 1);
		}
	}

	
});

Template.LaywersView.helpers({

	"insertButtonClass": function() {
		return Lawyers.userCanInsert(Meteor.userId(), {}) ? "" : "hidden";
	},

	"isEmpty": function() {
		return !this.lawyers_paged || this.lawyers_paged.count() == 0;
	},
	"isNotEmpty": function() {
		return this.lawyers_paged && this.lawyers_paged.count() > 0;
	},
	"isNotFound": function() {
		return this.lawyers_paged && this.lawyers_paged.count() == 0 && Session.get("LawyersPagedSearchString");
	},
	"gotPrevPage": function() {
		return !!Session.get("LawyersPagedPageNo");
	},
	"gotNextPage": function() {
		return (Session.get("LawyersPagedPageNo") || 0) < this.lawyers_paged_page_count - 1;
	},
	"searchString": function() {
		return Session.get("LawyersPagedSearchString");
	},
	"viewAsTable": function() {
		return Session.get("LaywersViewStyle") == "table";
	},
	"viewAsBlog": function() {
		return Session.get("LaywersViewStyle") == "blog";
	},
	"viewAsList": function() {
		return Session.get("LaywersViewStyle") == "list";
	},
	"viewAsGallery": function() {
		return Session.get("LaywersViewStyle") == "gallery";
	}

	
});


Template.LaywersViewTable.onCreated(function() {
	
});

Template.LaywersViewTable.onDestroyed(function() {
	
});

Template.LaywersViewTable.onRendered(function() {
	
});

Template.LaywersViewTable.events({
	"click .th-sortable": function(e, t) {
		e.preventDefault();
		var oldSortBy = Session.get("LawyersPagedSortBy");
		var newSortBy = $(e.target).attr("data-sort");

		Session.set("LawyersPagedSortBy", newSortBy);
		if(oldSortBy == newSortBy) {
			var sortAscending = Session.get("LawyersPagedSortAscending");
			if(typeof sortAscending == "undefined") {
				sortAscending = true;
			}
			Session.set("LawyersPagedSortAscending", !sortAscending);
		} else {
			Session.set("LawyersPagedSortAscending", true);
		}
	}
});

Template.LaywersViewTable.helpers({
});


Template.LaywersViewTableItems.onCreated(function() {
	
});

Template.LaywersViewTableItems.onDestroyed(function() {
	
});

Template.LaywersViewTableItems.onRendered(function() {
	
});

Template.LaywersViewTableItems.events({
	

	"click td": function(e, t) {
		e.preventDefault();
		var item = this;
		var itemId = item ? item._id : null;

		
		Router.go("laywers.details", mergeObjects(Router.currentRouteParams(), {lawyerId: this._id}));
		return false;
	},

	"click .inline-checkbox": function(e, t) {
		e.preventDefault();

		if(!this || !this._id) return false;

		var fieldName = $(e.currentTarget).attr("data-field");
		if(!fieldName) return false;

		var values = {};
		values[fieldName] = !this[fieldName];

		Meteor.call("lawyersUpdate", this._id, values, function(err, res) {
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
						Meteor.call("lawyersRemove", me._id, function(err, res) {
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
		Router.go("laywers.edit", mergeObjects(Router.currentRouteParams(), {lawyerId: this._id}));
		return false;
	}
});

Template.LaywersViewTableItems.helpers({
	

	"checked": function(value) { return value ? "checked" : "" }, 
	"editButtonClass": function() {
		return Lawyers.userCanUpdate(Meteor.userId(), this) ? "" : "hidden";
	},

	"deleteButtonClass": function() {
		return Lawyers.userCanRemove(Meteor.userId(), this) ? "" : "hidden";
	}
});
