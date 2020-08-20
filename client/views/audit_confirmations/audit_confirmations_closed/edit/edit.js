var pageSession = new ReactiveDict();

Template.AuditConfirmationsAuditConfirmationsClosedEdit.onCreated(function() {
	
});

Template.AuditConfirmationsAuditConfirmationsClosedEdit.onDestroyed(function() {
	
});

Template.AuditConfirmationsAuditConfirmationsClosedEdit.onRendered(function() {
	
	Meteor.defer(function() {
		globalOnRendered();
		$("input[autofocus]").focus();
	});
});

Template.AuditConfirmationsAuditConfirmationsClosedEdit.events({
	
});

Template.AuditConfirmationsAuditConfirmationsClosedEdit.helpers({
	
});

Template.AuditConfirmationsAuditConfirmationsClosedEditEditForm.onCreated(function() {
	
});

Template.AuditConfirmationsAuditConfirmationsClosedEditEditForm.onDestroyed(function() {
	
});

Template.AuditConfirmationsAuditConfirmationsClosedEditEditForm.onRendered(function() {
	

	pageSession.set("auditConfirmationsAuditConfirmationsClosedEditEditFormInfoMessage", "");
	pageSession.set("auditConfirmationsAuditConfirmationsClosedEditEditFormErrorMessage", "");

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

Template.AuditConfirmationsAuditConfirmationsClosedEditEditForm.events({
	"submit": function(e, t) {
		e.preventDefault();
		pageSession.set("auditConfirmationsAuditConfirmationsClosedEditEditFormInfoMessage", "");
		pageSession.set("auditConfirmationsAuditConfirmationsClosedEditEditFormErrorMessage", "");

		var self = this;

		function submitAction(result, msg) {
			var auditConfirmationsAuditConfirmationsClosedEditEditFormMode = "update";
			if(!t.find("#form-cancel-button")) {
				switch(auditConfirmationsAuditConfirmationsClosedEditEditFormMode) {
					case "insert": {
						$(e.target)[0].reset();
					}; break;

					case "update": {
						var message = msg || "Saved.";
						pageSession.set("auditConfirmationsAuditConfirmationsClosedEditEditFormInfoMessage", message);
					}; break;
				}
			}

			Router.go("audit_confirmations.audit_confirmations_closed", mergeObjects(Router.currentRouteParams(), {}));
		}

		function errorAction(msg) {
			msg = msg || "";
			var message = msg.message || msg || "Error.";
			pageSession.set("auditConfirmationsAuditConfirmationsClosedEditEditFormErrorMessage", message);
		}

		validateForm(
			$(e.target),
			function(fieldName, fieldValue) {

			},
			function(msg) {

			},
			function(values) {
				

				Meteor.call("auditConfirmationsUpdate", t.data.audit._id, values, function(e, r) { if(e) errorAction(e); else submitAction(r); });
			}
		);

		return false;
	},
	"click #form-cancel-button": function(e, t) {
		e.preventDefault();

		

		Router.go("audit_confirmations.audit_confirmations_closed", mergeObjects(Router.currentRouteParams(), {}));
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

Template.AuditConfirmationsAuditConfirmationsClosedEditEditForm.helpers({
	"infoMessage": function() {
		return pageSession.get("auditConfirmationsAuditConfirmationsClosedEditEditFormInfoMessage");
	},
	"errorMessage": function() {
		return pageSession.get("auditConfirmationsAuditConfirmationsClosedEditEditFormErrorMessage");
	}
	
});
