var numbers = '0123456789';

var tokenCharacter = 'abcdefghijklmnopqrstwxyz';

exports.randomCode = (length) => {
  var result = '';
  for (var i = 0; i < length; i++) {
      result += numbers.charAt(Math.floor(Math.random() * numbers.length));
  }
  return result;
}

exports.randomToken = (length) => {
  var result = '';
  for (var i = 0; i < length; i++) {
      result += tokenCharacter.charAt(Math.floor(Math.random() * tokenCharacter.length));
  }
  return result;
}