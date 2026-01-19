package org.example.backend.Service;

import org.example.backend.Model.Post;
import org.springframework.web.multipart.MultipartFile;
import java.util.List;

public interface PostService {
    public Post AddPost(String title, String content, String userName, String category,MultipartFile[] files);

    public List<Post> GetAllPosts();

    public List<Post> GetPostsByUserName(String userName);

    public void DeletePost(Long id);

    public Post UpdatePost(Long id, String title, String content, MultipartFile[] files, String[] existingFiles);

    public Post GetPostById(Long id);
}
