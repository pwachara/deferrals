this.QsInstructionsQsInstructionsPendingUpdateController = RouteController.extend({
	template: "QsInstructions",
	

	yieldTemplates: {
		'QsInstructionsQsInstructionsPendingUpdate': { to: 'QsInstructionsSubcontent'}
		
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
			Meteor.subscribe("qs_list"),
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
			qs_list: Qs.find({}, {}),
			qs_instructions_pending: QsInstructions.findOne({_id:this.params.qsInstructionsPendingId}, {})
		};
		

		

		return data;
	},

	onAfterAction: function() {
		
	}
});