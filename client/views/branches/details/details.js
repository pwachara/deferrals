var pageSession = new ReactiveDict();

Template.BranchesDetails.onCreated(function() {
	
});

Template.BranchesDetails.onDestroyed(function() {
	
});

Template.BranchesDetails.onRendered(function() {
	
	Meteor.defer(function() {
		globalOnRendered();
		$("input[autofocus]").focus();
	});
});

Template.BranchesDetails.events({
	
});

Template.BranchesDetails.helpers({
	
});

Template.BranchesDetailsForm.onCreated(function() {
	
});

Template.BranchesDetailsForm.onDestroyed(function() {
	
});

Template.BranchesDetailsForm.onRendered(function() {
	

	pageSession.set("branchesDetailsFormInfoMessage", "");
	pageSession.set("branchesDetailsFormErrorMessage", "");

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

Template.BranchesDetailsForm.events({
	"submit": function(e, t) {
		e.preventDefault();
		pageSession.set("branchesDetailsFormInfoMessage", "");
		pageSession.set("branchesDetailsFormErrorMessage", "");

		var self = this;

		function submitAction(result, msg) {
			var branchesDetailsFormMode = "read_only";
			if(!t.find("#form-cancel-button")) {
				switch(branchesDetailsFormMode) {
					case "insert": {
						$(e.target)[0].reset();
					}; break;

					case "update": {
						var message = msg || "Saved.";
						pageSession.set("branchesDetailsFormInfoMessage", message);
					}; break;
				}
			}

			/*SUBMIT_REDIRECT*/
		}

		function errorAction(msg) {
			msg = msg || "";
			var message = msg.message || msg || "Error.";
			pageSession.set("branchesDetailsFormErrorMessage", message);
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

		Router.go("branches", mergeObjects(Router.currentRouteParams(), {}));
	},
	"click #form-back-button": function(e, t) {
		e.preventDefault();

		Router.go("branches", mergeObjects(Router.currentRouteParams(), {}));
	}

	
});

Template.BranchesDetailsForm.helpers({
	"infoMessage": function() {
		return pageSession.get("branchesDetailsFormInfoMessage");
	},
	"errorMessage": function() {
		return pageSession.get("branchesDetailsFormErrorMessage");
	}
	
});
