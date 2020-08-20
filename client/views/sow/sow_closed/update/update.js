var pageSession = new ReactiveDict();

Template.SowSowClosedUpdate.onCreated(function() {
	
});

Template.SowSowClosedUpdate.onDestroyed(function() {
	
});

Template.SowSowClosedUpdate.onRendered(function() {
	
	Meteor.defer(function() {
		globalOnRendered();
		$("input[autofocus]").focus();
	});
});

Template.SowSowClosedUpdate.events({
	
});

Template.SowSowClosedUpdate.helpers({
	
});

Template.SowSowClosedUpdateForm.onCreated(function() {
	
});

Template.SowSowClosedUpdateForm.onDestroyed(function() {
	
});

Template.SowSowClosedUpdateForm.onRendered(function() {
	

	pageSession.set("sowSowClosedUpdateFormInfoMessage", "");
	pageSession.set("sowSowClosedUpdateFormErrorMessage", "");

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

Template.SowSowClosedUpdateForm.events({
	"submit": function(e, t) {
		e.preventDefault();
		pageSession.set("sowSowClosedUpdateFormInfoMessage", "");
		pageSession.set("sowSowClosedUpdateFormErrorMessage", "");

		var self = this;

		function submitAction(result, msg) {
			var sowSowClosedUpdateFormMode = "update";
			if(!t.find("#form-cancel-button")) {
				switch(sowSowClosedUpdateFormMode) {
					case "insert": {
						$(e.target)[0].reset();
					}; break;

					case "update": {
						var message = msg || "Saved.";
						pageSession.set("sowSowClosedUpdateFormInfoMessage", message);
					}; break;
				}
			}

			Router.go("sow.sow_closed", mergeObjects(Router.currentRouteParams(), {}));
		}

		function errorAction(msg) {
			msg = msg || "";
			var message = msg.message || msg || "Error.";
			pageSession.set("sowSowClosedUpdateFormErrorMessage", message);
		}

		validateForm(
			$(e.target),
			function(fieldName, fieldValue) {

			},
			function(msg) {

			},
			function(values) {
				

				Meteor.call("sowUpdate", t.data.sow_closed._id, values, function(e, r) { if(e) errorAction(e); else submitAction(r); });
			}
		);

		return false;
	},
	"click #form-cancel-button": function(e, t) {
		e.preventDefault();

		

		Router.go("sow.sow_closed", mergeObjects(Router.currentRouteParams(), {}));
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

Template.SowSowClosedUpdateForm.helpers({
	"infoMessage": function() {
		return pageSession.get("sowSowClosedUpdateFormInfoMessage");
	},
	"errorMessage": function() {
		return pageSession.get("sowSowClosedUpdateFormErrorMessage");
	}
	
});
