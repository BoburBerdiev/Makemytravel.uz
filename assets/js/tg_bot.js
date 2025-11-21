const BOT_TOKEN = '8573773978:AAE9mg05vOR3xMlV22cDCIwgwQ2EL2lsAuU';
const CHAT_ID = '923408791';

document.querySelectorAll('.dropdown-item').forEach(item => {
    item.addEventListener('click', function (e) {
        e.preventDefault();
        const selectedText = this.textContent;
        document.getElementById('packageDropdown').textContent = selectedText;
        document.getElementById('packageDropdown').dataset.selected = selectedText;
    });
});

document.getElementById('tourForm').addEventListener('submit', function (e) {
    e.preventDefault();

    const contact = document.getElementById('contactInput').value.trim();
    const selectedPackage = document.getElementById('packageDropdown').dataset.selected || 'Не выбрано';

    const message = `🧳 Новый запрос:\n📞 Контакт: ${contact}\n📦 Турпакет: ${selectedPackage}`;

    fetch(`https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            chat_id: CHAT_ID,
            text: message
        })
    })
        .then(response => response.json())
        .then(data => {
            if (data.ok) {
                document.getElementById('tourForm').reset();
                document.getElementById('packageDropdown').textContent = "Выбрать турпакет";
                delete document.getElementById('packageDropdown').dataset.selected;

                const modal = new bootstrap.Modal(document.getElementById('exampleModal'));
                modal.show();
            } else {
                alert('Ошибка при отправке!');
                console.error(data);
            }
        })
        .catch(error => {
            alert('Ошибка при отправке!');
            console.error('Telegram error:', error);
        });
});