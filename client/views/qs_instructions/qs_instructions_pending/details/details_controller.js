this.QsInstructionsQsInstructionsPendingDetailsController = RouteController.extend({
	template: "QsInstructions",
	

	yieldTemplates: {
		'QsInstructionsQsInstructionsPendingDetails': { to: 'QsInstructionsSubcontent'}
		
	},

	onBeforeAction: function() {
		this.next();
	},

	action: function() {
		this.redirect('qs_instructions.qs_instructions_pending.details.qs_instructions_history', this.params || {}, { replaceState: true });
		/*ACTION_FUNCTION*/
	},

	isReady: function() {


		

		var subs = [
			Meteor.subscribe("qs_instructions_pending", this.params.qsInstructionsPendingId)
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
			qs_instructions_pending: QsInstructions.findOne({_id:this.params.qsInstructionsPendingId}, {})
		};
		

		

		return data;
	},

	onAfterAction: function() {
		
	}
});