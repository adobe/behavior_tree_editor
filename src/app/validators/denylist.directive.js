(function() {
  "use strict";

  angular.module("app").directive("denylist", denylist);

  function denylist() {
    var directive = {
      require: "ngModel",
      restrict: "A",
      link: link
    };
    return directive;

    function link(scope, element, attrs, ctrl) {
      var denylist = attrs.denylist.split(",");

      //For DOM -> model validation
      ctrl.$parsers.unshift(function(value) {
        var valid = denylist.indexOf(value) === -1;
        ctrl.$setValidity("denylist", valid);
        return valid ? value : undefined;
      });

      //For model -> DOM validation
      ctrl.$formatters.unshift(function(value) {
        ctrl.$setValidity("denylist", denylist.indexOf(value) === -1);
        return value;
      });
    }
  }
})();

