package com.ishtakkar.AssignmentSubmission.service;

import com.ishtakkar.AssignmentSubmission.domain.Assignment;
import com.ishtakkar.AssignmentSubmission.domain.User;
import com.ishtakkar.AssignmentSubmission.enums.AssignmentStatus;
import com.ishtakkar.AssignmentSubmission.enums.AuthorityEnum;
import com.ishtakkar.AssignmentSubmission.repository.AssignmentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;
import java.util.Set;

@Service
public class AssignmentService {

    @Autowired
    AssignmentRepository assignmentRepo;

    public Assignment save(User user) {
        Assignment assignment = new Assignment();
        assignment.setStatus(AssignmentStatus.PENDING_SUBMISSION.getStatus());
        assignment.setNumber(findNextAssignmentToSubmit(user));
        assignment.setUser(user);

        return assignmentRepo.save(assignment);
    }

    private Long findNextAssignmentToSubmit(User user) {
        Set<Assignment> assignmentsByUser = assignmentRepo.findByUser(user);
        if(assignmentsByUser == null)
            return 1L;
        Optional<Long> nextAssignmentNumOpt = assignmentsByUser.stream()
                .sorted((a1, a2) -> a2.getNumber().compareTo(a1.getNumber()))
                .map(a -> a.getNumber() + 1)
                .findFirst();

        return nextAssignmentNumOpt.orElse(1L);
    }


    public Assignment save(Assignment assignment, User user) {
        boolean userHasCodeReviewerRole = user.getAuthorities().stream()
                .filter(auth -> AuthorityEnum.ROLE_CODE_REVIEWER.name().equals(auth.getAuthority()))
                .count() > 0;
        if(userHasCodeReviewerRole)
            assignment.setCodeReviewer(user);

        return assignmentRepo.save(assignment);
    }

    public Set<Assignment> findByUser(User user) {
        // load assignments for a user of role code reviewer
        boolean userHasCodeReviewerRole = user.getAuthorities().stream()
                .filter(auth -> AuthorityEnum.ROLE_CODE_REVIEWER.name().equals(auth.getAuthority()))
                .count() > 0;

        if(userHasCodeReviewerRole) {
            String status = AssignmentStatus.SUBMITTED.getStatus();
            return assignmentRepo.findByCodeReviewer(status);
        }

        // load assignments for a user of role student
        return assignmentRepo.findByUser(user);
    }

    public Optional<Assignment> findById(Long assignmentId) {
        return assignmentRepo.findById(assignmentId);
    }
}
