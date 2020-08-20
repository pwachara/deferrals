this.QsInstructionsQsInstructionsPendingDetailsQsInstructionsHistoryController = RouteController.extend({
	template: "QsInstructions",
	

	yieldTemplates: {
		'QsInstructionsQsInstructionsPendingDetailsQsInstructionsHistory': { to: 'QsInstructionsQsInstructionsPendingDetailsSubcontent'},
		'QsInstructionsQsInstructionsPendingDetails': { to: 'QsInstructionsSubcontent'}
		
	},

	onBeforeAction: function() {
		this.next();
	},

	action: function() {
		if(this.isReady()) { this.render(); } else { this.render("QsInstructions"); this.render("loading", { to: "QsInstructionsSubcontent" });}
		/*ACTION_FUNCTION*/
	},

	isReady: function() {
		this.qsInstructionsHistoryListPagedExtraParams = {
			searchText: Session.get("QsInstructionsHistoryListPagedSearchString") || "",
			searchFields: Session.get("QsInstructionsHistoryListPagedSearchFields") || ["date", "update"],
			sortBy: Session.get("QsInstructionsHistoryListPagedSortBy") || "",
			sortAscending: Session.get("QsInstructionsHistoryListPagedSortAscending"),
			pageNo: Session.get("QsInstructionsHistoryListPagedPageNo") || 0,
			pageSize: Session.get("QsInstructionsHistoryListPagedPageSize") || 15
		};



		

		var subs = [
			Meteor.subscribe("qs_instructions_history_list_paged", this.params.qsInstructionsPendingId, this.qsInstructionsHistoryListPagedExtraParams),
			Meteor.subscribe("qs_instructions_history_list_paged_count", this.params.qsInstructionsPendingId, this.qsInstructionsHistoryListPagedExtraParams),
			Meteor.subscribe("qs_instructions_pending", this.params.qsInstructionsPendingId)
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
			qs_instructions_history_list_paged: QsInstructionsHistory.find(databaseUtils.extendFilter({qsInstructionsPendingId:this.params.qsInstructionsPendingId}, this.qsInstructionsHistoryListPagedExtraParams), databaseUtils.extendOptions({sort:{date:-1}}, this.qsInstructionsHistoryListPagedExtraParams)),
			qs_instructions_history_list_paged_count: Counts.get("qs_instructions_history_list_paged_count"),
			qs_instructions_pending: QsInstructions.findOne({_id:this.params.qsInstructionsPendingId}, {})
		};
		

		
		data.qs_instructions_history_list_paged_page_count = this.qsInstructionsHistoryListPagedExtraParams && this.qsInstructionsHistoryListPagedExtraParams.pageSize ? Math.ceil(data.qs_instructions_history_list_paged_count / this.qsInstructionsHistoryListPagedExtraParams.pageSize) : 1;
		if(this.isReady() && this.qsInstructionsHistoryListPagedExtraParams.pageNo >= data.qs_instructions_history_list_paged_page_count) {
			Session.set("QsInstructionsHistoryListPagedPageNo", data.qs_instructions_history_list_paged_page_count > 0 ? data.qs_instructions_history_list_paged_page_count - 1 : 0);
		}


		return data;
	},

	onAfterAction: function() {
		
	}
});