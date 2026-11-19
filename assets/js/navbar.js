document.addEventListener('DOMContentLoaded', () => {
    const pajriHeader = document.getElementById('pajri_header');
    const pajriMobileBtn = document.getElementById('pajri_mobile_btn');
    const pajriNavMenu = document.getElementById('pajri_nav_menu');

    // Ubah navbar menjadi bentuk bubble kaca buram saat halaman di-scroll ke bawah
    function pajriHandleNavbarScroll() {
        if (!pajriHeader) return;
        if (window.scrollY > 45) {
            pajriHeader.classList.add('pajri_nav_bubble');
        } else {
            pajriHeader.classList.remove('pajri_nav_bubble');
        }
    }

    window.addEventListener('scroll', pajriHandleNavbarScroll);
    pajriHandleNavbarScroll();

    // Buka/tutup menu navigasi pada layar smartphone
    if (pajriMobileBtn && pajriNavMenu) {
        pajriMobileBtn.addEventListener('click', () => {
            pajriNavMenu.classList.toggle('pajri_menu_open');
        });
    }
});