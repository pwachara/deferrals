var pageSession = new ReactiveDict();

Template.QsDetails.onCreated(function() {
	
});

Template.QsDetails.onDestroyed(function() {
	
});

Template.QsDetails.onRendered(function() {
	
	Meteor.defer(function() {
		globalOnRendered();
		$("input[autofocus]").focus();
	});
});

Template.QsDetails.events({
	
});

Template.QsDetails.helpers({
	
});

Template.QsDetailsForm.onCreated(function() {
	
});

Template.QsDetailsForm.onDestroyed(function() {
	
});

Template.QsDetailsForm.onRendered(function() {
	

	pageSession.set("qsDetailsFormInfoMessage", "");
	pageSession.set("qsDetailsFormErrorMessage", "");

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

Template.QsDetailsForm.events({
	"submit": function(e, t) {
		e.preventDefault();
		pageSession.set("qsDetailsFormInfoMessage", "");
		pageSession.set("qsDetailsFormErrorMessage", "");

		var self = this;

		function submitAction(result, msg) {
			var qsDetailsFormMode = "read_only";
			if(!t.find("#form-cancel-button")) {
				switch(qsDetailsFormMode) {
					case "insert": {
						$(e.target)[0].reset();
					}; break;

					case "update": {
						var message = msg || "Saved.";
						pageSession.set("qsDetailsFormInfoMessage", message);
					}; break;
				}
			}

			/*SUBMIT_REDIRECT*/
		}

		function errorAction(msg) {
			msg = msg || "";
			var message = msg.message || msg || "Error.";
			pageSession.set("qsDetailsFormErrorMessage", message);
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

		Router.go("qs", mergeObjects(Router.currentRouteParams(), {}));
	},
	"click #form-back-button": function(e, t) {
		e.preventDefault();

		Router.go("qs", mergeObjects(Router.currentRouteParams(), {}));
	}

	
});

Template.QsDetailsForm.helpers({
	"infoMessage": function() {
		return pageSession.get("qsDetailsFormInfoMessage");
	},
	"errorMessage": function() {
		return pageSession.get("qsDetailsFormErrorMessage");
	}
	
});
