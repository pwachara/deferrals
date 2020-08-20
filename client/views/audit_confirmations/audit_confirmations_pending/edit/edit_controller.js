this.AuditConfirmationsAuditConfirmationsPendingEditController = RouteController.extend({
	template: "AuditConfirmations",
	

	yieldTemplates: {
		'AuditConfirmationsAuditConfirmationsPendingEdit': { to: 'AuditConfirmationsSubcontent'}
		
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
			Meteor.subscribe("audit", this.params.auditId)
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
			audit: AuditConfirmations.findOne({_id:this.params.auditId}, {})
		};
		

		

		return data;
	},

	onAfterAction: function() {
		
	}
});