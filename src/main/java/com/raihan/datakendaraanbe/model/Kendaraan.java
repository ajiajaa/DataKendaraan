package com.raihan.datakendaraanbe.model;

import com.fasterxml.jackson.annotation.JsonBackReference;
import jakarta.persistence.*;

@Entity
@Table(name = "kendaraan")
public class Kendaraan {
    @Id
    @Column(name = "nomor_registrasi", nullable = false)
    private String nomorRegistrasi;  // Diubah ke String karena nomor registrasi biasanya alfanumerik

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "id_pemilik", nullable = false)
    @JsonBackReference
    private Pemilik pemilik;

    @Column(name = "merk", nullable = false)
    private String merk;

    @Column(name = "tahun_pembuatan", length = 4, nullable = false)
    private String tahunPembuatan;

    @Column(name = "kapasitas_silinder", nullable = false)
    private Integer kapasitasSilinder;

    @Column(name = "warna", nullable = false)
    private String warna;

    @Column(name = "bahan_bakar", nullable = false)
    private String bahanBakar;

    public String getNomorRegistrasi() {
        return nomorRegistrasi;
    }

    public void setNomorRegistrasi(String nomorRegistrasi) {
        this.nomorRegistrasi = nomorRegistrasi;
    }

    public Pemilik getPemilik() {
        return pemilik;
    }

    public void setPemilik(Pemilik pemilik) {
        this.pemilik = pemilik;
    }

    public String getMerk() {
        return merk;
    }

    public void setMerk(String merk) {
        this.merk = merk;
    }

    public String getTahunPembuatan() {
        return tahunPembuatan;
    }

    public void setTahunPembuatan(String tahunPembuatan) {
        this.tahunPembuatan = tahunPembuatan;
    }

    public Integer getKapasitasSilinder() {
        return kapasitasSilinder;
    }

    public void setKapasitasSilinder(Integer kapasitasSilinder) {
        this.kapasitasSilinder = kapasitasSilinder;
    }

    public String getWarna() {
        return warna;
    }

    public void setWarna(String warna) {
        this.warna = warna;
    }

    public String getBahanBakar() {
        return bahanBakar;
    }

    public void setBahanBakar(String bahanBakar) {
        this.bahanBakar = bahanBakar;
    }
}