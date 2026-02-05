// Week 4 question bank - Data Visualization with Python
// Exposes: window.questionPoolweek4

window.questionPoolweek4 = [
    // TIPE A: PILIHAN GANDA (SINGLE CHOICE)
    {
        type: 'mc',
        question: 'Jenis plot manakah yang paling efektif untuk membandingkan rata-rata nilai antar kategori diskret?',
        options: [
            { text: 'Line Chart', correct: false },
            { text: 'Scatter Plot', correct: false },
            { text: 'Bar Chart', correct: true },
            { text: 'Heatmap', correct: false }
        ],
        rationale: 'Bar Chart adalah pilihan terbaik untuk membandingkan nilai diskret antar kategori karena mudah dibaca dan membandingkan tinggi batang.'
    },
    {
        type: 'mc',
        question: 'Dalam library Seaborn, parameter apa yang digunakan untuk membedakan kategori data menggunakan warna?',
        options: [
            { text: 'color', correct: false },
            { text: 'style', correct: false },
            { text: 'size', correct: false },
            { text: 'hue', correct: true }
        ],
        rationale: 'Parameter "hue" dalam Seaborn digunakan untuk membedakan kategori berdasarkan warna.'
    },
    {
        type: 'mc',
        question: 'Grafik yang paling tepat digunakan untuk melihat tren harga saham dari waktu ke waktu adalah...',
        options: [
            { text: 'Histogram', correct: false },
            { text: 'Line Chart', correct: true },
            { text: 'Box Plot', correct: false },
            { text: 'Violin Plot', correct: false }
        ],
        rationale: 'Line Chart sangat cocok untuk menampilkan tren data sepanjang waktu karena memudahkan melihat pola dan perubahan.'
    },
    {
        type: 'mc',
        question: 'Fungsi dalam pandas yang harus dipanggil sebelum membuat Heatmap korelasi adalah...',
        options: [
            { text: '.describe()', correct: false },
            { text: '.info()', correct: false },
            { text: '.corr()', correct: true },
            { text: '.group_by()', correct: false }
        ],
        rationale: 'Fungsi .corr() menghitung korelasi antar variabel numerik yang diperlukan untuk membuat heatmap korelasi.'
    },
    {
        type: 'mc',
        question: 'Manakah dari pilihan berikut yang merupakan karakteristik utama dari Scatter Plot?',
        options: [
            { text: 'Menampilkan statistik median dan kuartil.', correct: false },
            { text: 'Menampilkan distribusi frekuensi data tunggal.', correct: false },
            { text: 'Menampilkan hubungan (korelasi) antara dua variabel numerik.', correct: true },
            { text: 'Menampilkan tren data secara kontinu.', correct: false }
        ],
        rationale: 'Scatter Plot digunakan untuk menunjukkan hubungan dan korelasi antara dua variabel numerik melalui titik-titik data.'
    },

    // TIPE B: PILIHAN GANDA KOMPLEKS (MULTIPLE CHOICE)
    {
        type: 'multi',
        question: 'Manakah dari jenis plot berikut yang digunakan untuk melihat DISTRIBUSI data? (Pilih semua yang benar)',
        options: [
            { text: 'Scatter Plot', correct: false },
            { text: 'Histogram', correct: true },
            { text: 'Box Plot', correct: true },
            { text: 'Violin Plot', correct: true }
        ],
        rationale: 'Histogram, Box Plot, dan Violin Plot semuanya digunakan untuk visualisasi distribusi data. Scatter Plot digunakan untuk menunjukkan hubungan antar variabel.'
    },
    {
        type: 'multi',
        question: 'Elemen apa saja yang harus ada agar sebuah visualisasi disebut "Self-Explanatory"? (Pilih semua yang benar)',
        options: [
            { text: 'Judul yang jelas', correct: true },
            { text: 'Label pada sumbu X dan Y', correct: true },
            { text: 'Background yang penuh warna', correct: false },
            { text: 'Legenda (jika menggunakan kategori)', correct: true }
        ],
        rationale: 'Visualisasi self-explanatory harus memiliki judul jelas, label sumbu, dan legenda jika diperlukan. Background berwarna tidak wajib dan bisa mengganggu fokus pada data.'
    },
    {
        type: 'multi',
        question: 'Apa keunggulan Seaborn jika dibandingkan dengan Matplotlib murni? (Pilih semua yang benar)',
        options: [
            { text: 'Terintegrasi langsung dengan struktur data Pandas (DataFrame).', correct: true },
            { text: 'Memiliki tema/style default yang lebih modern dan estetis.', correct: true },
            { text: 'Mampu melakukan kalkulasi statistik secara otomatis (seperti error bars).', correct: true },
            { text: 'Tidak memerlukan library Python sama sekali.', correct: false }
        ],
        rationale: 'Seaborn dibangun di atas Matplotlib dan menawarkan integrasi Pandas lebih baik, tema default lebih cantik, dan statistik otomatis. Namun tetap memerlukan library Python.'
    },

    // TIPE C: BENAR ATAU SALAH
    {
        type: 'tf',
        question: 'Pie Chart sangat direkomendasikan jika kita memiliki lebih dari 10 kategori yang ingin dibandingkan.',
        isTrue: false,
        rationale: 'Salah. Pie Chart sulit dibaca dengan lebih dari 10 kategori. Maksimal 5 kategori agar tetap jelas dan terbaca. Gunakan Bar Chart untuk banyak kategori.'
    },
    {
        type: 'tf',
        question: 'Box Plot sangat berguna untuk mendeteksi adanya data pencilan (outliers) dalam sebuah dataset.',
        isTrue: true,
        rationale: 'Benar. Box Plot menampilkan median, kuartil, dan outliers dengan jelas melalui visual yang mudah dipahami.'
    },
    {
        type: 'tf',
        question: 'Prinsip "Data-Ink Ratio" menyarankan kita untuk menambahkan sebanyak mungkin hiasan grafik agar audiens tidak bosan.',
        isTrue: false,
        rationale: 'Salah. Data-Ink Ratio justru menyarankan untuk MENGHILANGKAN tinta non-data (hiasan tak perlu) agar fokus pada data yang penting. Semakin tinggi rasio, semakin baik.'
    },

    // TIPE D: MENJODOHKAN (Matching)
    // Set 1
    {
        type: 'match',
        question: 'Jodohkanlah Kebutuhan Visualisasi dengan Jenis Plot yang Tepat (Set 1):',
        leftItems: [
            {id: 'correlation', text: 'Melihat korelasi kuat/lemah antar variabel numerik'},
            {id: 'composition', text: 'Melihat komposisi bagian dari keseluruhan'},
            {id: 'frequency', text: 'Melihat frekuensi data dalam rentang tertentu'}
        ],
        rightItems: [
            {id: 'heatmap', text: 'Heatmap Matrix'},
            {id: 'pie-chart', text: 'Pie Chart'},
            {id: 'histogram', text: 'Histogram'}
        ],
        correctPairs: {
            correlation: 'heatmap',
            composition: 'pie-chart',
            frequency: 'histogram'
        },
        rationale: 'Heatmap (melihat korelasi), Pie Chart (komposisi), Histogram (frekuensi)'
    },

    // Set 2
    {
        type: 'match',
        question: 'Jodohkanlah Kebutuhan Visualisasi dengan Jenis Plot yang Tepat:',
        leftItems:[
            {id: 'IQR', text: 'Melihat median dan rentang interkuartil (IQR)'},
            {id: 'timeseries', text: 'Melihat fluktuasi data bulanan selama satu tahun'},
            {id: 'compare', text: 'Membandingkan performa 3 tim penjualan'}
        ],
        rightItems: [
            {id:'box-plot', text: 'Box Plot'},
            {id:'line-chart', text: 'Line Chart'},
            {id:'bar-chart', text: 'Bar Chart'}
        ],
        correctPairs: {
            IQR: 'box-plot',
            timeseries: 'line-chart',
            compare: 'bar-chart'
        },
        rationale: 'Box Plot (median & IQR), Line Chart (fluktuasi waktu), Bar Chart (perbandingan)'
    },

    // TIPE E: ISIAN SINGKAT
    {
        type: 'text',
        question: 'Apa nama komponen teratas yang bertindak sebagai seluruh area kanvas yang menampung semua elemen grafik dalam Matplotlib/Seaborn?',
        acceptedAnswers: ['figure', 'Figure'],
        rationale: 'Figure adalah komponen teratas dalam Matplotlib/Seaborn yang bertindak sebagai seluruh area kanvas yang menampung semua elemen grafik.'
    },
    {
        type: 'text',
        question: 'Code dibawah ini berguna untuk membuat canvas plt.figure(......=(10,6)). Apa parameter yang harus diisi untuk mengatur ukuran figure menjadi lebar 10 inci dan tinggi 6 inci?',
        acceptedAnswers: ['figsize'],
        rationale: 'Parameter yang digunakan untuk mengatur ukuran figure adalah figsize, misalnya plt.figure(figsize=(10,6)).'
    }
];
