Meteor.methods({
	"lawyersInsert": function(data) {
		if(!Lawyers.userCanInsert(this.userId, data)) {
			throw new Meteor.Error(403, "Forbidden.");
		}

		return Lawyers.insert(data);
	},

	"lawyersUpdate": function(id, data) {
		var doc = Lawyers.findOne({ _id: id });
		if(!Lawyers.userCanUpdate(this.userId, doc)) {
			throw new Meteor.Error(403, "Forbidden.");
		}

		Lawyers.update({ _id: id }, { $set: data });
	},

	"lawyersRemove": function(id) {
		var doc = Lawyers.findOne({ _id: id });
		if(!Lawyers.userCanRemove(this.userId, doc)) {
			throw new Meteor.Error(403, "Forbidden.");
		}

		Lawyers.remove({ _id: id });
	}
});
