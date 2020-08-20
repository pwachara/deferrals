this.DeferralsPendingDeferralsController = RouteController.extend({
	template: "Deferrals",
	

	yieldTemplates: {
		'DeferralsPendingDeferrals': { to: 'DeferralsSubcontent'}
		
	},

	onBeforeAction: function() {
		this.next();
	},

	action: function() {
		if(this.isReady()) { this.render(); } else { this.render("Deferrals"); this.render("loading", { to: "DeferralsSubcontent" });}
		/*ACTION_FUNCTION*/
	},

	isReady: function() {
		this.deferralsPendingPagedExtraParams = {
			searchText: Session.get("DeferralsPendingPagedSearchString") || "",
			searchFields: Session.get("DeferralsPendingPagedSearchFields") || ["deferral_date", "rm", "borrower", "customer_number", "banking_segment.name", "item_deferred", "due_date", "authorizer", "status", "date_closed"],
			sortBy: Session.get("DeferralsPendingPagedSortBy") || "",
			sortAscending: Session.get("DeferralsPendingPagedSortAscending"),
			pageNo: Session.get("DeferralsPendingPagedPageNo") || 0,
			pageSize: Session.get("DeferralsPendingPagedPageSize") || 0
		};



		

		var subs = [
			Meteor.subscribe("deferrals_pending_paged", this.deferralsPendingPagedExtraParams),
			Meteor.subscribe("deferrals_pending_paged_count", this.deferralsPendingPagedExtraParams)
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
			deferrals_pending_paged: Deferrals.find(databaseUtils.extendFilter({status:"Pending"}, this.deferralsPendingPagedExtraParams), databaseUtils.extendOptions({sort:{due_date:1}}, this.deferralsPendingPagedExtraParams)),
			deferrals_pending_paged_count: Counts.get("deferrals_pending_paged_count")
		};
		

		
		data.deferrals_pending_paged_page_count = this.deferralsPendingPagedExtraParams && this.deferralsPendingPagedExtraParams.pageSize ? Math.ceil(data.deferrals_pending_paged_count / this.deferralsPendingPagedExtraParams.pageSize) : 1;
		if(this.isReady() && this.deferralsPendingPagedExtraParams.pageNo >= data.deferrals_pending_paged_page_count) {
			Session.set("DeferralsPendingPagedPageNo", data.deferrals_pending_paged_page_count > 0 ? data.deferrals_pending_paged_page_count - 1 : 0);
		}


		return data;
	},

	onAfterAction: function() {
		
	}
});