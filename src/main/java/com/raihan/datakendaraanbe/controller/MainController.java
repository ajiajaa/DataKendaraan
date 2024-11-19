package com.raihan.datakendaraanbe.controller;

import com.raihan.datakendaraanbe.model.Kendaraan;
import com.raihan.datakendaraanbe.model.Pemilik;
import com.raihan.datakendaraanbe.service.KendaraanService;
import com.raihan.datakendaraanbe.service.PemilikService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api")
public class MainController {
    @Autowired
    private KendaraanService kendaraanService;
    @Autowired
    private PemilikService pemilikService;

    @PostMapping
    public ResponseEntity<Kendaraan> create(@RequestBody Kendaraan kendaraan) {
        System.out.println("test: "+kendaraan.getPemilik().getNama());
        if(kendaraan.getPemilik().getIdPemilik() == null)
            pemilikService.createPemilik(kendaraan.getPemilik());
        Kendaraan createdKendaraan = kendaraanService.createKendaraan(kendaraan);

        return ResponseEntity.ok(createdKendaraan);
    }
    @GetMapping()
    public ResponseEntity<List<Pemilik>> getAll(){
        List<Pemilik> retrievedPemilik = pemilikService.getAllPemilik();
        return ResponseEntity.ok(retrievedPemilik);
    }
    @PutMapping
    public ResponseEntity<Kendaraan> updateKendaraan(
            @RequestParam String nomorRegistrasi,
            @RequestBody Kendaraan kendaraan) {
        Kendaraan updatedKendaraan = kendaraanService.update(nomorRegistrasi, kendaraan);
        if (updatedKendaraan == null) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(updatedKendaraan);
    }
    @DeleteMapping
    public ResponseEntity<Kendaraan> delete(@RequestParam String nomorRegistrasi) {
        kendaraanService.delete(nomorRegistrasi);
        return ResponseEntity.noContent().build();
    }
}
