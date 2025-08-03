function describeMoisture(code) {
    return {
        "D+": "Sangat Kering 🌵",
        "D": "Kering 🌿",
        "N": "Normal 🌱",
        "W": "Basah 💧",
        "W+": "Sangat Basah 💦"
    }[code] || "-";
}

// Fungsi untuk mendapatkan nama zona waktu Indonesia berdasarkan offset
function getIndoTimeZoneName(offset) {
    if (offset === 420) return "WIB";
    if (offset === 480) return "WITA";
    if (offset === 540) return "WIT";
    return "Waktu Lokal";
}
// Fungsi untuk menambahkan nol di depan angka jika kurang dari 10
function pad(n) {
    return n < 10 ? '0' + n : n;
}
// Fungsi untuk memperbarui timestamp setiap detik
function updateTimestamp() {
    const now = new Date();
    const days = ['Minggu', 'Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat', 'Sabtu'];
    const months = ['Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni', 'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember'];
    // Mengambil nama hari, tanggal, bulan, tahun, jam, menit, dan detik
    const dayName = days[now.getDay()];
    const date = now.getDate();
    const month = months[now.getMonth()];
    const year = now.getFullYear();
    const hours = pad(now.getHours());
    const minutes = pad(now.getMinutes());
    const seconds = pad(now.getSeconds());
    // Menghitung offset zona waktu Indonesia
    const offsetMinutes = now.getTimezoneOffset();
    const zona = getIndoTimeZoneName(-offsetMinutes);
    // Membuat teks lengkap dengan format yang diinginkan
    const fullText = `${dayName}, ${date} ${month} ${year} — ${hours}:${minutes}:${seconds} ${zona}`;
    document.getElementById("currentTimestamp").textContent = fullText;
}
// Memperbarui timestamp setiap detik
setInterval(updateTimestamp, 1000);
updateTimestamp();

