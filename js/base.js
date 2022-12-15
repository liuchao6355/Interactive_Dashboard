var myMenu = echarts.init(document.getElementById('menu'));
document.getElementById("industry").innerHTML = '农业';
//选择哪个表
var chart='农业.csv';
//选择哪个地区
var area='a';
var chart1_title = 'test1的a';

window.addEventListener("load", drawMap_bar);
var Province_Displaying = "山东省";    // global variable: province selected, revise when clicking on map
current_Industry = chart.split('.')[0];        // global variable: industry selected, revise from the outside

var mapStrokeColor = "black";           // 地图边线颜色
var mapFillColor = "#669966";         // 地图填充颜色
var mapMouseoverStrokeColor = "white";  // 地图鼠标悬浮时边线颜色
var barFillColor = "steelblue";        // 柱状图填充颜色
var barStrokeColor = "steelblue";          // 柱状图边线颜色
var backGroundColor = "white"           // 背景颜色



// 基于准备好的dom，初始化echarts实例
var myChart1 = echarts.init(document.getElementById('echart01'));
var myChart2 = echarts.init(document.getElementById('echart02'));
var myChart3 = echarts.init(document.getElementById('echart03'));

document.getElementById("chart222").innerHTML = '各产业占比';

var dataName='data/'+chart;

// 导航栏
const MenuOption = {
    backgroundColor: 'rgba(0,0,0,0)',  		// 图表背景色
    title: {
        left: 0,
        top: 'middle',
        textStyle: {
            color: "#e6e6e6",
            fontSize: 25
        },
        text: '产业',

    },
    toolbox: {
        itemSize: 30,
        itemGap: 40,
        left: '30%',
        top: 'middle',
        feature: {
            myFatbutton: {
                show: true,
                title: '农业',
                icon: 'image://svg/农业.svg',
                onclick: function () {
                    chart = "农业.csv";
                    document.getElementById("chart111").innerHTML = '平行坐标系-农业';
                    document.getElementById("industry").innerHTML = '农业';
                    document.getElementById("chart333").innerHTML = '农业产业指数';
                    document.getElementById("chart444").innerHTML = Province_Displaying + current_Industry + "产值明细"
                    dataName='data/'+chart;
                    chart1(dataName);
                    chart2(dataName);
                    window.addEventListener("load", drawMap_bar);
                    current_Industry = chart.split('.')[0]; 
                    // map();
                    chart31();
                }
            },
            myFoodbutton: {
                show: true,
                title: '工业',
                icon: 'image://svg/工业.svg',
                onclick: function () {
                    chart = "工业.csv";
                    document.getElementById("chart111").innerHTML = '平行坐标系-工业';
                    document.getElementById("industry").innerHTML = '工业';
                    document.getElementById("chart333").innerHTML = '工业产业指数';
                    document.getElementById("chart444").innerHTML = Province_Displaying + current_Industry + "产值明细"
                    dataName='data/'+chart;
                    chart1(dataName);
                    chart2(dataName);
                    window.addEventListener("load", drawMap_bar);
                    current_Industry = chart.split('.')[0]; 
                    // map();
                    chart32();
                }
            },
            myKalulibutton: {
                show: true,
                title: '建筑业',
                icon: 'image://svg/建筑业.svg',
                onclick: function () {
                    chart = "建筑业.csv";
                    document.getElementById("chart111").innerHTML = '平行坐标系-建筑业';
                    document.getElementById("industry").innerHTML = '建筑业';
                    document.getElementById("chart333").innerHTML = '建筑业产业指数';
                    document.getElementById("chart444").innerHTML = Province_Displaying + current_Industry + "产值明细" 
                    dataName='data/'+chart;
                    chart1(dataName);
                    chart2(dataName);
                    window.addEventListener("load", drawMap_bar);
                    current_Industry = chart.split('.')[0]; 
                    // map();
                    chart33();
                }
            },
            myProteinbutton: {
                show: true,
                title: '第三产业',
                icon: 'image://svg/第三产业.svg',
                onclick: function () {
                    chart = "第三产业.csv";
                    document.getElementById("chart111").innerHTML = '平行坐标系-第三产业';
                    document.getElementById("industry").innerHTML = '第三产业';
                    document.getElementById("chart333").innerHTML = '第三产业产业指数';
                    document.getElementById("chart444").innerHTML = Province_Displaying + current_Industry + "产值明细"
                    dataName='data/'+chart;
                    chart1(dataName);
                    chart2();
                    window.addEventListener("load", drawMap_bar);
                    current_Industry = chart.split('.')[0]; 
                    // map();
                    chart34();
                }
            }
        }
    }
};

myMenu.setOption(MenuOption);
document.getElementById("chart111").innerHTML = '平行坐标系-农业';

