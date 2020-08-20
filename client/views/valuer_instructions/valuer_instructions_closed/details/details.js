var pageSession = new ReactiveDict();

Template.ValuerInstructionsValuerInstructionsClosedDetails.onCreated(function() {
	
});

Template.ValuerInstructionsValuerInstructionsClosedDetails.onDestroyed(function() {
	
});

Template.ValuerInstructionsValuerInstructionsClosedDetails.onRendered(function() {
	
	Meteor.defer(function() {
		globalOnRendered();
		$("input[autofocus]").focus();
	});
});

Template.ValuerInstructionsValuerInstructionsClosedDetails.events({
	
});

Template.ValuerInstructionsValuerInstructionsClosedDetails.helpers({
	
});

Template.ValuerInstructionsValuerInstructionsClosedDetailsForm.onCreated(function() {
	
});

Template.ValuerInstructionsValuerInstructionsClosedDetailsForm.onDestroyed(function() {
	
});

Template.ValuerInstructionsValuerInstructionsClosedDetailsForm.onRendered(function() {
	

	pageSession.set("valuerInstructionsValuerInstructionsClosedDetailsFormInfoMessage", "");
	pageSession.set("valuerInstructionsValuerInstructionsClosedDetailsFormErrorMessage", "");

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

Template.ValuerInstructionsValuerInstructionsClosedDetailsForm.events({
	"submit": function(e, t) {
		e.preventDefault();
		pageSession.set("valuerInstructionsValuerInstructionsClosedDetailsFormInfoMessage", "");
		pageSession.set("valuerInstructionsValuerInstructionsClosedDetailsFormErrorMessage", "");

		var self = this;

		function submitAction(result, msg) {
			var valuerInstructionsValuerInstructionsClosedDetailsFormMode = "read_only";
			if(!t.find("#form-cancel-button")) {
				switch(valuerInstructionsValuerInstructionsClosedDetailsFormMode) {
					case "insert": {
						$(e.target)[0].reset();
					}; break;

					case "update": {
						var message = msg || "Saved.";
						pageSession.set("valuerInstructionsValuerInstructionsClosedDetailsFormInfoMessage", message);
					}; break;
				}
			}

			/*SUBMIT_REDIRECT*/
		}

		function errorAction(msg) {
			msg = msg || "";
			var message = msg.message || msg || "Error.";
			pageSession.set("valuerInstructionsValuerInstructionsClosedDetailsFormErrorMessage", message);
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

		Router.go("valuer_instructions.valuer_instructions_closed", mergeObjects(Router.currentRouteParams(), {}));
	},
	"click #form-back-button": function(e, t) {
		e.preventDefault();

		Router.go("valuer_instructions.valuer_instructions_closed", mergeObjects(Router.currentRouteParams(), {}));
	}

	
});

Template.ValuerInstructionsValuerInstructionsClosedDetailsForm.helpers({
	"infoMessage": function() {
		return pageSession.get("valuerInstructionsValuerInstructionsClosedDetailsFormInfoMessage");
	},
	"errorMessage": function() {
		return pageSession.get("valuerInstructionsValuerInstructionsClosedDetailsFormErrorMessage");
	}
	
});
