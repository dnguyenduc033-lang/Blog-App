package org.example.backend.Repository;

import org.example.backend.Model.Post;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface PostRepo extends JpaRepository<Post, Long> {

    List<Post> findByUserNameOrderByCreatedAtDesc(String userName);
}
