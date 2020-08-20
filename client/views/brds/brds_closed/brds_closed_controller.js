this.BrdsBrdsClosedController = RouteController.extend({
	template: "Brds",
	

	yieldTemplates: {
		'BrdsBrdsClosed': { to: 'BrdsSubcontent'}
		
	},

	onBeforeAction: function() {
		this.next();
	},

	action: function() {
		if(this.isReady()) { this.render(); } else { this.render("Brds"); this.render("loading", { to: "BrdsSubcontent" });}
		/*ACTION_FUNCTION*/
	},

	isReady: function() {
		this.brdsClosedPagedExtraParams = {
			searchText: Session.get("BrdsClosedPagedSearchString") || "",
			searchFields: Session.get("BrdsClosedPagedSearchFields") || ["description", "ict_contact", "raised_by", "date_raised", "expected_date_of_closure", "status", "remarks", "date_closed"],
			sortBy: Session.get("BrdsClosedPagedSortBy") || "",
			sortAscending: Session.get("BrdsClosedPagedSortAscending"),
			pageNo: Session.get("BrdsClosedPagedPageNo") || 0,
			pageSize: Session.get("BrdsClosedPagedPageSize") || 0
		};



		

		var subs = [
			Meteor.subscribe("brds_closed_paged", this.brdsClosedPagedExtraParams),
			Meteor.subscribe("brds_closed_paged_count", this.brdsClosedPagedExtraParams)
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
			brds_closed_paged: Brds.find(databaseUtils.extendFilter({status:"closed"}, this.brdsClosedPagedExtraParams), databaseUtils.extendOptions({sort:{date_raised:1}}, this.brdsClosedPagedExtraParams)),
			brds_closed_paged_count: Counts.get("brds_closed_paged_count")
		};
		

		
		data.brds_closed_paged_page_count = this.brdsClosedPagedExtraParams && this.brdsClosedPagedExtraParams.pageSize ? Math.ceil(data.brds_closed_paged_count / this.brdsClosedPagedExtraParams.pageSize) : 1;
		if(this.isReady() && this.brdsClosedPagedExtraParams.pageNo >= data.brds_closed_paged_page_count) {
			Session.set("BrdsClosedPagedPageNo", data.brds_closed_paged_page_count > 0 ? data.brds_closed_paged_page_count - 1 : 0);
		}


		return data;
	},

	onAfterAction: function() {
		
	}
});