// Memberikan informasi kualitas tanah, rekomendasi tanaman, dan rekomendasi pengolahan tanah
function getRecommendation(ph, temp, moistureCategory) {
    let result = {
        quality: "",
        plants: [],
        tips: ""
    };
    if (ph < 5.5 && temp <= 15) {
        result.quality = "Sangat Asam - Beku";
        result.plants = ["(Tidak direkomendasikan)", "—", "—", "—", "—"];
        result.tips = "Tanah terlalu asam dan dingin untuk pertumbuhan optimal. Fokus pada perbaikan pH dan perlindungan tanah dari suhu ekstrem.";
    }
    else if (ph < 5.5 && temp > 15 && temp <= 21) {
        result.quality = "Sangat Asam - Dingin";
        result.plants = ["Kentang", "Wortel", "Kol", "Selada", "Stroberi"];
        result.tips = "Gunakan pupuk kandang matang, mulsa jerami, dan pertahankan kelembapan. Lakukan pengapuran untuk menaikkan pH secara bertahap.";
    }
    else if (ph < 5.5 && temp > 21 && temp <= 27) {
        result.quality = "Sangat Asam - Sejuk/Normal";
        result.plants = ["Talas", "Singkong", "Cabai Rawit", "Terung", "Pisang"];
        result.tips = "Perbaiki kesuburan tanah dengan kompos daun dan bahan organik. Hindari pupuk nitrogen amonium.";
    }
    else if (ph < 5.5 && temp > 27 && temp <= 32) {
        result.quality = "Sangat Asam - Hangat";
        result.plants = ["Jahe", "Kunyit", "Kacang Tanah", "Kangkung Darat", "Pepaya"];
        result.tips = "Gunakan mulsa organik untuk menjaga kelembapan dan cegah erosi. Tambahkan pupuk fosfat untuk mendukung akar.";
    }
    else if (ph < 5.5 && temp > 32 && temp <= 36) {
        result.quality = "Sangat Asam - Panas";
        result.plants = ["Singkong", "Sorgum", "Ubi Jalar", "Pisang", "Kacang Hijau"];
        result.tips = "Tingkatkan ketahanan tanah dengan biochar dan rotasi tanaman. Irigasi rutin penting di siang hari.";
    }
    else if (ph < 5.5 && temp > 36) {
        result.quality = "Sangat Asam - Sangat Panas";
        result.plants = ["Kacang Hijau", "Sorgum", "Jagung Lokal", "Ubi Jalar", "Pepaya"];
        result.tips = "Perbanyak bahan organik dalam tanah. Gunakan tanaman penutup tanah dan irigasi tetes saat suhu ekstrem.";
    }

    // --- Agak Asam (5.5–6.5) ---
    else if (ph >= 5.5 && ph <= 6.5 && temp <= 15) {
        result.quality = "Agak Asam - Beku";
        result.plants = ["Kentang", "Stroberi", "Wortel", "Brokoli", "Daun Bawang"];
        result.tips = "Gunakan kompos jerami dan pupuk hijau. Perlindungan tanaman dari embun beku sangat penting.";
    }
    else if (ph >= 5.5 && ph <= 6.5 && temp > 15 && temp <= 21) {
        result.quality = "Agak Asam - Dingin";
        result.plants = ["Kubis", "Wortel", "Selada", "Bawang Daun", "Seledri"];
        result.tips = "Pilih varietas tahan suhu rendah. Tambahkan pupuk organik untuk memperbaiki struktur tanah.";
    }
    else if (ph >= 5.5 && ph <= 6.5 && temp > 21 && temp <= 27) {
        result.quality = "Agak Asam - Sejuk/Normal";
        result.plants = ["Padi", "Kacang Tanah", "Cabai Merah", "Terung", "Pepaya"];
        result.tips = "Pertahankan drainase baik dan gunakan NPK seimbang. Perhatikan penyakit akar pada tanah asam.";
    }
    else if (ph >= 5.5 && ph <= 6.5 && temp > 27 && temp <= 32) {
        result.quality = "Agak Asam - Hangat";
        result.plants = ["Padi", "Tomat", "Jagung", "Buncis", "Pisang"];
        result.tips = "Gunakan rotasi tanaman dan hindari genangan. Berikan kompos daun dan pupuk kandang.";
    }
    else if (ph >= 5.5 && ph <= 6.5 && temp > 32 && temp <= 36) {
        result.quality = "Agak Asam - Panas";
        result.plants = ["Jagung", "Kacang Hijau", "Semangka", "Pepaya", "Singkong"];
        result.tips = "Gunakan sistem tanam larik dan atur waktu tanam pagi. Irigasi pada sore untuk efisiensi.";
    }
    else if (ph >= 5.5 && ph <= 6.5 && temp > 36) {
        result.quality = "Agak Asam - Sangat Panas";
        result.plants = ["Semangka", "Jagung Lokal", "Singkong", "Terung Belanda", "Sorgum"];
        result.tips = "Gunakan peneduh parsial dan pastikan tanah tetap gembur. Tambahkan mulsa untuk menahan panas.";
    }

    // --- Netral (6.6–7.5) ---
    else if (ph > 6.5 && ph <= 7.5 && temp <= 15) {
        result.quality = "Netral - Beku";
        result.plants = ["Kubis", "Kentang", "Wortel", "Stroberi", "Selada"];
        result.tips = "Gunakan green house atau pelindung plastik untuk menjaga suhu tanah. Tambahkan kompos cacing.";
    }
    else if (ph > 6.5 && ph <= 7.5 && temp > 15 && temp <= 21) {
        result.quality = "Netral - Dingin";
        result.plants = ["Wortel", "Brokoli", "Seledri", "Selada", "Bawang Daun"];
        result.tips = "Tanah netral mendukung hampir semua sayuran. Pertahankan sirkulasi udara dan kelembapan optimal.";
    }
    else if (ph > 6.5 && ph <= 7.5 && temp > 21 && temp <= 27) {
        result.quality = "Netral - Sejuk/Normal";
        result.plants = ["Padi", "Tomat", "Bayam", "Kacang Panjang", "Pisang"];
        result.tips = "Berikan pupuk kandang matang dan hindari pemadatan tanah. Sistem pengairan perlu stabil.";
    }
    else if (ph > 6.5 && ph <= 7.5 && temp > 27 && temp <= 32) {
        result.quality = "Netral - Hangat";
        result.plants = ["Padi", "Jagung", "Tomat", "Cabai", "Terung"];
        result.tips = "Sistem irigasi tetes direkomendasikan. Cek kelembapan tanah secara rutin saat musim kering.";
    }
    else if (ph > 6.5 && ph <= 7.5 && temp > 32 && temp <= 36) {
        result.quality = "Netral - Panas";
        result.plants = ["Semangka", "Melon", "Terung Belanda", "Kacang Hijau", "Singkong"];
        result.tips = "Gunakan penutup tanah dan tanaman sela. Hindari genangan air di sekitar akar.";
    }
    else if (ph > 6.5 && ph <= 7.5 && temp > 36) {
        result.quality = "Netral - Sangat Panas";
        result.plants = ["Jagung Lokal", "Semangka", "Terung", "Pepaya", "Singkong"];
        result.tips = "Pilih varietas tahan panas. Lakukan pemupukan mikro untuk menjaga produktivitas di suhu ekstrem.";
    }

    // --- Agak Basa (7.6–8.5) ---
    else if (ph > 7.5 && ph <= 8.5 && temp <= 15) {
        result.quality = "Agak Basa - Beku";
        result.plants = ["Kentang", "Brokoli", "Seledri", "Selada", "Wortel"];
        result.tips = "Gunakan pupuk yang bersifat sedikit asam. Tanam di tempat terlindung dan perhatikan pH air irigasi.";
    }
    else if (ph > 7.5 && ph <= 8.5 && temp > 15 && temp <= 21) {
        result.quality = "Agak Basa - Dingin";
        result.plants = ["Wortel", "Bawang Daun", "Kubis", "Daun Bawang", "Stroberi"];
        result.tips = "Tambahkan sulfur atau pupuk amonium sulfat untuk menurunkan pH. Gunakan air netral untuk irigasi.";
    }
    else if (ph > 7.5 && ph <= 8.5 && temp > 21 && temp <= 27) {
        result.quality = "Agak Basa - Sejuk/Normal";
        result.plants = ["Tomat", "Cabai", "Buncis", "Jagung Manis", "Terung"];
        result.tips = "Pantau unsur mikro seperti Fe dan Zn yang sulit diserap di tanah basa. Gunakan kompos fermentasi.";
    }
    else if (ph > 7.5 && ph <= 8.5 && temp > 27 && temp <= 32) {
        result.quality = "Agak Basa - Hangat";
        result.plants = ["Jagung", "Semangka", "Melon", "Kacang Tanah", "Singkong"];
        result.tips = "Hindari penambahan kapur. Rotasi tanaman dengan jenis daun dan buah untuk menjaga keseimbangan tanah.";
    }
    else if (ph > 7.5 && ph <= 8.5 && temp > 32 && temp <= 36) {
        result.quality = "Agak Basa - Panas";
        result.plants = ["Kacang Hijau", "Pepaya", "Semangka", "Terung Belanda", "Singkong"];
        result.tips = "Tambahkan mulsa dan hindari pupuk urea murni. Semprot daun dengan larutan mikro untuk mengatasi defisiensi.";
    }
    else if (ph > 7.5 && ph <= 8.5 && temp > 36) {
        result.quality = "Agak Basa - Sangat Panas";
        result.plants = ["Sorgum", "Semangka", "Pepaya", "Jagung Lokal", "Terung"];
        result.tips = "Gunakan tanaman peneduh sementara. Tingkatkan bahan organik dan perbaiki tekstur tanah dengan biochar.";
    }

    // --- Sangat Basa (> 8.5) ---
    else if (ph > 8.5 && temp <= 15) {
        result.quality = "Sangat Basa - Beku";
        result.plants = ["(Tidak disarankan)", "—", "—", "—", "—"];
        result.tips = "Tanah terlalu basa dan terlalu dingin untuk budidaya tanaman umum. Fokus pada perbaikan jangka panjang seperti penanaman tanaman penutup dan peningkatan bahan organik.";
    }
    else if (ph > 8.5 && temp > 15 && temp <= 21) {
        result.quality = "Sangat Basa - Dingin";
        result.plants = ["Kubis", "Wortel", "Seledri", "Selada", "Stroberi"];
        result.tips = "Gunakan pupuk dengan efek pengasaman (seperti sulfur) dan tambahkan kompos fermentasi. Irigasi dengan air netral.";
    }
    else if (ph > 8.5 && temp > 21 && temp <= 27) {
        result.quality = "Sangat Basa - Sejuk/Normal";
        result.plants = ["Bayam", "Terung", "Kacang Panjang", "Tomat", "Cabai"];
        result.tips = "Tambahkan bahan organik tinggi dan hindari kapur. Gunakan pupuk mikro seperti Zn dan Fe untuk mencegah defisiensi.";
    }
    else if (ph > 8.5 && temp > 27 && temp <= 32) {
        result.quality = "Sangat Basa - Hangat";
        result.plants = ["Singkong", "Jagung", "Terung", "Tomat", "Pepaya"];
        result.tips = "Lakukan rotasi tanaman dan gunakan kompos kaya sulfur. Perhatikan drainase untuk menghindari genangan akar.";
    }
    else if (ph > 8.5 && temp > 32 && temp <= 36) {
        result.quality = "Sangat Basa - Panas";
        result.plants = ["Jagung Lokal", "Kacang Hijau", "Terung Belanda", "Pepaya", "Semangka"];
        result.tips = "Tingkatkan retensi air dengan mulsa. Gunakan biochar untuk memperbaiki struktur tanah dan serapan nutrisi.";
    }
    else if (ph > 8.5 && temp > 36) {
        result.quality = "Sangat Basa - Sangat Panas";
        result.plants = ["Sorgum", "Jagung Lokal", "Semangka", "Terung", "Pepaya"];
        result.tips = "Gunakan varietas tahan panas. Aplikasikan irigasi tetes dan tanam legum untuk memperbaiki kualitas tanah dalam jangka panjang.";
    }

    if (moistureCategory === "D+") {
        result.quality += " - Sangat Kering";
        result.tips += " Kelembapan sangat rendah — gunakan irigasi tetes otomatis dan tambahkan mulsa jerami atau plastik untuk mengurangi evaporasi.";
    } else if (moistureCategory === "D") {
        result.quality += " - Kering";
        result.tips += " Kelembapan rendah — tingkatkan frekuensi penyiraman dan tambahkan kompos organik.";
    } else if (moistureCategory === "N") {
        result.quality += " - Kelembapan Normal";
        result.tips += " Kelembapan berada pada kisaran ideal. Pertahankan dengan penyiraman pagi hari dan tambahkan bahan organik untuk menyimpan air.";
    } else if (moistureCategory === "W") {
        result.quality += " - Basah";
        result.tips += " Kelembapan tinggi — tingkatkan drainase dan hindari penyiraman berlebih.";
    } else if (moistureCategory === "W+") {
        result.quality += " - Sangat Basah";
        result.tips += " Kelembapan sangat tinggi — perbaiki drainase dan hindari tanaman yang sensitif terhadap genangan.";
    }

    return result;
}

