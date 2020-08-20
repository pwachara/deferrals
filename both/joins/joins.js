// Lawyers
Lawyers.join(Insurers, "insurerId", "insurer", ["name"]);

// Instructions
Instructions.join(Lawyers, "lawyerId", "lawyer", ["name"]);
Instructions.join(BankingSegment, "banking_segmentId", "banking_segment", []);

// Deferrals
Deferrals.join(BankingSegment, "banking_segmentId", "banking_segment", []);

// Valuers
Valuers.join(Insurers, "insurerId", "insurer", []);

// ValuerInstructions
ValuerInstructions.join(Valuers, "valuerId", "valuer", ["name"]);
ValuerInstructions.join(BankingSegment, "banking_segmentId", "banking_segment", []);

// BranchFacilities
BranchFacilities.join(Branches, "branchId", "branch", []);

// Qs
Qs.join(Insurers, "insurerId", "insurer", []);

// QsInstructions
QsInstructions.join(Qs, "qsId", "qs", []);

// Covidlofs
Covidlofs.join(BankingSegment, "banking_segmentId", "name", []);

