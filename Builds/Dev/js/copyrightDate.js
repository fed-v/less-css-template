module.exports = function() {

    //////////////////////////////////////////////////////
    ///     Set copyright date
    //////////////////////////////////////////////////////


    // Create Instance of the Date Object
    var date = new Date();

    // Extract Four Digit Year and Add to Footer
    document.getElementById('year').innerHTML = date.getFullYear();

};
