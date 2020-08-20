var pageSession = new ReactiveDict();

Template.InstructionsEdit.onCreated(function() {
	
});

Template.InstructionsEdit.onDestroyed(function() {
	
});

Template.InstructionsEdit.onRendered(function() {
	
	Meteor.defer(function() {
		globalOnRendered();
		$("input[autofocus]").focus();
	});
});

Template.InstructionsEdit.events({
	
});

Template.InstructionsEdit.helpers({
	
});

Template.InstructionsEditEditForm.onCreated(function() {
	
});

Template.InstructionsEditEditForm.onDestroyed(function() {
	
});

Template.InstructionsEditEditForm.onRendered(function() {
	

	pageSession.set("instructionsEditEditFormInfoMessage", "");
	pageSession.set("instructionsEditEditFormErrorMessage", "");

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

Template.InstructionsEditEditForm.events({
	"submit": function(e, t) {
		e.preventDefault();
		pageSession.set("instructionsEditEditFormInfoMessage", "");
		pageSession.set("instructionsEditEditFormErrorMessage", "");

		var self = this;

		function submitAction(result, msg) {
			var instructionsEditEditFormMode = "update";
			if(!t.find("#form-cancel-button")) {
				switch(instructionsEditEditFormMode) {
					case "insert": {
						$(e.target)[0].reset();
					}; break;

					case "update": {
						var message = msg || "Saved.";
						pageSession.set("instructionsEditEditFormInfoMessage", message);
					}; break;
				}
			}

			Router.go("instructions", mergeObjects(Router.currentRouteParams(), {}));
		}

		function errorAction(msg) {
			msg = msg || "";
			var message = msg.message || msg || "Error.";
			pageSession.set("instructionsEditEditFormErrorMessage", message);
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

		

		Router.go("instructions", mergeObjects(Router.currentRouteParams(), {}));
	},
	"click #form-close-button": function(e, t) {
		e.preventDefault();

		/*CLOSE_REDIRECT*/
	},
	"click #form-back-button": function(e, t) {
		e.preventDefault();

		Router.go("instructions", mergeObjects(Router.currentRouteParams(), {}));
	}

	
});

Template.InstructionsEditEditForm.helpers({
	"infoMessage": function() {
		return pageSession.get("instructionsEditEditFormInfoMessage");
	},
	"errorMessage": function() {
		return pageSession.get("instructionsEditEditFormErrorMessage");
	}
	
});
