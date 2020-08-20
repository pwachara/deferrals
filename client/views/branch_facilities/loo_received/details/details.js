var pageSession = new ReactiveDict();

Template.BranchFacilitiesLooReceivedDetails.onCreated(function() {
	
});

Template.BranchFacilitiesLooReceivedDetails.onDestroyed(function() {
	
});

Template.BranchFacilitiesLooReceivedDetails.onRendered(function() {
	
	Meteor.defer(function() {
		globalOnRendered();
		$("input[autofocus]").focus();
	});
});

Template.BranchFacilitiesLooReceivedDetails.events({
	
});

Template.BranchFacilitiesLooReceivedDetails.helpers({
	
});

Template.BranchFacilitiesLooReceivedDetailsForm.onCreated(function() {
	
});

Template.BranchFacilitiesLooReceivedDetailsForm.onDestroyed(function() {
	
});

Template.BranchFacilitiesLooReceivedDetailsForm.onRendered(function() {
	

	pageSession.set("branchFacilitiesLooReceivedDetailsFormInfoMessage", "");
	pageSession.set("branchFacilitiesLooReceivedDetailsFormErrorMessage", "");

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

Template.BranchFacilitiesLooReceivedDetailsForm.events({
	"submit": function(e, t) {
		e.preventDefault();
		pageSession.set("branchFacilitiesLooReceivedDetailsFormInfoMessage", "");
		pageSession.set("branchFacilitiesLooReceivedDetailsFormErrorMessage", "");

		var self = this;

		function submitAction(result, msg) {
			var branchFacilitiesLooReceivedDetailsFormMode = "read_only";
			if(!t.find("#form-cancel-button")) {
				switch(branchFacilitiesLooReceivedDetailsFormMode) {
					case "insert": {
						$(e.target)[0].reset();
					}; break;

					case "update": {
						var message = msg || "Saved.";
						pageSession.set("branchFacilitiesLooReceivedDetailsFormInfoMessage", message);
					}; break;
				}
			}

			/*SUBMIT_REDIRECT*/
		}

		function errorAction(msg) {
			msg = msg || "";
			var message = msg.message || msg || "Error.";
			pageSession.set("branchFacilitiesLooReceivedDetailsFormErrorMessage", message);
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

		Router.go("branch_facilities.loo_received", mergeObjects(Router.currentRouteParams(), {}));
	},
	"click #form-back-button": function(e, t) {
		e.preventDefault();

		Router.go("branch_facilities.loo_received", mergeObjects(Router.currentRouteParams(), {}));
	}

	
});

Template.BranchFacilitiesLooReceivedDetailsForm.helpers({
	"infoMessage": function() {
		return pageSession.get("branchFacilitiesLooReceivedDetailsFormInfoMessage");
	},
	"errorMessage": function() {
		return pageSession.get("branchFacilitiesLooReceivedDetailsFormErrorMessage");
	}
	
});
