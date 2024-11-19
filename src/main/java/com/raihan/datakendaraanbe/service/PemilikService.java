package com.raihan.datakendaraanbe.service;

import com.raihan.datakendaraanbe.model.Pemilik;
import com.raihan.datakendaraanbe.repository.PemilikRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

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
    public List<Pemilik> autoCompleteSearch(String search) {
        List<Pemilik> l1 = pemilikRepository.findByNamaStartingWith(search);
        List<Pemilik> l2 = pemilikRepository.findByNamaContaining(search);
        Set<Pemilik> uniqueSet = new HashSet<>();
        uniqueSet.addAll(l1);
        uniqueSet.addAll(l2);
        List<Pemilik> resultList = new ArrayList<>(uniqueSet);

        resultList.sort((p1, p2) -> {
            String name1 = p1.getNama();
            String name2 = p2.getNama();

            // Check if name1 starts with the search term
            boolean startsWith1 = name1.toLowerCase().startsWith(search.toLowerCase());
            boolean startsWith2 = name2.toLowerCase().startsWith(search.toLowerCase());

            // Prioritize names that start with the search term
            if (startsWith1 && !startsWith2) {
                return -1; // p1 comes before p2
            } else if (!startsWith1 && startsWith2) {
                return 1; // p2 comes before p1
            } else {
                // If both or neither start with the search term, sort alphabetically
                return name1.compareToIgnoreCase(name2);
            }
        });

        return resultList;
    }
    public Pemilik findById(Long id) {
        Optional<Pemilik> pemilik = pemilikRepository.findById(id);
        return pemilik.orElse(null);
    }
    @Transactional
    public void delete(Long id) {
        Pemilik pemilik = findById(id);
        pemilikRepository.delete(pemilik);
    }


}
