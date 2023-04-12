const Machine = require('../src/Machine');

describe('the vending machine', () => {
    // 1 test case
    it('should have items to purchase', () => {
        // setup
        const machine = new Machine();
        const expected = [{'crisps': 100}, {'chocolate': 350}, {'mints': 70}];

        // exercise
        const actual = machine.seeSelections();

        // assert
        expect(expected).toEqual(actual);
    });

    // 2nd test case
    it('show me, how much money I have deposited', () => {
        // setup
        const machine = new Machine();
        const myDeposit = 100;
        const notAccepted = 1000;
        // exercise
        const actualAmount = machine.deposit(myDeposit);
        const notAcceptedAmount = machine.deposit(notAccepted);

        // assert
        expect(`You have deposited Rs ${myDeposit}`).toEqual(actualAmount);
        expect(`We accept bills in these amounts: 10, 20, 50, 100, 500`).toEqual(notAcceptedAmount);
    });



});
