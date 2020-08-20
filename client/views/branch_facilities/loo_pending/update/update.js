var pageSession = new ReactiveDict();

Template.BranchFacilitiesLooPendingUpdate.onCreated(function() {
	
});

Template.BranchFacilitiesLooPendingUpdate.onDestroyed(function() {
	
});

Template.BranchFacilitiesLooPendingUpdate.onRendered(function() {
	
	Meteor.defer(function() {
		globalOnRendered();
		$("input[autofocus]").focus();
	});
});

Template.BranchFacilitiesLooPendingUpdate.events({
	
});

Template.BranchFacilitiesLooPendingUpdate.helpers({
	
});

Template.BranchFacilitiesLooPendingUpdateForm.onCreated(function() {
	
});

Template.BranchFacilitiesLooPendingUpdateForm.onDestroyed(function() {
	
});

Template.BranchFacilitiesLooPendingUpdateForm.onRendered(function() {
	

	pageSession.set("branchFacilitiesLooPendingUpdateFormInfoMessage", "");
	pageSession.set("branchFacilitiesLooPendingUpdateFormErrorMessage", "");

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

Template.BranchFacilitiesLooPendingUpdateForm.events({
	"submit": function(e, t) {
		e.preventDefault();
		pageSession.set("branchFacilitiesLooPendingUpdateFormInfoMessage", "");
		pageSession.set("branchFacilitiesLooPendingUpdateFormErrorMessage", "");

		var self = this;

		function submitAction(result, msg) {
			var branchFacilitiesLooPendingUpdateFormMode = "update";
			if(!t.find("#form-cancel-button")) {
				switch(branchFacilitiesLooPendingUpdateFormMode) {
					case "insert": {
						$(e.target)[0].reset();
					}; break;

					case "update": {
						var message = msg || "Saved.";
						pageSession.set("branchFacilitiesLooPendingUpdateFormInfoMessage", message);
					}; break;
				}
			}

			Router.go("branch_facilities.loo_pending", mergeObjects(Router.currentRouteParams(), {}));
		}

		function errorAction(msg) {
			msg = msg || "";
			var message = msg.message || msg || "Error.";
			pageSession.set("branchFacilitiesLooPendingUpdateFormErrorMessage", message);
		}

		validateForm(
			$(e.target),
			function(fieldName, fieldValue) {

			},
			function(msg) {

			},
			function(values) {
				

				Meteor.call("branchFacilitiesUpdate", t.data.loo_pending1._id, values, function(e, r) { if(e) errorAction(e); else submitAction(r); });
			}
		);

		return false;
	},
	"click #form-cancel-button": function(e, t) {
		e.preventDefault();

		

		Router.go("branch_facilities.loo_pending", mergeObjects(Router.currentRouteParams(), {}));
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

Template.BranchFacilitiesLooPendingUpdateForm.helpers({
	"infoMessage": function() {
		return pageSession.get("branchFacilitiesLooPendingUpdateFormInfoMessage");
	},
	"errorMessage": function() {
		return pageSession.get("branchFacilitiesLooPendingUpdateFormErrorMessage");
	}
	
});
