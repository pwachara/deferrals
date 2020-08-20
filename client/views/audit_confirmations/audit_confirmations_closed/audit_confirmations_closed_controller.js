this.AuditConfirmationsAuditConfirmationsClosedController = RouteController.extend({
	template: "AuditConfirmations",
	

	yieldTemplates: {
		'AuditConfirmationsAuditConfirmationsClosed': { to: 'AuditConfirmationsSubcontent'}
		
	},

	onBeforeAction: function() {
		this.next();
	},

	action: function() {
		if(this.isReady()) { this.render(); } else { this.render("AuditConfirmations"); this.render("loading", { to: "AuditConfirmationsSubcontent" });}
		/*ACTION_FUNCTION*/
	},

	isReady: function() {
		this.auditsClosedPagedExtraParams = {
			searchText: Session.get("AuditsClosedPagedSearchString") || "",
			searchFields: Session.get("AuditsClosedPagedSearchFields") || ["date_received", "customer_name", "customer_number", "sender", "branch", "year_of_audit", "charges_collected", "amount_collected", "date_dispatched", "status", "comments"],
			sortBy: Session.get("AuditsClosedPagedSortBy") || "",
			sortAscending: Session.get("AuditsClosedPagedSortAscending"),
			pageNo: Session.get("AuditsClosedPagedPageNo") || 0,
			pageSize: Session.get("AuditsClosedPagedPageSize") || 0
		};



		

		var subs = [
			Meteor.subscribe("audits_closed_paged", this.auditsClosedPagedExtraParams),
			Meteor.subscribe("audits_closed_paged_count", this.auditsClosedPagedExtraParams)
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
			audits_closed_paged: AuditConfirmations.find(databaseUtils.extendFilter({status:"closed"}, this.auditsClosedPagedExtraParams), databaseUtils.extendOptions({sort:{date_received:1}}, this.auditsClosedPagedExtraParams)),
			audits_closed_paged_count: Counts.get("audits_closed_paged_count")
		};
		

		
		data.audits_closed_paged_page_count = this.auditsClosedPagedExtraParams && this.auditsClosedPagedExtraParams.pageSize ? Math.ceil(data.audits_closed_paged_count / this.auditsClosedPagedExtraParams.pageSize) : 1;
		if(this.isReady() && this.auditsClosedPagedExtraParams.pageNo >= data.audits_closed_paged_page_count) {
			Session.set("AuditsClosedPagedPageNo", data.audits_closed_paged_page_count > 0 ? data.audits_closed_paged_page_count - 1 : 0);
		}


		return data;
	},

	onAfterAction: function() {
		
	}
});