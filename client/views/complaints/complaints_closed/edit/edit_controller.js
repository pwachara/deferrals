this.ComplaintsComplaintsClosedEditController = RouteController.extend({
	template: "Complaints",
	

	yieldTemplates: {
		'ComplaintsComplaintsClosedEdit': { to: 'ComplaintsSubcontent'}
		
	},

	onBeforeAction: function() {
		this.next();
	},

	action: function() {
		if(this.isReady()) { this.render(); } else { this.render("Complaints"); this.render("loading", { to: "ComplaintsSubcontent" });}
		/*ACTION_FUNCTION*/
	},

	isReady: function() {


		

		var subs = [
			Meteor.subscribe("complaint", this.params.complaintId)
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
			complaint: Complaints.findOne({_id:this.params.complaintId}, {})
		};
		

		

		return data;
	},

	onAfterAction: function() {
		
	}
});