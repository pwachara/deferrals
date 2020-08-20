Meteor.methods({
	"insurersInsert": function(data) {
		if(!Insurers.userCanInsert(this.userId, data)) {
			throw new Meteor.Error(403, "Forbidden.");
		}

		return Insurers.insert(data);
	},

	"insurersUpdate": function(id, data) {
		var doc = Insurers.findOne({ _id: id });
		if(!Insurers.userCanUpdate(this.userId, doc)) {
			throw new Meteor.Error(403, "Forbidden.");
		}

		Insurers.update({ _id: id }, { $set: data });
	},

	"insurersRemove": function(id) {
		var doc = Insurers.findOne({ _id: id });
		if(!Insurers.userCanRemove(this.userId, doc)) {
			throw new Meteor.Error(403, "Forbidden.");
		}

		Insurers.remove({ _id: id });
	}
});
