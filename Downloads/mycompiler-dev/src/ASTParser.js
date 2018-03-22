import Expression from "./Expression.js";
import ExpressionFactory from "./ExpressionFactory.js";

export default class ASTParser{
	constructor(){
		this.ast = new Expression('Body');
		this.last_exp= this.ast;
	}
	
	static parse(tokens){
		let instance = new ASTParser();
		for(let cursor={position: 0}; cursor.position < tokens.length; cursor.position++){
			let current_token = tokens[cursor.position];
			//console.log(cursor.position);
/*			console.log("lenght");
			console.log(current_token.pos);
			console.log(tokens.length);*/
			switch(current_token.type){
				case 'space':
				case 'line-break-r':
				case 'line-break':
				case 'indent':
				case 'underscore':
				case 'number':
				case 'console-object':
				case 'point':
				case 'parenthesis-start':
				case 'parenthesis-end':
				case 'identifier':
				//case 'php-declaration-end':
				case 'echo':
					continue;
				case 'php-declaration-debut':
/*					console.log("cursor php");
					console.log(cursor);*/
					let exp = ExpressionFactory.create(cursor, tokens);
					if(exp){
						instance.addExpToTree(exp);
					}else{
						throw `grammar error`
					}
					break;
					//continue;
				case 'var':
/*					console.log("cursor var");
					console.log(cursor);
					console.log(tokens[cursor.position]);
					console.log(current_token);*/
					
					let exp2 = ExpressionFactory.create(cursor, tokens);
					//console.log(exp2);
					if(exp2){
						instance.addExpToTree(exp2);
					}else{
						throw `grammar error`
					}
					break;
				case 'class':
				console.log('class');
				console.log(tokens[cursor.position]);
					let exp_class = ExpressionFactory.create(cursor, tokens);
					if(exp_class){
						instance.addExpToTree(exp_class);
					}else{
						throw `error Class`
					}
					break;
				case 'public':
					let exp_public = ExpressionFactory(cursor, tokens);
					console.log("TEST");
					console.log(exp_public);
					if(exp_public){
						instance.addExpToTree(exp_public);
					}else{
						throw 'error in public (-1)';
					}
					break;
				case 'function':
					console.log('function');
					console.log(tokens[cursor.position]);
					let exp_function = ExpressionFactory(cursor, tokens);
					if(exp_function){
						instance.addExpToTree(exp_function);
					}else{
						throw 'error function (-2)';
					}
				default:
/*					let exp = ExpressionFactory.create(cursor, tokens);
					if(exp){
						instance.addExpToTree(exp);
					}else{
						throw `grammar error`
					}*/
					break;
			}
		}
		return instance.ast;
	}
	
	addExpToTree(exp){
		switch(exp.type){
			case 'ExpressionVarDeclaration':
			case 'ExpressionVarAssignation':
			case 'PhPDeclaration':
			case 'NameVariable':
			case 'ClassName':
			case 'NameFunction':
				this.last_exp.addChild(exp);
				break;
		}
	}
	
	
}