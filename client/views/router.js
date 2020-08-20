Router.configure({
	templateNameConverter: "upperCamelCase",
	routeControllerNameConverter: "upperCamelCase",
	layoutTemplate: "layout",
	notFoundTemplate: "notFound",
	loadingTemplate: "loading"
});

Router.publicRoutes = [
	"home_public",
	"login",
	"register",
	"verify_email",
	"forgot_password",
	"reset_password"
];

Router.privateRoutes = [
	"home_private",
	"home_private.instructions_incomplete",
	"home_private.instructions_incomplete.insert",
	"home_private.instructions_incomplete.edit",
	"home_private.instructions_incomplete.details",
	"home_private.instructions_all",
	"home_private.instructions_complete",
	"home_private.lawyers_in_panel",
	"home_private.pending_instructions_with_undertakings",
	"admin",
	"admin.users",
	"admin.users.details",
	"admin.users.insert",
	"admin.users.edit",
	"user_settings",
	"user_settings.profile",
	"user_settings.change_pass",
	"logout",
	"laywers",
	"laywers.insert",
	"laywers.edit",
	"laywers.details",
	"instructions",
	"instructions.insert",
	"instructions.edit",
	"instructions.details",
	"deferrals",
	"deferrals.pending_deferrals",
	"deferrals.pending_deferrals.insert",
	"deferrals.pending_deferrals.edit",
	"deferrals.pending_deferrals.details",
	"deferrals.closed_deferrals",
	"deferrals.closed_deferrals.edit",
	"deferrals.closed_deferrals.details",
	"insurers",
	"insurers.insert",
	"insurers.edit",
	"insurers.details",
	"valuers",
	"valuers.insert",
	"valuers.edit",
	"valuers.details",
	"valuer_instructions",
	"valuer_instructions.valuer_instructions_pending",
	"valuer_instructions.valuer_instructions_pending.insert",
	"valuer_instructions.valuer_instructions_pending.update",
	"valuer_instructions.valuer_instructions_pending.details",
	"valuer_instructions.valuer_instructions_closed",
	"valuer_instructions.valuer_instructions_closed.update",
	"valuer_instructions.valuer_instructions_closed.details",
	"complaints",
	"complaints.complaints_pending",
	"complaints.complaints_pending.insert",
	"complaints.complaints_pending.edit",
	"complaints.complaints_pending.details",
	"complaints.complaints_closed",
	"complaints.complaints_closed.edit",
	"complaints.complaints_closed.details",
	"audit_confirmations",
	"audit_confirmations.audit_confirmations_pending",
	"audit_confirmations.audit_confirmations_pending.insert",
	"audit_confirmations.audit_confirmations_pending.edit",
	"audit_confirmations.audit_confirmations_pending.details",
	"audit_confirmations.audit_confirmations_closed",
	"audit_confirmations.audit_confirmations_closed.edit",
	"audit_confirmations.audit_confirmations_closed.details",
	"brds",
	"brds.brds_pending",
	"brds.brds_pending.insert",
	"brds.brds_pending.edit",
	"brds.brds_pending.details",
	"brds.brds_closed",
	"brds.brds_closed.edit",
	"brds.brds_closed.details",
	"branches",
	"branches.insert",
	"branches.update",
	"branches.details",
	"branch_facilities",
	"branch_facilities.loo_pending",
	"branch_facilities.loo_pending.insert",
	"branch_facilities.loo_pending.update",
	"branch_facilities.loo_pending.details",
	"branch_facilities.loo_received",
	"branch_facilities.loo_received.insert",
	"branch_facilities.loo_received.update",
	"branch_facilities.loo_received.details",
	"branch_facilities.all_branch_facilities",
	"branch_facilities.all_branch_facilities.details",
	"qs",
	"qs.insert",
	"qs.update",
	"qs.details",
	"qs_instructions",
	"qs_instructions.qs_instructions_pending",
	"qs_instructions.qs_instructions_pending.insert",
	"qs_instructions.qs_instructions_pending.update",
	"qs_instructions.qs_instructions_pending.details",
	"qs_instructions.qs_instructions_pending.details.qs_instructions_history",
	"qs_instructions.qs_instructions_pending.details.insert",
	"qs_instructions.qs_instructions_closed",
	"qs_instructions.qs_instructions_closed.update",
	"qs_instructions.qs_instructions_closed.details",
	"lawyer_instructions",
	"lawyer_instructions.lawyer_instructions_pending",
	"lawyer_instructions.lawyer_instructions_pending.insert",
	"lawyer_instructions.lawyer_instructions_pending.update",
	"lawyer_instructions.lawyer_instructions_pending.details",
	"lawyer_instructions.lawyer_instructions_closed",
	"lawyer_instructions.lawyer_instructions_closed.update",
	"lawyer_instructions.lawyer_instructions_closed.details",
	"sow",
	"sow.sow_pending",
	"sow.sow_pending.insert",
	"sow.sow_pending.update",
	"sow.sow_pending.details",
	"sow.sow_closed",
	"sow.sow_closed.update",
	"sow.sow_closed.details",
	"banking_segments",
	"banking_segments.insert",
	"banking_segments.update",
	"banking_segments.details",
	"covidlofs",
	"covidlofs.insert",
	"covidlofs.update",
	"covidlofs.details"
];

