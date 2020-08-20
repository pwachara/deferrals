var pageSession = new ReactiveDict();

Template.QsInstructionsQsInstructionsPendingDetails.onCreated(function() {
	
});

Template.QsInstructionsQsInstructionsPendingDetails.onDestroyed(function() {
	
});

Template.QsInstructionsQsInstructionsPendingDetails.onRendered(function() {
	

	Meteor.defer(function() {
		globalOnRendered();
		$("input[autofocus]").focus();
	});
});

Template.QsInstructionsQsInstructionsPendingDetails.events({
	
});

Template.QsInstructionsQsInstructionsPendingDetails.helpers({
	
});

Template.QsInstructionsQsInstructionsPendingDetailsForm.onCreated(function() {
	
});

Template.QsInstructionsQsInstructionsPendingDetailsForm.onDestroyed(function() {
	
});

Template.QsInstructionsQsInstructionsPendingDetailsForm.onRendered(function() {
	

	pageSession.set("qsInstructionsQsInstructionsPendingDetailsFormInfoMessage", "");
	pageSession.set("qsInstructionsQsInstructionsPendingDetailsFormErrorMessage", "");

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

Template.QsInstructionsQsInstructionsPendingDetailsForm.events({
	"submit": function(e, t) {
		e.preventDefault();
		pageSession.set("qsInstructionsQsInstructionsPendingDetailsFormInfoMessage", "");
		pageSession.set("qsInstructionsQsInstructionsPendingDetailsFormErrorMessage", "");

		var self = this;

		function submitAction(result, msg) {
			var qsInstructionsQsInstructionsPendingDetailsFormMode = "read_only";
			if(!t.find("#form-cancel-button")) {
				switch(qsInstructionsQsInstructionsPendingDetailsFormMode) {
					case "insert": {
						$(e.target)[0].reset();
					}; break;

					case "update": {
						var message = msg || "Saved.";
						pageSession.set("qsInstructionsQsInstructionsPendingDetailsFormInfoMessage", message);
					}; break;
				}
			}

			/*SUBMIT_REDIRECT*/
		}

		function errorAction(msg) {
			msg = msg || "";
			var message = msg.message || msg || "Error.";
			pageSession.set("qsInstructionsQsInstructionsPendingDetailsFormErrorMessage", message);
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

		Router.go("qs_instructions.qs_instructions_pending", mergeObjects(Router.currentRouteParams(), {}));
	},
	"click #form-back-button": function(e, t) {
		e.preventDefault();

		Router.go("qs_instructions.qs_instructions_pending", mergeObjects(Router.currentRouteParams(), {}));
	}

	
});

Template.QsInstructionsQsInstructionsPendingDetailsForm.helpers({
	"infoMessage": function() {
		return pageSession.get("qsInstructionsQsInstructionsPendingDetailsFormInfoMessage");
	},
	"errorMessage": function() {
		return pageSession.get("qsInstructionsQsInstructionsPendingDetailsFormErrorMessage");
	}
	
});
