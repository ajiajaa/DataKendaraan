package com.raihan.datakendaraanbe.service;

import com.raihan.datakendaraanbe.model.Kendaraan;
import com.raihan.datakendaraanbe.repository.KendaraanRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

@Service
public class KendaraanService {
    @Autowired
    KendaraanRepository kendaraanRepository;

    public Kendaraan createKendaraan(Kendaraan kendaraan) {
        return kendaraanRepository.save(kendaraan);
    }
    public Optional<Kendaraan> getByNomor(String id) {
        return kendaraanRepository.findById(id);
    }
    @Transactional
    public Optional<Kendaraan> update(String nomorRegistrasi, Kendaraan updatedKendaraan) {
        Optional<Kendaraan> existingKendaraanOpt = kendaraanRepository.findById(nomorRegistrasi);

        if (!existingKendaraanOpt.isPresent()) {
            return Optional.empty();
        }

        Kendaraan existingKendaraan = existingKendaraanOpt.get();

        if (updatedKendaraan.getMerk() != null) {
            existingKendaraan.setMerk(updatedKendaraan.getMerk());
        }

        if (updatedKendaraan.getPemilik() != null) {
            existingKendaraan.setPemilik(updatedKendaraan.getPemilik());
        }

        if (updatedKendaraan.getTahunPembuatan() != null) {
            existingKendaraan.setTahunPembuatan(updatedKendaraan.getTahunPembuatan());
        }

        if (updatedKendaraan.getKapasitasSilinder() != null) {
            existingKendaraan.setKapasitasSilinder(updatedKendaraan.getKapasitasSilinder());
        }

        if (updatedKendaraan.getWarna() != null) {
            existingKendaraan.setWarna(updatedKendaraan.getWarna());
        }

        if (updatedKendaraan.getBahanBakar() != null) {
            existingKendaraan.setBahanBakar(updatedKendaraan.getBahanBakar());
        }

        Kendaraan updatedKendaraanResult = kendaraanRepository.save(existingKendaraan);
        return Optional.of(updatedKendaraanResult);
    }

    @Transactional
    public void delete(String id) {
        Optional<Kendaraan> target = getByNomor(id);
        if (target.isPresent()) {
            kendaraanRepository.deleteById(id);
        }
    }

}
