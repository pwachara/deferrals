var pageSession = new ReactiveDict();

Template.LawyerInstructionsLawyerInstructionsClosedUpdate.onCreated(function() {
	
});

Template.LawyerInstructionsLawyerInstructionsClosedUpdate.onDestroyed(function() {
	
});

Template.LawyerInstructionsLawyerInstructionsClosedUpdate.onRendered(function() {
	
	Meteor.defer(function() {
		globalOnRendered();
		$("input[autofocus]").focus();
	});
});

Template.LawyerInstructionsLawyerInstructionsClosedUpdate.events({
	
});

Template.LawyerInstructionsLawyerInstructionsClosedUpdate.helpers({
	
});

Template.LawyerInstructionsLawyerInstructionsClosedUpdateForm.onCreated(function() {
	
});

Template.LawyerInstructionsLawyerInstructionsClosedUpdateForm.onDestroyed(function() {
	
});

Template.LawyerInstructionsLawyerInstructionsClosedUpdateForm.onRendered(function() {
	

	pageSession.set("lawyerInstructionsLawyerInstructionsClosedUpdateFormInfoMessage", "");
	pageSession.set("lawyerInstructionsLawyerInstructionsClosedUpdateFormErrorMessage", "");

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

Template.LawyerInstructionsLawyerInstructionsClosedUpdateForm.events({
	"submit": function(e, t) {
		e.preventDefault();
		pageSession.set("lawyerInstructionsLawyerInstructionsClosedUpdateFormInfoMessage", "");
		pageSession.set("lawyerInstructionsLawyerInstructionsClosedUpdateFormErrorMessage", "");

		var self = this;

		function submitAction(result, msg) {
			var lawyerInstructionsLawyerInstructionsClosedUpdateFormMode = "update";
			if(!t.find("#form-cancel-button")) {
				switch(lawyerInstructionsLawyerInstructionsClosedUpdateFormMode) {
					case "insert": {
						$(e.target)[0].reset();
					}; break;

					case "update": {
						var message = msg || "Saved.";
						pageSession.set("lawyerInstructionsLawyerInstructionsClosedUpdateFormInfoMessage", message);
					}; break;
				}
			}

			Router.go("lawyer_instructions.lawyer_instructions_closed", mergeObjects(Router.currentRouteParams(), {}));
		}

		function errorAction(msg) {
			msg = msg || "";
			var message = msg.message || msg || "Error.";
			pageSession.set("lawyerInstructionsLawyerInstructionsClosedUpdateFormErrorMessage", message);
		}

		validateForm(
			$(e.target),
			function(fieldName, fieldValue) {

			},
			function(msg) {

			},
			function(values) {
				

				Meteor.call("instructionsUpdate", t.data.lawyer_instructions_closed._id, values, function(e, r) { if(e) errorAction(e); else submitAction(r); });
			}
		);

		return false;
	},
	"click #form-cancel-button": function(e, t) {
		e.preventDefault();

		

		Router.go("lawyer_instructions.lawyer_instructions_closed", mergeObjects(Router.currentRouteParams(), {}));
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

Template.LawyerInstructionsLawyerInstructionsClosedUpdateForm.helpers({
	"infoMessage": function() {
		return pageSession.get("lawyerInstructionsLawyerInstructionsClosedUpdateFormInfoMessage");
	},
	"errorMessage": function() {
		return pageSession.get("lawyerInstructionsLawyerInstructionsClosedUpdateFormErrorMessage");
	}
	
});
