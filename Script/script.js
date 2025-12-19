// ==========================================
// 1. DATABASE SOAL (Variatif)
// ==========================================
// Tipe: 'mc' (Pilihan Ganda), 'tf' (Benar/Salah), 'text' (Isian), 'multi' (Centang Banyak)

const questionPool = [
    // --- SOAL MULTI-SELECT (Centang Banyak) ---
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
    // --- SOAL TEXT INPUT (Isian) ---
    {
        type: 'text',
        question: "Dalam Python, struktur data yang elemennya TIDAK bisa diubah (immutable) dan menggunakan tanda kurung biasa () disebut...",
        acceptedAnswers: ["tuple", "tuples"], // Jawaban yang diterima (huruf kecil semua)
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
    // --- SOAL TRUE / FALSE ---
    {
        type: 'tf',
        question: "Python menggunakan tanda kurung kurawal `{}` untuk menentukan blok kode (scope).",
        isTrue: false, // Jawabannya False
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
    // --- SOAL PILIHAN GANDA (MC) ---
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
// ==========================================
// 2. STATE & CONFIG
// ==========================================
let SPREADSHEET_API_URL = 'https://script.google.com/macros/s/AKfycbyPSbgBBmbF72QoaOZwn8Qp5x1kvYn2aRj-7DKzLX5RJxaKEzurgXm95S78bd3t763MQQ/exec';

let activeQuestions = [];
let currentQuestionIdx = 0;
let score = 0;
let hasAnswered = false;
let userData = { nama: '', npm: '' };
// DOM Elements
const els = {
    app: document.getElementById('app'),
    start: document.getElementById('start-screen'),
    quiz: document.getElementById('quiz-container'),
    result: document.getElementById('result-screen'),
    
    qNumber: document.getElementById('q-number'),
    totalQ: document.getElementById('total-q'),
    typeBadge: document.getElementById('type-badge'),
    scoreEl: document.getElementById('current-score'),
    progressBar: document.getElementById('progress-bar'),
    
    questionText: document.getElementById('question-text'),
    optionsContainer: document.getElementById('options-container'),
    
    feedback: document.getElementById('feedback-section'),
    feedbackTitle: document.getElementById('feedback-title'),
    feedbackText: document.getElementById('feedback-text'),
    feedbackIcon: document.getElementById('feedback-icon'),
    
    checkBtn: document.getElementById('check-btn'),
    nextBtn: document.getElementById('next-btn'),
    
    inputUrl: document.getElementById('input-url'),
    settingsPanel: document.getElementById('settings-panel')
};
const sounds = {
    correct: document.getElementById('sound-correct'),
    wrong: document.getElementById('sound-wrong'),
    win: document.getElementById('sound-win')
};
// ==========================================
// 3. LOGIC UTAMA
// ==========================================
function toggleSettings() {
    els.settingsPanel.classList.toggle('hidden');
}
function handleLogin(e) {
    e.preventDefault();
    const nama = document.getElementById('input-nama').value;
    const npm = document.getElementById('input-npm').value;
    const urlInput = document.getElementById('input-url').value;
    if(urlInput) SPREADSHEET_API_URL = urlInput.trim();
    if(nama && npm) {
        userData.nama = nama;
        userData.npm = npm;
        document.getElementById('display-nama').innerText = nama.split(' ')[0]; // Ambil nama depan saja
        document.getElementById('user-badge').classList.remove('hidden');
        
        initQuiz();
    }
}
function initQuiz() {
    // Acak dan ambil 10 soal
    activeQuestions = [...questionPool].sort(() => 0.5 - Math.random()).slice(0, 10);
    
    els.start.classList.add('hidden');
    els.quiz.classList.remove('hidden');
    els.totalQ.innerText = activeQuestions.length;
    
    loadQuestion();
}
function loadQuestion() {
    hasAnswered = false;
    const data = activeQuestions[currentQuestionIdx];
    
    // Reset UI
    els.feedback.classList.add('hidden');
    els.nextBtn.classList.add('hidden');
    els.checkBtn.classList.add('hidden');
    els.optionsContainer.innerHTML = '';
    
    // Animasi masuk
    els.questionText.classList.remove('slide-up');
    void els.questionText.offsetWidth; // trigger reflow
    els.questionText.classList.add('slide-up');
    
    // Update Info
    els.qNumber.innerText = currentQuestionIdx + 1;
    els.questionText.innerText = data.question;
    const progressPct = ((currentQuestionIdx) / activeQuestions.length) * 100;
    els.progressBar.style.width = `${progressPct}%`;
    // Render berdasarkan Tipe Soal
    renderOptions(data);
}
function renderOptions(data) {
    // Update Badge Tipe Soal
    let badgeText = "";
    let badgeColor = "";
    switch(data.type) {
        case 'mc': badgeText = "Pilihan Ganda"; badgeColor = "bg-blue-100 text-dsc-blue"; break;
        case 'tf': badgeText = "Benar / Salah"; badgeColor = "bg-green-100 text-dsc-green"; break;
        case 'multi': badgeText = "Centang Banyak"; badgeColor = "bg-yellow-100 text-yellow-700"; break;
        case 'text': badgeText = "Isian Singkat"; badgeColor = "bg-purple-100 text-purple-600"; break;
    }
    els.typeBadge.className = `px-3 py-1 rounded-lg text-xs font-bold ${badgeColor}`;
    els.typeBadge.innerText = badgeText;
    // Render Input Elements
    if (data.type === 'mc') {
        data.options.forEach((opt, idx) => {
            const btn = createOptionButton(opt.text, () => checkAnswerMC(idx));
            els.optionsContainer.appendChild(btn);
        });
    } 
    else if (data.type === 'tf') {
        const btnTrue = createOptionButton("Benar", () => checkAnswerTF(true));
        const btnFalse = createOptionButton("Salah", () => checkAnswerTF(false));
        els.optionsContainer.appendChild(btnTrue);
        els.optionsContainer.appendChild(btnFalse);
    }
    else if (data.type === 'multi') {
        data.options.forEach((opt, idx) => {
            const label = document.createElement('label');
            label.className = "option-multi flex items-center p-4 rounded-xl border-2 border-gray-100 bg-white cursor-pointer hover:border-dsc-yellow transition";
            label.innerHTML = `
                <input type="checkbox" class="custom-checkbox hidden" data-idx="${idx}">
                <div class="option-indicator w-6 h-6 border-2 border-gray-300 rounded flex items-center justify-center mr-4">
                    <i class="fas fa-check text-xs"></i>
                </div>
                <span class="font-medium text-gray-700 select-none">${opt.text}</span>
            `;
            const checkbox = label.querySelector('.custom-checkbox');
            checkbox.addEventListener('change', (event) => {
                label.classList.toggle('selected', event.target.checked);
            });
            els.optionsContainer.appendChild(label);
        });
        // Tampilkan tombol periksa manual
        els.checkBtn.classList.remove('hidden');
        els.checkBtn.innerText = "Kirim Jawaban";
    }
    else if (data.type === 'text') {
        const input = document.createElement('input');
        input.type = "text";
        input.id = "text-answer";
        input.className = "w-full p-4 rounded-xl border-2 border-gray-200 focus:border-purple-500 focus:ring-2 focus:ring-purple-100 outline-none font-medium text-lg";
        input.placeholder = "Ketik jawaban Anda di sini...";
        input.autocomplete = "off";
        input.onkeypress = (e) => { if(e.key === 'Enter') checkManualAnswer(); };
        els.optionsContainer.appendChild(input);
        
        els.checkBtn.classList.remove('hidden');
        els.checkBtn.innerText = "Kirim Jawaban";
        
        setTimeout(() => input.focus(), 100);
    }
}
function createOptionButton(text, onClick) {
    const btn = document.createElement('button');
    btn.className = "w-full text-left p-4 rounded-xl border-2 border-gray-100 bg-white hover:border-dsc-blue hover:bg-blue-50 transition-all duration-200 flex justify-between items-center group option-btn";
    btn.innerHTML = `
        <span class="font-medium text-gray-700 group-hover:text-dsc-blue">${text}</span>
        <div class="w-5 h-5 rounded-full border-2 border-gray-300 group-hover:border-dsc-blue flex items-center justify-center">
            <div class="w-2.5 h-2.5 rounded-full bg-dsc-blue opacity-0 group-hover:opacity-100 transition"></div>
        </div>
    `;
    btn.onclick = onClick;
    return btn;
}
// ==========================================
// 4. CHECK LOGIC
// ==========================================
function showFeedback(isCorrect, rationale) {
    hasAnswered = true;
    
    // Audio
    if(isCorrect) {
        sounds.correct.currentTime = 0;
        sounds.correct.play().catch(e => {}); // catch error if autoplay blocked
        score += 10;
        els.scoreEl.innerText = score;
        els.feedback.className = "mt-8 p-5 rounded-2xl border-l-4 animate-fadeIn shadow-sm bg-green-50 border-dsc-green text-green-800";
        els.feedbackTitle.innerText = "Jawaban Benar!";
        els.feedbackIcon.innerHTML = '<i class="fas fa-check-circle text-dsc-green"></i>';
    } else {
        sounds.wrong.currentTime = 0;
        sounds.wrong.play().catch(e => {});
        document.getElementById('app').classList.add('shake');
        setTimeout(() => document.getElementById('app').classList.remove('shake'), 500);
        
        els.feedback.className = "mt-8 p-5 rounded-2xl border-l-4 animate-fadeIn shadow-sm bg-red-50 border-dsc-red text-red-800";
        els.feedbackTitle.innerText = "Jawaban Kurang Tepat";
        els.feedbackIcon.innerHTML = '<i class="fas fa-times-circle text-dsc-red"></i>';
    }
    
    els.feedbackText.innerText = rationale;
    els.feedback.classList.remove('hidden');
    
    // Button flow
    els.checkBtn.classList.add('hidden');
    els.nextBtn.classList.remove('hidden');
    
    // Auto scroll
    setTimeout(() => {
        els.nextBtn.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }, 100);
}
function checkAnswerMC(selectedIndex) {
    if(hasAnswered) return;
    const data = activeQuestions[currentQuestionIdx];
    const isCorrect = data.options[selectedIndex].correct;
    
    // Visual Updates
    const buttons = els.optionsContainer.children;
    Array.from(buttons).forEach((btn, idx) => {
        btn.disabled = true;
        if(data.options[idx].correct) {
            btn.className = "w-full text-left p-4 rounded-xl border-2 border-dsc-green bg-green-50 flex justify-between items-center";
            btn.innerHTML = `<span class="font-bold text-green-800">${data.options[idx].text}</span><i class="fas fa-check text-dsc-green"></i>`;
        } else if(idx === selectedIndex && !isCorrect) {
            btn.className = "w-full text-left p-4 rounded-xl border-2 border-dsc-red bg-red-50 flex justify-between items-center";
            btn.innerHTML = `<span class="font-bold text-red-800">${data.options[idx].text}</span><i class="fas fa-times text-dsc-red"></i>`;
        } else {
            btn.classList.add('opacity-50', 'grayscale');
        }
    });
    showFeedback(isCorrect, data.rationale);
}
function checkAnswerTF(userChoice) {
    if(hasAnswered) return;
    const data = activeQuestions[currentQuestionIdx];
    const isCorrect = (userChoice === data.isTrue);
    
    const buttons = els.optionsContainer.children;
    // Button 0 is True, 1 is False
    buttons[0].disabled = true;
    buttons[1].disabled = true;
    if(isCorrect) {
         // User clicked Correct button
         const clickedBtn = userChoice ? buttons[0] : buttons[1];
         clickedBtn.className = "w-full text-left p-4 rounded-xl border-2 border-dsc-green bg-green-50 flex justify-between items-center";
         clickedBtn.innerHTML += '<i class="fas fa-check text-dsc-green"></i>';
    } else {
        // User clicked Wrong button
        const clickedBtn = userChoice ? buttons[0] : buttons[1];
        const correctBtn = userChoice ? buttons[1] : buttons[0];
        clickedBtn.className = "w-full text-left p-4 rounded-xl border-2 border-dsc-red bg-red-50 flex justify-between items-center";
        clickedBtn.innerHTML += '<i class="fas fa-times text-dsc-red"></i>';
        correctBtn.className = "w-full text-left p-4 rounded-xl border-2 border-dsc-green bg-green-50 flex justify-between items-center opacity-70";
    }
    
    showFeedback(isCorrect, data.rationale);
}
function checkManualAnswer() {
    if(hasAnswered) return;
    const data = activeQuestions[currentQuestionIdx];
    
    if(data.type === 'text') {
        const input = document.getElementById('text-answer');
        const userVal = input.value.trim().toLowerCase();
        const normalizedAnswers = data.acceptedAnswers.map((answer) => answer.trim().toLowerCase());
        const isCorrect = normalizedAnswers.includes(userVal);
        
        input.disabled = true;
        if(isCorrect) input.classList.add('border-dsc-green', 'bg-green-50', 'text-green-800');
        else input.classList.add('border-dsc-red', 'bg-red-50', 'text-red-800');
        
        showFeedback(isCorrect, `${data.rationale} (Jawaban: ${data.acceptedAnswers[0]})`);
    }
    else if (data.type === 'multi') {
        const checkboxes = els.optionsContainer.querySelectorAll('.custom-checkbox');
        let allCorrect = true;
        let userSelectedAny = false;
        
        checkboxes.forEach((cb, idx) => {
            const isSelected = cb.checked;
            const shouldBeSelected = data.options[idx].correct;
            const parent = cb.parentElement;
            parent.classList.remove('selected');
            
            cb.disabled = true;
            if(isSelected) userSelectedAny = true;
            
            if (isSelected && shouldBeSelected) {
                // Benar dipilih
                parent.classList.add('border-dsc-green', 'bg-green-50');
            } else if (isSelected && !shouldBeSelected) {
                // Salah pilih
                parent.classList.add('border-dsc-red', 'bg-red-50');
                allCorrect = false;
            } else if (!isSelected && shouldBeSelected) {
                // Harusnya dipilih tapi tidak
                parent.classList.add('border-yellow-200', 'bg-yellow-50', 'opacity-70'); // Show missed
                allCorrect = false;
            } else {
                parent.classList.add('opacity-40');
            }
        });
        if(!userSelectedAny) allCorrect = false;
        showFeedback(allCorrect, data.rationale);
    }
}
function nextQuestion() {
    currentQuestionIdx++;
    if(currentQuestionIdx < activeQuestions.length) {
        loadQuestion();
    } else {
        showResult();
    }
}
function showResult() {
    els.quiz.classList.add('hidden');
    els.result.classList.remove('hidden');
    
    const totalScore = score;
    const maxScore = activeQuestions.length * 10;
    const correctAnswers = score / 10;
    const wrongAnswers = activeQuestions.length - correctAnswers;
    document.getElementById('final-score').innerText = totalScore;
    document.getElementById('correct-count').innerText = correctAnswers;
    document.getElementById('wrong-count').innerText = wrongAnswers;
    if(totalScore === maxScore) {
        sounds.win.play().catch(e=>{});
        confetti({ particleCount: 200, spread: 80, origin: { y: 0.6 } });
        document.getElementById('result-message').innerText = "Sempurna! Anda layak jadi Lead DSC!";
    } else if (totalScore >= 70) {
        confetti({ particleCount: 100, spread: 60, origin: { y: 0.6 } });
        document.getElementById('result-message').innerText = "Kerja bagus! Pemahaman Anda sudah solid.";
    }
}
// ==========================================
// 5. DATA SAVING
// ==========================================
function saveToSpreadsheet() {
    const btn = document.getElementById('btn-save');
    const status = document.getElementById('upload-status');
    if (!SPREADSHEET_API_URL) {
        status.innerHTML = `<span class="text-red-500">Error: URL Script belum diisi.</span>`;
        return;
    }
    btn.disabled = true;
    btn.innerHTML = `<i class="fas fa-circle-notch fa-spin"></i> Mengirim...`;
    
    const formData = new URLSearchParams();
    formData.append('nama', userData.nama);
    formData.append('npm', userData.npm);
    formData.append('score', score);
    fetch(SPREADSHEET_API_URL, {
        method: 'POST',
        mode: 'no-cors',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: formData.toString()
    })
    .then(() => {
        status.innerHTML = `<span class="text-green-600"><i class="fas fa-check"></i> Data Terkirim!</span>`;
        btn.innerHTML = `<i class="fas fa-check"></i> Tersimpan`;
        btn.className = "w-full bg-gray-200 text-gray-500 font-bold py-3.5 rounded-xl cursor-not-allowed flex items-center justify-center gap-2";
    })
    .catch(err => {
        console.error(err);
        status.innerHTML = `<span class="text-red-500">Gagal koneksi. Coba lagi/Download CSV.</span>`;
        btn.disabled = false;
        btn.innerHTML = `<i class="fab fa-google-drive"></i> Simpan ke Spreadsheet`;
    });
}
function downloadCSV() {
    const date = new Date().toLocaleString();
    const csvContent = `data:text/csv;charset=utf-8,Nama,NPM,Skor,Waktu\n"${userData.nama}","${userData.npm}","${score}","${date}"`;
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `Quiz_DSC_${userData.nama.split(' ')[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
}