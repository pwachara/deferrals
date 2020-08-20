this.LawyerInstructionsLawyerInstructionsClosedController = RouteController.extend({
	template: "LawyerInstructions",
	

	yieldTemplates: {
		'LawyerInstructionsLawyerInstructionsClosed': { to: 'LawyerInstructionsSubcontent'}
		
	},

	onBeforeAction: function() {
		this.next();
	},

	action: function() {
		if(this.isReady()) { this.render(); } else { this.render("LawyerInstructions"); this.render("loading", { to: "LawyerInstructionsSubcontent" });}
		/*ACTION_FUNCTION*/
	},

	isReady: function() {
		this.lawyerInstructionsClosedListPagedExtraParams = {
			searchText: Session.get("LawyerInstructionsClosedListPagedSearchString") || "",
			searchFields: Session.get("LawyerInstructionsClosedListPagedSearchFields") || ["bank_ref", "date", "lawyerId", "lawyer.name", "borrower", "banking_segment.name", "collateral", "currencies", "transaction_type", "amount", "update_date", "action_pending_with", "date_completed", "is_staff", "early_drawdown", "amount_kes", "amount_usd", "amount_eur", "amount_gbp", "rm", "undertaking_issued", "undertaking_end_date"],
			sortBy: Session.get("LawyerInstructionsClosedListPagedSortBy") || "",
			sortAscending: Session.get("LawyerInstructionsClosedListPagedSortAscending"),
			pageNo: Session.get("LawyerInstructionsClosedListPagedPageNo") || 0,
			pageSize: Session.get("LawyerInstructionsClosedListPagedPageSize") || 0
		};



		

		var subs = [
			Meteor.subscribe("lawyer_instructions_closed_list_paged", this.lawyerInstructionsClosedListPagedExtraParams),
			Meteor.subscribe("lawyer_instructions_closed_list_paged_count", this.lawyerInstructionsClosedListPagedExtraParams)
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
			lawyer_instructions_closed_list_paged: Instructions.find(databaseUtils.extendFilter({action_pending_with:{$in:["Cancelled","Closed"]}}, this.lawyerInstructionsClosedListPagedExtraParams), databaseUtils.extendOptions({}, this.lawyerInstructionsClosedListPagedExtraParams)),
			lawyer_instructions_closed_list_paged_count: Counts.get("lawyer_instructions_closed_list_paged_count")
		};
		

		
		data.lawyer_instructions_closed_list_paged_page_count = this.lawyerInstructionsClosedListPagedExtraParams && this.lawyerInstructionsClosedListPagedExtraParams.pageSize ? Math.ceil(data.lawyer_instructions_closed_list_paged_count / this.lawyerInstructionsClosedListPagedExtraParams.pageSize) : 1;
		if(this.isReady() && this.lawyerInstructionsClosedListPagedExtraParams.pageNo >= data.lawyer_instructions_closed_list_paged_page_count) {
			Session.set("LawyerInstructionsClosedListPagedPageNo", data.lawyer_instructions_closed_list_paged_page_count > 0 ? data.lawyer_instructions_closed_list_paged_page_count - 1 : 0);
		}


		return data;
	},

	onAfterAction: function() {
		
	}
});