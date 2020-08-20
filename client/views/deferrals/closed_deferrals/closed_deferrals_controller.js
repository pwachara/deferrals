this.DeferralsClosedDeferralsController = RouteController.extend({
	template: "Deferrals",
	

	yieldTemplates: {
		'DeferralsClosedDeferrals': { to: 'DeferralsSubcontent'}
		
	},

	onBeforeAction: function() {
		this.next();
	},

	action: function() {
		if(this.isReady()) { this.render(); } else { this.render("Deferrals"); this.render("loading", { to: "DeferralsSubcontent" });}
		/*ACTION_FUNCTION*/
	},

	isReady: function() {
		this.deferralsClosedPagedExtraParams = {
			searchText: Session.get("DeferralsClosedPagedSearchString") || "",
			searchFields: Session.get("DeferralsClosedPagedSearchFields") || ["deferral_date", "rm", "borrower", "customer_number", "banking_segment.name", "item_deferred", "due_date", "authorizer", "status", "date_closed"],
			sortBy: Session.get("DeferralsClosedPagedSortBy") || "",
			sortAscending: Session.get("DeferralsClosedPagedSortAscending"),
			pageNo: Session.get("DeferralsClosedPagedPageNo") || 0,
			pageSize: Session.get("DeferralsClosedPagedPageSize") || 25
		};



		

		var subs = [
			Meteor.subscribe("deferrals_closed_paged", this.deferralsClosedPagedExtraParams),
			Meteor.subscribe("deferrals_closed_paged_count", this.deferralsClosedPagedExtraParams)
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
			deferrals_closed_paged: Deferrals.find(databaseUtils.extendFilter({status:"Closed"}, this.deferralsClosedPagedExtraParams), databaseUtils.extendOptions({sort:{due_date:1}}, this.deferralsClosedPagedExtraParams)),
			deferrals_closed_paged_count: Counts.get("deferrals_closed_paged_count")
		};
		

		
		data.deferrals_closed_paged_page_count = this.deferralsClosedPagedExtraParams && this.deferralsClosedPagedExtraParams.pageSize ? Math.ceil(data.deferrals_closed_paged_count / this.deferralsClosedPagedExtraParams.pageSize) : 1;
		if(this.isReady() && this.deferralsClosedPagedExtraParams.pageNo >= data.deferrals_closed_paged_page_count) {
			Session.set("DeferralsClosedPagedPageNo", data.deferrals_closed_paged_page_count > 0 ? data.deferrals_closed_paged_page_count - 1 : 0);
		}


		return data;
	},

	onAfterAction: function() {
		
	}
});