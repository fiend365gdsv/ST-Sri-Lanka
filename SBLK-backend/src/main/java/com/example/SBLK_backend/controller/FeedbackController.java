package com.example.SBLK_backend.controller;

import com.example.SBLK_backend.dto.FeedbackDto;
import com.example.SBLK_backend.model.Feedback;
import com.example.SBLK_backend.service.FeedbackService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/feedback")
@CrossOrigin(origins = "*")
public class FeedbackController {

    private final FeedbackService feedbackService;

    public FeedbackController(FeedbackService feedbackService) {
        this.feedbackService = feedbackService;
    }

    // Passenger submits feedback
    @PostMapping("/submit")
    public ResponseEntity<?> submitFeedback(@RequestBody FeedbackDto dto) {
        Feedback saved = feedbackService.submitFeedback(dto);
        return ResponseEntity.ok(saved);
    }

    // Admin/Officer view all feedbacks
    @GetMapping("/all")
    public ResponseEntity<List<Feedback>> getAllFeedbacks() {
        return ResponseEntity.ok(feedbackService.getAllFeedbacks());
    }

    // (Optional) Passenger can view their own feedbacks
    @GetMapping("/user/{username}")
    public ResponseEntity<List<Feedback>> getFeedbacksByUser(@PathVariable String username) {
        return ResponseEntity.ok(feedbackService.getFeedbacksByUsername(username));
    }
}
