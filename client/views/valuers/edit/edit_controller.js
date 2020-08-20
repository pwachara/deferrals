this.ValuersEditController = RouteController.extend({
	template: "ValuersEdit",
	

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
			Meteor.subscribe("valuer", this.params.valuerId)
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
			valuer: Valuers.findOne({_id:this.params.valuerId}, {})
		};
		

		

		return data;
	},

	onAfterAction: function() {
		
	}
});