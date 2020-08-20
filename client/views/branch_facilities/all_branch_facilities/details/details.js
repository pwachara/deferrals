var pageSession = new ReactiveDict();

Template.BranchFacilitiesAllBranchFacilitiesDetails.onCreated(function() {
	
});

Template.BranchFacilitiesAllBranchFacilitiesDetails.onDestroyed(function() {
	
});

Template.BranchFacilitiesAllBranchFacilitiesDetails.onRendered(function() {
	
	Meteor.defer(function() {
		globalOnRendered();
		$("input[autofocus]").focus();
	});
});

Template.BranchFacilitiesAllBranchFacilitiesDetails.events({
	
});

Template.BranchFacilitiesAllBranchFacilitiesDetails.helpers({
	
});

Template.BranchFacilitiesAllBranchFacilitiesDetailsForm.onCreated(function() {
	
});

Template.BranchFacilitiesAllBranchFacilitiesDetailsForm.onDestroyed(function() {
	
});

Template.BranchFacilitiesAllBranchFacilitiesDetailsForm.onRendered(function() {
	

	pageSession.set("branchFacilitiesAllBranchFacilitiesDetailsFormInfoMessage", "");
	pageSession.set("branchFacilitiesAllBranchFacilitiesDetailsFormErrorMessage", "");

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

Template.BranchFacilitiesAllBranchFacilitiesDetailsForm.events({
	"submit": function(e, t) {
		e.preventDefault();
		pageSession.set("branchFacilitiesAllBranchFacilitiesDetailsFormInfoMessage", "");
		pageSession.set("branchFacilitiesAllBranchFacilitiesDetailsFormErrorMessage", "");

		var self = this;

		function submitAction(result, msg) {
			var branchFacilitiesAllBranchFacilitiesDetailsFormMode = "read_only";
			if(!t.find("#form-cancel-button")) {
				switch(branchFacilitiesAllBranchFacilitiesDetailsFormMode) {
					case "insert": {
						$(e.target)[0].reset();
					}; break;

					case "update": {
						var message = msg || "Saved.";
						pageSession.set("branchFacilitiesAllBranchFacilitiesDetailsFormInfoMessage", message);
					}; break;
				}
			}

			/*SUBMIT_REDIRECT*/
		}

		function errorAction(msg) {
			msg = msg || "";
			var message = msg.message || msg || "Error.";
			pageSession.set("branchFacilitiesAllBranchFacilitiesDetailsFormErrorMessage", message);
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

		Router.go("branch_facilities.all_branch_facilities", mergeObjects(Router.currentRouteParams(), {}));
	},
	"click #form-back-button": function(e, t) {
		e.preventDefault();

		Router.go("branch_facilities.all_branch_facilities", mergeObjects(Router.currentRouteParams(), {}));
	}

	
});

Template.BranchFacilitiesAllBranchFacilitiesDetailsForm.helpers({
	"infoMessage": function() {
		return pageSession.get("branchFacilitiesAllBranchFacilitiesDetailsFormInfoMessage");
	},
	"errorMessage": function() {
		return pageSession.get("branchFacilitiesAllBranchFacilitiesDetailsFormErrorMessage");
	}
	
});
