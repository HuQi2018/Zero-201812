var container = document.getElementById('container');
var content = document.getElementById('content');
var oDivs = DOM.children(content, "div");
oDivs[0].st = 0;
for (var i = 1; i < oDivs.length; i++) {
    oDivs[i].st = oDivs[i].offsetTop;
}
var oLis = DOM.getElesByClass("tabOption");
var flag = 0;
var upFlag = oLis.length;;
(function() {
    function fn(e) {
        e = e || window.event;
        if (e.wheelDelta) {
            var n = e.wheelDelta;
        } else if (e.detail) {
            var n = e.detail * -1;
        }
        if (n > 0) {
            container.scrollTop -= 12;
        } else if (n < 0) {
            container.scrollTop += 12;
        }
        slider.style.top = container.scrollTop * container.offsetHeight / content.offsetHeight + "px";
        slider.offsetTop * (content.offsetHeight / container.offsetHeight);
        var st = container.scrollTop;
        if (st > this.preSt) {
            for (var j = 0; j < oLis.length; j++) {
                if (st < oDivs[j].st) break;
            }
            if (oLis[j - 2] && this.preLi !== j) {
                if ((j) > (flag + 1)) {
                    DOM.removeClass(oLis[j - 2], "selectedTab");
                    DOM.addClass(oLis[j - 1], "selectedTab");
                    animate(blueline, {
                        top: (j - 1) * 48
                    }, 500, 2);
                }
            }
            flag = j - 1;
        } else if (st < this.preSt) {
            for (var j = oLis.length - 1; j >= 0; j--) {
                if (st > oDivs[j].st) break;
            }
            if (oLis[j + 2] && this.preLi !== j) {
                if (flag === undefined) return;
                if ((j) < (flag)) {
                    for (var k = 0; k < oLis.length; k++) {
                        DOM.removeClass(oLis[k], "selectedTab");
                    };
                    DOM.addClass(oLis[j + 1], "selectedTab");
                    animate(blueline, {
                        top: (j + 1) * 48
                    }, 500, 2);
                    upFlag = j + 1;
                }
            }
        }
        this.preSt = st;
        if (e.preventDefault) e.preventDefault();
        return false;
    }
    container.onmousewheel = fn;
    if (container.addEventListener) container.addEventListener("DOMMouseScroll", fn, false);
    slider = document.createElement('span');
    slider.id = "slider";
    slider.style.height = container.offsetHeight * (container.offsetHeight / content.offsetHeight) + "px";
    sliderParent.appendChild(slider);
    on(slider, "mousedown", down);
    var blueline = document.getElementById("blueline");

    function changeTab() {
        var index = DOM.getIndex(this);
        for (var i = 0; i < oLis.length; i++) {
            DOM.removeClass(oLis[i], "selectedTab");
        }
        DOM.addClass(this, "selectedTab");
        animate(container, {
            scrollTop: oDivs[index].st
        }, 500, 1);
        var t = oDivs[index].st * container.offsetHeight / content.offsetHeight;
        animate(slider, {
            top: t
        }, 500);
        animate(blueline, {
            top: index * 48
        }, 500, 2);
    }
    var tabPannel1 = document.getElementById("outerWrap");
    var oLis = DOM.children(DOM.children(tabPannel1, "ul")[0], "li");
    for (var i = 0; i < oLis.length; i++) {
        oLis[i].onclick = changeTab;
    };
})();

