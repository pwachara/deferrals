var pageSession = new ReactiveDict();

Template.ComplaintsComplaintsPendingInsert.onCreated(function() {
	
});

Template.ComplaintsComplaintsPendingInsert.onDestroyed(function() {
	
});

Template.ComplaintsComplaintsPendingInsert.onRendered(function() {
	
	Meteor.defer(function() {
		globalOnRendered();
		$("input[autofocus]").focus();
	});
});

Template.ComplaintsComplaintsPendingInsert.events({
	
});

Template.ComplaintsComplaintsPendingInsert.helpers({
	
});

Template.ComplaintsComplaintsPendingInsertInsertForm.onCreated(function() {
	
});

Template.ComplaintsComplaintsPendingInsertInsertForm.onDestroyed(function() {
	
});

Template.ComplaintsComplaintsPendingInsertInsertForm.onRendered(function() {
	

	pageSession.set("complaintsComplaintsPendingInsertInsertFormInfoMessage", "");
	pageSession.set("complaintsComplaintsPendingInsertInsertFormErrorMessage", "");

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

Template.ComplaintsComplaintsPendingInsertInsertForm.events({
	"submit": function(e, t) {
		e.preventDefault();
		pageSession.set("complaintsComplaintsPendingInsertInsertFormInfoMessage", "");
		pageSession.set("complaintsComplaintsPendingInsertInsertFormErrorMessage", "");

		var self = this;

		function submitAction(result, msg) {
			var complaintsComplaintsPendingInsertInsertFormMode = "insert";
			if(!t.find("#form-cancel-button")) {
				switch(complaintsComplaintsPendingInsertInsertFormMode) {
					case "insert": {
						$(e.target)[0].reset();
					}; break;

					case "update": {
						var message = msg || "Saved.";
						pageSession.set("complaintsComplaintsPendingInsertInsertFormInfoMessage", message);
					}; break;
				}
			}

			Router.go("complaints.complaints_pending", mergeObjects(Router.currentRouteParams(), {}));
		}

		function errorAction(msg) {
			msg = msg || "";
			var message = msg.message || msg || "Error.";
			pageSession.set("complaintsComplaintsPendingInsertInsertFormErrorMessage", message);
		}

		validateForm(
			$(e.target),
			function(fieldName, fieldValue) {

			},
			function(msg) {

			},
			function(values) {
				

				Meteor.call("complaintsInsert", values, function(e, r) { if(e) errorAction(e); else submitAction(r); });
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

Template.ComplaintsComplaintsPendingInsertInsertForm.helpers({
	"infoMessage": function() {
		return pageSession.get("complaintsComplaintsPendingInsertInsertFormInfoMessage");
	},
	"errorMessage": function() {
		return pageSession.get("complaintsComplaintsPendingInsertInsertFormErrorMessage");
	}
	
});
