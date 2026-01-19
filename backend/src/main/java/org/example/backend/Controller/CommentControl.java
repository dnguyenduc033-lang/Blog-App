package org.example.backend.Controller;

import org.example.backend.Model.Comment;
import org.example.backend.Repository.CommentRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/Internote/posts")
@CrossOrigin(origins = "http://localhost:5173") // Đảm bảo khớp với port React của bạn
public class CommentControl {

    @Autowired
    private CommentRepo commentRepo;

    // POST: http://localhost:9000/Internote/posts/comment
    @PostMapping("/comment")
    public Comment saveComment(@RequestBody Comment comment) {
        return commentRepo.save(comment);
    }

    // GET: http://localhost:9000/Internote/posts/{postId}/comments
    @GetMapping("/{postId}/comments")
    public List<Comment> getComments(@PathVariable int postId) {
        return commentRepo.findByPostIdOrderByCreatedAtDesc(postId);
    }

    @DeleteMapping("/comment/{id}")
    public void deleteComment(@PathVariable("id") int id) {
        commentRepo.deleteById(id);
    }
}