window.onload = function() {

    /****各学院在校本科生人数****/

    var chart1 = new CanvasJS.Chart("chart1", {
        animationEnabled: true,
        exportEnabled: true,
        exportFileName: "各学院在校本科生人数",
        backgroundColor: "transparent",
        theme: "light1", // "light1", "light2", "dark1", "dark2"
        title: {
            text: "各学院在校本科生人数",
            titleFontSize: 24
        },
        axisY: {
            minimum: 0,
            maximum: 4200,
            title: "人数",
            titleFontSize: 15,
        },
        axisX: {
            interval: 1,
        },
        data: [{
                type: "bar", //change type to bar, doughnut, pyramid, column, funnel, line, area, pie, etc
                // 		indexLabel: "{y}", //Shows y value on all Data Points
                // 		indexLabelFontColor: "#5A5757",
                // 		indexLabelPlacement: "outside",//inside outside
                dataPoints: [{
                        y: 3826,
                        label: "商学院"
                    }, {
                        y: 163,
                        label: "国际教育学院"
                    }, {
                        y: 1762,
                        label: "土木工程学院"
                    }, {
                        y: 1197,
                        label: "外国语学院"
                    }, {
                        y: 740,
                        label: "建筑学院"
                    }, {
                        y: 1753,
                        label: "文化产业与旅游管理学院"
                    }, {
                        y: 1604,
                        label: "文学与新闻传播学院"
                    }, {
                        y: 2964,
                        label: "机械与电气工程学院"
                    }, {
                        y: 486,
                        label: "法律与知识产权学院"
                    }, {
                        y: 119,
                        label: "演艺学院"
                    }, {
                        y: 1124,
                        label: "电子信息工程学院"
                    }, {
                        y: 1454,
                        label: "艺术学院"
                    }, {
                        y: 2210,
                        label: "计算机科学与工程学院(软件学院)"
                    }, {
                        y: 2477,
                        label: "高等职业技术学院"
                    }
                ]
            }
        ]
    });
    chart1.render();

    /****在校男女生比例****/

    var totalVisitors = 21879;
    var visitorsData = {
        "在校男女生比例": [{
                click: visitorsChartDrilldownHandler,
                cursor: "pointer",
                explodeOnClick: false,
                innerRadius: "75%",
                legendMarkerType: "square",
                name: "在校男女生比例",
                radius: "100%",
                showInLegend: true,
                startAngle: 90,
                type: "doughnut",
                dataPoints: [{
                        y: 10748,
                        name: "男生",
                        color: "#E7823A"
                    }, {
                        y: 11131,
                        name: "女生",
                        color: "#546BC1"
                    }
                ]
            }
        ],
        "男生": [{
                color: "#E7823A",
                name: "男生",
                indexLabelPlacement: "outside",
                indexLabelFontColor: "#5A5757",
                indexLabel: "{y}", //Shows y value on all Data Points
                type: "column",
                dataPoints: [{
                        y: 1133,
                        label: "商学院"
                    }, {
                        y: 147,
                        label: "国际教育学院"
                    }, {
                        y: 1217,
                        label: "土木工程学院"
                    }, {
                        y: 213,
                        label: "外国语学院"
                    }, {
                        y: 353,
                        label: "建筑学院"
                    }, {
                        y: 380,
                        label: "文化产业与旅游管理学院"
                    }, {
                        y: 325,
                        label: "文学与新闻传播学院"
                    }, {
                        y: 2478,
                        label: "机械与电气工程学院"
                    }, {
                        y: 163,
                        label: "法律与知识产权学院"
                    }, {
                        y: 46,
                        label: "演艺学院"
                    }, {
                        y: 717,
                        label: "电子信息工程学院"
                    }, {
                        y: 623,
                        label: "艺术学院"
                    }, {
                        y: 2210,
                        label: "计算机科学与工程学院(软件学院)"
                    }, {
                        y: 1650,
                        label: "高等职业技术学院"
                    }
                ]
            }
        ],
        "女生": [{
                color: "#546BC1",
                name: "女生",
                indexLabelPlacement: "outside",
                indexLabelFontColor: "#5A5757",
                indexLabel: "{y}", //Shows y value on all Data Points
                type: "column",
                dataPoints: [{
                        y: 2693,
                        label: "商学院"
                    }, {
                        y: 16,
                        label: "国际教育学院"
                    }, {
                        y: 545,
                        label: "土木工程学院"
                    }, {
                        y: 984,
                        label: "外国语学院"
                    }, {
                        y: 387,
                        label: "建筑学院"
                    }, {
                        y: 1373,
                        label: "文化产业与旅游管理学院"
                    }, {
                        y: 1279,
                        label: "文学与新闻传播学院"
                    }, {
                        y: 486,
                        label: "机械与电气工程学院"
                    }, {
                        y: 323,
                        label: "法律与知识产权学院"
                    }, {
                        y: 73,
                        label: "演艺学院"
                    }, {
                        y: 407,
                        label: "电子信息工程学院"
                    }, {
                        y: 831,
                        label: "艺术学院"
                    }, {
                        y: 560,
                        label: "计算机科学与工程学院(软件学院)"
                    }, {
                        y: 1174,
                        label: "高等职业技术学院"
                    }
                ]
            }
        ]
    };

    var newVSReturningVisitorsOptions = {
        animationEnabled: true,
        theme: "light1",
        exportEnabled: true,
        exportFileName: "各学院在校本科生人数",
        backgroundColor: "transparent",
        title: {
            text: "在校男女生比例"
        },
        axisX: {
            interval: 1,
        },
        axisY: {
            title: "人数",
            titleFontSize: 15,
        },
        legend: {
            fontFamily: "calibri",
            fontSize: 14,
            itemTextFormatter: function(e) {
                return e.dataPoint.name + ": " + Math.round(e.dataPoint.y / totalVisitors * 100) + "%";
            }
        },
        data: []
    };

    var visitorsDrilldownedChartOptions = {
        animationEnabled: true,
        theme: "light1",
        backgroundColor: "transparent",
        exportEnabled: true,
        exportFileName: "各学院在校本科生人数",
        axisX: {
            labelFontColor: "#717171",
            lineColor: "#a2a2a2",
            tickColor: "#a2a2a2"
        },
        axisX: {
            interval: 1,
        },
        axisY: {
            gridThickness: 0,
            includeZero: false,
            labelFontColor: "#717171",
            lineColor: "#a2a2a2",
            tickColor: "#a2a2a2",
            title: "人数",
            titleFontSize: 15,
            lineThickness: 1
        },
        data: []
    };

    var chart2 = new CanvasJS.Chart("chart2", newVSReturningVisitorsOptions);
    chart2.options.data = visitorsData["在校男女生比例"];
    chart2.render();

    function visitorsChartDrilldownHandler(e) {
        chart2 = new CanvasJS.Chart("chart2", visitorsDrilldownedChartOptions);
        chart2.options.data = visitorsData[e.dataPoint.name];
        chart2.options.title = {
            text: e.dataPoint.name
        }
        chart2.render();
        $("#backButton").toggleClass("invisible");
    }

    $("#backButton").click(function() {
        $(this).toggleClass("invisible");
        chart2 = new CanvasJS.Chart("chart2", newVSReturningVisitorsOptions);
        chart2.options.data = visitorsData["在校男女生比例"];
        chart2.render();
    });
}


