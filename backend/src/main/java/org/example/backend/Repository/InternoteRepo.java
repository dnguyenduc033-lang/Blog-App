package org.example.backend.Repository;

import org.example.backend.Model.Internote;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.Optional;

@Repository
public interface InternoteRepo extends JpaRepository<Internote, Long> {

    Optional<Internote> findByEmailAddress(String email);
    Optional<Internote> findByUserName(String userName);

    boolean existsByEmailAddress(String email);
}
