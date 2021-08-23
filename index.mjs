import {scenario} from './scenario.mjs';
import {validation} from './validation.mjs';
class Transaction {
    async dispatch(scenario) {
        validation(scenario);
        if(scenario instanceof Array == false){
            throw new Error('Scenario is not an array');
        }
        this.store = {};
        this.logs = [];
        for (let obj in scenario) {
            let item = {
                index: scenario[obj].index,
                meta: scenario[obj].meta,
                storeBefore: {},
                storeAfter: {},
                error: null
            }
            Object.assign(item.storeBefore, this.store);
            try {
                await scenario[obj].call(this.store);
                Object.assign(item.storeAfter, this.store);
                this.logs.push(item);
            } catch (err) {
                Object.assign(item.storeAfter, this.store);
                item.error = {
                    name: err.name,
                    message: err.message,
                    stack: err.stack
                }
                this.logs.push(item);
                console.log(this.logs)
                for (let i = obj - 1; i >= 0; i--) {
                    if (scenario[i].hasOwnProperty("restore")) { 
                        await scenario[i].restore(this.store);
                        this.store = this.logs[i].storeBefore;
                    }
                }
                throw new Error(err.message);
            }

        }
    }
}

const transaction = new Transaction();
(async () => {
    try {
        await transaction.dispatch(scenario);
        // throw new Error('ezuga')
        const store = transaction.store; // {} | null
        // console.log(store) ცარიელი ბრუნდება
        const logs = transaction.logs; // []
        // console.log(logs)
        
    } catch (err) {
        console.log(err.message);
        // console.log(transaction.logs)
    }
})();



