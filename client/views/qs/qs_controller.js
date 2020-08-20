this.QsController = RouteController.extend({
	template: "Qs",
	

	yieldTemplates: {
		/*YIELD_TEMPLATES*/
	},

	onBeforeAction: function() {
		this.next();
	},

	action: function() {
		if(this.isReady()) { this.render(); } else { this.render("loading"); }
		/*ACTION_FUNCTION*/
	},

	isReady: function() {
		this.qsListPagedExtraParams = {
			searchText: Session.get("QsListPagedSearchString") || "",
			searchFields: Session.get("QsListPagedSearchFields") || ["name", "insurer.name", "contacts", "notes"],
			sortBy: Session.get("QsListPagedSortBy") || "",
			sortAscending: Session.get("QsListPagedSortAscending"),
			pageNo: Session.get("QsListPagedPageNo") || 0,
			pageSize: Session.get("QsListPagedPageSize") || 0
		};



		

		var subs = [
			Meteor.subscribe("qs_list_paged", this.qsListPagedExtraParams),
			Meteor.subscribe("qs_list_paged_count", this.qsListPagedExtraParams)
		];
		var ready = true;
		_.each(subs, function(sub) {
			if(!sub.ready())
				ready = false;
		});
		return ready;
	},

	data: function() {
		

		var data = {
			params: this.params || {},
			qs_list_paged: Qs.find(databaseUtils.extendFilter({}, this.qsListPagedExtraParams), databaseUtils.extendOptions({}, this.qsListPagedExtraParams)),
			qs_list_paged_count: Counts.get("qs_list_paged_count")
		};
		

		
		data.qs_list_paged_page_count = this.qsListPagedExtraParams && this.qsListPagedExtraParams.pageSize ? Math.ceil(data.qs_list_paged_count / this.qsListPagedExtraParams.pageSize) : 1;
		if(this.isReady() && this.qsListPagedExtraParams.pageNo >= data.qs_list_paged_page_count) {
			Session.set("QsListPagedPageNo", data.qs_list_paged_page_count > 0 ? data.qs_list_paged_page_count - 1 : 0);
		}


		return data;
	},

	onAfterAction: function() {
		
	}
});