const Item = require('./Item');

module.exports = class Machine {
    constructor() {
        this.totalDeposit = 0;
        this.inventory = [];
        const crisps = new Item('crisps', 100, 1);
        const choc = new Item('chocolate', 350, 2);
        const mints = new Item('mints', 70, 3);
        this.stockInventory(crisps, 3);
        this.stockInventory(choc, 0);
        this.stockInventory(mints, 1);
        this.bank = {
            500: 10,
            100: 10,
            50: 10,
            20: 10,
            10: 10
        }
    }

    stockInventory(item, quantity) {
        this.inventory.push({
            item: item.name,
            price: item.price,
            code: item.code,
            quantity: quantity
        })
    }

    getMenu() {
        return this.inventory.map(inventoryItem => {
            let newItemObj = {};
            newItemObj[inventoryItem.item] = inventoryItem.price;
            return newItemObj;
        });
    }

    deposit(currency) {
        this.totalDeposit += currency;
        return 'You have deposited Rs ' + this.totalDeposit;
    }

    makeChange(item) {
        let overpayment = this.totalDeposit - item.price;
        const change = [];
        const denominations = Object.keys(this.bank)
            .map((denomination) => parseInt(denomination))
            .sort((a, b) => b - a);
        for (const denomination of denominations) {
            const billsAvailable = this.bank[denomination];
            const desiredBills = Math.floor(overpayment / denomination);
            const numOfBills = (billsAvailable < desiredBills) ? billsAvailable : desiredBills;
            for (let i = 0; i < numOfBills; i++) {
                change.push(denomination);
                overpayment = overpayment - denomination;
                this.bank[denomination] = this.bank[denomination] - 1;
            }
        }
        if (overpayment > 0) return undefined;
        return change;
    }

    selectItem(code) {
        const selectedItem = this.inventory
            .filter(inventoryItem => inventoryItem.code === code).pop();
        if (selectedItem.quantity < 1) {
            return 'The item you selected is unavailable';
        } else if (selectedItem.price > this.totalDeposit) {
            const diff = selectedItem.price - this.totalDeposit;
            return 'Your deposit is insufficient.  Please add Rs ' + diff + ' for this item'
        } else {
            const change = this.makeChange(selectedItem);
            if (!change) return 'Cannot return proper change.  Please choose another item or cancel the transaction';
            return {item: selectedItem.item, change: change};
        }
    }

    cancel() {
        const change = this.makeChange({price: 0});
        return {change: change};
    }
};