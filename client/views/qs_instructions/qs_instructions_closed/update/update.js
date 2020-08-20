var pageSession = new ReactiveDict();

Template.QsInstructionsQsInstructionsClosedUpdate.onCreated(function() {
	
});

Template.QsInstructionsQsInstructionsClosedUpdate.onDestroyed(function() {
	
});

Template.QsInstructionsQsInstructionsClosedUpdate.onRendered(function() {
	
	Meteor.defer(function() {
		globalOnRendered();
		$("input[autofocus]").focus();
	});
});

Template.QsInstructionsQsInstructionsClosedUpdate.events({
	
});

Template.QsInstructionsQsInstructionsClosedUpdate.helpers({
	
});

Template.QsInstructionsQsInstructionsClosedUpdateForm.onCreated(function() {
	
});

Template.QsInstructionsQsInstructionsClosedUpdateForm.onDestroyed(function() {
	
});

Template.QsInstructionsQsInstructionsClosedUpdateForm.onRendered(function() {
	

	pageSession.set("qsInstructionsQsInstructionsClosedUpdateFormInfoMessage", "");
	pageSession.set("qsInstructionsQsInstructionsClosedUpdateFormErrorMessage", "");

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

Template.QsInstructionsQsInstructionsClosedUpdateForm.events({
	"submit": function(e, t) {
		e.preventDefault();
		pageSession.set("qsInstructionsQsInstructionsClosedUpdateFormInfoMessage", "");
		pageSession.set("qsInstructionsQsInstructionsClosedUpdateFormErrorMessage", "");

		var self = this;

		function submitAction(result, msg) {
			var qsInstructionsQsInstructionsClosedUpdateFormMode = "update";
			if(!t.find("#form-cancel-button")) {
				switch(qsInstructionsQsInstructionsClosedUpdateFormMode) {
					case "insert": {
						$(e.target)[0].reset();
					}; break;

					case "update": {
						var message = msg || "Saved.";
						pageSession.set("qsInstructionsQsInstructionsClosedUpdateFormInfoMessage", message);
					}; break;
				}
			}

			Router.go("qs_instructions.qs_instructions_closed", mergeObjects(Router.currentRouteParams(), {}));
		}

		function errorAction(msg) {
			msg = msg || "";
			var message = msg.message || msg || "Error.";
			pageSession.set("qsInstructionsQsInstructionsClosedUpdateFormErrorMessage", message);
		}

		validateForm(
			$(e.target),
			function(fieldName, fieldValue) {

			},
			function(msg) {

			},
			function(values) {
				

				Meteor.call("qsInstructionsUpdate", t.data.qs_instructions_closed._id, values, function(e, r) { if(e) errorAction(e); else submitAction(r); });
			}
		);

		return false;
	},
	"click #form-cancel-button": function(e, t) {
		e.preventDefault();

		

		Router.go("qs_instructions.qs_instructions_closed", mergeObjects(Router.currentRouteParams(), {}));
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

Template.QsInstructionsQsInstructionsClosedUpdateForm.helpers({
	"infoMessage": function() {
		return pageSession.get("qsInstructionsQsInstructionsClosedUpdateFormInfoMessage");
	},
	"errorMessage": function() {
		return pageSession.get("qsInstructionsQsInstructionsClosedUpdateFormErrorMessage");
	}
	
});
