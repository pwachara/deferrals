this.HomePrivateInstructionsIncompleteController = RouteController.extend({
	template: "HomePrivate",
	

	yieldTemplates: {
		'HomePrivateInstructionsIncomplete': { to: 'HomePrivateSubcontent'}
		
	},

	onBeforeAction: function() {
		this.next();
	},

	action: function() {
		if(this.isReady()) { this.render(); } else { this.render("HomePrivate"); this.render("loading", { to: "HomePrivateSubcontent" });}
		/*ACTION_FUNCTION*/
	},

	isReady: function() {
		this.instructionsIncompletePagedExtraParams = {
			searchText: Session.get("InstructionsIncompletePagedSearchString") || "",
			searchFields: Session.get("InstructionsIncompletePagedSearchFields") || ["bank_ref", "date", "lawyerId", "lawyer.name", "borrower", "banking_segment.name", "collateral", "currencies", "transaction_type", "amount", "update_date", "action_pending_with", "date_completed", "is_staff", "early_drawdown", "amount_kes", "amount_usd", "amount_eur", "amount_gbp", "rm", "undertaking_issued", "undertaking_end_date"],
			sortBy: Session.get("InstructionsIncompletePagedSortBy") || "",
			sortAscending: Session.get("InstructionsIncompletePagedSortAscending"),
			pageNo: Session.get("InstructionsIncompletePagedPageNo") || 0,
			pageSize: Session.get("InstructionsIncompletePagedPageSize") || 0
		};



		

		var subs = [
			Meteor.subscribe("instructions_incomplete_paged", this.instructionsIncompletePagedExtraParams),
			Meteor.subscribe("instructions_incomplete_paged_count", this.instructionsIncompletePagedExtraParams)
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
			instructions_incomplete_paged: Instructions.find(databaseUtils.extendFilter({action_pending_with:{$nin:["Closed","Cancelled"]}}, this.instructionsIncompletePagedExtraParams), databaseUtils.extendOptions({}, this.instructionsIncompletePagedExtraParams)),
			instructions_incomplete_paged_count: Counts.get("instructions_incomplete_paged_count")
		};
		

		
		data.instructions_incomplete_paged_page_count = this.instructionsIncompletePagedExtraParams && this.instructionsIncompletePagedExtraParams.pageSize ? Math.ceil(data.instructions_incomplete_paged_count / this.instructionsIncompletePagedExtraParams.pageSize) : 1;
		if(this.isReady() && this.instructionsIncompletePagedExtraParams.pageNo >= data.instructions_incomplete_paged_page_count) {
			Session.set("InstructionsIncompletePagedPageNo", data.instructions_incomplete_paged_page_count > 0 ? data.instructions_incomplete_paged_page_count - 1 : 0);
		}


		return data;
	},

	onAfterAction: function() {
		
	}
});