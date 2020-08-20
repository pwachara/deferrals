this.QsInstructionsHistory = new Mongo.Collection("qs_instructions_history");

this.QsInstructionsHistory.userCanInsert = function(userId, doc) {
	return true;
};

this.QsInstructionsHistory.userCanUpdate = function(userId, doc) {
	return true;
};

this.QsInstructionsHistory.userCanRemove = function(userId, doc) {
	return true;
};
