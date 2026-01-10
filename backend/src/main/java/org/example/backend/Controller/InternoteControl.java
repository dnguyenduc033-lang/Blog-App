package org.example.backend.Controller;

import org.example.backend.Model.Internote;
import org.example.backend.ServiceImplement.InternoteServImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;
import java.util.Objects;

@RestController
@RequestMapping("/Internote")
@CrossOrigin(origins = "http://localhost:5173")
public class InternoteControl {

    @Autowired
    private InternoteServImpl internoteServ;

    @PostMapping("/signup-author")
    public ResponseEntity<Internote> signUpAuthor(@RequestBody Internote internote) {
        internote.setRole(Internote.Role.AUTHOR);
        Internote savedUser = internoteServ.AddInternote(internote);
        return ResponseEntity.ok(savedUser);
    }

    @PostMapping("/signin-author")
    public ResponseEntity<?> signInAuthor(@RequestBody Map<String, String> data) {
        String username = data.get("username");
        String email = data.get("emailAddress");
        String password = data.get("password");

        List<Internote> all = internoteServ.GetAllInternote();
        for (Internote user : all) {
            if (user.getRole() == Internote.Role.AUTHOR) {
                if (Objects.equals(user.getUserName(), username) &&
                        Objects.equals(user.getEmailAddress(), email) &&
                        Objects.equals(user.getPassword(), password)) {
                    return ResponseEntity.ok(user);
                }
            }
        }
        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Author login failed");
    }

    @PostMapping("/signin-admin")
    public ResponseEntity<?> signInAdmin(@RequestBody Map<String, String> data) {
        String fullName = data.get("fullName");
        String email = data.get("email");
        String phone = data.get("phone");
        String password = data.get("password");

        List<Internote> all = internoteServ.GetAllInternote();
        for (Internote user : all) {
            if (user.getRole() == Internote.Role.ADMIN) {
                boolean isNameMatch = user.getFullName() != null && user.getFullName().equalsIgnoreCase(fullName);
                boolean isEmailMatch = Objects.equals(user.getEmailAddress(), email);
                boolean isPhoneMatch = Objects.equals(user.getPhoneNumber(), phone);
                boolean isPasswordMatch = Objects.equals(user.getPassword(), password);

                if (isNameMatch && isEmailMatch && isPhoneMatch && isPasswordMatch) {
                    return ResponseEntity.ok(user);
                }
            }
        }
        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Admin login failed");
    }

    @GetMapping("/all")
    public List<Internote> getAllUsers() {
        return internoteServ.GetAllInternote();
    }

    @GetMapping("/GetAllInternote")
    public List<Internote> getAllInternote() {
        return internoteServ.GetAllInternote();
    }

    @PutMapping("/UpdateInternote/{id}")
    public ResponseEntity<Internote> updateInternote(@RequestBody Internote internote, @PathVariable Long id) {
        Internote existing = internoteServ.GetInternoteById(id);
        if (existing != null) {
            existing.setFullName(internote.getFullName());
            existing.setPhoneNumber(internote.getPhoneNumber());
            existing.setUserName(internote.getUserName());
            existing.setEmailAddress(internote.getEmailAddress());
            existing.setPassword(internote.getPassword());
            existing.setRole(internote.getRole());
            return ResponseEntity.ok(internoteServ.UpdateInternote(existing));
        }
        return ResponseEntity.notFound().build();
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<?> deleteUser(@PathVariable Long id) {
        Internote exist = internoteServ.GetInternoteById(id);
        if (exist != null) {
            internoteServ.DeleteInternote(exist);
            return ResponseEntity.ok("User deleted successfully");
        }
        return ResponseEntity.notFound().build();
    }

    @DeleteMapping("/DeleteInternote/{Id}")
    public ResponseEntity<?> deleteInternote(@PathVariable Long Id) {
        Internote exist = internoteServ.GetInternoteById(Id);
        if (exist != null) {
            internoteServ.DeleteInternote(exist);
            return ResponseEntity.ok("Deleted successfully");
        }
        return ResponseEntity.notFound().build();
    }
}

