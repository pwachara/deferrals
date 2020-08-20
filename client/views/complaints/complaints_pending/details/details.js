var pageSession = new ReactiveDict();

Template.ComplaintsComplaintsPendingDetails.onCreated(function() {
	
});

Template.ComplaintsComplaintsPendingDetails.onDestroyed(function() {
	
});

Template.ComplaintsComplaintsPendingDetails.onRendered(function() {
	
	Meteor.defer(function() {
		globalOnRendered();
		$("input[autofocus]").focus();
	});
});

Template.ComplaintsComplaintsPendingDetails.events({
	
});

Template.ComplaintsComplaintsPendingDetails.helpers({
	
});

Template.ComplaintsComplaintsPendingDetailsDetailsForm.onCreated(function() {
	
});

Template.ComplaintsComplaintsPendingDetailsDetailsForm.onDestroyed(function() {
	
});

Template.ComplaintsComplaintsPendingDetailsDetailsForm.onRendered(function() {
	

	pageSession.set("complaintsComplaintsPendingDetailsDetailsFormInfoMessage", "");
	pageSession.set("complaintsComplaintsPendingDetailsDetailsFormErrorMessage", "");

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

Template.ComplaintsComplaintsPendingDetailsDetailsForm.events({
	"submit": function(e, t) {
		e.preventDefault();
		pageSession.set("complaintsComplaintsPendingDetailsDetailsFormInfoMessage", "");
		pageSession.set("complaintsComplaintsPendingDetailsDetailsFormErrorMessage", "");

		var self = this;

		function submitAction(result, msg) {
			var complaintsComplaintsPendingDetailsDetailsFormMode = "read_only";
			if(!t.find("#form-cancel-button")) {
				switch(complaintsComplaintsPendingDetailsDetailsFormMode) {
					case "insert": {
						$(e.target)[0].reset();
					}; break;

					case "update": {
						var message = msg || "Saved.";
						pageSession.set("complaintsComplaintsPendingDetailsDetailsFormInfoMessage", message);
					}; break;
				}
			}

			/*SUBMIT_REDIRECT*/
		}

		function errorAction(msg) {
			msg = msg || "";
			var message = msg.message || msg || "Error.";
			pageSession.set("complaintsComplaintsPendingDetailsDetailsFormErrorMessage", message);
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

		Router.go("complaints.complaints_pending", mergeObjects(Router.currentRouteParams(), {}));
	}

	
});

Template.ComplaintsComplaintsPendingDetailsDetailsForm.helpers({
	"infoMessage": function() {
		return pageSession.get("complaintsComplaintsPendingDetailsDetailsFormInfoMessage");
	},
	"errorMessage": function() {
		return pageSession.get("complaintsComplaintsPendingDetailsDetailsFormErrorMessage");
	}
	
});
