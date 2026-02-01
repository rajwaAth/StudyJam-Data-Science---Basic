// Quiz engine (UI + scoring). Depends on DOM IDs present in quiz.html.

// ==========================================
// UTILITIES
// ==========================================
function shuffle(items) {
    const array = [...items];
    for (let idx = array.length - 1; idx > 0; idx -= 1) {
        const swapIdx = Math.floor(Math.random() * (idx + 1));
        [array[idx], array[swapIdx]] = [array[swapIdx], array[idx]];
    }
    return array;
}

// ==========================================
// STATE
// ==========================================
const DEFAULT_SPREADSHEET_API_URL = 'https://script.google.com/macros/s/AKfycbyPSbgBBmbF72QoaOZwn8Qp5x1kvYn2aRj-7DKzLX5RJxaKEzurgXm95S78bd3t763MQQ/exec';

let SPREADSHEET_API_URL = '';
let activeQuestions = [];
let currentQuestionIdx = 0;
let score = 0;
let hasAnswered = false;
let userData = { nama: '', npm: '' };
let selectedWeek = null;

// DOM Elements (quiz page)
const els = {
    app: document.getElementById('app'),
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

    displayNama: document.getElementById('display-nama')
};

const sounds = {
    correct: document.getElementById('sound-correct'),
    wrong: document.getElementById('sound-wrong'),
    win: document.getElementById('sound-win')
};

// ==========================================
// PUBLIC INIT
// ==========================================
function setQuizContext({ user, week, spreadsheetUrl }) {
    userData = user || { nama: '', npm: '' };
    selectedWeek = week;
    const normalizedUrl = (spreadsheetUrl || '').trim();
    SPREADSHEET_API_URL = normalizedUrl || DEFAULT_SPREADSHEET_API_URL;

    if (els.displayNama) {
        const first = (userData.nama || 'User').split(' ')[0];
        els.displayNama.innerText = first;
    }
}

function initQuiz(pool, count) {
    const safeCount = Math.min(count || 10, pool.length);
    const randomized = shuffle(pool).slice(0, safeCount).map((question) => ({
        ...question,
        options: question.options ? question.options.map((opt) => ({ ...opt })) : undefined
    }));

    activeQuestions = randomized;
    currentQuestionIdx = 0;
    score = 0;
    hasAnswered = false;

    if (els.scoreEl) els.scoreEl.innerText = String(score);
    if (els.totalQ) els.totalQ.innerText = String(activeQuestions.length);

    if (els.result) els.result.classList.add('hidden');
    if (els.quiz) els.quiz.classList.remove('hidden');

    loadQuestion();
}

// ==========================================
// RENDER
// ==========================================
function loadQuestion() {
    hasAnswered = false;
    const data = activeQuestions[currentQuestionIdx];

    if (!data) return;

    // Reset UI
    if (els.feedback) els.feedback.classList.add('hidden');
    if (els.nextBtn) els.nextBtn.classList.add('hidden');
    if (els.checkBtn) els.checkBtn.classList.add('hidden');
    if (els.optionsContainer) els.optionsContainer.innerHTML = '';

    // Update Info
    if (els.qNumber) els.qNumber.innerText = String(currentQuestionIdx + 1);
    if (els.questionText) els.questionText.innerText = data.question;

    const progressPct = ((currentQuestionIdx) / activeQuestions.length) * 100;
    if (els.progressBar) els.progressBar.style.width = `${progressPct}%`;

    // Shuffle options for mc/multi only
    if (data.options && (data.type === 'mc' || data.type === 'multi')) {
        data.options = shuffle(data.options).map((opt) => ({ ...opt }));
    }

    renderOptions(data);
}

