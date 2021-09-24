(function ($) {

    var settings = {
        /* Общие настройки */
        windowPlase: 'right',       // right, left - положение окна чата
        windowResizable: true,      // true, false - позволять измениять размер окна чата по вертикали? (если false - подключить jquery-ui не нужно)
        openSpeed: 400,             // milliseconds - скорость открытия (всплывания) окна чата
        modPath: '/',               // (path) - путь до файлов (/ - если файлы располагаются в корне /folder/ - если в папке folder и т.д.)
        autoShowInterval: false,    // false или milliseconds - время, через которое чат раскроется сам
        openFirst: 'form',          // chat, form - что позывать перым при раскрытии? Чат или форму

        /* Что подключаем */
        showWidgetBtn: true,        // true, false (boolean) - показывать виджет кнопок?
        showWidgetChat: true,       // true, false (boolean) - показывать виджет Чата?
        showWidgetForm: true,       // true, false (boolean) - показывать виджет Формы?
        showWidgetCall: true,       // true, false (boolean) - показывать виджет Звонка?

        /* Названия */
        chatName: 'Онлайн-чат',     // (string) - название виджета Чата
        formName: 'Заказать звонок',// (string) - название виджета Формы
        callName: 'Позвоните нам',  // (string) - название виджета Звонка

        /* Внешний вид */
        bgColor: 'blue',            // blue, red, green, grey - цвет Чата
        bgAlterColor: false,        // #343434 (hex) - альтернативный цвет чата 
        iconColor: 'white',         // white, black - цвет шрифтов и иконок

        /* Настройки формы */
        formInputName: 'Ваше имя',  // string or false - название поля ввода Имени (false - не показывать)
        formInputPhone: 'Телефон',  // string - название поля ввода Телефона
        formBtnName: 'Жду звонка',  // string - название кнопки отправки формы
        formText: 'Здравствуйте!<br>Хотите мы перезвоним Вам и расскажем подробнее о наших продуктах и услугах?', // string - текст сообщения
        formSuccess: 'Ваша заявка принята!<br>Мы перезвоним вам в ближайшее время', // string - текст при успешной отправке формы
        formUrl: '//ccserver.infinity.ru:8443/data/scenario/?ScenarioName=callback', // string - адрес отправки
        timeFrom: 9,                // int or false - перезвонить С
        timeTo: 20,                 // int or false - перезвонить До
        formPhoneMask: '+7 (000) 000-00-00', // string или false - маска телефона (если false - проверка отключена и подключать jquery.mask не нужно)

        /* Настройки Звонка с сайта */
        callHost: 'pbx.infinity.ru',
        callPort: 5063,
        callSecure: true,
        callFrom: '100',
        callTo: '100',
        callPass: 'pAssw0rd_100!',
        callTimeout: 15000,
        callFinish: 'Завершить звонок',// (string)

        /* Настройки времени */
        timeOffset: 3,              // int - смещение времени
        timeWorkChatFrom: false,    // int or false - показывать чат С
        timeWorkChatTo: false,      // int or false - показывать чат До
        timeWorkFormFrom: false,    // int or false - показывать форму С
        timeWorkFormTo: false,      // int or false - показывать форму До
        timeWorkCallFrom: false,    // int or false - показывать звонок С
        timeWorkCallTo: false,      // int or false - показывать звонок До
    };

    var elems = {
        widgetWindow: null,
        widgetChat: null,
        widgetForm: null,
        widgetBtn: null,
        headBtns: null,
        sendForm: null
    }

    var isOpenedWindow = false;
    var animateTimeOut = false;
    var windowStandartHeight = 0;

    var methods = {
        init: function(options)
        {
            console.log(document)
            settings = $.extend(settings, options);

            methods.checkTime();

            if (settings.showWidgetChat || settings.showWidgetForm)
            {
                methods.buildWidgetWindow();

                methods.actionWindow();

                if (settings.autoShowInterval)
                {
                    methods.openWindowAuto();
                }
            }

            if (settings.showWidgetChat)
            {
                methods.buildWidgetChat();
            }

            if (settings.showWidgetForm)
            {
                methods.buildWidgetForm();

                methods.actionForm();
            }

            if (settings.showWidgetBtn)
            {
                methods.buildWidgetBtn();

                methods.setCountWidgetBtn();

                methods.animateWidgetBtn();

                methods.actionWidgetBtn();
            }
            else
            {
                windowStandartHeight = 40;

                elems.widgetWindow.css('height', windowStandartHeight + 'px');
            }

            methods.setBgColor();

            methods.actionBtns();
        },
        // Проверка времени
        checkTime: function()
        {
            var now = new Date();

            now = now.getHours() + (now.getTimezoneOffset() / 60);

            if (settings.timeWorkChatFrom && settings.timeWorkChatTo)
            {
                if (settings.timeWorkChatFrom - settings.timeOffset > now || settings.timeWorkChatTo - settings.timeOffset <= now)
                {
                    settings.showWidgetChat = false;
                }
            }

            if (settings.timeWorkFormFrom && settings.timeWorkFormTo)
            {
                if (settings.timeWorkFormFrom - settings.timeOffset > now || settings.timeWorkFormTo - settings.timeOffset <= now)
                {
                    settings.showWidgetForm = false;
                }
            }

            if (settings.timeWorkCallFrom && settings.timeWorkCallTo)
            {
                if (settings.timeWorkCallFrom - settings.timeOffset > now || settings.timeWorkCallTo - settings.timeOffset <= now)
                {
                    settings.showWidgetCall = false;
                }
            }
        },
        // Добавление общего окна чата и формы
        buildWidgetWindow: function()
        {
            var html = "" + 
            "<div id='it-widget-window' class='it-widget it-widget_" + settings.windowPlase + "'>" + 
            "	<div class='it-widget__head it-widget__head_" + settings.iconColor + "'>" + 
            "		<div class='it-widget__head-open' data-open='" + settings.openFirst + "'></div>" + 
            "		<div class='it-widget__head-title'>" + settings[settings.openFirst + 'Name'] +  "</div>" + 
            "		<div class='it-widget__head-btns' id='id-head-btns'>";

            // Добавление кнопки чата
            if (settings.showWidgetChat)
            {
                html = html + 
            "        <a href='javascript:;' class='it-widget__head-btn it-btn-open-chat' title='" + settings.chatName + "'>" + 
            "           <svg class='it-widget__head-icon'><use xlink:href='" + settings.modPath + "img/sprite.svg#chat'></use></svg>" +  
            "        </a>"
            }

            // Добавление кнопки формы
            if (settings.showWidgetForm)
            {
                html = html + 
            "        <a href='javascript:;' class='it-widget__head-btn it-btn-open-form' title='" + settings.formName + "'>" + 
            "			<svg class='it-widget__head-icon'><use xlink:href='" + settings.modPath + "img/sprite.svg#form'></use></svg>" + 
            "        </a>"
            }

            // Добавление кнопки звонка
            if (settings.showWidgetCall)
            {
                html = html + 
            "        <a href='javascript:;' class='it-widget__head-btn it-btn-open-call' title='" + settings.callName + "'>" + 
            "			<svg class='it-widget__head-icon'><use xlink:href='" + settings.modPath + "img/sprite.svg#call'></use></svg>" + 
            "        </a>"
            }

            html = html + 
            "		    <a href='javascript:;' class='it-widget__head-btn it-widget__head-btn_close'>" + 
            "			    <svg class='it-widget__head-icon it-widget__head-icon_close'>" + 
            "				    <use xlink:href='" + settings.modPath + "img/sprite.svg#close'></use>" + 
            "			    </svg>" + 
            "		    </a>" + 
            "		</div>" + 
            "	</div>" + 
            "	<div class='it-widget__parts'>" + 
            "	</div>" + 
            "</div>" + 
            "";

            $("body").append(html);

            elems.widgetWindow = $('#it-widget-window');

            elems.headBtns = $('#id-head-btns');
        },
        // Добавление виджета чата
        buildWidgetChat: function()
        {
            var html = "" + 
            "<div class='it-widget__part' id='it-widget-chat'>" + 
            "	<iframe src='" + settings.modPath + "chat.html' id='it-chat-frame' scrolling='no' frameborder='0'></iframe>" + 
            "</div>";

            $(elems.widgetWindow).find('.it-widget__parts').append(html);

            elems.widgetChat = $('#it-widget-chat');
        },
        // Добавление виджета формы
        buildWidgetForm: function()
        {
            var html = "" + 
            "<div class='it-widget__part' id='it-widget-form'>" + 
            "   <form class='it-form' method='post' id='it-form'>";

            if (settings.formText)
            {
                html = html + "<div class='it-form__text'>" + settings.formText + "</div>";
            }

            if (settings.formInputName)
            {
                html = html + "<input type='text' placeholder='" + settings.formInputName + "' class='it-form__input it-form-name'>";
            }

            html = html + "<input type='tel' placeholder='" + (settings.formInputPhone ? settings.formInputPhone : "Телефон") + "' class='it-form__input it-form-phone' required>";

            if (settings.timeFrom && settings.timeTo && settings.timeFrom < settings.timeTo)
            {
                html = html + "<div class='it-form__text'>Выберите удобное время звонка:</div>";

                html = html + 
                "<div class='it-form__time'>" + 
                "	<span class='it-form__time-sep'>с </span>" + 
                "	<select class='it-form__time-select it-time-from-h'>";

                for (var i = settings.timeFrom; i < settings.timeTo; i++)
                {
                    html = html + '<option value="' + i + '">' + i + '</option>';
                }

                html = html + 
                "	</select>" + 
                "	<span class='it-form__time-sep'> : </span>" + 
                "	<select class='it-form__time-select it-time-from-m'>" + 
                "		<option value='00'>00</option>" + 
                "		<option value='15'>15</option>" + 
                "		<option value='30'>30</option>" + 
                "		<option value='45'>45</option>" + 
                "	</select>" + 
                "	<span class='it-form__time-sep'> до </span>" + 
                "	<select class='it-form__time-select it-time-to-h'>";

                for (var i = settings.timeFrom + 1; i <= settings.timeTo; i++)
                {
                    html = html + '<option ' + (i == settings.timeTo ? 'selected' : '') + ' value="' + i + '">' + i + '</option>';
                }

                html = html + 
                "	</select>" + 
                "	<span class='it-form__time-sep'> : </span>" + 
                "	<select class='it-form__time-select it-time-to-m'>" + 
                "		<option value='00'>00</option>" + 
                "		<option value='15'>15</option>" + 
                "		<option value='30'>30</option>" + 
                "		<option value='45'>45</option>" + 
                "	</select>" + 
                "</div>";
            }

            html = html + 
            "       <button type='submit' class='it-form__btn'>" + (settings.formBtnName ? settings.formBtnName : "Жду звонка") + "</button>" + 
            "   </form>" + 
            "</div>";

            $(elems.widgetWindow).find('.it-widget__parts').append(html);

            elems.widgetForm = $('#it-widget-form');

            elems.sendForm = $('#it-form');

            if (settings.formPhoneMask)
            {
                $(elems.sendForm).find('input[type="tel"]').mask(settings.formPhoneMask);
            }
        },
        // Добавление виджета с кнопками
        buildWidgetBtn: function()
        {
            var html = "" + 
            "<div class='it-get-btn it-get-btn_icon-" + settings.iconColor + "' id='it-widget-btn'>" + 
            "    <a href='javascript:;' class='it-get-btn__btn it-get-btn__btn_main'>" + 
            "		<svg class='it-get-btn__icon it-get-btn__icon_show'><use xlink:href='" + settings.modPath + "img/sprite.svg#main'></use></svg>" + 
            "       <svg class='it-get-btn__icon it-get-btn__icon_close'><use xlink:href='" + settings.modPath + "img/sprite.svg#close'></use></svg>" + 
            "		<span class='it-get-btn__panel it-get-btn__panel_main'>" + 
            "			Напишите или<br>" + 
            "			позвоните нам" + 
            "		</span>" + 
            "    </a>" + 
            "    <div class='it-get-btn__btn-block'>";

            // Добавление кнопки чата
            if (settings.showWidgetChat)
            {
                html = html + 
            "        <a href='javascript:;' class='it-get-btn__btn it-get-btn__btn_inner it-btn-open-chat'>" + 
            "           <svg class='it-get-btn__icon'><use xlink:href='" + settings.modPath + "img/sprite.svg#chat'></use></svg>" + 
            "			<span class='it-get-btn__panel it-get-btn__panel_inner'>" + settings.chatName + "</span>" + 
            "        </a>"
            }

            // Добавление кнопки формы
            if (settings.showWidgetForm)
            {
                html = html + 
            "        <a href='javascript:;' class='it-get-btn__btn it-get-btn__btn_inner it-btn-open-form'>" + 
            "			<svg class='it-get-btn__icon'><use xlink:href='" + settings.modPath + "img/sprite.svg#form'></use></svg>" + 
            "			<span class='it-get-btn__panel it-get-btn__panel_inner'>" + settings.formName + "</span>" + 
            "        </a>"
            }

            // Добавление кнопки звонка
            if (settings.showWidgetCall)
            {
                html = html + 
            "        <a href='javascript:;' class='it-get-btn__btn it-get-btn__btn_inner it-btn-open-call'>" + 
            "			<svg class='it-get-btn__icon'><use xlink:href='" + settings.modPath + "img/sprite.svg#call'></use></svg>" + 
            "			<span class='it-get-btn__panel it-get-btn__panel_inner'>" + settings.callName + "</span>" + 
            "        </a>"
            }

            html = html + 
            "    </div>" + 
            "</div>"

            $("body").append(html);

            elems.widgetBtn = $('#it-widget-btn');
        },
        // Добавление фоновы цветов
        setBgColor: function()
        {
            if (settings.bgAlterColor)
            {
                $(elems.widgetWindow).css('backgroundColor', settings.bgAlterColor);
    
                $(elems.widgetBtn).find('a').css('backgroundColor', settings.bgAlterColor);
            }
            else
            {
                $(elems.widgetWindow).addClass("it-widget_" + settings.bgColor);

                $(elems.widgetBtn).addClass("it-get-btn_" + settings.bgColor);
            }
        },
        // Отправка сообщения
        sendMessage: function(data)
		{
            var frame = document.getElementById('it-chat-frame');

            frame.contentWindow.postMessage(data, '*');
        },
        // Открытие окна чата
        openWindow: function(e)
        {
            if (e && e.data && e.data.widgetName)
            {
                settings.openFirst = e.data.widgetName;
            }

            methods.toggleWidgetBtn();

            isOpenedWindow = true;

            elems.widgetWindow.animate({

                height: "400px"

            }, settings.openSpeed, 'linear', function () {

                methods.sendMessage({ command: 'open' });
            });

            elems.widgetWindow.addClass('active');

            $(elems.widgetBtn).fadeOut(0);

            elems.headBtns.find('.it-widget__head-btn_active').removeClass('it-widget__head-btn_active');

            elems.headBtns.find('.it-btn-open-' + settings.openFirst).addClass('it-widget__head-btn_active');

            elems.widgetWindow.find('.it-widget__part_open').removeClass('it-widget__part_open');

            $('#it-widget-' + settings.openFirst).addClass('it-widget__part_open');

            var strName = elems.headBtns.find('.it-btn-open-' + settings.openFirst).attr('title');

            elems.widgetWindow.find('.it-widget__head-title').text(strName);
        },
        // Автооткрытие окна
        openWindowAuto: function()
        {
            window.addEventListener('message', function(event) {

                if (event.data && event.data.command && event.data.command == 'connected')
                {
                    setTimeout(function() {
    
                        if (!isOpenedWindow) methods.openWindow();
    
                    }, settings.autoShowInterval);
                }
            });
        },
        // Действия виджета чата
        actionWindow: function()
        {
            elems.widgetWindow.find('.it-widget__head-open').click(methods.openWindow);

            elems.widgetWindow.find('.it-widget__head-btn_close').click(function() {

                elems.widgetWindow.animate({
    
                    height: windowStandartHeight
    
                }, settings.openSpeed, 'linear');

                elems.widgetWindow.removeClass('active');

                methods.sendMessage({ command: 'close' });

                $(elems.widgetBtn).fadeIn(600);

                $('.it-widget__head-btn_active').removeClass('it-widget__head-btn_active');
            });

            if (settings.windowResizable)
            {
                elems.widgetWindow.resizable({
                    handles: "n",
                    minHeight: 400,
                    maxHeight: $('body').height(),
                });
            }
        },
        // Количество кнопок
        setCountWidgetBtn: function()
        {
            var countBtn = 0;

            if (settings.showWidgetChat) countBtn++;
            if (settings.showWidgetForm) countBtn++;
            if (settings.showWidgetCall) countBtn++;

            elems.widgetBtn.addClass('it-get-btn_' + countBtn);
        },
        // Анимации виджета с кнопками
        animateWidgetBtn: function()
        {
            setTimeout(function(){

                elems.widgetBtn.show();
    
            }, 100);

            setTimeout(function(){
    
                elems.widgetBtn.addClass('it-get-btn_active');
    
            }, 200);

            animateTimeOut = setTimeout(function(){

                elems.widgetBtn.addClass('it-get-btn_show-panel');
        
            }, 1000);
        },
        // Скрыти подсказки "Напишите или позвоните нам"
        stopAndHideWriteUs: function()
        {
            clearTimeout(animateTimeOut);

            $(elems.widgetBtn).removeClass('it-get-btn_show-panel');
        },
        // Скрытие / показ виджета с кнопками
        toggleWidgetBtn: function()
        {
            methods.stopAndHideWriteUs();

            $(elems.widgetBtn).toggleClass('it-get-btn_open');
        },
        // Поведение виджета с кнопками
        actionWidgetBtn: function()
        {
            elems.widgetBtn.find('.it-get-btn__btn_main').mouseenter(function(){
    
                methods.stopAndHideWriteUs();
    
                elems.widgetBtn.addClass('it-get-btn_open');
            });

            elems.widgetBtn.find('.it-get-btn__btn_main').click(methods.toggleWidgetBtn);
        },
        // Действия кнопок в шапке и виджете с кнопками 
        actionBtns: function()
        {
            $('.it-btn-open-chat').on('click', {widgetName: "chat"}, methods.openWindow);

            $('.it-btn-open-form').on('click', {widgetName: "form"}, methods.openWindow);

            $('.it-btn-open-call').on('click', function(){

                if (InfinityIsSupported())
                {
                    if ($('.it-btn-open-call').hasClass('active'))
                    {
                        InfinityDrop();
                    }
                    else
                    {
                        InfinityCall({
                            host: settings.callHost,
                            port: settings.callPort,
                            secure: settings.callSecure,
                            from: settings.callFrom,
                            to: settings.callTo,
                            password: settings.callPass,
                            timeout: settings.callTimeout,
                            onConnected: function ()
                            {
                                $('.it-btn-open-call').addClass('active');

                                $(elems.widgetWindow).find('.it-btn-open-call').attr('title', settings.callFinish)

                                $(elems.widgetBtn).find('.it-btn-open-call .it-get-btn__panel').text(settings.callFinish);
                            },
                            onFinished: function ()
                            {
                                $('.it-btn-open-call').removeClass('active');

                                $(elems.widgetWindow).find('.it-btn-open-call').attr('title', settings.callName)

                                $(elems.widgetBtn).find('.it-btn-open-call .it-get-btn__panel').text(settings.callName);
                            }
                        });
                    }
                }
            });
        },
        // Действия формы
        actionForm: function()
        {
            if (settings.formPhoneMask)
            {
                $(elems.sendForm).find('input[type="tel"]').on('input', function(e){

                    if (e.target.value.length < e.target.maxLength) e.target.setCustomValidity("Укажите код города и телефон");
                    else e.target.setCustomValidity("");
                });
            }

            $(elems.sendForm).on('submit', function(e){

                e.preventDefault();

                var data = {
                    "Phone"	: $('.it-form-phone').val(),
                    "Name"	: $('.it-form-name').val(),
                    "URL"	: window.location.href,
                    //"ComagicId" : Comagic.getCredentials().session_id
                };

                if (settings.timeFrom && settings.timeTo)
                {
                    data.Time1 = settings.timeFrom + ':00';
                    data.Time2 = settings.timeTo + ':00';

                    var fromH = $('.it-time-from-h').val();
                    var fromM = $('.it-time-from-m').val();
                    var toH = $('.it-time-to-h').val();
                    var toM = $('.it-time-to-m').val();

                    if (fromH && fromM && toH && toM && parseInt(fromH + fromM) < parseInt(toH + toM))
                    {
                        
                        data.Time1 = fromH + ':' + fromM;
                        data.Time2 = toH + ':' + toM;
                    }
                }

                $.ajax({
                    url: settings.formUrl,
                    type: 'POST',
                    data: '{"Result":' + JSON.stringify(data) + '}',
                    success: function(jsondata){
    
                        if (jsondata.result.Data === 'OK')
                        {
                            var html = "" + 
                            "<div class='it-success'>" + 
                            "   <svg class='it-success__icon'><use xlink:href='" + settings.modPath + "img/sprite.svg#success'></use></svg>" + 
                            "   <div class='it-success__text'>" + settings.formSuccess + "</div>" + 
                            "</div>";

                            $(elems.sendForm).after(html);

                            $(elems.sendForm).remove();
                        }
                        else
                        {
                            alert("Ошибка сервера");
                        }
                    },
                    error: function(){
    
                        alert("Ошибка отправки данных");
                    }
                });
    
                return false;
            });
        }
    }

    jQuery.fn.itOnlineCons = function (options) {

        methods.init(options);
    }

})(jQuery);