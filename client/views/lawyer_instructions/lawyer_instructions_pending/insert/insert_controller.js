this.LawyerInstructionsLawyerInstructionsPendingInsertController = RouteController.extend({
	template: "LawyerInstructions",
	

	yieldTemplates: {
		'LawyerInstructionsLawyerInstructionsPendingInsert': { to: 'LawyerInstructionsSubcontent'}
		
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
			Meteor.subscribe("lawyer_instructions_pending_null")
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
			lawyer_instructions_pending_null: Instructions.findOne({_id:null}, {})
		};
		

		

		return data;
	},

	onAfterAction: function() {
		
	}
});