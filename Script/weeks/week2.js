// Week 2 question bank
// Exposes: window.questionPoolWeek2

window.questionPoolWeek2 = [
    {
        type: 'mc',
        question: 'Manakah pernyataan yang PALING tepat tentang list di Python?',
        options: [
            { text: 'List bersifat immutable dan tidak bisa diubah setelah dibuat.', correct: false },
            { text: 'List adalah koleksi berurutan (ordered) dan dapat diubah (mutable).', correct: true },
            { text: 'List tidak bisa menyimpan tipe data campuran.', correct: false },
            { text: 'List selalu menyimpan item unik tanpa duplikasi.', correct: false }
        ],
        rationale: 'List itu berurutan (ordered) dan bisa diubah (mutable).'
    },
    {
        type: 'multi',
        question: 'Method mana yang digunakan untuk menambah elemen pada list? (Pilih semua yang benar)',
        options: [
            { text: '.append(x)', correct: true },
            { text: '.add(x)', correct: false },
            { text: '.insert(i, x)', correct: true },
            { text: '.update()', correct: false }
        ],
        rationale: 'Untuk list: append() menambah di akhir, insert() menambah di posisi tertentu.'
    },
    {
        type: 'text',
        question: 'Lengkapi: Tuple bersifat ________ (tidak dapat diubah).',
        acceptedAnswers: ['immutable'],
        rationale: 'Jawabannya: immutable.'
    },
    {
        type: 'tf',
        question: 'Set di Python menjamin tidak ada duplikasi elemen dan tidak berurutan (unordered).',
        isTrue: true,
        rationale: 'Benar. Set menyimpan elemen unik dan tidak menjaga urutan.'
    },
    {
        type: 'mc',
        question: "Perhatikan dictionary berikut: data = {'nama':'Ari', 'umur':20}. Cara paling aman mengambil nilai key 'alamat' agar tidak error adalah ...",
        options: [
            { text: "data['alamat']", correct: false },
            { text: "data.get('alamat')", correct: true },
            { text: "data.values('alamat')", correct: false },
            { text: "data.keys('alamat')", correct: false }
        ],
        rationale: 'Gunakan get() agar tidak memunculkan KeyError jika key tidak ada (akan mengembalikan None atau default).'
    },
    {
        type: 'mc',
        question: 'Apa output (nilai rata-rata) dari kode berikut?\n\nnilai = [80, 90, 75]\nprint(sum(nilai) / len(nilai))',
        options: [
            { text: '81.66666666666667', correct: true },
            { text: '82', correct: false },
            { text: '80', correct: false },
            { text: '75', correct: false }
        ],
        rationale: 'Rata-rata = (80+90+75)/3 = 245/3 = 81.66666666666667.'
    },
    {
        type: 'mc',
        question: "Lengkapi list comprehension berikut agar menghasilkan huruf kapital tanpa spasi.\n\nraw = [' jkt ', ' BDG', ' sby ']\nclean = [ ____ for x in raw ]\n# Target: ['JKT','BDG','SBY']",
        options: [
            { text: 'x.strip().upper()', correct: true },
            { text: 'x.upper().strip()', correct: true },
            { text: 'x.trim().upper()', correct: false },
            { text: 'x.strip().capitalize()', correct: false }
        ],
        rationale: 'Yang penting: hapus spasi (strip) dan ubah jadi kapital (upper).'
    },
    {
        type: 'mc',
        question: 'Operator himpunan untuk IRISAN (intersection) pada set adalah ...',
        options: [
            { text: 'A | B', correct: false },
            { text: 'A & B', correct: true },
            { text: 'A - B', correct: false },
            { text: 'A ^ B', correct: false }
        ],
        rationale: 'Intersection (irisan) pada set menggunakan operator &.'
    },
    {
        type: 'multi',
        question: "Sebutkan 2 method 'read-only' yang umum pada tuple sesuai materi. (Pilih 2)",
        options: [
            { text: '.count(x)', correct: true },
            { text: '.index(x)', correct: true },
            { text: '.append(x)', correct: false },
            { text: '.pop()', correct: false }
        ],
        rationale: 'Pada tuple, method yang umum adalah count() dan index().'
    },
    {
        type: 'match',
        question: 'Matching: Pasangkan tipe koleksi dengan ciri utamanya.',
        leftItems: [
            { id: 'list', text: '1) List' },
            { id: 'tuple', text: '2) Tuple' },
            { id: 'dict', text: '3) Dictionary' },
            { id: 'set', text: '4) Set' }
        ],
        rightItems: [
            { id: 'ordered_mutable', text: 'berurutan (ordered) & mutable' },
            { id: 'ordered_immutable', text: 'berurutan (ordered) & immutable' },
            { id: 'key_value', text: 'key-value' },
            { id: 'unique_unordered', text: 'unik (tanpa duplikat) & unordered' }
        ],
        correctPairs: {
            list: 'ordered_mutable',
            tuple: 'ordered_immutable',
            dict: 'key_value',
            set: 'unique_unordered'
        },
        rationale: 'Kunci: List=ordered&mutable, Tuple=ordered&immutable, Dictionary=key-value, Set=unik&unordered.'
    },
    {
        type: 'mc',
        question: 'Lengkapi kondisi agar list comprehension hanya mengambil suhu berbahaya (>34).\n\ntemp = [28, 35, 30, 37, 40]\ndanger = [t for t in temp if ____ ]\n# Target: [35, 37, 40]',
        options: [
            { text: 't > 34', correct: true },
            { text: 't >= 34', correct: false },
            { text: 't < 34', correct: false },
            { text: 't == 34', correct: false }
        ],
        rationale: 'Karena yang diminta lebih dari 34, kondisinya t > 34.'
    },
    {
        type: 'mc',
        question: 'Lengkapi ____ sehingga program mencetak angka genap dari 1 sampai 10.\n\nfor i in range(1, 11):\n    if i % 2 == ____:\n        print(i)',
        options: [
            { text: '0', correct: true },
            { text: '1', correct: false },
            { text: '2', correct: false },
            { text: 'i', correct: false }
        ],
        rationale: 'Bilangan genap memiliki sisa bagi 2 sama dengan 0.'
    },
    {
        type: 'mc',
        question: 'Kapan while loop berbahaya jika tidak hati-hati?',
        options: [
            { text: 'Saat jumlah iterasi sudah pasti diketahui', correct: false },
            { text: 'Karena bisa terjadi infinite loop jika kondisi tidak pernah berubah menjadi False', correct: true },
            { text: 'Karena while tidak bisa menggunakan break', correct: false },
            { text: 'Karena while hanya untuk list', correct: false }
        ],
        rationale: 'While loop akan berjalan terus selama kondisi True; jika kondisinya tidak pernah menjadi False, bisa infinite loop.'
    },
    {
        type: 'mc',
        question: "Lengkapi fungsi berikut agar mengembalikan dictionary berisi rata-rata dan nilai tertinggi.\n\ndef analisa_nilai(scores):\n    rata = ________\n    tertinggi = ________\n    return {'rata_rata': rata, 'nilai_tertinggi': tertinggi}",
        options: [
            { text: 'rata = max(scores) dan tertinggi = sum(scores)/len(scores)', correct: false },
            { text: 'rata = sum(scores)/len(scores) dan tertinggi = max(scores)', correct: true },
            { text: 'rata = sum(scores) dan tertinggi = len(scores)', correct: false },
            { text: 'rata = min(scores) dan tertinggi = sum(scores)', correct: false }
        ],
        rationale: 'Rata-rata dihitung dengan sum(scores)/len(scores), dan nilai tertinggi dengan max(scores).'
    },
    {
        type: 'mc',
        question: "Debugging: Perbaiki agar berhasil menghapus item 'BDG' dari set.\n\nkota = {'JKT','BDG','SBY'}\nkota.remove(['BDG'])\nprint(kota)\n\nPerbaikan yang benar adalah...",
        options: [
            { text: "kota.remove('BDG')", correct: true },
            { text: "kota.remove(['BDG'])", correct: false },
            { text: "kota.pop('BDG')", correct: false },
            { text: "kota.delete('BDG')", correct: false }
        ],
        rationale: "remove() butuh 1 elemen (string), bukan list. Jadi: kota.remove('BDG')."
    }
];
