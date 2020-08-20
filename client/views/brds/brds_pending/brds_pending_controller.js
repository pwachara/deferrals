this.BrdsBrdsPendingController = RouteController.extend({
	template: "Brds",
	

	yieldTemplates: {
		'BrdsBrdsPending': { to: 'BrdsSubcontent'}
		
	},

	onBeforeAction: function() {
		this.next();
	},

	action: function() {
		if(this.isReady()) { this.render(); } else { this.render("Brds"); this.render("loading", { to: "BrdsSubcontent" });}
		/*ACTION_FUNCTION*/
	},

	isReady: function() {
		this.brdsPendingPagedExtraParams = {
			searchText: Session.get("BrdsPendingPagedSearchString") || "",
			searchFields: Session.get("BrdsPendingPagedSearchFields") || ["description", "ict_contact", "raised_by", "date_raised", "expected_date_of_closure", "status", "remarks", "date_closed"],
			sortBy: Session.get("BrdsPendingPagedSortBy") || "",
			sortAscending: Session.get("BrdsPendingPagedSortAscending"),
			pageNo: Session.get("BrdsPendingPagedPageNo") || 0,
			pageSize: Session.get("BrdsPendingPagedPageSize") || 0
		};



		

		var subs = [
			Meteor.subscribe("brds_pending_paged", this.brdsPendingPagedExtraParams),
			Meteor.subscribe("brds_pending_paged_count", this.brdsPendingPagedExtraParams)
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
			brds_pending_paged: Brds.find(databaseUtils.extendFilter({status:"pending"}, this.brdsPendingPagedExtraParams), databaseUtils.extendOptions({sort:{date_raised:1}}, this.brdsPendingPagedExtraParams)),
			brds_pending_paged_count: Counts.get("brds_pending_paged_count")
		};
		

		
		data.brds_pending_paged_page_count = this.brdsPendingPagedExtraParams && this.brdsPendingPagedExtraParams.pageSize ? Math.ceil(data.brds_pending_paged_count / this.brdsPendingPagedExtraParams.pageSize) : 1;
		if(this.isReady() && this.brdsPendingPagedExtraParams.pageNo >= data.brds_pending_paged_page_count) {
			Session.set("BrdsPendingPagedPageNo", data.brds_pending_paged_page_count > 0 ? data.brds_pending_paged_page_count - 1 : 0);
		}


		return data;
	},

	onAfterAction: function() {
		
	}
});