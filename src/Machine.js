module.exports = class Machine {
    constructor() {
        this.items = [
            {'crisps': 100},
            {'chocolate': 350},
            {'mints': 70}
        ];

        this.amount = 0;
    }

    deposit(myDeposit) {
        const acceptedBill = [10, 20, 50, 100, 500];
        if(acceptedBill.includes(myDeposit)){
            this.amount += myDeposit;
            return `You have deposited Rs ${this.amount}`;
        }else{
            return 'We accept bills in these amounts: 10, 20, 50, 100, 500'
        }
    }

    seeSelections() {
        return this.items;
    }
};