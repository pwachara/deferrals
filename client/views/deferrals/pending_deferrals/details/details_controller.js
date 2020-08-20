this.DeferralsPendingDeferralsDetailsController = RouteController.extend({
	template: "Deferrals",
	

	yieldTemplates: {
		'DeferralsPendingDeferralsDetails': { to: 'DeferralsSubcontent'}
		
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
			deferral: Deferrals.findOne({_id:this.params.deferralId}, {})
		};
		

		

		return data;
	},

	onAfterAction: function() {
		
	}
});