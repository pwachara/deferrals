this.ComplaintsComplaintsClosedController = RouteController.extend({
	template: "Complaints",
	

	yieldTemplates: {
		'ComplaintsComplaintsClosed': { to: 'ComplaintsSubcontent'}
		
	},

	onBeforeAction: function() {
		this.next();
	},

	action: function() {
		if(this.isReady()) { this.render(); } else { this.render("Complaints"); this.render("loading", { to: "ComplaintsSubcontent" });}
		/*ACTION_FUNCTION*/
	},

	isReady: function() {
		this.complaintsClosedPagedExtraParams = {
			searchText: Session.get("ComplaintsClosedPagedSearchString") || "",
			searchFields: Session.get("ComplaintsClosedPagedSearchFields") || ["complaint_date", "unit", "staff_name", "complainant", "is_staff", "complainant_contact", "complaint_description", "how_resolved", "status", "date_closed"],
			sortBy: Session.get("ComplaintsClosedPagedSortBy") || "",
			sortAscending: Session.get("ComplaintsClosedPagedSortAscending"),
			pageNo: Session.get("ComplaintsClosedPagedPageNo") || 0,
			pageSize: Session.get("ComplaintsClosedPagedPageSize") || 0
		};



		

		var subs = [
			Meteor.subscribe("complaints_closed_paged", this.complaintsClosedPagedExtraParams),
			Meteor.subscribe("complaints_closed_paged_count", this.complaintsClosedPagedExtraParams)
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
			complaints_closed_paged: Complaints.find(databaseUtils.extendFilter({status:"Closed"}, this.complaintsClosedPagedExtraParams), databaseUtils.extendOptions({sort:{complaint_date:1}}, this.complaintsClosedPagedExtraParams)),
			complaints_closed_paged_count: Counts.get("complaints_closed_paged_count")
		};
		

		
		data.complaints_closed_paged_page_count = this.complaintsClosedPagedExtraParams && this.complaintsClosedPagedExtraParams.pageSize ? Math.ceil(data.complaints_closed_paged_count / this.complaintsClosedPagedExtraParams.pageSize) : 1;
		if(this.isReady() && this.complaintsClosedPagedExtraParams.pageNo >= data.complaints_closed_paged_page_count) {
			Session.set("ComplaintsClosedPagedPageNo", data.complaints_closed_paged_page_count > 0 ? data.complaints_closed_paged_page_count - 1 : 0);
		}


		return data;
	},

	onAfterAction: function() {
		
	}
});