this.InsurersDetailsController = RouteController.extend({
	template: "InsurersDetails",
	

	yieldTemplates: {
		/*YIELD_TEMPLATES*/
	},

	onBeforeAction: function() {
		this.next();
	},

	action: function() {
		if(this.isReady()) { this.render(); } else { this.render("loading"); }
		/*ACTION_FUNCTION*/
	},

	isReady: function() {


		

		var subs = [
			Meteor.subscribe("insurer", this.params.insurerId)
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
			insurer: Insurers.findOne({_id:this.params.insurerId}, {})
		};
		

		

		return data;
	},

	onAfterAction: function() {
		
	}
});