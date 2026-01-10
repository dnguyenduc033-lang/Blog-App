package org.example.backend.Controller;

import org.example.backend.Model.Post;
import org.example.backend.Service.PostService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import java.util.List;

@RestController
@RequestMapping("/Post")
@CrossOrigin(origins = "http://localhost:5173")
public class PostControl {

    @Autowired
    private PostService postService;

    @PostMapping(value = "/add-post", consumes = {"multipart/form-data"})
    public ResponseEntity<Post> addPost(
            @RequestParam("title") String title,
            @RequestParam("content") String content,
            @RequestParam("userName") String userName,
            @RequestParam(value = "files", required = false) MultipartFile[] files) {

        return ResponseEntity.ok(postService.AddPost(title, content, userName, files));
    }

    @PutMapping(value = "/update/{id}", consumes = {"multipart/form-data"})
    public ResponseEntity<?> updatePost(
            @PathVariable Long id,
            @RequestParam("title") String title,
            @RequestParam("content") String content,
            @RequestParam(value = "files", required = false) MultipartFile[] files,
            @RequestParam(value = "existingFiles", required = false) String existingFilesJson) {

        try {
            String[] existingFiles = null;

            if (existingFilesJson != null && !existingFilesJson.isEmpty() && !existingFilesJson.equals("null")) {
                String cleanJson = existingFilesJson.replace("[", "").replace("]", "").replace("\"", "");
                if (!cleanJson.isEmpty()) {
                    existingFiles = cleanJson.split(",");
                }
            }

            Post result = postService.UpdatePost(id, title, content, files, existingFiles);
            return ResponseEntity.ok(result);
        } catch (Exception e) {
            return ResponseEntity.internalServerError().body("Lỗi cập nhật: " + e.getMessage());
        }
    }

    @GetMapping("/{id}")
    public ResponseEntity<Post> getPost(@PathVariable Long id) {
        return ResponseEntity.ok(postService.GetPostById(id));
    }

    @GetMapping("/all")
    public List<Post> getAllPostsAdmin() {
        return postService.GetAllPosts();
    }

    @GetMapping("/GetAllPosts")
    public List<Post> getAllPosts() {
        return postService.GetAllPosts();
    }

    @GetMapping("/user/{userName}")
    public List<Post> getPostsByUserNameSync(@PathVariable String userName) {
        return postService.GetPostsByUserName(userName);
    }

    @GetMapping("/author/{userName}")
    public List<Post> getPostsByUserName(@PathVariable String userName) {
        return postService.GetPostsByUserName(userName);
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<?> deletePost(@PathVariable Long id) {
        postService.DeletePost(id);
        return ResponseEntity.ok("Deleted successfully");
    }
}

