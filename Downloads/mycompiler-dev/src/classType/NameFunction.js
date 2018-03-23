import Expression from "../Expression.js";

export default class NameFunction extends Expression{
	
	constructor(token){
		console.log(token);
		if(token.type=="chaine_string"){

			super("NameFunction");
			this.name= token.value;

		}else{
			throw 'You have to put an valid identifier for a function declaration';

		}

	}
}