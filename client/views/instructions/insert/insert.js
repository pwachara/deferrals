var pageSession = new ReactiveDict();

Template.InstructionsInsert.onCreated(function() {
	
});

Template.InstructionsInsert.onDestroyed(function() {
	
});

Template.InstructionsInsert.onRendered(function() {
	
	Meteor.defer(function() {
		globalOnRendered();
		$("input[autofocus]").focus();
	});
});

Template.InstructionsInsert.events({
	
});

Template.InstructionsInsert.helpers({
	
});

Template.InstructionsInsertInsertForm.onCreated(function() {
	
});

Template.InstructionsInsertInsertForm.onDestroyed(function() {
	
});

Template.InstructionsInsertInsertForm.onRendered(function() {
	

	pageSession.set("instructionsInsertInsertFormInfoMessage", "");
	pageSession.set("instructionsInsertInsertFormErrorMessage", "");

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

Template.InstructionsInsertInsertForm.events({
	"submit": function(e, t) {
		e.preventDefault();
		pageSession.set("instructionsInsertInsertFormInfoMessage", "");
		pageSession.set("instructionsInsertInsertFormErrorMessage", "");

		var self = this;

		function submitAction(result, msg) {
			var instructionsInsertInsertFormMode = "insert";
			if(!t.find("#form-cancel-button")) {
				switch(instructionsInsertInsertFormMode) {
					case "insert": {
						$(e.target)[0].reset();
					}; break;

					case "update": {
						var message = msg || "Saved.";
						pageSession.set("instructionsInsertInsertFormInfoMessage", message);
					}; break;
				}
			}

			Router.go("instructions", mergeObjects(Router.currentRouteParams(), {}));
		}

		function errorAction(msg) {
			msg = msg || "";
			var message = msg.message || msg || "Error.";
			pageSession.set("instructionsInsertInsertFormErrorMessage", message);
		}

		validateForm(
			$(e.target),
			function(fieldName, fieldValue) {

			},
			function(msg) {

			},
			function(values) {
				

				Meteor.call("instructionsInsert", values, function(e, r) { if(e) errorAction(e); else submitAction(r); });
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

Template.InstructionsInsertInsertForm.helpers({
	"infoMessage": function() {
		return pageSession.get("instructionsInsertInsertFormInfoMessage");
	},
	"errorMessage": function() {
		return pageSession.get("instructionsInsertInsertFormErrorMessage");
	}
	
});
