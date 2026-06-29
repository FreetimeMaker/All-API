package com.freetime.allapi.user;

import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api/subscribe")
public class SubscriptionController {

    private final UserService userService;

    public SubscriptionController(UserService userService) {
        this.userService = userService;
    }

    @PostMapping
    public Map<String, String> subscribe(@RequestParam String plan, @AuthenticationPrincipal OAuth2User principal) {
        if (principal == null) {
            return Map.of("error", "Must be logged in to subscribe");
        }

        String userId = principal.getAttribute("sub");
        String normalizedPlan = plan.toUpperCase();

        if (!normalizedPlan.equals("FREE") && !normalizedPlan.equals("FREEMIUM") && !normalizedPlan.equals("PREMIUM")) {
            return Map.of("error", "Invalid plan. Choose FREE, FREEMIUM, or PREMIUM.");
        }

        userService.upgradeUser(userId, normalizedPlan);
        return Map.of("status", "success", "newPlan", normalizedPlan);
    }

    @GetMapping("/me")
    public Map<String, Object> getMyPlan(@AuthenticationPrincipal OAuth2User principal) {
        if (principal == null) {
            return Map.of("plan", "ANONYMOUS");
        }
        User user = userService.getOrCreateUser(principal);
        return Map.of(
            "email", user.getEmail(),
            "plan", user.getPlan()
        );
    }
}