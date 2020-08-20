this.Insurers = new Mongo.Collection("insurers");

this.Insurers.userCanInsert = function(userId, doc) {
	return Users.isInRoles(userId, ["admin","manager"]);
};

this.Insurers.userCanUpdate = function(userId, doc) {
	return userId && Users.isInRoles(userId, ["admin","manager"]);
};

this.Insurers.userCanRemove = function(userId, doc) {
	return userId && Users.isInRoles(userId, ["admin","manager"]);
};
