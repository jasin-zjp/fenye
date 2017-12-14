$(function () {
	
  var $oResultBox = $('#resultBox');//获取显示数据的面板
  var books = data.books;//获取后台数据
  data.count = books.length;
  $('#paging').paging({//调用分页方法
    nowPage: 1,//默认当前页为第一页
    allPages: Math.ceil(data.count / 6),//获取所有页数
    displayPage: 6,//切换按钮显示的数量
    callBack: function (now) {//now为当前页码
    	//当前页可显示的内容数量
      var currentPages = now * 6 < books.length ? 6 : books.length - (now - 1) * 6;
			//每次点击时先清空当前容器内容
      $oResultBox.html('');

			//动态创建
      for (var i = 0; i < currentPages; i++) {
        var num = (now - 1) * 6 + i;
        var create_dl = $('<dl></dl>');
        var _html = '<dt>'+
                      '<a href='+books[num].alt+' target="_blank"><img src='+books[num].image+'></a>'+
                    '</dt>'+
                    '<dd>'+
                      '<a href='+books[num].alt+' target="_blank" class="title">'+books[num].title+'</a>'+
                      '<p class="author">'+books[num].author+'</p>'+
                      '<p class="publisher">'+books[num].publisher+'</p>'+
                    '</dd>';
																																																																																																																																			
        create_dl.html(_html).addClass('bounceIn animated');
        $oResultBox.append(create_dl);
      }
    }
  });
});

;(function ($, window, document, undefined) {

  var Paging = function (elem, options) {
    var self = this;
    this.$oPaging = elem;
    this.$oFirst = this.$oPaging.find('.first');
    this.$oLast = this.$oPaging.find('.last');
    this.$oPrev = this.$oPaging.find('.prev');
    this.$oNext = this.$oPaging.find('.next');
    this.$oList = this.$oPaging.find('.list');
    this.$aItem = this.$oList.find('li');
    this.$oGo = this.$oPaging.find('.go');
    this.$oGo_text = this.$oGo.find('input');
    this.$oGo_btn = this.$oGo.find('button');

    this.defaults = {
      nowPage: 1,
      allPages: 10,
      displayPage: 5
    };

    this.opts = $.extend({}, this.defaults, options);

    this.nowPage = this.opts.nowPage;
    this.allPages = this.opts.allPages;
    this.displayPage = this.opts.displayPage > this.allPages 
                     ? this.opts.displayPage = this.allPages 
                     : this.opts.displayPage;
    this.iNum = this.nowPage;
    this.min_halfPage = Math.floor(this.displayPage / 2);
    this.big_halfPage = Math.ceil(this.displayPage / 2);
  };

  Paging.prototype = {
    clickFn: function () {
      this.cleanClassName();
      this.setPaging(this.iNum);
      this.detectionPage(this.iNum);

      this.opts.callBack && this.opts.callBack(this.iNum);
    },

    cleanClassName: function () {
      this.$aItem.removeClass('cur');
    },

    detectionPage: function (currentPage) {
      if (currentPage >= this.big_halfPage + 1) {
        this.$oFirst.removeClass('disable');
      } else {
        this.$oFirst.addClass('disable');
      }

      if ((this.allPages - currentPage) >= this.big_halfPage) {
        this.$oLast.removeClass('disable');
      } else {
        this.$oLast.addClass('disable');
      }

      if (currentPage > 1) {
        this.$oPrev.removeClass('disable');
      } else {
        this.$oPrev.addClass('disable');
      }
     console.log(currentPage)
		console.log(this.allPages)
      if (currentPage < this.allPages) {
        this.$oNext.removeClass('disable');
      } else {
        this.$oNext.addClass('disable');
      }
    },

    setPaging: function (currentPage) {
      this.$aItem = this.$oList.find('li');

      for (var i = 1; i <= this.displayPage; i++) {
        if (currentPage <= this.min_halfPage) {
          this.$aItem.eq(i - 1).text(i).attr('index', '#' + i);

          for (var j = 1; j <= this.min_halfPage; j++) {
            if (currentPage === j && i === j) {
              this.$aItem.eq(i - 1).addClass('cur');
            }
          }
        } else if ((this.allPages - currentPage) < this.min_halfPage) {
          var nowNum = this.allPages - this.displayPage + i;

          this.$aItem.eq(i - 1).text(nowNum).attr('index', '#' + nowNum);

          for (var j = 0; j < this.min_halfPage; j ++) {
            if ((this.allPages - currentPage) === j && i === this.displayPage - j) {
              this.$aItem.eq(i - 1).addClass('cur');
            }
          }
        } else {
          var nowNum = currentPage - this.big_halfPage + i;

          if (i === this.big_halfPage) {
            this.$aItem.eq(i - 1).addClass('cur');
          }

          this.$aItem.eq(i - 1).text(nowNum).attr('index', '#' + nowNum);
        }
      }
    },

    initalPaging: function () {
      for (var i = 1; i <= this.displayPage; i ++) {
        var $create_li = $('<li></li>');

        $create_li.text(i).attr('index', '#' + i);

        this.$oList.append($create_li);
      }

      if (this.allPages <= this.displayPage) {
        this.$aItem.eq(this.nowPage - 1).addClass('cur');
      } else {
        this.$oGo.css({display: 'inline-block'});
        this.$oGo_text.attr('placeholder', 'Total: ' + this.allPages);
      }

      this.setPaging(this.nowPage);
      this.detectionPage(this.nowPage);
    },

    inital: function () {
      var self = this;

      this.initalPaging();
      this.opts.callBack && this.opts.callBack(this.iNum);

      this.$aItem.click(function () {
        if (!$(this).hasClass('cur')) {
          self.iNum = parseInt($(this).attr('index').substring(1));

          self.clickFn();
        }
      });

      this.$oFirst.click(function () {
        if (!$(this).hasClass('disable')) {
          self.iNum = 1;

          self.clickFn();
        }
      });

      this.$oLast.click(function () {
        if (!$(this).hasClass('disable')) {
          self.iNum = self.allPages;

          self.clickFn();
        }
      });

      this.$oPrev.click(function () {
        if (!$(this).hasClass('disable')) {
          self.iNum --;

          self.clickFn();
        }
      });

      this.$oNext.click(function () {
        if (!$(this).hasClass('disable')) {
          self.iNum ++;

          self.clickFn();
        }
      });

      this.$oGo_btn.click(function () {
        var value = self.$oGo_text.val();
        var reg = new RegExp(/^[0-9]*[1-9][0-9]*$/);

        if (value !== '' && reg.test(value) && value <= self.allPages) {
          self.iNum = parseInt(value);

          self.clickFn();

          self.$oGo_text.val('')
        } else {
          self.$oGo_text.val('')
        }
      });
    },

    constructor: Paging
  };

  $.fn.paging = function (options) {
    var paging = new Paging(this, options);

    return paging.inital();
  };
	
})(jQuery, window, document, undefined);