// Fungsi untuk mengolah nilai pH, temperatur, dan kelembapan
function generateRecommendation() {
    const ph = parseFloat(document.getElementById('ph').value);
    const temp = parseFloat(document.getElementById('temp').value);
    const moistureCategory = document.getElementById('moistureCategory').value;

    // Untuk memastikan bahwa tidak ada nilai parameter yang kosong
    if (isNaN(ph) || isNaN(temp) || moistureCategory === "") {
        alert("Mohon isi semua kolom: pH Tanah, Suhu, dan Kelembapan Tanah.");
        return;
    }

    const result = getRecommendation(ph, temp, moistureCategory);
    const output = document.getElementById('output');
    output.style.display = 'block';
    output.innerHTML = `
        <strong>Kualitas Tanah:</strong> ${result.quality}<br>
        <strong>Rekomendasi Tanaman:</strong> ${result.plants.join(", ")}<br>
        <strong>Tips:</strong> ${result.tips}
      `;
}

function getColor(ph) {
    if (ph < 5.5) return '#ff9999';
    if (ph <= 6.5) return '#ffe599';
    if (ph <= 7.5) return '#b6d7a8';
    if (ph <= 8.5) return '#a4c2f4';
    return '#d9d2e9';
}

// Fungsi untuk mengolah data berbasis CSV
function handleCSV() {
    const fileInput = document.getElementById('csvFile');
    const reader = new FileReader();
    reader.onload = function (e) {
        const lines = e.target.result.trim().split('\n');
        const data = lines.slice(1).map(line => {
            const [xStr, yStr, phStr, tempStr, moistureCategory] = line.split(',').map(v => v.trim());
            const x = parseInt(xStr) - 1;
            const y = parseInt(yStr) - 1;
            const ph = parseFloat(phStr);
            const temp = parseFloat(tempStr);
            return { x, y, ph, temp, moistureCategory, ...getRecommendation(ph, temp, moistureCategory) };
        });

        const maxX = Math.max(...data.map(d => d.x));
        const maxY = Math.max(...data.map(d => d.y));

        const gridHTML = data
            .sort((a, b) => a.y * (maxX + 1) + a.x - (b.y * (maxX + 1) + b.x))
            // Line awal untuk memberikan informasi cepat kondisi tanah ketika kursor digerakkan mendekati cell
            // Line 2 mengatur tentang tampilan informasi pH
            // Line 3 mengatur tentang tampilan informasi suhu
            // Line 4 mengatur tentang tampilan informasi kelembapan
            .map(cell => `
            <div class="cell" title="x:${cell.x}, y:${cell.y}, pH:${cell.ph}, ${cell.quality}" style="background:${getColor(cell.ph)}">
                <div style="font-size:15px; font-weight:bold;">${cell.ph.toFixed(1)}</div>
				        <div style="font-size:7.5px; margin-top:2px;">${cell.temp.toFixed(1)}° ${cell.temp <= 15 ? '❄️' : cell.temp <= 21 ? '🧥' : cell.temp <= 27 ? '🙂' : cell.temp <= 32 ? '🌤️' : cell.temp <= 36 ? '🔥' : '♨️'}</div>
                <div style="font-size:7.5px; margin-top:1px;">${describeMoisture(cell.moistureCategory)}</div>
            </div>`
            ).join('');

        const mapDiv = document.getElementById('map');
        let headerRow = '<div class="cell corner-cell"></div>';
        for (let x = 0; x <= maxX; x++) {
            headerRow += `<div class="cell sticky-top" style="font-weight:bold; background:#eee;">L${x + 1}</div>`;
        }

        let fullGrid = headerRow;

        for (let y = 0; y <= maxY; y++) {
            fullGrid += `<div class="cell sticky-left" style="font-weight:bold; background:#eee;">R${y + 1}</div>`;
            for (let x = 0; x <= maxX; x++) {
                const cell = data.find(d => d.x === x && d.y === y);
                if (cell) {
                    fullGrid += `
                <div class="cell" title="x:${cell.x + 1}, y:${cell.y + 1}, ${cell.quality}" style="background:${getColor(cell.ph)}">
			            <div style="font-size:15px; font-weight:bold;">${cell.ph.toFixed(1)}</div>
			            <div style="font-size:7.5px; margin-top:2px;">${cell.temp.toFixed(1)}° ${cell.temp <= 15 ? '❄️' : cell.temp <= 21 ? '🧥' : cell.temp <= 27 ? '🙂' : cell.temp <= 32 ? '🌤️' : cell.temp <= 36 ? '🔥' : '♨️'}</div>
			            <div style="font-size:7.5px; margin-top:1px;">${describeMoisture(cell.moistureCategory)}</div>
                </div>`;
                } else {
                    fullGrid += `<div class="cell" style="background:#ccc;"></div>`;
                }
            }
        }

        mapDiv.innerHTML = `
		        <div style="overflow: auto; max; max-width: 100%;">
		          <div class="grid" style="grid-template-columns: repeat(${maxX + 2}, 50px);">
		          ${fullGrid}
		          </div>
		        </div>`;

        // Menampilkan ringkasan kualitas tanah
        const groupedByQuality = {};
        data.forEach(d => {
            if (!groupedByQuality[d.quality]) groupedByQuality[d.quality] = [];
            groupedByQuality[d.quality].push(...d.plants);
        });

        // Menghitung jumlah setiap kualitas tanah
        const qualityCount = {};
        data.forEach(d => {
            qualityCount[d.quality] = (qualityCount[d.quality] || 0) + 1;
        });
        const topQuality = Object.entries(qualityCount).sort((a, b) => b[1] - a[1])[0][0];

        // Menghitung jumlah tanaman di kualitas tanah tertinggi
        const plantCountInTopQuality = {};
        groupedByQuality[topQuality].forEach(p => {
            plantCountInTopQuality[p] = (plantCountInTopQuality[p] || 0) + 1;
        });
        const sortedPlantsInTop = Object.entries(plantCountInTopQuality).sort((a, b) => b[1] - a[1]);

        // Ambil 10 kualitas tanah teratas berdasarkan jumlah kemunculan
        const top10Qualities = Object.entries(qualityCount)
            .sort((a, b) => b[1] - a[1])
            .slice(0, 10)
            .map(([quality]) => quality);

        // Gabungkan semua tanaman dari 10 kualitas tanah teratas
        let combinedPlants = [];
        top10Qualities.forEach(quality => {
            combinedPlants.push(...(groupedByQuality[quality] || []));
        });

        // Hitung frekuensi kemunculan setiap tanaman
        const plantFrequency = {};
        combinedPlants.forEach(plant => {
            plantFrequency[plant] = (plantFrequency[plant] || 0) + 1;
        });

        // Urutkan tanaman berdasarkan frekuensi
        const topPlantsOverall = Object.entries(plantFrequency)
            .sort((a, b) => b[1] - a[1])
            .slice(0, 5)
            .map(([plant]) => plant);

        // Menampilkan ringkasan
        const summary = document.getElementById('summary');
        summary.style.display = 'block';
        const total = data.length;
        const qualityOrder = [
            // Sangat Asam
            "Sangat Asam - Beku - Sangat Kering", "Sangat Asam - Beku - Kering", "Sangat Asam - Beku - Kelembapan Normal", "Sangat Asam - Beku - Basah", "Sangat Asam - Beku - Sangat Basah",
            "Sangat Asam - Dingin - Sangat Kering", "Sangat Asam - Dingin - Kering", "Sangat Asam - Dingin - Kelembapan Normal", "Sangat Asam - Dingin - Basah", "Sangat Asam - Dingin - Sangat Basah",
            "Sangat Asam - Sejuk/Normal - Sangat Kering", "Sangat Asam - Sejuk/Normal - Kering", "Sangat Asam - Sejuk/Normal - Kelembapan Normal", "Sangat Asam - Sejuk/Normal - Basah", "Sangat Asam - Sejuk/Normal - Sangat Basah",
            "Sangat Asam - Hangat - Sangat Kering", "Sangat Asam - Hangat - Kering", "Sangat Asam - Hangat - Kelembapan Normal", "Sangat Asam - Hangat - Basah", "Sangat Asam - Hangat - Sangat Basah",
            "Sangat Asam - Panas - Sangat Kering", "Sangat Asam - Panas - Kering", "Sangat Asam - Panas - Kelembapan Normal", "Sangat Asam - Panas - Basah", "Sangat Asam - Panas - Sangat Basah",
            "Sangat Asam - Sangat Panas - Sangat Kering", "Sangat Asam - Sangat Panas - Kering", "Sangat Asam - Sangat Panas - Kelembapan Normal", "Sangat Asam - Sangat Panas - Basah", "Sangat Asam - Sangat Panas - Sangat Basah",

            // Agak Asam
            "Agak Asam - Beku - Sangat Kering", "Agak Asam - Beku - Kering", "Agak Asam - Beku - Kelembapan Normal", "Agak Asam - Beku - Basah", "Agak Asam - Beku - Sangat Basah",
            "Agak Asam - Dingin - Sangat Kering", "Agak Asam - Dingin - Kering", "Agak Asam - Dingin - Kelembapan Normal", "Agak Asam - Dingin - Basah", "Agak Asam - Dingin - Sangat Basah",
            "Agak Asam - Sejuk/Normal - Sangat Kering", "Agak Asam - Sejuk/Normal - Kering", "Agak Asam - Sejuk/Normal - Kelembapan Normal", "Agak Asam - Sejuk/Normal - Basah", "Agak Asam - Sejuk/Normal - Sangat Basah",
            "Agak Asam - Hangat - Sangat Kering", "Agak Asam - Hangat - Kering", "Agak Asam - Hangat - Kelembapan Normal", "Agak Asam - Hangat - Basah", "Agak Asam - Hangat - Sangat Basah",
            "Agak Asam - Panas - Sangat Kering", "Agak Asam - Panas - Kering", "Agak Asam - Panas - Kelembapan Normal", "Agak Asam - Panas - Basah", "Agak Asam - Panas - Sangat Basah",
            "Agak Asam - Sangat Panas - Sangat Kering", "Agak Asam - Sangat Panas - Kering", "Agak Asam - Sangat Panas - Kelembapan Normal", "Agak Asam - Sangat Panas - Basah", "Agak Asam - Sangat Panas - Sangat Basah",

            // Netral
            "Netral - Beku - Sangat Kering", "Netral - Beku - Kering", "Netral - Beku - Kelembapan Normal", "Netral - Beku - Basah", "Netral - Beku - Sangat Basah",
            "Netral - Dingin - Sangat Kering", "Netral - Dingin - Kering", "Netral - Dingin - Kelembapan Normal", "Netral - Dingin - Basah", "Netral - Dingin - Sangat Basah",
            "Netral - Sejuk/Normal - Sangat Kering", "Netral - Sejuk/Normal - Kering", "Netral - Sejuk/Normal - Kelembapan Normal", "Netral - Sejuk/Normal - Basah", "Netral - Sejuk/Normal - Sangat Basah",
            "Netral - Hangat - Sangat Kering", "Netral - Hangat - Kering", "Netral - Hangat - Kelembapan Normal", "Netral - Hangat - Basah", "Netral - Hangat - Sangat Basah",
            "Netral - Panas - Sangat Kering", "Netral - Panas - Kering", "Netral - Panas - Kelembapan Normal", "Netral - Panas - Basah", "Netral - Panas - Sangat Basah",
            "Netral - Sangat Panas - Sangat Kering", "Netral - Sangat Panas - Kering", "Netral - Sangat Panas - Kelembapan Normal", "Netral - Sangat Panas - Basah", "Netral - Sangat Panas - Sangat Basah",

            // Agak Basa
            "Agak Basa - Beku - Sangat Kering", "Agak Basa - Beku - Kering", "Agak Basa - Beku - Kelembapan Normal", "Agak Basa - Beku - Basah", "Agak Basa - Beku - Sangat Basah",
            "Agak Basa - Dingin - Sangat Kering", "Agak Basa - Dingin - Kering", "Agak Basa - Dingin - Kelembapan Normal", "Agak Basa - Dingin - Basah", "Agak Basa - Dingin - Sangat Basah",
            "Agak Basa - Sejuk/Normal - Sangat Kering", "Agak Basa - Sejuk/Normal - Kering", "Agak Basa - Sejuk/Normal - Kelembapan Normal", "Agak Basa - Sejuk/Normal - Basah", "Agak Basa - Sejuk/Normal - Sangat Basah",
            "Agak Basa - Hangat - Sangat Kering", "Agak Basa - Hangat - Kering", "Agak Basa - Hangat - Kelembapan Normal", "Agak Basa - Hangat - Basah", "Agak Basa - Hangat - Sangat Basah",
            "Agak Basa - Panas - Sangat Kering", "Agak Basa - Panas - Kering", "Agak Basa - Panas - Kelembapan Normal", "Agak Basa - Panas - Basah", "Agak Basa - Panas - Sangat Basah",
            "Agak Basa - Sangat Panas - Sangat Kering", "Agak Basa - Sangat Panas - Kering", "Agak Basa - Sangat Panas - Kelembapan Normal", "Agak Basa - Sangat Panas - Basah", "Agak Basa - Sangat Panas - Sangat Basah",

            // Sangat Basa
            "Sangat Basa - Beku - Sangat Kering", "Sangat Basa - Beku - Kering", "Sangat Basa - Beku - Kelembapan Normal", "Sangat Basa - Beku - Basah", "Sangat Basa - Beku - Sangat Basah",
            "Sangat Basa - Dingin - Sangat Kering", "Sangat Basa - Dingin - Kering", "Sangat Basa - Dingin - Kelembapan Normal", "Sangat Basa - Dingin - Basah", "Sangat Basa - Dingin - Sangat Basah",
            "Sangat Basa - Sejuk/Normal - Sangat Kering", "Sangat Basa - Sejuk/Normal - Kering", "Sangat Basa - Sejuk/Normal - Kelembapan Normal", "Sangat Basa - Sejuk/Normal - Basah", "Sangat Basa - Sejuk/Normal - Sangat Basah",
            "Sangat Basa - Hangat - Sangat Kering", "Sangat Basa - Hangat - Kering", "Sangat Basa - Hangat - Kelembapan Normal", "Sangat Basa - Hangat - Basah", "Sangat Basa - Hangat - Sangat Basah",
            "Sangat Basa - Panas - Sangat Kering", "Sangat Basa - Panas - Kering", "Sangat Basa - Panas - Kelembapan Normal", "Sangat Basa - Panas - Basah", "Sangat Basa - Panas - Sangat Basah",
            "Sangat Basa - Sangat Panas - Sangat Kering", "Sangat Basa - Sangat Panas - Kering", "Sangat Basa - Sangat Panas - Kelembapan Normal", "Sangat Basa - Sangat Panas - Basah", "Sangat Basa - Sangat Panas - Sangat Basah"
        ];

        // Menghitung persentase setiap kualitas tanah
        const qualityPercentages = '<ul>' +
            qualityOrder
                .filter(q => qualityCount[q])
                .map(q => `<li>${q}: ${(qualityCount[q] / total * 100).toFixed(1)}%</li>`)
                .join('') +
            '</ul>';

        // Menampilkan ringkasan kualitas tanah
        summary.innerHTML = `
            <strong>Kualitas Tanah Dominan:</strong> ${topQuality} (${qualityCount[topQuality]} titik)<br>
            <strong>Rekomendasi Tanaman Utama:</strong> ${sortedPlantsInTop[0][0]}<br>
            <strong>Rekomendasi Tanaman Lainnya:</strong> ${sortedPlantsInTop.slice(1, 5).map(p => p[0]).join(', ')}<br><br>
            <strong>Rekomendasi Tanaman Terbaik Berdasarkan 10 Kualitas Tanah Dominan:</strong><br>${topPlantsOverall.join(', ')}<br><br>
            <strong>Distribusi Kualitas Tanah:</strong><br>${qualityPercentages}
          `;

        // Menampilkan grafik persentase kualitas tanah
        const ctx = document.getElementById('qualityChart').getContext('2d');
        qualityChart.style.display = 'block';
        // Buat array { label, value } dari qualityCount
        const qualityArray = Object.entries(qualityCount)
            .map(([label, count]) => ({
                label,
                value: parseFloat(((count / total) * 100).toFixed(1))
            }))
            .sort((a, b) => b.value - a.value) // urutkan dari tertinggi
            .slice(0, 10); // ambil 10 teratas

        // Buat labels dan values untuk grafik
        const labels = qualityArray.map(item => item.label);
        const values = qualityArray.map(item => item.value);

        const trueMax = Math.max(...values);
        const roundedMax = Math.ceil((trueMax + 0.001) / 5) * 5;
        const maxVal = Math.min(roundedMax, 100);
        const barColors = values.map(v => v === trueMax ? '#4CAF50' : '#d3d3d3');

        if (window.qualityChart && typeof window.qualityChart.destroy === 'function') {
            window.qualityChart.destroy();
        }

        window.qualityChart = new Chart(ctx, {
            type: 'bar',
            data: {
                labels: labels,
                datasets: [{
                    label: 'Persentase Kualitas Tanah (%)',
                    data: values,
                    backgroundColor: barColors,
                    borderColor: barColors,
                    borderWidth: 1
                }]
            },
            options: {
                responsive: true,
                plugins: {
                    datalabels: {
                        anchor: 'end',
                        align: 'end',
                        formatter: (value) => parseFloat(value).toFixed(1) + '%',
                    },
                    legend: { display: false },
                    tooltip: {
                        callbacks: {
                            label: function (context) {
                                return context.parsed.y;
                            }
                        }
                    }
                },
                scales: {
                    y: {
                        beginAtZero: true,
                        max: maxVal,
                        title: {
                            display: true,
                            text: 'Persentase (%)'
                        },
                        ticks: {
                            callback: function (value) {
                                return value;
                            }
                        }
                    },
                    x: {
                        ticks: {
                            maxRotation: 90,
                            minRotation: 90,
                            autoSkip: false,
                            font: { size: 10 }
                        }
                    }
                }

            },
            plugins: [ChartDataLabels]
        });
    }
    reader.readAsText(fileInput.files[0]);
}

