this.BranchFacilitiesAllBranchFacilitiesDetailsController = RouteController.extend({
	template: "BranchFacilities",
	

	yieldTemplates: {
		'BranchFacilitiesAllBranchFacilitiesDetails': { to: 'BranchFacilitiesSubcontent'}
		
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
			Meteor.subscribe("all_branch_facilities", this.params.allBranchFacilitiesId)
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
			all_branch_facilities: BranchFacilities.findOne({_id:this.params.allBranchFacilitiesId}, {})
		};
		

		

		return data;
	},

	onAfterAction: function() {
		
	}
});