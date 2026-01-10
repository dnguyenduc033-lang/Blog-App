package org.example.backend.Model;

import jakarta.persistence.*;

@Entity
@Table(name = "internote") // Đảm bảo tên bảng khớp với SQL
public class Internote {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    // SỬA: Map chính xác với cột full_name trong SQL
    @Column(name = "full_name")
    private String fullName;

    // SỬA: Map chính xác với cột email_address trong SQL
    @Column(name = "email_address", unique = true)
    private String emailAddress;

    // SỬA: Map chính xác với cột phone_number trong SQL
    @Column(name = "phone_number")
    private String phoneNumber;

    private String password;

    // SỬA: Map chính xác với cột user_name (Admin sẽ để NULL cột này)
    @Column(name = "user_name")
    private String userName;

    @Enumerated(EnumType.STRING)
    private Role role;

    public enum Role {
        ADMIN,
        AUTHOR
    }

    // --- GETTERS AND SETTERS (Giữ nguyên như cũ) ---
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public String getFullName() { return fullName; }
    public void setFullName(String fullName) { this.fullName = fullName; }

    public String getEmailAddress() { return emailAddress; }
    public void setEmailAddress(String emailAddress) { this.emailAddress = emailAddress; }

    public String getPhoneNumber() { return phoneNumber; }
    public void setPhoneNumber(String phoneNumber) { this.phoneNumber = phoneNumber; }

    public String getPassword() { return password; }
    public void setPassword(String password) { this.password = password; }

    public String getUserName() { return userName; }
    public void setUserName(String userName) { this.userName = userName; }

    public Role getRole() { return role; }
    public void setRole(Role role) { this.role = role; }
}
