var pageSession = new ReactiveDict();

Template.CovidlofsPendingLofsDetails.onCreated(function() {
	
});

Template.CovidlofsPendingLofsDetails.onDestroyed(function() {
	
});

Template.CovidlofsPendingLofsDetails.onRendered(function() {
	
	Meteor.defer(function() {
		globalOnRendered();
		$("input[autofocus]").focus();
	});
});

Template.CovidlofsPendingLofsDetails.events({
	
});

Template.CovidlofsPendingLofsDetails.helpers({
	
});

Template.CovidlofsPendingLofsDetailsForm.onCreated(function() {
	
});

Template.CovidlofsPendingLofsDetailsForm.onDestroyed(function() {
	
});

Template.CovidlofsPendingLofsDetailsForm.onRendered(function() {
	

	pageSession.set("covidlofsPendingLofsDetailsFormInfoMessage", "");
	pageSession.set("covidlofsPendingLofsDetailsFormErrorMessage", "");

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

Template.CovidlofsPendingLofsDetailsForm.events({
	"submit": function(e, t) {
		e.preventDefault();
		pageSession.set("covidlofsPendingLofsDetailsFormInfoMessage", "");
		pageSession.set("covidlofsPendingLofsDetailsFormErrorMessage", "");

		var self = this;

		function submitAction(result, msg) {
			var covidlofsPendingLofsDetailsFormMode = "read_only";
			if(!t.find("#form-cancel-button")) {
				switch(covidlofsPendingLofsDetailsFormMode) {
					case "insert": {
						$(e.target)[0].reset();
					}; break;

					case "update": {
						var message = msg || "Saved.";
						pageSession.set("covidlofsPendingLofsDetailsFormInfoMessage", message);
					}; break;
				}
			}

			/*SUBMIT_REDIRECT*/
		}

		function errorAction(msg) {
			msg = msg || "";
			var message = msg.message || msg || "Error.";
			pageSession.set("covidlofsPendingLofsDetailsFormErrorMessage", message);
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

		Router.go("covidlofs.pending_lofs", mergeObjects(Router.currentRouteParams(), {}));
	},
	"click #form-back-button": function(e, t) {
		e.preventDefault();

		Router.go("covidlofs.pending_lofs", mergeObjects(Router.currentRouteParams(), {}));
	}

	
});

Template.CovidlofsPendingLofsDetailsForm.helpers({
	"infoMessage": function() {
		return pageSession.get("covidlofsPendingLofsDetailsFormInfoMessage");
	},
	"errorMessage": function() {
		return pageSession.get("covidlofsPendingLofsDetailsFormErrorMessage");
	}
	
});
