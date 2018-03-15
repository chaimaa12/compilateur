const keywords = {
  'variable-declaraction': { r: /(var\s)/, s: 'var' },
  'console-object': { r: /(console)/, s: 'console' },
  'variable-print': {r: /(echo\s)/, s: 'echo'},
  'debut_declaration_php': {r: /(\<\?php)/, s: '<?php'},
  'fin_declaration_php': {r: /(\?>)/, s: '\?>'}


};

module.exports = keywords;