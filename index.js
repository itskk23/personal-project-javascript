class Transaction {
    async dispatch(scenario) {
        if(scenario instanceof Array == false){
            throw new Error('Scenario is not an array');
        }
        this.store = {};
        this.logs = [];
        for (let obj in scenario) {
            // console.log(typeof scenario)

            if(typeof scenario[obj] !== 'object'){
                throw new Error('scenario items should be objects');
            }
           
            if(!scenario[obj].index) {
                throw new Error('each scenario should have an index');
            }

            if(typeof scenario[obj].index !== 'number'){
                throw new Error ('type of index should be a number')
            }
           
            if(!scenario[obj].meta) {
                throw new Error('each scenario should have meta property');
            }

            if(typeof scenario[obj].meta !== 'object') {
                throw new Error('meta property should be an object');
            }

            if(!scenario[obj].meta.title){
                throw new Error('each scenario should have title inside meta property');
            }

            if(typeof scenario[obj].meta.title !== 'string'){
                throw new Error('title should be a string');
            }

            if(!scenario[obj].meta.description){
                throw new Error('each scenario should have description inside meta property');
            }

            if(typeof scenario[obj].meta.description !== 'string'){
                throw new Error('description should be a string');
            }

            if(typeof scenario[obj].call !== "function"){
                throw new Error("Call must be a function");
            }
            if(typeof scenario[obj].restore !== "function" && typeof scenario[obj].restore !== "undefined"){
                throw new Error("Restore must be a function");
            }

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
                // ამით ვაერორებ
                if (obj == 2) {
                    throw new Error()
                }
            } catch (err) {
                Object.assign(item.storeAfter, this.store);
                
                item.error = {
                    name: err.name,
                    message: err.message,
                    stack: err.stack
                }
               
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
// const scenario = [1, 2];
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
        // console.log(store) ცარიელი ბრუნდება
        const logs = transaction.logs; // []
        
    } catch (err) {
        console.log(err.message)
    }
})();



