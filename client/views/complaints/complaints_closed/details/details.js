var pageSession = new ReactiveDict();

Template.ComplaintsComplaintsClosedDetails.onCreated(function() {
	
});

Template.ComplaintsComplaintsClosedDetails.onDestroyed(function() {
	
});

Template.ComplaintsComplaintsClosedDetails.onRendered(function() {
	
	Meteor.defer(function() {
		globalOnRendered();
		$("input[autofocus]").focus();
	});
});

Template.ComplaintsComplaintsClosedDetails.events({
	
	"click #page-back-button": function(e, t) {
		e.preventDefault();
		Router.go("complaints.complaints_closed", mergeObjects(Router.currentRouteParams(), {  }));
	}
});

Template.ComplaintsComplaintsClosedDetails.helpers({
	
});

Template.ComplaintsComplaintsClosedDetailsDetailsForm.onCreated(function() {
	
});

Template.ComplaintsComplaintsClosedDetailsDetailsForm.onDestroyed(function() {
	
});

Template.ComplaintsComplaintsClosedDetailsDetailsForm.onRendered(function() {
	

	pageSession.set("complaintsComplaintsClosedDetailsDetailsFormInfoMessage", "");
	pageSession.set("complaintsComplaintsClosedDetailsDetailsFormErrorMessage", "");

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

Template.ComplaintsComplaintsClosedDetailsDetailsForm.events({
	"submit": function(e, t) {
		e.preventDefault();
		pageSession.set("complaintsComplaintsClosedDetailsDetailsFormInfoMessage", "");
		pageSession.set("complaintsComplaintsClosedDetailsDetailsFormErrorMessage", "");

		var self = this;

		function submitAction(result, msg) {
			var complaintsComplaintsClosedDetailsDetailsFormMode = "read_only";
			if(!t.find("#form-cancel-button")) {
				switch(complaintsComplaintsClosedDetailsDetailsFormMode) {
					case "insert": {
						$(e.target)[0].reset();
					}; break;

					case "update": {
						var message = msg || "Saved.";
						pageSession.set("complaintsComplaintsClosedDetailsDetailsFormInfoMessage", message);
					}; break;
				}
			}

			/*SUBMIT_REDIRECT*/
		}

		function errorAction(msg) {
			msg = msg || "";
			var message = msg.message || msg || "Error.";
			pageSession.set("complaintsComplaintsClosedDetailsDetailsFormErrorMessage", message);
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

		Router.go("complaints.complaints_closed", mergeObjects(Router.currentRouteParams(), {}));
	}

	
});

Template.ComplaintsComplaintsClosedDetailsDetailsForm.helpers({
	"infoMessage": function() {
		return pageSession.get("complaintsComplaintsClosedDetailsDetailsFormInfoMessage");
	},
	"errorMessage": function() {
		return pageSession.get("complaintsComplaintsClosedDetailsDetailsFormErrorMessage");
	}
	
});
