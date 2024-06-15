package com.ishtakkar.AssignmentSubmission.dto;

import com.ishtakkar.AssignmentSubmission.domain.Assignment;
import com.ishtakkar.AssignmentSubmission.enums.AssignmentEnum;
import com.ishtakkar.AssignmentSubmission.enums.AssignmentStatus;

public class AssignmentResponseDto {
    private Assignment assignment;
    private AssignmentEnum[] assignmentEnum = AssignmentEnum.values();
    private AssignmentStatus[] assignmentStatuses = AssignmentStatus.values();

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

    public AssignmentStatus[] getAssignmentStatuses() {
        return assignmentStatuses;
    }
}
