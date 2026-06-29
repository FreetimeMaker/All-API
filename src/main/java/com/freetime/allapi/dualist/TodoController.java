package com.freetime.allapi.dualist;

import com.freetime.allapi..user.User;
import com.freetime.allapi.user.UserService;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/todos")
public class TodoController {

    private final TodoRepository repository;
    private final UserService userService;

    public TodoController(TodoRepository repository, UserService userService) {
        this.repository = repository;
        this.userService = userService;
    }

    @GetMapping
    public List<Todo> getAllTodos(@AuthenticationPrincipal OAuth2User principal) {
        String userId = principal.getAttribute("sub");
        return repository.findByOwnerId(userId);
    }

    @PostMapping
    public Object createTodo(@RequestBody Todo todo, @AuthenticationPrincipal OAuth2User principal) {
        User user = userService.getOrCreateUser(principal);
        List<Todo> existingTodos = repository.findByOwnerId(user.getId());

        // SaaS Limits
        if ("FREE".equals(user.getPlan()) && existingTodos.size() >= 5) {
            return Map.of("error", "FREE limit reached (5 tasks). Upgrade to FREEMIUM for 50 or PREMIUM for unlimited.");
        }
        if ("FREEMIUM".equals(user.getPlan()) && existingTodos.size() >= 50) {
            return Map.of("error", "FREEMIUM limit reached (50 tasks). Upgrade to PREMIUM for unlimited.");
        }

        todo.setOwnerId(user.getId());
        return repository.save(todo);
    }

    @PutMapping("/{id}")
    public Todo updateTodo(@PathVariable Long id, @RequestBody Todo todoDetails, @AuthenticationPrincipal OAuth2User principal) {
        String userId = principal.getAttribute("sub");
        Todo todo = repository.findById(id)
                .filter(t -> t.getOwnerId().equals(userId))
                .orElseThrow(() -> new RuntimeException("Not authorized or not found"));
        
        todo.setTitle(todoDetails.getTitle());
        todo.setCompleted(todoDetails.isCompleted());
        return repository.save(todo);
    }

    @DeleteMapping("/{id}")
    public void deleteTodo(@PathVariable Long id, @AuthenticationPrincipal OAuth2User principal) {
        String userId = principal.getAttribute("sub");
        Todo todo = repository.findById(id)
                .filter(t -> t.getOwnerId().equals(userId))
                .orElseThrow(() -> new RuntimeException("Not authorized or not found"));
        
        repository.delete(todo);
    }
}