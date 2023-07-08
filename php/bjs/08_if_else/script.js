let minValue = parseInt(prompt('Минимальное знание числа для игры','0'));
minValue = (!isNaN(minValue)) ? minValue : 0;
let maxValue = parseInt(prompt('Максимальное знание числа для игры','100'));
maxValue = (!isNaN(maxValue)) ? maxValue : 100;
/* При вводе максимума или минимума больше 999 или меньше -999 изменять
 число на ближайшую границу 
(например, 1000 на 999, а -10000 на -999), используя тернарный оператор.*/
minValue = (minValue < -999) ? -999 : minValue;
maxValue = (maxValue > 999) ? 999 : maxValue;


var assocArr = [];
 
assocArr[0] = new Array("", "один", "два", "три", "четыри", "пять", "шесть", "семь","восемь", "девять");
 
assocArr["d"] = new Array("десять", "одинадцать", "двенадцать", "тринадцать", "четырнадцать","пятнадцать", "шеснадцать", "семнадцать", "восемнадцать", "девятнадцать");
 
assocArr[1] = new Array("", "", "двадцать", "тридцать", "сорок", "пятьдесят", "шестьдесят","семьдесят", "восемьдесят", "девяносто");
 
assocArr[2] = new Array("", "сто", "двести", "триста", "четыреста", "пятьсот", "шестьсот","семьсот", "восемьсот", "девятьсот");
 
assocArr["s"] = new Array("", "одна", "две");
 
assocArr[3] = new Array("тысяч", "тысяча", "тысячи", "тысячи", "тысячи", "тысяч", "тысяч","тысяч", "тысяч", "тысяч", "");

function numToWord(number) {

    
    let defNumber = number;
    
 
    var resp = "",
 
        numArr = [],
 
        flag = true;
 
    // Checking the input conditions
 
    if (isNaN(number)) {
        return "Invalid input!";
    }
 
    // Convert input number to array of digits
 
    for (; number != 0; number = Math.floor(number / 10)) {
 
        numArr.push(number % 10);
 
    }
 
    // Iterate all digits from the end
 
    for (var i = numArr.length - 1; i >= 0 ; i--) {
 
        if (flag) {
 
            if (numArr[i] == 1 && i == 1 || numArr[i] == 1 && i == 4) {
 
                flag = false;
 
            } else {
 
                resp += digitToWord(i, numArr[i], 0);
 
            }
 
        } else {
 
            resp += digitToWord("d", numArr[i], i);
 
            flag = true;
 
        }
 
    }
    
console.log(resp.trim().length);    
    if(resp.trim().length>20){
        return defNumber;
    }else{
        return resp.trim();
    }



}
 
function digitToWord(digit, offset, char) {
 
    var resp = "";
 
    switch (digit) {
 
        case 3:
 
            resp += (offset == 1 || offset == 2 ? assocArr["s"][offset] : assocArr[0][offset]) + " ";
 
            break;
 
        case 4:
 
            digit = 1;
 
            break;
 
        case "d":
 
            resp += assocArr[digit][offset] + " ";
 
            digit = char;
 
            offset = 0;
 
            break;
 
    }
 
    return resp + assocArr[digit][offset] + " ";
 
}


alert(`Загадайте любое целое число от ${minValue} до ${maxValue}, а я его угадаю`);
let answerNumber  = Math.floor((minValue + maxValue) / 2);
let answerNumberText  = numToWord(answerNumber);
let orderNumber = 1;
let gameRun = true;
let arMsg = [
    `Возможно это не то число?\n\u{1F914}`,
    `Я сдаюсь..\n\u{1F92F}`,
    `Скорее всего ты загадал..\n\u{1F92F}`,
];

let arMsgQuestions = [
    `Вы загадали число `,
    `Наверное, это число `,
    `Да это легко, ты загадал `,
];

const orderNumberField = document.getElementById('orderNumberField');
const answerField = document.getElementById('answerField');

orderNumberField.innerText = orderNumber;
answerField.innerText = arMsgQuestions[Math.floor(Math.random() * arMsgQuestions.length)] + answerNumberText +`?`;

document.getElementById('btnRetry').addEventListener('click', function () {
    minValue = 0;
    maxValue = 100;
    orderNumber = 0;
    location.reload();
})


function isError(){
    const answerPhrase = arMsg[Math.floor(Math.random() * arMsg.length)];
    answerField.innerText = answerPhrase;
    gameRun = false;
}
document.getElementById('btnOver').addEventListener('click', function () {
    if (gameRun){
        if (minValue === maxValue){
            isError();
        } else {
            minValue = answerNumber  + 1;
            if (minValue === maxValue){
                isError();
            }else{
                answerNumber  = Math.floor((minValue + maxValue) / 2);
                answerNumberText = numToWord(answerNumber);
                orderNumber++;
                orderNumberField.innerText = orderNumber;
                answerField.innerText = arMsgQuestions[Math.floor(Math.random() * arMsgQuestions.length)] + answerNumberText +`?`;
            }
           
        }
    }
    console.log('minValue',minValue);
    console.log('maxValue',maxValue);
})

document.getElementById('btnLess').addEventListener('click', function () {
    if (gameRun){
        if (minValue === maxValue){
            isError();
        } else {
            maxValue = answerNumber + 0;
            if (minValue === maxValue){
                isError();
            }else{
                answerNumber = Math.floor(Math.random() * (maxValue - minValue) + minValue)
                orderNumber++;
                orderNumberField.innerText = orderNumber;
                answerNumberText = numToWord(answerNumber);
                answerField.innerText = arMsgQuestions[Math.floor(Math.random() * arMsgQuestions.length)] + answerNumberText +`?`;
            }
        }
    }
    console.log('minValue',minValue);
    console.log('maxValue',maxValue);
})

document.getElementById('btnEqual').addEventListener('click', function () {
    if (gameRun){
        answerField.innerText = `Я всегда угадываю\n\u{1F60E}`
        gameRun = false;
    }

})

