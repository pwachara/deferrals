Template.Valuers.onCreated(function() {
	
});

Template.Valuers.onDestroyed(function() {
	
});

Template.Valuers.onRendered(function() {
	
	Meteor.defer(function() {
		globalOnRendered();
		$("input[autofocus]").focus();
	});
});

Template.Valuers.events({
	
});

Template.Valuers.helpers({
	
});


var ValuersViewExport = function(fileType) {
	var extraParams = {
		searchText: Session.get("ValuersPagedSearchString") || "",
		searchFields: Session.get("ValuersPagedSearchFields") || ["name", "indemnity_cover_amount", "insurerId", "insurer.name", "is_in_panel", "notes"],
		sortBy: Session.get("ValuersPagedSortBy") || "",
		sortAscending: Session.get("ValuersPagedSortAscending") || true
	};

	var exportFields = ["name", "indemnity_cover_amount", "insurer.name", "pi_expiry_date", "is_in_panel", "contacts", "notes"];

	

	Meteor.call("valuersPagedExport", extraParams, exportFields, fileType, function(e, data) {
		if(e) {
			alert(e);
			return;
		}

		let filename = "export." + fileType;
		downloadLocalResource(data, filename, "application/octet-stream");
	});
};

Template.ValuersView.onCreated(function() {
	
});

Template.ValuersView.onDestroyed(function() {
	
});

Template.ValuersView.onRendered(function() {
	Session.set("ValuersViewStyle", "table");
	
});

Template.ValuersView.events({
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
				Session.set("ValuersPagedSearchString", searchString);
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
					Session.set("ValuersPagedSearchString", searchString);
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
					Session.set("ValuersPagedSearchString", "");
				}

			}
			return false;
		}

		return true;
	},

	"click #dataview-insert-button": function(e, t) {
		e.preventDefault();
		Router.go("valuers.insert", mergeObjects(Router.currentRouteParams(), {}));
	},

	"click #dataview-export-default": function(e, t) {
		e.preventDefault();
		ValuersViewExport.call(this, "csv");
	},

	"click #dataview-export-csv": function(e, t) {
		e.preventDefault();
		ValuersViewExport.call(this, "csv");
	},

	"click #dataview-export-tsv": function(e, t) {
		e.preventDefault();
		ValuersViewExport.call(this, "tsv");
	},

	"click #dataview-export-json": function(e, t) {
		e.preventDefault();
		ValuersViewExport.call(this, "json");
	},

	"click .prev-page-link": function(e, t) {
		e.preventDefault();
		var currentPage = Session.get("ValuersPagedPageNo") || 0;
		if(currentPage > 0) {
			Session.set("ValuersPagedPageNo", currentPage - 1);
		}
	},

	"click .next-page-link": function(e, t) {
		e.preventDefault();
		let currentPage = Session.get("ValuersPagedPageNo") || 0;
		if(currentPage < this.valuers_paged_page_count - 1) {
			Session.set("ValuersPagedPageNo", currentPage + 1);
		}
	}

	
});

Template.ValuersView.helpers({

	"insertButtonClass": function() {
		return Valuers.userCanInsert(Meteor.userId(), {}) ? "" : "hidden";
	},

	"isEmpty": function() {
		return !this.valuers_paged || this.valuers_paged.count() == 0;
	},
	"isNotEmpty": function() {
		return this.valuers_paged && this.valuers_paged.count() > 0;
	},
	"isNotFound": function() {
		return this.valuers_paged && this.valuers_paged.count() == 0 && Session.get("ValuersPagedSearchString");
	},
	"gotPrevPage": function() {
		return !!Session.get("ValuersPagedPageNo");
	},
	"gotNextPage": function() {
		return (Session.get("ValuersPagedPageNo") || 0) < this.valuers_paged_page_count - 1;
	},
	"searchString": function() {
		return Session.get("ValuersPagedSearchString");
	},
	"viewAsTable": function() {
		return Session.get("ValuersViewStyle") == "table";
	},
	"viewAsBlog": function() {
		return Session.get("ValuersViewStyle") == "blog";
	},
	"viewAsList": function() {
		return Session.get("ValuersViewStyle") == "list";
	},
	"viewAsGallery": function() {
		return Session.get("ValuersViewStyle") == "gallery";
	}

	
});


Template.ValuersViewTable.onCreated(function() {
	
});

Template.ValuersViewTable.onDestroyed(function() {
	
});

Template.ValuersViewTable.onRendered(function() {
	
});

Template.ValuersViewTable.events({
	"click .th-sortable": function(e, t) {
		e.preventDefault();
		var oldSortBy = Session.get("ValuersPagedSortBy");
		var newSortBy = $(e.target).attr("data-sort");

		Session.set("ValuersPagedSortBy", newSortBy);
		if(oldSortBy == newSortBy) {
			var sortAscending = Session.get("ValuersPagedSortAscending");
			if(typeof sortAscending == "undefined") {
				sortAscending = true;
			}
			Session.set("ValuersPagedSortAscending", !sortAscending);
		} else {
			Session.set("ValuersPagedSortAscending", true);
		}
	}
});

Template.ValuersViewTable.helpers({
});


Template.ValuersViewTableItems.onCreated(function() {
	
});

Template.ValuersViewTableItems.onDestroyed(function() {
	
});

Template.ValuersViewTableItems.onRendered(function() {
	
});

Template.ValuersViewTableItems.events({
	

	"click td": function(e, t) {
		e.preventDefault();
		var item = this;
		var itemId = item ? item._id : null;

		
		Router.go("valuers.details", mergeObjects(Router.currentRouteParams(), {valuerId: this._id}));
		return false;
	},

	"click .inline-checkbox": function(e, t) {
		e.preventDefault();

		if(!this || !this._id) return false;

		var fieldName = $(e.currentTarget).attr("data-field");
		if(!fieldName) return false;

		var values = {};
		values[fieldName] = !this[fieldName];

		Meteor.call("valuersUpdate", this._id, values, function(err, res) {
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
						Meteor.call("valuersRemove", me._id, function(err, res) {
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
		Router.go("valuers.edit", mergeObjects(Router.currentRouteParams(), {valuerId: this._id}));
		return false;
	}
});

Template.ValuersViewTableItems.helpers({
	

	"checked": function(value) { return value ? "checked" : "" }, 
	"editButtonClass": function() {
		return Valuers.userCanUpdate(Meteor.userId(), this) ? "" : "hidden";
	},

	"deleteButtonClass": function() {
		return Valuers.userCanRemove(Meteor.userId(), this) ? "" : "hidden";
	}
});
