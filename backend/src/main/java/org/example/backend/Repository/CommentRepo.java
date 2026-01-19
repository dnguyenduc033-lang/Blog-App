package org.example.backend.Repository;

import org.example.backend.Model.Comment;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface CommentRepo extends JpaRepository<Comment, Integer> {
    List<Comment> findByPostIdOrderByCreatedAtDesc(int postId);
}
