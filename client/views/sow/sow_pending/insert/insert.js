var pageSession = new ReactiveDict();

Template.SowSowPendingInsert.onCreated(function() {
	
});

Template.SowSowPendingInsert.onDestroyed(function() {
	
});

Template.SowSowPendingInsert.onRendered(function() {
	
	Meteor.defer(function() {
		globalOnRendered();
		$("input[autofocus]").focus();
	});
});

Template.SowSowPendingInsert.events({
	
});

Template.SowSowPendingInsert.helpers({
	
});

Template.SowSowPendingInsertForm.onCreated(function() {
	
});

Template.SowSowPendingInsertForm.onDestroyed(function() {
	
});

Template.SowSowPendingInsertForm.onRendered(function() {
	

	pageSession.set("sowSowPendingInsertFormInfoMessage", "");
	pageSession.set("sowSowPendingInsertFormErrorMessage", "");

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

Template.SowSowPendingInsertForm.events({
	"submit": function(e, t) {
		e.preventDefault();
		pageSession.set("sowSowPendingInsertFormInfoMessage", "");
		pageSession.set("sowSowPendingInsertFormErrorMessage", "");

		var self = this;

		function submitAction(result, msg) {
			var sowSowPendingInsertFormMode = "insert";
			if(!t.find("#form-cancel-button")) {
				switch(sowSowPendingInsertFormMode) {
					case "insert": {
						$(e.target)[0].reset();
					}; break;

					case "update": {
						var message = msg || "Saved.";
						pageSession.set("sowSowPendingInsertFormInfoMessage", message);
					}; break;
				}
			}

			Router.go("sow.sow_pending", mergeObjects(Router.currentRouteParams(), {}));
		}

		function errorAction(msg) {
			msg = msg || "";
			var message = msg.message || msg || "Error.";
			pageSession.set("sowSowPendingInsertFormErrorMessage", message);
		}

		validateForm(
			$(e.target),
			function(fieldName, fieldValue) {

			},
			function(msg) {

			},
			function(values) {
				

				Meteor.call("sowInsert", values, function(e, r) { if(e) errorAction(e); else submitAction(r); });
			}
		);

		return false;
	},
	"click #form-cancel-button": function(e, t) {
		e.preventDefault();

		

		Router.go("sow.sow_pending", mergeObjects(Router.currentRouteParams(), {}));
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

Template.SowSowPendingInsertForm.helpers({
	"infoMessage": function() {
		return pageSession.get("sowSowPendingInsertFormInfoMessage");
	},
	"errorMessage": function() {
		return pageSession.get("sowSowPendingInsertFormErrorMessage");
	}
	
});
