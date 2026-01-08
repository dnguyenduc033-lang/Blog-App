package org.example.backend.ServiceImplement;

import org.example.backend.Model.Post;
import org.example.backend.Repository.PostRepo;
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

    private final String UPLOAD_DIR = System.getProperty("user.dir") + File.separator + "uploads" + File.separator;

    // 1. Đổi tham số thành userName và sử dụng setUserName của Model Post
    @Override
    public Post AddPost(String title, String content, String userName, MultipartFile[] files) {
        List<String> fileNames = new ArrayList<>();
        saveFiles(files, fileNames);

        Post post = new Post();
        post.setTitle(title);
        post.setContent(content);
        post.setUserName(userName); // Đã đổi từ setAuthorName thành setUserName
        post.setAttachments(fileNames);
        post.setCreatedAt(LocalDateTime.now());
        return repo.save(post);
    }

    @Override
    public Post UpdatePost(Long id, String title, String content, MultipartFile[] files, String[] existingFiles) {
        Post post = repo.findById(id).orElseThrow(() -> new RuntimeException("Post not found"));

        List<String> finalAttachments = new ArrayList<>();

        // LOGIC BẢO VỆ DỮ LIỆU:
        if (existingFiles != null) {
            // Nếu Frontend gửi danh sách file muốn giữ lại, ta dùng danh sách đó
            finalAttachments.addAll(Arrays.asList(existingFiles));
        } else {
            // Nếu Frontend không gửi gì (null), ta mặc định giữ lại toàn bộ file cũ hiện có trong DB
            if (post.getAttachments() != null) {
                finalAttachments.addAll(post.getAttachments());
            }
        }

        // Lưu thêm các file mới (nếu có)
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

    // 2. Đổi tên hàm và sử dụng hàm findByUserName đã tạo trong Repo
    @Override
    public List<Post> GetPostsByUserName(String userName) {
        return repo.findByUserNameOrderByCreatedAtDesc(userName);
    }

    @Override public void DeletePost(Long id) { repo.deleteById(id); }
}