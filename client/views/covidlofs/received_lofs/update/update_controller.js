this.CovidlofsReceivedLofsUpdateController = RouteController.extend({
	template: "Covidlofs",
	

	yieldTemplates: {
		'CovidlofsReceivedLofsUpdate': { to: 'CovidlofsSubcontent'}
		
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
			Meteor.subscribe("banking_segment_list"),
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
			banking_segment_list: BankingSegment.find({}, {sort:{name:1}}),
			received_lof: Covidlofs.findOne({_id:this.params.receivedLofId}, {})
		};
		

		

		return data;
	},

	onAfterAction: function() {
		
	}
});