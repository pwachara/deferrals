this.SowSowPendingDetailsController = RouteController.extend({
	template: "Sow",
	

	yieldTemplates: {
		'SowSowPendingDetails': { to: 'SowSubcontent'}
		
	},

	onBeforeAction: function() {
		this.next();
	},

	action: function() {
		if(this.isReady()) { this.render(); } else { this.render("Sow"); this.render("loading", { to: "SowSubcontent" });}
		/*ACTION_FUNCTION*/
	},

	isReady: function() {


		

		var subs = [
			Meteor.subscribe("sow_pending", this.params.sowPendingId)
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
			sow_pending: Sow.findOne({_id:this.params.sowPendingId}, {})
		};
		

		

		return data;
	},

	onAfterAction: function() {
		
	}
});