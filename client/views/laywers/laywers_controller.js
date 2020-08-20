this.LaywersController = RouteController.extend({
	template: "Laywers",
	

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
		this.lawyersPagedExtraParams = {
			searchText: Session.get("LawyersPagedSearchString") || "",
			searchFields: Session.get("LawyersPagedSearchFields") || ["name", "insurerId", "insurer.name", "is_in_panel", "notes"],
			sortBy: Session.get("LawyersPagedSortBy") || "",
			sortAscending: Session.get("LawyersPagedSortAscending"),
			pageNo: Session.get("LawyersPagedPageNo") || 0,
			pageSize: Session.get("LawyersPagedPageSize") || 0
		};



		

		var subs = [
			Meteor.subscribe("lawyers_paged", this.lawyersPagedExtraParams),
			Meteor.subscribe("lawyers_paged_count", this.lawyersPagedExtraParams)
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
			lawyers_paged: Lawyers.find(databaseUtils.extendFilter({}, this.lawyersPagedExtraParams), databaseUtils.extendOptions({sort:{name:1}}, this.lawyersPagedExtraParams)),
			lawyers_paged_count: Counts.get("lawyers_paged_count")
		};
		

		
		data.lawyers_paged_page_count = this.lawyersPagedExtraParams && this.lawyersPagedExtraParams.pageSize ? Math.ceil(data.lawyers_paged_count / this.lawyersPagedExtraParams.pageSize) : 1;
		if(this.isReady() && this.lawyersPagedExtraParams.pageNo >= data.lawyers_paged_page_count) {
			Session.set("LawyersPagedPageNo", data.lawyers_paged_page_count > 0 ? data.lawyers_paged_page_count - 1 : 0);
		}


		return data;
	},

	onAfterAction: function() {
		
	}
});