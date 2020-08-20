var pageSession = new ReactiveDict();

Template.BranchFacilitiesLooPendingInsert.onCreated(function() {
	
});

Template.BranchFacilitiesLooPendingInsert.onDestroyed(function() {
	
});

Template.BranchFacilitiesLooPendingInsert.onRendered(function() {
	
	Meteor.defer(function() {
		globalOnRendered();
		$("input[autofocus]").focus();
	});
});

Template.BranchFacilitiesLooPendingInsert.events({
	
});

Template.BranchFacilitiesLooPendingInsert.helpers({
	
});

Template.BranchFacilitiesLooPendingInsertForm.onCreated(function() {
	
});

Template.BranchFacilitiesLooPendingInsertForm.onDestroyed(function() {
	
});

Template.BranchFacilitiesLooPendingInsertForm.onRendered(function() {
	

	pageSession.set("branchFacilitiesLooPendingInsertFormInfoMessage", "");
	pageSession.set("branchFacilitiesLooPendingInsertFormErrorMessage", "");

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

Template.BranchFacilitiesLooPendingInsertForm.events({
	"submit": function(e, t) {
		e.preventDefault();
		pageSession.set("branchFacilitiesLooPendingInsertFormInfoMessage", "");
		pageSession.set("branchFacilitiesLooPendingInsertFormErrorMessage", "");

		var self = this;

		function submitAction(result, msg) {
			var branchFacilitiesLooPendingInsertFormMode = "insert";
			if(!t.find("#form-cancel-button")) {
				switch(branchFacilitiesLooPendingInsertFormMode) {
					case "insert": {
						$(e.target)[0].reset();
					}; break;

					case "update": {
						var message = msg || "Saved.";
						pageSession.set("branchFacilitiesLooPendingInsertFormInfoMessage", message);
					}; break;
				}
			}

			Router.go("branch_facilities.loo_pending", mergeObjects(Router.currentRouteParams(), {}));
		}

		function errorAction(msg) {
			msg = msg || "";
			var message = msg.message || msg || "Error.";
			pageSession.set("branchFacilitiesLooPendingInsertFormErrorMessage", message);
		}

		validateForm(
			$(e.target),
			function(fieldName, fieldValue) {

			},
			function(msg) {

			},
			function(values) {
				

				Meteor.call("branchFacilitiesInsert", values, function(e, r) { if(e) errorAction(e); else submitAction(r); });
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

Template.BranchFacilitiesLooPendingInsertForm.helpers({
	"infoMessage": function() {
		return pageSession.get("branchFacilitiesLooPendingInsertFormInfoMessage");
	},
	"errorMessage": function() {
		return pageSession.get("branchFacilitiesLooPendingInsertFormErrorMessage");
	}
	
});
