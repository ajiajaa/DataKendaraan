package com.raihan.datakendaraanbe.service;

import com.raihan.datakendaraanbe.model.Pemilik;
import com.raihan.datakendaraanbe.repository.PemilikRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.*;

@Service
public class PemilikService {
    @Autowired
    private PemilikRepository pemilikRepository;

    public Pemilik createPemilik(Pemilik pemilik) {
        return pemilikRepository.save(pemilik);
    }
    public List<Pemilik> getAllPemilik() {
        return pemilikRepository.findAll();
    }
}
