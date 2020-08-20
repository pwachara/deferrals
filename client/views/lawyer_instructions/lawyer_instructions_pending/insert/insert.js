var pageSession = new ReactiveDict();

Template.LawyerInstructionsLawyerInstructionsPendingInsert.onCreated(function() {
	
});

Template.LawyerInstructionsLawyerInstructionsPendingInsert.onDestroyed(function() {
	
});

Template.LawyerInstructionsLawyerInstructionsPendingInsert.onRendered(function() {
	
	Meteor.defer(function() {
		globalOnRendered();
		$("input[autofocus]").focus();
	});
});

Template.LawyerInstructionsLawyerInstructionsPendingInsert.events({
	
});

Template.LawyerInstructionsLawyerInstructionsPendingInsert.helpers({
	
});

Template.LawyerInstructionsLawyerInstructionsPendingInsertForm.onCreated(function() {
	
});

Template.LawyerInstructionsLawyerInstructionsPendingInsertForm.onDestroyed(function() {
	
});

Template.LawyerInstructionsLawyerInstructionsPendingInsertForm.onRendered(function() {
	

	pageSession.set("lawyerInstructionsLawyerInstructionsPendingInsertFormInfoMessage", "");
	pageSession.set("lawyerInstructionsLawyerInstructionsPendingInsertFormErrorMessage", "");

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

Template.LawyerInstructionsLawyerInstructionsPendingInsertForm.events({
	"submit": function(e, t) {
		e.preventDefault();
		pageSession.set("lawyerInstructionsLawyerInstructionsPendingInsertFormInfoMessage", "");
		pageSession.set("lawyerInstructionsLawyerInstructionsPendingInsertFormErrorMessage", "");

		var self = this;

		function submitAction(result, msg) {
			var lawyerInstructionsLawyerInstructionsPendingInsertFormMode = "insert";
			if(!t.find("#form-cancel-button")) {
				switch(lawyerInstructionsLawyerInstructionsPendingInsertFormMode) {
					case "insert": {
						$(e.target)[0].reset();
					}; break;

					case "update": {
						var message = msg || "Saved.";
						pageSession.set("lawyerInstructionsLawyerInstructionsPendingInsertFormInfoMessage", message);
					}; break;
				}
			}

			Router.go("lawyer_instructions.lawyer_instructions_pending", mergeObjects(Router.currentRouteParams(), {}));
		}

		function errorAction(msg) {
			msg = msg || "";
			var message = msg.message || msg || "Error.";
			pageSession.set("lawyerInstructionsLawyerInstructionsPendingInsertFormErrorMessage", message);
		}

		validateForm(
			$(e.target),
			function(fieldName, fieldValue) {

			},
			function(msg) {

			},
			function(values) {
				

				Meteor.call("instructionsInsert", values, function(e, r) { if(e) errorAction(e); else submitAction(r); });
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

Template.LawyerInstructionsLawyerInstructionsPendingInsertForm.helpers({
	"infoMessage": function() {
		return pageSession.get("lawyerInstructionsLawyerInstructionsPendingInsertFormInfoMessage");
	},
	"errorMessage": function() {
		return pageSession.get("lawyerInstructionsLawyerInstructionsPendingInsertFormErrorMessage");
	}
	
});
