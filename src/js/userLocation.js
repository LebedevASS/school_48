$('#city').select2(); /* инициализируем Select2 */
$('#edu').select2();
$('#teacher').select2();
$('#class').select2();

  // после выбора элемента красный бордер уходит
$('.login__select').on('select2:close', function() {
  if ($(this).val()) { // Проверяем валидность поля
    $(this).parent().removeClass('select2-container--required').addClass('select2-container--valid');      
  } else {
    $(this).parent().removeClass('select2-container--valid').removeClass('select2-container--required');
  }
});