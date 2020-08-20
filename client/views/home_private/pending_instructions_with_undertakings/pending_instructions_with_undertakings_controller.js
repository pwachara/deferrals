this.HomePrivatePendingInstructionsWithUndertakingsController = RouteController.extend({
	template: "HomePrivate",
	

	yieldTemplates: {
		'HomePrivatePendingInstructionsWithUndertakings': { to: 'HomePrivateSubcontent'}
		
	},

	onBeforeAction: function() {
		this.next();
	},

	action: function() {
		if(this.isReady()) { this.render(); } else { this.render("HomePrivate"); this.render("loading", { to: "HomePrivateSubcontent" });}
		/*ACTION_FUNCTION*/
	},

	isReady: function() {
		this.instructionsWithUndertakingPagedExtraParams = {
			searchText: Session.get("InstructionsWithUndertakingPagedSearchString") || "",
			searchFields: Session.get("InstructionsWithUndertakingPagedSearchFields") || ["bank_ref", "date", "lawyerId", "lawyer.name", "borrower", "banking_segment.name", "collateral", "currencies", "transaction_type", "amount", "update_date", "action_pending_with", "date_completed", "is_staff", "early_drawdown", "amount_kes", "amount_usd", "amount_eur", "amount_gbp", "rm", "undertaking_issued", "undertaking_end_date"],
			sortBy: Session.get("InstructionsWithUndertakingPagedSortBy") || "",
			sortAscending: Session.get("InstructionsWithUndertakingPagedSortAscending"),
			pageNo: Session.get("InstructionsWithUndertakingPagedPageNo") || 0,
			pageSize: Session.get("InstructionsWithUndertakingPagedPageSize") || 0
		};



		

		var subs = [
			Meteor.subscribe("instructions_with_undertaking_paged", this.instructionsWithUndertakingPagedExtraParams),
			Meteor.subscribe("instructions_with_undertaking_paged_count", this.instructionsWithUndertakingPagedExtraParams)
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
			instructions_with_undertaking_paged: Instructions.find(databaseUtils.extendFilter({undertaking_issued:"Yes",action_pending_with:{$nin:["Closed","Cancelled"]}}, this.instructionsWithUndertakingPagedExtraParams), databaseUtils.extendOptions({}, this.instructionsWithUndertakingPagedExtraParams)),
			instructions_with_undertaking_paged_count: Counts.get("instructions_with_undertaking_paged_count")
		};
		

		
		data.instructions_with_undertaking_paged_page_count = this.instructionsWithUndertakingPagedExtraParams && this.instructionsWithUndertakingPagedExtraParams.pageSize ? Math.ceil(data.instructions_with_undertaking_paged_count / this.instructionsWithUndertakingPagedExtraParams.pageSize) : 1;
		if(this.isReady() && this.instructionsWithUndertakingPagedExtraParams.pageNo >= data.instructions_with_undertaking_paged_page_count) {
			Session.set("InstructionsWithUndertakingPagedPageNo", data.instructions_with_undertaking_paged_page_count > 0 ? data.instructions_with_undertaking_paged_page_count - 1 : 0);
		}


		return data;
	},

	onAfterAction: function() {
		
	}
});