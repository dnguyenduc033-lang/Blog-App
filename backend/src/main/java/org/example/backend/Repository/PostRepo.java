package org.example.backend.Repository;

import org.example.backend.Model.Post;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface PostRepo extends JpaRepository<Post, Long> {

    // Lấy bài viết của một người dùng cụ thể, sắp xếp mới nhất lên đầu
    // Đã đổi từ findByAuthorName... thành findByUserName...
    List<Post> findByUserNameOrderByCreatedAtDesc(String userName);
}