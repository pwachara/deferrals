this.QsInstructionsQsInstructionsPendingController = RouteController.extend({
	template: "QsInstructions",
	

	yieldTemplates: {
		'QsInstructionsQsInstructionsPending': { to: 'QsInstructionsSubcontent'}
		
	},

	onBeforeAction: function() {
		this.next();
	},

	action: function() {
		if(this.isReady()) { this.render(); } else { this.render("QsInstructions"); this.render("loading", { to: "QsInstructionsSubcontent" });}
		/*ACTION_FUNCTION*/
	},

	isReady: function() {
		this.qsInstructionsPendingListPagedExtraParams = {
			searchText: Session.get("QsInstructionsPendingListPagedSearchString") || "",
			searchFields: Session.get("QsInstructionsPendingListPagedSearchFields") || ["reference", "qs.name", "borrower", "Plot_Details", "rm", "action_pending_with", "date_closed"],
			sortBy: Session.get("QsInstructionsPendingListPagedSortBy") || "",
			sortAscending: Session.get("QsInstructionsPendingListPagedSortAscending"),
			pageNo: Session.get("QsInstructionsPendingListPagedPageNo") || 0,
			pageSize: Session.get("QsInstructionsPendingListPagedPageSize") || 0
		};



		

		var subs = [
			Meteor.subscribe("qs_instructions_pending_list_paged", this.qsInstructionsPendingListPagedExtraParams),
			Meteor.subscribe("qs_instructions_pending_list_paged_count", this.qsInstructionsPendingListPagedExtraParams)
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
			qs_instructions_pending_list_paged: QsInstructions.find(databaseUtils.extendFilter({action_pending_with:{$nin:["Cancelled","Closed"]}}, this.qsInstructionsPendingListPagedExtraParams), databaseUtils.extendOptions({}, this.qsInstructionsPendingListPagedExtraParams)),
			qs_instructions_pending_list_paged_count: Counts.get("qs_instructions_pending_list_paged_count")
		};
		

		
		data.qs_instructions_pending_list_paged_page_count = this.qsInstructionsPendingListPagedExtraParams && this.qsInstructionsPendingListPagedExtraParams.pageSize ? Math.ceil(data.qs_instructions_pending_list_paged_count / this.qsInstructionsPendingListPagedExtraParams.pageSize) : 1;
		if(this.isReady() && this.qsInstructionsPendingListPagedExtraParams.pageNo >= data.qs_instructions_pending_list_paged_page_count) {
			Session.set("QsInstructionsPendingListPagedPageNo", data.qs_instructions_pending_list_paged_page_count > 0 ? data.qs_instructions_pending_list_paged_page_count - 1 : 0);
		}


		return data;
	},

	onAfterAction: function() {
		
	}
});