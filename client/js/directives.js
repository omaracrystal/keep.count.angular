app.directive('modalDialog', function() {
  return {
    restrict: 'E',
    scope: {
      show: '='
    },
    replace: true, // Replace with the template below
    transclude: true, // we want to insert custom content inside the directive
    link: function(scope, element, attrs) {
      scope.dialogStyle = {};
      if (attrs.width)
        scope.dialogStyle.width = attrs.width;
      if (attrs.height)
        scope.dialogStyle.height = attrs.height;
      scope.hideModal = function() {
        scope.show = false;
      };
    },
    template: "<div class='ng-modal' ng-show='show'><div class='ng-modal-overlay' ng-click='hideModal();'></div><div class='ng-modal-dialog' ng-style='dialogStyle'><button id='close' class='btn ng-modal-close' ng-click='hideModal()'><span class='glyphicon glyphicon-remove' aria-hidden='true'></span></button><div class='ng-modal-dialog-content' ng-transclude></div></div></div>"
  };
});

app.directive("stickyNav", function stickyNav($window){
  function stickyNavLink(scope, element){
    var w = angular.element($window),
        size = element[0].clientHeight,
        top = 0;

    function toggleStickyNav(){
      if(!element.hasClass('controls-fixed') && $window.pageYOffset > top + size){
        element.addClass('controls-fixed');
      } else if(element.hasClass('controls-fixed') && $window.pageYOffset <= top + size){
        element.removeClass('controls-fixed');
      }
    }

    scope.$watch(function(){
      return element[0].getBoundingClientRect().top + $window.pageYOffset;
    }, function(newValue, oldValue){
      if(newValue !== oldValue && !element.hasClass('controls-fixed')){
        top = newValue;
      }
    });

    w.bind('resize', function stickyNavResize(){
      element.removeClass('controls-fixed');
      top = element[0].getBoundingClientRect().top + $window.pageYOffset;
      toggleStickyNav();
    });
    w.bind('scroll', toggleStickyNav);
  }

  return {
    scope: {},
    restrict: 'A',
    link: stickyNavLink
  };
});
