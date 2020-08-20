Meteor.publish("brds_empty", function() {
	if(Users.isInRoles(this.userId, ["crad_user","crad_manager","manager","admin"])) {
		return Brds.find({_id:null}, {});
	}
	return this.ready();
});

Meteor.publish("brd", function(brdId) {
	if(Users.isInRoles(this.userId, ["crad_user","crad_manager","manager","admin"])) {
		return Brds.find({_id:brdId}, {});
	}
	return this.ready();
});

Meteor.publish("brds_pending", function() {
	if(Users.isInRoles(this.userId, ["crad_user","crad_manager","manager","admin"])) {
		return Brds.find({status:"pending"}, {sort:{date_raised:1}});
	}
	return this.ready();
});

Meteor.publish("brds_closed", function() {
	if(Users.isInRoles(this.userId, ["crad_user","crad_manager","manager","admin"])) {
		return Brds.find({status:"closed"}, {sort:{date_raised:1}});
	}
	return this.ready();
});

Meteor.publish("brds_pending_paged", function(extraOptions) {
	extraOptions.doSkip = true;
	if(Users.isInRoles(this.userId, ["crad_user","crad_manager","manager","admin"])) {
		return Brds.find(databaseUtils.extendFilter({status:"pending"}, extraOptions), databaseUtils.extendOptions({sort:{date_raised:1}}, extraOptions));
	}
	return this.ready();
});

Meteor.publish("brds_pending_paged_count", function(extraOptions) {
	Counts.publish(this, "brds_pending_paged_count", Brds.find(databaseUtils.extendFilter({status:"pending"}, extraOptions), { fields: { _id: 1 } }));
});

Meteor.methods({
	"brdsPendingPagedExport": function(extraOptions, exportFields, fileType) {
		extraOptions.noPaging = true;
		if(Users.isInRoles(this.userId, ["crad_user","crad_manager","manager","admin"])) {
			var data = Brds.find(databaseUtils.extendFilter({status:"pending"}, extraOptions), databaseUtils.extendOptions({sort:{date_raised:1}}, extraOptions)).fetch();
			return objectUtils.exportArrayOfObjects(data, exportFields, fileType);
		}
	}
});

Meteor.publish("brds_closed_paged", function(extraOptions) {
	extraOptions.doSkip = true;
	if(Users.isInRoles(this.userId, ["crad_user","crad_manager","manager","admin"])) {
		return Brds.find(databaseUtils.extendFilter({status:"closed"}, extraOptions), databaseUtils.extendOptions({sort:{date_raised:1}}, extraOptions));
	}
	return this.ready();
});

Meteor.publish("brds_closed_paged_count", function(extraOptions) {
	Counts.publish(this, "brds_closed_paged_count", Brds.find(databaseUtils.extendFilter({status:"closed"}, extraOptions), { fields: { _id: 1 } }));
});

Meteor.methods({
	"brdsClosedPagedExport": function(extraOptions, exportFields, fileType) {
		extraOptions.noPaging = true;
		if(Users.isInRoles(this.userId, ["crad_user","crad_manager","manager","admin"])) {
			var data = Brds.find(databaseUtils.extendFilter({status:"closed"}, extraOptions), databaseUtils.extendOptions({sort:{date_raised:1}}, extraOptions)).fetch();
			return objectUtils.exportArrayOfObjects(data, exportFields, fileType);
		}
	}
});

