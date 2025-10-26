package com.example.SBLK_backend.repository;

import com.example.SBLK_backend.model.ProfitEntry;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.util.List;

@Repository
public interface ProfitRepository extends JpaRepository<ProfitEntry, Long> {

    List<ProfitEntry> findByDepotName(String depotName);

    List<ProfitEntry> findByDepotNameAndBusNumber(String depotName, String busNumber);

    @Query("SELECT p FROM ProfitEntry p WHERE MONTH(p.date) = :month AND YEAR(p.date) = :year")
    List<ProfitEntry> findByMonthAndYear(int month, int year);

    @Query("SELECT p FROM ProfitEntry p WHERE YEAR(p.date) = :year")
    List<ProfitEntry> findByYear(int year);

    @Query("SELECT p FROM ProfitEntry p WHERE p.date = :date")
    List<ProfitEntry> findByDate(LocalDate date);
}
