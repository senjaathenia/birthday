document.getElementById('showWish').addEventListener('click', function () {
    document.getElementById('mainContainer').style.display = 'none';
    document.getElementById('wishSection').style.display = 'block';
    startBalloons();
});

document.getElementById('backButton').addEventListener('click', function () {
    document.getElementById('wishSection').style.display = 'none';
    document.getElementById('mainContainer').style.display = 'block';
    clearBalloons(); // Hapus semua balon saat kembali ke halaman utama
});

function startBalloons() {
    const balloonsContainer = document.getElementById('balloons');
    const colors = ['brown-light', 'brown-dark']; // Dua warna balon
    const interval = setInterval(() => {
        for (let i = 0; i < 5; i++) { // Tambahkan 5 balon sekaligus setiap interval
            const balloon = document.createElement('div');
            balloon.classList.add('balloon', colors[Math.floor(Math.random() * colors.length)]); // Pilih warna acak
            balloon.style.left = `${Math.random() * 100}%`; // Posisi horizontal acak
            balloon.style.animationDuration = `${5 + Math.random() * 3}s`; // Durasi animasi acak
            balloonsContainer.appendChild(balloon);

            // Hapus balon setelah animasi selesai
            setTimeout(() => {
                balloon.remove();
            }, 8000);
        }
    }, 300); // Setiap 300ms, tambahkan balon

    // Simpan interval ID untuk menghapus balon saat kembali
    balloonsContainer.setAttribute('data-interval-id', interval);
}

function clearBalloons() {
    const balloonsContainer = document.getElementById('balloons');
    const intervalId = balloonsContainer.getAttribute('data-interval-id');
    if (intervalId) {
        clearInterval(intervalId); // Hentikan interval
    }
    balloonsContainer.innerHTML = ''; // Hapus semua balon yang ada
}

// Konfeti
const canvas = document.getElementById('confettiCanvas');
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let confetti = [];
const colors = ['#FF9AA2', '#FFB7B2', '#FFDAC1', '#E2F0CB', '#B5EAD7', '#C7CEEA'];

class ConfettiParticle {
    constructor(x, y, r, dx, dy, color) {
        this.x = x;
        this.y = y;
        this.r = r;
        this.dx = dx;
        this.dy = dy;
        this.color = color;
    }

    draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.r, 0, Math.PI * 2, false);
        ctx.fillStyle = this.color;
        ctx.fill();
    }

    update() {
        this.y += this.dy;
        this.x += this.dx;

        // Reset posisi jika keluar dari layar
        if (this.y > canvas.height) {
            this.y = -10;
            this.x = Math.random() * canvas.width;
        }

        if (this.x > canvas.width || this.x < 0) {
            this.dx = -this.dx; // Memantul horizontal
        }
        this.draw();
    }
}

function initConfetti() {
    confetti = [];
    for (let i = 0; i < 100; i++) {
        const x = Math.random() * canvas.width;
        const y = Math.random() * canvas.height;
        const r = Math.random() * 5 + 2; // Ukuran partikel
        const dx = (Math.random() - 0.5) * 2; // Kecepatan horizontal
        const dy = Math.random() * 3 + 1; // Kecepatan vertikal
        const color = colors[Math.floor(Math.random() * colors.length)];
        confetti.push(new ConfettiParticle(x, y, r, dx, dy, color));
    }
}

function animateConfetti() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    confetti.forEach((particle) => particle.update());
    requestAnimationFrame(animateConfetti);
}

// Inisialisasi dan animasi
initConfetti();
animateConfetti();

// Update ukuran kanvas saat jendela diubah ukurannya
window.addEventListener('resize', () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    initConfetti();
});
document.addEventListener('DOMContentLoaded', () => {
    const birthdaySong = document.getElementById('birthdaySong');

    const tryPlay = () => {
        birthdaySong.play().then(() => {
            console.log('Audio berhasil diputar.');
        }).catch((error) => {
            console.error('Autoplay dicegah:', error);
        });
    };

    // Coba memutar audio saat halaman dimuat
    tryPlay();

    // Pastikan audio diputar setelah pengguna berinteraksi
    document.body.addEventListener('click', () => {
        birthdaySong.play();
        console.log('Audio diputar setelah interaksi.');
    });
});
document.body.addEventListener('click', () => {
    const birthdaySong = document.getElementById('birthdaySong');
    birthdaySong.play().then(() => {
        console.log('Audio diputar setelah klik pengguna.');
    }).catch((error) => {
        console.error('Gagal memutar audio:', error);
    });
});
