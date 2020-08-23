this.CovidlofsReceivedLofsDetailsController = RouteController.extend({
	template: "Covidlofs",
	

	yieldTemplates: {
		'CovidlofsReceivedLofsDetails': { to: 'CovidlofsSubcontent'}
		
	},

	onBeforeAction: function() {
		this.next();
	},

	action: function() {
		if(this.isReady()) { this.render(); } else { this.render("Covidlofs"); this.render("loading", { to: "CovidlofsSubcontent" });}
		/*ACTION_FUNCTION*/
	},

	isReady: function() {


		

		var subs = [
			Meteor.subscribe("received_lof", this.params.receivedLofId)
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
			received_lof: Covidlofs.findOne({_id:this.params.receivedLofId}, {})
		};
		

		

		return data;
	},

	onAfterAction: function() {
		
	}
});