document.addEventListener('DOMContentLoaded', () => {

    // =========================================================
    // 1. FILTER KATEGORI MENU KOPI & JIWA TOAST (menu.html)
    // =========================================================
    const pajriFilterBtns = document.querySelectorAll('.pajri_filter_btn');
    const pajriFilterItems = document.querySelectorAll('.pajri_filter_item');

    if (pajriFilterBtns.length > 0 && pajriFilterItems.length > 0) {
        pajriFilterBtns.forEach((btn) => {
            btn.addEventListener('click', () => {
                pajriFilterBtns.forEach((b) => b.classList.remove('pajri_filter_active'));
                btn.classList.add('pajri_filter_active');

                const selectedCategory = btn.getAttribute('data-filter');

                pajriFilterItems.forEach((item) => {
                    const itemCategory = item.getAttribute('data-category');
                    if (selectedCategory === 'all' || itemCategory === selectedCategory) {
                        item.classList.remove('pajri_hidden_item');
                    } else {
                        item.classList.add('pajri_hidden_item');
                    }
                });
            });
        });
    }

    // =========================================================
    // 2. SALIN KODE VOUCHER PROMO (promo.html)
    // =========================================================
    const pajriCopyBtns = document.querySelectorAll('.pajri_copy_btn');

    if (pajriCopyBtns.length > 0) {
        pajriCopyBtns.forEach((btn) => {
            btn.addEventListener('click', () => {
                const voucherCode = btn.getAttribute('data-code');
                if (!voucherCode) return;

                if (navigator.clipboard) {
                    navigator.clipboard.writeText(voucherCode);
                }

                const originalText = btn.textContent;
                btn.textContent = '✓ Tersalin!';
                setTimeout(() => {
                    btn.textContent = originalText;
                }, 2000);
            });
        });
    }

    // =========================================================
    // 3. PENCARIAN LOKASI OUTLET REAL-TIME (outlet.html)
    // =========================================================
    const pajriOutletSearch = document.getElementById('pajri_outlet_search');
    const pajriOutletCards = document.querySelectorAll('.pajri_outlet_card');

    if (pajriOutletSearch && pajriOutletCards.length > 0) {
        pajriOutletSearch.addEventListener('input', (e) => {
            const keyword = e.target.value.toLowerCase().trim();

            pajriOutletCards.forEach((card) => {
                const contentText = card.textContent.toLowerCase();
                if (contentText.includes(keyword)) {
                    card.classList.remove('pajri_hidden_item');
                } else {
                    card.classList.add('pajri_hidden_item');
                }
            });
        });
    }

    // =========================================================
    // 4. VALIDASI & SIMULASI KIRIM PESAN KONTAK (contact.html)
    // =========================================================
    const pajriContactForm = document.getElementById('pajri_contact_form');
    const pajriFormAlert = document.getElementById('pajri_form_alert');

    if (pajriContactForm && pajriFormAlert) {
        pajriContactForm.addEventListener('submit', (e) => {
            e.preventDefault();

            const namaUser = document.getElementById('pajri_nama').value.trim();
            const topikPesan = document.getElementById('pajri_topik').value;

            pajriFormAlert.className = 'pajri_alert_success';
            pajriFormAlert.textContent = `Terima kasih, ${namaUser}! Pesan Anda terkait "${topikPesan}" telah terkirim ke tim Jiwa Care.`;

            pajriContactForm.reset();
        });
    }

    // =========================================================
    // 5. ANIMASI HITUNG NAIK ANGKA STATISTIK (tentang.html)
    // =========================================================
    const pajriCounters = document.querySelectorAll('.pajri_counter');

    if (pajriCounters.length > 0) {
        const pajriRunCounter = (el) => {
            const target = parseInt(el.getAttribute('data-target'), 10);
            const suffix = el.getAttribute('data-suffix') || '';
            const duration = 1800; // Durasi 1.8 detik
            const startTime = performance.now();

            const pajriUpdateNumber = (currentTime) => {
                const elapsed = currentTime - startTime;
                const progress = Math.min(elapsed / duration, 1);
                // Kurva ease-out agar angka melambat halus tepat saat mencapai target
                const easeOut = 1 - Math.pow(1 - progress, 3);
                const currentVal = Math.floor(easeOut * target);

                el.textContent = currentVal + suffix;

                if (progress < 1) {
                    requestAnimationFrame(pajriUpdateNumber);
                } else {
                    el.textContent = target + suffix;
                }
            };

            requestAnimationFrame(pajriUpdateNumber);
        };

        // Otomatis jalan saat halaman dibuka dan kotak statistik terlihat di layar
        if ('IntersectionObserver' in window) {
            const pajriObserver = new IntersectionObserver((entries, observer) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        pajriRunCounter(entry.target);
                        observer.unobserve(entry.target);
                    }
                });
            }, { threshold: 0.2 });

            pajriCounters.forEach((counter) => pajriObserver.observe(counter));
        } else {
            pajriCounters.forEach((counter) => pajriRunCounter(counter));
        }
    }

    // =========================================================
    // 6. INTERAKSI SENTUH OBJEK BAR KOPI (KHUSUS LAYAR SENTUH)
    // =========================================================
    const pajriObjectZones = document.querySelectorAll('.pajri_object_zone');

    if (pajriObjectZones.length > 0) {
        const isTouchDevice = window.matchMedia('(pointer: coarse)').matches;

        if (isTouchDevice) {
            pajriObjectZones.forEach((zone) => {
                zone.addEventListener('click', (e) => {
                    if (!zone.classList.contains('pajri_zone_active')) {
                        e.preventDefault();
                        pajriObjectZones.forEach((z) => z.classList.remove('pajri_zone_active'));
                        zone.classList.add('pajri_zone_active');
                    }
                });
            });

            document.addEventListener('click', (e) => {
                if (!e.target.closest('.pajri_object_zone')) {
                    pajriObjectZones.forEach((z) => z.classList.remove('pajri_zone_active'));
                }
            });
        }
    }
});