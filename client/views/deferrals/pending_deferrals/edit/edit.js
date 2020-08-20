var pageSession = new ReactiveDict();

Template.DeferralsPendingDeferralsEdit.onCreated(function() {
	
});

Template.DeferralsPendingDeferralsEdit.onDestroyed(function() {
	
});

Template.DeferralsPendingDeferralsEdit.onRendered(function() {
	
	Meteor.defer(function() {
		globalOnRendered();
		$("input[autofocus]").focus();
	});
});

Template.DeferralsPendingDeferralsEdit.events({
	
});

Template.DeferralsPendingDeferralsEdit.helpers({
	
});

Template.DeferralsPendingDeferralsEditEditForm.onCreated(function() {
	
});

Template.DeferralsPendingDeferralsEditEditForm.onDestroyed(function() {
	
});

Template.DeferralsPendingDeferralsEditEditForm.onRendered(function() {
	

	pageSession.set("deferralsPendingDeferralsEditEditFormInfoMessage", "");
	pageSession.set("deferralsPendingDeferralsEditEditFormErrorMessage", "");

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

Template.DeferralsPendingDeferralsEditEditForm.events({
	"submit": function(e, t) {
		e.preventDefault();
		pageSession.set("deferralsPendingDeferralsEditEditFormInfoMessage", "");
		pageSession.set("deferralsPendingDeferralsEditEditFormErrorMessage", "");

		var self = this;

		function submitAction(result, msg) {
			var deferralsPendingDeferralsEditEditFormMode = "update";
			if(!t.find("#form-cancel-button")) {
				switch(deferralsPendingDeferralsEditEditFormMode) {
					case "insert": {
						$(e.target)[0].reset();
					}; break;

					case "update": {
						var message = msg || "Saved.";
						pageSession.set("deferralsPendingDeferralsEditEditFormInfoMessage", message);
					}; break;
				}
			}

			Router.go("deferrals.pending_deferrals", mergeObjects(Router.currentRouteParams(), {}));
		}

		function errorAction(msg) {
			msg = msg || "";
			var message = msg.message || msg || "Error.";
			pageSession.set("deferralsPendingDeferralsEditEditFormErrorMessage", message);
		}

		validateForm(
			$(e.target),
			function(fieldName, fieldValue) {

			},
			function(msg) {

			},
			function(values) {
				

				Meteor.call("deferralsUpdate", t.data.deferral._id, values, function(e, r) { if(e) errorAction(e); else submitAction(r); });
			}
		);

		return false;
	},
	"click #form-cancel-button": function(e, t) {
		e.preventDefault();

		

		Router.go("deferrals.pending_deferrals", mergeObjects(Router.currentRouteParams(), {}));
	},
	"click #form-close-button": function(e, t) {
		e.preventDefault();

		/*CLOSE_REDIRECT*/
	},
	"click #form-back-button": function(e, t) {
		e.preventDefault();

		/*BACK_REDIRECT*/
	}

	
});

Template.DeferralsPendingDeferralsEditEditForm.helpers({
	"infoMessage": function() {
		return pageSession.get("deferralsPendingDeferralsEditEditFormInfoMessage");
	},
	"errorMessage": function() {
		return pageSession.get("deferralsPendingDeferralsEditEditFormErrorMessage");
	}
	
});
