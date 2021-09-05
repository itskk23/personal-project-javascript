import {scenario} from './scenario.js';
import {IScenario, Item, IStore, EStatus} from './gadgets';


class Transaction {
    store: IStore<any>;
    logs: IStore<any>[];
    constructor(){
        this.store = {},
        this.logs = []
    }

    async dispatch(scenario: Array<IScenario>) {
        
        if(scenario instanceof Array == false){
            throw new Error( EStatus.fail + 'Scenario is not an array');
        }
        for (let obj in scenario) {
            let item: Item = {
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
            } catch (err:any) {
                Object.assign(item.storeAfter, this.store);
                item.error = {
                    name: err.name,
                    message: err.message + EStatus.fail,
                    stack: err.stack
                }
                this.logs.push(item);
                console.log(this.logs)
                for (let i = parseInt(obj) - 1; i >= 0; i--) {
                    if (scenario[i].hasOwnProperty("restore")) { 
                        await scenario[i].restore(this.store);
                        this.store = this.logs[i].storeBefore;
                    }
                }
                throw new Error(item.error.message);
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
        
    } catch (err:any) {
        console.log(err.message);
        // console.log(transaction.logs)
    }
})();



