"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.scenario = void 0;
exports.scenario = [
    {
        index: 1,
        meta: {
            title: 'Read popular customers',
            description: 'This action is responsible for reading the most popular customers'
        },
        // callback for main execution
        call: (store) => __awaiter(void 0, void 0, void 0, function* () {
            //    throw new Error('chito magaria')
            store.nashti = 100;
        }),
        // callback for rollback
        restore: (store) => __awaiter(void 0, void 0, void 0, function* () {
            delete store.nashti;
        })
    },
    {
        index: 2,
        meta: {
            title: 'Delete customer',
            description: 'This action is responsible for deleting customer'
        },
        // callback for main execution
        call: (store) => __awaiter(void 0, void 0, void 0, function* () {
            // throw new Error('call function didnt happen')
            store.nashti = 200;
        }),
        // callback for rollback
        restore: (store) => __awaiter(void 0, void 0, void 0, function* () {
            delete store.nashti;
        })
    },
    {
        index: 3,
        meta: {
            title: 'sxva',
            description: 'vabshe sxva'
        },
        // callback for main execution
        call: (store) => __awaiter(void 0, void 0, void 0, function* () {
            // throw new Error('call function didnt happen');
            store.nashti = 300;
        }),
        // callback for rollback
        restore: (store) => __awaiter(void 0, void 0, void 0, function* () {
            delete store.nashti;
        })
    }
];
