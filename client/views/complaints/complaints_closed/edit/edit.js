var pageSession = new ReactiveDict();

Template.ComplaintsComplaintsClosedEdit.onCreated(function() {
	
});

Template.ComplaintsComplaintsClosedEdit.onDestroyed(function() {
	
});

Template.ComplaintsComplaintsClosedEdit.onRendered(function() {
	
	Meteor.defer(function() {
		globalOnRendered();
		$("input[autofocus]").focus();
	});
});

Template.ComplaintsComplaintsClosedEdit.events({
	
});

Template.ComplaintsComplaintsClosedEdit.helpers({
	
});

Template.ComplaintsComplaintsClosedEditEditForm.onCreated(function() {
	
});

Template.ComplaintsComplaintsClosedEditEditForm.onDestroyed(function() {
	
});

Template.ComplaintsComplaintsClosedEditEditForm.onRendered(function() {
	

	pageSession.set("complaintsComplaintsClosedEditEditFormInfoMessage", "");
	pageSession.set("complaintsComplaintsClosedEditEditFormErrorMessage", "");

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

Template.ComplaintsComplaintsClosedEditEditForm.events({
	"submit": function(e, t) {
		e.preventDefault();
		pageSession.set("complaintsComplaintsClosedEditEditFormInfoMessage", "");
		pageSession.set("complaintsComplaintsClosedEditEditFormErrorMessage", "");

		var self = this;

		function submitAction(result, msg) {
			var complaintsComplaintsClosedEditEditFormMode = "update";
			if(!t.find("#form-cancel-button")) {
				switch(complaintsComplaintsClosedEditEditFormMode) {
					case "insert": {
						$(e.target)[0].reset();
					}; break;

					case "update": {
						var message = msg || "Saved.";
						pageSession.set("complaintsComplaintsClosedEditEditFormInfoMessage", message);
					}; break;
				}
			}

			Router.go("complaints.complaints_closed", mergeObjects(Router.currentRouteParams(), {}));
		}

		function errorAction(msg) {
			msg = msg || "";
			var message = msg.message || msg || "Error.";
			pageSession.set("complaintsComplaintsClosedEditEditFormErrorMessage", message);
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

		

		Router.go("complaints.complaints_closed", mergeObjects(Router.currentRouteParams(), {}));
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

Template.ComplaintsComplaintsClosedEditEditForm.helpers({
	"infoMessage": function() {
		return pageSession.get("complaintsComplaintsClosedEditEditFormInfoMessage");
	},
	"errorMessage": function() {
		return pageSession.get("complaintsComplaintsClosedEditEditFormErrorMessage");
	}
	
});
