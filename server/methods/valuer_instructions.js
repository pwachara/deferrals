Meteor.methods({
	"valuerInstructionsInsert": function(data) {
		if(!ValuerInstructions.userCanInsert(this.userId, data)) {
			throw new Meteor.Error(403, "Forbidden.");
		}

		return ValuerInstructions.insert(data);
	},

	"valuerInstructionsUpdate": function(id, data) {
		var doc = ValuerInstructions.findOne({ _id: id });
		if(!ValuerInstructions.userCanUpdate(this.userId, doc)) {
			throw new Meteor.Error(403, "Forbidden.");
		}

		ValuerInstructions.update({ _id: id }, { $set: data });
	},

	"valuerInstructionsRemove": function(id) {
		var doc = ValuerInstructions.findOne({ _id: id });
		if(!ValuerInstructions.userCanRemove(this.userId, doc)) {
			throw new Meteor.Error(403, "Forbidden.");
		}

		ValuerInstructions.remove({ _id: id });
	}
});
