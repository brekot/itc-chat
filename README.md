Рабочая версия: https://brekot.github.io/itc-chat/

<h2>Подключение</h2>

Подключаем jQuery, если еще не подключен

<pre>
<script src="https://code.jquery.com/jquery-1.12.4.min.js"></script>
</pre>

Подключаем jQuery UI для возможности ресайза окна по вертикали (если ресайз не нужен, можно не подключать, тогда в настройках необходимо указать windowResizable: false)

<pre>
<script src="https://code.jquery.com/ui/1.11.4/jquery-ui.min.js"></script>
</pre>

Подключаем для проверки телефона по маске (если проверка не нужна, можно не подключать, тогда в настройках необходимо указать formPhoneMask: false)

<pre>
<script src="./js/jquery.mask.min.js"></script>
</pre>

Подключаем для работы Звонка с сайта

<pre>
<script src="./js/infinity.click.to.call.js"></script>
</pre>

Наш основной скрипт

<pre>
<script src="./js/script.js"></script>
</pre>

Наши стили

<pre>
link rel="stylesheet" type="text/css" href="./css/style.css"
</pre>

Подключение и настройки<br>

<pre>
<script type="text/javascript">
$(function(){

	$('body').itOnlineCons({
		modPath: '/itc-chat/'
	});
})
</script>
</pre>

<h2>Настройки:</h2>

<h3>Общие настройки</h3>
windowPlase: 'right',       // right, left - положение окна чата<br>
windowResizable: true,      // true, false - позволять измениять размер окна чата по вертикали? (если false - подключить jquery-ui не нужно)<br>
openSpeed: 400,             // milliseconds - скорость открытия (всплывания) окна чата<br>
modPath: '/',               // (path) - путь до файлов (/ - если файлы располагаются в корне /folder/ - если в папке folder и т.д.)<br>
autoShowInterval: false,    // false или milliseconds - время, через которое чат раскроется сам<br>
openFirst: 'form',          // chat, form - что позывать перым при раскрытии? Чат или форму<br>
<h3>Что подключаем</h3>
showWidgetBtn: true,        // true, false (boolean) - показывать виджет кнопок?<br>
showWidgetChat: true,       // true, false (boolean) - показывать виджет Чата?<br>
showWidgetForm: true,       // true, false (boolean) - показывать виджет Формы?<br>
showWidgetCall: true,       // true, false (boolean) - показывать виджет Звонка?<br>
<h3>Названия</h3>
chatName: 'Онлайн-чат',     // (string) - название виджета Чата<br>
formName: 'Заказать звонок',// (string) - название виджета Формы<br>
callName: 'Позвоните нам',  // (string) - название виджета Звонка<br>
<h3>Внешний вид</h3>
bgColor: 'blue',            // blue, red, green, grey - цвет Чата<br>
bgAlterColor: false,        // #343434 (hex) - альтернативный цвет чата<br>
iconColor: 'white',         // white, black - цвет шрифтов и иконок<br>
<h3>Настройки формы</h3>
formInputName: 'Ваше имя',  // string or false - название поля ввода Имени (false - не показывать)<br>
formInputPhone: 'Телефон',  // string - название поля ввода Телефона<br>
formBtnName: 'Жду звонка',  // string - название кнопки отправки формы<br>
formText: 'Здравствуйте!<br>Хотите мы перезвоним Вам и расскажем подробнее о наших продуктах и услугах?', // string - текст сообщения<br>
formSuccess: 'Ваша заявка принята!<br>Мы перезвоним вам в ближайшее время', // string - текст при успешной отправке формы<br>
formUrl: '//ccserver.infinity.ru:8443/data/scenario/?ScenarioName=callback', // string - адрес отправки<br>
timeFrom: 9,                // int or false - перезвонить С<br>
timeTo: 20,                 // int or false - перезвонить До<br>
formPhoneMask: '+7 (000) 000-00-00', // string или false - маска телефона (если false - проверка отключена и подключать jquery.mask не нужно)<br>
<h3>Настройки Звонка с сайта</h3>
callHost: 'pbx.infinity.ru',<br>
callPort: 5063,<br>
callSecure: true,<br>
callFrom: '100',<br>
callTo: '100',<br>
callPass: 'pAssw0rd_100!',<br>
callTimeout: 15000,<br>
callFinish: 'Завершить звонок',// (string)<br>
<h3>Настройки времени</h3>
timeOffset: 3,              // int - смещение времени<br>
timeWorkChatFrom: false,    // int or false - показывать чат С<br>
timeWorkChatTo: false,      // int or false - показывать чат До<br>
timeWorkFormFrom: false,    // int or false - показывать форму С<br>
timeWorkFormTo: false,      // int or false - показывать форму До<br>
timeWorkCallFrom: false,    // int or false - показывать звонок С<br>
timeWorkCallTo: false,      // int or false - показывать звонок До