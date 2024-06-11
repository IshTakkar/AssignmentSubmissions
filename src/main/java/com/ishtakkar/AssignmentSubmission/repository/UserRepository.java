package com.ishtakkar.AssignmentSubmission.repository;

import com.ishtakkar.AssignmentSubmission.domain.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface UserRepository extends JpaRepository<User, Long> {
    Optional<User> findByUsername(String username);
}
