	var object=[];
	var price=[];
	var suburb;
		

	d3.csv('/static/table.csv').then(csvdata=>{ //read table file which contains house type 
			//object.push(csvdata)
			
			object = csvdata
		});
	d3.csv('/static/House_price_2021.csv').then(data=>{ // read the hosue price data
		 price = data
		
	});
	d3.csv('/static/House_price_trend.csv').then(data=>{// read the hosue trend data
		 trend_data = data
	});
	d3.csv('/static/Greater_Melbourne_House_price_education.csv').then(data=>{
		 School = data
		 
	});

	
	var columns = ['suburb','Population','Separate_house','Semi_detached_row','Flat_apartment','other','House_Mean_Price($)','Offense Recorded']
	var table = d3.select("#graph1").append('table');
	var tool_tip = d3.select('#tooltip-container')
	var tool_tip1 = d3.select('#tooltip-container1')
	var th = table.append('thead');
	var tb = table.append('tbody');
	var trend =[{index:"Oct to Dec 2020",value:0}, //house price trend empty dictionary 
				{index:'Jan to Mar 2021',value:0},
				{index:'Apr to Jun 2021',value:0},
				{index:'Jul to Aug 2021',value:0},
				{index:'Oct to Dec 2021',value:0}];
	var School_Type = [ //school type empty  dictionary
		{"number": 0,"type": "Primary_School"},
		{"number": 0,"type": "Pri Sec_School"}, 
		{"number": 0,"type": "Secondary_School"}, 
		{"number": 0,"type": "Special_School"}, 
		{"number": 0,"type": "Camp_School"}, 
		{"number": 0,"type": "Language_School"}];

	

	var width = 1500;
	var height = 800;
	var svg = d3.select('#svg') //set the basic setting of style of the first svg canvas
		.attr("width", width)
		.attr("height", height)
		.style("border", "1px solid steelblue");
	var svg1 = d3.select('#svg1')
		.attr("width", width)
		.attr("height", height)
		.style("border", "2px solid steelblue");
	var g = svg.append('g')
	var g1 = svg1.append('g')
	var projection = d3.geoMercator().center([144.5,-38.2]) //Choose map projection methods
	var path = d3.geoPath().projection(projection) //
	window.suburb;
	function getColor(population) {
    if (population > 100000) {
        return '#4a0000'; // 非常高人口数量，深红色
    } else if (population > 70000) {
        return '#b30000'; // 较高人口数量，鲜红色
    } else if (population > 50000) {
        return '#ff1a1a'; // 中等人口数量，亮红色
    } else if (population > 30000) {
        return '#ff6666'; // 中低人口数量，浅红色
    } else if (population > 10000) {
        return '#ff9999'; // 低人口数量，非常浅红色
    } else {
        return '#ffc2c2'; // 非常低人口数量，接近白色
    }
}


	function suburbselection() {
		var zooming = function() {
				// Log e.transform, so you can see all the goodies inside
				// console.log(e.transform);
				var transform = d3.event.transform;
				// New offset array
				var offset = [d3.event.transform.x, d3.event.transform.y];
				// Calculate new scale
				var newScale = d3.event.transform.k * 2000;
				// Update projection with new offset and scale
				projection.translate(offset)
						.scale(newScale);
				// Update all paths
				svg.selectAll("path")
					.transition()
					.duration(800)
					.ease(d3.easeCubicInOut)
					.attr("d", path);
		}

		
		var zoom = d3.zoom().scaleExtent([1,200])
				.on("zoom",zooming);
					
		        // Create a container in which all zoomable objects will live
		var map = svg.append("g")
				.attr("id", "map")
				.call(zoom)  //Bind the zoom behavior
				.call(zoom.transform, d3.zoomIdentity  	//Then apply the initial transform.
					.translate(300,700)					// N.B. The translation vector and 
					.scale(30));							//      scale factor were determined
														//      empirically.
														// N.B. The scale factor is multiplied
														//      by 2,000 in the zoom handler.

		//Create a new, invisible background rect to catch zoom events	
		map.append("rect")
			.attr("x", 0)
			.attr("y", 0)
			.attr("width", width)
			.attr("height", height)
			.attr("opacity", 0.3);

		d3.json('/static/suburb-2-vic.json').then(d=>{
			// Add the Victoria suburbs boundary polygons. 
			map.selectAll("path")
			.data(d.features)
			.enter().append("path")
			.attr("d", path)
			.attr('stroke','white')
			.attr('stroke-width',1)//'#E1A65E'
			.attr('fill',function(d) {
            // 查找匹配的人口数据
					var matchingFeature = object.find(feature => feature.suburb === d.properties.vic_loca_2);
					if (matchingFeature) {
						return getColor(matchingFeature.Population); // 根据人口设置颜色
					} else {
						return '#E1A65E'; // 如果没有匹配的数据，使用默认颜色
					}
			})
			.on('mouseover',function(d){			// mouse moves out the color of edge will recover
					d3.select(this)
					.attr('stroke','white')
					.attr('stroke-width',2)
					.attr('opacity',0.7);
					tool_tip.style('display','block');

							
			})
			.on('mouseout',function(d){// the tooltip will move with the move of mouse
				d3.select(this)
				.attr('stroke','white')
				.attr('stroke-width',0.5)
				.attr('opacity',1);
				tool_tip.style('display','none');
						


			})
			//.append('title').text(d=>d.properties.vic_loca_2)
			//.attr('fill','blue')
			.on('click',function(d){ // onclick event
				

				if(window.suburb == this){
					d3.select(this).attr('fill','#707171'); //if user press the same suburb like last time  they clicked, will keep color remaining 

					
					
				}
				else{	
				   //otherwise the color will change to the target suburb
				   d3.select(window.suburb).attr('fill','#E1A65E');
				   d3.select(this).attr('fill','#707171');
				   for(var i=0;i<object.length;i++){ // walk through all the information in the table.csv
				       var suburb = object[i].suburb					   
					
						if (suburb == d.properties.vic_loca_2 ){
							tool_tip.style('display','block');
							tool_tip.select('#tooltip-text').html(function(){
							
							
								return '郊区名称：' + d.properties.vic_loca_2 + '<br>' + '<br>'
										+ '人口：' + object[i].Population + '<br>' + '<br>'
										+ '独立房屋：' + object[i].Separate_house + '<br>' + '<br>'
										+ '半独立排屋：' + object[i].Semi_detached_row + '<br>' + '<br>'
										+ '公寓：' + object[i].Flat_apartment + '<br>' + '<br>'
										+ '其他：' + object[i].other + '<br>' + '<br>'
										+ '房屋均价（澳元）：' + object[i].House_Price_Mean + '<br>' + '<br>'
										+ '犯罪记录：' + object[i].Offences_Recorded

							})
							

							
							var result =[];
							result.push(object[i]);
						
							var tr = d3.select(".objecttable tbody")
							.selectAll("tr")
							.data(result)
							var td = tr.selectAll("td")
							.data(function(d, i) { return Object.values(d); })
							.text(function(d) { return d; });
							//insert the house price value of 2020-2021 into trend dict
							if(isNaN(trend_data[i].OctDec20)) { // if the data is missing  or invalid 

								trend[0].value = 0
								trend[1].value = 0
								trend[2].value = 0
								trend[3].value = 0
								trend[4].value = 0

							}else{

							
							
						
								trend[0].value = trend_data[i].OctDec20
								trend[1].value = trend_data[i].JanMar2021
								trend[2].value = trend_data[i].AprJun2021
								trend[3].value = trend_data[i].JulAug21
								trend[4].value = trend_data[i].OctDec21
								
							}
							if(isNaN(School[i].Primary_School_number)) {
								School_Type[0]['number']=0
								School_Type[1]['number']=0
								School_Type[2]['number']=0
								School_Type[3]['number']=0
								School_Type[4]['number']=0
								School_Type[5]['number']=0

							}
							else{
								School_Type[0]['number']=School[i].Primary_School_number
								School_Type[1]['number']=School[i].Pri_Sec_School_number
								School_Type[2]['number']=School[i].Secondary_School_number
								School_Type[3]['number']=School[i].Special_School_number
								School_Type[4]['number']=School[i].Camp_School_number
								School_Type[5]['number']=School[i].Language_School_number
							}
							
							
							trendgraph(trend,d.properties.vic_loca_2)
							barchart(School_Type,d.properties.vic_loca_2)
							


							window.suburb =this;
							break;
						}
						else if (suburb != d.properties.vic_loca_2 && i==object.length-1){
							tool_tip.style('display','block');
							tool_tip.select('#tooltip-text').html(function(){
							
								return '郊区名称：' + d.properties.vic_loca_2 + '<br>' + '<br>'
								+ '人口：' + '未知' + '<br>' + '<br>'
								+ '独立房屋：' + '未知' + '<br>' + '<br>'
								+ '半独立排屋：' + '未知' + '<br>' + '<br>'
								+ '公寓：' + '未知' + '<br>' + '<br>'
								+ '其他：' + '未知' + '<br>' + '<br>'
								+ '房屋均价（美元）：' + '未知' + '<br>' + '<br>'
								+ '犯罪记录：' + 0;

						})
							var result =[{suburb:d.properties.vic_loca_2,
								Flat_apartment: 'Unknown',
								Population: 'Unknown',
								Semi_detached_row:"Unknown",
								Separate_house:"Unknown",
								other:"Unknown",
								House_Mean_Price:'Unknown',
								Offense_Recorded:'Unknown'
								}]
							
							trend =
							[
							{index:"Oct to Dec 2020",value:0},
							{index:'Jan to Mar 2021',value:0},
							{index:'Apr to Jun 2021',value:0},
							{index:'Jul to Aug 2021',value:0},
							{index:'Oct to Dec 2021',value:0}
						    ];

							School_Type = [
							{"number": 0,"type": "Primary_School"},
							{"number": 0,"type": "Pri Sec_School"}, 
							{"number": 0,"type": "Secondary_School"}, 
							{"number": 0,"type": "Special_School"}, 
							{"number": 0,"type": "Camp_School"}, 
							{"number": 0,"type": "Language_School"}];
							var tr = d3.select(".objecttable tbody")
							.selectAll("tr")
							.data(result)
							var td = tr.selectAll("td")
							.data(function(d, i) { return Object.values(d); })
							.text(function(d) { return d; });
							trendgraph(trend,d.properties.vic_loca_2)
							barchart(School_Type,d.properties.vic_loca_2)
							window.suburb =this;
							
				
		                }
							

					}
				}
			})
			.on('mousemove',function(){// the tooltip will move with the move of mouse
				tool_tip.style('top',d3.mouse(this)[1] +'px')
				.style('left',d3.mouse(this)[0] +700+'px')
				})
					
					

		})
	}

    var coordinates=[]
	function schoollocation() {
		
		var zooming = function() {
				// Log e.transform, so you can see all the goodies inside
				// console.log(e.transform);
				
				// New offset array
				var offset = [d3.event.transform.x, d3.event.transform.y];
				// Calculate new scale
				var newScale = d3.event.transform.k * 2000;
				// Update projection with new offset and scale
				projection.translate(offset)
						.scale(newScale);
				// Update all paths
				svg1.selectAll("path")
					.attr("d", path)
					
				//console.log(offset)
				svg1.selectAll('circle').data(coordinates)
				.attr("cx", function(d){
				
	
					return projection([d.X,d.Y])[0];
				})
				.attr("cy", function(d){
					
					return projection([d.X,d.Y])[1];
				})
				.attr("r", "5px")
				.attr("fill", "#072744")
	   
				
				
					

			}

		
		var zoom = d3.zoom().scaleExtent([1,400])
				.on("zoom",zooming)
					
		        // Create a container in which all zoomable objects will live
		var map = svg1.append("g")
				.attr("id", "map")
				.call(zoom)  //Bind the zoom behavior
				.call(zoom.transform, d3.zoomIdentity  	//Then apply the initial transform.
					.translate(300,700)					// N.B. The translation vector and 
					.scale(30));							//      scale factor were determined
														//      empirically.
														// N.B. The scale factor is multiplied
														//      by 2,000 in the zoom handler.

		//Create a new, invisible background rect to catch zoom events	
		map.append("rect")
			.attr("x", 0)
			.attr("y", 0)
			.attr("width", width)
			.attr("height", height)
			.attr("opacity", 0.3);

		
		

		d3.csv('/static/dv309_schoollocations2021.csv').then(data=>{
			coordinates=data;
			
	
		
			svg1.selectAll('circle').data(data).enter().append('circle')
				.attr("cx", function(d){
					
		
					return projection([d.X,d.Y])[0];
				})
				.attr("cy", function(d){
					
					return projection([d.X,d.Y])[1];
				})
				.attr("r", "5px")
				.attr("fill", "#072744")
				.on('mouseover',function(d){
					d3.select(this).attr('fill','green');
					tool_tip1.style('display','block');
					tool_tip1.select('#tooltip-text1').html(function(){
					
						return '学校名称：' + d.School_Name + '<br>' + '<br>'
						+ '教育部门：' + d.Education_Sector + '<br>' + '<br>'
						+ '学校类型：' + d.School_Type + '<br>' + '<br>'
						+ '学校地址：' + d.Address_Line_1;

					})
							
				})
				.on('mouseout',function(d){// mouse moves out the color of edge will recover
					d3.select(this).attr('fill','#072744');
					tool_tip1.style('display','none');
				})
				.on('mousemove',function(){// the tooltip will move with the move of mouse
					tool_tip1.style('top',d3.mouse(this)[1] +'px')
					.style('left',d3.mouse(this)[0] +700+'px')
				})

       

			
	    })
		

		d3.json('/static//suburb-2-vic.json').then(d=>{

			

			// Add the Victorial suburbs boundary polygons. 
			map.selectAll("path")
			.data(d.features)
			.enter().append("path")
			.attr("d", path)
			.attr('stroke','black')
			.attr('stroke-width',0.5)
			.attr('fill','rgb(207, 204, 201)')


			.on('mouseover',function(d){		 // mouse moves out the color of edge will recover	
					d3.select(this)
					.attr('stroke','white')
					.attr('stroke-width',2)
					.attr('opacity',0.7);
							
					})
			.on('mouseout',function(d){
				d3.select(this)
				.attr('stroke','black')
				.attr('stroke-width',0.5)
				.attr('opacity',1);
						


					})
			
			.on('click',function(d){
				if(window.suburb == this){
					d3.select(this).attr('fill','#707171');//if user press the same suburb like last time  they clicked, will keep color remaining 

					
					
				}
				else{	
				   //otherwise the color will change to the target suburb
					d3.select(window.suburb).attr('fill','rgb(207, 204, 201)');
					d3.select(this).attr('fill','#707171');
					for(var i=0;i<object.length;i++){
						var suburb = object[i].suburb
						
						if (suburb.toUpperCase() == d.properties.vic_loca_2 ){
							d3.select(this).attr('fill','#707171');
							var result =[];
							result.push(object[i]);
							var tr = d3.select(".objecttable tbody")
							.selectAll("tr")
							.data(result)
							var td = tr.selectAll("td")
							.data(function(d, i) { return Object.values(d); })
							.text(function(d) { return d; });
							if(isNaN(trend_data[i].OctDec20)) {

								trend[0].value = 0
								trend[1].value = 0
								trend[2].value = 0
								trend[3].value = 0
								trend[4].value = 0

							}else{




								trend[0].value = trend_data[i].OctDec20
								trend[1].value = trend_data[i].JanMar2021
								trend[2].value = trend_data[i].AprJun2021
								trend[3].value = trend_data[i].JulAug21
								trend[4].value = trend_data[i].OctDec21

							}

							if(isNaN(School[i].Primary_School_number)) {
								School_Type[0]['number']=0
								School_Type[1]['number']=0
								School_Type[2]['number']=0
								School_Type[3]['number']=0
								School_Type[4]['number']=0
								School_Type[5]['number']=0

							}
							else{
								School_Type[0]['number']=School[i].Primary_School_number
								School_Type[1]['number']=School[i].Pri_Sec_School_number
								School_Type[2]['number']=School[i].Secondary_School_number
								School_Type[3]['number']=School[i].Special_School_number
								School_Type[4]['number']=School[i].Camp_School_number
								School_Type[5]['number']=School[i].Language_School_number
							}

							trendgraph(trend,d.properties.vic_loca_2)
							barchart(School_Type,d.properties.vic_loca_2)
							window.suburb=this
							break;
						}
						else if (suburb.toUpperCase() != d.properties.vic_loca_2 && i==object.length-1){
							d3.select(this).attr('fill','blue');
							
							var result =[{suburb:d.properties.vic_loca_2,
								Flat_apartment: 'Unknown',
								Population: 'Unknown',
								Semi_detached_row:"Unknown",
								Separate_house:"Unknown",
								other:"Unknown",
								House_Mean_Price:'Unknown',
								Offense_Recorded:'Unknown'
								}]
								trend =
								[
								{index:"Oct to Dec 2020",value:0},
								{index:'Jan to Mar 2021',value:0},
								{index:'Apr to Jun 2021',value:0},
								{index:'Jul to Aug 2021',value:0},
								{index:'Oct to Dec 2021',value:0}
								];
								School_Type = [
								{"number": 0,"type": "Primary_School"},
								{"number": 0,"type": "Pri Sec_School"}, 
								{"number": 0,"type": "Secondary_School"}, 
								{"number": 0,"type": "Special_School"}, 
								{"number": 0,"type": "Camp_School"}, 
								{"number": 0,"type": "Language_School"}];
							

								var tr = d3.select(".objecttable tbody")
								.selectAll("tr")
								.data(result)
								var td = tr.selectAll("td")
								.data(function(d, i) { return Object.values(d); })
								.text(function(d) { return d; });
								trendgraph(trend,d.properties.vic_loca_2)
								barchart(School_Type,d.properties.vic_loca_2)
								window.suburb=this
			
					}
							

				}
			}
		})
					.append('title').text(d=>d.properties.vic_loca_2)
					.attr('fill','blue');


		});

	}



