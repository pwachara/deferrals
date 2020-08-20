this.CovidlofsController = RouteController.extend({
	template: "Covidlofs",
	

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
		this.covidlofListPagedExtraParams = {
			searchText: Session.get("CovidlofListPagedSearchString") || "",
			searchFields: Session.get("CovidlofListPagedSearchFields") || ["borrower", "rm", "rm_email", "lof_received", "banking_segment.name"],
			sortBy: Session.get("CovidlofListPagedSortBy") || "",
			sortAscending: Session.get("CovidlofListPagedSortAscending"),
			pageNo: Session.get("CovidlofListPagedPageNo") || 0,
			pageSize: Session.get("CovidlofListPagedPageSize") || 0
		};



		

		var subs = [
			Meteor.subscribe("covidlof_list_paged", this.covidlofListPagedExtraParams),
			Meteor.subscribe("covidlof_list_paged_count", this.covidlofListPagedExtraParams)
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
			covidlof_list_paged: Covidlofs.find(databaseUtils.extendFilter({}, this.covidlofListPagedExtraParams), databaseUtils.extendOptions({}, this.covidlofListPagedExtraParams)),
			covidlof_list_paged_count: Counts.get("covidlof_list_paged_count")
		};
		

		
		data.covidlof_list_paged_page_count = this.covidlofListPagedExtraParams && this.covidlofListPagedExtraParams.pageSize ? Math.ceil(data.covidlof_list_paged_count / this.covidlofListPagedExtraParams.pageSize) : 1;
		if(this.isReady() && this.covidlofListPagedExtraParams.pageNo >= data.covidlof_list_paged_page_count) {
			Session.set("CovidlofListPagedPageNo", data.covidlof_list_paged_page_count > 0 ? data.covidlof_list_paged_page_count - 1 : 0);
		}


		return data;
	},

	onAfterAction: function() {
		
	}
});