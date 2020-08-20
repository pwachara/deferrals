var pageSession = new ReactiveDict();

Template.ComplaintsComplaintsPendingEdit.onCreated(function() {
	
});

Template.ComplaintsComplaintsPendingEdit.onDestroyed(function() {
	
});

Template.ComplaintsComplaintsPendingEdit.onRendered(function() {
	
	Meteor.defer(function() {
		globalOnRendered();
		$("input[autofocus]").focus();
	});
});

Template.ComplaintsComplaintsPendingEdit.events({
	
});

Template.ComplaintsComplaintsPendingEdit.helpers({
	
});

Template.ComplaintsComplaintsPendingEditEditForm.onCreated(function() {
	
});

Template.ComplaintsComplaintsPendingEditEditForm.onDestroyed(function() {
	
});

Template.ComplaintsComplaintsPendingEditEditForm.onRendered(function() {
	

	pageSession.set("complaintsComplaintsPendingEditEditFormInfoMessage", "");
	pageSession.set("complaintsComplaintsPendingEditEditFormErrorMessage", "");

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

Template.ComplaintsComplaintsPendingEditEditForm.events({
	"submit": function(e, t) {
		e.preventDefault();
		pageSession.set("complaintsComplaintsPendingEditEditFormInfoMessage", "");
		pageSession.set("complaintsComplaintsPendingEditEditFormErrorMessage", "");

		var self = this;

		function submitAction(result, msg) {
			var complaintsComplaintsPendingEditEditFormMode = "update";
			if(!t.find("#form-cancel-button")) {
				switch(complaintsComplaintsPendingEditEditFormMode) {
					case "insert": {
						$(e.target)[0].reset();
					}; break;

					case "update": {
						var message = msg || "Saved.";
						pageSession.set("complaintsComplaintsPendingEditEditFormInfoMessage", message);
					}; break;
				}
			}

			Router.go("complaints.complaints_pending", mergeObjects(Router.currentRouteParams(), {}));
		}

		function errorAction(msg) {
			msg = msg || "";
			var message = msg.message || msg || "Error.";
			pageSession.set("complaintsComplaintsPendingEditEditFormErrorMessage", message);
		}

		validateForm(
			$(e.target),
			function(fieldName, fieldValue) {

			},
			function(msg) {

			},
			function(values) {
				

				Meteor.call("complaintsUpdate", t.data.complaint._id, values, function(e, r) { if(e) errorAction(e); else submitAction(r); });
			}
		);

		return false;
	},
	"click #form-cancel-button": function(e, t) {
		e.preventDefault();

		

		Router.go("complaints.complaints_pending", mergeObjects(Router.currentRouteParams(), {}));
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

Template.ComplaintsComplaintsPendingEditEditForm.helpers({
	"infoMessage": function() {
		return pageSession.get("complaintsComplaintsPendingEditEditFormInfoMessage");
	},
	"errorMessage": function() {
		return pageSession.get("complaintsComplaintsPendingEditEditFormErrorMessage");
	}
	
});