Router.freeRoutes = [
	
];

Router.roleMap = [
	{ route: "home_private.instructions_incomplete",	roles: ["admin","manager","user","crad_user","crad_manager"] },
	{ route: "home_private.instructions_incomplete.insert",	roles: ["admin","manager","user","crad_user","crad_manager"] },
	{ route: "home_private.instructions_incomplete.edit",	roles: ["admin","manager","user"] },
	{ route: "home_private.instructions_incomplete.details",	roles: ["admin","manager","user"] },
	{ route: "admin",	roles: ["admin"] },
	{ route: "admin.users",	roles: ["admin"] },
	{ route: "admin.users.details",	roles: ["admin"] },
	{ route: "admin.users.insert",	roles: ["admin"] },
	{ route: "admin.users.edit",	roles: ["admin"] },
	{ route: "laywers",	roles: ["admin","manager"] },
	{ route: "laywers.insert",	roles: ["admin","manager"] },
	{ route: "laywers.edit",	roles: ["admin","manager"] },
	{ route: "laywers.details",	roles: ["admin","manager"] },
	{ route: "instructions",	roles: ["admin","manager"] },
	{ route: "instructions.insert",	roles: ["admin","manager"] },
	{ route: "instructions.edit",	roles: ["admin","manager"] },
	{ route: "instructions.details",	roles: ["admin","manager"] },
	{ route: "deferrals",	roles: ["admin","manager","user","crad_user","crad_manager"] },
	{ route: "deferrals.pending_deferrals",	roles: ["admin","manager","user","crad_user","crad_manager"] },
	{ route: "deferrals.pending_deferrals.insert",	roles: ["admin","manager","crad_manager"] },
	{ route: "deferrals.pending_deferrals.edit",	roles: ["admin","manager","crad_manager"] },
	{ route: "deferrals.pending_deferrals.details",	roles: ["admin","manager","user","crad_user","crad_manager"] },
	{ route: "deferrals.closed_deferrals",	roles: ["admin","manager","user","crad_user","crad_manager"] },
	{ route: "deferrals.closed_deferrals.edit",	roles: ["admin","manager","user","crad_user","crad_manager"] },
	{ route: "deferrals.closed_deferrals.details",	roles: ["admin","manager","user","crad_user","crad_manager"] },
	{ route: "insurers",	roles: ["admin","manager"] },
	{ route: "insurers.insert",	roles: ["admin","manager"] },
	{ route: "insurers.edit",	roles: ["admin","manager"] },
	{ route: "insurers.details",	roles: ["admin","manager"] },
	{ route: "valuers",	roles: ["manager","admin"] },
	{ route: "valuers.insert",	roles: ["admin","manager"] },
	{ route: "valuers.edit",	roles: ["admin","manager"] },
	{ route: "valuers.details",	roles: ["admin","manager","user"] },
	{ route: "valuer_instructions",	roles: ["admin","manager","user"] },
	{ route: "valuer_instructions.valuer_instructions_pending",	roles: ["admin","manager","user"] },
	{ route: "valuer_instructions.valuer_instructions_pending.insert",	roles: ["admin","manager","user"] },
	{ route: "valuer_instructions.valuer_instructions_pending.update",	roles: ["admin","manager","user"] },
	{ route: "valuer_instructions.valuer_instructions_pending.details",	roles: ["admin","manager","user"] },
	{ route: "valuer_instructions.valuer_instructions_closed",	roles: ["admin","manager","user"] },
	{ route: "valuer_instructions.valuer_instructions_closed.update",	roles: ["admin","manager","user"] },
	{ route: "valuer_instructions.valuer_instructions_closed.details",	roles: ["admin","manager","user"] },
	{ route: "complaints",	roles: ["crad_user","crad_manager","admin"] },
	{ route: "complaints.complaints_pending",	roles: ["crad_user","crad_manager","admin"] },
	{ route: "complaints.complaints_pending.insert",	roles: ["crad_user","crad_manager","admin"] },
	{ route: "complaints.complaints_pending.edit",	roles: ["admin","crad_user","crad_manager"] },
	{ route: "complaints.complaints_pending.details",	roles: ["crad_user","crad_manager","admin"] },
	{ route: "complaints.complaints_closed",	roles: ["crad_user","crad_manager","admin"] },
	{ route: "complaints.complaints_closed.edit",	roles: ["crad_manager","admin"] },
	{ route: "complaints.complaints_closed.details",	roles: ["crad_user","crad_manager","admin"] },
	{ route: "audit_confirmations",	roles: ["crad_user","crad_manager","admin"] },
	{ route: "audit_confirmations.audit_confirmations_pending",	roles: ["crad_user","crad_manager","admin"] },
	{ route: "audit_confirmations.audit_confirmations_pending.insert",	roles: ["admin","crad_user","crad_manager"] },
	{ route: "audit_confirmations.audit_confirmations_pending.edit",	roles: ["admin","crad_user","crad_manager"] },
	{ route: "audit_confirmations.audit_confirmations_pending.details",	roles: ["crad_user","crad_manager","admin"] },
	{ route: "audit_confirmations.audit_confirmations_closed",	roles: ["crad_user","crad_manager","admin"] },
	{ route: "audit_confirmations.audit_confirmations_closed.edit",	roles: ["admin","crad_user","crad_manager"] },
	{ route: "audit_confirmations.audit_confirmations_closed.details",	roles: ["crad_user","crad_manager","admin"] },
	{ route: "brds",	roles: ["crad_user","crad_manager","admin"] },
	{ route: "brds.brds_pending",	roles: ["crad_user","crad_manager","admin"] },
	{ route: "brds.brds_pending.insert",	roles: ["crad_user","crad_manager","admin"] },
	{ route: "brds.brds_pending.edit",	roles: ["crad_user","crad_manager","admin"] },
	{ route: "brds.brds_pending.details",	roles: ["crad_user","crad_manager","admin"] },
	{ route: "brds.brds_closed",	roles: ["crad_user","crad_manager","admin"] },
	{ route: "brds.brds_closed.edit",	roles: ["crad_user","crad_manager","admin"] },
	{ route: "brds.brds_closed.details",	roles: ["crad_user","crad_manager","admin"] },
	{ route: "qs_instructions",	roles: ["admin","manager","crad_manager"] },
	{ route: "qs_instructions.qs_instructions_pending",	roles: ["admin","manager","crad_manager"] },
	{ route: "qs_instructions.qs_instructions_pending.insert",	roles: ["admin","manager","crad_manager"] },
	{ route: "qs_instructions.qs_instructions_pending.update",	roles: ["admin","manager","crad_manager"] },
	{ route: "qs_instructions.qs_instructions_pending.details",	roles: ["admin","manager","crad_manager"] },
	{ route: "qs_instructions.qs_instructions_pending.details.qs_instructions_history",	roles: ["admin","manager","crad_manager"] },
	{ route: "qs_instructions.qs_instructions_pending.details.insert",	roles: ["admin","manager","crad_manager"] },
	{ route: "qs_instructions.qs_instructions_closed",	roles: ["admin","manager","crad_manager"] },
	{ route: "qs_instructions.qs_instructions_closed.update",	roles: ["admin","manager","crad_manager"] },
	{ route: "qs_instructions.qs_instructions_closed.details",	roles: ["admin","manager","crad_manager"] },
	{ route: "sow",	roles: ["admin","manager","crad_manager"] },
	{ route: "sow.sow_pending",	roles: ["admin","manager","crad_manager"] },
	{ route: "sow.sow_pending.insert",	roles: ["admin","manager","crad_manager"] },
	{ route: "sow.sow_pending.update",	roles: ["admin","manager","crad_manager"] },
	{ route: "sow.sow_pending.details",	roles: ["admin","manager","crad_manager"] },
	{ route: "sow.sow_closed",	roles: ["admin","manager","crad_manager"] },
	{ route: "sow.sow_closed.update",	roles: ["admin","manager","crad_manager"] },
	{ route: "sow.sow_closed.details",	roles: ["admin","manager","crad_manager"] }
];

