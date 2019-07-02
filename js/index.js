// 设置样式
let setStyle = {
    // 保存背景颜色
    color: '',
    target: 'two',
    setBackcolor(str) {
        let fontcolor = 'rgb(0,0,0)';
        switch (str) {
            case 'one':
                this.color = "#f7eee5";
                break;
            case 'two':
                this.color = "#e9dfc7";
                break;
            case 'three':
                this.color = "#a4a4a4";
                break;
            case 'four':
                this.color = "#cdefce";
                break;
            case 'five':
                this.color = "#283548";
                this.fontcolor = "rgb(118, 133, 162)"
                break;
            default:
                if (this.color == '') {
                    console.log('未定义');
                } else {
                    this.color = this.color;
                };
                break;
        };
        // 设置dom样式
        $('body').css({
            "background-color": this.color,
        })
        $('#fiction_chapter p').css({
            "color": fontcolor
        })
    },
    setborder(e) {
        let count = $('.back-color');
        console.log(e.target.id);
        for (let i = 0; i < count.length; i++) {
            // 充值所有边框样式为透明
            $('#' + count[i].id).css({
                "border": ' 1px transparent solid ;'
            });
            // 保持上一次点击的按钮边框样式
            if (e.target.id == '' || e.target.id == 'changebtn') {
                console.log('start');
                $('#' + this.target).css({
                    "border": ' 1px #ff7800 solid ;'
                });
            };
        };
        for (let i = 0; i < count.length; i++) {
            // 设置点击的按钮边框
            if (count[i].id == e.target.id) {
                $('#' + e.target.id).css({
                    "border": ' 1px #ff7800 solid ;'
                });
                this.target = count[i].id;
                break;
            };
        };

    },
    initborder() {
        $('#two').css({
            "border": ' 1px #ff7800 solid ;'
        });
    },
    changeFontSize(str) {
        let fontsize = parseInt($('#fiction_chapter p').css('font-size'));
        let lettersize = parseInt($('#fiction_chapter p').css('letter-spacing'));
        let linesize = parseInt($('#fiction_chapter p').css('line-height'));
        if (str == 'big') {
            fontsize += 3;
            lettersize += 3;
            linesize += 3;
        } else if (str == 'small') {
            fontsize -= 3;
            lettersize -= 3;
            linesize -= 3;
        }
        if (fontsize <= 0 || lettersize <= 0 || linesize <= 0) {
            fontsize = 18;
            lettersize = 0;
            linesize = 24;
        }

        console.log(parseInt($('#fiction_chapter p').css('font-size')));
        $('#fiction_chapter p').css({
            "font-size": fontsize + 'px',
            "letter-spacing": lettersize + 'px',
            "line-height": linesize + 'px'
        });
    },
    shownav() {
        $('#top-nav,#btm-nav').toggle();
        $('.nav-panel').css({
            'display': 'none'
        });
    },
    showpanel() {
        $('.nav-panel').toggle();
    }
};
// 全局dom
let dom = {
    btns: document.querySelector('#changebtn'),
    fontbtn: document.querySelector('#nav-panel'),
    con: $('#fiction_chapter p'),
    font: $('#font')
};
// 请求
let req = {
    get() {
        $.get('data/data1.json', function(data, status) {
            if (status === 'success') {
                render.renderData(data.content);
            } else {
                console.log('获取错误');
            }
        }, 'json');
    },
};
let render = {
    renderData(data) {
        console.log(data);
        $('#con').text(data);
    }
};
// 初始化入口
let init = function() {
    // 初始化默认选中的背景颜色
    setStyle.initborder();
    req.get();
};
// 初始化
init();
// 改变字体大小
dom.fontbtn.addEventListener('click', (e) => {
    setStyle.changeFontSize(e.target.id);
});
// 切换背景颜色和设置对应颜色按钮边框
dom.btns.addEventListener('click', (e) => {
    setStyle.setBackcolor(e.target.id);
    setStyle.setborder(e);
});
// 展示边栏
dom.con.click(() => {
    setStyle.shownav();
});
// 展示下边栏功能菜单
dom.font.click(() => {
    setStyle.showpanel();
});