function trendgraph(trend, suburb) {
    d3.select("#svg3").remove();
    const width3 = 800;
    const height3 = 400;

    const svg3 = d3.select("#graph3").append('svg')
        .attr('id', 'svg3')
        .attr("width", width3)
        .attr("height", height3)
        .style('background-color', '#225689');

    const m = { top: 30, right: 40, bottom: 25, left: 100 };
    const g3 = svg3.append("g").attr("transform", "translate(" + m.left + "," + m.top + ")");

    const gW = width3 - m.left - m.right;
    const gH = height3 - m.top - m.bottom;

    const xScale = d3.scaleBand().range([0, gW]).padding(0.4);
    const yScale = d3.scaleLinear().range([gH, 0]);

    xScale.domain(trend.map(item => item.index));

    // 调整 yScale 的域以使折线下移
    const maxYValue = d3.max(trend, item => item.value) * 1.2; // 例如，将最大值增加 20%
    yScale.domain([0, maxYValue]);

    g3.append("g")
        .attr("transform", "translate(0," + gH + ")")
        .call(d3.axisBottom(xScale))
        .attr("color", "#ffffff")
		.selectAll("text")   // 选择所有的文本元素
        .style("font-size", "14px") // 增加字体大小
        .style("fill", "#ffffff"); // 设置字体颜色（如果需要）

    g3.append("g")
        .call(d3.axisLeft(yScale))
        .attr("color", "#ffffff");

    const line = d3.line()
        .x(d => xScale(d.index) + xScale.bandwidth() / 2)
        .y(d => yScale(d.value))
        .curve(d3.curveCatmullRom);

    g3.append("path")
        .attr("d", line(trend))
        .attr("fill", "none")
        .attr("stroke", "#a8dadc")
        .attr("stroke-width", 2);
	    // 绘制数据点
	g3.selectAll(".point")
        .data(trend)
        .enter()
        .append("circle")
        .attr("class", "point")
        .attr("cx", d => xScale(d.index) + xScale.bandwidth() / 2)
        .attr("cy", d => yScale(d.value))
        .attr("r", 5) // 点的半径
        .attr("fill", "#a8dadc");

    g3.append("text")
        .attr("x", gW / 2)
        .attr("y", -10)
        .attr("text-anchor", "middle")
        .attr('font-weight', 'bold')
        .style("font-size", "16px")
        .style("fill", "#ffffff")
        .text(suburb + " 房价走势（2020-2021）");
}






