var pageSession = new ReactiveDict();

Template.CovidlofsReceivedLofsUpdate.onCreated(function() {
	
});

Template.CovidlofsReceivedLofsUpdate.onDestroyed(function() {
	
});

Template.CovidlofsReceivedLofsUpdate.onRendered(function() {
	
	Meteor.defer(function() {
		globalOnRendered();
		$("input[autofocus]").focus();
	});
});

Template.CovidlofsReceivedLofsUpdate.events({
	
});

Template.CovidlofsReceivedLofsUpdate.helpers({
	
});

Template.CovidlofsReceivedLofsUpdateForm.onCreated(function() {
	
});

Template.CovidlofsReceivedLofsUpdateForm.onDestroyed(function() {
	
});

Template.CovidlofsReceivedLofsUpdateForm.onRendered(function() {
	

	pageSession.set("covidlofsReceivedLofsUpdateFormInfoMessage", "");
	pageSession.set("covidlofsReceivedLofsUpdateFormErrorMessage", "");

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

Template.CovidlofsReceivedLofsUpdateForm.events({
	"submit": function(e, t) {
		e.preventDefault();
		pageSession.set("covidlofsReceivedLofsUpdateFormInfoMessage", "");
		pageSession.set("covidlofsReceivedLofsUpdateFormErrorMessage", "");

		var self = this;

		function submitAction(result, msg) {
			var covidlofsReceivedLofsUpdateFormMode = "update";
			if(!t.find("#form-cancel-button")) {
				switch(covidlofsReceivedLofsUpdateFormMode) {
					case "insert": {
						$(e.target)[0].reset();
					}; break;

					case "update": {
						var message = msg || "Saved.";
						pageSession.set("covidlofsReceivedLofsUpdateFormInfoMessage", message);
					}; break;
				}
			}

			Router.go("covidlofs.received_lofs", mergeObjects(Router.currentRouteParams(), {}));
		}

		function errorAction(msg) {
			msg = msg || "";
			var message = msg.message || msg || "Error.";
			pageSession.set("covidlofsReceivedLofsUpdateFormErrorMessage", message);
		}

		validateForm(
			$(e.target),
			function(fieldName, fieldValue) {

			},
			function(msg) {

			},
			function(values) {
				

				Meteor.call("covidlofsUpdate", t.data.received_lof._id, values, function(e, r) { if(e) errorAction(e); else submitAction(r); });
			}
		);

		return false;
	},
	"click #form-cancel-button": function(e, t) {
		e.preventDefault();

		

		Router.go("covidlofs.received_lofs", mergeObjects(Router.currentRouteParams(), {}));
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

Template.CovidlofsReceivedLofsUpdateForm.helpers({
	"infoMessage": function() {
		return pageSession.get("covidlofsReceivedLofsUpdateFormInfoMessage");
	},
	"errorMessage": function() {
		return pageSession.get("covidlofsReceivedLofsUpdateFormErrorMessage");
	}
	
});
