var pageSession = new ReactiveDict();

Template.AuditConfirmationsAuditConfirmationsClosedDetails.onCreated(function() {
	
});

Template.AuditConfirmationsAuditConfirmationsClosedDetails.onDestroyed(function() {
	
});

Template.AuditConfirmationsAuditConfirmationsClosedDetails.onRendered(function() {
	
	Meteor.defer(function() {
		globalOnRendered();
		$("input[autofocus]").focus();
	});
});

Template.AuditConfirmationsAuditConfirmationsClosedDetails.events({
	
	"click #page-back-button": function(e, t) {
		e.preventDefault();
		Router.go("audit_confirmations.audit_confirmations_closed", mergeObjects(Router.currentRouteParams(), {  }));
	}
});

Template.AuditConfirmationsAuditConfirmationsClosedDetails.helpers({
	
});

Template.AuditConfirmationsAuditConfirmationsClosedDetailsDetailsForm.onCreated(function() {
	
});

Template.AuditConfirmationsAuditConfirmationsClosedDetailsDetailsForm.onDestroyed(function() {
	
});

Template.AuditConfirmationsAuditConfirmationsClosedDetailsDetailsForm.onRendered(function() {
	

	pageSession.set("auditConfirmationsAuditConfirmationsClosedDetailsDetailsFormInfoMessage", "");
	pageSession.set("auditConfirmationsAuditConfirmationsClosedDetailsDetailsFormErrorMessage", "");

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

Template.AuditConfirmationsAuditConfirmationsClosedDetailsDetailsForm.events({
	"submit": function(e, t) {
		e.preventDefault();
		pageSession.set("auditConfirmationsAuditConfirmationsClosedDetailsDetailsFormInfoMessage", "");
		pageSession.set("auditConfirmationsAuditConfirmationsClosedDetailsDetailsFormErrorMessage", "");

		var self = this;

		function submitAction(result, msg) {
			var auditConfirmationsAuditConfirmationsClosedDetailsDetailsFormMode = "read_only";
			if(!t.find("#form-cancel-button")) {
				switch(auditConfirmationsAuditConfirmationsClosedDetailsDetailsFormMode) {
					case "insert": {
						$(e.target)[0].reset();
					}; break;

					case "update": {
						var message = msg || "Saved.";
						pageSession.set("auditConfirmationsAuditConfirmationsClosedDetailsDetailsFormInfoMessage", message);
					}; break;
				}
			}

			/*SUBMIT_REDIRECT*/
		}

		function errorAction(msg) {
			msg = msg || "";
			var message = msg.message || msg || "Error.";
			pageSession.set("auditConfirmationsAuditConfirmationsClosedDetailsDetailsFormErrorMessage", message);
		}

		validateForm(
			$(e.target),
			function(fieldName, fieldValue) {

			},
			function(msg) {

			},
			function(values) {
				

				
			}
		);

		return false;
	},
	"click #form-cancel-button": function(e, t) {
		e.preventDefault();

		

		/*CANCEL_REDIRECT*/
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

Template.AuditConfirmationsAuditConfirmationsClosedDetailsDetailsForm.helpers({
	"infoMessage": function() {
		return pageSession.get("auditConfirmationsAuditConfirmationsClosedDetailsDetailsFormInfoMessage");
	},
	"errorMessage": function() {
		return pageSession.get("auditConfirmationsAuditConfirmationsClosedDetailsDetailsFormErrorMessage");
	}
	
});
