import TokenFactory from "./TokenFactory.js";

export default class Tokenizer{
	
	constructor(){
		this.tokens = [];
		this.cursor = 0;
		// used only in case of error
		this.cursor_y = 1
		this.cursor_x = 1
	}
	
	static parse(input){
		let instance= new Tokenizer();
		let slice = input.substring(instance.cursor);
		while(slice.length > 0){
			instance.addToken(slice);
			slice = input.substring(instance.cursor);
		}
		return instance.tokens;
	}
	
	addToken(input){
/*		console.log("INPUT :");
		console.log(input);
		console.log("THIS.CURSOR :");
		console.log(this.cursor);*/
		let token = TokenFactory.create(input, this.cursor);
		if(!token){
			throw `syntax error at ${this.cursor_y}:${this.cursor_x}`
		}else{
			switch(token.type){
				case 'line-break':
				    this.cursor_y += 1
					this.cursor_x = 1
					this.cursor++
					break;
				case 'line-break-r':
				case 'space':
				case 'equal':
				case 'instruction-end':
				case 'point':
				case 'virgule':
				case 'parenthesis-start':
				case 'parenthesis-end':
				case 'var':
				case 'accolade-start':
				case 'accolade-end':
				//case 'php-declaration-debut':
					this.cursor++
					//break;
				default:
					this.cursor+= token.value.length;
			}
			this.tokens.push(token);
		}
		
	}
}