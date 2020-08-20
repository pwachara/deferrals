var pageSession = new ReactiveDict();

Template.QsInstructionsQsInstructionsPendingDetailsInsert.onCreated(function() {
	
});

Template.QsInstructionsQsInstructionsPendingDetailsInsert.onDestroyed(function() {
	
});

Template.QsInstructionsQsInstructionsPendingDetailsInsert.onRendered(function() {
	
	Meteor.defer(function() {
		globalOnRendered();
		$("input[autofocus]").focus();
	});
});

Template.QsInstructionsQsInstructionsPendingDetailsInsert.events({
	
});

Template.QsInstructionsQsInstructionsPendingDetailsInsert.helpers({
	
});

Template.QsInstructionsQsInstructionsPendingDetailsInsertForm.onCreated(function() {
	
});

Template.QsInstructionsQsInstructionsPendingDetailsInsertForm.onDestroyed(function() {
	
});

Template.QsInstructionsQsInstructionsPendingDetailsInsertForm.onRendered(function() {
	

	pageSession.set("qsInstructionsQsInstructionsPendingDetailsInsertFormInfoMessage", "");
	pageSession.set("qsInstructionsQsInstructionsPendingDetailsInsertFormErrorMessage", "");

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

Template.QsInstructionsQsInstructionsPendingDetailsInsertForm.events({
	"submit": function(e, t) {
		e.preventDefault();
		pageSession.set("qsInstructionsQsInstructionsPendingDetailsInsertFormInfoMessage", "");
		pageSession.set("qsInstructionsQsInstructionsPendingDetailsInsertFormErrorMessage", "");

		var self = this;

		function submitAction(result, msg) {
			var qsInstructionsQsInstructionsPendingDetailsInsertFormMode = "insert";
			if(!t.find("#form-cancel-button")) {
				switch(qsInstructionsQsInstructionsPendingDetailsInsertFormMode) {
					case "insert": {
						$(e.target)[0].reset();
					}; break;

					case "update": {
						var message = msg || "Saved.";
						pageSession.set("qsInstructionsQsInstructionsPendingDetailsInsertFormInfoMessage", message);
					}; break;
				}
			}

			Router.go("qs_instructions.qs_instructions_pending.details.qs_instructions_history", mergeObjects(Router.currentRouteParams(), {}));
		}

		function errorAction(msg) {
			msg = msg || "";
			var message = msg.message || msg || "Error.";
			pageSession.set("qsInstructionsQsInstructionsPendingDetailsInsertFormErrorMessage", message);
		}

		validateForm(
			$(e.target),
			function(fieldName, fieldValue) {

			},
			function(msg) {

			},
			function(values) {
				values.qsInstructionsPendingId = self.params.qsInstructionsPendingId;

				Meteor.call("qsInstructionsHistoryInsert", values, function(e, r) { if(e) errorAction(e); else submitAction(r); });
			}
		);

		return false;
	},
	"click #form-cancel-button": function(e, t) {
		e.preventDefault();

		

		Router.go("qs_instructions.qs_instructions_pending.details.qs_instructions_history", mergeObjects(Router.currentRouteParams(), {}));
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

Template.QsInstructionsQsInstructionsPendingDetailsInsertForm.helpers({
	"infoMessage": function() {
		return pageSession.get("qsInstructionsQsInstructionsPendingDetailsInsertFormInfoMessage");
	},
	"errorMessage": function() {
		return pageSession.get("qsInstructionsQsInstructionsPendingDetailsInsertFormErrorMessage");
	}
	
});
