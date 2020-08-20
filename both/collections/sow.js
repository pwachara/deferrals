this.Sow = new Mongo.Collection("sow");

this.Sow.userCanInsert = function(userId, doc) {
	return true;
};

this.Sow.userCanUpdate = function(userId, doc) {
	return true;
};

this.Sow.userCanRemove = function(userId, doc) {
	return true;
};
