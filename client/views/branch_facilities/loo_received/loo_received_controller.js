this.BranchFacilitiesLooReceivedController = RouteController.extend({
	template: "BranchFacilities",
	

	yieldTemplates: {
		'BranchFacilitiesLooReceived': { to: 'BranchFacilitiesSubcontent'}
		
	},

	onBeforeAction: function() {
		this.next();
	},

	action: function() {
		if(this.isReady()) { this.render(); } else { this.render("BranchFacilities"); this.render("loading", { to: "BranchFacilitiesSubcontent" });}
		/*ACTION_FUNCTION*/
	},

	isReady: function() {
		this.looReceivedListPagedExtraParams = {
			searchText: Session.get("LooReceivedListPagedSearchString") || "",
			searchFields: Session.get("LooReceivedListPagedSearchFields") || ["reference", "borrower", "facility_type", "currency", "amount", "branch.name", "rm", "rm_email", "bm_email"],
			sortBy: Session.get("LooReceivedListPagedSortBy") || "",
			sortAscending: Session.get("LooReceivedListPagedSortAscending"),
			pageNo: Session.get("LooReceivedListPagedPageNo") || 0,
			pageSize: Session.get("LooReceivedListPagedPageSize") || 15
		};



		

		var subs = [
			Meteor.subscribe("loo_received_list_paged", this.looReceivedListPagedExtraParams),
			Meteor.subscribe("loo_received_list_paged_count", this.looReceivedListPagedExtraParams)
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
			loo_received_list_paged: BranchFacilities.find(databaseUtils.extendFilter({loo_received:true}, this.looReceivedListPagedExtraParams), databaseUtils.extendOptions({}, this.looReceivedListPagedExtraParams)),
			loo_received_list_paged_count: Counts.get("loo_received_list_paged_count")
		};
		

		
		data.loo_received_list_paged_page_count = this.looReceivedListPagedExtraParams && this.looReceivedListPagedExtraParams.pageSize ? Math.ceil(data.loo_received_list_paged_count / this.looReceivedListPagedExtraParams.pageSize) : 1;
		if(this.isReady() && this.looReceivedListPagedExtraParams.pageNo >= data.loo_received_list_paged_page_count) {
			Session.set("LooReceivedListPagedPageNo", data.loo_received_list_paged_page_count > 0 ? data.loo_received_list_paged_page_count - 1 : 0);
		}


		return data;
	},

	onAfterAction: function() {
		
	}
});