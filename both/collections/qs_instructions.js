this.QsInstructions = new Mongo.Collection("qs_instructions");

this.QsInstructions.userCanInsert = function(userId, doc) {
	return Users.isInRoles(userId, ["admin","manager","crad_manager"]);
};

this.QsInstructions.userCanUpdate = function(userId, doc) {
	return userId && (doc.createdBy == userId || Users.isInRoles(userId, ["admin","manager","crad_manager"]));
};

this.QsInstructions.userCanRemove = function(userId, doc) {
	return userId && (doc.createdBy == userId || Users.isInRoles(userId, ["admin","manager","crad_manager"]));
};
