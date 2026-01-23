// Week 1 question bank
// Exposes: window.questionPoolWeek1

window.questionPoolWeek1 = [
    {
        type: 'multi',
        question: "Pilih 3 pilar utama pembentuk keahlian Data Science:",
        options: [
            { text: "Ilmu Komputer", correct: true },
            { text: "Desain Grafis", correct: false },
            { text: "Matematika & Statistik", correct: true },
            { text: "Pengetahuan Bisnis", correct: true },
            { text: "Jaringan Komputer", correct: false }
        ],
        rationale: "Data Science adalah irisan dari Computer Science, Math & Statistics, dan Business Knowledge."
    },
    {
        type: 'text',
        question: "Dalam Python, struktur data yang elemennya TIDAK bisa diubah (immutable) dan menggunakan tanda kurung biasa () disebut...",
        acceptedAnswers: ["tuple", "tuples"],
        rationale: "Tuple bersifat immutable, berbeda dengan List yang mutable."
    },
    {
        type: 'text',
        question: "Tipe data Python untuk menyimpan teks atau karakter disebut...",
        acceptedAnswers: ["string", "str"],
        rationale: "String (str) digunakan untuk teks yang diapit tanda kutip."
    },
    {
        type: 'text',
        question: "Untuk menampilkan teks ke layar dalam Python, kita menggunakan perintah...",
        acceptedAnswers: ["print", "print()"],
        rationale: "Fungsi print() digunakan untuk output ke konsol."
    },
    {
        type: 'text',
        question: "Simbol operator aritmatika untuk pemangkatan dalam Python adalah...",
        acceptedAnswers: ["**", "^^"],
        rationale: "Python menggunakan tanda bintang ganda (**) untuk pangkat, bukan ^."
    },
    {
        type: 'tf',
        question: "Python menggunakan tanda kurung kurawal `{}` untuk menentukan blok kode (scope).",
        isTrue: false,
        rationale: "Salah. Python menggunakan INDENTASI (spasi/tab), bukan kurung kurawal seperti Java/C++."
    },
    {
        type: 'tf',
        question: "Analisis Prediktif bertujuan untuk menjawab pertanyaan 'Apa yang akan terjadi di masa depan?'.",
        isTrue: true,
        rationale: "Benar. Prediktif menggunakan data historis untuk meramal masa depan."
    },
    {
        type: 'tf',
        question: "Dalam Python, 10 dan '10' dianggap sebagai tipe data yang sama.",
        isTrue: false,
        rationale: "Salah. 10 adalah Integer, sedangkan '10' (dengan kutip) adalah String."
    },
    {
        type: 'mc',
        question: "Metodologi standar yang umum digunakan dalam siklus hidup proyek Data Science adalah...",
        options: [
            { text: "Waterfall", correct: false },
            { text: "CRISP-DM", correct: true },
            { text: "Agile", correct: false },
            { text: "Scrum", correct: false }
        ],
        rationale: "CRISP-DM (Cross-Industry Standard Process for Data Mining) adalah standar industri."
    },
    {
        type: 'mc',
        question: "Manakah sintaks yang BENAR untuk kondisi 'Jika x lebih besar dari 5'?",
        options: [
            { text: "if x > 5", correct: false },
            { text: "if (x > 5) {}", correct: false },
            { text: "if x > 5:", correct: true },
            { text: "check x > 5:", correct: false }
        ],
        rationale: "Statement kondisi if di Python wajib diakhiri dengan titik dua (:)."
    },
    {
        type: 'mc',
        question: "Apa kegunaan utama dari Dictionary dalam Python?",
        options: [
            { text: "Menyimpan data berurutan", correct: false },
            { text: "Menyimpan pasangan Key dan Value", correct: true },
            { text: "Menyimpan koordinat tetap", correct: false },
            { text: "Melakukan operasi matematika", correct: false }
        ],
        rationale: "Dictionary memetakan kunci (Key) unik ke nilai (Value) tertentu."
    },
    {
        type: 'mc',
        question: "Menurut materi, sebagian besar waktu seorang Data Scientist habis untuk...",
        options: [
            { text: "Modeling", correct: false },
            { text: "Data Cleaning", correct: true },
            { text: "Visualisasi", correct: false },
            { text: "Deployment", correct: false }
        ],
        rationale: "Sekitar 80% waktu digunakan untuk membersihkan dan menyiapkan data."
    },
    {
        type: 'mc',
        question: "Jenis analisis untuk mencari PENYEBAB suatu kejadian (Why it happened?) adalah...",
        options: [
            { text: "Deskriptif", correct: false },
            { text: "Diagnostik", correct: true },
            { text: "Prediktif", correct: false },
            { text: "Preskriptif", correct: false }
        ],
        rationale: "Diagnostik mendiagnosa alasan di balik suatu fenomena."
    },
    {
        type: 'mc',
        question: "Operator perbandingan untuk 'Tidak Sama Dengan' di Python adalah...",
        options: [
            { text: "<>", correct: false },
            { text: "==", correct: false },
            { text: "!=", correct: true },
            { text: "><", correct: false }
        ],
        rationale: "Tanda seru (!) berarti negasi/bukan."
    },
    {
        type: 'mc',
        question: "Manakah library Python yang TIDAK disebutkan sebagai library populer di slide?",
        options: [
            { text: "Pandas", correct: false },
            { text: "NumPy", correct: false },
            { text: "Scikit-learn", correct: false },
            { text: "ReactJS", correct: true }
        ],
        rationale: "ReactJS adalah library JavaScript untuk UI, bukan untuk Data Science Python."
    }
];