// 绘制平行坐标系
function chart1(dataName)
{
    
    console.log(dataName)
    newData = [];
    valuerData=[];
    namerData=[]
    tmp=[];
    d3.csv(dataName, function (error, dataSet)
    {

        var px_option1 = {
            parallelAxis: [{
                dim: 0,
                name: '焦炭产量(万吨)'
            },
            {
                dim: 1,
                name: '酸碱产量(万吨)'
            },
            {
                dim: 2,
                name: '水泥产量(万吨)',
                

            },
            {
                dim: 3,
                name: '钢材产量(万吨)',

            },
            {
                dim: 4,
                name: '发电量(亿千瓦小时)',
                
            },
            {
                dim: 5,
                name: '化学纤维产量(万吨)',
                
            },
            {
                dim: 6,
                name: '城市',
                type: 'category',
                data: ['华北','东北','华东', '中南', '西南', '西北']
            }

        
        ], 
        parallel: {                         // 这是『坐标系』的定义
            left: '10%',                     // 平行坐标系的位置设置
            right: '13%',
            bottom: '10%',
            top: '20%',
            parallelAxisDefault: {          // 『坐标轴』的公有属性可以配置在这里避免重复书写
                type: 'value',
                nameLocation: 'end',
                nameGap: 20,
                axisLine :{                   
                    lineStyle:{
                        color:'#fff'
                    }
                }
            }
        },tooltip: {
            padding: 10,
            backgroundColor: '#222',
            borderColor: '#777',
            borderWidth: 1
          },  visualMap: {
            show: true,
            min: 0,
            max: 150,
            dimension: 2,
            inRange: {
              color: ['#d94e5d', '#eac736', '#50a3ba'].reverse()
              // colorAlpha: [0, 1]
            }
          },
            series: {
                type: 'parallel',
                lineStyle: {
                    width: 1,
                    opacity: 0.5
                },
                data: [
                [0,0,258.07,203.36,472.57,0.34,'华北'],
                [153.64,90.35,632.03,5991.73,799.73,8.56,'华北'],
                [4056.99,323.14,11354.63,29559.38,3513.42,90.04,'华北'],
                [9857.24,99.48,5688.62,6173.88,3926.16,1.04,'华北'],
                [4657.93,893.56,3667.92,2957.55,6119.93,0.67,'华北'],
                [2293.81,235.87,4938.91,7759.09,2257.58,23.39,'东北'],
                [399.12,78.47,2125.29,1790.6,1025.75,44.77,'东北'],
                [1234.92,82.01,2181.59,951.38,1200.53,2.25,'东北'],
                [540.86,82.26,443.99,1941.43,1003.06,32.47,'华东'],
                [1438.35,620.94,15402.11,15701.9,5968.89,1625.34,'华东'],
                [216.47,543.73,13637.96,3451.83,4222.5,3209.61,'华东'],
                [1252.62,773,15001,3820.33,3083.39,59.97,'华东'],
                [224.62,370.1,10131.01,3980.53,2950.8,1029.66,'华东'],
                [694.45,493.13,10403.74,3480.92,1563.27,107.66,'华东'],
                [3186.78,1635.13,16580.41,10667.62,6210.32,77.12,'华东'],
                [1514.93,695.87,11402.2,4335.97,3039.08,79.19,'中南'],
                [882.43,1228.18,11861.88,3852.07,3292.37,39,'中南'],
                [660.93,251.35,10466.58,2979.7,1741.86,4.65,'中南'],
                [619.81,286.13,17084.27,5111.18,6306.23,84.71,'中南'],
                [1071.81,519.4,11432.02,5282.09,2081.93,0.53,'中南'],
                [212.55,28.8,1937.52,36.29,391.23,4.8,'中南'],
                [286.36,102.94,6238.18,1310.46,991.43,20.83,'西南'],
                [1058.58,636.39,14171.41,3496.25,4530.33,77.37,'西南'],
                [417.91,508.88,9332.85,811.16,2368.4,1.3,'西南'],
                [1282.44,1618.26,11511.51,2646.44,3770.23,4.21,'西南'],
                [0,0,991.59,3.5,112.77,0,'西南'],
                [4320.78,236.6,6698.52,2097.41,2739.75,3.83,'西北'],
                [499.85,306.88,4478.2,1080.59,1896.82,0.14,'西北'],
                [157.71,46.8,1107.09,181.99,995.71,0.31,'西北'],
                [964.73,144.56,1870.05,582.29,2082.89,2.47,'西北'],
                [2499.71,383.39,4693.35,1467.68,4683.55,77.54,'西北']
                ]
            }
        };

        var px_option2 = {
            parallelAxis: [{
                dim: 0,
                name: '茶叶产量（万吨）'
            },
            {
                dim: 1,
                name: '水果产量(万吨)'
            },
            {
                dim: 2,
                name: '肉类产量(万吨)',
                

            },
            {
                dim: 3,
                name: '蛋奶产量(万吨),',

            },
            {
                dim: 4,
                name: '水产品总产量(万吨)',
                
            },
            {
                dim: 5,
                name: '粮食产量(万吨)',
                
            },
            {
                dim: 6,
                name: '城市',
                type: 'category',
                data: ['华北','东北','华东', '中南', '西南', '西北']
            }
            
        
        ],tooltip: {
            padding: 10,
            backgroundColor: '#222',
            borderColor: '#777',
            borderWidth: 1
          },  visualMap: {
            show: true,
            min: 0,
            max: 150,
            dimension: 2,
            inRange: {
              color: ['#d94e5d', '#eac736', '#50a3ba'].reverse()
              // colorAlpha: [0, 1]
            }
          },
        parallel: {                         // 这是『坐标系』的定义
            left: '10%',                     // 平行坐标系的位置设置
            right: '13%',
            bottom: '10%',
            top: '20%',
            parallelAxisDefault: {          // 『坐标轴』的公有属性可以配置在这里避免重复书写
                type: 'value',
                nameLocation: 'end',
                nameGap: 20,
                axisLine :{                   
                    lineStyle:{
                        color:'#fff'
                    }
                }
            }
        },
            series: {
                type: 'parallel',
                lineStyle: {
                    width: 1,
                    opacity: 0.5,
                },
                data: [
                [0,48.84,4.42,35.2,16.62,37.75,'华北'],
                [0,49.43,30.5,70.96,27.33,249.87,'华北'],
                [0,1445.08,464.34,885.22,108.1,3825.09,'华北'],
                [0.13,974.87,135.38,247.49,5.09,1421.25,'华北'],
                [0,190.82,277.32,734.8,10.68,3840.3,'华北'],
                [0,856.42,435.41,464.15,482.41,2538.74,'东北'],
                [0,164.09,274.65,137.41,24.95,4039.24,'东北'],
                [0,184.29,300.42,610.03,71.85,7867.72,'东北'],
                [0,32.62,9.14,31.95,22.79,93.96,'华东'],
                [1.09,969.13,306.51,295.14,493.81,3746.1,'华东'],
                [18.1,722.55,103.56,49.49,599.05,620.9,'华东'],
                [13.73,778.1,456.31,224.65,236.5,4087.56,'华东'],
                [48.79,810.29,286.54,75.34,853.07,506.42,'华东'],
                [7.38,744.64,344.96,70.94,269.51,2192.33,'华东'],
                [2.85,3032.59,819.26,743.69,854.42,5500.75,'华东'],
                [7.5,2455.34,646.81,658.57,94.32,6544.17,'中南'],
                [40.44,1119.38,425.51,206.33,483.21,2764.33,'中南'],
                [25.85,1193.64,562.05,123.6,266.11,3074.36,'中南'],
                [13.95,1957.79,457.42,60.89,884.52,1279.87,'中南'],
                [9.6,3121.13,440.97,40.17,354.81,1386.54,'中南'],
                [0.13,525.67,66.87,5.12,164.09,146.03,'中南'],
                [5.08,553.18,196.59,50.94,54.53,1092.84,'西南'],
                [37.48,1290.9,664.04,237.56,166.49,3582.14,'西南'],
                [24.59,653.66,228.23,32.62,26.21,1094.86,'西南'],
                [50.21,1142.6,488.06,110.11,65.77,1930.3,'西南'],
                [0.01,3.01,27.36,49.56,0.08,106.15,'西南'],
                [9.32,2141.13,127.97,168,17.07,1270.43,'西北'],
                [0.16,883.77,135.29,88.94,1.42,1231.46,'西北'],
                [0,2.96,40.03,36.76,1.83,109.09,'西北'],
                [0,262.77,35.33,293.38,16.6,368.44,'西北'],
                [0,1659.51,198.73,252.51,17.05,1735.78,'西北']
                ]
            }
        };
        var px_option3 = {
            parallelAxis: [{
                dim: 0,
                name: '房屋施工面积(万平方米)'
            },
            {
                dim: 1,
                name: '房屋竣工面积(万平方米)'
            },
            {
                dim: 2,
                name: '施工机械设备年末总功率(万千瓦)',
                

            },
            {
                dim: 3,
                name: '从业人员(万人),',

            },
            {
                dim: 4,
                name: '企业总收入(亿元)',
                
            },
            {
                dim: 5,
                name: '征用土地面积(平方公里)',
                
            },
            {
                dim: 6,
                name: '城市',
                type: 'category',
                data: ['华北','东北','华东', '中南', '西南', '西北']
            }
            
        
        ],tooltip: {
            padding: 10,
            backgroundColor: '#222',
            borderColor: '#777',
            borderWidth: 1
          },  visualMap: {
            show: true,
            min: 0,
            max: 150,
            dimension: 2,
            inRange: {
              color: ['#d94e5d', '#eac736', '#50a3ba'].reverse()
              // colorAlpha: [0, 1]
            }
          },
        parallel: {                         // 这是『坐标系』的定义
            left: '10%',                     // 平行坐标系的位置设置
            right: '13%',
            bottom: '10%',
            top: '20%',
            parallelAxisDefault: {          // 『坐标轴』的公有属性可以配置在这里避免重复书写
                type: 'value',
                nameLocation: 'end',
                nameGap: 20,
                axisLine :{                   
                    lineStyle:{
                        color:'#fff'
                    }
                }
            }
        },
            series: {
                type: 'parallel',
                lineStyle: {
                    width: 1,
                    opacity: 0.5
                },
                data: [
                [91154.8,13254.5,716,56.26,17507,30,'华北'],
                [18022.6,2189.8,658,57.6,5209.82,30,'华北'],
                [35548.9,8212.2,848,78.97,5937.38,58,'华北'],
                [23317.1,5048,748,90.4,5813.05,4,'华北'],
                [7497.5,1320.7,147,15.49,1434.38,30,'华北'],
                [18129.7,3459,424,55.96,3987.47,18,'东北'],
                [8737.4,3006.1,117,33.72,2139.08,75,'东北'],
                [3753.5,786.8,164,19.47,1488.25,27,'东北'],
                [54802.9,9232.4,171,74.91,11902.95,24,'华东'],
                [273428,74993.3,5137,879.44,33319.03,214,'华东'],
                [181956.4,43302.4,1242,538.25,19871.61,132,'华东'],
                [53887.4,14006.5,512,196.15,8765.72,225,'华东'],
                [87172.3,19182.5,1113,477.65,12569,56,'华东'],
                [35525.6,14475.2,462,164.48,7077.34,93,'华东'],
                [95011.9,24018.2,1182,270.64,16050.29,142,'华东'],
                [67394,18989.1,1281,288.12,11706.84,50,'中南'],
                [94015.9,33112.6,1520,232.47,17435.76,77,'中南'],
                [76367.9,24029.2,1274,278.63,11254.79,66,'中南'],
                [105978.4,24525.6,1658,354.51,21581.21,102,'中南'],
                [29484.2,8596.7,207,118.51,4677.43,88,'中南'],
                [1700.3,475.8,12,6.4,552.26,9,'中南'],
                [37895.2,13931.8,313,205.54,7758.08,94,'西南'],
                [72351.8,23250.8,836,364.57,14936.96,193,'西南'],
                [17892.1,4035.6,275,71.58,3599.05,20,'西南'],
                [18751.1,6648.6,452,120.21,5175.99,38,'西南'],
                [425.5,196.4,17,3.84,331.31,6,'西南'],
                [36561.7,7164.9,763,129.83,8754.74,32,'西北'],
                [12418.8,2341.4,270,46.01,2481.03,29,'西北'],
                [935.5,277.1,54,6.01,688.9,1,'西北'],
                [1989.7,839.9,44,11.09,750.77,12,'西北'],
                [13355.6,3124.5,306,35.7,3138.24,30,'西北'],

                ]
            }
        };
        var px_option4 = {
            parallelAxis: [{
                dim: 0,
                name: '医疗卫生机构数(个)'
            },
            {
                dim: 1,
                name: '保险业企业收入(亿元)'
            },
            {
                dim: 2,
                name: '住宿业企业营业额(亿元)',
                

            },
            {
                dim: 3,
                name: '餐饮业企业营业额(亿元),',

            },
            {
                dim: 4,
                name: '销售业商品销售总额(亿元)',
                
            },
            {
                dim: 5,
                name: '邮政业务总量(亿元)',
                
            },
            {
                dim: 6,
                name: '城市',
                type: 'category',
                data: ['华北','东北','华东', '中南', '西南', '西北']
            }
            
        
        ],tooltip: {
            padding: 10,
            backgroundColor: '#222',
            borderColor: '#777',
            borderWidth: 1
          },  visualMap: {
            show: true,
            min: 0,
            max: 150,
            dimension: 2,
            inRange: {
              color: ['#d94e5d', '#eac736', '#50a3ba'].reverse()
              // colorAlpha: [0, 1]
            }
          },
        parallel: {                         // 这是『坐标系』的定义
            left: '10%',                     // 平行坐标系的位置设置
            right: '13%',
            bottom: '10%',
            top: '20%',
            parallelAxisDefault: {          // 『坐标轴』的公有属性可以配置在这里避免重复书写
                type: 'value',
                nameLocation: 'end',
                nameGap: 20,
                axisLine :{                   
                    lineStyle:{
                        color:'#fff'
                    }
                }
            }
        },
            series: {
                type: 'parallel',
                lineStyle: {
                    width: 1, opacity: 0.5
                },
                data: [
                [10699,2526.93,332.8,888.7,77272.6,283,'华北'],
                [6076,660.47,39.6,152.4,41856,138.75,'华北'],
                [88162,997.5,74.7,66.7,14309.1,528.09,'华北'],
                [41007,1994.5,53.7,91.3,18731.5,130.79,'华北'],
                [24948,645.56,32.9,40.8,6043.6,62.86,'华北'],
                [33051,980.03,57,108.1,19190.4,219.96,'东北'],
                [25344,691.29,26.1,27.2,3695.9,108.59,'东北'],
                [20578,995.47,19.6,13.2,6461.2,133.38,'东北'],
                [6308,1970.9,309.1,1131.2,149862.6,1691.92,'华东'],
                [36448,4051.1,250.3,735.2,92056.4,972.66,'华东'],
                [35120,2484.66,354.5,547.4,107727.5,2231.46,'华东'],
                [29554,1379.67,87.8,257.7,14849.7,393.55,'华东'],
                [28693,1051.79,252,360.7,54693.3,474.78,'华东'],
                [36764,909.6,101.3,105.7,8070.9,210.69,'华东'],
                [85715,2816.49,184.7,295.6,59982.6,642.8,'华东'],
                [78536,2360.03,138.1,126.4,15440.3,545.24,'中南'],
                [36529,1878.11,122.2,323.6,15259.5,366.57,'中南'],
                [55677,1508.75,163.2,224.1,8895.9,295.84,'中南'],
                [57964,4153.2,526.1,1230.1,124112.3,3021.1,'中南'],
                [34112,780.6,93,94.4,13930.4,162.01,'中南'],
                [6277,198.3,116.4,19.3,11302.5,30.97,'中南'],
                [21361,965.5,97.3,190.9,14750,163.19,'西南'],
                [80249,2204.91,212.1,460.3,18573.6,374.18,'西南'],
                [29292,496.26,85.3,62.4,6675.8,87.81,'西南'],
                [26885,690.2,85.8,80.4,11791.4,125.15,'西南'],
                [6907,39.98,10.4,2.5,796.8,5.16,'西南'],
                [34971,1052.37,145.9,245.4,18697.6,168.51,'西北'],
                [25759,490.32,42.2,42.7,7938.2,49.8,'西北'],
                [6408,106.89,9.1,5,2057.3,10.9,'西北'],
                [4571,211.14,6.7,5.6,1444.1,22.46,'西北'],
                [16970,685.69,41.7,37.4,13166.2,46.18,'西北']
                ]
            }
        };
        //全局变量，现在用哪个模式
        //var currentOption =test_Option;

        if (chart == '工业.csv')px_option = px_option1;
        else if(chart == '农业.csv')px_option=px_option2;
        else if(chart == '建筑业.csv')px_option=px_option3;
        else if(chart == '第三产业.csv')px_option=px_option4;

        var currentOption =px_option;
        myChart1.setOption(currentOption);
        
    });
};


