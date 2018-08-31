const OPEN_STATE = 'open';
const LOCKED_STATE = 'locked';
const lockTimeout = 3000;

class StateMachine {
    constructor(code) {
        this.state = LOCKED_STATE;
        this.code = code;
        this.entry = '';
    }

    etnerDigit(digit) {
        this.entry += digit;
    }

    unlockDevice() {
        if (this.entry === this.code) {
            this.state = OPEN_STATE;
            setTimeout(this.lockDevice, lockTimeout);
        }
    }
    lockDevice() {
        this.state = LOCKED_STATE;
        this.entry = '';
    }
}

const fsm = new StateMachine('124');
console.log(fsm.state);

fsm.etnerDigit(1);
fsm.unlockDevice();

console.log(fsm.state);

fsm.etnerDigit(2);
fsm.unlockDevice();

console.log(fsm.state);

fsm.etnerDigit(4);
fsm.unlockDevice();

console.log(fsm.state);
