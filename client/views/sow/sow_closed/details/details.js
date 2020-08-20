var pageSession = new ReactiveDict();

Template.SowSowClosedDetails.onCreated(function() {
	
});

Template.SowSowClosedDetails.onDestroyed(function() {
	
});

Template.SowSowClosedDetails.onRendered(function() {
	
	Meteor.defer(function() {
		globalOnRendered();
		$("input[autofocus]").focus();
	});
});

Template.SowSowClosedDetails.events({
	
});

Template.SowSowClosedDetails.helpers({
	
});

Template.SowSowClosedDetailsForm.onCreated(function() {
	
});

Template.SowSowClosedDetailsForm.onDestroyed(function() {
	
});

Template.SowSowClosedDetailsForm.onRendered(function() {
	

	pageSession.set("sowSowClosedDetailsFormInfoMessage", "");
	pageSession.set("sowSowClosedDetailsFormErrorMessage", "");

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

Template.SowSowClosedDetailsForm.events({
	"submit": function(e, t) {
		e.preventDefault();
		pageSession.set("sowSowClosedDetailsFormInfoMessage", "");
		pageSession.set("sowSowClosedDetailsFormErrorMessage", "");

		var self = this;

		function submitAction(result, msg) {
			var sowSowClosedDetailsFormMode = "read_only";
			if(!t.find("#form-cancel-button")) {
				switch(sowSowClosedDetailsFormMode) {
					case "insert": {
						$(e.target)[0].reset();
					}; break;

					case "update": {
						var message = msg || "Saved.";
						pageSession.set("sowSowClosedDetailsFormInfoMessage", message);
					}; break;
				}
			}

			/*SUBMIT_REDIRECT*/
		}

		function errorAction(msg) {
			msg = msg || "";
			var message = msg.message || msg || "Error.";
			pageSession.set("sowSowClosedDetailsFormErrorMessage", message);
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

		Router.go("sow.sow_closed", mergeObjects(Router.currentRouteParams(), {}));
	},
	"click #form-back-button": function(e, t) {
		e.preventDefault();

		Router.go("sow.sow_closed", mergeObjects(Router.currentRouteParams(), {}));
	}

	
});

Template.SowSowClosedDetailsForm.helpers({
	"infoMessage": function() {
		return pageSession.get("sowSowClosedDetailsFormInfoMessage");
	},
	"errorMessage": function() {
		return pageSession.get("sowSowClosedDetailsFormErrorMessage");
	}
	
});
