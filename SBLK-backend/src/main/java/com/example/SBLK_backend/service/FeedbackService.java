package com.example.SBLK_backend.service;

import com.example.SBLK_backend.dto.FeedbackDto;
import com.example.SBLK_backend.model.Feedback;
import com.example.SBLK_backend.repository.FeedbackRepository;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
public class FeedbackService {

    private final FeedbackRepository feedbackRepository;

    public FeedbackService(FeedbackRepository feedbackRepository) {
        this.feedbackRepository = feedbackRepository;
    }

    // Save feedback
    public Feedback submitFeedback(FeedbackDto dto) {
        Feedback feedback = new Feedback();
        feedback.setUsername(dto.getUsername());
        feedback.setSubject(dto.getSubject());
        feedback.setDescription(dto.getDescription());
        return feedbackRepository.save(feedback);
    }

    // View all feedbacks (Admin/Officer)
    public List<Feedback> getAllFeedbacks() {
        return feedbackRepository.findAll();
    }

    // View feedbacks by username
    public List<Feedback> getFeedbacksByUsername(String username) {
        return feedbackRepository.findByUsername(username);
    }
}
