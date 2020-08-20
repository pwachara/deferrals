var pageSession = new ReactiveDict();

Template.BankingSegmentsDetails.onCreated(function() {
	
});

Template.BankingSegmentsDetails.onDestroyed(function() {
	
});

Template.BankingSegmentsDetails.onRendered(function() {
	
	Meteor.defer(function() {
		globalOnRendered();
		$("input[autofocus]").focus();
	});
});

Template.BankingSegmentsDetails.events({
	
});

Template.BankingSegmentsDetails.helpers({
	
});

Template.BankingSegmentsDetailsForm.onCreated(function() {
	
});

Template.BankingSegmentsDetailsForm.onDestroyed(function() {
	
});

Template.BankingSegmentsDetailsForm.onRendered(function() {
	

	pageSession.set("bankingSegmentsDetailsFormInfoMessage", "");
	pageSession.set("bankingSegmentsDetailsFormErrorMessage", "");

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

Template.BankingSegmentsDetailsForm.events({
	"submit": function(e, t) {
		e.preventDefault();
		pageSession.set("bankingSegmentsDetailsFormInfoMessage", "");
		pageSession.set("bankingSegmentsDetailsFormErrorMessage", "");

		var self = this;

		function submitAction(result, msg) {
			var bankingSegmentsDetailsFormMode = "read_only";
			if(!t.find("#form-cancel-button")) {
				switch(bankingSegmentsDetailsFormMode) {
					case "insert": {
						$(e.target)[0].reset();
					}; break;

					case "update": {
						var message = msg || "Saved.";
						pageSession.set("bankingSegmentsDetailsFormInfoMessage", message);
					}; break;
				}
			}

			/*SUBMIT_REDIRECT*/
		}

		function errorAction(msg) {
			msg = msg || "";
			var message = msg.message || msg || "Error.";
			pageSession.set("bankingSegmentsDetailsFormErrorMessage", message);
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

		Router.go("banking_segments", mergeObjects(Router.currentRouteParams(), {}));
	},
	"click #form-back-button": function(e, t) {
		e.preventDefault();

		Router.go("banking_segments", mergeObjects(Router.currentRouteParams(), {}));
	}

	
});

Template.BankingSegmentsDetailsForm.helpers({
	"infoMessage": function() {
		return pageSession.get("bankingSegmentsDetailsFormInfoMessage");
	},
	"errorMessage": function() {
		return pageSession.get("bankingSegmentsDetailsFormErrorMessage");
	}
	
});
