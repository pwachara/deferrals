var pageSession = new ReactiveDict();

Template.AuditConfirmationsAuditConfirmationsPendingEdit.onCreated(function() {
	
});

Template.AuditConfirmationsAuditConfirmationsPendingEdit.onDestroyed(function() {
	
});

Template.AuditConfirmationsAuditConfirmationsPendingEdit.onRendered(function() {
	
	Meteor.defer(function() {
		globalOnRendered();
		$("input[autofocus]").focus();
	});
});

Template.AuditConfirmationsAuditConfirmationsPendingEdit.events({
	
});

Template.AuditConfirmationsAuditConfirmationsPendingEdit.helpers({
	
});

Template.AuditConfirmationsAuditConfirmationsPendingEditEditForm.onCreated(function() {
	
});

Template.AuditConfirmationsAuditConfirmationsPendingEditEditForm.onDestroyed(function() {
	
});

Template.AuditConfirmationsAuditConfirmationsPendingEditEditForm.onRendered(function() {
	

	pageSession.set("auditConfirmationsAuditConfirmationsPendingEditEditFormInfoMessage", "");
	pageSession.set("auditConfirmationsAuditConfirmationsPendingEditEditFormErrorMessage", "");

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

Template.AuditConfirmationsAuditConfirmationsPendingEditEditForm.events({
	"submit": function(e, t) {
		e.preventDefault();
		pageSession.set("auditConfirmationsAuditConfirmationsPendingEditEditFormInfoMessage", "");
		pageSession.set("auditConfirmationsAuditConfirmationsPendingEditEditFormErrorMessage", "");

		var self = this;

		function submitAction(result, msg) {
			var auditConfirmationsAuditConfirmationsPendingEditEditFormMode = "update";
			if(!t.find("#form-cancel-button")) {
				switch(auditConfirmationsAuditConfirmationsPendingEditEditFormMode) {
					case "insert": {
						$(e.target)[0].reset();
					}; break;

					case "update": {
						var message = msg || "Saved.";
						pageSession.set("auditConfirmationsAuditConfirmationsPendingEditEditFormInfoMessage", message);
					}; break;
				}
			}

			Router.go("audit_confirmations.audit_confirmations_pending", mergeObjects(Router.currentRouteParams(), {}));
		}

		function errorAction(msg) {
			msg = msg || "";
			var message = msg.message || msg || "Error.";
			pageSession.set("auditConfirmationsAuditConfirmationsPendingEditEditFormErrorMessage", message);
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

		

		Router.go("audit_confirmations.audit_confirmations_pending", mergeObjects(Router.currentRouteParams(), {}));
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

Template.AuditConfirmationsAuditConfirmationsPendingEditEditForm.helpers({
	"infoMessage": function() {
		return pageSession.get("auditConfirmationsAuditConfirmationsPendingEditEditFormInfoMessage");
	},
	"errorMessage": function() {
		return pageSession.get("auditConfirmationsAuditConfirmationsPendingEditEditFormErrorMessage");
	}
	
});
