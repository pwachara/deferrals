this.Qs = new Mongo.Collection("qs");

this.Qs.userCanInsert = function(userId, doc) {
	return Users.isInRoles(userId, ["admin","manager","crad_manager"]);
};

this.Qs.userCanUpdate = function(userId, doc) {
	return userId && (doc.createdBy == userId || Users.isInRoles(userId, ["admin","manager","crad_manager"]));
};

this.Qs.userCanRemove = function(userId, doc) {
	return userId && (doc.createdBy == userId || Users.isInRoles(userId, ["admin","manager","crad_manager"]));
};
