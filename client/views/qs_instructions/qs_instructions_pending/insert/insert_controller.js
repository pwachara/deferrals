this.QsInstructionsQsInstructionsPendingInsertController = RouteController.extend({
	template: "QsInstructions",
	

	yieldTemplates: {
		'QsInstructionsQsInstructionsPendingInsert': { to: 'QsInstructionsSubcontent'}
		
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
			Meteor.subscribe("qs_instructions_pending_null")
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
			qs_instructions_pending_null: QsInstructions.findOne({_id:null}, {})
		};
		

		

		return data;
	},

	onAfterAction: function() {
		
	}
});