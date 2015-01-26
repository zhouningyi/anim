'use strict';

define(function(require) {
  require('zepto');
  var wx = require('wx');
  var Slider = require('./slider/controller.js');
  var Loading = require('./loading.js');
  var Scene = require('./scene/initScene.js');

  function Controller(container) {
    var loading = new Loading($('#canvas-container'));
    var opt = {};
    $('body').one('sceneBegin', function(e, scenes) {
      var order = scenes.order;
      var frames = scenes.frames;
      var N = order.length;
      var sliders = new Slider($('#slider-container'), {
        'N': N
      });

      for (var index in order) {
        var sceneID = order[index];
        var frame = frames[sceneID];
        var container = sliders[index];
        Scene.render(container, frame, sceneID);
      }
    })
  }

  var js_ticket_url = '/change/weixin/sign?url=' + window.location.origin + window.location.pathname;
  $.getJSON(js_ticket_url,
    function(data, status) {
      data = data || {};
      var config = data.config;
      // config.debug = true;
      wx.config(config);
      wx.ready(function() {
        var title = '感谢有你 一路相伴';
        var picUrl = 'http://open-wedding.qiniudn.com/屏幕快照 2015-01-25 上午11.58.48.png';
        var desc = '热烈祝贺国内首家房产抵押贷款专业平台 - 房金所26日在上海股交中心挂牌';
        var url = 'https://open.weixin.qq.com/connect/oauth2/authorize?appid=wx05125e8c1635642f&redirect_uri=http%3A%2F%2Fmankattan.mathartworld.com%2Fchange%2Ffang%2F&response_type=code&scope=snsapi_base&state=123&connect_redirect=1#wechat_redirect';
        var shareObj = {
          title: title,
          link: url,
          imgUrl: picUrl,
          desc: desc,
          success: function() {
            // 用户确认分享后执行的回调函数
          },
          cancel: function() {
            // 用户取消分享后执行的回调函数
          }
        };

        wx.onMenuShareTimeline(shareObj);
        wx.onMenuShareAppMessage(shareObj);
      });
    });
  return Controller;
});
