var pageSession = new ReactiveDict();

Template.BranchesUpdate.onCreated(function() {
	
});

Template.BranchesUpdate.onDestroyed(function() {
	
});

Template.BranchesUpdate.onRendered(function() {
	
	Meteor.defer(function() {
		globalOnRendered();
		$("input[autofocus]").focus();
	});
});

Template.BranchesUpdate.events({
	
});

Template.BranchesUpdate.helpers({
	
});

Template.BranchesUpdateForm.onCreated(function() {
	
});

Template.BranchesUpdateForm.onDestroyed(function() {
	
});

Template.BranchesUpdateForm.onRendered(function() {
	

	pageSession.set("branchesUpdateFormInfoMessage", "");
	pageSession.set("branchesUpdateFormErrorMessage", "");

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

Template.BranchesUpdateForm.events({
	"submit": function(e, t) {
		e.preventDefault();
		pageSession.set("branchesUpdateFormInfoMessage", "");
		pageSession.set("branchesUpdateFormErrorMessage", "");

		var self = this;

		function submitAction(result, msg) {
			var branchesUpdateFormMode = "update";
			if(!t.find("#form-cancel-button")) {
				switch(branchesUpdateFormMode) {
					case "insert": {
						$(e.target)[0].reset();
					}; break;

					case "update": {
						var message = msg || "Saved.";
						pageSession.set("branchesUpdateFormInfoMessage", message);
					}; break;
				}
			}

			Router.go("branches", mergeObjects(Router.currentRouteParams(), {}));
		}

		function errorAction(msg) {
			msg = msg || "";
			var message = msg.message || msg || "Error.";
			pageSession.set("branchesUpdateFormErrorMessage", message);
		}

		validateForm(
			$(e.target),
			function(fieldName, fieldValue) {

			},
			function(msg) {

			},
			function(values) {
				

				Meteor.call("branchesUpdate", t.data.branch._id, values, function(e, r) { if(e) errorAction(e); else submitAction(r); });
			}
		);

		return false;
	},
	"click #form-cancel-button": function(e, t) {
		e.preventDefault();

		

		Router.go("branches", mergeObjects(Router.currentRouteParams(), {}));
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

Template.BranchesUpdateForm.helpers({
	"infoMessage": function() {
		return pageSession.get("branchesUpdateFormInfoMessage");
	},
	"errorMessage": function() {
		return pageSession.get("branchesUpdateFormErrorMessage");
	}
	
});
