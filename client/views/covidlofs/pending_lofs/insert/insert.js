var pageSession = new ReactiveDict();

Template.CovidlofsPendingLofsInsert.onCreated(function() {
	
});

Template.CovidlofsPendingLofsInsert.onDestroyed(function() {
	
});

Template.CovidlofsPendingLofsInsert.onRendered(function() {
	
	Meteor.defer(function() {
		globalOnRendered();
		$("input[autofocus]").focus();
	});
});

Template.CovidlofsPendingLofsInsert.events({
	
});

Template.CovidlofsPendingLofsInsert.helpers({
	
});

Template.CovidlofsPendingLofsInsertForm.onCreated(function() {
	
});

Template.CovidlofsPendingLofsInsertForm.onDestroyed(function() {
	
});

Template.CovidlofsPendingLofsInsertForm.onRendered(function() {
	

	pageSession.set("covidlofsPendingLofsInsertFormInfoMessage", "");
	pageSession.set("covidlofsPendingLofsInsertFormErrorMessage", "");

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

Template.CovidlofsPendingLofsInsertForm.events({
	"submit": function(e, t) {
		e.preventDefault();
		pageSession.set("covidlofsPendingLofsInsertFormInfoMessage", "");
		pageSession.set("covidlofsPendingLofsInsertFormErrorMessage", "");

		var self = this;

		function submitAction(result, msg) {
			var covidlofsPendingLofsInsertFormMode = "insert";
			if(!t.find("#form-cancel-button")) {
				switch(covidlofsPendingLofsInsertFormMode) {
					case "insert": {
						$(e.target)[0].reset();
					}; break;

					case "update": {
						var message = msg || "Saved.";
						pageSession.set("covidlofsPendingLofsInsertFormInfoMessage", message);
					}; break;
				}
			}

			Router.go("covidlofs.pending_lofs", mergeObjects(Router.currentRouteParams(), {}));
		}

		function errorAction(msg) {
			msg = msg || "";
			var message = msg.message || msg || "Error.";
			pageSession.set("covidlofsPendingLofsInsertFormErrorMessage", message);
		}

		validateForm(
			$(e.target),
			function(fieldName, fieldValue) {

			},
			function(msg) {

			},
			function(values) {
				

				Meteor.call("covidlofsInsert", values, function(e, r) { if(e) errorAction(e); else submitAction(r); });
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

Template.CovidlofsPendingLofsInsertForm.helpers({
	"infoMessage": function() {
		return pageSession.get("covidlofsPendingLofsInsertFormInfoMessage");
	},
	"errorMessage": function() {
		return pageSession.get("covidlofsPendingLofsInsertFormErrorMessage");
	}
	
});
