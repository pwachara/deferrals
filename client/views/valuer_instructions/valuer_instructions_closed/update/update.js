var pageSession = new ReactiveDict();

Template.ValuerInstructionsValuerInstructionsClosedUpdate.onCreated(function() {
	
});

Template.ValuerInstructionsValuerInstructionsClosedUpdate.onDestroyed(function() {
	
});

Template.ValuerInstructionsValuerInstructionsClosedUpdate.onRendered(function() {
	
	Meteor.defer(function() {
		globalOnRendered();
		$("input[autofocus]").focus();
	});
});

Template.ValuerInstructionsValuerInstructionsClosedUpdate.events({
	
});

Template.ValuerInstructionsValuerInstructionsClosedUpdate.helpers({
	
});

Template.ValuerInstructionsValuerInstructionsClosedUpdateForm.onCreated(function() {
	
});

Template.ValuerInstructionsValuerInstructionsClosedUpdateForm.onDestroyed(function() {
	
});

Template.ValuerInstructionsValuerInstructionsClosedUpdateForm.onRendered(function() {
	

	pageSession.set("valuerInstructionsValuerInstructionsClosedUpdateFormInfoMessage", "");
	pageSession.set("valuerInstructionsValuerInstructionsClosedUpdateFormErrorMessage", "");

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

Template.ValuerInstructionsValuerInstructionsClosedUpdateForm.events({
	"submit": function(e, t) {
		e.preventDefault();
		pageSession.set("valuerInstructionsValuerInstructionsClosedUpdateFormInfoMessage", "");
		pageSession.set("valuerInstructionsValuerInstructionsClosedUpdateFormErrorMessage", "");

		var self = this;

		function submitAction(result, msg) {
			var valuerInstructionsValuerInstructionsClosedUpdateFormMode = "update";
			if(!t.find("#form-cancel-button")) {
				switch(valuerInstructionsValuerInstructionsClosedUpdateFormMode) {
					case "insert": {
						$(e.target)[0].reset();
					}; break;

					case "update": {
						var message = msg || "Saved.";
						pageSession.set("valuerInstructionsValuerInstructionsClosedUpdateFormInfoMessage", message);
					}; break;
				}
			}

			Router.go("valuer_instructions.valuer_instructions_closed", mergeObjects(Router.currentRouteParams(), {}));
		}

		function errorAction(msg) {
			msg = msg || "";
			var message = msg.message || msg || "Error.";
			pageSession.set("valuerInstructionsValuerInstructionsClosedUpdateFormErrorMessage", message);
		}

		validateForm(
			$(e.target),
			function(fieldName, fieldValue) {

			},
			function(msg) {

			},
			function(values) {
				

				Meteor.call("valuerInstructionsUpdate", t.data.valuer_instructions_closed._id, values, function(e, r) { if(e) errorAction(e); else submitAction(r); });
			}
		);

		return false;
	},
	"click #form-cancel-button": function(e, t) {
		e.preventDefault();

		

		Router.go("valuer_instructions.valuer_instructions_closed", mergeObjects(Router.currentRouteParams(), {}));
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

Template.ValuerInstructionsValuerInstructionsClosedUpdateForm.helpers({
	"infoMessage": function() {
		return pageSession.get("valuerInstructionsValuerInstructionsClosedUpdateFormInfoMessage");
	},
	"errorMessage": function() {
		return pageSession.get("valuerInstructionsValuerInstructionsClosedUpdateFormErrorMessage");
	}
	
});
