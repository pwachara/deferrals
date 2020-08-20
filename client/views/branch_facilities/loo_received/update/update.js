var pageSession = new ReactiveDict();

Template.BranchFacilitiesLooReceivedUpdate.onCreated(function() {
	
});

Template.BranchFacilitiesLooReceivedUpdate.onDestroyed(function() {
	
});

Template.BranchFacilitiesLooReceivedUpdate.onRendered(function() {
	
	Meteor.defer(function() {
		globalOnRendered();
		$("input[autofocus]").focus();
	});
});

Template.BranchFacilitiesLooReceivedUpdate.events({
	
});

Template.BranchFacilitiesLooReceivedUpdate.helpers({
	
});

Template.BranchFacilitiesLooReceivedUpdateForm.onCreated(function() {
	
});

Template.BranchFacilitiesLooReceivedUpdateForm.onDestroyed(function() {
	
});

Template.BranchFacilitiesLooReceivedUpdateForm.onRendered(function() {
	

	pageSession.set("branchFacilitiesLooReceivedUpdateFormInfoMessage", "");
	pageSession.set("branchFacilitiesLooReceivedUpdateFormErrorMessage", "");

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

Template.BranchFacilitiesLooReceivedUpdateForm.events({
	"submit": function(e, t) {
		e.preventDefault();
		pageSession.set("branchFacilitiesLooReceivedUpdateFormInfoMessage", "");
		pageSession.set("branchFacilitiesLooReceivedUpdateFormErrorMessage", "");

		var self = this;

		function submitAction(result, msg) {
			var branchFacilitiesLooReceivedUpdateFormMode = "update";
			if(!t.find("#form-cancel-button")) {
				switch(branchFacilitiesLooReceivedUpdateFormMode) {
					case "insert": {
						$(e.target)[0].reset();
					}; break;

					case "update": {
						var message = msg || "Saved.";
						pageSession.set("branchFacilitiesLooReceivedUpdateFormInfoMessage", message);
					}; break;
				}
			}

			Router.go("branch_facilities.loo_received", mergeObjects(Router.currentRouteParams(), {}));
		}

		function errorAction(msg) {
			msg = msg || "";
			var message = msg.message || msg || "Error.";
			pageSession.set("branchFacilitiesLooReceivedUpdateFormErrorMessage", message);
		}

		validateForm(
			$(e.target),
			function(fieldName, fieldValue) {

			},
			function(msg) {

			},
			function(values) {
				

				Meteor.call("branchFacilitiesUpdate", t.data.loo_received._id, values, function(e, r) { if(e) errorAction(e); else submitAction(r); });
			}
		);

		return false;
	},
	"click #form-cancel-button": function(e, t) {
		e.preventDefault();

		

		Router.go("branch_facilities.loo_received", mergeObjects(Router.currentRouteParams(), {}));
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

Template.BranchFacilitiesLooReceivedUpdateForm.helpers({
	"infoMessage": function() {
		return pageSession.get("branchFacilitiesLooReceivedUpdateFormInfoMessage");
	},
	"errorMessage": function() {
		return pageSession.get("branchFacilitiesLooReceivedUpdateFormErrorMessage");
	}
	
});
