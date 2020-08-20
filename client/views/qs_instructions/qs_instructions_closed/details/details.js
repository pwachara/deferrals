var pageSession = new ReactiveDict();

Template.QsInstructionsQsInstructionsClosedDetails.onCreated(function() {
	
});

Template.QsInstructionsQsInstructionsClosedDetails.onDestroyed(function() {
	
});

Template.QsInstructionsQsInstructionsClosedDetails.onRendered(function() {
	
	Meteor.defer(function() {
		globalOnRendered();
		$("input[autofocus]").focus();
	});
});

Template.QsInstructionsQsInstructionsClosedDetails.events({
	
});

Template.QsInstructionsQsInstructionsClosedDetails.helpers({
	
});

Template.QsInstructionsQsInstructionsClosedDetailsForm.onCreated(function() {
	
});

Template.QsInstructionsQsInstructionsClosedDetailsForm.onDestroyed(function() {
	
});

Template.QsInstructionsQsInstructionsClosedDetailsForm.onRendered(function() {
	

	pageSession.set("qsInstructionsQsInstructionsClosedDetailsFormInfoMessage", "");
	pageSession.set("qsInstructionsQsInstructionsClosedDetailsFormErrorMessage", "");

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

Template.QsInstructionsQsInstructionsClosedDetailsForm.events({
	"submit": function(e, t) {
		e.preventDefault();
		pageSession.set("qsInstructionsQsInstructionsClosedDetailsFormInfoMessage", "");
		pageSession.set("qsInstructionsQsInstructionsClosedDetailsFormErrorMessage", "");

		var self = this;

		function submitAction(result, msg) {
			var qsInstructionsQsInstructionsClosedDetailsFormMode = "read_only";
			if(!t.find("#form-cancel-button")) {
				switch(qsInstructionsQsInstructionsClosedDetailsFormMode) {
					case "insert": {
						$(e.target)[0].reset();
					}; break;

					case "update": {
						var message = msg || "Saved.";
						pageSession.set("qsInstructionsQsInstructionsClosedDetailsFormInfoMessage", message);
					}; break;
				}
			}

			/*SUBMIT_REDIRECT*/
		}

		function errorAction(msg) {
			msg = msg || "";
			var message = msg.message || msg || "Error.";
			pageSession.set("qsInstructionsQsInstructionsClosedDetailsFormErrorMessage", message);
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

		Router.go("qs_instructions.qs_instructions_closed", mergeObjects(Router.currentRouteParams(), {}));
	},
	"click #form-back-button": function(e, t) {
		e.preventDefault();

		Router.go("qs_instructions.qs_instructions_closed", mergeObjects(Router.currentRouteParams(), {}));
	}

	
});

Template.QsInstructionsQsInstructionsClosedDetailsForm.helpers({
	"infoMessage": function() {
		return pageSession.get("qsInstructionsQsInstructionsClosedDetailsFormInfoMessage");
	},
	"errorMessage": function() {
		return pageSession.get("qsInstructionsQsInstructionsClosedDetailsFormErrorMessage");
	}
	
});
