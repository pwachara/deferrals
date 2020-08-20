var pageSession = new ReactiveDict();

Template.QsInstructionsQsInstructionsPendingInsert.onCreated(function() {
	
});

Template.QsInstructionsQsInstructionsPendingInsert.onDestroyed(function() {
	
});

Template.QsInstructionsQsInstructionsPendingInsert.onRendered(function() {
	
	Meteor.defer(function() {
		globalOnRendered();
		$("input[autofocus]").focus();
	});
});

Template.QsInstructionsQsInstructionsPendingInsert.events({
	
});

Template.QsInstructionsQsInstructionsPendingInsert.helpers({
	
});

Template.QsInstructionsQsInstructionsPendingInsertForm.onCreated(function() {
	
});

Template.QsInstructionsQsInstructionsPendingInsertForm.onDestroyed(function() {
	
});

Template.QsInstructionsQsInstructionsPendingInsertForm.onRendered(function() {
	

	pageSession.set("qsInstructionsQsInstructionsPendingInsertFormInfoMessage", "");
	pageSession.set("qsInstructionsQsInstructionsPendingInsertFormErrorMessage", "");

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

Template.QsInstructionsQsInstructionsPendingInsertForm.events({
	"submit": function(e, t) {
		e.preventDefault();
		pageSession.set("qsInstructionsQsInstructionsPendingInsertFormInfoMessage", "");
		pageSession.set("qsInstructionsQsInstructionsPendingInsertFormErrorMessage", "");

		var self = this;

		function submitAction(result, msg) {
			var qsInstructionsQsInstructionsPendingInsertFormMode = "insert";
			if(!t.find("#form-cancel-button")) {
				switch(qsInstructionsQsInstructionsPendingInsertFormMode) {
					case "insert": {
						$(e.target)[0].reset();
					}; break;

					case "update": {
						var message = msg || "Saved.";
						pageSession.set("qsInstructionsQsInstructionsPendingInsertFormInfoMessage", message);
					}; break;
				}
			}

			Router.go("qs_instructions.qs_instructions_pending.details", mergeObjects(Router.currentRouteParams(), {qsInstructionsPendingId: result}));
		}

		function errorAction(msg) {
			msg = msg || "";
			var message = msg.message || msg || "Error.";
			pageSession.set("qsInstructionsQsInstructionsPendingInsertFormErrorMessage", message);
		}

		validateForm(
			$(e.target),
			function(fieldName, fieldValue) {

			},
			function(msg) {

			},
			function(values) {
				

				Meteor.call("qsInstructionsInsert", values, function(e, r) { if(e) errorAction(e); else submitAction(r); });
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

Template.QsInstructionsQsInstructionsPendingInsertForm.helpers({
	"infoMessage": function() {
		return pageSession.get("qsInstructionsQsInstructionsPendingInsertFormInfoMessage");
	},
	"errorMessage": function() {
		return pageSession.get("qsInstructionsQsInstructionsPendingInsertFormErrorMessage");
	}
	
});
