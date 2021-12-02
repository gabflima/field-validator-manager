class FieldValidatorFactory {
    constructor(manager){
        this.manager = manager;
        this.fieldBuilder = null;
        this.validatorType = null;
    }

    add(args){
        if(this.fieldBuilder != null && this.validatorType != null){
            for(let i = 0; i < arguments.length; i++){
                this.manager.add(this.fieldBuilder, this.validatorType, arguments[i]);
            }
        }
        return this;
    }

    builder(fieldBuilder){
        this.fieldBuilder = fieldBuilder;
        return this;
    }

    type(validatorType){
        this.validatorType = validatorType;
        return this;
    }
}
