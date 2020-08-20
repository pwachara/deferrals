var pageSession = new ReactiveDict();

Template.DeferralsClosedDeferralsEdit.onCreated(function() {
	
});

Template.DeferralsClosedDeferralsEdit.onDestroyed(function() {
	
});

Template.DeferralsClosedDeferralsEdit.onRendered(function() {
	
	Meteor.defer(function() {
		globalOnRendered();
		$("input[autofocus]").focus();
	});
});

Template.DeferralsClosedDeferralsEdit.events({
	
});

Template.DeferralsClosedDeferralsEdit.helpers({
	
});

Template.DeferralsClosedDeferralsEditEditForm.onCreated(function() {
	
});

Template.DeferralsClosedDeferralsEditEditForm.onDestroyed(function() {
	
});

Template.DeferralsClosedDeferralsEditEditForm.onRendered(function() {
	

	pageSession.set("deferralsClosedDeferralsEditEditFormInfoMessage", "");
	pageSession.set("deferralsClosedDeferralsEditEditFormErrorMessage", "");

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

Template.DeferralsClosedDeferralsEditEditForm.events({
	"submit": function(e, t) {
		e.preventDefault();
		pageSession.set("deferralsClosedDeferralsEditEditFormInfoMessage", "");
		pageSession.set("deferralsClosedDeferralsEditEditFormErrorMessage", "");

		var self = this;

		function submitAction(result, msg) {
			var deferralsClosedDeferralsEditEditFormMode = "update";
			if(!t.find("#form-cancel-button")) {
				switch(deferralsClosedDeferralsEditEditFormMode) {
					case "insert": {
						$(e.target)[0].reset();
					}; break;

					case "update": {
						var message = msg || "Saved.";
						pageSession.set("deferralsClosedDeferralsEditEditFormInfoMessage", message);
					}; break;
				}
			}

			Router.go("deferrals.closed_deferrals", mergeObjects(Router.currentRouteParams(), {}));
		}

		function errorAction(msg) {
			msg = msg || "";
			var message = msg.message || msg || "Error.";
			pageSession.set("deferralsClosedDeferralsEditEditFormErrorMessage", message);
		}

		validateForm(
			$(e.target),
			function(fieldName, fieldValue) {

			},
			function(msg) {

			},
			function(values) {
				

				Meteor.call("deferralsUpdate", t.data.deferral._id, values, function(e, r) { if(e) errorAction(e); else submitAction(r); });
			}
		);

		return false;
	},
	"click #form-cancel-button": function(e, t) {
		e.preventDefault();

		

		Router.go("deferrals.closed_deferrals", mergeObjects(Router.currentRouteParams(), {}));
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

Template.DeferralsClosedDeferralsEditEditForm.helpers({
	"infoMessage": function() {
		return pageSession.get("deferralsClosedDeferralsEditEditFormInfoMessage");
	},
	"errorMessage": function() {
		return pageSession.get("deferralsClosedDeferralsEditEditFormErrorMessage");
	}
	
});