Router.defaultFreeRoute = "";
Router.defaultPublicRoute = "home_public";
Router.defaultPrivateRoute = "home_private";

Router.waitOn(function() { 
	Meteor.subscribe("current_user_data");
});

Router.onBeforeAction(function() {
	// add unique class to body element for each route
	if(Router.current()) {
		var currentRouteName = Router.current().route.getName();
		var prevRouteName = Session.get("currentRouteName");
		if(prevRouteName && prevRouteName != currentRouteName) {
			$("body").removeClass("page-" + toKebabCase(prevRouteName));
		}
		Session.set("currentRouteName", currentRouteName);
		$("body").addClass("page-" + toKebabCase(currentRouteName));
	}

	// loading indicator here
	if(!this.ready()) {
		this.render("loading");
		$("body").addClass("wait");
	} else {
		$("body").removeClass("wait");
		this.next();
	}

});

Router.onBeforeAction(Router.ensureNotLogged, {only: Router.publicRoutes});
Router.onBeforeAction(Router.ensureLogged, {only: Router.privateRoutes});
Router.onBeforeAction(Router.ensureGranted, {only: Router.freeRoutes}); // yes, route from free zone can be restricted to specific set of user roles

Router.map(function () {
	
	this.route("/", {name: "home_public", title: "", controller: "HomePublicController"});
	this.route("/login", {name: "login", title: "", controller: "LoginController"});
	this.route("/register", {name: "register", title: "", controller: "RegisterController"});
	this.route("/verify_email/:verifyEmailToken", {name: "verify_email", title: "", controller: "VerifyEmailController"});
	this.route("/forgot_password", {name: "forgot_password", title: "", controller: "ForgotPasswordController"});
	this.route("/reset_password/:resetPasswordToken", {name: "reset_password", title: "", controller: "ResetPasswordController"});
	this.route("/home_private", {name: "home_private", title: "", controller: "HomePrivateController"});
	this.route("/home_private/instructions_incomplete", {name: "home_private.instructions_incomplete", title: "Incomplete Lawyer Instructions", controller: "HomePrivateInstructionsIncompleteController"});
	this.route("/home_private/instructions_incomplete/insert", {name: "home_private.instructions_incomplete.insert", title: "Add new Instruction", controller: "HomePrivateInstructionsIncompleteInsertController"});
	this.route("/home_private/instructions_incomplete/edit/:instructionId", {name: "home_private.instructions_incomplete.edit", title: "Edit Instruction", controller: "HomePrivateInstructionsIncompleteEditController"});
	this.route("/home_private/instructions_incomplete/details/:instructionId", {name: "home_private.instructions_incomplete.details", title: "Instruction Details", controller: "HomePrivateInstructionsIncompleteDetailsController"});
	this.route("/home_private/instructions_all", {name: "home_private.instructions_all", title: "All Lawyer Instructions", controller: "HomePrivateInstructionsAllController"});
	this.route("/home_private/instructions_complete", {name: "home_private.instructions_complete", title: "Complete Lawyer Instructions", controller: "HomePrivateInstructionsCompleteController"});
	this.route("/home_private/lawyers_in_panel", {name: "home_private.lawyers_in_panel", title: "Lawyers in Panel", controller: "HomePrivateLawyersInPanelController"});
	this.route("/home_private/pending_instructions_with_undertakings", {name: "home_private.pending_instructions_with_undertakings", title: "Pending  Undertakings", controller: "HomePrivatePendingInstructionsWithUndertakingsController"});
	this.route("/admin", {name: "admin", title: "", controller: "AdminController"});
	this.route("/admin/users", {name: "admin.users", title: "", controller: "AdminUsersController"});
	this.route("/admin/users/details/:userId", {name: "admin.users.details", title: "", controller: "AdminUsersDetailsController"});
	this.route("/admin/users/insert", {name: "admin.users.insert", title: "", controller: "AdminUsersInsertController"});
	this.route("/admin/users/edit/:userId", {name: "admin.users.edit", title: "", controller: "AdminUsersEditController"});
	this.route("/user_settings", {name: "user_settings", title: "", controller: "UserSettingsController"});
	this.route("/user_settings/profile", {name: "user_settings.profile", title: "", controller: "UserSettingsProfileController"});
	this.route("/user_settings/change_pass", {name: "user_settings.change_pass", title: "", controller: "UserSettingsChangePassController"});
	this.route("/logout", {name: "logout", title: "", controller: "LogoutController"});
	this.route("/laywers", {name: "laywers", title: "Lawyers", controller: "LaywersController"});
	this.route("/laywers/insert", {name: "laywers.insert", title: "Add New Lawyer", controller: "LaywersInsertController"});
	this.route("/laywers/edit/:lawyerId", {name: "laywers.edit", title: "Edit Lawyer", controller: "LaywersEditController"});
	this.route("/laywers/details/:lawyerId", {name: "laywers.details", title: "Details", controller: "LaywersDetailsController"});
	this.route("/instructions", {name: "instructions", title: "Lawyer Instructions", controller: "InstructionsController"});
	this.route("/instructions/insert", {name: "instructions.insert", title: "Add New Instruction", controller: "InstructionsInsertController"});
	this.route("/instructions/edit/:instructionId", {name: "instructions.edit", title: "Edit Instruction", controller: "InstructionsEditController"});
	this.route("/instructions/details/:instructionId", {name: "instructions.details", title: "Instruction Details", controller: "InstructionsDetailsController"});
	this.route("/deferrals", {name: "deferrals", title: "", controller: "DeferralsController"});
	this.route("/deferrals/pending_deferrals", {name: "deferrals.pending_deferrals", title: "", controller: "DeferralsPendingDeferralsController"});
	this.route("/deferrals/pending_deferrals/insert", {name: "deferrals.pending_deferrals.insert", title: "Add New Deferral", controller: "DeferralsPendingDeferralsInsertController"});
	this.route("/deferrals/pending_deferrals/edit/:deferralId", {name: "deferrals.pending_deferrals.edit", title: "Edit Deferral", controller: "DeferralsPendingDeferralsEditController"});
	this.route("/deferrals/pending_deferrals/details/:deferralId", {name: "deferrals.pending_deferrals.details", title: "Deferral Details", controller: "DeferralsPendingDeferralsDetailsController"});
	this.route("/deferrals/closed_deferrals", {name: "deferrals.closed_deferrals", title: "Closed Deferrals", controller: "DeferralsClosedDeferralsController"});
	this.route("/deferrals/closed_deferrals/edit/:deferralId", {name: "deferrals.closed_deferrals.edit", title: "Edit Deferral", controller: "DeferralsClosedDeferralsEditController"});
	this.route("/deferrals/closed_deferrals/details/:deferralId", {name: "deferrals.closed_deferrals.details", title: "Deferral Details", controller: "DeferralsClosedDeferralsDetailsController"});
	this.route("/insurers", {name: "insurers", title: "Insurance Companies", controller: "InsurersController"});
	this.route("/insurers/insert", {name: "insurers.insert", title: "Add New Insurance Company", controller: "InsurersInsertController"});
	this.route("/insurers/edit/:insurerId", {name: "insurers.edit", title: "Edit Insurance Company", controller: "InsurersEditController"});
	this.route("/insurers/details/:insurerId", {name: "insurers.details", title: "Insurer Details", controller: "InsurersDetailsController"});
	this.route("/valuers", {name: "valuers", title: "Valuers", controller: "ValuersController"});
	this.route("/valuers/insert", {name: "valuers.insert", title: "Add New Valuer", controller: "ValuersInsertController"});
	this.route("/valuers/edit/:valuerId", {name: "valuers.edit", title: "Edit Valuer", controller: "ValuersEditController"});
	this.route("/valuers/details/:valuerId", {name: "valuers.details", title: "Valuer Details", controller: "ValuersDetailsController"});
	this.route("/valuer_instructions", {name: "valuer_instructions", title: "", controller: "ValuerInstructionsController"});
	this.route("/valuer_instructions/valuer_instructions_pending", {name: "valuer_instructions.valuer_instructions_pending", title: "", controller: "ValuerInstructionsValuerInstructionsPendingController"});
	this.route("/valuer_instructions/valuer_instructions_pending/insert", {name: "valuer_instructions.valuer_instructions_pending.insert", title: "", controller: "ValuerInstructionsValuerInstructionsPendingInsertController"});
	this.route("/valuer_instructions/valuer_instructions_pending/update/:valuerInstructionsPendingId", {name: "valuer_instructions.valuer_instructions_pending.update", title: "", controller: "ValuerInstructionsValuerInstructionsPendingUpdateController"});
	this.route("/valuer_instructions/valuer_instructions_pending/details/:valuerInstructionsPendingId", {name: "valuer_instructions.valuer_instructions_pending.details", title: "", controller: "ValuerInstructionsValuerInstructionsPendingDetailsController"});
	this.route("/valuer_instructions/valuer_instructions_closed", {name: "valuer_instructions.valuer_instructions_closed", title: "", controller: "ValuerInstructionsValuerInstructionsClosedController"});
	this.route("/valuer_instructions/valuer_instructions_closed/update/:valuerInstructionsClosedId", {name: "valuer_instructions.valuer_instructions_closed.update", title: "", controller: "ValuerInstructionsValuerInstructionsClosedUpdateController"});
	this.route("/valuer_instructions/valuer_instructions_closed/details/:valuerInstructionsClosedId", {name: "valuer_instructions.valuer_instructions_closed.details", title: "", controller: "ValuerInstructionsValuerInstructionsClosedDetailsController"});
	this.route("/complaints", {name: "complaints", title: "", controller: "ComplaintsController"});
	this.route("/complaints/complaints_pending", {name: "complaints.complaints_pending", title: "", controller: "ComplaintsComplaintsPendingController"});
	this.route("/complaints/complaints_pending/insert", {name: "complaints.complaints_pending.insert", title: "", controller: "ComplaintsComplaintsPendingInsertController"});
	this.route("/complaints/complaints_pending/edit/:complaintId", {name: "complaints.complaints_pending.edit", title: "", controller: "ComplaintsComplaintsPendingEditController"});
	this.route("/complaints/complaints_pending/details/:complaintId", {name: "complaints.complaints_pending.details", title: "", controller: "ComplaintsComplaintsPendingDetailsController"});
	this.route("/complaints/complaints_closed", {name: "complaints.complaints_closed", title: "Closed Complaints", controller: "ComplaintsComplaintsClosedController"});
	this.route("/complaints/complaints_closed/edit/:complaintId", {name: "complaints.complaints_closed.edit", title: "Edit Complaint", controller: "ComplaintsComplaintsClosedEditController"});
	this.route("/complaints/complaints_closed/details/:complaintId", {name: "complaints.complaints_closed.details", title: "Complaint Details", controller: "ComplaintsComplaintsClosedDetailsController"});
	this.route("/audit_confirmations", {name: "audit_confirmations", title: "", controller: "AuditConfirmationsController"});
	this.route("/audit_confirmations/audit_confirmations_pending", {name: "audit_confirmations.audit_confirmations_pending", title: "", controller: "AuditConfirmationsAuditConfirmationsPendingController"});
	this.route("/audit_confirmations/audit_confirmations_pending/insert", {name: "audit_confirmations.audit_confirmations_pending.insert", title: "Add New Audit Confirmation", controller: "AuditConfirmationsAuditConfirmationsPendingInsertController"});
	this.route("/audit_confirmations/audit_confirmations_pending/edit/:auditId", {name: "audit_confirmations.audit_confirmations_pending.edit", title: "Edit Audit Confirmation", controller: "AuditConfirmationsAuditConfirmationsPendingEditController"});
	this.route("/audit_confirmations/audit_confirmations_pending/details/:auditId", {name: "audit_confirmations.audit_confirmations_pending.details", title: "Audit Confirmation Details", controller: "AuditConfirmationsAuditConfirmationsPendingDetailsController"});
	this.route("/audit_confirmations/audit_confirmations_closed", {name: "audit_confirmations.audit_confirmations_closed", title: "", controller: "AuditConfirmationsAuditConfirmationsClosedController"});
	this.route("/audit_confirmations/audit_confirmations_closed/edit/:auditId", {name: "audit_confirmations.audit_confirmations_closed.edit", title: "Edit Audit Confirmation", controller: "AuditConfirmationsAuditConfirmationsClosedEditController"});
	this.route("/audit_confirmations/audit_confirmations_closed/details/:auditId", {name: "audit_confirmations.audit_confirmations_closed.details", title: "Audit Confirmation Details", controller: "AuditConfirmationsAuditConfirmationsClosedDetailsController"});
	this.route("/brds", {name: "brds", title: "", controller: "BrdsController"});
	this.route("/brds/brds_pending", {name: "brds.brds_pending", title: "Pending BRDs", controller: "BrdsBrdsPendingController"});
	this.route("/brds/brds_pending/insert", {name: "brds.brds_pending.insert", title: "Add New BRD", controller: "BrdsBrdsPendingInsertController"});
	this.route("/brds/brds_pending/edit/:brdId", {name: "brds.brds_pending.edit", title: "Edit BRD", controller: "BrdsBrdsPendingEditController"});
	this.route("/brds/brds_pending/details/:brdId", {name: "brds.brds_pending.details", title: "Pending BRD Details", controller: "BrdsBrdsPendingDetailsController"});
	this.route("/brds/brds_closed", {name: "brds.brds_closed", title: "Closed BRDs", controller: "BrdsBrdsClosedController"});
	this.route("/brds/brds_closed/edit/:brdId", {name: "brds.brds_closed.edit", title: "Edit Closed BRD", controller: "BrdsBrdsClosedEditController"});
	this.route("/brds/brds_closed/details/:brdId", {name: "brds.brds_closed.details", title: "Closed BRD Details", controller: "BrdsBrdsClosedDetailsController"});
	this.route("/branches", {name: "branches", title: "", controller: "BranchesController"});
	this.route("/branches/insert", {name: "branches.insert", title: "", controller: "BranchesInsertController"});
	this.route("/branches/update/:branchId", {name: "branches.update", title: "", controller: "BranchesUpdateController"});
	this.route("/branches/details/:branchId", {name: "branches.details", title: "", controller: "BranchesDetailsController"});
	this.route("/branch_facilities", {name: "branch_facilities", title: "", controller: "BranchFacilitiesController"});
	this.route("/branch_facilities/loo_pending", {name: "branch_facilities.loo_pending", title: "", controller: "BranchFacilitiesLooPendingController"});
	this.route("/branch_facilities/loo_pending/insert", {name: "branch_facilities.loo_pending.insert", title: "", controller: "BranchFacilitiesLooPendingInsertController"});
	this.route("/branch_facilities/loo_pending/update/:looPendingId", {name: "branch_facilities.loo_pending.update", title: "", controller: "BranchFacilitiesLooPendingUpdateController"});
	this.route("/branch_facilities/loo_pending/details/:looPendingId", {name: "branch_facilities.loo_pending.details", title: "", controller: "BranchFacilitiesLooPendingDetailsController"});
	this.route("/branch_facilities/loo_received", {name: "branch_facilities.loo_received", title: "", controller: "BranchFacilitiesLooReceivedController"});
	this.route("/branch_facilities/loo_received/insert", {name: "branch_facilities.loo_received.insert", title: "", controller: "BranchFacilitiesLooReceivedInsertController"});
	this.route("/branch_facilities/loo_received/update/:looReceivedId", {name: "branch_facilities.loo_received.update", title: "", controller: "BranchFacilitiesLooReceivedUpdateController"});
	this.route("/branch_facilities/loo_received/details/:looReceivedId", {name: "branch_facilities.loo_received.details", title: "", controller: "BranchFacilitiesLooReceivedDetailsController"});
	this.route("/branch_facilities/all_branch_facilities", {name: "branch_facilities.all_branch_facilities", title: "", controller: "BranchFacilitiesAllBranchFacilitiesController"});
	this.route("/branch_facilities/all_branch_facilities/details/:allBranchFacilitiesId", {name: "branch_facilities.all_branch_facilities.details", title: "", controller: "BranchFacilitiesAllBranchFacilitiesDetailsController"});
	this.route("/qs", {name: "qs", title: "", controller: "QsController"});
	this.route("/qs/insert", {name: "qs.insert", title: "", controller: "QsInsertController"});
	this.route("/qs/update/:qsId", {name: "qs.update", title: "", controller: "QsUpdateController"});
	this.route("/qs/details/:qsId", {name: "qs.details", title: "", controller: "QsDetailsController"});
	this.route("/qs_instructions", {name: "qs_instructions", title: "", controller: "QsInstructionsController"});
	this.route("/qs_instructions/qs_instructions_pending", {name: "qs_instructions.qs_instructions_pending", title: "", controller: "QsInstructionsQsInstructionsPendingController"});
	this.route("/qs_instructions/qs_instructions_pending/insert", {name: "qs_instructions.qs_instructions_pending.insert", title: "", controller: "QsInstructionsQsInstructionsPendingInsertController"});
	this.route("/qs_instructions/qs_instructions_pending/update/:qsInstructionsPendingId", {name: "qs_instructions.qs_instructions_pending.update", title: "", controller: "QsInstructionsQsInstructionsPendingUpdateController"});
	this.route("/qs_instructions/qs_instructions_pending/details/:qsInstructionsPendingId", {name: "qs_instructions.qs_instructions_pending.details", title: "", controller: "QsInstructionsQsInstructionsPendingDetailsController"});
	this.route("/qs_instructions/qs_instructions_pending/details/:qsInstructionsPendingId/qs_instructions_history", {name: "qs_instructions.qs_instructions_pending.details.qs_instructions_history", title: "", controller: "QsInstructionsQsInstructionsPendingDetailsQsInstructionsHistoryController"});
	this.route("/qs_instructions/qs_instructions_pending/details/:qsInstructionsPendingId/insert", {name: "qs_instructions.qs_instructions_pending.details.insert", title: "", controller: "QsInstructionsQsInstructionsPendingDetailsInsertController"});
	this.route("/qs_instructions/qs_instructions_closed", {name: "qs_instructions.qs_instructions_closed", title: "", controller: "QsInstructionsQsInstructionsClosedController"});
	this.route("/qs_instructions/qs_instructions_closed/update/:qsInstructionsClosedId", {name: "qs_instructions.qs_instructions_closed.update", title: "", controller: "QsInstructionsQsInstructionsClosedUpdateController"});
	this.route("/qs_instructions/qs_instructions_closed/details/:qsInstructionsClosedId", {name: "qs_instructions.qs_instructions_closed.details", title: "", controller: "QsInstructionsQsInstructionsClosedDetailsController"});
	this.route("/lawyer_instructions", {name: "lawyer_instructions", title: "", controller: "LawyerInstructionsController"});
	this.route("/lawyer_instructions/lawyer_instructions_pending", {name: "lawyer_instructions.lawyer_instructions_pending", title: "", controller: "LawyerInstructionsLawyerInstructionsPendingController"});
	this.route("/lawyer_instructions/lawyer_instructions_pending/insert", {name: "lawyer_instructions.lawyer_instructions_pending.insert", title: "", controller: "LawyerInstructionsLawyerInstructionsPendingInsertController"});
	this.route("/lawyer_instructions/lawyer_instructions_pending/update/:lawyerInstructionsPendingId", {name: "lawyer_instructions.lawyer_instructions_pending.update", title: "", controller: "LawyerInstructionsLawyerInstructionsPendingUpdateController"});
	this.route("/lawyer_instructions/lawyer_instructions_pending/details/:lawyerInstructionsPendingId", {name: "lawyer_instructions.lawyer_instructions_pending.details", title: "", controller: "LawyerInstructionsLawyerInstructionsPendingDetailsController"});
	this.route("/lawyer_instructions/lawyer_instructions_closed", {name: "lawyer_instructions.lawyer_instructions_closed", title: "", controller: "LawyerInstructionsLawyerInstructionsClosedController"});
	this.route("/lawyer_instructions/lawyer_instructions_closed/update/:lawyerInstructionsClosedId", {name: "lawyer_instructions.lawyer_instructions_closed.update", title: "", controller: "LawyerInstructionsLawyerInstructionsClosedUpdateController"});
	this.route("/lawyer_instructions/lawyer_instructions_closed/details/:lawyerInstructionsClosedId", {name: "lawyer_instructions.lawyer_instructions_closed.details", title: "", controller: "LawyerInstructionsLawyerInstructionsClosedDetailsController"});
	this.route("/sow", {name: "sow", title: "", controller: "SowController"});
	this.route("/sow/sow_pending", {name: "sow.sow_pending", title: "", controller: "SowSowPendingController"});
	this.route("/sow/sow_pending/insert", {name: "sow.sow_pending.insert", title: "", controller: "SowSowPendingInsertController"});
	this.route("/sow/sow_pending/update/:sowPendingId", {name: "sow.sow_pending.update", title: "", controller: "SowSowPendingUpdateController"});
	this.route("/sow/sow_pending/details/:sowPendingId", {name: "sow.sow_pending.details", title: "", controller: "SowSowPendingDetailsController"});
	this.route("/sow/sow_closed", {name: "sow.sow_closed", title: "", controller: "SowSowClosedController"});
	this.route("/sow/sow_closed/update/:sowClosedId", {name: "sow.sow_closed.update", title: "", controller: "SowSowClosedUpdateController"});
	this.route("/sow/sow_closed/details/:sowClosedId", {name: "sow.sow_closed.details", title: "", controller: "SowSowClosedDetailsController"});
	this.route("/banking_segments", {name: "banking_segments", title: "", controller: "BankingSegmentsController"});
	this.route("/banking_segments/insert", {name: "banking_segments.insert", title: "", controller: "BankingSegmentsInsertController"});
	this.route("/banking_segments/update/:bankingSegmentId", {name: "banking_segments.update", title: "", controller: "BankingSegmentsUpdateController"});
	this.route("/banking_segments/details/:bankingSegmentId", {name: "banking_segments.details", title: "", controller: "BankingSegmentsDetailsController"});
	this.route("/covidlofs", {name: "covidlofs", title: "", controller: "CovidlofsController"});
	this.route("/covidlofs/insert", {name: "covidlofs.insert", title: "", controller: "CovidlofsInsertController"});
	this.route("/covidlofs/update/:covidlofId", {name: "covidlofs.update", title: "", controller: "CovidlofsUpdateController"});
	this.route("/covidlofs/details/:covidlofId", {name: "covidlofs.details", title: "", controller: "CovidlofsDetailsController"});
});
