package com.example.SBLK_backend.repository;

import com.example.SBLK_backend.model.Depot;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.Optional;

@Repository
public interface DepotRepository extends JpaRepository<Depot, Long> {
    Optional<Depot> findByBusNumber(String busNumber);

}
