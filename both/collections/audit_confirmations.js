this.AuditConfirmations = new Mongo.Collection("audit_confirmations");

this.AuditConfirmations.userCanInsert = function(userId, doc) {
	return Users.isInRoles(userId, ["admin","crad_user","crad_manager"]);
};

this.AuditConfirmations.userCanUpdate = function(userId, doc) {
	return userId && Users.isInRoles(userId, ["admin","crad_user","crad_manager"]);
};

this.AuditConfirmations.userCanRemove = function(userId, doc) {
	return userId && Users.isInRoles(userId, ["admin","crad_user","crad_manager"]);
};
