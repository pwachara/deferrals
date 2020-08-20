this.InsurersController = RouteController.extend({
	template: "Insurers",
	

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
		this.insurersPagedExtraParams = {
			searchText: Session.get("InsurersPagedSearchString") || "",
			searchFields: Session.get("InsurersPagedSearchFields") || ["name"],
			sortBy: Session.get("InsurersPagedSortBy") || "",
			sortAscending: Session.get("InsurersPagedSortAscending"),
			pageNo: Session.get("InsurersPagedPageNo") || 0,
			pageSize: Session.get("InsurersPagedPageSize") || 0
		};



		

		var subs = [
			Meteor.subscribe("insurers"),
			Meteor.subscribe("insurers_paged", this.insurersPagedExtraParams),
			Meteor.subscribe("insurers_paged_count", this.insurersPagedExtraParams)
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
			insurers: Insurers.find({}, {sort:{name:1}}),
			insurers_paged: Insurers.find(databaseUtils.extendFilter({}, this.insurersPagedExtraParams), databaseUtils.extendOptions({sort:{name:1}}, this.insurersPagedExtraParams)),
			insurers_paged_count: Counts.get("insurers_paged_count")
		};
		

		
		data.insurers_paged_page_count = this.insurersPagedExtraParams && this.insurersPagedExtraParams.pageSize ? Math.ceil(data.insurers_paged_count / this.insurersPagedExtraParams.pageSize) : 1;
		if(this.isReady() && this.insurersPagedExtraParams.pageNo >= data.insurers_paged_page_count) {
			Session.set("InsurersPagedPageNo", data.insurers_paged_page_count > 0 ? data.insurers_paged_page_count - 1 : 0);
		}


		return data;
	},

	onAfterAction: function() {
		
	}
});