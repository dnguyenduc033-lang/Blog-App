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

    @PostMapping("/comment")
    public Comment saveComment(@RequestBody Comment comment) {
        return commentRepo.save(comment);
    }

    @GetMapping("/{postId}/comments")
    public List<Comment> getComments(@PathVariable int postId) {
        return commentRepo.findByPostIdOrderByCreatedAtDesc(postId);
    }

    @DeleteMapping("/comment/{id}")
    public void deleteComment(@PathVariable("id") int id) {
        commentRepo.deleteById(id);
    }

}
