package com.raihan.datakendaraanbe.service;

import com.raihan.datakendaraanbe.model.Kendaraan;
import com.raihan.datakendaraanbe.repository.KendaraanRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Service
public class KendaraanService {
    @Autowired
    KendaraanRepository kendaraanRepository;

    public Kendaraan createKendaraan(Kendaraan kendaraan) {
        return kendaraanRepository.save(kendaraan);
    }
    public List<Kendaraan> getAll() {
        return kendaraanRepository.findAll();
    }
    public Kendaraan getByNomor(String id) {
        return kendaraanRepository.findByNomorRegistrasi(id);
    }
//    public Kendaraan update(String id, Kendaraan kendaraan) {
//        kendaraan.setNomorRegistrasi(id);
//        return kendaraanRepository.save(kendaraan);
//    }
@Transactional
public Kendaraan update(String nomorRegistrasi, Kendaraan updatedKendaraan) {
    Kendaraan existingKendaraan = kendaraanRepository.findByNomorRegistrasi(nomorRegistrasi);
    if (existingKendaraan == null) {
        return null;
    }

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

    return kendaraanRepository.save(existingKendaraan);
}
    @Transactional
    public void delete(String id) {
        Kendaraan target = getByNomor(id);
        if (target != null) {
            kendaraanRepository.deleteByNomorRegistrasi(id);
        }
    }

}
