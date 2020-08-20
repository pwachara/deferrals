this.HomePrivateLawyersInPanelController = RouteController.extend({
	template: "HomePrivate",
	

	yieldTemplates: {
		'HomePrivateLawyersInPanel': { to: 'HomePrivateSubcontent'}
		
	},

	onBeforeAction: function() {
		this.next();
	},

	action: function() {
		if(this.isReady()) { this.render(); } else { this.render("HomePrivate"); this.render("loading", { to: "HomePrivateSubcontent" });}
		/*ACTION_FUNCTION*/
	},

	isReady: function() {
		this.lawyersInPanelPagedExtraParams = {
			searchText: Session.get("LawyersInPanelPagedSearchString") || "",
			searchFields: Session.get("LawyersInPanelPagedSearchFields") || ["name", "insurerId", "insurer.name", "is_in_panel", "notes"],
			sortBy: Session.get("LawyersInPanelPagedSortBy") || "",
			sortAscending: Session.get("LawyersInPanelPagedSortAscending"),
			pageNo: Session.get("LawyersInPanelPagedPageNo") || 0,
			pageSize: Session.get("LawyersInPanelPagedPageSize") || 0
		};



		

		var subs = [
			Meteor.subscribe("lawyers_in_panel_paged", this.lawyersInPanelPagedExtraParams),
			Meteor.subscribe("lawyers_in_panel_paged_count", this.lawyersInPanelPagedExtraParams)
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
			lawyers_in_panel_paged: Lawyers.find(databaseUtils.extendFilter({is_in_panel:true}, this.lawyersInPanelPagedExtraParams), databaseUtils.extendOptions({}, this.lawyersInPanelPagedExtraParams)),
			lawyers_in_panel_paged_count: Counts.get("lawyers_in_panel_paged_count")
		};
		

		
		data.lawyers_in_panel_paged_page_count = this.lawyersInPanelPagedExtraParams && this.lawyersInPanelPagedExtraParams.pageSize ? Math.ceil(data.lawyers_in_panel_paged_count / this.lawyersInPanelPagedExtraParams.pageSize) : 1;
		if(this.isReady() && this.lawyersInPanelPagedExtraParams.pageNo >= data.lawyers_in_panel_paged_page_count) {
			Session.set("LawyersInPanelPagedPageNo", data.lawyers_in_panel_paged_page_count > 0 ? data.lawyers_in_panel_paged_page_count - 1 : 0);
		}


		return data;
	},

	onAfterAction: function() {
		
	}
});