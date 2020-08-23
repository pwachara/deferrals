var pageSession = new ReactiveDict();

Template.CovidlofsPendingLofsUpdate.onCreated(function() {
	
});

Template.CovidlofsPendingLofsUpdate.onDestroyed(function() {
	
});

Template.CovidlofsPendingLofsUpdate.onRendered(function() {
	
	Meteor.defer(function() {
		globalOnRendered();
		$("input[autofocus]").focus();
	});
});

Template.CovidlofsPendingLofsUpdate.events({
	
});

Template.CovidlofsPendingLofsUpdate.helpers({
	
});

Template.CovidlofsPendingLofsUpdateForm.onCreated(function() {
	
});

Template.CovidlofsPendingLofsUpdateForm.onDestroyed(function() {
	
});

Template.CovidlofsPendingLofsUpdateForm.onRendered(function() {
	

	pageSession.set("covidlofsPendingLofsUpdateFormInfoMessage", "");
	pageSession.set("covidlofsPendingLofsUpdateFormErrorMessage", "");

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

Template.CovidlofsPendingLofsUpdateForm.events({
	"submit": function(e, t) {
		e.preventDefault();
		pageSession.set("covidlofsPendingLofsUpdateFormInfoMessage", "");
		pageSession.set("covidlofsPendingLofsUpdateFormErrorMessage", "");

		var self = this;

		function submitAction(result, msg) {
			var covidlofsPendingLofsUpdateFormMode = "update";
			if(!t.find("#form-cancel-button")) {
				switch(covidlofsPendingLofsUpdateFormMode) {
					case "insert": {
						$(e.target)[0].reset();
					}; break;

					case "update": {
						var message = msg || "Saved.";
						pageSession.set("covidlofsPendingLofsUpdateFormInfoMessage", message);
					}; break;
				}
			}

			Router.go("covidlofs.pending_lofs", mergeObjects(Router.currentRouteParams(), {}));
		}

		function errorAction(msg) {
			msg = msg || "";
			var message = msg.message || msg || "Error.";
			pageSession.set("covidlofsPendingLofsUpdateFormErrorMessage", message);
		}

		validateForm(
			$(e.target),
			function(fieldName, fieldValue) {

			},
			function(msg) {

			},
			function(values) {
				

				Meteor.call("covidlofsUpdate", t.data.pending_lof._id, values, function(e, r) { if(e) errorAction(e); else submitAction(r); });
			}
		);

		return false;
	},
	"click #form-cancel-button": function(e, t) {
		e.preventDefault();

		

		Router.go("covidlofs.pending_lofs", mergeObjects(Router.currentRouteParams(), {}));
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

Template.CovidlofsPendingLofsUpdateForm.helpers({
	"infoMessage": function() {
		return pageSession.get("covidlofsPendingLofsUpdateFormInfoMessage");
	},
	"errorMessage": function() {
		return pageSession.get("covidlofsPendingLofsUpdateFormErrorMessage");
	}
	
});
