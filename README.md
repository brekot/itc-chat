Рабочая версия: https://brekot.github.io/itc-chat/

<h2>Подключение</h2>

Подключаем jQuery, если еще не подключен

<script src="https://code.jquery.com/jquery-1.12.4.min.js"></script>

Подключаем jQuery UI для возможности ресайза окна по вертикали (если ресайз не нужен, можно не подключать, тогда в настройках необходимо указать windowResizable: false )

<script src="https://code.jquery.com/ui/1.11.4/jquery-ui.min.js"></script>

Подключаем для проверки телефона по маске (если проверка не нужна, можно не подключать, тогда в настройках необходимо указать formPhoneMask: false)

<script src="./js/jquery.mask.min.js"></script>

Подключаем для работы Звонка с сайта

<script src="./js/infinity.click.to.call.js"></script>

Наш основной скрипт

<script src="./js/script.js"></script>

Наши стили

<link rel="stylesheet" type="text/css" href="./css/style.css">

Подключение и настройки

<script type="text/javascript">
$(function(){

	$('body').itOnlineCons({
		chatPath: 'chat.html'
	});
})
</script>

<h2>Настройки:</h2>

Общие настройки
windowPlase: 'right',       // right, left - положение окна чата
windowResizable: true,      // true, false - позволять измениять размер окна чата по вертикали? (если false - подключить jquery-ui не нужно)
openSpeed: 400,             // milliseconds - скорость открытия (всплывания) окна чата
modPath: '/',               // (path) - путь до файлов (/ - если файлы располагаются в корне /folder/ - если в папке folder и т.д.)
autoShowInterval: false,    // false или milliseconds - время, через которое чат раскроется сам
openFirst: 'form',          // chat, form - что позывать перым при раскрытии? Чат или форму

Что подключаем
showWidgetBtn: true,        // true, false (boolean) - показывать виджет кнопок?
showWidgetChat: true,       // true, false (boolean) - показывать виджет Чата?
showWidgetForm: true,       // true, false (boolean) - показывать виджет Формы?
showWidgetCall: true,       // true, false (boolean) - показывать виджет Звонка?

Названия
chatName: 'Онлайн-чат',     // (string) - название виджета Чата
formName: 'Заказать звонок',// (string) - название виджета Формы
callName: 'Позвоните нам',  // (string) - название виджета Звонка

Внешний вид
bgColor: 'blue',            // blue, red, green, grey - цвет Чата
bgAlterColor: false,        // #343434 (hex) - альтернативный цвет чата 
iconColor: 'white',         // white, black - цвет шрифтов и иконок

Настройки формы
formInputName: 'Ваше имя',  // string or false - название поля ввода Имени (false - не показывать)
formInputPhone: 'Телефон',  // string - название поля ввода Телефона
formBtnName: 'Жду звонка',  // string - название кнопки отправки формы
formText: 'Здравствуйте!<br>Хотите мы перезвоним Вам и расскажем подробнее о наших продуктах и услугах?', // string - текст сообщения
formSuccess: 'Ваша заявка принята!<br>Мы перезвоним вам в ближайшее время', // string - текст при успешной отправке формы
formUrl: '//ccserver.infinity.ru:8443/data/scenario/?ScenarioName=callback', // string - адрес отправки
timeFrom: 9,                // int or false - перезвонить С
timeTo: 20,                 // int or false - перезвонить До
formPhoneMask: '+7 (000) 000-00-00', // string или false - маска телефона (если false - проверка отключена и подключать jquery.mask не нужно)

Настройки Звонка с сайта
callHost: 'pbx.infinity.ru',
callPort: 5063,
callSecure: true,
callFrom: '100',
callTo: '100',
callPass: 'pAssw0rd_100!',
callTimeout: 15000,
callFinish: 'Завершить звонок',// (string)

Настройки времени
timeOffset: 3,              // int - смещение времени
timeWorkChatFrom: false,    // int or false - показывать чат С
timeWorkChatTo: false,      // int or false - показывать чат До
timeWorkFormFrom: false,    // int or false - показывать форму С
timeWorkFormTo: false,      // int or false - показывать форму До
timeWorkCallFrom: false,    // int or false - показывать звонок С
timeWorkCallTo: false,      // int or false - показывать звонок До