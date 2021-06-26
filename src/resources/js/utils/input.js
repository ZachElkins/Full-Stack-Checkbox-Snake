$(function() {
    $(".rb").click(function() {
    });

    $(".chart-difficulty").click(function() {
        $(this).parent().find(".rb").removeClass("rb-active");
        $(this).addClass("rb-active");
        updateData($(this).attr("data-value"));
    });

    $(".game-difficulty").click(function() {
        if (!gameInProgress) {
            $(this).parent().find(".rb").removeClass("rb-active");
            $(this).addClass("rb-active");
            
            setDifficulty(parseInt($(this).attr("data-value")), $(this).attr('id'));
        }
    });


    $('[data-toggle="tooltip"]').tooltip()
});