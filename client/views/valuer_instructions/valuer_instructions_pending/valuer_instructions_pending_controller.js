this.ValuerInstructionsValuerInstructionsPendingController = RouteController.extend({
	template: "ValuerInstructions",
	

	yieldTemplates: {
		'ValuerInstructionsValuerInstructionsPending': { to: 'ValuerInstructionsSubcontent'}
		
	},

	onBeforeAction: function() {
		this.next();
	},

	action: function() {
		if(this.isReady()) { this.render(); } else { this.render("ValuerInstructions"); this.render("loading", { to: "ValuerInstructionsSubcontent" });}
		/*ACTION_FUNCTION*/
	},

	isReady: function() {
		this.valuerInstructionsPendingListPagedExtraParams = {
			searchText: Session.get("ValuerInstructionsPendingListPagedSearchString") || "",
			searchFields: Session.get("ValuerInstructionsPendingListPagedSearchFields") || ["bank_ref", "date", "valuerId", "valuer.name", "borrower", "banking_segmentId", "banking_segment.name", "property", "update", "update_date", "status", "date_closed", "value", "rm", "reasons_for_delay"],
			sortBy: Session.get("ValuerInstructionsPendingListPagedSortBy") || "",
			sortAscending: Session.get("ValuerInstructionsPendingListPagedSortAscending"),
			pageNo: Session.get("ValuerInstructionsPendingListPagedPageNo") || 0,
			pageSize: Session.get("ValuerInstructionsPendingListPagedPageSize") || 0
		};



		

		var subs = [
			Meteor.subscribe("valuer_instructions_pending_list_paged", this.valuerInstructionsPendingListPagedExtraParams),
			Meteor.subscribe("valuer_instructions_pending_list_paged_count", this.valuerInstructionsPendingListPagedExtraParams)
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
			valuer_instructions_pending_list_paged: ValuerInstructions.find(databaseUtils.extendFilter({status:{$nin:["Cancelled","Closed"]}}, this.valuerInstructionsPendingListPagedExtraParams), databaseUtils.extendOptions({}, this.valuerInstructionsPendingListPagedExtraParams)),
			valuer_instructions_pending_list_paged_count: Counts.get("valuer_instructions_pending_list_paged_count")
		};
		

		
		data.valuer_instructions_pending_list_paged_page_count = this.valuerInstructionsPendingListPagedExtraParams && this.valuerInstructionsPendingListPagedExtraParams.pageSize ? Math.ceil(data.valuer_instructions_pending_list_paged_count / this.valuerInstructionsPendingListPagedExtraParams.pageSize) : 1;
		if(this.isReady() && this.valuerInstructionsPendingListPagedExtraParams.pageNo >= data.valuer_instructions_pending_list_paged_page_count) {
			Session.set("ValuerInstructionsPendingListPagedPageNo", data.valuer_instructions_pending_list_paged_page_count > 0 ? data.valuer_instructions_pending_list_paged_page_count - 1 : 0);
		}


		return data;
	},

	onAfterAction: function() {
		
	}
});