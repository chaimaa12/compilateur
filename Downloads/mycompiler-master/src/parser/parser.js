module.exports = tokens => {
	var AST = { body: [] };
	var last_token = null;
	while (tokens.length > 0) {
		var current_token = tokens.shift();
		switch(current_token.type){
			case 'debut_declaration_php':
				var expression = {
					type: 'PhpDeclaration',
					value: ''
				}
				var next = tokens.shift();
				current_token= next;
				if(next.type==="line-break"){
					expression.value= next.value;
				}else{
					throw 'You have to saut de ligne.';
				}
				AST.body.push(expression);
				break;
			case 'fin_declaration_php':
				var expression = {
					type: 'PhpDeclaration',
					value: ''
				}
				var next = tokens.shift();
				current_token= next;
				if(next.type===""){
					expression.value= next.value;
				}else{
					throw 'Rien apres la fin de declaration php';
				}
				AST.body.push(expression);
				break;
			case 'variable-declaraction':
				var expression = {
					type: 'VariableDeclarationExpression',
					value: ''
				}
				var next = tokens.shift();
				current_token= next;
				if(next.type==="identifier"){
					expression.value= next.value;
				}else{
					throw 'You have to define a identifier for a variable.';
				}
				AST.body.push(expression);
				break;
			case 'equal':
				if(last_token.type=="identifier"){
					var expression = {
						type: 'VariableAssignationExpression',
						identifier: last_token.value,
						value: ''
					}
					var next = tokens.shift();
					current_token= next;
					switch(next.type){
						case 'object-string':
						case 'number':
						case 'number-float':
							expression.value = next;
							break;
						default:
							throw 'You have to assigne a know type to variable '+last_token.value;
					}
					AST.body.push(expression);
					
				}
				break;
			
			case 'console-object':
				var next = tokens.shift();
				current_token= next;
				if(next.type=="point"){
					var expression = {
						type: 'ConsoleUseMethodeExpression',
						methode: '',
						arguments: [],
					}
					next = tokens.shift();
					current_token= next;
					if(next.type==="identifier"){
						expression.methode= next.value;
						next = tokens.shift();
						current_token= next;
						if(next.type==="parenthesis-start"){
							var isEnding= false;
							do{
								next= tokens.shift();
								current_token= next;
								switch(next.type){
									case 'object-string':
									case 'number':
									case 'number-float':
									case 'identifier':
										expression.arguments.push(next);	
										break;
									case 'parenthesis-end':
										isEnding= true;
										break
									case 'virgule':
										break;
									default:
										throw 'Error of using arguments';
								}
							}while(next.type!="parenthesis-end" && tokens.length > 0);
							if(!isEnding){
								throw 'You have to close parenthesis whene you use method.';
							}else{
								AST.body.push(expression);
							}
						}else{
							throw 'You have to use parenthesis to use method.';
						}
						
					}else{
						throw 'You have to define a identifier for a variable.';
					}
				}
				break;
			case 'instruction-end':
				break;
			case 'line-break':
				break;
			case 'variable-print':
				var expression = {
					type: 'VariablePrint',
					value: ''
				}
				var next = tokens.shift();
				console.log(next);
				current_token= next;
				if(next.type==="line-break"){
					expression.value = next.value;
				}
				else{
					// throw 'There was en error in your echo.';
					throw 'il faut sauter une ligne.';

				}
				AST.body.push(expression);
				break;

			
		}
		last_token= current_token;
	}
	return AST;
}