function renderOptions(data) {
    // Badge
    let badgeText = '';
    let badgeColor = '';
    switch (data.type) {
        case 'mc': badgeText = 'Pilihan Ganda'; badgeColor = 'bg-blue-100 text-dsc-blue'; break;
        case 'tf': badgeText = 'Benar / Salah'; badgeColor = 'bg-green-100 text-dsc-green'; break;
        case 'multi': badgeText = 'Centang Banyak'; badgeColor = 'bg-yellow-100 text-yellow-700'; break;
        case 'text': badgeText = 'Isian Singkat'; badgeColor = 'bg-purple-100 text-purple-600'; break;
        case 'match': badgeText = 'Menjodohkan'; badgeColor = 'bg-indigo-100 text-indigo-700'; break;
        case 'order': badgeText = 'Urutan (Drag & Drop)'; badgeColor = 'bg-orange-100 text-orange-700'; break;
        default: badgeText = 'Soal'; badgeColor = 'bg-gray-100 text-gray-700';
    }

    if (els.typeBadge) {
        els.typeBadge.className = `px-3 py-1 rounded-lg text-xs font-bold ${badgeColor}`;
        els.typeBadge.innerText = badgeText;
    }

    if (!els.optionsContainer) return;

    if (data.type === 'mc') {
        data.options.forEach((opt, idx) => {
            const btn = createOptionButton(opt.text, () => checkAnswerMC(idx));
            els.optionsContainer.appendChild(btn);
        });
        return;
    }

    if (data.type === 'tf') {
        const btnTrue = createOptionButton('Benar', () => checkAnswerTF(true));
        const btnFalse = createOptionButton('Salah', () => checkAnswerTF(false));
        els.optionsContainer.appendChild(btnTrue);
        els.optionsContainer.appendChild(btnFalse);
        return;
    }

    if (data.type === 'multi') {
        data.options.forEach((opt, idx) => {
            const label = document.createElement('label');
            label.className = 'option-multi flex items-center p-4 rounded-xl border-2 border-gray-100 bg-white cursor-pointer hover:border-dsc-yellow transition';
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

        if (els.checkBtn) {
            els.checkBtn.classList.remove('hidden');
            els.checkBtn.innerText = 'Kirim Jawaban';
            els.checkBtn.onclick = () => checkManualAnswer();
        }
        return;
    }

    if (data.type === 'text') {
        const input = document.createElement('input');
        input.type = 'text';
        input.id = 'text-answer';
        input.className = 'w-full p-4 rounded-xl border-2 border-gray-200 focus:border-purple-500 focus:ring-2 focus:ring-purple-100 outline-none font-medium text-lg';
        input.placeholder = 'Ketik jawaban Anda di sini...';
        input.autocomplete = 'off';
        input.onkeypress = (e) => { if (e.key === 'Enter') checkManualAnswer(); };
        els.optionsContainer.appendChild(input);

        if (els.checkBtn) {
            els.checkBtn.classList.remove('hidden');
            els.checkBtn.innerText = 'Kirim Jawaban';
            els.checkBtn.onclick = () => checkManualAnswer();
        }

        setTimeout(() => input.focus(), 100);
        return;
    }

    if (data.type === 'match') {
        const wrapper = document.createElement('div');
        wrapper.className = 'grid grid-cols-1 md:grid-cols-2 gap-4';

        const leftCard = document.createElement('div');
        leftCard.className = 'p-4 rounded-2xl border border-gray-200 bg-white shadow-sm';
        leftCard.innerHTML = `<div class="text-xs font-bold text-gray-400 uppercase tracking-wider mb-3">Sisi Kiri</div>`;

        const rightCard = document.createElement('div');
        rightCard.className = 'p-4 rounded-2xl border border-gray-200 bg-gray-50 shadow-sm';
        rightCard.innerHTML = `<div class="text-xs font-bold text-gray-400 uppercase tracking-wider mb-3">Sisi Kanan (Pilihan)</div>`;

        const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
        const rightOrder = shuffle(data.rightItems).map((item, idx) => ({
            ...item,
            letter: letters[idx] || String(idx + 1)
        }));

        const legend = document.createElement('div');
        legend.className = 'space-y-2';
        rightOrder.forEach((ri) => {
            const row = document.createElement('div');
            row.className = 'flex items-start gap-3 p-3 rounded-xl bg-white border border-gray-100';
            row.innerHTML = `
                <div class="w-8 h-8 rounded-lg bg-indigo-100 text-indigo-700 font-extrabold flex items-center justify-center">${ri.letter}</div>
                <div class="text-sm font-medium text-gray-700 leading-snug">${ri.text}</div>
            `;
            legend.appendChild(row);
        });
        rightCard.appendChild(legend);

        const list = document.createElement('div');
        list.className = 'space-y-3';

        data.leftItems.forEach((li) => {
            const row = document.createElement('div');
            row.className = 'flex items-center gap-3 p-3 rounded-xl border border-gray-100 bg-gray-50';

            const leftText = document.createElement('div');
            leftText.className = 'flex-1 font-bold text-gray-800';
            leftText.innerText = li.text;

            const select = document.createElement('select');
            select.className = 'match-select w-28 sm:w-32 p-2.5 rounded-xl border-2 border-gray-200 bg-white font-bold text-gray-700 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 outline-none';
            select.setAttribute('data-left-id', li.id);
            select.innerHTML = '<option value="">Pilih</option>';
            rightOrder.forEach((ri) => {
                const opt = document.createElement('option');
                opt.value = ri.id;
                opt.textContent = ri.letter;
                select.appendChild(opt);
            });

            row.appendChild(leftText);
            row.appendChild(select);
            list.appendChild(row);
        });

        leftCard.appendChild(list);
        wrapper.appendChild(leftCard);
        wrapper.appendChild(rightCard);
        els.optionsContainer.appendChild(wrapper);

        if (els.checkBtn) {
            els.checkBtn.classList.remove('hidden');
            els.checkBtn.innerText = 'Kirim Jawaban';
            els.checkBtn.onclick = () => checkManualAnswer();
        }
    }

    if (data.type === 'order') {
        const container = document.createElement('div');
        container.className = 'p-5 rounded-2xl border-2 border-dashed border-gray-300 bg-gray-50';
        container.innerHTML = '<div class="text-sm font-semibold text-gray-600 mb-4"><i class="fas fa-hand-paper mr-2"></i>Seret dan atur urutan item di bawah ini:</div>';

        const droppableList = document.createElement('div');
        droppableList.id = 'order-list';
        droppableList.className = 'space-y-3';

        // Shuffle items for display
        const shuffledItems = shuffle([...data.items]);
        
        shuffledItems.forEach((item) => {
            const itemEl = document.createElement('div');
            itemEl.className = 'order-item p-4 rounded-xl bg-white border-2 border-gray-200 cursor-move hover:border-dsc-blue hover:shadow-md transition-all flex items-center gap-3 shadow-sm';
            itemEl.draggable = true;
            itemEl.setAttribute('data-id', item.id);
            itemEl.innerHTML = `
                <div class="flex-shrink-0 w-6 h-6 rounded-full bg-blue-100 text-dsc-blue font-bold flex items-center justify-center text-sm">
                    <i class="fas fa-grip-vertical text-gray-400"></i>
                </div>
                <div class="flex-1 font-medium text-gray-800">${item.text}</div>
            `;

            itemEl.addEventListener('dragstart', (e) => {
                e.dataTransfer.effectAllowed = 'move';
                e.dataTransfer.setData('text/html', itemEl.innerHTML);
                itemEl.classList.add('opacity-50');
            });

            itemEl.addEventListener('dragend', () => {
                itemEl.classList.remove('opacity-50');
            });

            itemEl.addEventListener('dragover', (e) => {
                e.preventDefault();
                e.dataTransfer.dropEffect = 'move';
                if (itemEl !== draggingItem) {
                    itemEl.classList.add('border-dsc-blue', 'bg-blue-50');
                }
            });

            itemEl.addEventListener('dragleave', () => {
                itemEl.classList.remove('border-dsc-blue', 'bg-blue-50');
            });

            itemEl.addEventListener('drop', (e) => {
                e.preventDefault();
                itemEl.classList.remove('border-dsc-blue', 'bg-blue-50');
                if (itemEl !== draggingItem && draggingItem) {
                    const allItems = Array.from(droppableList.querySelectorAll('.order-item'));
                    const draggedIndex = allItems.indexOf(draggingItem);
                    const targetIndex = allItems.indexOf(itemEl);
                    
                    if (draggedIndex < targetIndex) {
                        itemEl.parentNode.insertBefore(draggingItem, itemEl.nextSibling);
                    } else {
                        itemEl.parentNode.insertBefore(draggingItem, itemEl);
                    }
                }
            });

            droppableList.appendChild(itemEl);
        });

        let draggingItem = null;
        droppableList.addEventListener('dragstart', (e) => {
            if (e.target.classList.contains('order-item')) {
                draggingItem = e.target;
            }
        });

        container.appendChild(droppableList);
        els.optionsContainer.appendChild(container);

        if (els.checkBtn) {
            els.checkBtn.classList.remove('hidden');
            els.checkBtn.innerText = 'Kirim Jawaban';
            els.checkBtn.onclick = () => checkManualAnswer();
        }
    }
}

function createOptionButton(text, onClick) {
    const btn = document.createElement('button');
    btn.className = 'w-full text-left p-4 rounded-xl border-2 border-gray-100 bg-white hover:border-dsc-blue hover:bg-blue-50 transition-all duration-200 flex justify-between items-center group option-btn';
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
// CHECK LOGIC
// ==========================================
function showFeedback(isCorrect, rationale) {
    hasAnswered = true;

    if (isCorrect) {
        if (sounds.correct) {
            sounds.correct.currentTime = 0;
            sounds.correct.play().catch(() => {});
        }
        score += 10;
        if (els.scoreEl) els.scoreEl.innerText = String(score);
        if (els.feedback) {
            els.feedback.className = 'mt-8 p-5 rounded-2xl border-l-4 animate-fadeIn shadow-sm bg-green-50 border-dsc-green text-green-800';
        }
        if (els.feedbackTitle) els.feedbackTitle.innerText = 'Jawaban Benar!';
        if (els.feedbackIcon) els.feedbackIcon.innerHTML = '<i class="fas fa-check-circle text-dsc-green"></i>';
    } else {
        if (sounds.wrong) {
            sounds.wrong.currentTime = 0;
            sounds.wrong.play().catch(() => {});
        }
        if (els.app) {
            els.app.classList.add('shake');
            setTimeout(() => els.app.classList.remove('shake'), 500);
        }
        if (els.feedback) {
            els.feedback.className = 'mt-8 p-5 rounded-2xl border-l-4 animate-fadeIn shadow-sm bg-red-50 border-dsc-red text-red-800';
        }
        if (els.feedbackTitle) els.feedbackTitle.innerText = 'Jawaban Kurang Tepat';
        if (els.feedbackIcon) els.feedbackIcon.innerHTML = '<i class="fas fa-times-circle text-dsc-red"></i>';
    }

    if (els.feedbackText) els.feedbackText.innerText = rationale;
    if (els.feedback) els.feedback.classList.remove('hidden');

    if (els.checkBtn) els.checkBtn.classList.add('hidden');
    if (els.nextBtn) {
        els.nextBtn.classList.remove('hidden');
        els.nextBtn.onclick = () => nextQuestion();
    }

    setTimeout(() => {
        els.nextBtn?.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }, 100);
}

function checkAnswerMC(selectedIndex) {
    if (hasAnswered) return;
    const data = activeQuestions[currentQuestionIdx];
    const isCorrect = data.options[selectedIndex].correct;

    const buttons = els.optionsContainer?.children || [];
    Array.from(buttons).forEach((btn, idx) => {
        btn.disabled = true;
        if (data.options[idx].correct) {
            btn.className = 'w-full text-left p-4 rounded-xl border-2 border-dsc-green bg-green-50 flex justify-between items-center';
            btn.innerHTML = `<span class="font-bold text-green-800">${data.options[idx].text}</span><i class="fas fa-check text-dsc-green"></i>`;
        } else if (idx === selectedIndex && !isCorrect) {
            btn.className = 'w-full text-left p-4 rounded-xl border-2 border-dsc-red bg-red-50 flex justify-between items-center';
            btn.innerHTML = `<span class="font-bold text-red-800">${data.options[idx].text}</span><i class="fas fa-times text-dsc-red"></i>`;
        } else {
            btn.classList.add('opacity-50', 'grayscale');
        }
    });

    showFeedback(isCorrect, data.rationale);
}

function checkAnswerTF(userChoice) {
    if (hasAnswered) return;
    const data = activeQuestions[currentQuestionIdx];
    const isCorrect = (userChoice === data.isTrue);

    const buttons = els.optionsContainer?.children || [];
    if (buttons.length >= 2) {
        buttons[0].disabled = true;
        buttons[1].disabled = true;
        if (isCorrect) {
            const clickedBtn = userChoice ? buttons[0] : buttons[1];
            clickedBtn.className = 'w-full text-left p-4 rounded-xl border-2 border-dsc-green bg-green-50 flex justify-between items-center';
            clickedBtn.innerHTML += '<i class="fas fa-check text-dsc-green"></i>';
        } else {
            const clickedBtn = userChoice ? buttons[0] : buttons[1];
            const correctBtn = userChoice ? buttons[1] : buttons[0];
            clickedBtn.className = 'w-full text-left p-4 rounded-xl border-2 border-dsc-red bg-red-50 flex justify-between items-center';
            clickedBtn.innerHTML += '<i class="fas fa-times text-dsc-red"></i>';
            correctBtn.className = 'w-full text-left p-4 rounded-xl border-2 border-dsc-green bg-green-50 flex justify-between items-center opacity-70';
        }
    }

    showFeedback(isCorrect, data.rationale);
}

function checkManualAnswer() {
    if (hasAnswered) return;
    const data = activeQuestions[currentQuestionIdx];

    if (data.type === 'text') {
        const input = document.getElementById('text-answer');
        const userVal = (input?.value || '').trim().toLowerCase();
        const normalizedAnswers = (data.acceptedAnswers || []).map((a) => String(a).trim().toLowerCase());
        const isCorrect = normalizedAnswers.includes(userVal);

        if (input) {
            input.disabled = true;
            if (isCorrect) input.classList.add('border-dsc-green', 'bg-green-50', 'text-green-800');
            else input.classList.add('border-dsc-red', 'bg-red-50', 'text-red-800');
        }

        showFeedback(isCorrect, `${data.rationale} (Jawaban: ${data.acceptedAnswers?.[0] ?? ''})`);
        return;
    }

    if (data.type === 'multi') {
        const checkboxes = els.optionsContainer?.querySelectorAll('.custom-checkbox') || [];
        let allCorrect = true;
        let userSelectedAny = false;

        checkboxes.forEach((cb, idx) => {
            const isSelected = cb.checked;
            const shouldBeSelected = data.options[idx].correct;
            const parent = cb.parentElement;
            parent.classList.remove('selected');

            cb.disabled = true;
            if (isSelected) userSelectedAny = true;

            if (isSelected && shouldBeSelected) {
                parent.classList.add('border-dsc-green', 'bg-green-50');
            } else if (isSelected && !shouldBeSelected) {
                parent.classList.add('border-dsc-red', 'bg-red-50');
                allCorrect = false;
            } else if (!isSelected && shouldBeSelected) {
                parent.classList.add('border-yellow-200', 'bg-yellow-50', 'opacity-70');
                allCorrect = false;
            } else {
                parent.classList.add('opacity-40');
            }
        });

        if (!userSelectedAny) allCorrect = false;
        showFeedback(allCorrect, data.rationale);
        return;
    }

    if (data.type === 'match') {
        const selects = els.optionsContainer?.querySelectorAll('.match-select') || [];
        const chosenRightIds = [];
        let allAnswered = true;
        let allCorrect = true;

        selects.forEach((sel) => {
            const leftId = sel.getAttribute('data-left-id');
            const chosen = sel.value;
            if (!chosen) allAnswered = false;
            chosenRightIds.push(chosen);

            sel.disabled = true;

            const expected = data.correctPairs?.[leftId];
            const ok = Boolean(chosen && expected && chosen === expected);
            if (!ok) allCorrect = false;

            if (ok) sel.classList.add('border-dsc-green', 'bg-green-50', 'text-green-800');
            else sel.classList.add('border-dsc-red', 'bg-red-50', 'text-red-800');
        });

        const nonEmpty = chosenRightIds.filter(Boolean);
        const unique = new Set(nonEmpty);
        if (!allAnswered) allCorrect = false;
        if (unique.size !== nonEmpty.length) allCorrect = false;

        const rationale = data.rationale || 'Cocokkan setiap item di sisi kiri dengan deskripsinya di sisi kanan.';
        showFeedback(allCorrect, rationale);
    }

    if (data.type === 'order') {
        const orderItems = els.optionsContainer?.querySelectorAll('.order-item') || [];
        const userOrder = Array.from(orderItems).map((item) => item.getAttribute('data-id'));
        const expectedOrder = data.correctOrder || [];
        
        let allCorrect = true;
        orderItems.forEach((item, idx) => {
            item.style.pointerEvents = 'none';
            const isCorrect = userOrder[idx] === expectedOrder[idx];
            
            if (isCorrect) {
                item.classList.add('border-dsc-green', 'bg-green-50');
                item.querySelector('.fa-grip-vertical')?.classList.replace('fa-grip-vertical', 'fa-check');
            } else {
                item.classList.add('border-dsc-red', 'bg-red-50');
                item.querySelector('.fa-grip-vertical')?.classList.replace('fa-grip-vertical', 'fa-times');
                allCorrect = false;
            }
        });

        showFeedback(allCorrect, data.rationale);
    }
}

function nextQuestion() {
    currentQuestionIdx++;
    if (currentQuestionIdx < activeQuestions.length) {
        loadQuestion();
    } else {
        showResult();
    }
}

function showResult() {
    if (els.quiz) els.quiz.classList.add('hidden');
    if (els.result) els.result.classList.remove('hidden');

    const totalScore = score;
    const maxScore = activeQuestions.length * 10;
    const correctAnswers = score / 10;
    const wrongAnswers = activeQuestions.length - correctAnswers;

    document.getElementById('final-score').innerText = String(totalScore);
    document.getElementById('correct-count').innerText = String(correctAnswers);
    document.getElementById('wrong-count').innerText = String(wrongAnswers);

    if (totalScore === maxScore) {
        sounds.win?.play().catch(() => {});
        if (typeof confetti === 'function') confetti({ particleCount: 200, spread: 80, origin: { y: 0.6 } });
        document.getElementById('result-message').innerText = 'Sempurna! Anda layak jadi Lead DSC!';
    } else if (totalScore >= 70) {
        if (typeof confetti === 'function') confetti({ particleCount: 100, spread: 60, origin: { y: 0.6 } });
        document.getElementById('result-message').innerText = 'Kerja bagus! Pemahaman Anda sudah solid.';
    }
}

// ==========================================
// DATA SAVING
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
    const weekNumber = (selectedWeek === null || selectedWeek === undefined) ? '' : String(selectedWeek);
    formData.append('week', weekNumber);
    formData.append('weekLabel', weekNumber ? `Week ${weekNumber}` : '');

    fetch(SPREADSHEET_API_URL, {
        method: 'POST',
        mode: 'no-cors',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: formData.toString()
    })
        .then(() => {
            status.innerHTML = `<span class="text-green-600"><i class="fas fa-check"></i> Data Terkirim!</span>`;
            btn.innerHTML = `<i class="fas fa-check"></i> Tersimpan`;
            btn.className = 'w-full bg-gray-200 text-gray-500 font-bold py-3.5 rounded-xl cursor-not-allowed flex items-center justify-center gap-2';
        })
        .catch((err) => {
            console.error(err);
            status.innerHTML = `<span class="text-red-500">Gagal koneksi. Kasih tau ke mentor yaa.</span>`;
            btn.disabled = false;
            btn.innerHTML = `<i class="fab fa-google-drive"></i> Submit Nilai`;
        });
}

// Expose minimal API
window.DSQuiz = {
    setQuizContext,
    initQuiz,
    saveToSpreadsheet
};
