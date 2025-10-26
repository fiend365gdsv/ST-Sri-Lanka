package com.example.SBLK_backend.service;

import com.example.SBLK_backend.dto.*;
import com.example.SBLK_backend.model.Staff;
import com.example.SBLK_backend.repository.StaffRepository;
import com.example.SBLK_backend.security.CredentialsGenerator;
import org.springframework.beans.BeanUtils;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import jakarta.transaction.Transactional;

@Service
public class StaffService {

    private final StaffRepository staffRepo;
    private final CredentialsGenerator generator;
    private final BCryptPasswordEncoder passwordEncoder;
    private final EmailService emailService;

    public StaffService(StaffRepository staffRepo,
                        CredentialsGenerator generator,
                        BCryptPasswordEncoder passwordEncoder,
                        EmailService emailService) {
        this.staffRepo = staffRepo;
        this.generator = generator;
        this.passwordEncoder = passwordEncoder;
        this.emailService = emailService;
    }

    @Transactional
    public StaffRegisterResponseDto registerGenericStaff(GenericStaffRegisterRequestDto dto, String role) {
        Staff staff = new Staff();
        BeanUtils.copyProperties(dto, staff);
        staff.setRole(role);

        if (staffRepo.existsByEmail(staff.getEmail())) {
            throw new IllegalArgumentException("Email already in use");
        }

        generateCredentialsAndSave(staff);

        return buildResponse(staff);
    }

    @Transactional
    public StaffRegisterResponseDto registerDriver(DriverRegisterRequestDto dto) {
        Staff staff = new Staff();
        BeanUtils.copyProperties(dto, staff);
        staff.setRole("DRIVER");

        if (staffRepo.existsByEmail(staff.getEmail())) {
            throw new IllegalArgumentException("Email already in use");
        }

        generateCredentialsAndSave(staff);

        return buildResponse(staff);
    }

    private void generateCredentialsAndSave(Staff staff) {
        String username = generator.generateUsername(staff.getFirstName(), staff.getLastName());
        String plainPassword = generator.generatePassword(12);
        String encodedPassword = passwordEncoder.encode(plainPassword);

        staff.setUsername(username);
        staff.setPassword(encodedPassword);

        staffRepo.save(staff);

        emailService.sendCredentialsEmail(staff.getEmail(), username, plainPassword);
    }

    private StaffRegisterResponseDto buildResponse(Staff staff) {
        StaffRegisterResponseDto res = new StaffRegisterResponseDto();
        res.setId(staff.getId());
        res.setEmail(staff.getEmail());
        res.setUsername(staff.getUsername());
        res.setRole(staff.getRole());
        res.setMessage("Staff registered successfully and credentials sent to email.");
        return res;
    }

    @Transactional
    public String deleteStaff(Long id) {
        Staff staff = staffRepo.findById(id).orElseThrow(() -> new RuntimeException("Staff not found with ID: " + id));
        staffRepo.delete(staff);
        return "Staff with ID " + id + " deleted successfully.";
    }
    public Staff getStaffByUsername(String username) {
        return staffRepo.findByUsername(username).orElse(null);
    }


    @Transactional
    public Staff updateStaff(Long id, Staff updatedData) {
        Staff staff = staffRepo.findById(id).orElseThrow(() -> new RuntimeException("Staff not found with ID: " + id));

        staff.setFirstName(updatedData.getFirstName());
        staff.setLastName(updatedData.getLastName());
        staff.setEmail(updatedData.getEmail());
        staff.setMobileNumber(updatedData.getMobileNumber());
        staff.setAddressLine1(updatedData.getAddressLine1());
        staff.setAddressLine2(updatedData.getAddressLine2());
        staff.setDateOfBirth(updatedData.getDateOfBirth());
        staff.setGender(updatedData.getGender());
        staff.setDistrict(updatedData.getDistrict());
        staff.setCity(updatedData.getCity());
        staff.setNic(updatedData.getNic());
        staff.setExperienceYears(updatedData.getExperienceYears());
        staff.setPreviousEmploymentDetails(updatedData.getPreviousEmploymentDetails());

        if ("DRIVER".equalsIgnoreCase(staff.getRole())) {
            staff.setDriverLicenseNumber(updatedData.getDriverLicenseNumber());
            staff.setDriverLicenseExpiryDate(updatedData.getDriverLicenseExpiryDate());
        }

        return staffRepo.save(staff);
    }
}