function chart2(dataName){
        console.log(dataName)
        pieData = [];
        tmp=[];
        d3.csv(dataName, function (error, dataSet)
        {
            console.log(dataName);
            if(error){
                // console.log(error);
                console.log("AAAAAAAAAAAAAAAAAAAAAAA");
            }else{
            

                //定义这个图的格式，主要在这里是为了更改读取的数据集
                var test_Option = {
  series: {
    type: 'sunburst',
    data: [
  {
    // name: '农业\nagriculture',
    name: '农业',
    itemStyle: {
      color: '#187a2f'
    },
    children: [
      {
        name: '农林产值',
        itemStyle: {
          color: '#3aa255'
        },
        children: [
          {
            name: '农业',
            value: 70321,
            itemStyle: {
              color: '#a2bb2b'
            }
          },
          {
            name: '林业',
            value: 34261,
            itemStyle: {
              color: '#62aa3c'
            }
          }
        ]
      },
      {
        name: '渔业产值',
        itemStyle: {
          color: '#00a295'
        },
        children: [
          {
            name: '海水',
            value: 16301,
            itemStyle: {
              color: '#23dbab'
            }
          },
          {
            name: '淡水',
            value: 11359,
            itemStyle: {
              color: '#1eca8c'
            }
          }
        ]
      },
      {
        name: '畜牧业产值',
        itemStyle: {
          color: '#4Aa235'
        },
        children: [
          {
            name: '肉类',
            value: 13234,
            itemStyle: {
              color: '#2eab12'
            }
          },
          {
            name: '蛋类',
            value: 9382,
            itemStyle: {
              color: '#53aa4c'
            }
          },
          {
            name: '奶类',
            value: 10271,
            itemStyle: {
              color: '#03a153'
            }
          }
        ]
      }
    ]
  },
  
  
  {
    // name: '服务业\n service',
    name: '服务业',
    itemStyle: {
      color: '#0aa3b5'
    },
    children: [
      {
        name: '邮政电信',
        itemStyle: {
          color: '#9db2b7'
        },
        children: [
          {
            name: '邮政',
            value: 5130,
            itemStyle: {
              color: '#8b8c90'
            }
          },
          {
            name: '电信',
            value: 26800,
            itemStyle: {
              color: '#beb276'
            }
          }
        ]
      },
      {
        name: '交通运输',
        itemStyle: {
          color: '#76c0cb'
        },
        children: [
          {
            name: '交通运输',
            value: 12230,
            itemStyle: {
              color: '#80a89d'
            }
          }
        ]
      }
    ]
  },
  
 
  {
    // name: '建筑业\n construction',
    name: '建筑业',
    itemStyle: {
      color: '#a87b64'
    },
    children: [
      {
        name: '建筑业负债',
        itemStyle: {
          color: '#c78869'
        },
        children: [
          {
            name: '流动负债',
            value: 9923,
            itemStyle: {
              color: '#d4ad12'
            }
          },
          {
            name: '长期负债',
            value: 3823,
            itemStyle: {
              color: '#9d5433'
            }
          }
        ]
      },
      {
        name: '建筑业增加值',
        itemStyle: {
          color: '#c77969'
        },
        children: [
          {
            name: '利税总额',
            value: 1393,
            itemStyle: {
              color: '#d4ad12'
            }
          },
          {
            name: '利润总额',
            value: 1200,
            itemStyle: {
              color: '#9d5433'
            }
          }
        ]
      },
      {
        name: '建筑业总产值',
        itemStyle: {
          color: '#bb764c'
        },
        children: [
          {
            name: '建筑工程产值',
            value: 101790,
            itemStyle: {
              color: '#692a19'
            }
          },
          {
            name: '安装工程产值',
            value: 7120,
            itemStyle: {
              color: '#470604'
            }
          },
          {
            name: '其他产值',
            value: 960,
            itemStyle: {
              color: '#570504'
            }
          }
        ]
      }
    ]
  },
  {
    // name: '工业\nindustry',
    name: '工业',
    itemStyle: {
      color: '#e65832'
    },
    children: [
      {
        name: '企业资产统计',
        itemStyle: {
          color: '#d45a59'
        },
        children: [
          {
            name: '流动资产',
            value: 20031,
            itemStyle: {
              color: '#310d0f'
            }
          },
          {
            name: '应收账款净额',
            value: 3432,
            itemStyle: {
              color: '#ae341f'
            }
          },
          {
            name: '固定资产合计',
            value: 123392,
            itemStyle: {
              color: '#d78823'
            }
          },
        ]
      },
      {
        name: '负债情况',
        itemStyle: {
          color: '#f89a80'
        }
      ,
      children:[{
        name: '应付账款',
        value: 4150,
        itemStyle: {
          color: '#f37674'
        }
      },
      {
        name: '流动负债',
        value: 32134,
        itemStyle: {
          color: '#e75b68'
        }
        }]
      }
    ]
  }
],
    radius: [0, '95%'],
    sort: undefined,
    emphasis: {
      focus: 'ancestor'
    },
    levels: [
      {},
      {
        r0: '15%',
        r: '35%',
        itemStyle: {
          borderWidth: 2
        },
        label: {
          rotate: 'tangential'
        }
      },
      {
        r0: '35%',
        r: '70%',
        label: {
          align: 'right'
        }
      },
      {
        r0: '70%',
        r: '72%',
        label: {
          position: 'outside',
          padding: 3,
          silent: false
        },
        itemStyle: {
          borderWidth: 3
        }
      }
    ]
  }
};
            console.log(test_Option);
            //全局变量，现在用哪个模式
            var currentOption2 =test_Option;
            myChart2.setOption(currentOption2);
}
        });
    };

