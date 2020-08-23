this.CovidlofsReceivedLofsController = RouteController.extend({
	template: "Covidlofs",
	

	yieldTemplates: {
		'CovidlofsReceivedLofs': { to: 'CovidlofsSubcontent'}
		
	},

	onBeforeAction: function() {
		this.next();
	},

	action: function() {
		if(this.isReady()) { this.render(); } else { this.render("Covidlofs"); this.render("loading", { to: "CovidlofsSubcontent" });}
		/*ACTION_FUNCTION*/
	},

	isReady: function() {
		this.receivedLofListPagedExtraParams = {
			searchText: Session.get("ReceivedLofListPagedSearchString") || "",
			searchFields: Session.get("ReceivedLofListPagedSearchFields") || ["borrower", "rm", "rm_email", "lof_received", "banking_segment.name"],
			sortBy: Session.get("ReceivedLofListPagedSortBy") || "",
			sortAscending: Session.get("ReceivedLofListPagedSortAscending"),
			pageNo: Session.get("ReceivedLofListPagedPageNo") || 0,
			pageSize: Session.get("ReceivedLofListPagedPageSize") || 0
		};



		

		var subs = [
			Meteor.subscribe("received_lof_list_paged", this.receivedLofListPagedExtraParams),
			Meteor.subscribe("received_lof_list_paged_count", this.receivedLofListPagedExtraParams)
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
			received_lof_list_paged: Covidlofs.find(databaseUtils.extendFilter({lof_received:"YES"}, this.receivedLofListPagedExtraParams), databaseUtils.extendOptions({}, this.receivedLofListPagedExtraParams)),
			received_lof_list_paged_count: Counts.get("received_lof_list_paged_count")
		};
		

		
		data.received_lof_list_paged_page_count = this.receivedLofListPagedExtraParams && this.receivedLofListPagedExtraParams.pageSize ? Math.ceil(data.received_lof_list_paged_count / this.receivedLofListPagedExtraParams.pageSize) : 1;
		if(this.isReady() && this.receivedLofListPagedExtraParams.pageNo >= data.received_lof_list_paged_page_count) {
			Session.set("ReceivedLofListPagedPageNo", data.received_lof_list_paged_page_count > 0 ? data.received_lof_list_paged_page_count - 1 : 0);
		}


		return data;
	},

	onAfterAction: function() {
		
	}
});