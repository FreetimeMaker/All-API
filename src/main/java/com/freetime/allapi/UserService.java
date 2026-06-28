package com.freetime.allapi;

import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.stereotype.Service;

@Service
public class UserService {
    private final UserRepository repository;

    public UserService(UserRepository repository) {
        this.repository = repository;
    }

    public User getOrCreateUser(OAuth2User principal) {
        String id = principal.getAttribute("sub");
        String email = principal.getAttribute("email");
        
        return repository.findById(id).orElseGet(() -> {
            User newUser = new User(id, email, "FREE");
            return repository.save(newUser);
        });
    }

    public void upgradeUser(String userId, String plan) {
        User user = repository.findById(userId).orElseThrow();
        user.setPlan(plan);
        repository.save(user);
    }
}