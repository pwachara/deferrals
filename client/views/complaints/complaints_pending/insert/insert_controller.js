this.ComplaintsComplaintsPendingInsertController = RouteController.extend({
	template: "Complaints",
	

	yieldTemplates: {
		'ComplaintsComplaintsPendingInsert': { to: 'ComplaintsSubcontent'}
		
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
			Meteor.subscribe("complaints_empty")
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
			complaints_empty: Complaints.findOne({_id:null}, {})
		};
		

		

		return data;
	},

	onAfterAction: function() {
		
	}
});