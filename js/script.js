$(function () {});

// ヘッダーメニュースクロール時の色変更（aboutセクション上部が画面上端に到達時）
$(window).on("scroll", function () {
  const aboutTop = $(".about").offset().top;
  const scroll = $(this).scrollTop();
  if (scroll >= aboutTop) {
    $(".js-header").addClass("headerColorScroll");
  } else {
    $(".js-header").removeClass("headerColorScroll");
  }
});


// ハンバーガーメニュー
$(".hamburger-wrap,.js-drawer,.drawer-menu__item a").click(function () {
    $(".js-hamburger").toggleClass("is-active");
    $(".js-drawer").toggleClass("is-active");
    $("body").toggleClass("no-scroll");
    $(".js-page-top").toggleClass("display-none");
});


// サイト内移動
var headerHeight = $('.js-header').outerHeight();
$('a[href^="#"]').click(function(){
  var id = $(this).attr('href');
  var position = $(id).offset().top - headerHeight + 1;
  $('html,body').animate({ scrollTop: position}, 500);
  $("#hamburger").removeClass("is-active");
  $("#drawer").removeClass("is-active");
  $("body").removeClass("no-scroll");
  return false;
});