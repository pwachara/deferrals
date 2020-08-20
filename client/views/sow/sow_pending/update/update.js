var pageSession = new ReactiveDict();

Template.SowSowPendingUpdate.onCreated(function() {
	
});

Template.SowSowPendingUpdate.onDestroyed(function() {
	
});

Template.SowSowPendingUpdate.onRendered(function() {
	
	Meteor.defer(function() {
		globalOnRendered();
		$("input[autofocus]").focus();
	});
});

Template.SowSowPendingUpdate.events({
	
});

Template.SowSowPendingUpdate.helpers({
	
});

Template.SowSowPendingUpdateForm.onCreated(function() {
	
});

Template.SowSowPendingUpdateForm.onDestroyed(function() {
	
});

Template.SowSowPendingUpdateForm.onRendered(function() {
	

	pageSession.set("sowSowPendingUpdateFormInfoMessage", "");
	pageSession.set("sowSowPendingUpdateFormErrorMessage", "");

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

Template.SowSowPendingUpdateForm.events({
	"submit": function(e, t) {
		e.preventDefault();
		pageSession.set("sowSowPendingUpdateFormInfoMessage", "");
		pageSession.set("sowSowPendingUpdateFormErrorMessage", "");

		var self = this;

		function submitAction(result, msg) {
			var sowSowPendingUpdateFormMode = "update";
			if(!t.find("#form-cancel-button")) {
				switch(sowSowPendingUpdateFormMode) {
					case "insert": {
						$(e.target)[0].reset();
					}; break;

					case "update": {
						var message = msg || "Saved.";
						pageSession.set("sowSowPendingUpdateFormInfoMessage", message);
					}; break;
				}
			}

			Router.go("sow.sow_pending", mergeObjects(Router.currentRouteParams(), {}));
		}

		function errorAction(msg) {
			msg = msg || "";
			var message = msg.message || msg || "Error.";
			pageSession.set("sowSowPendingUpdateFormErrorMessage", message);
		}

		validateForm(
			$(e.target),
			function(fieldName, fieldValue) {

			},
			function(msg) {

			},
			function(values) {
				

				Meteor.call("sowUpdate", t.data.sow_pending._id, values, function(e, r) { if(e) errorAction(e); else submitAction(r); });
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

Template.SowSowPendingUpdateForm.helpers({
	"infoMessage": function() {
		return pageSession.get("sowSowPendingUpdateFormInfoMessage");
	},
	"errorMessage": function() {
		return pageSession.get("sowSowPendingUpdateFormErrorMessage");
	}
	
});