chart2(dataName);
document.getElementById("chart333").innerHTML = '农业产业指数';

function chart31(){
    $.get('json/农业.json', function (data) {
        myChart3.hideLoading();
        var itemStyle = {
            opacity: 0.8
        };
        var sizeFunction = function (x) {
            var y = Math.sqrt(x / 5e8) + 0.1;
            return y * 80;
        };
        // Schema:
        var schema = [
            { name: 'Income', index: 0, text: '人均收入', unit: '人民币' },
            { name: 'Industrial output value', index: 1, text: '产业产值', unit: ' ' },
            { name: 'Population', index: 2, text: '总人口', unit: '' },
            { name: 'Province', index: 3, text: ' 省份', unit: '' }
        ];
        option = {
            baseOption: {
                timeline: {
                    axisType: 'category',
                    orient: 'vertical',
                    autoPlay: true,
                    inverse: true,
                    playInterval: 1000,
                    left: null,
                    right: 0,
                    top: 20,
                    bottom: 20,
                    width: 55,
                    height: null,
                    symbol: 'none',
                    checkpointStyle: {
                        borderWidth: 2
                    },
                    controlStyle: {
                        showNextBtn: false,
                        showPrevBtn: false
                    },
                    data: []
                },
                // title: [
                //     {
                //         text: data.timeline[0],
                //         textAlign: 'center',
                //         left: '63%',
                //         top: '55%',
                //         textStyle: {
                //             fontSize: 100
                //         }
                //     },
                //     {
                //         text: '各省人均收入与相关产业总产值指数',
                //         left: 'center',
                //         top: 10,
                //         textStyle: {
                //             fontWeight: 'normal',
                //             fontSize: 20
                //         }
                //     }
                // ],
                tooltip: {
                    padding: 5,
                    borderWidth: 1,
                    formatter: function (obj) {
                        var value = obj.value;
                        // prettier-ignore
                        return schema[3].text + '：' + value[3] + '<br>'
                            + schema[1].text + '：' + value[1] + schema[1].unit + '<br>'
                            + schema[0].text + '：' + value[0] + schema[0].unit + '<br>'
                            + schema[2].text + '：' + value[2] + '<br>';
                    }
                },
                grid: {
                    top: 100,
                    containLabel: true,
                    left: 30,
                    right: '110'
                },
                xAxis: {
                    type: 'log',
                    name: '人均收入',
                    max: 100000,
                    min: 300,
                    nameGap: 25,
                    nameLocation: 'middle',
                    nameTextStyle: {
                        fontSize: 18
                    },
                    splitLine: {
                        show: false
                    },
                    axisLabel: {
                        formatter: '{value} ¥'
                    },
                    axisLine:{
                        lineStyle:{
                            color:'#ffffff'
                        }
                    }
                },
                yAxis: {
                    type: 'value',
                    name: '农业产值指数',
                    max: 100,
                    nameTextStyle: {
                        fontSize: 18
                    },
                    splitLine: {
                        show: false
                    },
                    axisLabel: {
                        formatter: '{value} '
                    },
                    axisLine:{
                        lineStyle:{
                            color:'#ffffff'
                        }
                    }
                },
                visualMap: [
                    {
                        show: false,
                        dimension: 3,
                        categories: data.counties,
                        inRange: {
                            color: (function () {
                                // prettier-ignore
                                var colors = ['#51689b', '#ce5c5c', '#fbc357', '#8fbf8f', '#659d84', '#fb8e6a', '#c77288', '#786090', '#91c4c5', '#6890ba'];
                                return colors.concat(colors);
                            })()
                        }
                    }
                ],
                series: [
                    {
                        type: 'scatter',
                        itemStyle: itemStyle,
                        data: data.series[0],
                        symbolSize: function (val) {
                            return sizeFunction(val[2]);
                        }
                    }
                ],
                animationDurationUpdate: 1000,
                animationEasingUpdate: 'quinticInOut'
            },
            options: []
        };
        for (var n = 0; n < data.timeline.length; n++) {
            option.baseOption.timeline.data.push(data.timeline[n]);
            option.options.push({
                title: {
                    show: true,
                    text: data.timeline[n] + ''
                },
                series: {
                    name: data.timeline[n],
                    type: 'scatter',
                    itemStyle: itemStyle,
                    data: data.series[n],
                    symbolSize: function (val) {
                        return sizeFunction(val[2]);
                    }
                }
            });
        }
        myChart3.setOption(option);
    });
}


