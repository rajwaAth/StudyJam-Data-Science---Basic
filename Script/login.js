(function () {
    function qs(id) {
        return document.getElementById(id);
    }

    const els = {
        start: qs('start-screen'),
        week: qs('week-screen'),
        userBadge: qs('user-badge'),
        displayNama: qs('display-nama'),
        inputNama: qs('input-nama'),
        inputNpm: qs('input-npm'),
        inputUrl: qs('input-url'),
        settingsPanel: qs('settings-panel'),
        weekUserName: qs('week-user-name'),
        weekUserNpm: qs('week-user-npm'),
        weekHint: qs('week-hint')
    };

    let spreadsheetUrl = null;
    let userData = { nama: '', npm: '' };

    function toggleSettings() {
        if (!els.settingsPanel) return;
        els.settingsPanel.classList.toggle('hidden');
    }

    function showWeekSelection() {
        if (els.weekUserName) els.weekUserName.innerText = (userData.nama.split(' ')[0] || userData.nama || 'User');
        if (els.weekUserNpm) els.weekUserNpm.innerText = (userData.npm || 'NPM');
        if (els.weekHint) els.weekHint.innerText = '';

        if (els.start) els.start.classList.add('hidden');
        if (els.week) els.week.classList.remove('hidden');
    }

    function backToLogin() {
        if (els.week) els.week.classList.add('hidden');
        if (els.start) els.start.classList.remove('hidden');
    }

    function handleLogin(e) {
        e.preventDefault();
        const nama = (els.inputNama?.value || '').trim();
        const npm = (els.inputNpm?.value || '').trim();
        const urlInput = (els.inputUrl?.value || '').trim();

        spreadsheetUrl = urlInput || null;

        if (!nama || !npm) return;
        userData = { nama, npm };

        if (els.displayNama) els.displayNama.innerText = nama.split(' ')[0];
        if (els.userBadge) els.userBadge.classList.remove('hidden');

        showWeekSelection();
    }

    function selectWeek(weekNumber) {
        // Persist for quiz page
        localStorage.setItem('dsquiz:user', JSON.stringify(userData));
        localStorage.setItem('dsquiz:week', String(weekNumber));
        if (spreadsheetUrl) localStorage.setItem('dsquiz:url', spreadsheetUrl);
        else localStorage.removeItem('dsquiz:url');

        window.location.href = 'quiz.html';
    }

    // Expose for inline HTML handlers
    window.toggleSettings = toggleSettings;
    window.handleLogin = handleLogin;
    window.backToLogin = backToLogin;
    window.selectWeek = selectWeek;
})();
