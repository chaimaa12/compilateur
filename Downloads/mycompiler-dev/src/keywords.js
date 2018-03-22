const keywords = {
  'variable-declaraction': { r: /(var\s)/, s: 'var' },
  'console-object': { r: /(console)/, s: 'console' },
  'php-declaration-debut': { r: /(\<\?php)/, s: '<?php'},
  'php-declaration-end': {r: /(\?>)/, s: '\?>'},
  'echo' : {r: /(echo)/, s: 'echo'},
  'public' : {r: /(public)/, s: 'public'},
  'private': {r: /(private)/, s: 'private'},
  'class': {r: /(class)/, s: 'class'},
  'function': {r: /(function)/, s: 'function'},
};

module.exports = keywords;