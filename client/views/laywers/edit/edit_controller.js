this.LaywersEditController = RouteController.extend({
	template: "LaywersEdit",
	

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
			Meteor.subscribe("insurers"),
			Meteor.subscribe("lawyer", this.params.lawyerId)
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
			insurers: Insurers.find({}, {sort:{name:1}}),
			lawyer: Lawyers.findOne({_id:this.params.lawyerId}, {})
		};
		

		

		return data;
	},

	onAfterAction: function() {
		
	}
});