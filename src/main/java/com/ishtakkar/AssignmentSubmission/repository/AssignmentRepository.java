package com.ishtakkar.AssignmentSubmission.repository;

import com.ishtakkar.AssignmentSubmission.domain.Assignment;
import com.ishtakkar.AssignmentSubmission.domain.User;
import com.ishtakkar.AssignmentSubmission.enums.AssignmentEnum;
import com.ishtakkar.AssignmentSubmission.enums.AssignmentStatus;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.Set;

@Repository
public interface AssignmentRepository extends JpaRepository<Assignment, Long> {
    Set<Assignment> findByUser(User user);

    @Query("SELECT a FROM Assignment a WHERE a.status = :status")
    Set<Assignment> findByCodeReviewer(@Param("status") String status);
}
