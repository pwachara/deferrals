var pageSession = new ReactiveDict();

Template.CovidlofsReceivedLofsInsert.onCreated(function() {
	
});

Template.CovidlofsReceivedLofsInsert.onDestroyed(function() {
	
});

Template.CovidlofsReceivedLofsInsert.onRendered(function() {
	
	Meteor.defer(function() {
		globalOnRendered();
		$("input[autofocus]").focus();
	});
});

Template.CovidlofsReceivedLofsInsert.events({
	
});

Template.CovidlofsReceivedLofsInsert.helpers({
	
});

Template.CovidlofsReceivedLofsInsertForm.onCreated(function() {
	
});

Template.CovidlofsReceivedLofsInsertForm.onDestroyed(function() {
	
});

Template.CovidlofsReceivedLofsInsertForm.onRendered(function() {
	

	pageSession.set("covidlofsReceivedLofsInsertFormInfoMessage", "");
	pageSession.set("covidlofsReceivedLofsInsertFormErrorMessage", "");

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

Template.CovidlofsReceivedLofsInsertForm.events({
	"submit": function(e, t) {
		e.preventDefault();
		pageSession.set("covidlofsReceivedLofsInsertFormInfoMessage", "");
		pageSession.set("covidlofsReceivedLofsInsertFormErrorMessage", "");

		var self = this;

		function submitAction(result, msg) {
			var covidlofsReceivedLofsInsertFormMode = "insert";
			if(!t.find("#form-cancel-button")) {
				switch(covidlofsReceivedLofsInsertFormMode) {
					case "insert": {
						$(e.target)[0].reset();
					}; break;

					case "update": {
						var message = msg || "Saved.";
						pageSession.set("covidlofsReceivedLofsInsertFormInfoMessage", message);
					}; break;
				}
			}

			Router.go("covidlofs.received_lofs", mergeObjects(Router.currentRouteParams(), {}));
		}

		function errorAction(msg) {
			msg = msg || "";
			var message = msg.message || msg || "Error.";
			pageSession.set("covidlofsReceivedLofsInsertFormErrorMessage", message);
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

Template.CovidlofsReceivedLofsInsertForm.helpers({
	"infoMessage": function() {
		return pageSession.get("covidlofsReceivedLofsInsertFormInfoMessage");
	},
	"errorMessage": function() {
		return pageSession.get("covidlofsReceivedLofsInsertFormErrorMessage");
	}
	
});