// Fungsi Map 
let polygonMap, polygonLayer, markers = [];

function parseLatLng(input) {
    const parts = input.split(';').map(p => parseFloat(p.trim()));
    if (parts.length !== 2 || parts.some(isNaN)) return null;
    return parts;
}

// Fungsi untuk membuat marker dengan label
function createLabelMarker(lat, lng, label) {
    return L.marker([lat, lng], {
        icon: L.divIcon({
            className: 'custom-label',
            html: `
              <div style="
                width: 18px;
                height: 18px;
                background: #FF0000;
                border-radius: 50%;
                color: white;
                font-weight: bold;
                display: flex;
                align-items: center;
                justify-content: center;
                font-size: 11px;
                border: 1px solid #ffffff;
                box-shadow: 0 0 3px rgba(0,0,0,0.3);
                ">${label}
              </div>`,
            iconSize: [18, 18],
            iconAnchor: [9, 9]
        })
    });
}

// Fungsi untuk menampilkan zona poligon
function showPolygonZoneCompact() {
    const A = parseLatLng(document.getElementById('pointA').value);
    const B = parseLatLng(document.getElementById('pointB').value);
    const C = parseLatLng(document.getElementById('pointC').value);
    const D = parseLatLng(document.getElementById('pointD').value);

    // Validasi input
    if (!A || !B || !C || !D) {
        alert("Format salah. Gunakan format: lat; long (misal: -7.9828; 112.6260)");
        return;
    }
    // Memunculkan peta
    document.getElementById("polygonMap").style.display = "block";

    // Inisialisasi peta jika belum ada
    const polygonPoints = [A, B, C, D];
    const centerLat = (A[0] + B[0] + C[0] + D[0]) / 4;
    const centerLng = (A[1] + B[1] + C[1] + D[1]) / 4;

    // Inisialisasi atau reset peta
    if (!polygonMap) {
        polygonMap = L.map('polygonMap').setView([centerLat, centerLng], 22);
        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '&copy; OpenStreetMap contributors',
            crossOrigin: true
        }).addTo(polygonMap);
    } else {
        polygonMap.setView([centerLat, centerLng], 19);
        if (polygonLayer) polygonLayer.remove();
    }

    // Tambahkan polygon ke peta
    polygonLayer = L.polygon(polygonPoints, {
        color: "#FF0000",
        fillColor: "#FF0000",
        fillOpacity: 0.5
    }).addTo(polygonMap);

    // Hapus marker lama
    markers.forEach(m => m.remove());
    markers = [];

    // Tambahkan marker A–D
    markers.push(createLabelMarker(...A, "A").addTo(polygonMap));
    markers.push(createLabelMarker(...B, "B").addTo(polygonMap));
    markers.push(createLabelMarker(...C, "C").addTo(polygonMap));
    markers.push(createLabelMarker(...D, "D").addTo(polygonMap));

    // Tambahkan marker tengah
    polygonMap.fitBounds(polygonLayer.getBounds());

    async function fetchLocationDetails(lat, lng) {
        try {
            const response = await fetch(`https://nominatim.openstreetmap.org/reverse?lat=${lat}&lon=${lng}&format=json`);
            const data = await response.json();
            const address = data.address;
            const jalan = address.road || "-";
            const kelurahan = address.suburb || address.village || "-";
            const kecamatan = address.city_district || "-";
            const kota = address.city || address.town || address.municipality || "-";
            const provinsi = address.state || "-";
            const kodepos = address.postcode || "-";
            const negara = address.country || "-";
            return {
                jalan, kelurahan, kecamatan, kota, provinsi, kodepos, negara
            };
        } catch (err) {
            console.error("Gagal mengambil data lokasi:", err);
            return null;
        }
    }

    async function getElevation(lat, lng) {
        try {
            const target = `https://api.opentopodata.org/v1/srtm90m?locations=${lat},${lng}`;
            const proxyUrl = `https://api.allorigins.win/raw?url=${encodeURIComponent(target)}`;

            const response = await fetch(proxyUrl);
            const data = await response.json();
            return data.results[0].elevation;
        } catch (error) {
            console.error("Gagal mengambil data elevasi via proxy publik:", error);
            return null;
        }
    }


    // Tampilkan info lokasi berdasarkan titik tengah
    (async () => {
        const info = await fetchLocationDetails(centerLat, centerLng);
        const elevation = await getElevation(centerLat, centerLng);

        if (info) {
            const infoDiv = document.getElementById("locationInfo");
            infoDiv.style.display = 'block';
            infoDiv.innerHTML = `
          <strong>Lokasi Survei:</strong><br>
          ${info.jalan},
          Kelurahan/Desa ${info.kelurahan},
          Kecamatan ${info.kecamatan},
          Kota/Kabupaten ${info.kota},
          Provinsi ${info.provinsi},
          ${info.kodepos},
          ${info.negara}.
        `;

            const elevBox = document.getElementById("elevationLegend");
            elevBox.style.display = 'block';
            elevBox.innerHTML = elevation !== null
                ? `<strong> 🏔️ Ketinggian:</strong> ${elevation} m dpl`
                : `<strong> 🏔️ Ketinggian:</strong> Tidak tersedia`;
        }
    })()
};


// Fungsi untuk mengunduh laporan PDF
document.addEventListener('keydown', function (event) {
    if (event.ctrlKey && event.key.toLowerCase() === 'p') {
        event.preventDefault(); // Cegah print default browser
        window.print();         // Jalankan print dengan CSS @media print aktif
    }
});