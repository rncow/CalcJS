function addAnswerToHistory (answer) {
    const newOutput = document.createElement('div');
    newOutput.className = 'output';
    newOutput.textContent = answer;
    history.prepend(newOutput);
}
function calculateAnswer () {
    answer = eval(lastNumBlock.textContent + Number(inputBar.value))
}

const buttons = document.querySelectorAll('.calcButton');
const inputBar = document.getElementById('inputBar')
const lastNumBlock = document.getElementById('lastNum')
const history = document.getElementById('history')
const clearInput = document.getElementById('clearInput')

const operations = ['+', '-', '*', '/']

/*проверка на дурака - ввод только цифр*/
inputBar.addEventListener('input', function(e) {
    this.value = this.value.replace(/[^\d.-]/g, '');
});
inputBar.addEventListener('keydown', function(e) {
    if (!((e.key.match(/\d/g)) || 
         e.key === 'Backspace' || 
         e.key === 'Delete' || 
         e.key === 'Tab' || 
         e.key.includes('Arrow'))) {
        e.preventDefault();
    }
});

 clearInput.addEventListener('click', function() {
    inputBar.value = ''
    lastNumBlock.textContent=''
 });

let answer
buttons.forEach(button => {
     button.addEventListener('click', function() {
        console.log(Number(this.textContent))
         if (Number(this.textContent) || Number(this.textContent) == 0) {
            inputBar.value += Number(this.textContent);
         } else if (operations.includes(this.textContent)) {
            if (lastNumBlock.textContent != '') {
                calculateAnswer()
                lastNumBlock.textContent = answer + " " + this.textContent;
            } else lastNumBlock.textContent = Number(inputBar.value) + " " + this.textContent;
            inputBar.value = ''
         } else if (this.textContent == "←") {
            inputBar.value = inputBar.value.slice(0, -1);
         } else if (this.textContent == "=") {
            calculateAnswer()
            inputBar.value = answer
            lastNumBlock.textContent=''
            addAnswerToHistory(answer)
         }
     });
 });

