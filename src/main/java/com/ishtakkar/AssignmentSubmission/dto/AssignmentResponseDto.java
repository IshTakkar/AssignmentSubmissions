package com.ishtakkar.AssignmentSubmission.dto;

import com.ishtakkar.AssignmentSubmission.domain.Assignment;
import com.ishtakkar.AssignmentSubmission.enums.AssignmentEnum;

public class AssignmentResponseDto {
    private Assignment assignment;
    private AssignmentEnum[] assignmentEnum = AssignmentEnum.values();

    public AssignmentResponseDto(Assignment assignment) {
        super();
        this.assignment = assignment;
    }

    public Assignment getAssignment() {
        return assignment;
    }

    public void setAssignment(Assignment assignment) {
        this.assignment = assignment;
    }

    public AssignmentEnum[] getAssignmentEnum() {
        return assignmentEnum;
    }
}
