var pageSession = new ReactiveDict();

Template.CovidlofsInsert.onCreated(function() {
	
});

Template.CovidlofsInsert.onDestroyed(function() {
	
});

Template.CovidlofsInsert.onRendered(function() {
	
	Meteor.defer(function() {
		globalOnRendered();
		$("input[autofocus]").focus();
	});
});

Template.CovidlofsInsert.events({
	
});

Template.CovidlofsInsert.helpers({
	
});

Template.CovidlofsInsertForm.onCreated(function() {
	
});

Template.CovidlofsInsertForm.onDestroyed(function() {
	
});

Template.CovidlofsInsertForm.onRendered(function() {
	

	pageSession.set("covidlofsInsertFormInfoMessage", "");
	pageSession.set("covidlofsInsertFormErrorMessage", "");

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

Template.CovidlofsInsertForm.events({
	"submit": function(e, t) {
		e.preventDefault();
		pageSession.set("covidlofsInsertFormInfoMessage", "");
		pageSession.set("covidlofsInsertFormErrorMessage", "");

		var self = this;

		function submitAction(result, msg) {
			var covidlofsInsertFormMode = "insert";
			if(!t.find("#form-cancel-button")) {
				switch(covidlofsInsertFormMode) {
					case "insert": {
						$(e.target)[0].reset();
					}; break;

					case "update": {
						var message = msg || "Saved.";
						pageSession.set("covidlofsInsertFormInfoMessage", message);
					}; break;
				}
			}

			Router.go("covidlofs", mergeObjects(Router.currentRouteParams(), {}));
		}

		function errorAction(msg) {
			msg = msg || "";
			var message = msg.message || msg || "Error.";
			pageSession.set("covidlofsInsertFormErrorMessage", message);
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

		

		Router.go("covidlofs", mergeObjects(Router.currentRouteParams(), {}));
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

Template.CovidlofsInsertForm.helpers({
	"infoMessage": function() {
		return pageSession.get("covidlofsInsertFormInfoMessage");
	},
	"errorMessage": function() {
		return pageSession.get("covidlofsInsertFormErrorMessage");
	}
	
});
