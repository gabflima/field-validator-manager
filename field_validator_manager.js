class FieldValidatorManager {
    constructor(){
        this.store = [];
    }

    add(builder, validatorType, args){
        let render = this;
        
        if(builder.render != undefined){
            render = builder.render(args);
        }

        let pos = this.store.push({
            source: builder.source(args),
            render: render,
            validatorType: validatorType
        });

        if(builder.onAfterBuild != undefined){
            builder.onAfterBuild(this.store[pos - 1].source, validatorType, args);
        }

        return this;
    }

    done(){
        for(let i = 0; i < this.store.length; i++){
            Object.freeze(this.store[i]);
        }
        delete this.add;
        delete this.done;
        return Object.freeze(this);
    }

    validate(){
        if(this.onBeforeValidate != undefined){
            this.onBeforeValidate();
        }

        let counter = 0;
        let validationResult = [];
        for(let i = 0; i < this.store.length; i++){
            const target = this.store[i];
            let result = this.validateSource(target.source, target.render, target.validatorType);
            validationResult.push([target.source, result]);
            if(!result) counter++;
        }

        if(this.onValidate != undefined){
            this.onValidate(validationResult);
        }

        return counter == 0;
    }
}
