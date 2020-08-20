this.SowSowClosedController = RouteController.extend({
	template: "Sow",
	

	yieldTemplates: {
		'SowSowClosed': { to: 'SowSubcontent'}
		
	},

	onBeforeAction: function() {
		this.next();
	},

	action: function() {
		if(this.isReady()) { this.render(); } else { this.render("Sow"); this.render("loading", { to: "SowSubcontent" });}
		/*ACTION_FUNCTION*/
	},

	isReady: function() {
		this.sowClosedListPagedExtraParams = {
			searchText: Session.get("SowClosedListPagedSearchString") || "",
			searchFields: Session.get("SowClosedListPagedSearchFields") || ["borrower", "amount", "rm"],
			sortBy: Session.get("SowClosedListPagedSortBy") || "",
			sortAscending: Session.get("SowClosedListPagedSortAscending"),
			pageNo: Session.get("SowClosedListPagedPageNo") || 0,
			pageSize: Session.get("SowClosedListPagedPageSize") || 0
		};



		

		var subs = [
			Meteor.subscribe("sow_closed_list_paged", this.sowClosedListPagedExtraParams),
			Meteor.subscribe("sow_closed_list_paged_count", this.sowClosedListPagedExtraParams)
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
			sow_closed_list_paged: Sow.find(databaseUtils.extendFilter({status:"Closed"}, this.sowClosedListPagedExtraParams), databaseUtils.extendOptions({sort:{loo_date:1}}, this.sowClosedListPagedExtraParams)),
			sow_closed_list_paged_count: Counts.get("sow_closed_list_paged_count")
		};
		

		
		data.sow_closed_list_paged_page_count = this.sowClosedListPagedExtraParams && this.sowClosedListPagedExtraParams.pageSize ? Math.ceil(data.sow_closed_list_paged_count / this.sowClosedListPagedExtraParams.pageSize) : 1;
		if(this.isReady() && this.sowClosedListPagedExtraParams.pageNo >= data.sow_closed_list_paged_page_count) {
			Session.set("SowClosedListPagedPageNo", data.sow_closed_list_paged_page_count > 0 ? data.sow_closed_list_paged_page_count - 1 : 0);
		}


		return data;
	},

	onAfterAction: function() {
		
	}
});