this.AuditConfirmationsAuditConfirmationsPendingInsertController = RouteController.extend({
	template: "AuditConfirmations",
	

	yieldTemplates: {
		'AuditConfirmationsAuditConfirmationsPendingInsert': { to: 'AuditConfirmationsSubcontent'}
		
	},

	onBeforeAction: function() {
		this.next();
	},

	action: function() {
		if(this.isReady()) { this.render(); } else { this.render("AuditConfirmations"); this.render("loading", { to: "AuditConfirmationsSubcontent" });}
		/*ACTION_FUNCTION*/
	},

	isReady: function() {


		

		var subs = [
			Meteor.subscribe("audits_empty")
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
			audits_empty: AuditConfirmations.findOne({_id:null}, {})
		};
		

		

		return data;
	},

	onAfterAction: function() {
		
	}
});