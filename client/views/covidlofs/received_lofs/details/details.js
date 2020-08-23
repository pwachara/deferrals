var pageSession = new ReactiveDict();

Template.CovidlofsReceivedLofsDetails.onCreated(function() {
	
});

Template.CovidlofsReceivedLofsDetails.onDestroyed(function() {
	
});

Template.CovidlofsReceivedLofsDetails.onRendered(function() {
	
	Meteor.defer(function() {
		globalOnRendered();
		$("input[autofocus]").focus();
	});
});

Template.CovidlofsReceivedLofsDetails.events({
	
});

Template.CovidlofsReceivedLofsDetails.helpers({
	
});

Template.CovidlofsReceivedLofsDetailsForm.onCreated(function() {
	
});

Template.CovidlofsReceivedLofsDetailsForm.onDestroyed(function() {
	
});

Template.CovidlofsReceivedLofsDetailsForm.onRendered(function() {
	

	pageSession.set("covidlofsReceivedLofsDetailsFormInfoMessage", "");
	pageSession.set("covidlofsReceivedLofsDetailsFormErrorMessage", "");

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

Template.CovidlofsReceivedLofsDetailsForm.events({
	"submit": function(e, t) {
		e.preventDefault();
		pageSession.set("covidlofsReceivedLofsDetailsFormInfoMessage", "");
		pageSession.set("covidlofsReceivedLofsDetailsFormErrorMessage", "");

		var self = this;

		function submitAction(result, msg) {
			var covidlofsReceivedLofsDetailsFormMode = "read_only";
			if(!t.find("#form-cancel-button")) {
				switch(covidlofsReceivedLofsDetailsFormMode) {
					case "insert": {
						$(e.target)[0].reset();
					}; break;

					case "update": {
						var message = msg || "Saved.";
						pageSession.set("covidlofsReceivedLofsDetailsFormInfoMessage", message);
					}; break;
				}
			}

			/*SUBMIT_REDIRECT*/
		}

		function errorAction(msg) {
			msg = msg || "";
			var message = msg.message || msg || "Error.";
			pageSession.set("covidlofsReceivedLofsDetailsFormErrorMessage", message);
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

		Router.go("covidlofs.received_lofs", mergeObjects(Router.currentRouteParams(), {}));
	},
	"click #form-back-button": function(e, t) {
		e.preventDefault();

		Router.go("covidlofs.received_lofs", mergeObjects(Router.currentRouteParams(), {}));
	}

	
});

Template.CovidlofsReceivedLofsDetailsForm.helpers({
	"infoMessage": function() {
		return pageSession.get("covidlofsReceivedLofsDetailsFormInfoMessage");
	},
	"errorMessage": function() {
		return pageSession.get("covidlofsReceivedLofsDetailsFormErrorMessage");
	}
	
});