function chart32(){
    $.get('json/工业.json', function (data) {
        myChart3.hideLoading();
        var itemStyle = {
            opacity: 0.8
        };
        var sizeFunction = function (x) {
            var y = Math.sqrt(x / 5e8) + 0.1;
            return y * 80;
        };
        // Schema:
        var schema = [
            { name: 'Income', index: 0, text: '人均收入', unit: '人民币' },
            { name: 'Industrial output value', index: 1, text: '产业产值', unit: ' ' },
            { name: 'Population', index: 2, text: '总人口', unit: '' },
            { name: 'Province', index: 3, text: ' 省份', unit: '' }
        ];
        option = {
            baseOption: {
                timeline: {
                    axisType: 'category',
                    orient: 'vertical',
                    autoPlay: true,
                    inverse: true,
                    playInterval: 1000,
                    left: null,
                    right: 0,
                    top: 20,
                    bottom: 20,
                    width: 55,
                    height: null,
                    symbol: 'none',
                    checkpointStyle: {
                        borderWidth: 2
                    },
                    controlStyle: {
                        showNextBtn: false,
                        showPrevBtn: false
                    },
                    data: []
                },
                // title: [
                //     {
                //         text: data.timeline[0],
                //         textAlign: 'center',
                //         left: '63%',
                //         top: '55%',
                //         textStyle: {
                //             fontSize: 100
                //         }
                //     },
                //     {
                //         text: '各省人均收入与相关产业总产值指数',
                //         left: 'center',
                //         top: 10,
                //         textStyle: {
                //             fontWeight: 'normal',
                //             fontSize: 20
                //         }
                //     }
                // ],
                tooltip: {
                    padding: 5,
                    borderWidth: 1,
                    formatter: function (obj) {
                        var value = obj.value;
                        // prettier-ignore
                        return schema[3].text + '：' + value[3] + '<br>'
                            + schema[1].text + '：' + value[1] + schema[1].unit + '<br>'
                            + schema[0].text + '：' + value[0] + schema[0].unit + '<br>'
                            + schema[2].text + '：' + value[2] + '<br>';
                    }
                },
                grid: {
                    top: 100,
                    containLabel: true,
                    left: 30,
                    right: '110'
                },
                xAxis: {
                    type: 'log',
                    name: '人均收入',
                    max: 100000,
                    min: 300,
                    nameGap: 25,
                    nameLocation: 'middle',
                    nameTextStyle: {
                        fontSize: 18
                    },
                    splitLine: {
                        show: false
                    },
                    axisLabel: {
                        formatter: '{value} ¥'
                    },
                    axisLine:{
                        lineStyle:{
                            color:'#ffffff'
                        }
                    }
                },
                yAxis: {
                    type: 'value',
                    name: '工业产值指数',
                    max: 100,
                    nameTextStyle: {
                        fontSize: 18
                    },
                    splitLine: {
                        show: false
                    },
                    axisLabel: {
                        formatter: '{value} '
                    },
                    axisLine:{
                        lineStyle:{
                            color:'#ffffff'
                        }
                    }
                },
                visualMap: [
                    {
                        show: false,
                        dimension: 3,
                        categories: data.counties,
                        inRange: {
                            color: (function () {
                                // prettier-ignore
                                var colors = ['#51689b', '#ce5c5c', '#fbc357', '#8fbf8f', '#659d84', '#fb8e6a', '#c77288', '#786090', '#91c4c5', '#6890ba'];
                                return colors.concat(colors);
                            })()
                        }
                    }
                ],
                series: [
                    {
                        type: 'scatter',
                        itemStyle: itemStyle,
                        data: data.series[0],
                        symbolSize: function (val) {
                            return sizeFunction(val[2]);
                        }
                    }
                ],
                animationDurationUpdate: 1000,
                animationEasingUpdate: 'quinticInOut'
            },
            options: []
        };
        for (var n = 0; n < data.timeline.length; n++) {
            option.baseOption.timeline.data.push(data.timeline[n]);
            option.options.push({
                title: {
                    show: true,
                    text: data.timeline[n] + ''
                },
                series: {
                    name: data.timeline[n],
                    type: 'scatter',
                    itemStyle: itemStyle,
                    data: data.series[n],
                    symbolSize: function (val) {
                        return sizeFunction(val[2]);
                    }
                }
            });
        }
        myChart3.setOption(option);
    });
}

