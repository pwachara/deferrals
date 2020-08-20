this.HomePrivateInstructionsIncompleteEditController = RouteController.extend({
	template: "HomePrivate",
	

	yieldTemplates: {
		'HomePrivateInstructionsIncompleteEdit': { to: 'HomePrivateSubcontent'}
		
	},

	onBeforeAction: function() {
		this.next();
	},

	action: function() {
		if(this.isReady()) { this.render(); } else { this.render("HomePrivate"); this.render("loading", { to: "HomePrivateSubcontent" });}
		/*ACTION_FUNCTION*/
	},

	isReady: function() {


		

		var subs = [
			Meteor.subscribe("instruction", this.params.instructionId),
			Meteor.subscribe("lawyers"),
			Meteor.subscribe("banking_segment_list")
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
			instruction: Instructions.findOne({_id:this.params.instructionId}, {}),
			lawyers: Lawyers.find({}, {sort:{name:1}}),
			banking_segment_list: BankingSegment.find({}, {sort:{name:1}})
		};
		

		

		return data;
	},

	onAfterAction: function() {
		
	}
});