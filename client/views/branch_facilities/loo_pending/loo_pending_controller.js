this.BranchFacilitiesLooPendingController = RouteController.extend({
	template: "BranchFacilities",
	

	yieldTemplates: {
		'BranchFacilitiesLooPending': { to: 'BranchFacilitiesSubcontent'}
		
	},

	onBeforeAction: function() {
		this.next();
	},

	action: function() {
		if(this.isReady()) { this.render(); } else { this.render("BranchFacilities"); this.render("loading", { to: "BranchFacilitiesSubcontent" });}
		/*ACTION_FUNCTION*/
	},

	isReady: function() {
		this.looPendingList1PagedExtraParams = {
			searchText: Session.get("LooPendingList1PagedSearchString") || "",
			searchFields: Session.get("LooPendingList1PagedSearchFields") || ["reference", "borrower", "facility_type", "currency", "amount", "branch.name", "rm", "rm_email", "bm_email"],
			sortBy: Session.get("LooPendingList1PagedSortBy") || "",
			sortAscending: Session.get("LooPendingList1PagedSortAscending"),
			pageNo: Session.get("LooPendingList1PagedPageNo") || 0,
			pageSize: Session.get("LooPendingList1PagedPageSize") || 0
		};



		

		var subs = [
			Meteor.subscribe("loo_pending_list1_paged", this.looPendingList1PagedExtraParams),
			Meteor.subscribe("loo_pending_list1_paged_count", this.looPendingList1PagedExtraParams)
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
			loo_pending_list1_paged: BranchFacilities.find(databaseUtils.extendFilter({loo_received:false}, this.looPendingList1PagedExtraParams), databaseUtils.extendOptions({}, this.looPendingList1PagedExtraParams)),
			loo_pending_list1_paged_count: Counts.get("loo_pending_list1_paged_count")
		};
		

		
		data.loo_pending_list1_paged_page_count = this.looPendingList1PagedExtraParams && this.looPendingList1PagedExtraParams.pageSize ? Math.ceil(data.loo_pending_list1_paged_count / this.looPendingList1PagedExtraParams.pageSize) : 1;
		if(this.isReady() && this.looPendingList1PagedExtraParams.pageNo >= data.loo_pending_list1_paged_page_count) {
			Session.set("LooPendingList1PagedPageNo", data.loo_pending_list1_paged_page_count > 0 ? data.loo_pending_list1_paged_page_count - 1 : 0);
		}


		return data;
	},

	onAfterAction: function() {
		
	}
});