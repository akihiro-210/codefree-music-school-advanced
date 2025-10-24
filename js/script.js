$(function () {});


// ============================
// スクロール固定用変数と関数
// ============================
let scrollPosition = 0;

function lockScroll() {
  scrollPosition = $(window).scrollTop();

  $("html").css({
    position: "fixed",
    top: `-${scrollPosition}px`,
    width: "100%",
    overflow: "hidden",
  });

  $("body").addClass("no-scroll");
}

function unlockScroll() {
  $("html").css({
    position: "",
    top: "",
    width: "",
    overflow: "",
  });

  $("body").removeClass("no-scroll");
  $(window).scrollTop(scrollPosition);
}



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
     // ハンバーガー開いている場合はトップへ戻るボタンを非表示、スクロール固定。閉じたら閉じたらスクロール固定解除
    if ($(".js-drawer").hasClass("is-active")) {
        $(".js-page-top").stop(true,true).fadeOut(300);
        lockScroll();
    } else {
        unlockScroll();
    }
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

// トップ戻るボタン
$(function () {
  const pageTop = $(".js-page-top");
  pageTop.hide();

  function togglePageTop() {
    const scroll = $(window).scrollTop();
    const isDrawerOpen = $(".js-drawer").hasClass("is-active");

    if (isDrawerOpen) {
      // ドロワー開いてるときは常に非表示
      pageTop.stop(true, true).fadeOut(300);
    } else {
      // 通常時のみスクロール量で制御
      if (scroll > 100) {
        // まだ表示されていなければ fadeIn
        if (!pageTop.is(":visible")) {
          pageTop.stop(true).fadeIn(300);
        }
      } else {
        // すでに非表示でなければ fadeOut
        if (pageTop.is(":visible")) {
          pageTop.stop(true).fadeOut(300);
        }
      }
    }
  }

  // スクロール・リサイズ時どちらでもチェック
  $(window).on("scroll resize", togglePageTop);

  // ページトップボタンクリックで戻る
  pageTop.click(function () {
    $("html, body").animate({ scrollTop: 0 }, 500);
    return false;
  });

  // 初期チェック
  togglePageTop();
});