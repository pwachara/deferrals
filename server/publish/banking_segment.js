Meteor.publish("banking_segment_list", function() {
	if(Users.isInRoles(this.userId, ["admin","manager","crad_user","crad_manager","user"])) {
		return BankingSegment.find({}, {sort:{name:1}});
	}
	return BankingSegment.find({createdBy:this.userId}, {sort:{name:1}});
});

Meteor.publish("banking_segments_null", function() {
	if(Users.isInRoles(this.userId, ["admin","manager","crad_user","crad_manager","user"])) {
		return BankingSegment.find({_id:null}, {});
	}
	return BankingSegment.find({_id:null,createdBy:this.userId}, {});
});

Meteor.publish("banking_segment", function(bankingSegmentId) {
	if(Users.isInRoles(this.userId, ["admin","manager","crad_user","crad_manager","user"])) {
		return BankingSegment.find({_id:bankingSegmentId}, {});
	}
	return BankingSegment.find({_id:bankingSegmentId,createdBy:this.userId}, {});
});

Meteor.publish("banking_segment_list_paged", function(extraOptions) {
	extraOptions.doSkip = true;
	if(Users.isInRoles(this.userId, ["admin","manager","crad_user","crad_manager","user"])) {
		return BankingSegment.find(databaseUtils.extendFilter({}, extraOptions), databaseUtils.extendOptions({sort:{name:1}}, extraOptions));
	}
	return BankingSegment.find(databaseUtils.extendFilter({createdBy:this.userId}, extraOptions), databaseUtils.extendOptions({sort:{name:1}}, extraOptions));
});

Meteor.publish("banking_segment_list_paged_count", function(extraOptions) {
	Counts.publish(this, "banking_segment_list_paged_count", BankingSegment.find(databaseUtils.extendFilter({createdBy:this.userId}, extraOptions), { fields: { _id: 1 } }));
});

Meteor.methods({
	"bankingSegmentListPagedExport": function(extraOptions, exportFields, fileType) {
		extraOptions.noPaging = true;
		if(Users.isInRoles(this.userId, ["admin","manager","crad_user","crad_manager","user"])) {
			var data = BankingSegment.find(databaseUtils.extendFilter({}, extraOptions), databaseUtils.extendOptions({sort:{name:1}}, extraOptions)).fetch();
			return objectUtils.exportArrayOfObjects(data, exportFields, fileType);
		}
		var data = BankingSegment.find(databaseUtils.extendFilter({createdBy:this.userId}, extraOptions), databaseUtils.extendOptions({sort:{name:1}}, extraOptions)).fetch();
		return objectUtils.exportArrayOfObjects(data, exportFields, fileType);
	}
});

