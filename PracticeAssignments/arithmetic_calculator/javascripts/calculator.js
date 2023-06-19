$(function() {
  let $input1 = $('#first-number');
  let $input2 = $('#second-number');
  let $result = $('#result');

  $('form').submit(e => {
    e.preventDefault();
    let result;
    let num1 = Number($input1.val());
    let num2 = Number($input2.val());
    let $selectedOperator = $('#operator option:selected');
    switch($selectedOperator.text()) {
      case '+':
        result = num1 + num2;
        break;
      case '-':
        result = num1 - num2;
        break;
      case '*':
        result = num1 * num2;
        break;
      case '/':
        result = num1 / num2;
        break;
    }
    $result.text(result);
  });
});