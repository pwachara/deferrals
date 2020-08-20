this.BankingSegment = new Mongo.Collection("banking_segment");

this.BankingSegment.userCanInsert = function(userId, doc) {
	return Users.isInRoles(userId, ["admin","manager","crad_manager"]);
};

this.BankingSegment.userCanUpdate = function(userId, doc) {
	return userId && (doc.createdBy == userId || Users.isInRoles(userId, ["admin","manager","crad_manager"]));
};

this.BankingSegment.userCanRemove = function(userId, doc) {
	return userId && (doc.createdBy == userId || Users.isInRoles(userId, ["admin","manager","crad_manager"]));
};
