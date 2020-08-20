this.BankingSegmentsController = RouteController.extend({
	template: "BankingSegments",
	

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
		this.bankingSegmentListPagedExtraParams = {
			searchText: Session.get("BankingSegmentListPagedSearchString") || "",
			searchFields: Session.get("BankingSegmentListPagedSearchFields") || ["name"],
			sortBy: Session.get("BankingSegmentListPagedSortBy") || "",
			sortAscending: Session.get("BankingSegmentListPagedSortAscending"),
			pageNo: Session.get("BankingSegmentListPagedPageNo") || 0,
			pageSize: Session.get("BankingSegmentListPagedPageSize") || 0
		};



		

		var subs = [
			Meteor.subscribe("banking_segment_list_paged", this.bankingSegmentListPagedExtraParams),
			Meteor.subscribe("banking_segment_list_paged_count", this.bankingSegmentListPagedExtraParams)
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
			banking_segment_list_paged: BankingSegment.find(databaseUtils.extendFilter({}, this.bankingSegmentListPagedExtraParams), databaseUtils.extendOptions({sort:{name:1}}, this.bankingSegmentListPagedExtraParams)),
			banking_segment_list_paged_count: Counts.get("banking_segment_list_paged_count")
		};
		

		
		data.banking_segment_list_paged_page_count = this.bankingSegmentListPagedExtraParams && this.bankingSegmentListPagedExtraParams.pageSize ? Math.ceil(data.banking_segment_list_paged_count / this.bankingSegmentListPagedExtraParams.pageSize) : 1;
		if(this.isReady() && this.bankingSegmentListPagedExtraParams.pageNo >= data.banking_segment_list_paged_page_count) {
			Session.set("BankingSegmentListPagedPageNo", data.banking_segment_list_paged_page_count > 0 ? data.banking_segment_list_paged_page_count - 1 : 0);
		}


		return data;
	},

	onAfterAction: function() {
		
	}
});