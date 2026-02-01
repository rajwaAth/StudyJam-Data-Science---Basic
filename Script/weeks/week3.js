// Week 3 question bank
// Exposes: window.questionPoolWeek3

window.questionPoolWeek3 = [
    {
        type: 'mc',
        question: 'Apa tujuan utama dari proses Data Wrangling dalam Data Science?',
        options: [
            { text: 'Membuat model machine learning', correct: false },
            { text: 'Mengubah data menjadi grafik', correct: false },
            { text: 'Membersihkan dan menyiapkan data mentah agar siap dianalisis', correct: true },
            { text: 'Menyimpan data ke database', correct: false }
        ],
        rationale: 'Data Wrangling adalah proses membersihkan, mentransformasi, dan menyiapkan data mentah agar siap untuk analisis.'
    },
    {
        type: 'mc',
        question: 'Manakah karakteristik utama dari ndarray pada NumPy?',
        options: [
            { text: 'Dapat menyimpan berbagai tipe data', correct: false },
            { text: 'Digunakan untuk data teks', correct: false },
            { text: 'Menyimpan data numerik homogen dan mendukung komputasi cepat', correct: true },
            { text: 'Tidak memiliki atribut shape dan dtype', correct: false }
        ],
        rationale: 'ndarray NumPy menyimpan data numerik homogen (satu tipe) dan memungkinkan operasi cepat melalui vektorisasi.'
    },
    {
        type: 'mc',
        question: 'Output dari kode berikut adalah:\n\narray_a = np.array([1, 2, 3])\narray_b = np.array([10, 20, 30])\nprint(array_a + array_b)',
        options: [
            { text: '[11 22 33]', correct: true },
            { text: '[10, 20, 30]', correct: false },
            { text: '[1, 2, 3, 10, 20, 30]', correct: false },
            { text: 'Error', correct: false }
        ],
        rationale: 'NumPy melakukan operasi element-wise, jadi setiap elemen dijumlahkan: 1+10=11, 2+20=22, 3+30=33.'
    },
    {
        type: 'mc',
        question: 'Struktur data dua dimensi berbentuk tabel pada Pandas disebut:',
        options: [
            { text: 'Series', correct: false },
            { text: 'ndarray', correct: false },
            { text: 'List', correct: false },
            { text: 'DataFrame', correct: true }
        ],
        rationale: 'DataFrame adalah struktur data 2D pada Pandas yang mirip tabel dengan baris dan kolom.'
    },
    {
        type: 'multi',
        question: 'Pernyataan yang BENAR terkait perbedaan Python List dan NumPy Array adalah: (Pilih semua yang benar)',
        options: [
            { text: 'List lebih cepat untuk operasi numerik', correct: false },
            { text: 'NumPy mendukung operasi vektorisasi', correct: true },
            { text: 'List dapat berisi tipe data heterogen', correct: true },
            { text: 'NumPy array dapat berisi berbagai tipe data berbeda', correct: false }
        ],
        rationale: 'NumPy lebih cepat, mendukung vektorisasi. List lebih fleksibel (heterogen), NumPy array homogen.'
    },
    {
        type: 'text',
        question: 'Method Pandas untuk melihat ringkasan struktur dataset adalah:',
        acceptedAnswers: ['.info()', 'info()', '.info', 'info'],
        rationale: 'Method .info() menampilkan informasi struktur dataset termasuk jumlah baris, kolom, tipe data, dan missing values.'
    },
    {
        type: 'text',
        question: 'Kondisi ketika data tidak memiliki nilai (NaN) disebut:',
        acceptedAnswers: ['missing value', 'missing values', 'missingvalue'],
        rationale: 'Missing value adalah istilah untuk data yang hilang atau kosong (NaN/Not a Number).'
    },
    {
        type: 'text',
        question: 'Method NumPy untuk menghitung nilai rata-rata array adalah:',
        acceptedAnswers: ['np.mean()', 'mean()', 'np.mean', 'mean'],
        rationale: 'np.mean() menghitung rata-rata dari semua elemen dalam array NumPy.'
    },
    {
        type: 'tf',
        question: 'Vektorisasi memungkinkan operasi dilakukan pada seluruh array tanpa loop manual.',
        isTrue: true,
        rationale: 'Benar. Vektorisasi adalah fitur NumPy yang mengaplikasikan operasi ke seluruh array sekaligus tanpa perlu loop.'
    },
    {
        type: 'tf',
        question: 'Series pada Pandas merupakan struktur data dua dimensi.',
        isTrue: false,
        rationale: 'Salah. Series adalah struktur data satu dimensi (1D), sementara DataFrame adalah dua dimensi (2D).'
    },
    {
        type: 'match',
        question: 'Pasangkan method dengan fungsinya:',
        leftItems: [
            { id: 'isnull', text: '.isnull()' },
            { id: 'astype', text: '.astype()' },
            { id: 'drop_dups', text: '.drop_duplicates()' }
        ],
        rightItems: [
            { id: 'menghapus', text: 'Menghapus data duplikat' },
            { id: 'ubah_tipe', text: 'Mengubah tipe data' },
            { id: 'deteksi_null', text: 'Mendeteksi missing value' }
        ],
        correctPairs: {
            isnull: 'deteksi_null',
            astype: 'ubah_tipe',
            drop_dups: 'menghapus'
        },
        rationale: 'isnull() mendeteksi NaN, astype() mengubah tipe data, drop_duplicates() menghapus duplikat.'
    },
    {
        type: 'mc',
        question: 'Jelaskan tujuan dari kode berikut:\n\ndf = pd.DataFrame({\'Harga\': [\'15000\', \'20000\']})\ndf[\'Harga\'] = df[\'Harga\'].astype(int)',
        options: [
            { text: 'Mengubah tipe data kolom harga dari string ke integer', correct: true },
            { text: 'Mengubah tipe data kolom harga dari integer ke string', correct: false },
            { text: 'Menghapus data yang tidak valid', correct: false },
            { text: 'Menghitung jumlah baris', correct: false }
        ],
        rationale: 'Kode tersebut mengkonversi nilai dalam kolom \'Harga\' dari tipe string ke tipe integer menggunakan astype(int).'
    },
    {
        type: 'text',
        question: 'Dataset penjualan memiliki data produk duplikat. Method apa yang digunakan untuk menghapusnya dan mengapa?',
        acceptedAnswers: [
            'drop_duplicates(',
            '.drop_duplicates()',
            'drop_duplicates()',
            'drop_duplicates'
        ],
        rationale: 'Method drop_duplicates() pada Pandas digunakan untuk menghapus baris duplikat dari dataset.'
    },
    {
        type: 'mc',
        question: 'Mengapa Data Cleaning penting sebelum analisis data?',
        options: [
            {text: 'karena data cleaning menghilangkan error, missing value, dan inkonsistensi sehingga hasil analisis menjadi akurat', correct: true },
            {text: 'agar data terlihat lebih rapi secara visual', correct: false},
            {text: 'supaya ukuran dataset menjadi lebih kecil', correct: false },
            {text: 'untuk mempercepat proses visualisasi tanpa mempengaruhi hasil analisis', correct: false }
        ],
        rationale: 'Data Cleaning memastikan data berkualitas tinggi, konsisten, dan bebas dari error, sehingga analisis menghasilkan insight akurat.'
    },
    {
        type: 'order',
        question: 'Urutkan tahapan berikut dalam proses Data Science dengan drag-and-drop:',
        items: [
            { id: 'load', text: 'Load dataset' },
            { id: 'clean', text: 'Data cleaning' },
            { id: 'convert', text: 'Konversi tipe data' },
            { id: 'analyze', text: 'Analisis data' }
        ],
        correctOrder: ['load', 'clean', 'convert', 'analyze'],
        rationale: 'Urutan yang benar: Load dataset → Data cleaning → Konversi tipe data → Analisis data. Ini memastikan data siap sebelum dianalisis.'
    }
];
