this.InstructionsController = RouteController.extend({
	template: "Instructions",
	

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
		this.instructionsPagedExtraParams = {
			searchText: Session.get("InstructionsPagedSearchString") || "",
			searchFields: Session.get("InstructionsPagedSearchFields") || ["bank_ref", "date", "lawyerId", "lawyer.name", "borrower", "banking_segment.name", "collateral", "currencies", "transaction_type", "amount", "update_date", "action_pending_with", "date_completed", "is_staff", "early_drawdown", "amount_kes", "amount_usd", "amount_eur", "amount_gbp", "rm", "undertaking_issued", "undertaking_end_date"],
			sortBy: Session.get("InstructionsPagedSortBy") || "",
			sortAscending: Session.get("InstructionsPagedSortAscending"),
			pageNo: Session.get("InstructionsPagedPageNo") || 0,
			pageSize: Session.get("InstructionsPagedPageSize") || 25
		};



		

		var subs = [
			Meteor.subscribe("instructions_paged", this.instructionsPagedExtraParams),
			Meteor.subscribe("instructions_paged_count", this.instructionsPagedExtraParams)
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
			instructions_paged: Instructions.find(databaseUtils.extendFilter({}, this.instructionsPagedExtraParams), databaseUtils.extendOptions({sort:{date:-1}}, this.instructionsPagedExtraParams)),
			instructions_paged_count: Counts.get("instructions_paged_count")
		};
		

		
		data.instructions_paged_page_count = this.instructionsPagedExtraParams && this.instructionsPagedExtraParams.pageSize ? Math.ceil(data.instructions_paged_count / this.instructionsPagedExtraParams.pageSize) : 1;
		if(this.isReady() && this.instructionsPagedExtraParams.pageNo >= data.instructions_paged_page_count) {
			Session.set("InstructionsPagedPageNo", data.instructions_paged_page_count > 0 ? data.instructions_paged_page_count - 1 : 0);
		}


		return data;
	},

	onAfterAction: function() {
		
	}
});