this.BranchesController = RouteController.extend({
	template: "Branches",
	

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
		this.branchListPagedExtraParams = {
			searchText: Session.get("BranchListPagedSearchString") || "",
			searchFields: Session.get("BranchListPagedSearchFields") || ["name"],
			sortBy: Session.get("BranchListPagedSortBy") || "",
			sortAscending: Session.get("BranchListPagedSortAscending"),
			pageNo: Session.get("BranchListPagedPageNo") || 0,
			pageSize: Session.get("BranchListPagedPageSize") || 0
		};



		

		var subs = [
			Meteor.subscribe("branch_list_paged", this.branchListPagedExtraParams),
			Meteor.subscribe("branch_list_paged_count", this.branchListPagedExtraParams)
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
			branch_list_paged: Branches.find(databaseUtils.extendFilter({}, this.branchListPagedExtraParams), databaseUtils.extendOptions({}, this.branchListPagedExtraParams)),
			branch_list_paged_count: Counts.get("branch_list_paged_count")
		};
		

		
		data.branch_list_paged_page_count = this.branchListPagedExtraParams && this.branchListPagedExtraParams.pageSize ? Math.ceil(data.branch_list_paged_count / this.branchListPagedExtraParams.pageSize) : 1;
		if(this.isReady() && this.branchListPagedExtraParams.pageNo >= data.branch_list_paged_page_count) {
			Session.set("BranchListPagedPageNo", data.branch_list_paged_page_count > 0 ? data.branch_list_paged_page_count - 1 : 0);
		}


		return data;
	},

	onAfterAction: function() {
		
	}
});