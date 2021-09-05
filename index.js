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
const scenario_js_1 = require("./scenario.js");
const gadgets_1 = require("./gadgets");
class Transaction {
    constructor() {
        this.store = {},
            this.logs = [];
    }
    dispatch(scenario) {
        return __awaiter(this, void 0, void 0, function* () {
            if (scenario instanceof Array == false) {
                throw new Error(gadgets_1.EStatus.fail + 'Scenario is not an array');
            }
            for (let obj in scenario) {
                let item = {
                    index: scenario[obj].index,
                    meta: scenario[obj].meta,
                    storeBefore: {},
                    storeAfter: {},
                    error: null
                };
                Object.assign(item.storeBefore, this.store);
                try {
                    yield scenario[obj].call(this.store);
                    Object.assign(item.storeAfter, this.store);
                    this.logs.push(item);
                }
                catch (err) {
                    Object.assign(item.storeAfter, this.store);
                    item.error = {
                        name: err.name,
                        message: err.message + gadgets_1.EStatus.fail,
                        stack: err.stack
                    };
                    this.logs.push(item);
                    console.log(this.logs);
                    for (let i = parseInt(obj) - 1; i >= 0; i--) {
                        if (scenario[i].hasOwnProperty("restore")) {
                            yield scenario[i].restore(this.store);
                            this.store = this.logs[i].storeBefore;
                        }
                    }
                    throw new Error(item.error.message);
                }
            }
        });
    }
}
const transaction = new Transaction();
(() => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield transaction.dispatch(scenario_js_1.scenario);
        // throw new Error('ezuga')
        const store = transaction.store; // {} | null
        // console.log(store) ცარიელი ბრუნდება
        const logs = transaction.logs; // []
        // console.log(logs)
    }
    catch (err) {
        console.log(err.message);
        // console.log(transaction.logs)
    }
}))();
