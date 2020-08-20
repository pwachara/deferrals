this.LawyerInstructionsLawyerInstructionsPendingUpdateController = RouteController.extend({
	template: "LawyerInstructions",
	

	yieldTemplates: {
		'LawyerInstructionsLawyerInstructionsPendingUpdate': { to: 'LawyerInstructionsSubcontent'}
		
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
			Meteor.subscribe("lawyers"),
			Meteor.subscribe("banking_segment_list"),
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
			lawyers: Lawyers.find({}, {sort:{name:1}}),
			banking_segment_list: BankingSegment.find({}, {sort:{name:1}}),
			lawyer_instructions_pending: Instructions.findOne({_id:this.params.lawyerInstructionsPendingId}, {})
		};
		

		

		return data;
	},

	onAfterAction: function() {
		
	}
});