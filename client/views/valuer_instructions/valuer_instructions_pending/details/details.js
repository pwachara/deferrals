var pageSession = new ReactiveDict();

Template.ValuerInstructionsValuerInstructionsPendingDetails.onCreated(function() {
	
});

Template.ValuerInstructionsValuerInstructionsPendingDetails.onDestroyed(function() {
	
});

Template.ValuerInstructionsValuerInstructionsPendingDetails.onRendered(function() {
	
	Meteor.defer(function() {
		globalOnRendered();
		$("input[autofocus]").focus();
	});
});

Template.ValuerInstructionsValuerInstructionsPendingDetails.events({
	
});

Template.ValuerInstructionsValuerInstructionsPendingDetails.helpers({
	
});

Template.ValuerInstructionsValuerInstructionsPendingDetailsForm.onCreated(function() {
	
});

Template.ValuerInstructionsValuerInstructionsPendingDetailsForm.onDestroyed(function() {
	
});

Template.ValuerInstructionsValuerInstructionsPendingDetailsForm.onRendered(function() {
	

	pageSession.set("valuerInstructionsValuerInstructionsPendingDetailsFormInfoMessage", "");
	pageSession.set("valuerInstructionsValuerInstructionsPendingDetailsFormErrorMessage", "");

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

Template.ValuerInstructionsValuerInstructionsPendingDetailsForm.events({
	"submit": function(e, t) {
		e.preventDefault();
		pageSession.set("valuerInstructionsValuerInstructionsPendingDetailsFormInfoMessage", "");
		pageSession.set("valuerInstructionsValuerInstructionsPendingDetailsFormErrorMessage", "");

		var self = this;

		function submitAction(result, msg) {
			var valuerInstructionsValuerInstructionsPendingDetailsFormMode = "read_only";
			if(!t.find("#form-cancel-button")) {
				switch(valuerInstructionsValuerInstructionsPendingDetailsFormMode) {
					case "insert": {
						$(e.target)[0].reset();
					}; break;

					case "update": {
						var message = msg || "Saved.";
						pageSession.set("valuerInstructionsValuerInstructionsPendingDetailsFormInfoMessage", message);
					}; break;
				}
			}

			/*SUBMIT_REDIRECT*/
		}

		function errorAction(msg) {
			msg = msg || "";
			var message = msg.message || msg || "Error.";
			pageSession.set("valuerInstructionsValuerInstructionsPendingDetailsFormErrorMessage", message);
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

		Router.go("valuer_instructions.valuer_instructions_pending", mergeObjects(Router.currentRouteParams(), {}));
	},
	"click #form-back-button": function(e, t) {
		e.preventDefault();

		Router.go("valuer_instructions.valuer_instructions_pending", mergeObjects(Router.currentRouteParams(), {}));
	}

	
});

Template.ValuerInstructionsValuerInstructionsPendingDetailsForm.helpers({
	"infoMessage": function() {
		return pageSession.get("valuerInstructionsValuerInstructionsPendingDetailsFormInfoMessage");
	},
	"errorMessage": function() {
		return pageSession.get("valuerInstructionsValuerInstructionsPendingDetailsFormErrorMessage");
	}
	
});
