package org.example.backend.ServiceImplement;

import org.example.backend.Model.Post;
import org.example.backend.Model.Internote; // Thêm import Model để xử lý user
import org.example.backend.Repository.PostRepo;
import org.example.backend.Repository.InternoteRepo; // Thêm import Repo để tìm userName
import org.example.backend.Service.PostService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import java.io.File;
import java.nio.file.*;
import java.time.LocalDateTime;
import java.util.*;

@Service
public class PostServImpl implements PostService {

    @Autowired
    private PostRepo repo;

    @Autowired
    private InternoteRepo internoteRepo; 

    private final String UPLOAD_DIR = System.getProperty("user.dir") + File.separator + "uploads" + File.separator;

    @Override
    public Post AddPost(String title, String content, String userName, MultipartFile[] files) {
        List<String> fileNames = new ArrayList<>();
        saveFiles(files, fileNames);

        Post post = new Post();
        post.setTitle(title);
        post.setContent(content);
        post.setUserName(userName);
        post.setAttachments(fileNames);
        post.setCreatedAt(LocalDateTime.now());

        internoteRepo.findByUserName(userName).ifPresent(user -> {
            post.setFullName(user.getFullName());
            post.setEmailAddress(user.getEmailAddress());
        });

        return repo.save(post);
    }

    @Override
    public Post UpdatePost(Long id, String title, String content, MultipartFile[] files, String[] existingFiles) {
        Post post = repo.findById(id).orElseThrow(() -> new RuntimeException("Post not found"));

        List<String> finalAttachments = new ArrayList<>();

        if (existingFiles != null) {
            finalAttachments.addAll(Arrays.asList(existingFiles));
        } else {
            if (post.getAttachments() != null) {
                finalAttachments.addAll(post.getAttachments());
            }
        }

        saveFiles(files, finalAttachments);

        post.setTitle(title);
        post.setContent(content);
        post.setAttachments(finalAttachments);
        return repo.save(post);
    }

    private void saveFiles(MultipartFile[] files, List<String> list) {
        if (files == null) return;
        File folder = new File(UPLOAD_DIR);
        if (!folder.exists()) folder.mkdirs();
        for (MultipartFile file : files) {
            if (!file.isEmpty()) {
                try {
                    String name = System.currentTimeMillis() + "_" + file.getOriginalFilename();
                    Files.copy(file.getInputStream(), Paths.get(UPLOAD_DIR).resolve(name), StandardCopyOption.REPLACE_EXISTING);
                    list.add(name);
                } catch (Exception e) { throw new RuntimeException(e); }
            }
        }
    }

    @Override public Post GetPostById(Long id) { return repo.findById(id).orElse(null); }
    @Override public List<Post> GetAllPosts() { return repo.findAll(); }

    @Override
    public List<Post> GetPostsByUserName(String userName) {
        return repo.findByUserNameOrderByCreatedAtDesc(userName);
    }

    @Override public void DeletePost(Long id) { repo.deleteById(id); }
}
