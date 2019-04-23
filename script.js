'use strict'

let money,
    time;

function start() {
    money = +prompt("Ваш бюджет на месяц?", "");
    time = prompt("Введите дату в формате YYYY-MM-DD", "");

    while (isNaN(money) || money == "" || money == null) {
        money = +prompt("Ваш бюджет на месяц?", "");
    }
}
start();


let appData = {
    budget: money,
    timeData: time,
    expenses: {},
    optionalExpenses: {},
    income: [],
    savings: true,
    // Обязательные расходы
    chooseExpenses: function() {
        for (let i = 0; i < 2; i++) {
            let answerExpenses = prompt("Введите обязательную статью расходов в этом месяце", ""),
                answerTotal = prompt("Во сколько обойдется?", "");
            
            if ( (typeof(answerExpenses)) === 'string' && (typeof(answerExpenses)) != null && (typeof(answerTotal)) != null 
                && answerExpenses != '' && answerTotal != '' && answerExpenses.length < 50 ) {
                console.log('done');
                appData.expenses[answerExpenses] = +answerTotal;
            } else {
                i--;
            }
        }
    },
    // Расчет дневного бюджета и вывод на экран этого значения
    detectDayBudget: function() {
        let dayBudget = +( (appData.budget / 30).toFixed() );
        alert('Ежедневный бюджет: ' + dayBudget);
        return dayBudget;
    },
    // Расчетом уровня достатка
    detectLevel: function() {
        if (appData.budgetPerDay < 100) {
            console.log("Минимальный уровень достатка");
        } else if (appData.budgetPerDay > 100 && appData.budgetPerDay < 2000) {
            console.log("Средний уровень достатка");
        } else if (appData.budgetPerDay > 2000) {
            console.log("Высокий уровень достатка");
        } else {
            console.log("Произошла ошибка");
        }
    },
    // Проверка накоплений
    checkSavings: function() {
        if (appData.savings == true) {
            let save = +prompt("Какова сумма накоплений?",""),
                percent = +prompt("Под какой процент?", "");
    
            appData.monthIncome = +( (save / 100 / 12 * percent).toFixed(2) );
            alert("Доход в месяц с вашего депозита " + appData.monthIncome);
        };
    },
    // Расчет необязательных расходов
    chooseOptExpenses: function() {
        for (let i = 1, n = 4; i < n; i++) {
            let answerOptExpenses = prompt("Статья необязательных расходов?", "");
    
            if ( typeof(answerOptExpenses) != null && answerOptExpenses != '' ) {
                appData.optionalExpenses[i] = answerOptExpenses;
            } else {
                i--;
                n--;
            }
        }
    },
    // Статьи дополнительного дохода
    chooseIncome: function() {
        let items = prompt("Что принесет дополнительный доход? (Перечислите через запятую)", "");

        if ( typeof(items) === 'string' && items != '' && typeof(items) != null ) {
            appData.income = items.split(",");

            let somethingElse = prompt("Может что-то еще?", "");

            if ( typeof(somethingElse) === 'string' && somethingElse != '' && typeof(somethingElse) != null ) {
                appData.income.push(somethingElse);
            };

            for (let key in appData.income) {
                appData.income[key] = appData.income[key].trim();
            };

            appData.income.sort();
            
            // console.log("Способы доп. заработка:");
            // appData.income.forEach(function(item, i) {
            //     console.log( (i + 1) + ": " + item );
            // });
            
            //через модальное окно вывод
            let modalScreen = document.querySelector('.modal'), // модальное окно
                modal = document.querySelector('.modal__text'), // область для текста
                firstText;

            firstText = document.createElement('p');
            firstText.innerText = `Способы доп. заработка:`;
            modal.appendChild(firstText); // добавляем первую строчку
            modalScreen.classList.add('active'); // делаем окно видимым

            appData.income.forEach(function(item, i) {
                let incomeItem = document.createElement('p');

                incomeItem.innerText = `${i + 1}: ${item}`;
                modal.appendChild(incomeItem); // добавляем все способы заработка
            });
            let closeButton = document.querySelector('.closeButton'); // функция закрытия по щелчку кнопки

            closeButton.addEventListener('click', () => {
                modalScreen.classList.remove('active');
                modal.innerHTML = ``; // чистим область с текстом для перезаписи
            });           
        };
    },
    // Показать объект appData
    toShowObject: function() {
        console.log("Наша программа включает в себя данные: ");
        for (let key in appData) {
            if ( typeof(appData[key]) === "object" ) {
                console.log(key + ": {");
                for (let item in appData[key]) {
                    console.log( item + ": " + appData[key][item] );
                };
                console.log("}");
            } else {
            console.log( key + ": " + appData[key] );
            };
        };        
    }
};

appData.toShowObject();