this.LawyerInstructionsLawyerInstructionsPendingController = RouteController.extend({
	template: "LawyerInstructions",
	

	yieldTemplates: {
		'LawyerInstructionsLawyerInstructionsPending': { to: 'LawyerInstructionsSubcontent'}
		
	},

	onBeforeAction: function() {
		this.next();
	},

	action: function() {
		if(this.isReady()) { this.render(); } else { this.render("LawyerInstructions"); this.render("loading", { to: "LawyerInstructionsSubcontent" });}
		/*ACTION_FUNCTION*/
	},

	isReady: function() {
		this.lawyerInstructionsPendingListPagedExtraParams = {
			searchText: Session.get("LawyerInstructionsPendingListPagedSearchString") || "",
			searchFields: Session.get("LawyerInstructionsPendingListPagedSearchFields") || ["bank_ref", "date", "lawyerId", "lawyer.name", "borrower", "banking_segment.name", "collateral", "currencies", "transaction_type", "amount", "update_date", "action_pending_with", "date_completed", "is_staff", "early_drawdown", "amount_kes", "amount_usd", "amount_eur", "amount_gbp", "rm", "undertaking_issued", "undertaking_end_date"],
			sortBy: Session.get("LawyerInstructionsPendingListPagedSortBy") || "",
			sortAscending: Session.get("LawyerInstructionsPendingListPagedSortAscending"),
			pageNo: Session.get("LawyerInstructionsPendingListPagedPageNo") || 0,
			pageSize: Session.get("LawyerInstructionsPendingListPagedPageSize") || 0
		};



		

		var subs = [
			Meteor.subscribe("lawyer_instructions_pending_list_paged", this.lawyerInstructionsPendingListPagedExtraParams),
			Meteor.subscribe("lawyer_instructions_pending_list_paged_count", this.lawyerInstructionsPendingListPagedExtraParams)
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
			lawyer_instructions_pending_list_paged: Instructions.find(databaseUtils.extendFilter({action_pending_with:{$nin:["Cancelled","Closed"]}}, this.lawyerInstructionsPendingListPagedExtraParams), databaseUtils.extendOptions({}, this.lawyerInstructionsPendingListPagedExtraParams)),
			lawyer_instructions_pending_list_paged_count: Counts.get("lawyer_instructions_pending_list_paged_count")
		};
		

		
		data.lawyer_instructions_pending_list_paged_page_count = this.lawyerInstructionsPendingListPagedExtraParams && this.lawyerInstructionsPendingListPagedExtraParams.pageSize ? Math.ceil(data.lawyer_instructions_pending_list_paged_count / this.lawyerInstructionsPendingListPagedExtraParams.pageSize) : 1;
		if(this.isReady() && this.lawyerInstructionsPendingListPagedExtraParams.pageNo >= data.lawyer_instructions_pending_list_paged_page_count) {
			Session.set("LawyerInstructionsPendingListPagedPageNo", data.lawyer_instructions_pending_list_paged_page_count > 0 ? data.lawyer_instructions_pending_list_paged_page_count - 1 : 0);
		}


		return data;
	},

	onAfterAction: function() {
		
	}
});