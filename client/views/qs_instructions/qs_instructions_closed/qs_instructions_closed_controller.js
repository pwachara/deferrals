this.QsInstructionsQsInstructionsClosedController = RouteController.extend({
	template: "QsInstructions",
	

	yieldTemplates: {
		'QsInstructionsQsInstructionsClosed': { to: 'QsInstructionsSubcontent'}
		
	},

	onBeforeAction: function() {
		this.next();
	},

	action: function() {
		if(this.isReady()) { this.render(); } else { this.render("QsInstructions"); this.render("loading", { to: "QsInstructionsSubcontent" });}
		/*ACTION_FUNCTION*/
	},

	isReady: function() {
		this.qsInstructionsClosedListPagedExtraParams = {
			searchText: Session.get("QsInstructionsClosedListPagedSearchString") || "",
			searchFields: Session.get("QsInstructionsClosedListPagedSearchFields") || ["reference", "qs.name", "borrower", "Plot_Details", "rm", "action_pending_with", "date_closed"],
			sortBy: Session.get("QsInstructionsClosedListPagedSortBy") || "",
			sortAscending: Session.get("QsInstructionsClosedListPagedSortAscending"),
			pageNo: Session.get("QsInstructionsClosedListPagedPageNo") || 0,
			pageSize: Session.get("QsInstructionsClosedListPagedPageSize") || 0
		};



		

		var subs = [
			Meteor.subscribe("qs_instructions_closed_list_paged", this.qsInstructionsClosedListPagedExtraParams),
			Meteor.subscribe("qs_instructions_closed_list_paged_count", this.qsInstructionsClosedListPagedExtraParams)
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
			qs_instructions_closed_list_paged: QsInstructions.find(databaseUtils.extendFilter({action_pending_with:{$in:["Cancelled","Closed"]}}, this.qsInstructionsClosedListPagedExtraParams), databaseUtils.extendOptions({}, this.qsInstructionsClosedListPagedExtraParams)),
			qs_instructions_closed_list_paged_count: Counts.get("qs_instructions_closed_list_paged_count")
		};
		

		
		data.qs_instructions_closed_list_paged_page_count = this.qsInstructionsClosedListPagedExtraParams && this.qsInstructionsClosedListPagedExtraParams.pageSize ? Math.ceil(data.qs_instructions_closed_list_paged_count / this.qsInstructionsClosedListPagedExtraParams.pageSize) : 1;
		if(this.isReady() && this.qsInstructionsClosedListPagedExtraParams.pageNo >= data.qs_instructions_closed_list_paged_page_count) {
			Session.set("QsInstructionsClosedListPagedPageNo", data.qs_instructions_closed_list_paged_page_count > 0 ? data.qs_instructions_closed_list_paged_page_count - 1 : 0);
		}


		return data;
	},

	onAfterAction: function() {
		
	}
});