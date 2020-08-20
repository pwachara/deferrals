this.ValuersController = RouteController.extend({
	template: "Valuers",
	

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
		this.valuersPagedExtraParams = {
			searchText: Session.get("ValuersPagedSearchString") || "",
			searchFields: Session.get("ValuersPagedSearchFields") || ["name", "indemnity_cover_amount", "insurerId", "insurer.name", "is_in_panel", "notes"],
			sortBy: Session.get("ValuersPagedSortBy") || "",
			sortAscending: Session.get("ValuersPagedSortAscending"),
			pageNo: Session.get("ValuersPagedPageNo") || 0,
			pageSize: Session.get("ValuersPagedPageSize") || 0
		};



		

		var subs = [
			Meteor.subscribe("valuers"),
			Meteor.subscribe("valuers_paged", this.valuersPagedExtraParams),
			Meteor.subscribe("valuers_paged_count", this.valuersPagedExtraParams)
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
			valuers: Valuers.find({}, {sort:{name:1}}),
			valuers_paged: Valuers.find(databaseUtils.extendFilter({}, this.valuersPagedExtraParams), databaseUtils.extendOptions({sort:{name:1}}, this.valuersPagedExtraParams)),
			valuers_paged_count: Counts.get("valuers_paged_count")
		};
		

		
		data.valuers_paged_page_count = this.valuersPagedExtraParams && this.valuersPagedExtraParams.pageSize ? Math.ceil(data.valuers_paged_count / this.valuersPagedExtraParams.pageSize) : 1;
		if(this.isReady() && this.valuersPagedExtraParams.pageNo >= data.valuers_paged_page_count) {
			Session.set("ValuersPagedPageNo", data.valuers_paged_page_count > 0 ? data.valuers_paged_page_count - 1 : 0);
		}


		return data;
	},

	onAfterAction: function() {
		
	}
});