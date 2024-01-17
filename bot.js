const TelegramBot = require('node-telegram-bot-api');

const token = 'Рома привіт';
const adminUsernames = ['Перший адмін', 'Другий адмін'];

const bot = new TelegramBot(token, { polling: true });

setInterval(() => {
    bot.getMe().then(me => {
        console.log(`Бот все еще работает: ${me.username}`);
    }).catch(error => {
        console.error('Ошибка проверки статуса бота:', error);
    });
}, 300000);

bot.on('polling_error', (error) => {
    console.error('Ошибка опроса:', error.message);
});

bot.on('message', (msg) => {
    const chatId = msg.chat.id;
    const username = msg.from.username;

    if (msg.chat.type === 'private') {
        if (msg.text && msg.text.toLowerCase() === '/start') {
            bot.sendMessage(chatId, 'Цей бот призначений для пропозиції мемів. Сподіваємося на смішнявку!');
        } else {
            adminUsernames.forEach(adminUsername => {
                if (msg.text) {
                    bot.sendMessage(adminUsername, `Пользователь @${username} написал вам в личные сообщения: ${msg.text}`);
                } else if (msg.photo) {
                    bot.sendPhoto(adminUsername, msg.photo[0].file_id, { caption: `Фото от @${username}` });
                } else if (msg.video) {
                    bot.sendVideo(adminUsername, msg.video.file_id, { caption: `Видео от @${username}` });
                }
            });

            bot.sendMessage(chatId, 'Ваше сообщение отправлено на обработку. Спасибо!');
        }
    }
});

console.log('Бот запущен');