function chart33(){
    $.get('json/建筑业.json', function (data) {
        myChart3.hideLoading();
        var itemStyle = {
            opacity: 0.8
        };
        var sizeFunction = function (x) {
            var y = Math.sqrt(x / 5e8) + 0.1;
            return y * 80;
        };
        // Schema:
        var schema = [
            { name: 'Income', index: 0, text: '人均收入', unit: '人民币' },
            { name: 'Industrial output value', index: 1, text: '产业产值', unit: ' ' },
            { name: 'Population', index: 2, text: '总人口', unit: '' },
            { name: 'Province', index: 3, text: ' 省份', unit: '' }
        ];
        option = {
            baseOption: {
                timeline: {
                    axisType: 'category',
                    orient: 'vertical',
                    autoPlay: true,
                    inverse: true,
                    playInterval: 1000,
                    left: null,
                    right: 0,
                    top: 20,
                    bottom: 20,
                    width: 55,
                    height: null,
                    symbol: 'none',
                    checkpointStyle: {
                        borderWidth: 2
                    },
                    controlStyle: {
                        showNextBtn: false,
                        showPrevBtn: false
                    },
                    data: []
                },
                // title: [
                //     {
                //         text: data.timeline[0],
                //         textAlign: 'center',
                //         left: '63%',
                //         top: '55%',
                //         textStyle: {
                //             fontSize: 100
                //         }
                //     },
                //     {
                //         text: '各省人均收入与相关产业总产值指数',
                //         left: 'center',
                //         top: 10,
                //         textStyle: {
                //             fontWeight: 'normal',
                //             fontSize: 20
                //         }
                //     }
                // ],
                tooltip: {
                    padding: 5,
                    borderWidth: 1,
                    formatter: function (obj) {
                        var value = obj.value;
                        // prettier-ignore
                        return schema[3].text + '：' + value[3] + '<br>'
                            + schema[1].text + '：' + value[1] + schema[1].unit + '<br>'
                            + schema[0].text + '：' + value[0] + schema[0].unit + '<br>'
                            + schema[2].text + '：' + value[2] + '<br>';
                    }
                },
                grid: {
                    top: 100,
                    containLabel: true,
                    left: 30,
                    right: '110'
                },
                xAxis: {
                    type: 'log',
                    name: '人均收入',
                    max: 100000,
                    min: 300,
                    nameGap: 25,
                    nameLocation: 'middle',
                    nameTextStyle: {
                        fontSize: 18
                    },
                    splitLine: {
                        show: false
                    },
                    axisLabel: {
                        formatter: '{value} ¥'
                    },
                    axisLine:{
                        lineStyle:{
                            color:'#ffffff'
                        }
                    }
                },
                yAxis: {
                    type: 'value',
                    name: '建筑业产值指数',
                    max: 10000,
                    nameTextStyle: {
                        fontSize: 18
                    },
                    splitLine: {
                        show: false
                    },
                    axisLabel: {
                        formatter: '{value} '
                    },
                    axisLine:{
                        lineStyle:{
                            color:'#ffffff'
                        }
                    }
                },
                visualMap: [
                    {
                        show: false,
                        dimension: 3,
                        categories: data.counties,
                        inRange: {
                            color: (function () {
                                // prettier-ignore
                                var colors = ['#51689b', '#ce5c5c', '#fbc357', '#8fbf8f', '#659d84', '#fb8e6a', '#c77288', '#786090', '#91c4c5', '#6890ba'];
                                return colors.concat(colors);
                            })()
                        }
                    }
                ],
                series: [
                    {
                        type: 'scatter',
                        itemStyle: itemStyle,
                        data: data.series[0],
                        symbolSize: function (val) {
                            return sizeFunction(val[2]);
                        }
                    }
                ],
                animationDurationUpdate: 1000,
                animationEasingUpdate: 'quinticInOut'
            },
            options: []
        };
        for (var n = 0; n < data.timeline.length; n++) {
            option.baseOption.timeline.data.push(data.timeline[n]);
            option.options.push({
                title: {
                    show: true,
                    text: data.timeline[n] + ''
                },
                series: {
                    name: data.timeline[n],
                    type: 'scatter',
                    itemStyle: itemStyle,
                    data: data.series[n],
                    symbolSize: function (val) {
                        return sizeFunction(val[2]);
                    }
                }
            });
        }
        myChart3.setOption(option);
    });
}

function chart34(){
    $.get('json/第三产业.json', function (data) {
        myChart3.hideLoading();
        var itemStyle = {
            opacity: 0.8
        };
        var sizeFunction = function (x) {
            var y = Math.sqrt(x / 5e8) + 0.1;
            return y * 80;
        };
        // Schema:
        var schema = [
            { name: 'Income', index: 0, text: '人均收入', unit: '人民币' },
            { name: 'Industrial output value', index: 1, text: '产业产值', unit: ' ' },
            { name: 'Population', index: 2, text: '总人口', unit: '' },
            { name: 'Province', index: 3, text: ' 省份', unit: '' }
        ];
        option = {
            baseOption: {
                timeline: {
                    axisType: 'category',
                    orient: 'vertical',
                    autoPlay: true,
                    inverse: true,
                    playInterval: 1000,
                    left: null,
                    right: 0,
                    top: 20,
                    bottom: 20,
                    width: 55,
                    height: null,
                    symbol: 'none',
                    checkpointStyle: {
                        borderWidth: 2
                    },
                    controlStyle: {
                        showNextBtn: false,
                        showPrevBtn: false
                    },
                    data: []
                },
                // title: [
                //     {
                //         text: data.timeline[0],
                //         textAlign: 'center',
                //         left: '63%',
                //         top: '55%',
                //         textStyle: {
                //             fontSize: 100
                //         }
                //     },
                //     {
                //         text: '各省人均收入与相关产业总产值指数',
                //         left: 'center',
                //         top: 10,
                //         textStyle: {
                //             fontWeight: 'normal',
                //             fontSize: 20
                //         }
                //     }
                // ],
                tooltip: {
                    padding: 5,
                    borderWidth: 1,
                    formatter: function (obj) {
                        var value = obj.value;
                        // prettier-ignore
                        return schema[3].text + '：' + value[3] + '<br>'
                            + schema[1].text + '：' + value[1] + schema[1].unit + '<br>'
                            + schema[0].text + '：' + value[0] + schema[0].unit + '<br>'
                            + schema[2].text + '：' + value[2] + '<br>';
                    }
                },
                grid: {
                    top: 100,
                    containLabel: true,
                    left: 30,
                    right: '110'
                },
                xAxis: {
                    type: 'log',
                    name: '人均收入',
                    max: 100000,
                    min: 300,
                    nameGap: 25,
                    nameLocation: 'middle',
                    nameTextStyle: {
                        fontSize: 18
                    },
                    splitLine: {
                        show: false
                    },
                    axisLabel: {
                        formatter: '{value} ¥'
                    },
                    axisLine:{
                        lineStyle:{
                            color:'#ffffff'
                        }
                    }
                },
                yAxis: {
                    type: 'value',
                    name: '第三产业产值指数',
                    max: 100,
                    nameTextStyle: {
                        fontSize: 18
                    },
                    splitLine: {
                        show: false
                    },
                    axisLabel: {
                        formatter: '{value} '
                    },
                    axisLine:{
                        lineStyle:{
                            color:'#ffffff'
                        }
                    }
                },
                visualMap: [
                    {
                        show: false,
                        dimension: 3,
                        categories: data.counties,
                        inRange: {
                            color: (function () {
                                // prettier-ignore
                                var colors = ['#51689b', '#ce5c5c', '#fbc357', '#8fbf8f', '#659d84', '#fb8e6a', '#c77288', '#786090', '#91c4c5', '#6890ba'];
                                return colors.concat(colors);
                            })()
                        }
                    }
                ],
                series: [
                    {
                        type: 'scatter',
                        itemStyle: itemStyle,
                        data: data.series[0],
                        symbolSize: function (val) {
                            return sizeFunction(val[2]);
                        }
                    }
                ],
                animationDurationUpdate: 1000,
                animationEasingUpdate: 'quinticInOut'
            },
            options: []
        };
        for (var n = 0; n < data.timeline.length; n++) {
            option.baseOption.timeline.data.push(data.timeline[n]);
            option.options.push({
                title: {
                    show: true,
                    text: data.timeline[n] + ''
                },
                series: {
                    name: data.timeline[n],
                    type: 'scatter',
                    itemStyle: itemStyle,
                    data: data.series[n],
                    symbolSize: function (val) {
                        return sizeFunction(val[2]);
                    }
                }
            });
        }
        myChart3.setOption(option);
    });
}

