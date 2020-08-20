this.BranchFacilitiesLooPendingDetailsController = RouteController.extend({
	template: "BranchFacilities",
	

	yieldTemplates: {
		'BranchFacilitiesLooPendingDetails': { to: 'BranchFacilitiesSubcontent'}
		
	},

	onBeforeAction: function() {
		this.next();
	},

	action: function() {
		if(this.isReady()) { this.render(); } else { this.render("BranchFacilities"); this.render("loading", { to: "BranchFacilitiesSubcontent" });}
		/*ACTION_FUNCTION*/
	},

	isReady: function() {


		

		var subs = [
			Meteor.subscribe("loo_pending1", this.params.looPendingId)
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
			loo_pending1: BranchFacilities.findOne({_id:this.params.looPendingId}, {})
		};
		

		

		return data;
	},

	onAfterAction: function() {
		
	}
});