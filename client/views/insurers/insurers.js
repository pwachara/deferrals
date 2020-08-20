Template.Insurers.onCreated(function() {
	
});

Template.Insurers.onDestroyed(function() {
	
});

Template.Insurers.onRendered(function() {
	
	Meteor.defer(function() {
		globalOnRendered();
		$("input[autofocus]").focus();
	});
});

Template.Insurers.events({
	
});

Template.Insurers.helpers({
	
});


var InsurersViewExport = function(fileType) {
	var extraParams = {
		searchText: Session.get("InsurersPagedSearchString") || "",
		searchFields: Session.get("InsurersPagedSearchFields") || ["name"],
		sortBy: Session.get("InsurersPagedSortBy") || "",
		sortAscending: Session.get("InsurersPagedSortAscending") || true
	};

	var exportFields = ["name"];

	

	Meteor.call("insurersPagedExport", extraParams, exportFields, fileType, function(e, data) {
		if(e) {
			alert(e);
			return;
		}

		let filename = "export." + fileType;
		downloadLocalResource(data, filename, "application/octet-stream");
	});
};

Template.InsurersView.onCreated(function() {
	
});

Template.InsurersView.onDestroyed(function() {
	
});

Template.InsurersView.onRendered(function() {
	Session.set("InsurersViewStyle", "table");
	
});

Template.InsurersView.events({
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
				Session.set("InsurersPagedSearchString", searchString);
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
					Session.set("InsurersPagedSearchString", searchString);
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
					Session.set("InsurersPagedSearchString", "");
				}

			}
			return false;
		}

		return true;
	},

	"click #dataview-insert-button": function(e, t) {
		e.preventDefault();
		Router.go("insurers.insert", mergeObjects(Router.currentRouteParams(), {}));
	},

	"click #dataview-export-default": function(e, t) {
		e.preventDefault();
		InsurersViewExport.call(this, "csv");
	},

	"click #dataview-export-csv": function(e, t) {
		e.preventDefault();
		InsurersViewExport.call(this, "csv");
	},

	"click #dataview-export-tsv": function(e, t) {
		e.preventDefault();
		InsurersViewExport.call(this, "tsv");
	},

	"click #dataview-export-json": function(e, t) {
		e.preventDefault();
		InsurersViewExport.call(this, "json");
	},

	"click .prev-page-link": function(e, t) {
		e.preventDefault();
		var currentPage = Session.get("InsurersPagedPageNo") || 0;
		if(currentPage > 0) {
			Session.set("InsurersPagedPageNo", currentPage - 1);
		}
	},

	"click .next-page-link": function(e, t) {
		e.preventDefault();
		let currentPage = Session.get("InsurersPagedPageNo") || 0;
		if(currentPage < this.insurers_paged_page_count - 1) {
			Session.set("InsurersPagedPageNo", currentPage + 1);
		}
	}

	
});

Template.InsurersView.helpers({

	"insertButtonClass": function() {
		return Insurers.userCanInsert(Meteor.userId(), {}) ? "" : "hidden";
	},

	"isEmpty": function() {
		return !this.insurers_paged || this.insurers_paged.count() == 0;
	},
	"isNotEmpty": function() {
		return this.insurers_paged && this.insurers_paged.count() > 0;
	},
	"isNotFound": function() {
		return this.insurers_paged && this.insurers_paged.count() == 0 && Session.get("InsurersPagedSearchString");
	},
	"gotPrevPage": function() {
		return !!Session.get("InsurersPagedPageNo");
	},
	"gotNextPage": function() {
		return (Session.get("InsurersPagedPageNo") || 0) < this.insurers_paged_page_count - 1;
	},
	"searchString": function() {
		return Session.get("InsurersPagedSearchString");
	},
	"viewAsTable": function() {
		return Session.get("InsurersViewStyle") == "table";
	},
	"viewAsBlog": function() {
		return Session.get("InsurersViewStyle") == "blog";
	},
	"viewAsList": function() {
		return Session.get("InsurersViewStyle") == "list";
	},
	"viewAsGallery": function() {
		return Session.get("InsurersViewStyle") == "gallery";
	}

	
});


Template.InsurersViewTable.onCreated(function() {
	
});

Template.InsurersViewTable.onDestroyed(function() {
	
});

Template.InsurersViewTable.onRendered(function() {
	
});

Template.InsurersViewTable.events({
	"click .th-sortable": function(e, t) {
		e.preventDefault();
		var oldSortBy = Session.get("InsurersPagedSortBy");
		var newSortBy = $(e.target).attr("data-sort");

		Session.set("InsurersPagedSortBy", newSortBy);
		if(oldSortBy == newSortBy) {
			var sortAscending = Session.get("InsurersPagedSortAscending");
			if(typeof sortAscending == "undefined") {
				sortAscending = true;
			}
			Session.set("InsurersPagedSortAscending", !sortAscending);
		} else {
			Session.set("InsurersPagedSortAscending", true);
		}
	}
});

Template.InsurersViewTable.helpers({
});


Template.InsurersViewTableItems.onCreated(function() {
	
});

Template.InsurersViewTableItems.onDestroyed(function() {
	
});

Template.InsurersViewTableItems.onRendered(function() {
	
});

Template.InsurersViewTableItems.events({
	

	"click td": function(e, t) {
		e.preventDefault();
		var item = this;
		var itemId = item ? item._id : null;

		
		Router.go("insurers.details", mergeObjects(Router.currentRouteParams(), {insurerId: this._id}));
		return false;
	},

	"click .inline-checkbox": function(e, t) {
		e.preventDefault();

		if(!this || !this._id) return false;

		var fieldName = $(e.currentTarget).attr("data-field");
		if(!fieldName) return false;

		var values = {};
		values[fieldName] = !this[fieldName];

		Meteor.call("insurersUpdate", this._id, values, function(err, res) {
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
						Meteor.call("insurersRemove", me._id, function(err, res) {
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
		Router.go("insurers.edit", mergeObjects(Router.currentRouteParams(), {insurerId: this._id}));
		return false;
	}
});

Template.InsurersViewTableItems.helpers({
	

	"checked": function(value) { return value ? "checked" : "" }, 
	"editButtonClass": function() {
		return Insurers.userCanUpdate(Meteor.userId(), this) ? "" : "hidden";
	},

	"deleteButtonClass": function() {
		return Insurers.userCanRemove(Meteor.userId(), this) ? "" : "hidden";
	}
});
