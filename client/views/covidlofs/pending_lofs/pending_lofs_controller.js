this.CovidlofsPendingLofsController = RouteController.extend({
	template: "Covidlofs",
	

	yieldTemplates: {
		'CovidlofsPendingLofs': { to: 'CovidlofsSubcontent'}
		
	},

	onBeforeAction: function() {
		this.next();
	},

	action: function() {
		if(this.isReady()) { this.render(); } else { this.render("Covidlofs"); this.render("loading", { to: "CovidlofsSubcontent" });}
		/*ACTION_FUNCTION*/
	},

	isReady: function() {
		this.pendingLofListPagedExtraParams = {
			searchText: Session.get("PendingLofListPagedSearchString") || "",
			searchFields: Session.get("PendingLofListPagedSearchFields") || ["borrower", "rm", "rm_email", "lof_received", "banking_segmentId", "banking_segment.name", "lof_due_date"],
			sortBy: Session.get("PendingLofListPagedSortBy") || "",
			sortAscending: Session.get("PendingLofListPagedSortAscending"),
			pageNo: Session.get("PendingLofListPagedPageNo") || 0,
			pageSize: Session.get("PendingLofListPagedPageSize") || 0
		};



		

		var subs = [
			Meteor.subscribe("pending_lof_list_paged", this.pendingLofListPagedExtraParams),
			Meteor.subscribe("pending_lof_list_paged_count", this.pendingLofListPagedExtraParams)
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
			pending_lof_list_paged: Covidlofs.find(databaseUtils.extendFilter({lof_received:"NO"}, this.pendingLofListPagedExtraParams), databaseUtils.extendOptions({}, this.pendingLofListPagedExtraParams)),
			pending_lof_list_paged_count: Counts.get("pending_lof_list_paged_count")
		};
		

		
		data.pending_lof_list_paged_page_count = this.pendingLofListPagedExtraParams && this.pendingLofListPagedExtraParams.pageSize ? Math.ceil(data.pending_lof_list_paged_count / this.pendingLofListPagedExtraParams.pageSize) : 1;
		if(this.isReady() && this.pendingLofListPagedExtraParams.pageNo >= data.pending_lof_list_paged_page_count) {
			Session.set("PendingLofListPagedPageNo", data.pending_lof_list_paged_page_count > 0 ? data.pending_lof_list_paged_page_count - 1 : 0);
		}


		return data;
	},

	onAfterAction: function() {
		
	}
});