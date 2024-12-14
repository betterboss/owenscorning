
(function() {
  //list of selectors for things that WTB suppression should hide
  let WTB_ELEMENTS = [
    $(".pinkbar-calculator a[href='/composites/product/flatworkfiberglassrebar']:contains('Where')"),
    $("a.oc-cta-button[href='/roofing/contractors']"),
  ];

  function getFeaturesCookied() {
    var name = "feature_flags_v2=";
    var decodedCookie = decodeURIComponent(document.cookie);
    var ca = decodedCookie.split(';');
    for(var i = 0; i <ca.length; i++) {
      var c = ca[i];
      while (c.charAt(0) == ' ') {
        c = c.substring(1);
      }
      if (c.indexOf(name) == 0) {
        return JSON.parse(c.substring(name.length, c.length));
      }
    }
    return [];
  }

  if ($.inArray('contractor_referral', getFeaturesCookied()['enabled'] || []) >= 0) {
    for (let i = 0; i < WTB_ELEMENTS.length; i++) WTB_ELEMENTS[i].remove();
  }
}());

