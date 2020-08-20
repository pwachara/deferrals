this.ValuerInstructionsValuerInstructionsClosedDetailsController = RouteController.extend({
	template: "ValuerInstructions",
	

	yieldTemplates: {
		'ValuerInstructionsValuerInstructionsClosedDetails': { to: 'ValuerInstructionsSubcontent'}
		
	},

	onBeforeAction: function() {
		this.next();
	},

	action: function() {
		if(this.isReady()) { this.render(); } else { this.render("ValuerInstructions"); this.render("loading", { to: "ValuerInstructionsSubcontent" });}
		/*ACTION_FUNCTION*/
	},

	isReady: function() {


		

		var subs = [
			Meteor.subscribe("valuer_instructions_closed", this.params.valuerInstructionsClosedId)
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
			valuer_instructions_closed: ValuerInstructions.findOne({_id:this.params.valuerInstructionsClosedId}, {})
		};
		

		

		return data;
	},

	onAfterAction: function() {
		
	}
});