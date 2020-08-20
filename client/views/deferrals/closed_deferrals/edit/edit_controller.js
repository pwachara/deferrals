this.DeferralsClosedDeferralsEditController = RouteController.extend({
	template: "Deferrals",
	

	yieldTemplates: {
		'DeferralsClosedDeferralsEdit': { to: 'DeferralsSubcontent'}
		
	},

	onBeforeAction: function() {
		this.next();
	},

	action: function() {
		if(this.isReady()) { this.render(); } else { this.render("Deferrals"); this.render("loading", { to: "DeferralsSubcontent" });}
		/*ACTION_FUNCTION*/
	},

	isReady: function() {


		

		var subs = [
			Meteor.subscribe("banking_segment_list"),
			Meteor.subscribe("deferral", this.params.deferralId)
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
			deferral: Deferrals.findOne({_id:this.params.deferralId}, {})
		};
		

		

		return data;
	},

	onAfterAction: function() {
		
	}
});