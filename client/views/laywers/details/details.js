var pageSession = new ReactiveDict();

Template.LaywersDetails.onCreated(function() {
	
});

Template.LaywersDetails.onDestroyed(function() {
	
});

Template.LaywersDetails.onRendered(function() {
	
	Meteor.defer(function() {
		globalOnRendered();
		$("input[autofocus]").focus();
	});
});

Template.LaywersDetails.events({
	
	"click #page-back-button": function(e, t) {
		e.preventDefault();
		Router.go("laywers", mergeObjects(Router.currentRouteParams(), {  }));
	}
});

Template.LaywersDetails.helpers({
	
});

Template.LaywersDetailsDetailsForm.onCreated(function() {
	
});

Template.LaywersDetailsDetailsForm.onDestroyed(function() {
	
});

Template.LaywersDetailsDetailsForm.onRendered(function() {
	

	pageSession.set("laywersDetailsDetailsFormInfoMessage", "");
	pageSession.set("laywersDetailsDetailsFormErrorMessage", "");

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

Template.LaywersDetailsDetailsForm.events({
	"submit": function(e, t) {
		e.preventDefault();
		pageSession.set("laywersDetailsDetailsFormInfoMessage", "");
		pageSession.set("laywersDetailsDetailsFormErrorMessage", "");

		var self = this;

		function submitAction(result, msg) {
			var laywersDetailsDetailsFormMode = "read_only";
			if(!t.find("#form-cancel-button")) {
				switch(laywersDetailsDetailsFormMode) {
					case "insert": {
						$(e.target)[0].reset();
					}; break;

					case "update": {
						var message = msg || "Saved.";
						pageSession.set("laywersDetailsDetailsFormInfoMessage", message);
					}; break;
				}
			}

			/*SUBMIT_REDIRECT*/
		}

		function errorAction(msg) {
			msg = msg || "";
			var message = msg.message || msg || "Error.";
			pageSession.set("laywersDetailsDetailsFormErrorMessage", message);
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

		Router.go("laywers", mergeObjects(Router.currentRouteParams(), {}));
	}

	
});

Template.LaywersDetailsDetailsForm.helpers({
	"infoMessage": function() {
		return pageSession.get("laywersDetailsDetailsFormInfoMessage");
	},
	"errorMessage": function() {
		return pageSession.get("laywersDetailsDetailsFormErrorMessage");
	}
	
});
