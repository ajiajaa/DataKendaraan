package com.raihan.datakendaraanbe.repository;

import com.raihan.datakendaraanbe.model.Kendaraan;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface KendaraanRepository extends JpaRepository<Kendaraan, Long> {
    public Kendaraan findByNomorRegistrasi(String nomorRegistrasi);
    public void deleteByNomorRegistrasi(String nomorRegistrasi);

}
