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

    // 1. Nhận userName từ Frontend gửi lên
    @PostMapping(value = "/add-post", consumes = {"multipart/form-data"})
    public ResponseEntity<Post> addPost(
            @RequestParam("title") String title,
            @RequestParam("content") String content,
            @RequestParam("userName") String userName, // Đã đổi từ author thành userName
            @RequestParam(value = "files", required = false) MultipartFile[] files) {

        // Gọi Service xử lý với tham số userName
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

            // Sửa 2: Kiểm tra an toàn trước khi split chuỗi JSON
            if (existingFilesJson != null && !existingFilesJson.isEmpty() && !existingFilesJson.equals("null")) {
                String cleanJson = existingFilesJson.replace("[", "").replace("]", "").replace("\"", "");
                if (!cleanJson.isEmpty()) {
                    existingFiles = cleanJson.split(",");
                }
            }

            // Giữ nguyên logic gọi Service của bạn
            Post result = postService.UpdatePost(id, title, content, files, existingFiles);
            return ResponseEntity.ok(result);
        } catch (Exception e) {
            // Trả về thông báo lỗi cụ thể để bạn dễ debug
            return ResponseEntity.internalServerError().body("Lỗi cập nhật: " + e.getMessage());
        }
    }

    @GetMapping("/{id}")
    public ResponseEntity<Post> getPost(@PathVariable Long id) {
        return ResponseEntity.ok(postService.GetPostById(id));
    }

    @GetMapping("/GetAllPosts")
    public List<Post> getAllPosts() {
        return postService.GetAllPosts();
    }

    // 2. Tìm bài viết dựa trên userName
    @GetMapping("/author/{userName}") // Giữ nguyên path /author/ để không phải sửa Route Frontend quá nhiều
    public List<Post> getPostsByUserName(@PathVariable String userName) {
        return postService.GetPostsByUserName(userName); // Đổi tên hàm cho khớp
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<?> deletePost(@PathVariable Long id) {
        postService.DeletePost(id);
        return ResponseEntity.ok("Deleted successfully");
    }
}