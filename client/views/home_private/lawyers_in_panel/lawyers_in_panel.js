Template.HomePrivateLawyersInPanel.onCreated(function() {
	
});

Template.HomePrivateLawyersInPanel.onDestroyed(function() {
	
});

Template.HomePrivateLawyersInPanel.onRendered(function() {
	
	Meteor.defer(function() {
		globalOnRendered();
		$("input[autofocus]").focus();
	});
});

Template.HomePrivateLawyersInPanel.events({
	
});

Template.HomePrivateLawyersInPanel.helpers({
	
});


var HomePrivateLawyersInPanelViewExport = function(fileType) {
	var extraParams = {
		searchText: Session.get("LawyersInPanelPagedSearchString") || "",
		searchFields: Session.get("LawyersInPanelPagedSearchFields") || ["name", "insurerId", "insurer.name", "is_in_panel", "notes"],
		sortBy: Session.get("LawyersInPanelPagedSortBy") || "",
		sortAscending: Session.get("LawyersInPanelPagedSortAscending") || true
	};

	var exportFields = ["name", "indemnity_cover_amount", "insurer.name", "pi_expiry_date", "is_in_panel", "contacts", "notes"];

	

	Meteor.call("lawyersInPanelPagedExport", extraParams, exportFields, fileType, function(e, data) {
		if(e) {
			alert(e);
			return;
		}

		let filename = "export." + fileType;
		downloadLocalResource(data, filename, "application/octet-stream");
	});
};

Template.HomePrivateLawyersInPanelView.onCreated(function() {
	
});

Template.HomePrivateLawyersInPanelView.onDestroyed(function() {
	
});

Template.HomePrivateLawyersInPanelView.onRendered(function() {
	Session.set("HomePrivateLawyersInPanelViewStyle", "table");
	
});

Template.HomePrivateLawyersInPanelView.events({
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
				Session.set("LawyersInPanelPagedSearchString", searchString);
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
					Session.set("LawyersInPanelPagedSearchString", searchString);
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
					Session.set("LawyersInPanelPagedSearchString", "");
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
		HomePrivateLawyersInPanelViewExport.call(this, "csv");
	},

	"click #dataview-export-csv": function(e, t) {
		e.preventDefault();
		HomePrivateLawyersInPanelViewExport.call(this, "csv");
	},

	"click #dataview-export-tsv": function(e, t) {
		e.preventDefault();
		HomePrivateLawyersInPanelViewExport.call(this, "tsv");
	},

	"click #dataview-export-json": function(e, t) {
		e.preventDefault();
		HomePrivateLawyersInPanelViewExport.call(this, "json");
	},

	"click .prev-page-link": function(e, t) {
		e.preventDefault();
		var currentPage = Session.get("LawyersInPanelPagedPageNo") || 0;
		if(currentPage > 0) {
			Session.set("LawyersInPanelPagedPageNo", currentPage - 1);
		}
	},

	"click .next-page-link": function(e, t) {
		e.preventDefault();
		let currentPage = Session.get("LawyersInPanelPagedPageNo") || 0;
		if(currentPage < this.lawyers_in_panel_paged_page_count - 1) {
			Session.set("LawyersInPanelPagedPageNo", currentPage + 1);
		}
	}

	
});

Template.HomePrivateLawyersInPanelView.helpers({

	"insertButtonClass": function() {
		return Lawyers.userCanInsert(Meteor.userId(), {}) ? "" : "hidden";
	},

	"isEmpty": function() {
		return !this.lawyers_in_panel_paged || this.lawyers_in_panel_paged.count() == 0;
	},
	"isNotEmpty": function() {
		return this.lawyers_in_panel_paged && this.lawyers_in_panel_paged.count() > 0;
	},
	"isNotFound": function() {
		return this.lawyers_in_panel_paged && this.lawyers_in_panel_paged.count() == 0 && Session.get("LawyersInPanelPagedSearchString");
	},
	"gotPrevPage": function() {
		return !!Session.get("LawyersInPanelPagedPageNo");
	},
	"gotNextPage": function() {
		return (Session.get("LawyersInPanelPagedPageNo") || 0) < this.lawyers_in_panel_paged_page_count - 1;
	},
	"searchString": function() {
		return Session.get("LawyersInPanelPagedSearchString");
	},
	"viewAsTable": function() {
		return Session.get("HomePrivateLawyersInPanelViewStyle") == "table";
	},
	"viewAsBlog": function() {
		return Session.get("HomePrivateLawyersInPanelViewStyle") == "blog";
	},
	"viewAsList": function() {
		return Session.get("HomePrivateLawyersInPanelViewStyle") == "list";
	},
	"viewAsGallery": function() {
		return Session.get("HomePrivateLawyersInPanelViewStyle") == "gallery";
	}

	
});


Template.HomePrivateLawyersInPanelViewTable.onCreated(function() {
	
});

Template.HomePrivateLawyersInPanelViewTable.onDestroyed(function() {
	
});

Template.HomePrivateLawyersInPanelViewTable.onRendered(function() {
	
});

Template.HomePrivateLawyersInPanelViewTable.events({
	"click .th-sortable": function(e, t) {
		e.preventDefault();
		var oldSortBy = Session.get("LawyersInPanelPagedSortBy");
		var newSortBy = $(e.target).attr("data-sort");

		Session.set("LawyersInPanelPagedSortBy", newSortBy);
		if(oldSortBy == newSortBy) {
			var sortAscending = Session.get("LawyersInPanelPagedSortAscending");
			if(typeof sortAscending == "undefined") {
				sortAscending = true;
			}
			Session.set("LawyersInPanelPagedSortAscending", !sortAscending);
		} else {
			Session.set("LawyersInPanelPagedSortAscending", true);
		}
	}
});

Template.HomePrivateLawyersInPanelViewTable.helpers({
});


Template.HomePrivateLawyersInPanelViewTableItems.onCreated(function() {
	
});

Template.HomePrivateLawyersInPanelViewTableItems.onDestroyed(function() {
	
});

Template.HomePrivateLawyersInPanelViewTableItems.onRendered(function() {
	
});

Template.HomePrivateLawyersInPanelViewTableItems.events({
	

	"click td": function(e, t) {
		e.preventDefault();
		var item = this;
		var itemId = item ? item._id : null;

		
		/**/
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
		/**/
		return false;
	}
});

Template.HomePrivateLawyersInPanelViewTableItems.helpers({
	

	"checked": function(value) { return value ? "checked" : "" }, 
	"editButtonClass": function() {
		return Lawyers.userCanUpdate(Meteor.userId(), this) ? "" : "hidden";
	},

	"deleteButtonClass": function() {
		return Lawyers.userCanRemove(Meteor.userId(), this) ? "" : "hidden";
	}
});
