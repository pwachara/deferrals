Meteor.methods({
	"qsInstructionsHistoryInsert": function(data) {
		if(!QsInstructionsHistory.userCanInsert(this.userId, data)) {
			throw new Meteor.Error(403, "Forbidden.");
		}

		return QsInstructionsHistory.insert(data);
	},

	"qsInstructionsHistoryUpdate": function(id, data) {
		var doc = QsInstructionsHistory.findOne({ _id: id });
		if(!QsInstructionsHistory.userCanUpdate(this.userId, doc)) {
			throw new Meteor.Error(403, "Forbidden.");
		}

		QsInstructionsHistory.update({ _id: id }, { $set: data });
	},

	"qsInstructionsHistoryRemove": function(id) {
		var doc = QsInstructionsHistory.findOne({ _id: id });
		if(!QsInstructionsHistory.userCanRemove(this.userId, doc)) {
			throw new Meteor.Error(403, "Forbidden.");
		}

		QsInstructionsHistory.remove({ _id: id });
	}
});
