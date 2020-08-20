this.Instructions = new Mongo.Collection("instructions");

this.Instructions.userCanInsert = function(userId, doc) {
	return Users.isInRoles(userId, ["admin","manager"]);
};

this.Instructions.userCanUpdate = function(userId, doc) {
	return userId && Users.isInRoles(userId, ["admin","manager"]);
};

this.Instructions.userCanRemove = function(userId, doc) {
	return userId && Users.isInRoles(userId, ["admin","manager"]);
};
