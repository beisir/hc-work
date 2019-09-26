var p4pBusinessLogic = require('./p4p.base');
    var recom = $('body').attr('recom'),
        wrap,
        reffer,
        arr = [],
        array = [];

    switch (recom) {
        case '询价': wrap = $('#inquiryMessageDialog').find('.p4pBotRecom ul');
                    reffer = 113;break;
        case '联系': wrap = $('[node-name="pageOneBox"]').find('.p4pBotRecom ul');
                    reffer = 115;break;
        case '低价': wrap = $('#inquiryMessageDialog').find('.p4pBotRecom ul');;
                    reffer = 114;break;
        case '查看': wrap = $('.word-box-sy').find('.p4pBotRecom ul');;
                    reffer = 116;
                    $('.word-box-sy').find('.p4pBotRecom').show(200);break;
        case '价单': wrap = $('.pepRecomBox').find('.p4pRigRecom ul');;
                    reffer = 117;break;

    };

    var wrapRecom = $('.p4pBotRecom ul'),
        /**
         * [_tempHTMLArray 临时HTML数组]
         * @type {Array}
         */
        _tempHTMLArray = [
            '{{each products as product i}}',
                '<li data_index="{{i}}">',
                    '<div class="p4pRecomImg">',
                        '<a href="{{product.searchResultfoUrl}}" target="_blank"><img src="{{product.searchResultfoImageBig}}" alt="{{product.pretreatTitle}}"></a>',
                    '</div>',
                    '<p class="p4pRecomName">',
                        '<a href="{{product.searchResultfoUrl}}">{{product.searchResultfoCompany}}</a>',
                    '</p>',
                    '{{ if (product.searchResultfoUnitPrice === "0") }}',
                        '<p class="p4pRecomPrice">面议</p>',
                    '{{ else }}',
                        '<p class="p4pRecomPrice"><em>¥</em>{{product.searchResultfoUnitPrice}}</p>',
                    '{{ /if }}',
                '</li>',
            '{{/each}}'
        ];
    var p4pBusinessLogicEntity = new p4pBusinessLogic({

        /**
         * [keyword 关键字]
         * @type {Object}
         */
        keyword: (HC.getCookie && HC.getCookie("hclastsearchkeyword") || $("#comTitle").text() || "") || (window.searchVal || $('title:eq(0)').text() || ""),
        // keyword: '钢笔',
        /**
         * [referrer 来源]
         * @type {Number}
         */
        referrer:  reffer,

        /**
         * [clickableElementSelector 点击计费元素选择器]
         * @type {String}
         */
        clickableElementSelector: wrapRecom.find('a'),

        /**
         * [cache 数据缓存]
         * @type {Object}
         */
        cache: null,

        /**
         * [wrap 广告位包裹元素]
         * @type {Object}
         */
        wrap: wrap,

        /**
         * [autoSendExpoData 是否自动发送曝光数据]
         * @type {Boolean}
         */
        autoSendExpoData: true,

        /**
         * [targetRenderCallback 广告位元素渲染到页面的回调函数]
         * @param  {Object} targetHTML [广告位元素]
         */
        targetRenderCallback: function(targetHTML) {
            var _this = this;
            return $(targetHTML).prependTo(_this.wrap);
        }
    });
    p4pBusinessLogicEntity.addEventListener('onDataReady',function(data){
        array = [];
        this.wrap.html('').show(200);
        var _this = this,
        len = data.searchResultInfo.length,
        /**
         * [_data P4P数据对象]
         * @type {Object}
         */
        _data = data || {},

        /**
         * [_prolist P4P商品数据列表]
         * @type {Array}
         */
        _prolist = _data.searchResultInfo || [],

        /**
         * [_limit P4P广告位数量上限]
         * @type {Number}
         */
        _limit = 4;

        /**
         * [根据P4P广告位数量上限截取P4P数据]
         */
        // _prolist.splice(_limit,_prolist.length);
        randomNumber(len,_prolist,_limit);//随机数据
        _data.searchResultInfo = array;
        /**
         * [template 设置模板HTML]
         * @type {String}
         */
        _this.template = _tempHTMLArray.join('');

        /***
         * 如果当前数据小于4条则用搜索补足
         */
        if (data.searchResultInfo.length < 4) {
            searchComplement(4 - data.searchResultInfo.length);
        };
    });
    function searchComplement (leng){
        // var keyword = require('./randomKeyWords');
        var p4pRecom = new p4pBusinessLogic({

            /**
             * [keyword 关键字]
             * @type {Object}
             */
            // keyword: keyword(),
            keyword: 'xx',
            /**
             * [referrer 来源]
             * @type {Number}
             */
            referrer:  reffer,
            service: {
                  /**
                   * [data 数据服务默认配置]
                   * @type {Object}
                   */
                data: {
                    url: 'https://p4p.hc360.com/p4p/p4p/fullNetworkDelivery/getP4pOneKeyData.html',
                    dataType: 'jsonp',
                    jsonp: 'callback'
                }
            },
            /**
             * [clickableElementSelector 点击计费元素选择器]
             * @type {String}
             */
            clickableElementSelector: wrapRecom.find('a'),

            /**
             * [cache 数据缓存]
             * @type {Object}
             */
            cache: null,

            /**
             * [wrap 广告位包裹元素]
             * @type {Object}
             */
            wrap: wrap,

            /**
             * [autoSendExpoData 是否自动发送曝光数据]
             * @type {Boolean}
             */
            autoSendExpoData: true,

            getClickElementCacheIndexCallback: function(element) {
              return element.closest('li').attr('data_index');
            },
            /**
             * [targetRenderCallback 广告位元素渲染到页面的回调函数]
             * @param  {Object} targetHTML [广告位元素]
             */
            targetRenderCallback: function(targetHTML) {
                var _this = this;
                return $(targetHTML).appendTo(_this.wrap);
            }
        });
        p4pRecom.addEventListener('onDataReady',function(data){
            array = [];
            var _this = this,
            len = data.searchResultInfo.length,
            /**
             * [_data P4P数据对象]
             * @type {Object}
             */
            _data = data || {},

            /**
             * [_prolist P4P商品数据列表]
             * @type {Array}
             */
            _prolist = _data.searchResultInfo || [],

            /**
             * [_tempHTMLArray 临时HTML数组]
             * @type {Array}
             */


            /**
             * [_limit P4P广告位数量上限]
             * @type {Number}
             */
            _limit = leng;

            /**
             * [根据P4P广告位数量上限截取P4P数据]
             */
             randomNumber(len,_prolist,_limit)
            // _prolist.splice(_limit,_prolist.length);
            _data.searchResultInfo = array;
            /**
             * [template 设置模板HTML]
             * @type {String}
             */
            _this.template = _tempHTMLArray.join('');
        });
        p4pRecom.init();
    }


    p4pBusinessLogicEntity.init();




     function randomNumber(len,_prolist,_limit,_limit2) {
        arr = [];
        var len = len,_limit = _limit;
        function getRandom(min,max){
               var random = Math.random()*(max-min)+min;//随机数
               random = Math.floor(random); //向下取整
               if(len <= _limit){
                    _limit = len;
               }
                if(arr.length < _limit){     //长度
                    for(i=0;i<=arr.length;i++){
                        if(random==arr[i]){
                            break;
                        }else{
                           if(i==arr.length){
                            arr.push(random);
                            break;
                           }
                       }
                   };
                   getRandom(0,len);
                }

           }
        if(len != 0){
           getRandom(0,len);
           for(var i = 0;i<arr.length;i++){
                array.push(_prolist[arr[i]]);
           }
        }
     }