chart1(dataName);
// map(chart);
chart31();

// drawMap_bar();



// readData2(dataName);



//点击之后，换area全局变量，重新读一次数据画图
myChart2.on('click', function (params) {
    // alert(params.name);
    if(params.name == '农业'){
        chart = "农业.csv";
        document.getElementById("chart111").innerHTML = '平行坐标系-农业';
        document.getElementById("industry").innerHTML = '农业';
        document.getElementById("chart333").innerHTML = '农业产业指数';
        document.getElementById("chart444").innerHTML = Province_Displaying + current_Industry + "产值明细"
        dataName='data/'+chart;
        chart1(dataName);
        chart2(dataName);
        window.addEventListener("load", drawMap_bar);
        current_Industry = chart.split('.')[0]; 
        // map();
        chart31();
    }else if(params.name == '工业'){
        chart = "工业.csv";
        document.getElementById("chart111").innerHTML = '平行坐标系-工业';
        document.getElementById("industry").innerHTML = '工业';
        document.getElementById("chart333").innerHTML = '工业产业指数';
        document.getElementById("chart444").innerHTML = Province_Displaying + current_Industry + "产值明细"
        dataName='data/'+chart;
        chart1(dataName);
        chart2(dataName);
        window.addEventListener("load", drawMap_bar);
        current_Industry = chart.split('.')[0]; 
        // map();
        chart32();
    }else if(params.name == '建筑业'){
        chart = "建筑业.csv";
        document.getElementById("chart111").innerHTML = '平行坐标系-建筑业';
        document.getElementById("industry").innerHTML = '建筑业';
        document.getElementById("chart333").innerHTML = '建筑业产业指数';
        document.getElementById("chart444").innerHTML = Province_Displaying + current_Industry + "产值明细"
        dataName='data/'+chart;
        chart1(dataName);
        chart2(dataName);
        window.addEventListener("load", drawMap_bar);
        current_Industry = chart.split('.')[0]; 
        // map();
        chart33();
    }else if(params.name == '服务业'){
        chart = "第三产业.csv";
        document.getElementById("chart111").innerHTML = '平行坐标系-第三产业';
        document.getElementById("industry").innerHTML = '第三产业';
        document.getElementById("chart333").innerHTML = '第三产业指数';
        document.getElementById("chart444").innerHTML = Province_Displaying + current_Industry + "产值明细"
        dataName='data/'+chart;
        chart1(dataName);
        chart2(dataName);
        window.addEventListener("load", drawMap_bar);
        current_Industry = chart.split('.')[0]; 
        // map();
        chart34();
    }else{
        console.log('no action');
        dataName='data/'+chart;
        chart2(dataName)
    }
    // area = params.name;
    // readData(dataName);readData2(dataName);
});

function drawMap_bar(){
    document.body.style.backgroundColor = backGroundColor;
    const svg1 = d3.select("#mainSvg1");
    const svg2 = d3.select("#mainSvg2");
    drawMap(svg1, svg2);
}

function drawbar(svg)
{
    document.getElementById("chart444").innerHTML = Province_Displaying + current_Industry + "产值明细"
    // const svg = d3.select("#mainSvg");
    svg.selectAll("*").remove();    // clear canvas
    const height = svg.attr("height");
    const width = svg.attr("width");
    const margin = {top: 90, bottom: 150, left: 80, right: 0};
    const innerHeight = height - margin.top - margin.bottom;
    const innerWidth = width - margin.left - margin.right;
    const mainGroup = svg.append("g")
        .attr('transform', `translate(${margin.left}, ${margin.top})`)
        .attr("id", "maingroup");
    const yScale = d3.scaleLinear();
    const xScale = d3.scaleBand().padding(0.25);

    Promise.all([
        d3.json("./js/china.json"),
        d3.csv("./data/第三产业.csv"),
        d3.csv("./data/工业.csv"),
        d3.csv("./data/建筑业.csv"),
        d3.csv("./data/农业.csv")
    ]).then(totalDate => {
        let geoData = totalDate[0];
        let tertiary = totalDate[1];        // the tertiary industry
        let industry = totalDate[2];        // industry
        let architecture = totalDate[3];    // architecture
        let agriculture = totalDate[4];     // agriculture
        let data;
        if(current_Industry === "第三产业") data = tertiary;
        else if(current_Industry === "工业") data = industry;
        else if(current_Industry === "建筑业") data = architecture;
        else if(current_Industry === "农业") data = agriculture;
        for(let i=0; i<data.length; i++) {
            for (let key of Object.keys(data[i])) {
                if (key !== "area")
                    data[i][key] = +data[i][key]
            }
        }
        for(let i=0; i<data.length; i++)
        {
            if(data[i]["area"] === Province_Displaying)
            {
                data = data[i];
                delete data["area"];
                break;
            }
        }
        yScale.domain([0, d3.max(Object.values(data))]).range([innerHeight, 0]).nice();
        xScale.domain(Object.keys(data)).range([0, innerWidth]);
        // tips
        const tip = d3.tip()
            .attr('class', 'd3-tip')
            .html(function (event, d) {return `<p style="font-size:17px;"> ${d}: ${data[d]} </p>`});
        svg.call(tip);
        // Initialize
        let rects = mainGroup.selectAll("rect").data(Object.keys(data)).join("rect")
            .attr('width', xScale.bandwidth())
            .attr('height', 0)
            .attr('y', innerHeight)
            .attr('x', d => xScale(d));
        // Transition
        rects.transition().duration(d => (innerHeight - yScale(data[d]))).ease(d3.easeLinear)
            .attr("fill", barFillColor)
            .attr('width', xScale.bandwidth())
            .attr('height', d => innerHeight - yScale(data[d]))
            .attr('y', d => yScale(data[d]))
            .attr('x', d => xScale(d))
            .attr('stroke', barStrokeColor)
            .attr('stroke-width', 1);
        rects.on('mouseover',function(event, d)
        {
            d3.select(this)
                .attr('opacity', 0.75)
            tip.show(event, d);
        }).on('mouseout',function(event, d)
        {
            d3.select(this)
                .attr('opacity', 1)
                .attr('stroke', 'black')
                .attr('stroke-width', 1);
            tip.hide(event, d);
        })
        // mainGroup.on("click", drawMap);
        const xAxisMethod = d3.axisBottom(xScale);
        const yAxisMethod = d3.axisLeft(yScale);
        // yAxisMethod.tickSize(-innerWidth)
        const xAxisGroup = mainGroup.append('g').call(xAxisMethod);
        const yAxisGroup = mainGroup.append('g').call(yAxisMethod);
        xAxisGroup.attr('transform', `translate(${0}, ${innerHeight})`).attr("class", "loc").attr("color", "#fff");
        xAxisGroup.selectAll("text").attr("transform", `rotate(30)`).attr("text-anchor", "start");
        yAxisGroup.attr("color", "#fff");
        // xAxisGroup.append('text')
        //     .attr('class', 'axisTitles')
        //     .text(`${Province_Displaying}${current_Industry}产值明细`)
        //     .attr('x', innerWidth/2)
        //     .attr('y', 60)
        //     .attr("font-size", "3em")
        //     .attr("fill", "#ffffff");
        yAxisGroup.append('text')
            .attr('class', 'axisTitles')
            .text("产   值")
            .attr('transform', 'rotate(-90)')
            .attr('x', -innerHeight/2+20)
            .attr('y', -40)
            .attr("font-size", "3em")
            .attr("fill", "#ffffff");
    })
}

