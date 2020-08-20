this.ValuerInstructionsValuerInstructionsPendingUpdateController = RouteController.extend({
	template: "ValuerInstructions",
	

	yieldTemplates: {
		'ValuerInstructionsValuerInstructionsPendingUpdate': { to: 'ValuerInstructionsSubcontent'}
		
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
			Meteor.subscribe("valuers"),
			Meteor.subscribe("banking_segment_list"),
			Meteor.subscribe("valuer_instructions_pending", this.params.valuerInstructionsPendingId)
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
			valuers: Valuers.find({}, {sort:{name:1}}),
			banking_segment_list: BankingSegment.find({}, {sort:{name:1}}),
			valuer_instructions_pending: ValuerInstructions.findOne({_id:this.params.valuerInstructionsPendingId}, {})
		};
		

		

		return data;
	},

	onAfterAction: function() {
		
	}
});