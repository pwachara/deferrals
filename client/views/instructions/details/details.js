var pageSession = new ReactiveDict();

Template.InstructionsDetails.onCreated(function() {
	
});

Template.InstructionsDetails.onDestroyed(function() {
	
});

Template.InstructionsDetails.onRendered(function() {
	
	Meteor.defer(function() {
		globalOnRendered();
		$("input[autofocus]").focus();
	});
});

Template.InstructionsDetails.events({
	
	"click #page-close-button": function(e, t) {
		e.preventDefault();
		Router.go("instructions", mergeObjects(Router.currentRouteParams(), {  }));
	},
	"click #page-back-button": function(e, t) {
		e.preventDefault();
		Router.go("instructions", mergeObjects(Router.currentRouteParams(), {  }));
	}
});

Template.InstructionsDetails.helpers({
	
});

Template.InstructionsDetailsDetailsForm.onCreated(function() {
	
});

Template.InstructionsDetailsDetailsForm.onDestroyed(function() {
	
});

Template.InstructionsDetailsDetailsForm.onRendered(function() {
	

	pageSession.set("instructionsDetailsDetailsFormInfoMessage", "");
	pageSession.set("instructionsDetailsDetailsFormErrorMessage", "");

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

Template.InstructionsDetailsDetailsForm.events({
	"submit": function(e, t) {
		e.preventDefault();
		pageSession.set("instructionsDetailsDetailsFormInfoMessage", "");
		pageSession.set("instructionsDetailsDetailsFormErrorMessage", "");

		var self = this;

		function submitAction(result, msg) {
			var instructionsDetailsDetailsFormMode = "read_only";
			if(!t.find("#form-cancel-button")) {
				switch(instructionsDetailsDetailsFormMode) {
					case "insert": {
						$(e.target)[0].reset();
					}; break;

					case "update": {
						var message = msg || "Saved.";
						pageSession.set("instructionsDetailsDetailsFormInfoMessage", message);
					}; break;
				}
			}

			Router.go("instructions", mergeObjects(Router.currentRouteParams(), {}));
		}

		function errorAction(msg) {
			msg = msg || "";
			var message = msg.message || msg || "Error.";
			pageSession.set("instructionsDetailsDetailsFormErrorMessage", message);
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

		/*BACK_REDIRECT*/
	}

	
});

Template.InstructionsDetailsDetailsForm.helpers({
	"infoMessage": function() {
		return pageSession.get("instructionsDetailsDetailsFormInfoMessage");
	},
	"errorMessage": function() {
		return pageSession.get("instructionsDetailsDetailsFormErrorMessage");
	}
	
});
