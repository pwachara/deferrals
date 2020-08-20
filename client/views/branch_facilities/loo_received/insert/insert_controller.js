this.BranchFacilitiesLooReceivedInsertController = RouteController.extend({
	template: "BranchFacilities",
	

	yieldTemplates: {
		'BranchFacilitiesLooReceivedInsert': { to: 'BranchFacilitiesSubcontent'}
		
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
			Meteor.subscribe("loo_received_null")
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
			loo_received_null: BranchFacilities.findOne({_id:null}, {})
		};
		

		

		return data;
	},

	onAfterAction: function() {
		
	}
});