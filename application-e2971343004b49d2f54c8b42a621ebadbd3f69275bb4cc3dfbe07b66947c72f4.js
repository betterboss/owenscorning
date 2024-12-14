// Save search field values in analytics
function trackSearchValues() {
  var $search = $('input[type="search"]');

  $search.each(function () {
    var $this = $(this);
    var $form = $this.parents('form');

    $this.on('keyup', function () {
      $form.attr('data-track-search-term', $this.val());
    })
  })
}

function meganav() {
  var mobileNavButton = document.querySelector(".mobile-nav__toggle");
  var mobileNavIcons = document.getElementById("hamburger__icon");
  var mobileNavPanel = document.getElementById("mobile-nav-panel");
  var listItem = document.querySelectorAll("[data-structure='mobile-nav-list-item']");
  var secondaryNav1 = document.querySelector(".secondary-panel-1");
  var secondaryNav2 = document.querySelector(".secondary-panel-2");
  var backButton = document.querySelectorAll(".active-selection__back-button");

  function openCloseMainNav(start, startActive, active, finish) {
    mobileNavPanel.classList.remove(start);
    mobileNavPanel.classList.add(startActive);

    setTimeout(function () {
      mobileNavPanel.classList.remove(startActive);
      mobileNavPanel.classList.add(active);
    }, 100);

    setTimeout(function () {
      mobileNavPanel.classList.remove(active);
      mobileNavPanel.classList.add(finish);
    }, 250);
  }

  function slideSecondaryNav(
    target,
    start1,
    start2,
    startActive1,
    startActive2,
    active1,
    active2,
    finish1,
    finish2
  ) {
    if (target != null && target.length) {
      document.getElementById(target).classList.add("active");
    }

    secondaryNav1.classList.remove(start1);
    secondaryNav1.classList.add(startActive1);
    secondaryNav2.classList.remove(start2);
    secondaryNav2.classList.add(startActive2);

    setTimeout(function () {
      secondaryNav1.classList.remove(startActive1);
      secondaryNav1.classList.add(active1);
      secondaryNav2.classList.remove(startActive2);
      secondaryNav2.classList.add(active2);
    }, 100);

    setTimeout(function () {
      secondaryNav1.classList.remove(active1);
      secondaryNav1.classList.add(finish1);
      secondaryNav2.classList.remove(active2);
      secondaryNav2.classList.add(finish2);

      // After closing the secondary nav panel, hide it
      // and move focus to first element
      if (target == null) {
        document
          .querySelector(".mobile-nav__active-selection.active")
          .classList.remove("active");
        document.querySelector('.mobile-nav__list-item').focus();
      }
    }, 500);
  }

  if (mobileNavButton != null) {
    mobileNavButton.onclick = function () {
      if (mobileNavIcons.classList.contains("fa-bars")) {
        var start = "fade-in-exit-done";
        var startActive = "fade-in-enter";
        var active = "fade-in-enter-active";
        var finish = "fade-in-enter-done";
      } else {
        var start = "fade-in-enter-done";
        var startActive = "fade-in-exit";
        var active = "fade-in-exit-active";
        var finish = "fade-in-exit-done";
      }

      openCloseMainNav(start, startActive, active, finish);
      mobileNavIcons.classList.toggle("fa-bars");
      mobileNavIcons.classList.toggle("fa-times");
    };
  }

  function goForward(target) {
    var target = target;
    var start1 = "main-panel-enter-done";
    var startActive1 = "main-panel-exit";
    var start2 = "secondary-panel-exit-done";
    var startActive2 = "secondary-panel-enter";
    var active1 = "main-panel-exit-active";
    var finish1 = "main-panel-exit-done";
    var active2 = "secondary-panel-enter-active";
    var finish2 = "secondary-panel-enter-done";

    slideSecondaryNav(
      target,
      start1,
      start2,
      startActive1,
      startActive2,
      active1,
      active2,
      finish1,
      finish2
    );
  }

  for (var l = 0; l < listItem.length; l++) {
    listItem[l].addEventListener("click", function () {
      goForward(this.getAttribute('data-target'));
    });

    listItem[l].addEventListener("keypress", function (e) {
      var key = e.which || e.keyCode;
      if (key === 13) {
        goForward(this.getAttribute('data-target'));
      }
    });
  }

  function goBack() {
    var target = null;
    var start1 = "main-panel-exit-done";
    var startActive1 = "main-panel-enter";
    var start2 = "secondary-panel-enter-done";
    var startActive2 = "secondary-panel-exit";
    var active1 = "main-panel-enter-active";
    var finish1 = "main-panel-enter-done";
    var active2 = "secondary-panel-exit-active";
    var finish2 = "secondary-panel-exit-done";

    slideSecondaryNav(
      target,
      start1,
      start2,
      startActive1,
      startActive2,
      active1,
      active2,
      finish1,
      finish2
    );
  }

  for (var b = 0; b < backButton.length; b++) {
    backButton[b].addEventListener("click", goBack);
    backButton[b].addEventListener("keypress", function (e) {
      var key = e.which || e.keyCode;
      if (key === 13) {
        goBack();
      }
    });
  }
};

