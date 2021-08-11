export function validation(scenario) {
    for (let obj in scenario) {
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
    }
    scenario = scenario.sort((item1,item2)=>item1.index-item2.index);
    
    return scenario
}

