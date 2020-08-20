var pageSession = new ReactiveDict();

Template.HomePrivateInstructionsIncompleteDetails.onCreated(function() {
	
});

Template.HomePrivateInstructionsIncompleteDetails.onDestroyed(function() {
	
});

Template.HomePrivateInstructionsIncompleteDetails.onRendered(function() {
	
	Meteor.defer(function() {
		globalOnRendered();
		$("input[autofocus]").focus();
	});
});

Template.HomePrivateInstructionsIncompleteDetails.events({
	
	"click #page-close-button": function(e, t) {
		e.preventDefault();
		Router.go("home_private.instructions_incomplete", mergeObjects(Router.currentRouteParams(), {  }));
	},
	"click #page-back-button": function(e, t) {
		e.preventDefault();
		Router.go("home_private.instructions_incomplete", mergeObjects(Router.currentRouteParams(), {  }));
	}
});

Template.HomePrivateInstructionsIncompleteDetails.helpers({
	
});

Template.HomePrivateInstructionsIncompleteDetailsDetailsForm.onCreated(function() {
	
});

Template.HomePrivateInstructionsIncompleteDetailsDetailsForm.onDestroyed(function() {
	
});

Template.HomePrivateInstructionsIncompleteDetailsDetailsForm.onRendered(function() {
	

	pageSession.set("homePrivateInstructionsIncompleteDetailsDetailsFormInfoMessage", "");
	pageSession.set("homePrivateInstructionsIncompleteDetailsDetailsFormErrorMessage", "");

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

Template.HomePrivateInstructionsIncompleteDetailsDetailsForm.events({
	"submit": function(e, t) {
		e.preventDefault();
		pageSession.set("homePrivateInstructionsIncompleteDetailsDetailsFormInfoMessage", "");
		pageSession.set("homePrivateInstructionsIncompleteDetailsDetailsFormErrorMessage", "");

		var self = this;

		function submitAction(result, msg) {
			var homePrivateInstructionsIncompleteDetailsDetailsFormMode = "read_only";
			if(!t.find("#form-cancel-button")) {
				switch(homePrivateInstructionsIncompleteDetailsDetailsFormMode) {
					case "insert": {
						$(e.target)[0].reset();
					}; break;

					case "update": {
						var message = msg || "Saved.";
						pageSession.set("homePrivateInstructionsIncompleteDetailsDetailsFormInfoMessage", message);
					}; break;
				}
			}

			Router.go("home_private.instructions_incomplete", mergeObjects(Router.currentRouteParams(), {}));
		}

		function errorAction(msg) {
			msg = msg || "";
			var message = msg.message || msg || "Error.";
			pageSession.set("homePrivateInstructionsIncompleteDetailsDetailsFormErrorMessage", message);
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

		Router.go("home_private.instructions_incomplete", mergeObjects(Router.currentRouteParams(), {}));
	}

	
});

Template.HomePrivateInstructionsIncompleteDetailsDetailsForm.helpers({
	"infoMessage": function() {
		return pageSession.get("homePrivateInstructionsIncompleteDetailsDetailsFormInfoMessage");
	},
	"errorMessage": function() {
		return pageSession.get("homePrivateInstructionsIncompleteDetailsDetailsFormErrorMessage");
	}
	
});
