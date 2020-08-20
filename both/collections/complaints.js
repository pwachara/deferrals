this.Complaints = new Mongo.Collection("complaints");

this.Complaints.userCanInsert = function(userId, doc) {
	return Users.isInRoles(userId, ["admin","crad_manager"]);
};

this.Complaints.userCanUpdate = function(userId, doc) {
	return userId && Users.isInRoles(userId, ["admin","crad_manager"]);
};

this.Complaints.userCanRemove = function(userId, doc) {
	return userId && Users.isInRoles(userId, ["admin","crad_manager"]);
};
