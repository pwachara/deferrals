Meteor.methods({
	"bankingSegmentInsert": function(data) {
		if(!BankingSegment.userCanInsert(this.userId, data)) {
			throw new Meteor.Error(403, "Forbidden.");
		}

		return BankingSegment.insert(data);
	},

	"bankingSegmentUpdate": function(id, data) {
		var doc = BankingSegment.findOne({ _id: id });
		if(!BankingSegment.userCanUpdate(this.userId, doc)) {
			throw new Meteor.Error(403, "Forbidden.");
		}

		BankingSegment.update({ _id: id }, { $set: data });
	},

	"bankingSegmentRemove": function(id) {
		var doc = BankingSegment.findOne({ _id: id });
		if(!BankingSegment.userCanRemove(this.userId, doc)) {
			throw new Meteor.Error(403, "Forbidden.");
		}

		BankingSegment.remove({ _id: id });
	}
});
