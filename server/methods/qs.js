Meteor.methods({
	"qsInsert": function(data) {
		if(!Qs.userCanInsert(this.userId, data)) {
			throw new Meteor.Error(403, "Forbidden.");
		}

		return Qs.insert(data);
	},

	"qsUpdate": function(id, data) {
		var doc = Qs.findOne({ _id: id });
		if(!Qs.userCanUpdate(this.userId, doc)) {
			throw new Meteor.Error(403, "Forbidden.");
		}

		Qs.update({ _id: id }, { $set: data });
	},

	"qsRemove": function(id) {
		var doc = Qs.findOne({ _id: id });
		if(!Qs.userCanRemove(this.userId, doc)) {
			throw new Meteor.Error(403, "Forbidden.");
		}

		Qs.remove({ _id: id });
	}
});
