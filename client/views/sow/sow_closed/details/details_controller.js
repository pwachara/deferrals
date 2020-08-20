this.SowSowClosedDetailsController = RouteController.extend({
	template: "Sow",
	

	yieldTemplates: {
		'SowSowClosedDetails': { to: 'SowSubcontent'}
		
	},

	onBeforeAction: function() {
		this.next();
	},

	action: function() {
		if(this.isReady()) { this.render(); } else { this.render("Sow"); this.render("loading", { to: "SowSubcontent" });}
		/*ACTION_FUNCTION*/
	},

	isReady: function() {


		

		var subs = [
			Meteor.subscribe("sow_closed", this.params.sowClosedId)
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
			sow_closed: Sow.findOne({_id:this.params.sowClosedId}, {})
		};
		

		

		return data;
	},

	onAfterAction: function() {
		
	}
});