var myChart = echarts.init(document.getElementById('china-map'));

var provinces = ['shanghai', 'hebei', 'shanxi', 'neimenggu', 'liaoning', 'jilin', 'heilongjiang', 'jiangsu', 'zhejiang', 'anhui', 'fujian', 'jiangxi', 'shandong', 'henan', 'hubei', 'hunan', 'guangdong', 'guangxi', 'hainan', 'sichuan', 'guizhou', 'yunnan', 'xizang', 'shanxi1', 'gansu', 'qinghai', 'ningxia', 'xinjiang', 'beijing', 'tianjin', 'chongqing', 'xianggang', 'aomen'];

var provincesText = ['上海', '河北', '山西', '内蒙古', '辽宁', '吉林', '黑龙江', '江苏', '浙江', '安徽', '福建', '江西', '山东', '河南', '湖北', '湖南', '广东', '广西', '海南', '四川', '贵州', '云南', '西藏', '陕西', '甘肃', '青海', '宁夏', '新疆', '北京', '天津', '重庆', '香港', '澳门'];

var seriesData = [{
        name: '北京',
        value: 100
    }, {
        name: '天津',
        value: 0
    }, {
        name: '上海',
        value: 2
    }, {
        name: '重庆',
        value: 133
    }, {
        name: '河北',
        value: 15
    }, {
        name: '河南',
        value: 797
    }, {
        name: '云南',
        value: 359
    }, {
        name: '辽宁',
        value: 6
    }, {
        name: '黑龙江',
        value: 20
    }, {
        name: '湖南',
        value: 57
    }, {
        name: '安徽',
        value: 999
    }, {
        name: '山东',
        value: 141
    }, {
        name: '新疆',
        value: 50
    }, {
        name: '江苏',
        value: 15334
    }, {
        name: '浙江',
        value: 395
    }, {
        name: '江西',
        value: 276
    }, {
        name: '湖北',
        value: 42
    }, {
        name: '广西',
        value: 260
    }, {
        name: '甘肃',
        value: 210
    }, {
        name: '山西',
        value: 455
    }, {
        name: '内蒙古',
        value: 12
    }, {
        name: '陕西',
        value: 9
    }, {
        name: '吉林',
        value: 7
    }, {
        name: '福建',
        value: 305
    }, {
        name: '贵州',
        value: 489
    }, {
        name: '广东',
        value: 533
    }, {
        name: '青海',
        value: 4
    }, {
        name: '西藏',
        value: 35
    }, {
        name: '四川',
        value: 802
    }, {
        name: '宁夏',
        value: 0
    }, {
        name: '海南',
        value: 3
    }, {
        name: '台湾',
        value: 0
    }, {
        name: '香港',
        value: 0
    }, {
        name: '澳门',
        value: 0
    }
];

initEcharts("china", "总计：21751");

// 初始化echarts

function initEcharts(pName, Chinese_) {
    var tmpSeriesData = pName === "china" ? seriesData : [];

    var option = {
        title: {
            text: Chinese_ || pName,
            left: 'center'
        },
        tooltip: {
            trigger: 'item',
            formatter: '省份：{b}<br/>人数：{c}'
        },
        series: [{
                name: Chinese_ || pName,
                type: 'map',
                mapType: pName,
                roam: false, //是否开启鼠标缩放和平移漫游
                data: tmpSeriesData,
                top: "3%", //组件距离容器的距离
                zoom: 1.1,
                selectedMode: 'single',

                label: {
                    normal: {
                        show: true, //显示省份标签
                        textStyle: {
                            color: "#fbfdfe"
                        } //省份标签字体颜色
                    },
                    emphasis: { //对应的鼠标悬浮效果
                        show: true,
                        textStyle: {
                            color: "#323232"
                        }
                    }
                },
                itemStyle: {
                    normal: {
                        borderWidth: .5, //区域边框宽度
                        borderColor: '#0550c3', //区域边框颜色
                        areaColor: "#4ea397", //区域颜色

                    },

                    emphasis: {
                        borderWidth: .5,
                        borderColor: '#4b0082',
                        areaColor: "#ece39e",
                    }
                },
            }
        ]

    };

    myChart.setOption(option);

    myChart.off("click");

}