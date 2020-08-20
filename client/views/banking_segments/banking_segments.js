Template.BankingSegments.onCreated(function() {
	
});

Template.BankingSegments.onDestroyed(function() {
	
});

Template.BankingSegments.onRendered(function() {
	
	Meteor.defer(function() {
		globalOnRendered();
		$("input[autofocus]").focus();
	});
});

Template.BankingSegments.events({
	
});

Template.BankingSegments.helpers({
	
});


var BankingSegmentsViewExport = function(fileType) {
	var extraParams = {
		searchText: Session.get("BankingSegmentListPagedSearchString") || "",
		searchFields: Session.get("BankingSegmentListPagedSearchFields") || ["name"],
		sortBy: Session.get("BankingSegmentListPagedSortBy") || "",
		sortAscending: Session.get("BankingSegmentListPagedSortAscending") || true
	};

	var exportFields = ["name"];

	

	Meteor.call("bankingSegmentListPagedExport", extraParams, exportFields, fileType, function(e, data) {
		if(e) {
			alert(e);
			return;
		}

		let filename = "export." + fileType;
		downloadLocalResource(data, filename, "application/octet-stream");
	});
};

Template.BankingSegmentsView.onCreated(function() {
	
});

Template.BankingSegmentsView.onDestroyed(function() {
	
});

Template.BankingSegmentsView.onRendered(function() {
	Session.set("BankingSegmentsViewStyle", "table");
	
});

Template.BankingSegmentsView.events({
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
				Session.set("BankingSegmentListPagedSearchString", searchString);
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
					Session.set("BankingSegmentListPagedSearchString", searchString);
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
					Session.set("BankingSegmentListPagedSearchString", "");
				}

			}
			return false;
		}

		return true;
	},

	"click #dataview-insert-button": function(e, t) {
		e.preventDefault();
		Router.go("banking_segments.insert", mergeObjects(Router.currentRouteParams(), {}));
	},

	"click #dataview-export-default": function(e, t) {
		e.preventDefault();
		BankingSegmentsViewExport.call(this, "csv");
	},

	"click #dataview-export-csv": function(e, t) {
		e.preventDefault();
		BankingSegmentsViewExport.call(this, "csv");
	},

	"click #dataview-export-tsv": function(e, t) {
		e.preventDefault();
		BankingSegmentsViewExport.call(this, "tsv");
	},

	"click #dataview-export-json": function(e, t) {
		e.preventDefault();
		BankingSegmentsViewExport.call(this, "json");
	},

	"click .prev-page-link": function(e, t) {
		e.preventDefault();
		var currentPage = Session.get("BankingSegmentListPagedPageNo") || 0;
		if(currentPage > 0) {
			Session.set("BankingSegmentListPagedPageNo", currentPage - 1);
		}
	},

	"click .next-page-link": function(e, t) {
		e.preventDefault();
		let currentPage = Session.get("BankingSegmentListPagedPageNo") || 0;
		if(currentPage < this.banking_segment_list_paged_page_count - 1) {
			Session.set("BankingSegmentListPagedPageNo", currentPage + 1);
		}
	}

	
});

Template.BankingSegmentsView.helpers({

	"insertButtonClass": function() {
		return BankingSegment.userCanInsert(Meteor.userId(), {}) ? "" : "hidden";
	},

	"isEmpty": function() {
		return !this.banking_segment_list_paged || this.banking_segment_list_paged.count() == 0;
	},
	"isNotEmpty": function() {
		return this.banking_segment_list_paged && this.banking_segment_list_paged.count() > 0;
	},
	"isNotFound": function() {
		return this.banking_segment_list_paged && this.banking_segment_list_paged.count() == 0 && Session.get("BankingSegmentListPagedSearchString");
	},
	"gotPrevPage": function() {
		return !!Session.get("BankingSegmentListPagedPageNo");
	},
	"gotNextPage": function() {
		return (Session.get("BankingSegmentListPagedPageNo") || 0) < this.banking_segment_list_paged_page_count - 1;
	},
	"searchString": function() {
		return Session.get("BankingSegmentListPagedSearchString");
	},
	"viewAsTable": function() {
		return Session.get("BankingSegmentsViewStyle") == "table";
	},
	"viewAsBlog": function() {
		return Session.get("BankingSegmentsViewStyle") == "blog";
	},
	"viewAsList": function() {
		return Session.get("BankingSegmentsViewStyle") == "list";
	},
	"viewAsGallery": function() {
		return Session.get("BankingSegmentsViewStyle") == "gallery";
	}

	
});


Template.BankingSegmentsViewTable.onCreated(function() {
	
});

Template.BankingSegmentsViewTable.onDestroyed(function() {
	
});

Template.BankingSegmentsViewTable.onRendered(function() {
	
});

Template.BankingSegmentsViewTable.events({
	"click .th-sortable": function(e, t) {
		e.preventDefault();
		var oldSortBy = Session.get("BankingSegmentListPagedSortBy");
		var newSortBy = $(e.target).attr("data-sort");

		Session.set("BankingSegmentListPagedSortBy", newSortBy);
		if(oldSortBy == newSortBy) {
			var sortAscending = Session.get("BankingSegmentListPagedSortAscending");
			if(typeof sortAscending == "undefined") {
				sortAscending = true;
			}
			Session.set("BankingSegmentListPagedSortAscending", !sortAscending);
		} else {
			Session.set("BankingSegmentListPagedSortAscending", true);
		}
	}
});

Template.BankingSegmentsViewTable.helpers({
});


Template.BankingSegmentsViewTableItems.onCreated(function() {
	
});

Template.BankingSegmentsViewTableItems.onDestroyed(function() {
	
});

Template.BankingSegmentsViewTableItems.onRendered(function() {
	
});

Template.BankingSegmentsViewTableItems.events({
	

	"click td": function(e, t) {
		e.preventDefault();
		var item = this;
		var itemId = item ? item._id : null;

		
		Router.go("banking_segments.details", mergeObjects(Router.currentRouteParams(), {bankingSegmentId: this._id}));
		return false;
	},

	"click .inline-checkbox": function(e, t) {
		e.preventDefault();

		if(!this || !this._id) return false;

		var fieldName = $(e.currentTarget).attr("data-field");
		if(!fieldName) return false;

		var values = {};
		values[fieldName] = !this[fieldName];

		Meteor.call("bankingSegmentUpdate", this._id, values, function(err, res) {
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
						Meteor.call("bankingSegmentRemove", me._id, function(err, res) {
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
		Router.go("banking_segments.update", mergeObjects(Router.currentRouteParams(), {bankingSegmentId: this._id}));
		return false;
	}
});

Template.BankingSegmentsViewTableItems.helpers({
	

	"checked": function(value) { return value ? "checked" : "" }, 
	"editButtonClass": function() {
		return BankingSegment.userCanUpdate(Meteor.userId(), this) ? "" : "hidden";
	},

	"deleteButtonClass": function() {
		return BankingSegment.userCanRemove(Meteor.userId(), this) ? "" : "hidden";
	}
});
