this.QsInstructionsQsInstructionsPendingDetailsInsertController = RouteController.extend({
	template: "QsInstructions",
	

	yieldTemplates: {
		'QsInstructionsQsInstructionsPendingDetailsInsert': { to: 'QsInstructionsQsInstructionsPendingDetailsSubcontent'},
		'QsInstructionsQsInstructionsPendingDetails': { to: 'QsInstructionsSubcontent'}
		
	},

	onBeforeAction: function() {
		this.next();
	},

	action: function() {
		if(this.isReady()) { this.render(); } else { this.render("QsInstructions"); this.render("loading", { to: "QsInstructionsSubcontent" });}
		/*ACTION_FUNCTION*/
	},

	isReady: function() {


		

		var subs = [
			Meteor.subscribe("qs_instructions_history_null"),
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
			qs_instructions_history_null: QsInstructionsHistory.findOne({_id:null}, {}),
			qs_instructions_pending: QsInstructions.findOne({_id:this.params.qsInstructionsPendingId}, {})
		};
		

		

		return data;
	},

	onAfterAction: function() {
		
	}
});