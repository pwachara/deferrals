this.CovidlofsUpdateController = RouteController.extend({
	template: "CovidlofsUpdate",
	

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
			Meteor.subscribe("banking_segment_list"),
			Meteor.subscribe("covidlof", this.params.covidlofId)
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
			banking_segment_list: BankingSegment.find({}, {sort:{name:1}}),
			covidlof: Covidlofs.findOne({_id:this.params.covidlofId}, {})
		};
		

		

		return data;
	},

	onAfterAction: function() {
		
	}
});