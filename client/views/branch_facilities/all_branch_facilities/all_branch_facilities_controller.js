this.BranchFacilitiesAllBranchFacilitiesController = RouteController.extend({
	template: "BranchFacilities",
	

	yieldTemplates: {
		'BranchFacilitiesAllBranchFacilities': { to: 'BranchFacilitiesSubcontent'}
		
	},

	onBeforeAction: function() {
		this.next();
	},

	action: function() {
		if(this.isReady()) { this.render(); } else { this.render("BranchFacilities"); this.render("loading", { to: "BranchFacilitiesSubcontent" });}
		/*ACTION_FUNCTION*/
	},

	isReady: function() {
		this.allBranchFacilitiesListPagedExtraParams = {
			searchText: Session.get("AllBranchFacilitiesListPagedSearchString") || "",
			searchFields: Session.get("AllBranchFacilitiesListPagedSearchFields") || ["reference", "borrower", "facility_type", "currency", "amount", "branch.name", "rm", "rm_email", "bm_email"],
			sortBy: Session.get("AllBranchFacilitiesListPagedSortBy") || "",
			sortAscending: Session.get("AllBranchFacilitiesListPagedSortAscending"),
			pageNo: Session.get("AllBranchFacilitiesListPagedPageNo") || 0,
			pageSize: Session.get("AllBranchFacilitiesListPagedPageSize") || 0
		};



		

		var subs = [
			Meteor.subscribe("all_branch_facilities_list_paged", this.allBranchFacilitiesListPagedExtraParams),
			Meteor.subscribe("all_branch_facilities_list_paged_count", this.allBranchFacilitiesListPagedExtraParams)
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
			all_branch_facilities_list_paged: BranchFacilities.find(databaseUtils.extendFilter({}, this.allBranchFacilitiesListPagedExtraParams), databaseUtils.extendOptions({}, this.allBranchFacilitiesListPagedExtraParams)),
			all_branch_facilities_list_paged_count: Counts.get("all_branch_facilities_list_paged_count")
		};
		

		
		data.all_branch_facilities_list_paged_page_count = this.allBranchFacilitiesListPagedExtraParams && this.allBranchFacilitiesListPagedExtraParams.pageSize ? Math.ceil(data.all_branch_facilities_list_paged_count / this.allBranchFacilitiesListPagedExtraParams.pageSize) : 1;
		if(this.isReady() && this.allBranchFacilitiesListPagedExtraParams.pageNo >= data.all_branch_facilities_list_paged_page_count) {
			Session.set("AllBranchFacilitiesListPagedPageNo", data.all_branch_facilities_list_paged_page_count > 0 ? data.all_branch_facilities_list_paged_page_count - 1 : 0);
		}


		return data;
	},

	onAfterAction: function() {
		
	}
});