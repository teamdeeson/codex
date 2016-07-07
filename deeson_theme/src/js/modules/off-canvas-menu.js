'use strict';

var $ = require('jquery');

module.exports = function () {

  /**
   * Toggles visibility of mobile nav
   */

  var $offCanvasMenu = $(".off-canvas-menu"),
      openClassName = 'off-canvas-menu--open';

  $(".off-canvas-menu__trigger").click(function(e){
    // stop `.off-canvas-menu__content` event handler being called if
    // `.off-canvas-menu__trigger` is nested inside it
    event.stopPropagation();

    if($offCanvasMenu.hasClass(openClassName)){
      $offCanvasMenu.removeClass(openClassName);
    } else {
      $offCanvasMenu.addClass(openClassName);
    }

  });

  $(".off-canvas-menu__close-trigger, .off-canvas-menu__content").on('click', function(){
    $offCanvasMenu.removeClass(openClassName);
  });

}