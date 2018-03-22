import Token from "./Token.js";
import keywords from "./keywords.js";


export default class TokenFactory{
	
	static create(value, pos){
		const char = value.charAt(0);
/*		console.log("CHAR :");
		console.log(char);*/
		let sub_current = 0
		let sub_char = char
		switch(char){
			case '\r':
				return new Token('line-break-r', '\r', pos);
			case '\n':
				return new Token('line-break', '\n', pos);
			case '\t':
			console.log('indentation');
				return new Token('indent', '\t', pos);
			case ' ':
				return new Token('space', ' ', pos);
			case '=':
				return new Token('equal', '=', pos);
			case ';':
				return new Token('instruction-end', ';', pos);
			case '.':
				return new Token('point', '.', pos);
			case ',':
				return new Token('virgule', ',', pos);
			case '(':
				return new Token('parenthesis-start', '(', pos);
			case ')':
				return new Token('parenthesis-end', ')', pos);
			case '+':
				return new Token('plus', '+', pos);
			case '-':
				return new Token('minus', '-', pos);
			case '_':
				return new Token('underscore', '_', pos);
			case '{':
				return new Token('accolade-start', '{', pos);
			case '}':
				return new Token('accolade-end', '}', pos);
			case '$':
/*			console.log("var");
			console.log(pos);*/
				return new Token('var', '$', pos);
			case '"':
				sub_current = 1
				sub_char = value.charAt(sub_current)
				var isString= false;
				while (sub_current < value.length) {
				  sub_char = value.charAt(sub_current)
				  if (sub_char === '"') {
					sub_current++
					return new Token('object-string', value.substring(0, sub_current), pos);
				  }
				  sub_current++
				}
				if(!isString){
					return false;
				}
				break;
			case '1':
			case '2':
			case '3':
			case '4':
			case '5':
			case '6':
			case '7':
			case '8':
			case '9':
			case '0':
				sub_current = 0
				sub_char = value.charAt(sub_current)

				// set to true when a '.' is encountered
				let isFloat = false
				while (sub_current < value.length) {
				  sub_char = value.charAt(sub_current)

				  if (sub_char === '.') {
					isFloat = true
				  }

				  if (!this.isDigit(sub_char) && sub_char !== '.') {
					return new Token(isFloat ? 'number-float' : 'number', value.substring(0, sub_current), pos);
					current += sub_current
					break
				  }

				  sub_current++
				}
				break
			default:
				let mytoken = this.checkKeywords(value)
				if (mytoken) {
				  mytoken.pos = pos;
				  var i = 0;				  
				  var array_token = [];
				  var token = mytoken;
				  //console.log(token);
				  return mytoken;
				} else if (char.match(/[aA-zZ]/)) {
				  // look for any identifier
				  sub_current = 0
				  sub_char = value.charAt(sub_current)

				  while (sub_current <= value.length) {
					sub_char = value.charAt(sub_current)

					/*if (sub_char.match(/([aA-zZ]|[0-9])/) === null) {
					  return new Token('identifier', value.substring(0, sub_current), pos);
					}
					else */
						if (sub_char.match(/([aA-zZ])/) === null){
						return new Token('chaine_string', value.substring(0, sub_current), pos);
					}
					sub_current++
				  }
				}
				break
			
		}
	}

	static isDigit(val) {
		const DIGIT = /([0-9])/;
		return val.match(DIGIT)
	}
	
	static checkKeywords(slice){
		const keywords_keys = Object.keys(keywords);
		for (let i = 0; i < keywords_keys.length; i++) {
			const currentKeyword = keywords[keywords_keys[i]]

			if (!this.isToken(currentKeyword.r, slice)) {
				return new Token(keywords_keys[i], currentKeyword.s)
			}
		}
		return false
	}
	
	static isToken(tokenRegex, slice) {
	  const match = slice.match(tokenRegex)
	  return match === null ? -1 : match.index
	}
}