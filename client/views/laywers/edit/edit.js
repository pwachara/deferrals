var pageSession = new ReactiveDict();

Template.LaywersEdit.onCreated(function() {
	
});

Template.LaywersEdit.onDestroyed(function() {
	
});

Template.LaywersEdit.onRendered(function() {
	
	Meteor.defer(function() {
		globalOnRendered();
		$("input[autofocus]").focus();
	});
});

Template.LaywersEdit.events({
	
});

Template.LaywersEdit.helpers({
	
});

Template.LaywersEditEditForm.onCreated(function() {
	
});

Template.LaywersEditEditForm.onDestroyed(function() {
	
});

Template.LaywersEditEditForm.onRendered(function() {
	

	pageSession.set("laywersEditEditFormInfoMessage", "");
	pageSession.set("laywersEditEditFormErrorMessage", "");

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

Template.LaywersEditEditForm.events({
	"submit": function(e, t) {
		e.preventDefault();
		pageSession.set("laywersEditEditFormInfoMessage", "");
		pageSession.set("laywersEditEditFormErrorMessage", "");

		var self = this;

		function submitAction(result, msg) {
			var laywersEditEditFormMode = "update";
			if(!t.find("#form-cancel-button")) {
				switch(laywersEditEditFormMode) {
					case "insert": {
						$(e.target)[0].reset();
					}; break;

					case "update": {
						var message = msg || "Saved.";
						pageSession.set("laywersEditEditFormInfoMessage", message);
					}; break;
				}
			}

			Router.go("laywers", mergeObjects(Router.currentRouteParams(), {}));
		}

		function errorAction(msg) {
			msg = msg || "";
			var message = msg.message || msg || "Error.";
			pageSession.set("laywersEditEditFormErrorMessage", message);
		}

		validateForm(
			$(e.target),
			function(fieldName, fieldValue) {

			},
			function(msg) {

			},
			function(values) {
				

				Meteor.call("lawyersUpdate", t.data.lawyer._id, values, function(e, r) { if(e) errorAction(e); else submitAction(r); });
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

Template.LaywersEditEditForm.helpers({
	"infoMessage": function() {
		return pageSession.get("laywersEditEditFormInfoMessage");
	},
	"errorMessage": function() {
		return pageSession.get("laywersEditEditFormErrorMessage");
	}
	
});
