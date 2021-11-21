var numbers = '0123456789';

exports.randomCode = (length) => {
  var result = '';
  for (var i = 0; i < length; i++) {
      result += numbers.charAt(Math.floor(Math.random() * numbers.length));
  }
  return result;
}