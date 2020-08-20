this.BranchFacilitiesLooPendingUpdateController = RouteController.extend({
	template: "BranchFacilities",
	

	yieldTemplates: {
		'BranchFacilitiesLooPendingUpdate': { to: 'BranchFacilitiesSubcontent'}
		
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
			Meteor.subscribe("branch_list"),
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
			branch_list: Branches.find({}, {}),
			loo_pending1: BranchFacilities.findOne({_id:this.params.looPendingId}, {})
		};
		

		

		return data;
	},

	onAfterAction: function() {
		
	}
});