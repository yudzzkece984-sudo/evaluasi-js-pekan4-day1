// Pastikan seluruh halaman sudah dimuat
document.addEventListener("DOMContentLoaded", () => {
    // Ambil elemen footer tahun
    const yearSpan = document.getElementById("footer-year");

    // Jika elemen ditemukan, isi dengan tahun sekarang
    if (yearSpan) {
        yearSpan.textContent = new Date().getFullYear();
    } else {
        console.warn("⚠️ Elemen dengan id 'footer-year' tidak ditemukan di halaman ini.");
    }
});
