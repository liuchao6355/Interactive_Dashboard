window.addEventListener("load", drawMap_bar);
var Province_Displaying = "山东省";    // global variable: province selected, revise when clicking on map
var current_Industry = "工业";        // global variable: industry selected, revise from the outside

var mapStrokeColor = "black";           // 地图边线颜色
var mapFillColor = "steelblue";         // 地图填充颜色
var mapMouseoverStrokeColor = "white";  // 地图鼠标悬浮时边线颜色
var barFillColor = "steelblue";        // 柱状图填充颜色
var barStrokeColor = "black";          // 柱状图边线颜色
var backGroundColor = "white"           // 背景颜色

/**
 * initialize function
 * @param: none
 * @return: none
 * */
function drawMap_bar()
{
    document.body.style.backgroundColor = backGroundColor;
    const svg1 = d3.select("#mainSvg1");
    const svg2 = d3.select("#mainSvg2");
    drawMap(svg1, svg2);
}


/**
 * draw bar chart, search on mouse-moving, switch on click
 * @param: svg
 * @return: none
 * */
function drawbar(svg)
{
    // const svg = d3.select("#mainSvg");
    svg.selectAll("*").remove();    // clear canvas
    const height = svg.attr("height");
    const width = svg.attr("width");
    const margin = {top: 5, bottom: 5, left: 5, right: 5};
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
        d3.csv("./data/建筑.csv"),
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
            .html(function (event, d) {return `${d}: ${data[d]}`});
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
        yAxisMethod.tickSize(-innerWidth)
        const xAxisGroup = mainGroup.append('g').call(xAxisMethod);
        const yAxisGroup = mainGroup.append('g').call(yAxisMethod);
        xAxisGroup.attr('transform', `translate(${0}, ${innerHeight})`);
        xAxisGroup.append('text')
            .attr('class', 'axisTitles')
            .text(`${Province_Displaying}${current_Industry}产值明细`)
            .attr('x', innerWidth/2)
            .attr('y', 60)
            .attr("font-size", "3em")
            .attr("fill", "black");
        yAxisGroup.append('text')
            .attr('class', 'axisTitles')
            .text("产   值")
            .attr('transform', 'rotate(-90)')
            .attr('x', -innerHeight/2+20)
            .attr('y', -40)
            .attr("font-size", "3em")
            .attr("fill", "black");
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
        d3.csv("./data/建筑.csv"),
        d3.csv("./data/农业.csv")
    ]).then(totalDate => {
        let geoData = totalDate[0];
        let tertiary = totalDate[1];        // the tertiary industry
        let industry = totalDate[2];        // industry
        let architecture = totalDate[3];    // architecture
        let agriculture = totalDate[4];     // agriculture

        let proj = d3.geoMercator();
        proj.center([116, 44]).scale(600);
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
                        if(key === "area") {    // sheng fen
                            if(arr[i][key].length === 3)
                                res += `<p>&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp${arr[i][key]} </p>`;
                            else if(arr[i][key].length === 4)
                                res += `<h6>&nbsp&nbsp&nbsp&nbsp${arr[i][key]} </h6>`;
                            else if(arr[i][key].length === 5)
                                res += `<h6>&nbsp&nbsp&nbsp${arr[i][key]} </h6>`;
                            else if(arr[i][key].length === 6)
                                res += `<h6>&nbsp&nbsp${arr[i][key]} </h6>`;
                            else if(arr[i][key].length === 7)
                                res += `<h6>&nbsp${arr[i][key]} </h6>`;
                            else if(arr[i][key].length === 8)
                                res += `<h6>${arr[i][key]} </h6>`;
                        }
                        else res += `${key}: ${arr[i][key]} <br>`;
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