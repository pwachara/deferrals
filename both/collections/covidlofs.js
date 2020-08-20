this.Covidlofs = new Mongo.Collection("covidlofs");

this.Covidlofs.userCanInsert = function(userId, doc) {
	return Users.isInRoles(userId, ["admin","manager","crad_user","crad_manager"]);
};

this.Covidlofs.userCanUpdate = function(userId, doc) {
	return userId && (doc.createdBy == userId || Users.isInRoles(userId, ["admin","manager","crad_user","crad_manager"]));
};

this.Covidlofs.userCanRemove = function(userId, doc) {
	return userId && (doc.createdBy == userId || Users.isInRoles(userId, ["admin","manager","crad_user","crad_manager"]));
};
