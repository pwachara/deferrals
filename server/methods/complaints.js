Meteor.methods({
	"complaintsInsert": function(data) {
		if(!Complaints.userCanInsert(this.userId, data)) {
			throw new Meteor.Error(403, "Forbidden.");
		}

		return Complaints.insert(data);
	},

	"complaintsUpdate": function(id, data) {
		var doc = Complaints.findOne({ _id: id });
		if(!Complaints.userCanUpdate(this.userId, doc)) {
			throw new Meteor.Error(403, "Forbidden.");
		}

		Complaints.update({ _id: id }, { $set: data });
	},

	"complaintsRemove": function(id) {
		var doc = Complaints.findOne({ _id: id });
		if(!Complaints.userCanRemove(this.userId, doc)) {
			throw new Meteor.Error(403, "Forbidden.");
		}

		Complaints.remove({ _id: id });
	}
});
