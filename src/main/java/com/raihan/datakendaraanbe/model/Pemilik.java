package com.raihan.datakendaraanbe.model;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;
import lombok.*;

import java.util.List;

@Entity
@Table(name = "pemilik")
//@JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})
public class Pemilik {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_pemilik")
    private Long idPemilik;

    @Column(name = "nama", nullable = false)
    private String nama;

    @Column(name = "alamat", nullable = false)
    private String alamat;

    @OneToMany(mappedBy = "pemilik", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    @JsonManagedReference
    private List<Kendaraan> kendaraanList;


    public Long getIdPemilik() {
        return idPemilik;
    }

    public void setIdPemilik(Long idPemilik) {
        this.idPemilik = idPemilik;
    }

    public String getNama() {
        return nama;
    }

    public void setNama(String nama) {
        this.nama = nama;
    }

    public String getAlamat() {
        return alamat;
    }

    public void setAlamat(String alamat) {
        this.alamat = alamat;
    }

    public List<Kendaraan> getKendaraanList() {
        return kendaraanList;
    }

    public void setKendaraanList(List<Kendaraan> kendaraanList) {
        this.kendaraanList = kendaraanList;
    }
}