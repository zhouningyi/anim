'use strict';

!function(root, factory) {
  if (typeof define === 'function' && define.amd) {
    define(['zepto'], factory);
  } else {
    factory(root.jQuery);
  }
}(this, function($) {

  //zepto或jquery 插件 通过keyframe 添加动画
  $.fn.removeStyle = function(style) {
    var search = new RegExp(style + '[^;]+;?', 'g');
    return this.each(function() {
      $(this).attr('style', function(i, style) {
        return style.replace(search, '');
      });
    });
  };

  $.fn.keyAnim = function(keyframe, opt) {
    var time = opt.time || 1;
    var icount = opt.icount || 1;
    var node = $(this);
    var cb = opt.cb;
    var delay = opt.delay || 0.001;
    var anim = {
      '-webkit-animation-name': keyframe,
      '-moz-animation-name': keyframe,
      '-o-animation-name': keyframe,
      'animation-name': keyframe,
      '-webkit-animation-duration': time + 's',
      '-moz-animation-duration': time + 's',
      '-o-animation-duration': time + 's',
      'animation-duration': time + 's',
      '-webkit-animation-fill-mode': 'both',
      '-moz-animation-fill-mode': 'both',
      '-o-animation-fill-mode': 'both',
      'animation-fill-mode': 'both',
      'animation-iteration-count': icount,
      '-webkit-animation-iteration-count': icount,
      '-webkit-animation-delay': delay + 's',
      'animation-delay': delay + 's'
    };
    node.css(anim);
    if(cb){
      node.one('webkitAnimationEnd animationend', cb);
    }
    return this;
  };

  var aniStyles = ['-webkit-animation-name','-moz-animation-name','-o-animation-name','animation-name','-webkit-animation-duration','-moz-animation-duration','-o-animation-duration','animation-duration','-webkit-animation-fill-mode','-moz-animation-fill-mode','-o-animation-fill-mode','animation-fill-mode','animation-iteration-count','-webkit-animation-iteration-count'];
   $.fn.clearKeyAnim = function() {
    var node = $(this);
    for(var k in aniStyles){
      node.removeStyle(aniStyles[k]);
    }
    return this;
   };
});



