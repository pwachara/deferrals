this.BrdsBrdsPendingEditController = RouteController.extend({
	template: "Brds",
	

	yieldTemplates: {
		'BrdsBrdsPendingEdit': { to: 'BrdsSubcontent'}
		
	},

	onBeforeAction: function() {
		this.next();
	},

	action: function() {
		if(this.isReady()) { this.render(); } else { this.render("Brds"); this.render("loading", { to: "BrdsSubcontent" });}
		/*ACTION_FUNCTION*/
	},

	isReady: function() {


		

		var subs = [
			Meteor.subscribe("brd", this.params.brdId)
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
			brd: Brds.findOne({_id:this.params.brdId}, {})
		};
		

		

		return data;
	},

	onAfterAction: function() {
		
	}
});