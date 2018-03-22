import Expression from "./Expression.js";

export default class PhPDeclaration extends Expression{
	
	constructor(token){
		console.log(token);
		if(token.type=="php-declaration-debut" || token.type == "php-declaration-end"){

			super("PhPDeclaration");
			this.name= '<?php?>';

		}else{
			throw 'You have to put an valid identifier for a variable declaration';

		}

	}
}