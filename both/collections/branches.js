this.Branches = new Mongo.Collection("branches");

this.Branches.userCanInsert = function(userId, doc) {
	return Users.isInRoles(userId, ["manager","admin","crad_manager"]);
};

this.Branches.userCanUpdate = function(userId, doc) {
	return userId && Users.isInRoles(userId, ["admin","manager","crad_manager"]);
};

this.Branches.userCanRemove = function(userId, doc) {
	return userId && Users.isInRoles(userId, ["admin","manager","crad_manager"]);
};
