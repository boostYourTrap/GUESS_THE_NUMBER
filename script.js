
// debugger
let minValue;
let maxValue;
let answerNumber;
let orderNumber = 1;
const answerField = document.getElementById('answerField');
const orderNumberField = document.getElementById('orderNumberField');
let gameRun = true;
let textAnswer;
   
//Запуск игры
    async function startGame () {
        try {
            minValue = '';
            maxValue = '';      

            orderNumberField.innerText = 1;
            answerField.innerText = 'Давай загадывай число';
            minValue = parseInt(await showCustomPrompt('Введите минимальное значение')) || 0; // короткий цикл операций дизъюнкции.
            minValue = minValue > 999 ? 999 : minValue < -999 ? -999 : minValue;

            await new Promise(resolve => setTimeout(resolve, 700));

            maxValue = parseInt(await showCustomPrompt('Введите максимальное значение')) || 0; // короткий цикл операций дизъюнкции.
            maxValue = maxValue > 999 ? 999 : maxValue < -999 ? -999 : maxValue;

            if(isNaN(minValue) || isNaN(maxValue) || minValue === undefined || maxValue === undefined) {
                throw new Error('Некорректное значение! Пожалуйста, попробуйте снова.');
            }
         
            await new Promise(resolve => setTimeout(resolve, 700));
            showBootstrapAlert(`Загадайте любое целое число от ${minValue} до ${maxValue}, а я его угадаю`);
            
            answerNumber = Math.floor((minValue + maxValue) / 2);
            orderNumberField.innerText = orderNumber;

            const phraseRandom = Math.floor(Math.random() * 3);

           
            let answerPhrase;
            let textNumber = numberToWords(answerNumber); 
            textNumber = `<span style = "font-weight: bold; color: red; text-shadow: 1px 1px 2px black;"> ${textNumber} </span> ` ;

            switch(phraseRandom) {
                case 0:
                    answerPhrase = `Да это легко! Ты загадал число ${textNumber}  \u{1F60E}`;
                    break;
                case 1:
                    answerPhrase = `Наверное это число ${textNumber} \u{1F914}`;
                    break;
                case 2:
                    answerPhrase = `Хмм... Может быть это число ${textNumber} \u{1F92F}`;
                    break;
            }

            answerField.innerHTML =  answerPhrase ;

        } catch (error) {
            showBootstrapAlert(error.message, 'warning');
            answerNumber = undefined; 
        } 
        
    }

    startGame()


    // Кнопка заново
    document.getElementById('btnRetry').addEventListener('click', async function () {
        // debugger
        minValue = '';
        maxValue = '';
        answerNumber = '';
        orderNumber = 1;
        gameRun = true;
        startGame();
    });


    // Кнопка больше
    document.getElementById('btnOver').addEventListener('click', () => {

        if (!gameRun) {
            showBootstrapAlert('Игра уже завершена. Нажмите "Заново", чтобы начать новую.', 'info');
            return; 
        }

        if (typeof answerNumber === 'undefined' || isNaN(answerNumber) || answerNumber === '') {
            showBootstrapAlert('Вы отменили ввод значений, начните игру заново', 'danger'); 
            return;
        }

        if(gameRun){
            if(minValue === maxValue){
                const phraseRandom = Math.round(Math.random());
                const answerPhrase = (phraseRandom === 1) ?
                    `Вы загадили не правильное число! \n\u{1F914}` :
                    `Я сдаюсь.. \n\u{1F92F}`;
                answerField.innerText = answerPhrase;
                gameRun = false;
            }else {
                minValue = answerNumber  + 1;
                answerNumber  = Math.floor((minValue + maxValue) / 2);
                orderNumber++;
                orderNumberField.innerText = orderNumber;
                let textNumber =  numberToWords(answerNumber);
                textNumber = `<span style = "font-weight: bold; color: red; text-shadow: 1px 1px 2px black;"> ${textNumber} </span> ` ;
                answerField.innerHTML = `Вы загадали число ${textNumber }?`;

                
            }
        }

    })


    // Кнопка меньше
    document.getElementById('btnLess').addEventListener('click', () => {
        debugger

        if (!gameRun) {
            showBootstrapAlert('Игра уже завершена. Нажмите "Заново", чтобы начать новую.', 'info');
            return; 
        }

        if (typeof answerNumber === 'undefined' || isNaN(answerNumber) || answerNumber === '') {
            showBootstrapAlert('Вы отменили ввод значений, начните игру заново', 'danger'); 
            return;
        }

        if (maxValue - minValue <= 1) {
            const phraseRandom = Math.round(Math.random());
            const answerPhrase = (phraseRandom === 1) ?
                `Вы загадили не правильное число! \n\u{1F914}` :
                `Я сдаюсь.. \n\u{1F92F}`;
            answerField.innerText = answerPhrase;
            gameRun = false;
            return;
        }

        if(minValue === maxValue){
            const phraseRandom = Math.round(Math.random());
            const answerPhrase = (phraseRandom === 1) ?
                `Вы загадили не правильное число! \n\u{1F914}` :
                `Я сдаюсь.. \n\u{1F92F}`;
            answerField.innerText = answerPhrase;
            gameRun = false;
        } 
         else {
            maxValue = answerNumber - 1;
            answerNumber = Math.floor((minValue + maxValue) / 2);
            orderNumber++;
            orderNumberField.innerText = orderNumber;
            let textNumber =  numberToWords(answerNumber);
            textNumber = `<span style = "font-weight: bold; color: red; text-shadow: 1px 1px 2px black;"> ${textNumber} </span> ` ;
            answerField.innerHTML = `Вы загадали число ${textNumber}?`;
        }  
       
    })


    // Кнопка верно
    document.getElementById('btnEqual').addEventListener('click', () => {

        if(!gameRun) {
            showBootstrapAlert('Игра уже завершена. Нажмите "Заново", чтобы начать новую.', 'info');
            return; 
        }

        if (typeof answerNumber === 'undefined' || isNaN(answerNumber) || answerNumber === '' ) {
            showBootstrapAlert('Вы отменили ввод значений, начните игру заново', 'danger'); 
            return;
        }
        
            if (gameRun && answerNumber !== undefined && !isNaN(answerNumber)) {
                const phraseRandom = Math.floor(Math.random() * 3);
                const successMessage = 
                    (phraseRandom === 0) ? `Я всегда угадываю! \u{1F60E}` :
                    (phraseRandom === 1) ? `Точно! Это же ${answerNumber}! \u{1F4AA}` :
                                           `Кажется, я снова угадал! \u{1F917}`;
                answerField.innerText = successMessage;
                gameRun = false;
            }
        
    })


    // Вызов алерта
    function showBootstrapAlert(message, type = 'primary') {
        const bootstrapAlert = document.getElementById('bootstrapAlert');
        const alertOverlay = document.getElementById("alertOverlay");
        

        bootstrapAlert.className = `alert alert-${type} alert-dismissible fade show`;
        bootstrapAlert.innerHTML = `<strong> Сообщение: </strong>
         ${message} <button type="button" class="btn-close" data-bs-dismiss="alert"
        aria-label="Close" id="closeAlertBtn"></button>`;

        bootstrapAlert.style.display = 'block';
        alertOverlay.style.display = 'block';

        const closeAlertBtn = document.getElementById('closeAlertBtn');
        closeAlertBtn.addEventListener('click', () => {
            bootstrapAlert.style.display = 'none';
            alertOverlay.style.display = 'none';
            document.body.classList.remove('no-scroll');
        })
    }


    //Вызов промпта
    async function showCustomPrompt(message) {
        return new Promise((resolve, reject) => {
            const promptContainer = document.getElementById('customPrompt');
            const promptInput = document.getElementById('promptInput');
            const errorMessage = document.getElementById('errorMessage');
            const promptConfirm = document.getElementById('promptConfirm');
            const promptCancel = document.getElementById('promptCancel');
            const promptTitle = document.getElementById('promptTitle');
            const mainContent = document.getElementById('mainContent');
        
            document.body.classList.add('no-scroll');
            mainContent.classList.add('blur-background');
            
            promptInput.value = '';
            errorMessage.textContent = '';
            promptTitle.textContent = message;
            promptContainer.style.display = 'block'

            promptInput.replaceWith(promptInput.cloneNode(true));
            const newPromptInput = document.getElementById('promptInput');


            newPromptInput.addEventListener('input', () => {
                if (/^-?\d*$/.test(newPromptInput.value)) {
                    newPromptInput.classList.remove('invalid');
                    errorMessage.textContent = '';
                } else {
                    newPromptInput.classList.add('invalid');
                    errorMessage.textContent = 'Введите только числа!';
                }
            });

            promptConfirm.addEventListener('click', function handleConfirm() {
                let value = Number(newPromptInput.value.trim()) || 0; // короткий цикл операций дизъюнкции.
                value = value > 999 ? 999 : value < -999 ? -999 : value;
                         
                if(typeof value === 'number' && !isNaN(value)) {
                    promptContainer.style.display = 'none';
                    document.body.classList.remove('no-scroll');
                    mainContent.classList.remove('blur-background');
                    resolve(value);
                    promptConfirm.removeEventListener('click', handleConfirm);
                } else {
                    errorMessage.style.color = 'red';
                    errorMessage.textContent = 'Введите корректное значение!';
                    
                    
                }
            });
    
            promptCancel.addEventListener('click', function handleCancel() {
                minValue = '';
                maxValue = '';
                answerNumber = '';
                orderNumber = 1;
                promptContainer.style.display = 'none';
                document.body.classList.remove('no-scroll');
                mainContent.classList.remove('blur-background');
                promptCancel.removeEventListener('click', handleCancel)
            })
            
    
        })
        }


        // Функция для перевода число в его текстовое представление
        function numberToWords(n) {
            const units = ["ноль", "один", "два", "три", "четыре", "пять", 
                           "шесть", "семь", "восемь", "девять", "десять", 
                           "одиннадцать", "двенадцать", "тринадцать", "четырнадцать", 
                           "пятнадцать", "шестнадцать", "семнадцать", "восемнадцать", 
                           "девятнадцать"];
            const tens = ["", "", "двадцать", "тридцать", "сорок", "пятьдесят", 
                          "шестьдесят", "семьдесят", "восемьдесят", "девяносто"];

             if (n < 0) {
                return "минус " + numberToWords(-n); // Берем модуль числа и рекурсивно обрабатываем
            }              
            
            if (n < 20) {
                return units[n];
            } else if (n < 100) {
                return tens[Math.floor(n / 10)] + (n % 10 !== 0 ? " " + units[n % 10] : "");
            } else if (n < 1000) {
                let hundreds = ["", "сто", "двести", "триста", "четыреста", "пятьсот", 
                                "шестьсот", "семьсот", "восемьсот", "девятьсот"];
                return hundreds[Math.floor(n / 100)] + 
                       (n % 100 !== 0 ? " " + numberToWords(n % 100) : "");
            } else {
                return n.toString();   
            }
        }
        

        