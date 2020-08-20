this.ComplaintsComplaintsPendingController = RouteController.extend({
	template: "Complaints",
	

	yieldTemplates: {
		'ComplaintsComplaintsPending': { to: 'ComplaintsSubcontent'}
		
	},

	onBeforeAction: function() {
		this.next();
	},

	action: function() {
		if(this.isReady()) { this.render(); } else { this.render("Complaints"); this.render("loading", { to: "ComplaintsSubcontent" });}
		/*ACTION_FUNCTION*/
	},

	isReady: function() {
		this.complaintsPendingPagedExtraParams = {
			searchText: Session.get("ComplaintsPendingPagedSearchString") || "",
			searchFields: Session.get("ComplaintsPendingPagedSearchFields") || ["complaint_date", "unit", "staff_name", "complainant", "is_staff", "complainant_contact", "complaint_description", "how_resolved", "status", "date_closed"],
			sortBy: Session.get("ComplaintsPendingPagedSortBy") || "",
			sortAscending: Session.get("ComplaintsPendingPagedSortAscending"),
			pageNo: Session.get("ComplaintsPendingPagedPageNo") || 0,
			pageSize: Session.get("ComplaintsPendingPagedPageSize") || 0
		};



		

		var subs = [
			Meteor.subscribe("complaints_pending_paged", this.complaintsPendingPagedExtraParams),
			Meteor.subscribe("complaints_pending_paged_count", this.complaintsPendingPagedExtraParams)
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
			complaints_pending_paged: Complaints.find(databaseUtils.extendFilter({status:"Pending"}, this.complaintsPendingPagedExtraParams), databaseUtils.extendOptions({sort:{complaint_date:1}}, this.complaintsPendingPagedExtraParams)),
			complaints_pending_paged_count: Counts.get("complaints_pending_paged_count")
		};
		

		
		data.complaints_pending_paged_page_count = this.complaintsPendingPagedExtraParams && this.complaintsPendingPagedExtraParams.pageSize ? Math.ceil(data.complaints_pending_paged_count / this.complaintsPendingPagedExtraParams.pageSize) : 1;
		if(this.isReady() && this.complaintsPendingPagedExtraParams.pageNo >= data.complaints_pending_paged_page_count) {
			Session.set("ComplaintsPendingPagedPageNo", data.complaints_pending_paged_page_count > 0 ? data.complaints_pending_paged_page_count - 1 : 0);
		}


		return data;
	},

	onAfterAction: function() {
		
	}
});