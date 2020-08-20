var pageSession = new ReactiveDict();

Template.LawyerInstructionsLawyerInstructionsPendingUpdate.onCreated(function() {
	
});

Template.LawyerInstructionsLawyerInstructionsPendingUpdate.onDestroyed(function() {
	
});

Template.LawyerInstructionsLawyerInstructionsPendingUpdate.onRendered(function() {
	
	Meteor.defer(function() {
		globalOnRendered();
		$("input[autofocus]").focus();
	});
});

Template.LawyerInstructionsLawyerInstructionsPendingUpdate.events({
	
});

Template.LawyerInstructionsLawyerInstructionsPendingUpdate.helpers({
	
});

Template.LawyerInstructionsLawyerInstructionsPendingUpdateForm.onCreated(function() {
	
});

Template.LawyerInstructionsLawyerInstructionsPendingUpdateForm.onDestroyed(function() {
	
});

Template.LawyerInstructionsLawyerInstructionsPendingUpdateForm.onRendered(function() {
	

	pageSession.set("lawyerInstructionsLawyerInstructionsPendingUpdateFormInfoMessage", "");
	pageSession.set("lawyerInstructionsLawyerInstructionsPendingUpdateFormErrorMessage", "");

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

Template.LawyerInstructionsLawyerInstructionsPendingUpdateForm.events({
	"submit": function(e, t) {
		e.preventDefault();
		pageSession.set("lawyerInstructionsLawyerInstructionsPendingUpdateFormInfoMessage", "");
		pageSession.set("lawyerInstructionsLawyerInstructionsPendingUpdateFormErrorMessage", "");

		var self = this;

		function submitAction(result, msg) {
			var lawyerInstructionsLawyerInstructionsPendingUpdateFormMode = "update";
			if(!t.find("#form-cancel-button")) {
				switch(lawyerInstructionsLawyerInstructionsPendingUpdateFormMode) {
					case "insert": {
						$(e.target)[0].reset();
					}; break;

					case "update": {
						var message = msg || "Saved.";
						pageSession.set("lawyerInstructionsLawyerInstructionsPendingUpdateFormInfoMessage", message);
					}; break;
				}
			}

			Router.go("lawyer_instructions.lawyer_instructions_pending", mergeObjects(Router.currentRouteParams(), {}));
		}

		function errorAction(msg) {
			msg = msg || "";
			var message = msg.message || msg || "Error.";
			pageSession.set("lawyerInstructionsLawyerInstructionsPendingUpdateFormErrorMessage", message);
		}

		validateForm(
			$(e.target),
			function(fieldName, fieldValue) {

			},
			function(msg) {

			},
			function(values) {
				

				Meteor.call("instructionsUpdate", t.data.lawyer_instructions_pending._id, values, function(e, r) { if(e) errorAction(e); else submitAction(r); });
			}
		);

		return false;
	},
	"click #form-cancel-button": function(e, t) {
		e.preventDefault();

		

		Router.go("lawyer_instructions.lawyer_instructions_pending", mergeObjects(Router.currentRouteParams(), {}));
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

Template.LawyerInstructionsLawyerInstructionsPendingUpdateForm.helpers({
	"infoMessage": function() {
		return pageSession.get("lawyerInstructionsLawyerInstructionsPendingUpdateFormInfoMessage");
	},
	"errorMessage": function() {
		return pageSession.get("lawyerInstructionsLawyerInstructionsPendingUpdateFormErrorMessage");
	}
	
});
