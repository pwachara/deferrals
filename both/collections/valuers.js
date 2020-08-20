this.Valuers = new Mongo.Collection("valuers");

this.Valuers.userCanInsert = function(userId, doc) {
	return Users.isInRoles(userId, ["admin","manager"]);
};

this.Valuers.userCanUpdate = function(userId, doc) {
	return userId && Users.isInRoles(userId, ["admin","manager"]);
};

this.Valuers.userCanRemove = function(userId, doc) {
	return userId && Users.isInRoles(userId, ["admin","manager"]);
};
