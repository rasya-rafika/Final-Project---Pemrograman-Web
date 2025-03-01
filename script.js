document.addEventListener("DOMContentLoaded", function () {
    loadDoctors();

    document.getElementById("doctorForm").addEventListener("submit", function (event) {
        event.preventDefault();
        addDoctor();
    });

    document.getElementById("phoneNumber").addEventListener("input", function () {
        this.value = this.value.replace(/\D/g, "").slice(0, 13); // Hanya angka, max 13 digit
    });
});

let doctors = JSON.parse(localStorage.getItem("doctors")) || [];
let editingIndex = -1; // Menyimpan index yang sedang diedit

function addDoctor() {
    let name = document.getElementById("doctorName").value.trim();
    let specialization = document.getElementById("specialization").value.trim();
    let phone = document.getElementById("phoneNumber").value.trim();

    if (name === "" || specialization === "" || phone === "") {
        alert("Semua kolom harus diisi!");
        return;
    }

    if (editingIndex === -1) {
        // Tambah data baru
        doctors.push({ name, specialization, phone });
        alert("Dokter berhasil ditambahkan!");
    } else {
        // Update data yang diedit
        doctors[editingIndex] = { name, specialization, phone };
        alert("Data dokter berhasil diperbarui!");
        editingIndex = -1; // Reset index edit
    }

    saveDoctors();
    loadDoctors();
    document.getElementById("doctorForm").reset();
}

function loadDoctors() {
    let doctorTableBody = document.querySelector("#doctorTable tbody");
    doctorTableBody.innerHTML = "";

    doctors.forEach((doctor, index) => {
        let row = `<tr id="row-${index}">
            <td>${doctor.name}</td>
            <td>${doctor.specialization}</td>
            <td>${doctor.phone}</td>
            <td>
                <button class="edit" onclick="editDoctor(${index})">Edit</button>
                <button class="delete" onclick="deleteDoctor(${index})">Hapus</button>
            </td>
        </tr>`;
        doctorTableBody.innerHTML += row;
    });
}

function editDoctor(index) {
    let doctor = doctors[index];

    document.getElementById("doctorName").value = doctor.name;
    document.getElementById("specialization").value = doctor.specialization;
    document.getElementById("phoneNumber").value = doctor.phone;

    editingIndex = index; // Menyimpan index yang sedang diedit

    document.getElementById(`row-${index}`).style.backgroundColor = "#ffeb99"; // Highlight baris yang diedit
    alert("Anda sedang mengedit data dokter. Pastikan menyimpan perubahan.");
}

function deleteDoctor(index) {
    if (confirm("Yakin ingin menghapus dokter ini?")) {
        doctors.splice(index, 1);
        saveDoctors();
        loadDoctors();
    }
}

function saveDoctors() {
    localStorage.setItem("doctors", JSON.stringify(doctors));
}
document.addEventListener("DOMContentLoaded", function () {
    document.getElementById("registerForm").addEventListener("submit", function (event) {
        event.preventDefault(); // Mencegah form submit secara default
        
        // Ambil nilai dari input form
        let nama = document.getElementById("namaLengkap").value.trim();
        let alamat = document.getElementById("alamat").value.trim();
        let tempatLahir = document.getElementById("tempatLahir").value.trim();
        let tanggalLahir = document.getElementById("tanggalLahir").value;
        let jenisKelamin = document.querySelector('input[name="jenisKelamin"]:checked');

        if (nama === "" || alamat === "" || tempatLahir === "" || tanggalLahir === "" || !jenisKelamin) {
            alert("Semua kolom harus diisi!");
            return;
        }

        // Simpan data ke localStorage (opsional, jika ingin menyimpan data)
        let userData = {
            nama,
            alamat,
            tempatLahir,
            tanggalLahir,
            jenisKelamin: jenisKelamin.value
        };
        localStorage.setItem("user", JSON.stringify(userData));

        alert("Registrasi berhasil! Anda akan dialihkan ke halaman utama.");

        // Alihkan ke halaman index.html
        window.location.href = "index.html";
    });
});

