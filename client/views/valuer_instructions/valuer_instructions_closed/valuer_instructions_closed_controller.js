this.ValuerInstructionsValuerInstructionsClosedController = RouteController.extend({
	template: "ValuerInstructions",
	

	yieldTemplates: {
		'ValuerInstructionsValuerInstructionsClosed': { to: 'ValuerInstructionsSubcontent'}
		
	},

	onBeforeAction: function() {
		this.next();
	},

	action: function() {
		if(this.isReady()) { this.render(); } else { this.render("ValuerInstructions"); this.render("loading", { to: "ValuerInstructionsSubcontent" });}
		/*ACTION_FUNCTION*/
	},

	isReady: function() {
		this.valuerInstructionsClosedListPagedExtraParams = {
			searchText: Session.get("ValuerInstructionsClosedListPagedSearchString") || "",
			searchFields: Session.get("ValuerInstructionsClosedListPagedSearchFields") || ["bank_ref", "date", "valuerId", "valuer.name", "borrower", "banking_segment.name", "property", "update", "update_date", "status", "date_closed", "value", "rm", "reasons_for_delay"],
			sortBy: Session.get("ValuerInstructionsClosedListPagedSortBy") || "",
			sortAscending: Session.get("ValuerInstructionsClosedListPagedSortAscending"),
			pageNo: Session.get("ValuerInstructionsClosedListPagedPageNo") || 0,
			pageSize: Session.get("ValuerInstructionsClosedListPagedPageSize") || 0
		};



		

		var subs = [
			Meteor.subscribe("valuer_instructions_closed_list_paged", this.valuerInstructionsClosedListPagedExtraParams),
			Meteor.subscribe("valuer_instructions_closed_list_paged_count", this.valuerInstructionsClosedListPagedExtraParams)
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
			valuer_instructions_closed_list_paged: ValuerInstructions.find(databaseUtils.extendFilter({status:{$in:["Cancelled","Closed"]}}, this.valuerInstructionsClosedListPagedExtraParams), databaseUtils.extendOptions({}, this.valuerInstructionsClosedListPagedExtraParams)),
			valuer_instructions_closed_list_paged_count: Counts.get("valuer_instructions_closed_list_paged_count")
		};
		

		
		data.valuer_instructions_closed_list_paged_page_count = this.valuerInstructionsClosedListPagedExtraParams && this.valuerInstructionsClosedListPagedExtraParams.pageSize ? Math.ceil(data.valuer_instructions_closed_list_paged_count / this.valuerInstructionsClosedListPagedExtraParams.pageSize) : 1;
		if(this.isReady() && this.valuerInstructionsClosedListPagedExtraParams.pageNo >= data.valuer_instructions_closed_list_paged_page_count) {
			Session.set("ValuerInstructionsClosedListPagedPageNo", data.valuer_instructions_closed_list_paged_page_count > 0 ? data.valuer_instructions_closed_list_paged_page_count - 1 : 0);
		}


		return data;
	},

	onAfterAction: function() {
		
	}
});