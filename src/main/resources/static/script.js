$(document).ready(function() {
    const itemsPerPage = 5;
    let currentPage = 1;
    let allData = [];
    let filteredData = [];

    // Modal
    $('body').append(`
        <div id="editModal" class="modal">
            <div class="modal-content">
                <div class="modal-header">
                    <h2>Edit Data Kendaraan</h2>
                </div>
                <div class="modal-body">
                        <div class="info-grid">
                            <p><strong>No Registrasi:</strong><br><input id="vehicleReg" readonly></input></p>
                            <p><strong>Tahun Pembuatan:</strong> <br><input id="vehicleYear"></input></p>
                            <p><strong>Nama:</strong> <br><input id="ownerName" readonly></input></p>
                            <p><strong>Kapasitas Silinder:</strong><br> <input id="vehicleCapacity"></input></p>
                            <p><strong>Merk:</strong> <br><input id="vehicleBrand"></input></p>
                            <p><strong>Warna:</strong> <br>
                                <select id="vehicleColor">
                                    <option value="">Pilih Warna</option>
                                    <option value="Merah">Merah</option>
                                    <option value="Hitam">Hitam</option>
                                    <option value="Biru">Biru</option>
                                    <option value="Abu-Abu">Abu-Abu</option>
                                </select>
                            </p>
                            <p><strong>Alamat:</strong> <br><textarea id="ownerAddress" readonly></textarea></p>
                            <p><strong>Bahan Bakar:</strong> <br><input id="vehicleFuel"></input></p>
                        </div>
                        <div class="ask-grid">
                             <p><strong>Anda yakin menghapus data <span id="vehicleReg1"></span>?</strong></p>
                        </div>

                </div>
                <div class= "modal-footer">
                    <button class="save">Simpan</button>
                    <button class="close">Kembali</button>
                    <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="green" class="bi bi-check-circle-fill" id="check" viewBox="0 0 16 16">
                      <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0m-3.97-3.03a.75.75 0 0 0-1.08.022L7.477 9.417 5.384 7.323a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-.01-1.05z"/>
                    </svg>
                    <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="red" class="bi bi-ban" id="prohibited" viewBox="0 0 16 16">
                      <path d="M15 8a6.97 6.97 0 0 0-1.71-4.584l-9.874 9.875A7 7 0 0 0 15 8M2.71 12.584l9.874-9.875a7 7 0 0 0-9.874 9.874ZM16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0"/>
                    </svg>
                </div>
            </div>
        </div>
    `);

    // Fetch data pas page ke load
    fetchData();

    function fetchData() {
        $.ajax({
            url: 'http://localhost:8080/api',
            method: 'GET',
            success: function(data) {
                console.log('Data received:', data);
                allData = data;
                filteredData = allData;
                renderTable();
            },
            error: function(xhr, status, error) {
                console.error('Error fetching data:', error);
            }
        });
    }

    let mode = 'edit';
    let selectedOwnerId = null;
    function showModal(nomorRegistrasi, modalMode) {
        mode = modalMode;
        let vehicleData = null;
        let ownerData = null;
        console.log(mode);
        
        $( "#ownerName" ).autocomplete({
            source: function(request, response) {
                // Filter data berdasarkan input pengguna
                const results = $.ui.autocomplete.filter(allData.map(item => item.nama), request.term);
                response(results);
            },
            minLength: 1, // Minimal karakter yang harus diketik sebelum auto complete muncul
            position: { my: "left top", at: "left bottom" },
            select: function(event, ui) {
                // Pas item dipilih, cari data pemilik berdasarkan nama
                const selectedName = ui.item.value; // Nama yang dipilih
                const selectedOwner = allData.find(item => item.nama === selectedName);
                
                if (selectedOwner) {
                    // Isi alamat sesuai dengan pemilik yang dipilih
                    $('#ownerAddress').val(selectedOwner.alamat);
                    selectedOwnerId = selectedOwner.idPemilik;
                }
            }
        });
        //edit tampilan sesuai mode
        if (mode === 'add') {
            $('.modal-header h2').text('Add Data Kendaraan');
            $('.ask-grid').hide();
            $('.info-grid').show();
            $('.save').show();
            $('.modal-footer').css('justify-content', 'flex-start');
        } else if (mode === 'edit') {
            $('.modal-header h2').text('Edit Data Kendaraan');
            $('.ask-grid').hide();
            $('.info-grid').show();
            $('.save').show();
            $('.save').text('Ubah');
            $('.modal-footer').css('justify-content', 'flex-start');
        } else if (mode === 'detail') {
            $('.modal-header h2').text('Detail Data Kendaraan');
            $('.ask-grid').hide();
            $('.info-grid').show();
            $('.save').hide();
            $('.modal-footer').css('justify-content', 'flex-start');
        } else if(mode === 'delete') {
            $('.modal-header h2').text('Delete Data Kendaraan');
            $('.info-grid').hide();
            $('.ask-grid').show();
            $('.modal-footer').css('justify-content', 'flex-end');
            $('.save').show();
            $('.save').text('Ok');
        }


        if (modalMode !== 'add') {
            // Cari data kendaraan dan pemilik berdasarkan nomor registrasi
            for (const owner of allData) {
                const vehicle = owner.kendaraanList.find(v => v.nomorRegistrasi === nomorRegistrasi);
                if (vehicle) {
                    vehicleData = vehicle;
                    ownerData = owner;
                    break;
                }
            }

            if (!vehicleData || !ownerData) return;
        }

        if (mode === 'detail' || mode === 'edit') {
            // Isi input field dengan data kendaraan dan pemilik yang dipilih
            $('#ownerName').val(ownerData.nama).prop('readonly', true);
            $('#ownerAddress').val(ownerData.alamat).prop('readonly', true);
            $('#vehicleReg').val(vehicleData.nomorRegistrasi).prop('readonly', true);
            $('#vehicleBrand').val(vehicleData.merk).prop('readonly', mode === 'detail');
            $('#vehicleYear').val(vehicleData.tahunPembuatan).prop('readonly', mode === 'detail');
            $('#vehicleCapacity').val(vehicleData.kapasitasSilinder + ' cc').prop('readonly', mode === 'detail');
            $('#vehicleColor').val(vehicleData.warna).prop('disabled', mode === 'detail');
            $('#vehicleFuel').val(vehicleData.bahanBakar).prop('readonly', mode === 'detail');
        } else if (mode === 'add') {
            // Kosongkan input field kalo mode add
            $('#ownerName').val('').prop('readonly', false);
            $('#ownerAddress').val('').prop('readonly', false);
            $('#vehicleReg').val('').prop('readonly', false);
            $('#vehicleBrand').val('').prop('readonly', false);
            $('#vehicleYear').val('').prop('readonly', false);
            $('#vehicleCapacity').val('').prop('readonly', false);
            $('#vehicleColor').val('').prop('readonly', false);
            $('#vehicleFuel').val('').prop('readonly', false);
        } else if(mode === 'delete') {
            // Masukin nomor regster ke text konfirmasi
            $('#vehicleReg1').text(vehicleData.nomorRegistrasi);
            console.log(vehicleData.nomorRegistrasi);
        }

        $('#editModal').fadeIn();
    }
    $(document).on('click', '.save', function() {
        console.log(mode);
        if (mode === 'edit') {
            const nomorRegistrasi = $('#vehicleReg').val();
            const kendaraan = {
                merk: $('#vehicleBrand').val(),
                tahunPembuatan: $('#vehicleYear').val(),
                kapasitasSilinder: parseInt($('#vehicleCapacity').val().replace(' cc', '')), // ilangin 'cc'
                warna: $('#vehicleColor').val(),
                bahanBakar: $('#vehicleFuel').val()
            };
            console.log("save clicked");
            $.ajax({
                url: `http://localhost:8080/api?nomorRegistrasi=${encodeURIComponent(nomorRegistrasi)}`,
                method: 'PUT',
                contentType: 'application/json',
                data: JSON.stringify(kendaraan),
                success: function(data) {
                    console.log('Data updated:', data);
                    fetchData(); // refresh data terbaru
                    $('#check').fadeIn();
                },
                error: function(xhr, status, error) {
                    console.error('Error updating data:', error);
                    $('#prohibited').fadeIn();
                }
            });
        } else if (mode === 'add') {
            
            let dataKendaraan;
            if (selectedOwnerId === null) {
                // selectedOwnerId null, pake nama dan alamat pemilik
                dataKendaraan = {
                    nomorRegistrasi: $('#vehicleReg').val(),
                    pemilik: {
                        nama: $('#ownerName').val(),
                        alamat: $('#ownerAddress').val()
                    },
                    merk: $('#vehicleBrand').val(),
                    tahunPembuatan: $('#vehicleYear').val(),
                    kapasitasSilinder: parseInt($('#vehicleCapacity').val().replace(' cc', '')),
                    warna: $('#vehicleColor').val(),
                    bahanBakar: $('#vehicleFuel').val()
                };
            } else {
                // selectedOwnerId valid, pake id pemilik
                dataKendaraan = {
                    nomorRegistrasi: $('#vehicleReg').val(),
                    pemilik: { idPemilik: selectedOwnerId },
                    merk: $('#vehicleBrand').val(),
                    tahunPembuatan: $('#vehicleYear').val(),
                    kapasitasSilinder: parseInt($('#vehicleCapacity').val().replace(' cc', '')),
                    warna: $('#vehicleColor').val(),
                    bahanBakar: $('#vehicleFuel').val()
                };
            }
            $.ajax({
                url: `http://localhost:8080/api`,
                method: 'POST',
                contentType: 'application/json',
                data: JSON.stringify(dataKendaraan),
                success: function(data) {
                    console.log('Data posted:', data);
                    fetchData();
                    $('#check').fadeIn();
                },
                error: function(xhr, status, error) {
                    console.error('Error posting data:', error);
                    $('#prohibited').fadeIn();
                }
            });
        } else if(mode === 'delete'){
            const nomorRegistrasi = $('#vehicleReg1').text();
            console.log("nomor: "+nomorRegistrasi);
            $.ajax({
                url: `http://localhost:8080/api?nomorRegistrasi=${encodeURIComponent(nomorRegistrasi)}`,
                method: 'DELETE',
                success: function(data) {
                    console.log('Data deleted:', data);
                    fetchData();
                    $('#check').fadeIn();
                },
                error: function(xhr, status, error) {
                    console.error('Error deleting data:', error);
                    $('#prohibited').fadeIn();
                }
            });
        }
        selectedOwnerId = null;
        setTimeout(function() {
            $('#check').hide();
            $('#prohibited').hide();
            $('#editModal').fadeOut();
        }, 750);
    });

    $(document).on('click', '.detail-link', function(e) {
        e.preventDefault();
        const nomorRegistrasi = $(this).data('noreg');
        showModal(nomorRegistrasi, 'detail');
    });

    $(document).on('click', '.edit-link', function(e) {
        e.preventDefault();
        const nomorRegistrasi = $(this).data('noreg');
        showModal(nomorRegistrasi, 'edit');
    });
    
    $(document).on('click', '.delete-link', function(e) {
        e.preventDefault();
        const nomorRegistrasi = $(this).data('noreg');
        showModal(nomorRegistrasi, 'delete');
    });

    $('#add-button').click(function() {
        showModal(null, 'add');
    });

    // Close pas klik kembali atau outer modal
    $('.close, .modal').on('click', function(e) {
        if (e.target === this) {
            $('#editModal').fadeOut();
        }
    });

    function renderTable() {
        $('#data-table-body').empty();
        let startIndex = (currentPage - 1) * itemsPerPage;
        let rowsToDisplay = [];

        const noRegistrasiFilter = $('#noRegistrasi').val().toLowerCase();
        const namaPemilikFilter = $('#namaPemilik').val().toLowerCase();

        allData.forEach(pemilik => {
            if (!pemilik || !pemilik.kendaraanList) return;
            
            if (namaPemilikFilter && !pemilik.nama.toLowerCase().includes(namaPemilikFilter)) {
                return;
            }

            pemilik.kendaraanList.forEach(kendaraan => {
                if (noRegistrasiFilter && !kendaraan.nomorRegistrasi.toLowerCase().includes(noRegistrasiFilter)) {
                    return;
                }

                rowsToDisplay.push({
                    nomorRegistrasi: kendaraan.nomorRegistrasi,
                    namaPemilik: pemilik.nama,
                    merk: kendaraan.merk,
                    tahunPembuatan: kendaraan.tahunPembuatan,
                    kapasitasSilinder: kendaraan.kapasitasSilinder,
                    warna: kendaraan.warna,
                    bahanBakar: kendaraan.bahanBakar
                });
            });
        });

        filteredData = rowsToDisplay;
        const paginatedRows = filteredData.slice(startIndex, startIndex + itemsPerPage);

        paginatedRows.forEach((row, index) => {
            const tableRow = `<tr>
                <td>${startIndex + index + 1}</td>
                <td>${row.nomorRegistrasi}</td>
                <td>${row.namaPemilik}</td>
                <td>${row.merk}</td>
                <td>${row.tahunPembuatan}</td>
                <td>${row.kapasitasSilinder} cc</td>
                <td>${row.warna}</td>
                <td>${row.bahanBakar}</td>
                <td class="action-links">
                    <a href="#" class="detail-link" data-noreg="${row.nomorRegistrasi}">Detail</a>
                    <a href="#" class="edit-link" data-noreg="${row.nomorRegistrasi}">Edit</a>
                    <a href="#" class="delete-link" data-noreg="${row.nomorRegistrasi}">Delete</a>
                </td>
            </tr>`;
            $('#data-table-body').append(tableRow);
        });

        updatePaginationControls();
    }


    function updatePaginationControls() {
        const totalPages = Math.max(1, Math.ceil(filteredData.length / itemsPerPage));
        $('#page-info').text(`Page ${currentPage} of ${totalPages}`);
        $('#prev-page').prop('disabled', currentPage === 1);
        $('#next-page').prop('disabled', currentPage === totalPages || filteredData.length === 0);
    }

    $('#prev-page').click(function() {
        if (currentPage > 1) {
            currentPage--;
            renderTable();
        }
    });

    $('#next-page').click(function() {
        if (currentPage < Math.ceil(filteredData.length / itemsPerPage)) {
            currentPage++;
            renderTable();
        }
    });

    $('#search').click(function() {
        currentPage = 1;
        renderTable();
    });
});