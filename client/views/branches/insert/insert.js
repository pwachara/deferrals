var pageSession = new ReactiveDict();

Template.BranchesInsert.onCreated(function() {
	
});

Template.BranchesInsert.onDestroyed(function() {
	
});

Template.BranchesInsert.onRendered(function() {
	
	Meteor.defer(function() {
		globalOnRendered();
		$("input[autofocus]").focus();
	});
});

Template.BranchesInsert.events({
	
});

Template.BranchesInsert.helpers({
	
});

Template.BranchesInsertForm.onCreated(function() {
	
});

Template.BranchesInsertForm.onDestroyed(function() {
	
});

Template.BranchesInsertForm.onRendered(function() {
	

	pageSession.set("branchesInsertFormInfoMessage", "");
	pageSession.set("branchesInsertFormErrorMessage", "");

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

Template.BranchesInsertForm.events({
	"submit": function(e, t) {
		e.preventDefault();
		pageSession.set("branchesInsertFormInfoMessage", "");
		pageSession.set("branchesInsertFormErrorMessage", "");

		var self = this;

		function submitAction(result, msg) {
			var branchesInsertFormMode = "insert";
			if(!t.find("#form-cancel-button")) {
				switch(branchesInsertFormMode) {
					case "insert": {
						$(e.target)[0].reset();
					}; break;

					case "update": {
						var message = msg || "Saved.";
						pageSession.set("branchesInsertFormInfoMessage", message);
					}; break;
				}
			}

			Router.go("branches", mergeObjects(Router.currentRouteParams(), {}));
		}

		function errorAction(msg) {
			msg = msg || "";
			var message = msg.message || msg || "Error.";
			pageSession.set("branchesInsertFormErrorMessage", message);
		}

		validateForm(
			$(e.target),
			function(fieldName, fieldValue) {

			},
			function(msg) {

			},
			function(values) {
				

				Meteor.call("branchesInsert", values, function(e, r) { if(e) errorAction(e); else submitAction(r); });
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

Template.BranchesInsertForm.helpers({
	"infoMessage": function() {
		return pageSession.get("branchesInsertFormInfoMessage");
	},
	"errorMessage": function() {
		return pageSession.get("branchesInsertFormErrorMessage");
	}
	
});