function meganavSubmenus() {
  document.querySelectorAll(".navbar-dropdown").forEach(function (dropdown) {
    // Define helper functions
    var toggleFlyout = function (dropdown) {
      var trigger = dropdown.querySelector('.nav-dropdown-trigger');
      if (trigger.getAttribute('aria-expanded') == false || trigger.getAttribute('aria-expanded') == 'false') {
        activateFlyout(dropdown);
      } else {
        deactivateFlyout(dropdown);
      }
    }
    var activateFlyout = function (dropdown) {
      // Enable interaction with flyout links
      section = dropdown.querySelector('.dropdown-section')
      section.setAttribute('aria-hidden', false)
      section.querySelectorAll("a").forEach(function (item) {
        item.setAttribute("tabindex", 0)
      });
      // Enable top-level link if it exists
      topLevelLink = dropdown.querySelector("a.nav-link-dropdown")
      if (topLevelLink) {
        topLevelLink.setAttribute("tabindex", 0)
        topLevelLink.setAttribute('aria-hidden', false)
      }
      // Inform screen-reader than flyout is open
      dropdown.querySelector('.nav-dropdown-trigger').setAttribute('aria-expanded', true)
    }
    var deactivateFlyout = function (dropdown) {
      // Disable interaction with flyout links
      section = dropdown.querySelector('.dropdown-section')
      section.setAttribute('aria-hidden', true)
      section.querySelectorAll("a").forEach(function (item) {
        item.setAttribute("tabindex", -1)
      });
      // Disable top-level link if it exists
      topLevelLink = dropdown.querySelector("a.nav-link-dropdown")
      if (topLevelLink) {
        topLevelLink.setAttribute("tabindex", -1)
        topLevelLink.setAttribute('aria-hidden', true)
      }
      // Inform screen-reader than flyout is closed
      dropdown.querySelector('.nav-dropdown-trigger').setAttribute('aria-expanded', false)
    }
    // Initially deactivate all flyout contents
    deactivateFlyout(dropdown);
    // Bind interactions
    dropdown.onkeydown = function (e) {
      if (e.key === 'Enter') {
        toggleFlyout(dropdown);
      }
      if (e.key === 'Space' || e.key === ' ') {
        // Prevent scroll on space press
        e.preventDefault();
        toggleFlyout(dropdown);
      }
    };
    // Screen reader will product click events
    dropdown.onclick = function (e) {
      toggleFlyout(dropdown)
    }
  });
}

function openCloseRailsModal() {
  window.onhashchange = function () {
    if (window.location.hash === '#!' && window.myWindowFocusedElement) {
      window.myWindowFocusedElement.focus()
      window.myWindowFocusedElement = undefined
    }
  }
}

// This exists solely to make the browser render code embedded in translations.
// The name is a holdover from when it did more work
// CAUTION: another superscriptRballs method is available in global.js.
// function superscriptRballs() {
//   $('body:not(.skip-rballs) :not(script,iframe,sup)')
//     .contents()
//     .filter(function () {
//       return this.nodeType === 3;
//     })
//     .replaceWith(function () {
//       var words = this.nodeValue.split(' ');
//       return words.join(' ');
//     });
// }

