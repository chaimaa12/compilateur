import Expression from "./Expression.js";

export default class ExpressionVarDeclaration extends Expression{
	
	constructor(token){
		if(token.type!="identifier"){
			throw 'You have to put an valid identifier for a variable declaration';
		}
		super("ExpressionVarDeclaration");
		this.name= token.value;
	}
}

