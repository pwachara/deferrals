this.InstructionsDetailsController = RouteController.extend({
	template: "InstructionsDetails",
	

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
			Meteor.subscribe("instruction", this.params.instructionId)
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
			instruction: Instructions.findOne({_id:this.params.instructionId}, {})
		};
		

		

		return data;
	},

	onAfterAction: function() {
		
	}
});