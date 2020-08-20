var pageSession = new ReactiveDict();

Template.SowSowPendingDetails.onCreated(function() {
	
});

Template.SowSowPendingDetails.onDestroyed(function() {
	
});

Template.SowSowPendingDetails.onRendered(function() {
	
	Meteor.defer(function() {
		globalOnRendered();
		$("input[autofocus]").focus();
	});
});

Template.SowSowPendingDetails.events({
	
});

Template.SowSowPendingDetails.helpers({
	
});

Template.SowSowPendingDetailsForm.onCreated(function() {
	
});

Template.SowSowPendingDetailsForm.onDestroyed(function() {
	
});

Template.SowSowPendingDetailsForm.onRendered(function() {
	

	pageSession.set("sowSowPendingDetailsFormInfoMessage", "");
	pageSession.set("sowSowPendingDetailsFormErrorMessage", "");

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

Template.SowSowPendingDetailsForm.events({
	"submit": function(e, t) {
		e.preventDefault();
		pageSession.set("sowSowPendingDetailsFormInfoMessage", "");
		pageSession.set("sowSowPendingDetailsFormErrorMessage", "");

		var self = this;

		function submitAction(result, msg) {
			var sowSowPendingDetailsFormMode = "read_only";
			if(!t.find("#form-cancel-button")) {
				switch(sowSowPendingDetailsFormMode) {
					case "insert": {
						$(e.target)[0].reset();
					}; break;

					case "update": {
						var message = msg || "Saved.";
						pageSession.set("sowSowPendingDetailsFormInfoMessage", message);
					}; break;
				}
			}

			/*SUBMIT_REDIRECT*/
		}

		function errorAction(msg) {
			msg = msg || "";
			var message = msg.message || msg || "Error.";
			pageSession.set("sowSowPendingDetailsFormErrorMessage", message);
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

		Router.go("sow.sow_pending", mergeObjects(Router.currentRouteParams(), {}));
	},
	"click #form-back-button": function(e, t) {
		e.preventDefault();

		Router.go("sow.sow_pending", mergeObjects(Router.currentRouteParams(), {}));
	}

	
});

Template.SowSowPendingDetailsForm.helpers({
	"infoMessage": function() {
		return pageSession.get("sowSowPendingDetailsFormInfoMessage");
	},
	"errorMessage": function() {
		return pageSession.get("sowSowPendingDetailsFormErrorMessage");
	}
	
});