/**
 * draw map, search on mouse-moving, switch on click
 * @param: svg: svg to draw maps
 *         svg2: svg to draw bars
 * @return: none
* */
function drawMap(svg, svg2)
{
    // const svg = d3.select("#mainSvg");
    svg.selectAll("*").remove();
    Promise.all([
        d3.json("./js/china.json"),
        d3.csv("./data/第三产业.csv"),
        d3.csv("./data/工业.csv"),
        d3.csv("./data/建筑业.csv"),
        d3.csv("./data/农业.csv")
    ]).then(totalDate => {
        console.log(totalDate);
        let geoData = totalDate[0];
        let tertiary = totalDate[1];        // the tertiary industry
        let industry = totalDate[2];        // industry
        let architecture = totalDate[3];    // architecture
        let agriculture = totalDate[4];     // agriculture

        let proj = d3.geoMercator();
        proj.center([110, 44]).scale(700);
        let path = d3.geoPath().projection(proj);


        /**
         * get info to show on tip, called by draw_map
         * @param province
         * @param arr
         * @returns {string|*}
         */
        function fetchInfo(province, arr)
        {
            for(let i=0; i<arr.length; i++)
            {
                let res = "";
                if(arr[i].area === province)
                {
                    for(let key of Object.keys(arr[i]))
                    {
                        if(key === "area") {
                            if(arr[i][key].length === 3)
                                res += `<p style="font-size:17px;"><b>&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp${arr[i][key]}</b> </p>`;
                            else if(arr[i][key].length === 4)
                                res += `<p style="font-size:17px;"><b>&nbsp&nbsp&nbsp&nbsp${arr[i][key]} </b></p>`;
                            else if(arr[i][key].length === 5)
                                res += `<p style="font-size:17px;"><b>&nbsp&nbsp&nbsp${arr[i][key]} </b></p>`;
                            else if(arr[i][key].length === 6)
                                res += `<p style="font-size:17px;"><b>&nbsp&nbsp${arr[i][key]} </b></p>`;
                            else if(arr[i][key].length === 7)
                                res += `<p style="font-size:17px;"><b>&nbsp${arr[i][key]}</b> </p>`;
                            else if(arr[i][key].length === 8)
                                res += `<p style="font-size:17px;"><b>${arr[i][key]} </b></p>`;
                        }
                        else res += `<p style="font-size:14px;">${key}: ${arr[i][key]}</p>`;
                    }
                    return res
                }
            }
            return province;
        }

        /**
         * adjust the direction of tip, called by draw_map
         * @param province: province to be displayed
         * @returns none
         */
        function direction(province)
        {
            if(province === "新疆维吾尔自治区") tip.direction("e");
            else if(province === "内蒙古自治区") tip.direction("e");
            else if(province === "黑龙江省") tip.direction("w");
            else if(province === "吉林省") tip.direction("w");
            else if(province === "辽宁省") tip.direction("w");
            else if(province === "甘肃省") tip.direction("e");
            else if(province === "河北省") tip.direction("w");
            else if(province === "天津市") tip.direction("w");
            else if(province === "北京市") tip.direction("w");
            else if(province === "山西省") tip.direction("w");
            else tip.direction("n");
        }

        const tip = d3.tip()
            .attr('class', 'd3-tip')
            .html(function (event, d)
            {
                let province = d.properties.name;
                direction(province);
                switch (current_Industry){
                    case "第三产业": return fetchInfo(province, tertiary);
                    case "工业": return fetchInfo(province, industry);
                    case "建筑业": return fetchInfo(province, architecture);
                    case "农业": return fetchInfo(province, agriculture);
                }
            });
        svg.call(tip);

       let map = svg.selectAll('path').data(geoData.features)   // set the properties of map
           .join('path')
           .attr('stroke', mapStrokeColor)
           .attr('fill', mapFillColor)
           .attr('d', path)
           .attr("class", "province")
           .attr('stroke-width', 1)
           .attr('id', d => d.properties.name);

       /* register events */
        map.on('mouseover',function(event, d)
        {
            d3.select(this)
                .attr('opacity', 0.5)
                .attr("font-size", "1px")
                .attr('stroke', mapMouseoverStrokeColor)
                .attr('stroke-width', 1);
                
            tip.show(event, d);
        }).on('click', function(event, d)
        {
            Province_Displaying = d.properties.name;
            /* appointed interface */
            // alert(d.properties.name);
            tip.hide(event, d);
            drawbar(svg2);
        }).on('mouseout', function(event, d)
        {
            d3.select(this)
                .attr('opacity',1 )
                .attr('stroke', 'black')
                .attr('stroke-width', 1);
            tip.hide(event, d);
        });
    });
}


// 时钟
Date.prototype.format = function (fmt) {
        var o = {
            "h+": this.getHours(), //小时
            "m+": this.getMinutes(), //分
            "s+": this.getSeconds() //秒
        };
        if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
        for (var k in o)
            if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
        return fmt;
    }
setInterval("document.getElementById('time').innerHTML = (new Date()).format('hh:mm:ss');", 1000);



