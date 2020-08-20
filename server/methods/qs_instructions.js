Meteor.methods({
	"qsInstructionsInsert": function(data) {
		if(!QsInstructions.userCanInsert(this.userId, data)) {
			throw new Meteor.Error(403, "Forbidden.");
		}

		return QsInstructions.insert(data);
	},

	"qsInstructionsUpdate": function(id, data) {
		var doc = QsInstructions.findOne({ _id: id });
		if(!QsInstructions.userCanUpdate(this.userId, doc)) {
			throw new Meteor.Error(403, "Forbidden.");
		}

		QsInstructions.update({ _id: id }, { $set: data });
	},

	"qsInstructionsRemove": function(id) {
		var doc = QsInstructions.findOne({ _id: id });
		if(!QsInstructions.userCanRemove(this.userId, doc)) {
			throw new Meteor.Error(403, "Forbidden.");
		}

		QsInstructions.remove({ _id: id });
	}
});