function handleExternalLinks() {
  $(document).on('mousedown.external', 'a:not([href*="mailto:"],[href*="javascript"], .no-new-tab)', function () {

    var isLocalhost = this.href.indexOf('localhost') !== -1;
    var isHTTP = this.href.indexOf('http') === 0;
    var domain = this.href.split('.')[1];
    var domainWhitelist = [
      'owenscorning',
      'owenscorningcareers',
      'ocproconnect',
      'paroc',
    ]

    var isInternal = domainWhitelist.indexOf(domain) === -1 ? false : true;

    // Only links that start with "http" and are NOT localhost or internal should be affected
    if (isLocalhost || !isHTTP || (isHTTP && isInternal)) {
      return;
    }

    $(this).attr('target', '_blank');
  });
}

function windowWidth() {
  var w = window,
    d = document,
    documentElement = d.documentElement,
    body = d.getElementsByTagName("body")[0],
    width = w.innerWidth || documentElement.clientWidth || body.clientWidth;
  return width;
}

function makeFooterAccessibleOnMobile() {
  var onClick = function (e) {
    e.preventDefault()
    if (e.target.tagName == 'label' || e.target.tagName == 'LABEL') {
      toggle(e.target);
    } else {
      toggle(e.target.parentNode);
    }
  }
  var onCheck = function (label) {
    toggle(label);
  }
  var onKeyDown = function (e) {
    // Ignore early Firefox events
    if (e.isComposing) return;
    if (e.key == 'Enter' || e.key == 'Space' || e.key == ' ') {
      e.preventDefault();
      toggle(e.target);
    }
  }
  var toggle = function (target) {
    var willOpen = target.getAttribute('aria-expanded') == 'true' ? false : true;
    target.parentElement.querySelector('input[type=checkbox').checked = willOpen;
    target.parentElement.querySelector('label + ul').setAttribute('aria-hidden', !willOpen);
    target.setAttribute('aria-expanded', willOpen);
  }
  var footer = document.querySelector('footer');
  if (footer) {
    var buttons = footer.querySelectorAll('.footer-content > ul label');
    var unbind = function () {
      buttons.forEach(function (button) {
        button.removeAttribute('tabindex')
        button.removeAttribute('role');
        button.removeAttribute('aria-expanded');
        button.parentElement.querySelector('input[type=checkbox').checked = false;
        button.parentElement.querySelector('label + ul').removeAttribute('aria-hidden');
        button.onclick = null;
        button.onkeydown = null;
      })
    }
    var bind = function () {
      buttons.forEach(function (button) {
        button.setAttribute('tabindex', 0)
        button.setAttribute('role', 'button');
        button.setAttribute('aria-expanded', false);
        button.parentElement.querySelector('label + ul').setAttribute('aria-hidden', true);
        button.onclick = onClick;
        button.onkeydown = onKeyDown;
        // Screen reader "clicks" on hidden input, need to pass label as toggle param
        button.parentElement.querySelector('input[type=checkbox]').onclick = function () {
          onCheck(button)
        };
      })
    }
    unbind();
    if (windowWidth() < 768) {
      bind();
    }
  }
}

function anchorLinkOnLoad() {
  if (window.location.hash && typeof (window.PB_PAGE) === 'undefined') {
    if ($('.oc-stickynav').length) {
      var $hash = window.location.hash.substring(1);
      var $stickyNavHeight = $('.oc-stickynav').outerHeight() + 25;
      var offset = $('#' + $hash).offset();
      var offsetTop = offset.top - $stickyNavHeight;

      $('html, body').stop().animate({
        scrollTop: offsetTop
      }, 600);
    }
  }
}


$(document).ready(function () {
  meganav();
  //superscriptRballs();
  trackSearchValues();
  handleExternalLinks();
  makeFooterAccessibleOnMobile();
  meganavSubmenus();
  openCloseRailsModal();
  anchorLinkOnLoad();

  window.addEventListener('resize', makeFooterAccessibleOnMobile, true);

});
