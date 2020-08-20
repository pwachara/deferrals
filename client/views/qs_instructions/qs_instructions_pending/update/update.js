var pageSession = new ReactiveDict();

Template.QsInstructionsQsInstructionsPendingUpdate.onCreated(function() {
	
});

Template.QsInstructionsQsInstructionsPendingUpdate.onDestroyed(function() {
	
});

Template.QsInstructionsQsInstructionsPendingUpdate.onRendered(function() {
	
	Meteor.defer(function() {
		globalOnRendered();
		$("input[autofocus]").focus();
	});
});

Template.QsInstructionsQsInstructionsPendingUpdate.events({
	
});

Template.QsInstructionsQsInstructionsPendingUpdate.helpers({
	
});

Template.QsInstructionsQsInstructionsPendingUpdateForm.onCreated(function() {
	
});

Template.QsInstructionsQsInstructionsPendingUpdateForm.onDestroyed(function() {
	
});

Template.QsInstructionsQsInstructionsPendingUpdateForm.onRendered(function() {
	

	pageSession.set("qsInstructionsQsInstructionsPendingUpdateFormInfoMessage", "");
	pageSession.set("qsInstructionsQsInstructionsPendingUpdateFormErrorMessage", "");

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

Template.QsInstructionsQsInstructionsPendingUpdateForm.events({
	"submit": function(e, t) {
		e.preventDefault();
		pageSession.set("qsInstructionsQsInstructionsPendingUpdateFormInfoMessage", "");
		pageSession.set("qsInstructionsQsInstructionsPendingUpdateFormErrorMessage", "");

		var self = this;

		function submitAction(result, msg) {
			var qsInstructionsQsInstructionsPendingUpdateFormMode = "update";
			if(!t.find("#form-cancel-button")) {
				switch(qsInstructionsQsInstructionsPendingUpdateFormMode) {
					case "insert": {
						$(e.target)[0].reset();
					}; break;

					case "update": {
						var message = msg || "Saved.";
						pageSession.set("qsInstructionsQsInstructionsPendingUpdateFormInfoMessage", message);
					}; break;
				}
			}

			Router.go("qs_instructions.qs_instructions_pending", mergeObjects(Router.currentRouteParams(), {}));
		}

		function errorAction(msg) {
			msg = msg || "";
			var message = msg.message || msg || "Error.";
			pageSession.set("qsInstructionsQsInstructionsPendingUpdateFormErrorMessage", message);
		}

		validateForm(
			$(e.target),
			function(fieldName, fieldValue) {

			},
			function(msg) {

			},
			function(values) {
				

				Meteor.call("qsInstructionsUpdate", t.data.qs_instructions_pending._id, values, function(e, r) { if(e) errorAction(e); else submitAction(r); });
			}
		);

		return false;
	},
	"click #form-cancel-button": function(e, t) {
		e.preventDefault();

		

		Router.go("qs_instructions.qs_instructions_pending", mergeObjects(Router.currentRouteParams(), {}));
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

Template.QsInstructionsQsInstructionsPendingUpdateForm.helpers({
	"infoMessage": function() {
		return pageSession.get("qsInstructionsQsInstructionsPendingUpdateFormInfoMessage");
	},
	"errorMessage": function() {
		return pageSession.get("qsInstructionsQsInstructionsPendingUpdateFormErrorMessage");
	}
	
});
