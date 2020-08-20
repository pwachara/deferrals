this.BankingSegmentsUpdateController = RouteController.extend({
	template: "BankingSegmentsUpdate",
	

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
			Meteor.subscribe("banking_segment", this.params.bankingSegmentId)
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
			banking_segment: BankingSegment.findOne({_id:this.params.bankingSegmentId}, {})
		};
		

		

		return data;
	},

	onAfterAction: function() {
		
	}
});