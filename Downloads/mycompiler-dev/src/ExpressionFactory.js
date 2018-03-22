import ExpressionVarDeclaration from "./ExpressionVarDeclaration.js";
import ExpressionVarAssignation from "./ExpressionVarAssignation.js";
import PhPDeclaration from "./PhPDeclaration.js";
import NameVariable from "./NameVariable.js";
import ClassName from "./ClassName.js";
import NameFunction from "./classType/NameFunction.js"

export default class ExpressionFactory{
	
	static create(cursor, tokens){
		let current_token= tokens[cursor.position];
		//let current_token = tokens[pos];
		//console.log(current_token);
		switch(current_token.type){

			case 'variable-declaraction':
				cursor.position++
				let next = tokens[cursor.position];
				if(next.type!="space"){
					throw 'You have to put a space after a variable declaraction.';
				}
				cursor.position++
				next = tokens[cursor.position];
				return new ExpressionVarDeclaration(next);
			case 'equal':
				if(tokens[cursor.position-1].type=="space" && tokens[cursor.position-2].type=="identifier"){
					cursor.position++
					let next = tokens[cursor.position];
					if(next.type!="space"){
						throw 'You have to put a space after a variable assignation.';
					}
					cursor.position++
					next = tokens[cursor.position];
					return new ExpressionVarAssignation(tokens[cursor.position-4], next);	
				}else{
					throw 'You have to put a space after a variable declaraction.';
				}
				break;
			case 'php-declaration-debut':

				//console.log(tokens[cursor.position-1]);
				//if(tokens[cursor.position-1].type != "identifier"){
					var flag_declaration_ended = false;
					do{
						cursor.position++
						//let next = tokens[cursor.position];
						switch(tokens[cursor.position].type){

							case "php-declaration-end":
								flag_declaration_ended = true;
								break;
							case "identifier":
								flag_declaration_ended = false;
								continue;

						}
					}while(tokens[cursor.position].type != "php-declaration-end");
					//cursor.position++
					//let next = tokens[cursor.position];
					
					//console.log(tokens[cursor.position]);
					if(tokens[cursor.position].type === "space"){
						throw "Problem in the declaraction of your php file";
					}	
					//cursor.position++
					//next = tokens[cursor.position];
					//if(!flag_declaration_ended){
					//	throw "error ending declaration";
					//}else{
						return new PhPDeclaration(current_token);			

					//}
				//}else{
					//throw 'Error befuore declaration of your php file';
				//}

				break;
			case 'php-declaration-end':
/*				if(tokens[cursor.position+1].type == "line-break" || tokens[cursor.position+1].type == "space"){
					cursor.position++
					let next = tokens[cursor.position];	
					cursor.position++
					next = tokens[cursor.position];*/
					return new PhPDeclaration(current_token.variable);			
				/*}else{
					throw 'Error before declaration of your php file';
				}*/
				break;
			case 'indent':
				break;
			case 'var':
			//console.log(tokens[cursor.position]);
			//break;
				if(tokens[cursor.position-1].type != "parenthesis-start" 
					|| tokens[cursor.position-1].type != "space" 
					|| tokens[cursor.position-1].type != "line-break"){

						throw 'error before var';

				}else if (tokens[cursor.position-1].type == "instruction-end"){

					throw 'space after end instruction and var';
				}else{

					cursor.position++
					let next = tokens[cursor.position];
/*					console.log("NEXT TYPE");
					console.log(next.type);*/
					if (next.type != 'underscore' || next.type != 'identifier'){
						throw 'error name variable';
					}else{

						cursor.position++


/*						if (next.type == 'underscore') {

							cursor.position++
							next = tokens[cursor.position];
							if(next.type != 'identifier'){
								throw 'error after underscore in var declaration';
							}
						}*/
						return new NameVariable(tokens[cursor.position]);

					}

				}
				break;
			case 'class':

				cursor.position++
				if(tokens[cursor.position].type != 'space'){

					throw 'need to put space after class';
				}
				cursor.position++
				var position = cursor.position;
				if(tokens[cursor.position].type == 'identifier'){
						cursor.position++
						if(tokens[cursor.position].type == 'accolade-start'){
							var accolade_end = false;
							var nb_accolade_start = 1;
							var nb_accolade_end = 0;

							nb_accolade_start++
							do{

								cursor.position++
								switch(tokens[cursor.position].type){
									case 'accolade-start':
										nb_accolade_start++
										break;
									case 'accolade-end':
										nb_accolade_end++
										if(nb_accolade_start == nb_accolade_end){
											accolade_end = true;
										}
										break;




								}
							}while(accolade_end == true);

							console.log(accolade_end);
							return new ClassName(tokens[cursor.position]);
						}


					
				}else{

					throw 'error in name of class';
				}
				break;
			case 'public':

				cursor.position++
				if(tokens[cursor.position].type == 'space'){
					cursor.position++
					if(tokens[cursor.position].type == 'static' || tokens[cursor.position].type == 'function' || tokens[cursor.position].type == 'var'){

					}else{

						throw 'error declaration public';
					}
				}
				break;
			case 'function':
				//verifie si la fonction est bien defini par un public ou private ou meme un static 
				if(tokens[cursor.position-1].type == 'space' && 
					( tokens[cursor.position-2].type == 'public' || tokens[cursor.position-2].type == 'private' )){

						cursor.position++
						if(tokens[cursor.position].type == 'space'){
							cursor.position++
							if(tokens[cursor.position].type == 'identifier'){
								//parenthese ouvrante + case variable en parametres
								cursor.position++
								if(tokens[cursor.position].type == 'parenthesis-start'){
									do{
										//cursor.position++
										// exemple ($var, $var2){} a prendre en compte
										//if(tokens[cursor.position].type == 'var')
									}while(tokens[cursor.position].type != 'parenthesis-end');

									if(tokens[cursor.position].type == 'accolade-start'){
										var nb_accolade_start_function = 1;
										var nb_accolade_end_function = 0;
										var flag_closed_function = false;
										do{
											cursor.position++
											switch(tokens[cursor.position].type){
												case 'accolade-start':
													nb_accolade_start_function++
													break;
												case 'accolade_end':
													nb_accolade_end_function++
													if(nb_accolade_start_function == nb_accolade_end_function){
														flag_closed_function = true;

													}
													break;
											}
										}while(flag_closed_function == true);
									}
								}
							}
						}


				}else{
					throw 'error declaration function';
				}
				break;
		}
	}	
	
};