package com.freetime.allapi;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name = "app_users")
public class User {
    @Id
    private String id; // OAuth 'sub'
    private String email;
    private String plan = "FREE"; // FREE, FREEMIUM, PREMIUM

    public User() {}

    public User(String id, String email, String plan) {
        this.id = id;
        this.email = email;
        this.plan = plan;
    }

    public String getId() { return id; }
    public void setId(String id) { this.id = id; }
    public String getEmail() { return email; }
    public void setEmail(String email) { this.email = email; }
    public String getPlan() { return plan; }
    public void setPlan(String plan) { this.plan = plan; }
}