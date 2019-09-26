(function (window, undefined) {
	var Util = function (params) {
		// The jQuery object is actually just the init constructor 'enhanced'
		return new Util.fn.init();
	};
	Util.fn = Util.prototype = {
		init: function (selector, context, rootjQuery) {
			// ...
		},
		getQueryString: function (key) {   // 获取地址栏参数
			var search = window.location.search;
			var regExp = new RegExp('[\\?\\&]([^\\?\\&]+)=([^\\?\\&]+)', 'ig');
			var queryStringList = {};
			var parttern;
			while ((parttern = regExp.exec(search))) {
				if (!queryStringList[parttern[1].toLowerCase()]) {
					queryStringList[parttern[1].toLowerCase()] = parttern[2];
				}
			}
			//返回指定键的值
			if (key) {
				return queryStringList[key.toLowerCase()] || '';
			}
			//返回所有查询参数
			return queryStringList;
		},
		handle: function (opt, key) {  // 将数组内相同的内容 放在一个数组 最终生成一个二维数组
			var arr = [];
			for (var i = 0, len = opt.length; i < len; i++) {
				var flag = isHasArr(opt[i]);      // 判断当前值是否
				if (!flag) {
					var newArr = [];
					for (var j = 0; j < opt.length; j++) {
						if (opt[i] == opt[j]) {
							newArr.push(opt[j])
						}
					}
					arr.push(newArr)
				}
			};
			function isHasArr (item) {
				var flg = false;
				for (var i = 0; i < arr.length; i++) {
					if (item == arr[i][0]) {
						flg = true;
					}
				}
				return flg;
			}
			return arr;
		},
		shareFn: function (options) {
			var prompt = encodeURIComponent(options.text);
			var shareLinks = ['http://sns.qzone.qq.com/cgi-bin/qzshare/cgi_qzshare_onekey?', 'http://v.t.sina.com.cn/share/share.php?', 'https://www.douban.com/share/service?', 'http://tieba.baidu.com/f/commit/share/openShareApi?'],
				backgroundUrl = ['http://style.org.hc360.com/images/my/images/corcenter/mmt4/new/wj_qq.png', 'http://style.org.hc360.com/images/my/images/corcenter/mmt4/new/wj_weibo.png', 'http://style.org.hc360.com/images/my/images/corcenter/mmt4/new/wj_douban.png', 'https://gsp0.baidu.com/5aAHeD3nKhI2p27j8IqW0jdnxx1xbK/tb/favicon.ico'];
			if ((typeof options.id) !== 'number') {
				backgroundUrl.forEach(function (val, ind) {
					var dome = document.createElement('a');
					dome.style['background'] = 'url(' + backgroundUrl[ind] + ') no-repeat center center';
					dome.setAttribute('index', ind);
					options.ele.appendChild(dome);
				});

			} else {
				var dome = document.createElement('a');
				dome.style['background'] = 'url(' + backgroundUrl[options.id] + ') no-repeat center center';
				dome.setAttribute('index', options.id);
				options.ele.appendChild(dome);
			}
			options.ele.addEventListener('click', function (e) {
				var eve = window.event || e,
					targetA = eve.target;
				if (targetA.nodeName === 'A') {
					var index = targetA.getAttribute('index');
					var links = options.links,
						strlinks = shareToXl(index, links);
					var sharesinastring = shareLinks[index] + strlinks;
					window.open(sharesinastring);
				}
			}, false)
			/*
			  拼接分享页面路径
			  ind:{(type:Number) 用来判断当前元素生成的链接}
			*/
			function shareToXl (ind, links) {
				ind = Number(ind);
				links = encodeURIComponent(links);
				switch (ind) {
					case 0: return 'url=' + links + '&summary=' + prompt + ' ' + links + '&pics=' + options.pic + '&title=' + prompt; break;
					case 1: return 'title=' + prompt + '&url=' + links + '&content=utf-8&sourceUrl=' + links + '&pic=' + options.pic; break;;
					case 2: return 'href=' + links + '&name=' + prompt + '&image=' + options.pic + '&text=' + prompt + '  ' + links; break;
					case 3: return 'title=' + prompt + '&url=' + links + '&pic=' + options.pic;
					default: return;
				}
			}
		},    //分享 QQ(0)  微博(1)  豆瓣(2)
		isCHS: function (i) {
			if (this.charCodeAt(i) > 255 || this.charCodeAt(i) < 0)
				return true;
			else
				return false;
		},

		getByClass: function (parents, getByClass) {
			parents = parents || document;
			var arr = [],
				eleAll = parents.getElementsByTagName('*'),
				reg = new RegExp('\\b' + getByClass + '\\b', 'g');
			for (var i = 0, len = eleAll.length; i < len; i++) {
				var flag = eleAll[i].className.search(reg);
				if (flag !== -1) {
					arr.push(eleAll[i]);
				}
			}
			return arr;
		}
	}
	Util.fn.init.prototype = Util.fn;
	window.Util = Util();
})(window);
