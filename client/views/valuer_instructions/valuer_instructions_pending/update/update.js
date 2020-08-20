var pageSession = new ReactiveDict();

Template.ValuerInstructionsValuerInstructionsPendingUpdate.onCreated(function() {
	
});

Template.ValuerInstructionsValuerInstructionsPendingUpdate.onDestroyed(function() {
	
});

Template.ValuerInstructionsValuerInstructionsPendingUpdate.onRendered(function() {
	
	Meteor.defer(function() {
		globalOnRendered();
		$("input[autofocus]").focus();
	});
});

Template.ValuerInstructionsValuerInstructionsPendingUpdate.events({
	
});

Template.ValuerInstructionsValuerInstructionsPendingUpdate.helpers({
	
});

Template.ValuerInstructionsValuerInstructionsPendingUpdateForm.onCreated(function() {
	
});

Template.ValuerInstructionsValuerInstructionsPendingUpdateForm.onDestroyed(function() {
	
});

Template.ValuerInstructionsValuerInstructionsPendingUpdateForm.onRendered(function() {
	

	pageSession.set("valuerInstructionsValuerInstructionsPendingUpdateFormInfoMessage", "");
	pageSession.set("valuerInstructionsValuerInstructionsPendingUpdateFormErrorMessage", "");

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

Template.ValuerInstructionsValuerInstructionsPendingUpdateForm.events({
	"submit": function(e, t) {
		e.preventDefault();
		pageSession.set("valuerInstructionsValuerInstructionsPendingUpdateFormInfoMessage", "");
		pageSession.set("valuerInstructionsValuerInstructionsPendingUpdateFormErrorMessage", "");

		var self = this;

		function submitAction(result, msg) {
			var valuerInstructionsValuerInstructionsPendingUpdateFormMode = "update";
			if(!t.find("#form-cancel-button")) {
				switch(valuerInstructionsValuerInstructionsPendingUpdateFormMode) {
					case "insert": {
						$(e.target)[0].reset();
					}; break;

					case "update": {
						var message = msg || "Saved.";
						pageSession.set("valuerInstructionsValuerInstructionsPendingUpdateFormInfoMessage", message);
					}; break;
				}
			}

			Router.go("valuer_instructions.valuer_instructions_pending", mergeObjects(Router.currentRouteParams(), {}));
		}

		function errorAction(msg) {
			msg = msg || "";
			var message = msg.message || msg || "Error.";
			pageSession.set("valuerInstructionsValuerInstructionsPendingUpdateFormErrorMessage", message);
		}

		validateForm(
			$(e.target),
			function(fieldName, fieldValue) {

			},
			function(msg) {

			},
			function(values) {
				

				Meteor.call("valuerInstructionsUpdate", t.data.valuer_instructions_pending._id, values, function(e, r) { if(e) errorAction(e); else submitAction(r); });
			}
		);

		return false;
	},
	"click #form-cancel-button": function(e, t) {
		e.preventDefault();

		

		Router.go("valuer_instructions.valuer_instructions_pending", mergeObjects(Router.currentRouteParams(), {}));
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

Template.ValuerInstructionsValuerInstructionsPendingUpdateForm.helpers({
	"infoMessage": function() {
		return pageSession.get("valuerInstructionsValuerInstructionsPendingUpdateFormInfoMessage");
	},
	"errorMessage": function() {
		return pageSession.get("valuerInstructionsValuerInstructionsPendingUpdateFormErrorMessage");
	}
	
});
