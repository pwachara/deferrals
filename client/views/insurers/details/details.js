var pageSession = new ReactiveDict();

Template.InsurersDetails.onCreated(function() {
	
});

Template.InsurersDetails.onDestroyed(function() {
	
});

Template.InsurersDetails.onRendered(function() {
	
	Meteor.defer(function() {
		globalOnRendered();
		$("input[autofocus]").focus();
	});
});

Template.InsurersDetails.events({
	
	"click #page-back-button": function(e, t) {
		e.preventDefault();
		Router.go("insurers", mergeObjects(Router.currentRouteParams(), {  }));
	}
});

Template.InsurersDetails.helpers({
	
});

Template.InsurersDetailsDetailsForm.onCreated(function() {
	
});

Template.InsurersDetailsDetailsForm.onDestroyed(function() {
	
});

Template.InsurersDetailsDetailsForm.onRendered(function() {
	

	pageSession.set("insurersDetailsDetailsFormInfoMessage", "");
	pageSession.set("insurersDetailsDetailsFormErrorMessage", "");

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

Template.InsurersDetailsDetailsForm.events({
	"submit": function(e, t) {
		e.preventDefault();
		pageSession.set("insurersDetailsDetailsFormInfoMessage", "");
		pageSession.set("insurersDetailsDetailsFormErrorMessage", "");

		var self = this;

		function submitAction(result, msg) {
			var insurersDetailsDetailsFormMode = "read_only";
			if(!t.find("#form-cancel-button")) {
				switch(insurersDetailsDetailsFormMode) {
					case "insert": {
						$(e.target)[0].reset();
					}; break;

					case "update": {
						var message = msg || "Saved.";
						pageSession.set("insurersDetailsDetailsFormInfoMessage", message);
					}; break;
				}
			}

			/*SUBMIT_REDIRECT*/
		}

		function errorAction(msg) {
			msg = msg || "";
			var message = msg.message || msg || "Error.";
			pageSession.set("insurersDetailsDetailsFormErrorMessage", message);
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

		Router.go("insurers", mergeObjects(Router.currentRouteParams(), {}));
	}

	
});

Template.InsurersDetailsDetailsForm.helpers({
	"infoMessage": function() {
		return pageSession.get("insurersDetailsDetailsFormInfoMessage");
	},
	"errorMessage": function() {
		return pageSession.get("insurersDetailsDetailsFormErrorMessage");
	}
	
});
