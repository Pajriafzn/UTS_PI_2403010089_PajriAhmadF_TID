document.addEventListener('DOMContentLoaded', () => {
    const pajriBarScene = document.getElementById('pajri_bar_scene');
    const pajriBaristaTrack = document.getElementById('pajri_barista_track');
    const pajriBaristaImg = document.getElementById('pajri_barista_img');

    if (!pajriBarScene || !pajriBaristaTrack) return;

    let pajriTargetX = 0;
    let pajriCurrentX = 0;

    function pajriUpdateTargetFromClientX(clientX) {
        const rect = pajriBarScene.getBoundingClientRect();
        // Normalisasi posisi kursor dari -0.5 (kiri) sampai +0.5 (kanan)
        const relX = (clientX - rect.left) / rect.width - 0.5;

        // Batas pergeseran barista di sepanjang meja bar
        const maxShift = rect.width * 0.34;
        pajriTargetX = relX * maxShift * 2;

        // Ubah arah hadap karakter barista mengikuti arah kursor
        if (pajriBaristaImg) {
            if (pajriTargetX < pajriCurrentX - 4) {
                pajriBaristaImg.style.transform = 'scaleX(-1)';
            } else if (pajriTargetX > pajriCurrentX + 4) {
                pajriBaristaImg.style.transform = 'scaleX(1)';
            }
        }
    }

    // Deteksi pergerakan kursor mouse
    pajriBarScene.addEventListener('mousemove', (e) => {
        pajriUpdateTargetFromClientX(e.clientX);
    });

    // Dukungan sentuhan layar pada perangkat mobile
    pajriBarScene.addEventListener('touchmove', (e) => {
        if (e.touches.length > 0) {
            pajriUpdateTargetFromClientX(e.touches[0].clientX);
        }
    }, { passive: true });

    // Interpolasi halus (60fps) agar gerakan barista terasa natural
    function pajriAnimateBarista() {
        pajriCurrentX += (pajriTargetX - pajriCurrentX) * 0.08;
        pajriBaristaTrack.style.transform = `translateX(calc(-50% + ${pajriCurrentX}px))`;
        requestAnimationFrame(pajriAnimateBarista);
    }

    pajriAnimateBarista();
});