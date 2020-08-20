this.Brds = new Mongo.Collection("brds");

this.Brds.userCanInsert = function(userId, doc) {
	return Users.isInRoles(userId, ["crad_user","crad_manager","admin"]);
};

this.Brds.userCanUpdate = function(userId, doc) {
	return userId && Users.isInRoles(userId, ["crad_user","crad_manager","admin"]);
};

this.Brds.userCanRemove = function(userId, doc) {
	return userId && Users.isInRoles(userId, ["crad_user","crad_manager","admin"]);
};
