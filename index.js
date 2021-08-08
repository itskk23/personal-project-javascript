class Transaction {
    async dispatch(scenario) {
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
                //ამით ვაერორებ
                // if (obj == 2) {
                //     throw new Error()
                // }
            } catch (err) {
                Object.assign(item.storeAfter, this.store);
                
                item.error = {
                    name: err.name,
                    message: err.message,
                    stack: err.stack
                }
                console.log('obj1', obj);
                for (let i = obj - 1; i >= 0; i--) {
                    if (scenario[i].hasOwnProperty("restore")) {
                        await scenario[i].restore(this.store);
                        this.store = this.logs[i].storeBefore;
                        // console.log(this.store);  
                    }
                }
                break;
            }

        }
    }
}

const transaction = new Transaction();

const scenario = [
    {
        index: 1,
        meta: {
            title: 'Read popular customers',
            description: 'This action is responsible for reading the most popular customers'
        },
        // callback for main execution
        call: async (store) => {
            store.nashti = 100;
        },
        // callback for rollback
        restore: async (store) => {
            delete store.nashti
        }
    },
    {
        index: 2,
        meta: {
            title: 'Delete customer',
            description: 'This action is responsible for deleting customer'
        },
        // callback for main execution
        call: async (store) => {
            store.nashti = 200;
        },
        // callback for rollback
        restore: async (store) => {
            delete store.nashti;
        }
    },
    {
        index: 3,
        meta: {
            title: 'sxva',
            description: 'vabshe sxva'
        },
        // callback for main execution
        call: async (store) => {
            store.nashti = 300;
        },
        // callback for rollback
        restore: async (store) => {
            delete store.nashti;
        }
    }
];

(async () => {
    try {
        await transaction.dispatch(scenario);
        const store = transaction.store; // {} | null
        const logs = transation.logs; // []
    } catch (err) {
        // log detailed error
    }
})();



