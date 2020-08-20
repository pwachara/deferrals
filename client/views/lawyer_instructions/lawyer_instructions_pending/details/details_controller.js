this.LawyerInstructionsLawyerInstructionsPendingDetailsController = RouteController.extend({
	template: "LawyerInstructions",
	

	yieldTemplates: {
		'LawyerInstructionsLawyerInstructionsPendingDetails': { to: 'LawyerInstructionsSubcontent'}
		
	},

	onBeforeAction: function() {
		this.next();
	},

	action: function() {
		if(this.isReady()) { this.render(); } else { this.render("LawyerInstructions"); this.render("loading", { to: "LawyerInstructionsSubcontent" });}
		/*ACTION_FUNCTION*/
	},

	isReady: function() {


		

		var subs = [
			Meteor.subscribe("lawyer_instructions_pending", this.params.lawyerInstructionsPendingId)
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
			lawyer_instructions_pending: Instructions.findOne({_id:this.params.lawyerInstructionsPendingId}, {})
		};
		

		

		return data;
	},

	onAfterAction: function() {
		
	}
});