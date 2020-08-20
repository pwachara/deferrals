var pageSession = new ReactiveDict();

Template.LaywersInsert.onCreated(function() {
	
});

Template.LaywersInsert.onDestroyed(function() {
	
});

Template.LaywersInsert.onRendered(function() {
	
	Meteor.defer(function() {
		globalOnRendered();
		$("input[autofocus]").focus();
	});
});

Template.LaywersInsert.events({
	
});

Template.LaywersInsert.helpers({
	
});

Template.LaywersInsertInsertForm.onCreated(function() {
	
});

Template.LaywersInsertInsertForm.onDestroyed(function() {
	
});

Template.LaywersInsertInsertForm.onRendered(function() {
	

	pageSession.set("laywersInsertInsertFormInfoMessage", "");
	pageSession.set("laywersInsertInsertFormErrorMessage", "");

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

Template.LaywersInsertInsertForm.events({
	"submit": function(e, t) {
		e.preventDefault();
		pageSession.set("laywersInsertInsertFormInfoMessage", "");
		pageSession.set("laywersInsertInsertFormErrorMessage", "");

		var self = this;

		function submitAction(result, msg) {
			var laywersInsertInsertFormMode = "insert";
			if(!t.find("#form-cancel-button")) {
				switch(laywersInsertInsertFormMode) {
					case "insert": {
						$(e.target)[0].reset();
					}; break;

					case "update": {
						var message = msg || "Saved.";
						pageSession.set("laywersInsertInsertFormInfoMessage", message);
					}; break;
				}
			}

			Router.go("laywers", mergeObjects(Router.currentRouteParams(), {}));
		}

		function errorAction(msg) {
			msg = msg || "";
			var message = msg.message || msg || "Error.";
			pageSession.set("laywersInsertInsertFormErrorMessage", message);
		}

		validateForm(
			$(e.target),
			function(fieldName, fieldValue) {

			},
			function(msg) {

			},
			function(values) {
				

				Meteor.call("lawyersInsert", values, function(e, r) { if(e) errorAction(e); else submitAction(r); });
			}
		);

		return false;
	},
	"click #form-cancel-button": function(e, t) {
		e.preventDefault();

		

		Router.go("laywers", mergeObjects(Router.currentRouteParams(), {}));
	},
	"click #form-close-button": function(e, t) {
		e.preventDefault();

		/*CLOSE_REDIRECT*/
	},
	"click #form-back-button": function(e, t) {
		e.preventDefault();

		Router.go("laywers", mergeObjects(Router.currentRouteParams(), {}));
	}

	
});

Template.LaywersInsertInsertForm.helpers({
	"infoMessage": function() {
		return pageSession.get("laywersInsertInsertFormInfoMessage");
	},
	"errorMessage": function() {
		return pageSession.get("laywersInsertInsertFormErrorMessage");
	}
	
});
