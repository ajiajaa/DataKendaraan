package com.raihan.datakendaraanbe.repository;

import com.raihan.datakendaraanbe.model.Kendaraan;
import org.springframework.data.jpa.repository.JpaRepository;

public interface KendaraanRepository extends JpaRepository<Kendaraan, Long> {
    public Kendaraan findByNomorRegistrasi(String nomorRegistrasi);
    public void deleteByNomorRegistrasi(String nomorRegistrasi);

}
