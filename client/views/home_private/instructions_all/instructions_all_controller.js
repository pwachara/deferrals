this.HomePrivateInstructionsAllController = RouteController.extend({
	template: "HomePrivate",
	

	yieldTemplates: {
		'HomePrivateInstructionsAll': { to: 'HomePrivateSubcontent'}
		
	},

	onBeforeAction: function() {
		this.next();
	},

	action: function() {
		if(this.isReady()) { this.render(); } else { this.render("HomePrivate"); this.render("loading", { to: "HomePrivateSubcontent" });}
		/*ACTION_FUNCTION*/
	},

	isReady: function() {
		this.instructionsAllPagedExtraParams = {
			searchText: Session.get("InstructionsAllPagedSearchString") || "",
			searchFields: Session.get("InstructionsAllPagedSearchFields") || ["bank_ref", "date", "lawyerId", "lawyer.name", "borrower", "banking_segment.name", "collateral", "currencies", "transaction_type", "amount", "update_date", "action_pending_with", "date_completed", "is_staff", "early_drawdown", "amount_kes", "amount_usd", "amount_eur", "amount_gbp", "rm", "undertaking_issued", "undertaking_end_date"],
			sortBy: Session.get("InstructionsAllPagedSortBy") || "",
			sortAscending: Session.get("InstructionsAllPagedSortAscending"),
			pageNo: Session.get("InstructionsAllPagedPageNo") || 0,
			pageSize: Session.get("InstructionsAllPagedPageSize") || 0
		};



		

		var subs = [
			Meteor.subscribe("instructions_all_paged", this.instructionsAllPagedExtraParams),
			Meteor.subscribe("instructions_all_paged_count", this.instructionsAllPagedExtraParams)
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
			instructions_all_paged: Instructions.find(databaseUtils.extendFilter({}, this.instructionsAllPagedExtraParams), databaseUtils.extendOptions({}, this.instructionsAllPagedExtraParams)),
			instructions_all_paged_count: Counts.get("instructions_all_paged_count")
		};
		

		
		data.instructions_all_paged_page_count = this.instructionsAllPagedExtraParams && this.instructionsAllPagedExtraParams.pageSize ? Math.ceil(data.instructions_all_paged_count / this.instructionsAllPagedExtraParams.pageSize) : 1;
		if(this.isReady() && this.instructionsAllPagedExtraParams.pageNo >= data.instructions_all_paged_page_count) {
			Session.set("InstructionsAllPagedPageNo", data.instructions_all_paged_page_count > 0 ? data.instructions_all_paged_page_count - 1 : 0);
		}


		return data;
	},

	onAfterAction: function() {
		
	}
});