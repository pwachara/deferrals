var pageSession = new ReactiveDict();

Template.ValuersDetails.onCreated(function() {
	
});

Template.ValuersDetails.onDestroyed(function() {
	
});

Template.ValuersDetails.onRendered(function() {
	
	Meteor.defer(function() {
		globalOnRendered();
		$("input[autofocus]").focus();
	});
});

Template.ValuersDetails.events({
	
	"click #page-back-button": function(e, t) {
		e.preventDefault();
		Router.go("valuers", mergeObjects(Router.currentRouteParams(), {  }));
	}
});

Template.ValuersDetails.helpers({
	
});

Template.ValuersDetailsDetailsForm.onCreated(function() {
	
});

Template.ValuersDetailsDetailsForm.onDestroyed(function() {
	
});

Template.ValuersDetailsDetailsForm.onRendered(function() {
	

	pageSession.set("valuersDetailsDetailsFormInfoMessage", "");
	pageSession.set("valuersDetailsDetailsFormErrorMessage", "");

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

Template.ValuersDetailsDetailsForm.events({
	"submit": function(e, t) {
		e.preventDefault();
		pageSession.set("valuersDetailsDetailsFormInfoMessage", "");
		pageSession.set("valuersDetailsDetailsFormErrorMessage", "");

		var self = this;

		function submitAction(result, msg) {
			var valuersDetailsDetailsFormMode = "read_only";
			if(!t.find("#form-cancel-button")) {
				switch(valuersDetailsDetailsFormMode) {
					case "insert": {
						$(e.target)[0].reset();
					}; break;

					case "update": {
						var message = msg || "Saved.";
						pageSession.set("valuersDetailsDetailsFormInfoMessage", message);
					}; break;
				}
			}

			/*SUBMIT_REDIRECT*/
		}

		function errorAction(msg) {
			msg = msg || "";
			var message = msg.message || msg || "Error.";
			pageSession.set("valuersDetailsDetailsFormErrorMessage", message);
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

		Router.go("valuers", mergeObjects(Router.currentRouteParams(), {}));
	}

	
});

Template.ValuersDetailsDetailsForm.helpers({
	"infoMessage": function() {
		return pageSession.get("valuersDetailsDetailsFormInfoMessage");
	},
	"errorMessage": function() {
		return pageSession.get("valuersDetailsDetailsFormErrorMessage");
	}
	
});
