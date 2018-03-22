import Expression from "./Expression.js";

export default class NameVariable extends Expression{
	
	constructor(token_identifier){
		if(token_identifier.type!="identifier"){
			throw 'You have to put an valid identifier for a variable assignation';
		}

			//super("NameVariable");
			this.name= token_identifier.variable;
		}
	
}

