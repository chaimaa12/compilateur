import Expression from "./Expression.js";

export default class ClassName extends Expression{
	
	constructor(token){
		console.log(token);
		if(token.type=="identifier"){

			super("ClassName");
			this.name= token.value;

		}else{
			throw 'You have to put an valid identifier for a variable declaration';

		}

	}
}