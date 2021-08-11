export const scenario = [
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