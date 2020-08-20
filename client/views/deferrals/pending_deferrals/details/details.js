var pageSession = new ReactiveDict();

Template.DeferralsPendingDeferralsDetails.onCreated(function() {
	
});

Template.DeferralsPendingDeferralsDetails.onDestroyed(function() {
	
});

Template.DeferralsPendingDeferralsDetails.onRendered(function() {
	
	Meteor.defer(function() {
		globalOnRendered();
		$("input[autofocus]").focus();
	});
});

Template.DeferralsPendingDeferralsDetails.events({
	
	"click #page-back-button": function(e, t) {
		e.preventDefault();
		Router.go("deferrals.pending_deferrals", mergeObjects(Router.currentRouteParams(), {  }));
	}
});

Template.DeferralsPendingDeferralsDetails.helpers({
	
});

Template.DeferralsPendingDeferralsDetailsDetailsForm.onCreated(function() {
	
});

Template.DeferralsPendingDeferralsDetailsDetailsForm.onDestroyed(function() {
	
});

Template.DeferralsPendingDeferralsDetailsDetailsForm.onRendered(function() {
	

	pageSession.set("deferralsPendingDeferralsDetailsDetailsFormInfoMessage", "");
	pageSession.set("deferralsPendingDeferralsDetailsDetailsFormErrorMessage", "");

	$(".input-group.date").each(function() {
		var format = $(this).find("input[type='text']").attr("data-format");

		if(format) {
			format = format.toLowerCase();
		}
		else {
			format = "mm/dd/yyyy";
		}

		$(this).datepicker({
			autoclose: true,
			todayHighlight: true,
			todayBtn: true,
			forceParse: false,
			keyboardNavigation: false,
			format: format
		});
	});

	$("input[type='file']").fileinput();
	$("select[data-role='tagsinput']").tagsinput();
	$(".bootstrap-tagsinput").addClass("form-control");
	$("input[autofocus]").focus();
});

Template.DeferralsPendingDeferralsDetailsDetailsForm.events({
	"submit": function(e, t) {
		e.preventDefault();
		pageSession.set("deferralsPendingDeferralsDetailsDetailsFormInfoMessage", "");
		pageSession.set("deferralsPendingDeferralsDetailsDetailsFormErrorMessage", "");

		var self = this;

		function submitAction(result, msg) {
			var deferralsPendingDeferralsDetailsDetailsFormMode = "read_only";
			if(!t.find("#form-cancel-button")) {
				switch(deferralsPendingDeferralsDetailsDetailsFormMode) {
					case "insert": {
						$(e.target)[0].reset();
					}; break;

					case "update": {
						var message = msg || "Saved.";
						pageSession.set("deferralsPendingDeferralsDetailsDetailsFormInfoMessage", message);
					}; break;
				}
			}

			/*SUBMIT_REDIRECT*/
		}

		function errorAction(msg) {
			msg = msg || "";
			var message = msg.message || msg || "Error.";
			pageSession.set("deferralsPendingDeferralsDetailsDetailsFormErrorMessage", message);
		}

		validateForm(
			$(e.target),
			function(fieldName, fieldValue) {

			},
			function(msg) {

			},
			function(values) {
				

				
			}
		);

		return false;
	},
	"click #form-cancel-button": function(e, t) {
		e.preventDefault();

		

		/*CANCEL_REDIRECT*/
	},
	"click #form-close-button": function(e, t) {
		e.preventDefault();

		/*CLOSE_REDIRECT*/
	},
	"click #form-back-button": function(e, t) {
		e.preventDefault();

		Router.go("deferrals.pending_deferrals", mergeObjects(Router.currentRouteParams(), {}));
	}

	
});

Template.DeferralsPendingDeferralsDetailsDetailsForm.helpers({
	"infoMessage": function() {
		return pageSession.get("deferralsPendingDeferralsDetailsDetailsFormInfoMessage");
	},
	"errorMessage": function() {
		return pageSession.get("deferralsPendingDeferralsDetailsDetailsFormErrorMessage");
	}
	
});
