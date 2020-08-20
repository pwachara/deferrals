this.HomePrivateInstructionsCompleteController = RouteController.extend({
	template: "HomePrivate",
	

	yieldTemplates: {
		'HomePrivateInstructionsComplete': { to: 'HomePrivateSubcontent'}
		
	},

	onBeforeAction: function() {
		this.next();
	},

	action: function() {
		if(this.isReady()) { this.render(); } else { this.render("HomePrivate"); this.render("loading", { to: "HomePrivateSubcontent" });}
		/*ACTION_FUNCTION*/
	},

	isReady: function() {
		this.instructionsCompletePagedExtraParams = {
			searchText: Session.get("InstructionsCompletePagedSearchString") || "",
			searchFields: Session.get("InstructionsCompletePagedSearchFields") || ["bank_ref", "date", "lawyerId", "lawyer.name", "borrower", "banking_segment.name", "collateral", "currencies", "transaction_type", "amount", "update_date", "action_pending_with", "date_completed", "is_staff", "early_drawdown", "amount_kes", "amount_usd", "amount_eur", "amount_gbp", "rm", "undertaking_issued", "undertaking_end_date"],
			sortBy: Session.get("InstructionsCompletePagedSortBy") || "",
			sortAscending: Session.get("InstructionsCompletePagedSortAscending"),
			pageNo: Session.get("InstructionsCompletePagedPageNo") || 0,
			pageSize: Session.get("InstructionsCompletePagedPageSize") || 0
		};



		

		var subs = [
			Meteor.subscribe("instructions_complete_paged", this.instructionsCompletePagedExtraParams),
			Meteor.subscribe("instructions_complete_paged_count", this.instructionsCompletePagedExtraParams)
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
			instructions_complete_paged: Instructions.find(databaseUtils.extendFilter({action_pending_with:{$in:["Closed","Cancelled"]}}, this.instructionsCompletePagedExtraParams), databaseUtils.extendOptions({}, this.instructionsCompletePagedExtraParams)),
			instructions_complete_paged_count: Counts.get("instructions_complete_paged_count")
		};
		

		
		data.instructions_complete_paged_page_count = this.instructionsCompletePagedExtraParams && this.instructionsCompletePagedExtraParams.pageSize ? Math.ceil(data.instructions_complete_paged_count / this.instructionsCompletePagedExtraParams.pageSize) : 1;
		if(this.isReady() && this.instructionsCompletePagedExtraParams.pageNo >= data.instructions_complete_paged_page_count) {
			Session.set("InstructionsCompletePagedPageNo", data.instructions_complete_paged_page_count > 0 ? data.instructions_complete_paged_page_count - 1 : 0);
		}


		return data;
	},

	onAfterAction: function() {
		
	}
});