package org.example.backend.Repository;

import org.example.backend.Model.Internote;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.Optional;

@Repository
public interface InternoteRepo extends JpaRepository<Internote, Long> {

    // Tìm người dùng bằng Email
    Optional<Internote> findByEmailAddress(String email);

    // Kiểm tra xem email đã tồn tại trong DB chưa (dùng cho Sign Up)
    boolean existsByEmailAddress(String email);
}
