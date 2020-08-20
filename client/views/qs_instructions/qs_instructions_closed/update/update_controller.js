this.QsInstructionsQsInstructionsClosedUpdateController = RouteController.extend({
	template: "QsInstructions",
	

	yieldTemplates: {
		'QsInstructionsQsInstructionsClosedUpdate': { to: 'QsInstructionsSubcontent'}
		
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
			Meteor.subscribe("qs_instructions_closed", this.params.qsInstructionsClosedId)
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
			qs_instructions_closed: QsInstructions.findOne({_id:this.params.qsInstructionsClosedId}, {})
		};
		

		

		return data;
	},

	onAfterAction: function() {
		
	}
});