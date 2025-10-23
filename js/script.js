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


//　top-voice　スライダー
$(function(){
  $('.p-slider').slick({
    slidesToShow: 3,        // 一度に表示するスライド数
    slidesToScroll: 1,      // 一度にスライドする数
    arrows: true,           // 矢印の表示
    dots: false,            // ドットナビ非表示
    infinite: true,         // 無限ループ
    // autoplay: true,         // 自動再生
    autoplaySpeed:3000,
    speed: 600,               // スライド速度（ms）
    cssEase: 'ease',
    prevArrow: '<button type="button" class="slick-prev p-slider__prev"><img src="../images/arrow-left.svg" alt="前へ"></button>',
    nextArrow: '<button type="button" class="slick-next p-slider__next"><img src="../images/arrow-right.svg" alt="次へ"></button>',
    responsive: [
      {
        breakpoint: 768,    // スマホ表示
        settings: {
          slidesToShow: 1
        }
      }
    ]
  });
});

// アコーディオン
$(function () {
  $('.js-accordion-button').on('click', function () {
    var $content = $(this).find('.js-accordion-content');
    if ($content.is(':visible')) {
      $content.slideUp(300);
      $(this).removeClass('is-active');
    } else {
      // jQueryのslideDownでblockが入る前にflex指定
      $content
        .css('display', 'flex')
        .hide()
        .slideDown(300, function () {
          // 最終的にflex維持
          $(this).css('display', 'flex');
        });
      $(this).addClass('is-active');
    }
  });
});