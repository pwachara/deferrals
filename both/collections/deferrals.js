this.Deferrals = new Mongo.Collection("deferrals");

this.Deferrals.userCanInsert = function(userId, doc) {
	return Users.isInRoles(userId, ["admin","manager","crad_manager"]);
};

this.Deferrals.userCanUpdate = function(userId, doc) {
	return userId && Users.isInRoles(userId, ["admin","manager","crad_manager"]);
};

this.Deferrals.userCanRemove = function(userId, doc) {
	return userId && Users.isInRoles(userId, ["admin","manager","crad_manager"]);
};
