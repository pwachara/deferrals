this.BranchFacilities = new Mongo.Collection("branch_facilities");

this.BranchFacilities.userCanInsert = function(userId, doc) {
	return Users.isInRoles(userId, ["admin","manager","crad_manager"]);
};

this.BranchFacilities.userCanUpdate = function(userId, doc) {
	return userId && Users.isInRoles(userId, ["admin","manager","crad_manager"]);
};

this.BranchFacilities.userCanRemove = function(userId, doc) {
	return userId && Users.isInRoles(userId, ["admin","manager","crad_manager"]);
};
