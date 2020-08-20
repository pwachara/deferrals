Meteor.methods({
  
  updateQSInstructionHistory: function(qsInstructionsId, doc){
    
    var qsInstructionsHistoryData = {};
    
    qsInstructionsHistoryData = doc.data;
    
    console.log(qsInstructionsHistoryData);
    
    //Meteor.call("qsInstructionsHistory", qsInstructionsId, qsInstructionsHistoryData);
    Meteor.call("qsInstructionsHistoryUpdate", qsInstructionsId, qsInstructinsHistoryData);
    
  }
  
});