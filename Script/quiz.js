(function () {
    const QUESTIONS_PER_WEEK = {
        1: 10,
        2: 10
    };

    function safeParseJson(value) {
        try {
            return JSON.parse(value);
        } catch {
            return null;
        }
    }

    const user = safeParseJson(localStorage.getItem('dsquiz:user'));
    const weekStr = localStorage.getItem('dsquiz:week');
    const week = weekStr ? Number(weekStr) : null;
    const spreadsheetUrl = localStorage.getItem('dsquiz:url') || '';

    if (!user || !user.nama || !user.npm || !week) {
        window.location.href = 'index.html';
        return;
    }

    const pools = {
        1: window.questionPoolWeek1,
        2: window.questionPoolWeek2
    };

    const pool = pools[week];
    if (!pool || pool.length === 0) {
        window.location.href = 'index.html';
        return;
    }

    window.DSQuiz.setQuizContext({
        user,
        week,
        spreadsheetUrl
    });

    const count = QUESTIONS_PER_WEEK[week] ?? 10;
    window.DSQuiz.initQuiz(pool, count);

    const btnSave = document.getElementById('btn-save');
    if (btnSave) btnSave.onclick = () => window.DSQuiz.saveToSpreadsheet();

    const btnBack = document.getElementById('btn-back');
    if (btnBack) {
        btnBack.onclick = () => {
            // keep user inputs; allow changing week quickly
            window.location.href = 'index.html';
        };
    }
})();
