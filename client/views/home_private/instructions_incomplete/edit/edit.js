var pageSession = new ReactiveDict();

Template.HomePrivateInstructionsIncompleteEdit.onCreated(function() {
	
});

Template.HomePrivateInstructionsIncompleteEdit.onDestroyed(function() {
	
});

Template.HomePrivateInstructionsIncompleteEdit.onRendered(function() {
	
	Meteor.defer(function() {
		globalOnRendered();
		$("input[autofocus]").focus();
	});
});

Template.HomePrivateInstructionsIncompleteEdit.events({
	
	"click #page-close-button": function(e, t) {
		e.preventDefault();
		Router.go("home_private.instructions_incomplete", mergeObjects(Router.currentRouteParams(), {  }));
	},
	"click #page-back-button": function(e, t) {
		e.preventDefault();
		Router.go("home_private.instructions_incomplete", mergeObjects(Router.currentRouteParams(), {  }));
	}
});

Template.HomePrivateInstructionsIncompleteEdit.helpers({
	
});

Template.HomePrivateInstructionsIncompleteEditEditForm.onCreated(function() {
	
});

Template.HomePrivateInstructionsIncompleteEditEditForm.onDestroyed(function() {
	
});

Template.HomePrivateInstructionsIncompleteEditEditForm.onRendered(function() {
	

	pageSession.set("homePrivateInstructionsIncompleteEditEditFormInfoMessage", "");
	pageSession.set("homePrivateInstructionsIncompleteEditEditFormErrorMessage", "");

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

Template.HomePrivateInstructionsIncompleteEditEditForm.events({
	"submit": function(e, t) {
		e.preventDefault();
		pageSession.set("homePrivateInstructionsIncompleteEditEditFormInfoMessage", "");
		pageSession.set("homePrivateInstructionsIncompleteEditEditFormErrorMessage", "");

		var self = this;

		function submitAction(result, msg) {
			var homePrivateInstructionsIncompleteEditEditFormMode = "update";
			if(!t.find("#form-cancel-button")) {
				switch(homePrivateInstructionsIncompleteEditEditFormMode) {
					case "insert": {
						$(e.target)[0].reset();
					}; break;

					case "update": {
						var message = msg || "Saved.";
						pageSession.set("homePrivateInstructionsIncompleteEditEditFormInfoMessage", message);
					}; break;
				}
			}

			Router.go("home_private.instructions_incomplete", mergeObjects(Router.currentRouteParams(), {}));
		}

		function errorAction(msg) {
			msg = msg || "";
			var message = msg.message || msg || "Error.";
			pageSession.set("homePrivateInstructionsIncompleteEditEditFormErrorMessage", message);
		}

		validateForm(
			$(e.target),
			function(fieldName, fieldValue) {

			},
			function(msg) {

			},
			function(values) {
				

				Meteor.call("instructionsUpdate", t.data.instruction._id, values, function(e, r) { if(e) errorAction(e); else submitAction(r); });
			}
		);

		return false;
	},
	"click #form-cancel-button": function(e, t) {
		e.preventDefault();

		

		Router.go("home_private.instructions_incomplete", mergeObjects(Router.currentRouteParams(), {}));
	},
	"click #form-close-button": function(e, t) {
		e.preventDefault();

		Router.go("home_private.instructions_incomplete", mergeObjects(Router.currentRouteParams(), {}));
	},
	"click #form-back-button": function(e, t) {
		e.preventDefault();

		Router.go("home_private.instructions_incomplete", mergeObjects(Router.currentRouteParams(), {}));
	}

	
});

Template.HomePrivateInstructionsIncompleteEditEditForm.helpers({
	"infoMessage": function() {
		return pageSession.get("homePrivateInstructionsIncompleteEditEditFormInfoMessage");
	},
	"errorMessage": function() {
		return pageSession.get("homePrivateInstructionsIncompleteEditEditFormErrorMessage");
	}
	
});
