this.Lawyers = new Mongo.Collection("lawyers");

this.Lawyers.userCanInsert = function(userId, doc) {
	return Users.isInRoles(userId, ["admin","manager"]);
};

this.Lawyers.userCanUpdate = function(userId, doc) {
	return userId && Users.isInRoles(userId, ["admin","manager"]);
};

this.Lawyers.userCanRemove = function(userId, doc) {
	return userId && Users.isInRoles(userId, ["admin","manager"]);
};
