this.InstructionsInsertController = RouteController.extend({
	template: "InstructionsInsert",
	

	yieldTemplates: {
		/*YIELD_TEMPLATES*/
	},

	onBeforeAction: function() {
		this.next();
	},

	action: function() {
		if(this.isReady()) { this.render(); } else { this.render("loading"); }
		/*ACTION_FUNCTION*/
	},

	isReady: function() {


		

		var subs = [
			Meteor.subscribe("lawyers"),
			Meteor.subscribe("banking_segment_list"),
			Meteor.subscribe("instructions_empty")
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
			instructions_empty: Instructions.findOne({_id:null}, {})
		};
		

		

		return data;
	},

	onAfterAction: function() {
		
	}
});