this.SowSowPendingController = RouteController.extend({
	template: "Sow",
	

	yieldTemplates: {
		'SowSowPending': { to: 'SowSubcontent'}
		
	},

	onBeforeAction: function() {
		this.next();
	},

	action: function() {
		if(this.isReady()) { this.render(); } else { this.render("Sow"); this.render("loading", { to: "SowSubcontent" });}
		/*ACTION_FUNCTION*/
	},

	isReady: function() {
		this.sowPendingListPagedExtraParams = {
			searchText: Session.get("SowPendingListPagedSearchString") || "",
			searchFields: Session.get("SowPendingListPagedSearchFields") || ["borrower", "amount", "rm"],
			sortBy: Session.get("SowPendingListPagedSortBy") || "",
			sortAscending: Session.get("SowPendingListPagedSortAscending"),
			pageNo: Session.get("SowPendingListPagedPageNo") || 0,
			pageSize: Session.get("SowPendingListPagedPageSize") || 0
		};



		

		var subs = [
			Meteor.subscribe("sow_pending_list_paged", this.sowPendingListPagedExtraParams),
			Meteor.subscribe("sow_pending_list_paged_count", this.sowPendingListPagedExtraParams)
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
			sow_pending_list_paged: Sow.find(databaseUtils.extendFilter({status:"Pending"}, this.sowPendingListPagedExtraParams), databaseUtils.extendOptions({sort:{sow_deadline:-1}}, this.sowPendingListPagedExtraParams)),
			sow_pending_list_paged_count: Counts.get("sow_pending_list_paged_count")
		};
		

		
		data.sow_pending_list_paged_page_count = this.sowPendingListPagedExtraParams && this.sowPendingListPagedExtraParams.pageSize ? Math.ceil(data.sow_pending_list_paged_count / this.sowPendingListPagedExtraParams.pageSize) : 1;
		if(this.isReady() && this.sowPendingListPagedExtraParams.pageNo >= data.sow_pending_list_paged_page_count) {
			Session.set("SowPendingListPagedPageNo", data.sow_pending_list_paged_page_count > 0 ? data.sow_pending_list_paged_page_count - 1 : 0);
		}


		return data;
	},

	onAfterAction: function() {
		
	}
});