function barchart(data, suburb) {
    d3.select("#svg2").remove();

    const width4 = 800;
    const height4 = 400;
    const svg4 = d3.select("#graph2").append('svg')
        .attr('id', 'svg2')
        .attr('width', width4)
        .attr('height', height4)
        .style('background-color', '#225689'); // 设置背景色
    var m = { left: 30, right: 10, top: 25, bottom: 30 };
    const g4 = svg4.append("g").attr("transform", `translate(${m.left}, ${m.top})`);

    const gW = width4 - m.left - m.right;
    const gH = height4 - m.top - m.bottom;

    const xScale = d3.scaleBand().range([0, gW]).padding(0.4);
    const yScale = d3.scaleLinear().range([gH, 0]);

    xScale.domain(data.map(item => item['type']));
    yScale.domain([0, d3.max(data, item => item['number'])]);

    // 坐标轴样式
    g4.append("g")
        .attr("transform", `translate(0, ${gH})`)
        .call(d3.axisBottom(xScale))
        .selectAll("text")   // 选择所有的文本元素
        .style("font-size", "14px") // 增加字体大小
        .style("fill", "#ffffff"); // 设置字体颜色（如果需要）

    g4.append("g")
        .call(d3.axisLeft(yScale))
        .attr("color", "#ffffff");

    // 柱状图样式
    g4.selectAll(".bar")
        .data(data)
        .enter()
        .append("rect")
        .attr("class", "bar")
        .attr("x", d => xScale(d['type']))
        .attr("y", d => yScale(d['number']))
        .attr("width", xScale.bandwidth())
        .attr("height", d => gH - yScale(d['number']))
        .attr("fill", (d, i) => d3.interpolateBlues(i / data.length * 0.8 + 0.2)); // 使用蓝色的不同深浅

    // 标题
    g4.append("text")
        .attr("x", gW / 2)
        .attr("y", -5)
        .attr("text-anchor", "middle")
        .style("font-size", "16px")
        .style("fill", "#ffffff")
        .text(`${suburb}学校类型和数量（2021年）`);
}

	


	suburbselection() 
	schoollocation()
	trendgraph(trend,suburb)
	barchart(School_Type,suburb)
	$('#showmap').click(function(e) {
	if (this.value == 'School location') {
		
		$('#blurb').show();
		this.value = 'Suburb selection';
		svg.style('display','none')
		svg1.style('display','block')
	} else {
				$('#blurb').hide();
				this.value = 'School location';
				svg1.style('display','none')
				svg.style('display','block')

			}
	}); 
