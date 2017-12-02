// binding an anonymous function to handle the change event:
$('input[name=PetIDs]').on('change', function () {
    var input = this;

    // navigating to the form 'this.form',
    // finding the submit button (obviously correct the
    // selector),
    // setting the disabled property of the submit button to
    // to be false when the check-box is checked, and true
    // when the check-box is unchecked:
    $(input.form).find('button').prop('disabled', !input.checked);
});