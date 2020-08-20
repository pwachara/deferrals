this.AuditConfirmationsAuditConfirmationsPendingController = RouteController.extend({
	template: "AuditConfirmations",
	

	yieldTemplates: {
		'AuditConfirmationsAuditConfirmationsPending': { to: 'AuditConfirmationsSubcontent'}
		
	},

	onBeforeAction: function() {
		this.next();
	},

	action: function() {
		if(this.isReady()) { this.render(); } else { this.render("AuditConfirmations"); this.render("loading", { to: "AuditConfirmationsSubcontent" });}
		/*ACTION_FUNCTION*/
	},

	isReady: function() {
		this.auditsPendingPagedExtraParams = {
			searchText: Session.get("AuditsPendingPagedSearchString") || "",
			searchFields: Session.get("AuditsPendingPagedSearchFields") || ["date_received", "customer_name", "customer_number", "sender", "branch", "year_of_audit", "charges_collected", "amount_collected", "date_dispatched", "status", "comments"],
			sortBy: Session.get("AuditsPendingPagedSortBy") || "",
			sortAscending: Session.get("AuditsPendingPagedSortAscending"),
			pageNo: Session.get("AuditsPendingPagedPageNo") || 0,
			pageSize: Session.get("AuditsPendingPagedPageSize") || 0
		};



		

		var subs = [
			Meteor.subscribe("audits_pending_paged", this.auditsPendingPagedExtraParams),
			Meteor.subscribe("audits_pending_paged_count", this.auditsPendingPagedExtraParams)
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
			audits_pending_paged: AuditConfirmations.find(databaseUtils.extendFilter({status:"pending"}, this.auditsPendingPagedExtraParams), databaseUtils.extendOptions({sort:{date_received:1}}, this.auditsPendingPagedExtraParams)),
			audits_pending_paged_count: Counts.get("audits_pending_paged_count")
		};
		

		
		data.audits_pending_paged_page_count = this.auditsPendingPagedExtraParams && this.auditsPendingPagedExtraParams.pageSize ? Math.ceil(data.audits_pending_paged_count / this.auditsPendingPagedExtraParams.pageSize) : 1;
		if(this.isReady() && this.auditsPendingPagedExtraParams.pageNo >= data.audits_pending_paged_page_count) {
			Session.set("AuditsPendingPagedPageNo", data.audits_pending_paged_page_count > 0 ? data.audits_pending_paged_page_count - 1 : 0);
		}


		return data;
	},

	onAfterAction: function() {
		
	}
});