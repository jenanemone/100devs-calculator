/* main.js contains event listeners for the buttons, a class Calculator to generate an object, and the methods
by which the logic will be performed.
Using the class construction in order to be able to access this.calculate from within this.operation() enables
behavior that follows the pre-graphing calculator's two-term limit on expression evaluation. Pressing more than
one operator, when 2 terms are present, will cause the existing two terms to be evaluated and then mutated
into the first term of the next operation, followed by the existing operator (the last 'button' the user clicked).
*/

// TODOs ahead

// The Calculator object class contains the constructor with the variables needed to maintain persistent value,
// and the methods that are available for the manipulation and display of the work performed.

class Calculator {
    
    // constructor requires a string phrase, numerical evaluation, and hasOperator flag
    constructor() {
        this.displayPhrase = '';
        this.evaluated = 0;
        this.hasOperator = false; // this is to mimic the behavior of old
    }

    // term receives the numerical data only and adds those digits (or .) to the displayPhrase
    // TODO: limit entry of "." button register to one per term.
    term(element) {
        let enteredElement = element.target;
        let val = enteredElement.innerText;
        
        // remove the leading 0 to make it purty
        // TODO: leave leading 0 if first button registered is '.'
        if (this.displayPhrase == '0') {
            this.displayPhrase = '';
        }
        
        this.displayPhrase = this.displayPhrase + val;

        document.querySelector('.viewWindow').innerText = this.displayPhrase;

        return this;
    }

    // operation receives the operator's button register. 
    // One operation registered will allow entry of second term.
    // Two operations registered and two terms registered triggers this.calculate() --
        // and stores that evaluation as the first term, along with the operator
    // TODO: verify behavior of term / 0 
    // TODO: allow for changing expression when only one term exists
    operation(element) {

        // grab the operator from the registered button and append to string
        let enteredElement = element.target;
        let val = enteredElement.innerText;
        this.displayPhrase += ` ${val} `;

        // Split the string to separate terms
        let phraseArray = this.displayPhrase.split(' '); // test if operator is legal
        
        console.log(phraseArray);
        
        // If an operator and two terms exist, trigger this.calculate(),
        // otherwise set hasOperator to true
        if (this.hasOperator && phraseArray.length > 3) {
            
            console.log('calling calculate');
            this.calculate(); 
            console.log(this.evaluated);
            this.displayPhrase = this.evaluated;
            
        }
        else {
            this.hasOperator = true;
        }
        
        console.log(this.displayPhrase);

        document.querySelector('.viewWindow').innerText = this.displayPhrase;
        
        return this;
    }

    // calculate() is called either from equals button register or 
    // from having two terms and two operators
    // TODO: debug and check behaviors
    calculate() {
        
        let expr = this.displayPhrase.split(' ');
        let operand1 = +expr[0];
        let op = expr[1];
        let operand2 = +expr[2];

        console.log('lets go switch',operand1,op,operand2);

        // console.log(expr);
        switch (op) {
            case '+' : 
                this.evaluated = operand1 + operand2;
                break;
            case '-' :
                this.evaluated = operand1 - operand2;
                break;
            case '/' :
                this.evaluated = operand1 / operand2;
                break;
            case '*' :
                this.evaluated = operand1 * operand2;
                break;
            default :
                console.log('Oops')
                break;
        }
        console.log(this.evaluated);

        document.querySelector('.viewWindow').innerText = this.displayPhrase;

        this.hasOperator = false;
        this.displayPhrase = this.evaluated.toString();
        return this;
    }

    // allClear() deletes calc data and returns hasOperator to flase
    allClear() {

        this.displayPhrase = '0';
        document.querySelector('.viewWindow').innerText = '0';

        this.hasOperator = false;
        this.evaluated = 0;

        return this;
    }

    // off() clears the viewWindow, calc data, and sets hasOperator to false
    off() {

        document.querySelector('.viewWindow').innerText = '';
        this.hasOperator = false;
        this.evaluated = 0;

        this.displayPhrase = '';

        return this;
    }

    // TODO: test functionality of on() so that it sets displayPhrase to 0 and adds to viewWindow
    on() {

        document.querySelector('.viewWindow').innerText = '0';
        this.hasOperator = false;
        this.evaluated = 0;
        this.displayPhrase = '';
        return this;
    }

    // clear() removes the last term and operator 
    // TODO: debug
    clear() {

        let terms = this.displayPhrase.split(' ');
        // if there is only one term, clear will remove the one term and operator
        // if there are multiple terms, clear will remove the second term and the operator
        if (this.hasOperator) {
            this.displayPhrase = terms[0];
            console.log(this.displayPhrase);
            this.hasOperator = false;
        }
        else {
            this.displayPhrase = '';
            console.log(this.displayPhrase);
        }

        this.displayPhrase = terms.join(' ');

        document.querySelector('.viewWindow').innerText = this.displayPhrase;
        
        return this;
    }
}

// Generate the object which will be used.
let calc = new Calculator();

// Let's go with some event listeners...
let numsDOM = document.querySelectorAll('.num');
numsDOM.forEach(element => element.addEventListener('click',(element) => calc.term(element)));
let operatorsDOM = document.querySelectorAll('.operator');
operatorsDOM.forEach(element => element.addEventListener('click',(element) => calc.operation(element)));
document.querySelector('.equals').addEventListener('click',() => calc.calculate());
document.querySelector('.AC').addEventListener('click',() => calc.allClear());
document.querySelector('.off').addEventListener('click',() => calc.off())
document.querySelector('.on').addEventListener('click',() => calc.allClear());
document.querySelector('.clear').addEventListener('click',() => calc.clear());


// TODO: Add multi-mode toggle and methods to allow for the evaluation of multiple terms and operators.
// TODO: Add different CSS classes to change the skin.
// TODO: Don't initialize object until On has been pressed.