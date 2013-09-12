var delete_action_handler = function(event) {
    var add_link = $(this);
    var link = add_link.attr('href');
    $.get(link, {}, function(data) {
        if(data == 'ok')
          $('#action'+add_link.attr('data-action-id')).html("");
    });
    event.stopPropagation();
	event.preventDefault();
    return false;
};

var display_popup_handler = function(event) {
    /*var w = 700;
    var h = 500;
    var left = 100;
    var top = 100;
    var name="Friends";
    var settings = 'height=' + h + ',width=' + w + ',left=' + left + ',top=' + top + ',resizable=yes,scrollbars=yes,toolbar=no,menubar=no,location=yes,directories=no,status=yes';
    var url = $(this).attr("href");
    window.open(url, name, settings);
    event.stopPropagation();
	event.preventDefault();
    return false;*/

    event.preventDefault();
    $("<div id='pop_up'><span class='button b-close'><span>X</span></span></div>").appendTo("body").addClass('popup');
    $('#pop_up').bPopup({
        content:'ajax',
        loadUrl:$(this).attr("href"),
        zIndex: 8050,
        onClose: function(){ $('#pop_up').remove(); },
        scrollBar:'true'
    },
    function() {
            install_follow_handlers();
    });
    
};

var share_action_handler = function(event) {
    if(login_required_handler())
        return false;
    
    var $elementClicked = $(this);
    var link =  $elementClicked.data("href");

    $.get(link, {}, function(data) {
        if(data.success == true)
          alert('shared');
    });
   	event.stopPropagation();
	event.preventDefault();
    return false;
};

var follow_post_handler = function(event) {
    if(login_required_handler())
        return false;
    
    var $elementClicked = $(this);
    var link =  $elementClicked.data("href");

    $.get(link, {}, function(data) {
        if(data == 'ok')
        {
          $href = $elementClicked.attr('href')
          $newhref = $href.replace("follow", "unfollow");
          $elementClicked.attr('href', $newhref);
          $elementClicked.html("unfollow post");
        }
    });
    event.stopPropagation();
    event.preventDefault();
    return false;
};

var unfollow_post_handler = function(event) {
    if(login_required_handler())
        return false;
    
    var $elementClicked = $(this);
    var link =  $elementClicked.data("href");
    
    $.get(link, {}, function(data) {
        if(data == 'ok')
        {
          $href = $elementClicked.attr('href')
          $newhref = $href.replace("unfollow", "follow");
          $elementClicked.attr('href', $newhref);
          $elementClicked.html("follow post");
        }
    });
    event.stopPropagation();
    event.preventDefault();
    return false;
};

var img_iframe_handler =  function(){
    var oldId = $(this).attr("id");
    var currentId = oldId.substring(3);
    pTP = "pTP"+currentId;
    pDP = "pDP"+currentId;
    oldId = "#"+oldId;
    currentId = "#"+currentId;
    $(oldId).css({'display': 'none'});
    $(currentId).css({'display': 'block'});
    $('#'+pTP).css({'width': '495px'});
    $('#'+pDP).css({'width': '495px'});
};

var install_action_handlers = function(){
    install_voting_handlers();
    install_toggle_comment_handler(); //inherited from comment.handlers.js
    $('.deleteAction').off("click").on("click", delete_action_handler);
    $('.shareaction').off("click").on("click", share_action_handler);
    $('.followpost').off("click").on("click", follow_post_handler);
    $('.unfollowpost').off("click").on("click", unfollow_post_handler);
    $('a.album_in_feed').off('click').on('click', album_in_feed_handler);
    $(".imgIframe").off("click").on("click", img_iframe_handler);
    $('.previewPosted').width('100%');
}

var install_voting_handlers = function(){
    $('.upvote').add('.downvote').add('.clearvote').off("click").on("click", voting_handlers);
    $('.found-helpful').add('.not-found-helpful').add('.clear-helpful').off("click").on("click", review_voting_handler);
    $('.pScore').add('.broadcasters').off("click").on("click", display_popup_handler);
}

var album_in_feed_handler = function(){
    var $element_clicked = $(this);
    var album_url = $element_clicked.data("album-url");
    $.get(album_url, {}, function(data) {
        $element_clicked.closest('div[class^="album-feed-container"]').append(data);
        $element_clicked.off('click');
        $element_clicked.closest('div[class^="album-feed-container"]').find('a.album_in_feed').lightBox();
        $element_clicked.click();
    });
    return false;    
}

$(document).ready(function(){
    install_voting_handlers();  
});

