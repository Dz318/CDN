/**
 * version V1.2
 * author dxz
 * 人力资源数据看板 js文件
 */
layui.use('laydate', function(){
	  var laydate = layui.laydate;
	  //执行一个laydate实例
	  laydate.render({
	    elem: '#salary_search_date',//指定元素
		range:['#salary_start_date','#salary_end_date']
	  });
	  laydate.render({
		  elem:'#person_fullPlan_date',
		  format:'yyyy-MM-dd',
		  value:'2021-09-07'
	  })
	  //日期范围
		laydate.render({
		  elem: '#test6'
		  //设置开始日期、日期日期的 input 选择器
		  //数组格式为 2.6.6 开始新增，之前版本直接配置 true 或任意分割字符即可
		  ,range: ['#startDate', '#endDate']
		});
	});
	// 公司人员总体汇总
	var total_container = document.getElementById("total_container");
	var myChart = echarts.init(total_container);
	var app = {};
	var total_container_option;
	
	var countData = [
		{value: 3300, name: '自有员工'},
		{value: 2287, name: 'A类派遣'},
		{value: 1183, name: 'B类派遣'}
	];
	// 人数汇总
	var totalCount =0;
	for(var i = 0;i<countData.length;i++){
		totalCount += countData[i].value;
	}
	total_container_option = {
		title:{
			text:'总人数',
			textStyle:{
				fontSize:20
			},
			left:'center',
			subtext:totalCount,
			x:'center',
			y:'center',
			subtextStyle:{
				fontSize:18
			}
		},
	    tooltip: {
	        trigger: 'item',
			formatter: '{c} ({d}%)'
	    },
	    legend: {
	        left: 'left',
			orient: 'vertical'
	    },
	    series: [
	        {
	            type: 'pie',
	            radius: ['40%', '70%'],
	            avoidLabelOverlap: false,
	            label: {
	                show: false,
	                position: 'center'
	            },
	            emphasis: {
	                label: {
	                    show: true,
	                    fontSize: '18',
	                    fontWeight: 'bold'
	                }
	            },
	            label: {
	                show: true,
					fontSize:'18',
					formatter: '{b} {d}%  ',
	            },
	            data: [
	                {value: 3300, name: '自有员工'},
	                {value: 2287, name: 'A类派遣'},
	                {value: 1183, name: 'B类派遣'}
	            ]
	        }
	    ]
	};
	total_container_option && myChart.setOption(total_container_option);
	// 公司人员总体汇总
	
	// 各单位人员汇总
	var unit_container_dom = document.getElementById("unit_container");
	var myChart = echarts.init(unit_container_dom);
	var app = {};
	
	var Their_own_emp = [241,143, 489, 234, 310, 144, 230,189,609,120,54];
	var dispath_emp = [17,175, 438, 310, 294, 341, 607,542,447,57,184];
	var B_dispath_emp = [0,31,81,108, 130, 296, 157,205,186,0,0];
	
	var total_emps = function(){
		var totals = [];
		for(var i = 0;i<Their_own_emp.length;i++){
			totals.push(Their_own_emp[i] + dispath_emp[i] + B_dispath_emp[i]);
		}
		return totals;
	}
	
	var unit_container_option;
	unit_container_option = {
	    title: {
	        text: '人员统计'
	    },
	    tooltip: {
	        trigger: 'axis',
	        axisPointer: {
	            type: 'shadow'
	        }
	    },
	    legend: {
	        data: ['自有员工', 'A类派遣','B类派遣']
	    },
	    xAxis: {
	        type: 'category',
	        name:'分公司',
	        data: ['公司总部','基础设施事业部', '西南分', '华东分', '山东分', 
			'江苏分', '河南分','安徽分','南方分','安装分','菲律宾分'],
			axisLabel:{
				interval:0
			}
	    },
	    yAxis: {
			type: 'value',
			name:'人数',
			min:0,
			max:1500,
			interval: 50,
	    },
	    series: [
			 {
				name: '自有员工',
				type: 'bar',
				stack: 'total',
				label: {
					show: true
				},
				emphasis: {
					focus: 'series'
				},
				data: Their_own_emp
			},
			{
				name: 'A类派遣',
				type: 'bar',
				stack: 'total',
				label: {
					show: true,
				},
				emphasis: {
					focus: 'series'
				},
				data: dispath_emp
			},
			{
				name: 'B类派遣',
				type: 'bar',
				stack: 'total',
				label: {
					show: true,
				},
				emphasis: {
					focus: 'series'
				},
				data: B_dispath_emp
			},
	        {
	              name: '总计',
	              type: 'bar',
	              stack: 'total',
	              label: {
	                  normal: {
	                      show: true,
	                      position: 'insideBottom',
	                      formatter: '{c}',
	                      textStyle: {
	                          color: 'black',
							  fontWeight:'bold'
	                      }
	                  }
	              },
	              itemStyle: {
	                  normal: {
	                      color: 'rgba(128, 128, 128, 0)'
	                  }
	              },
	              data: total_emps()
	         }
	    ]
	};

	unit_container_option &&  myChart.setOption(unit_container_option);
	// 各单位人员汇总
	
	// 人员来源占比
	var dom = document.getElementById("personsource_container");
	var myChart = echarts.init(dom);
	var personsource_container_option;
	var app = {};
	personsource_container_option = {
	    title: {
	        text: '人员来源',
			subtext:'人数汇总：5470',
	        left: 'center'
	    },
	    tooltip: {
	        trigger: 'item',
			formatter: '{a} <br/>{b} : {c} ({d}%)'
	    },
	    legend: {
	        orient: 'vertical',
	        left: 'left',
	    },
	    series: [
	        {
				label: {
				    show: true,
					fontSize:'18',
					formatter: '{b} {d}%  ',
				},
	            name: '人员来源',
	            type: 'pie',
	            radius: '60%',
	            data: [
	                {value: 1874, name: '社会招聘'},
	                {value: 3596, name: '校园招聘'}
	            ],
	            emphasis: {
	                itemStyle: {
						fontSize: '18',
						fontWeight: 'bold'
	                }
	            }
	        }
	    ]
	};
	
	personsource_container_option &&  myChart.setOption(personsource_container_option);
	// 人员来源占比
	// 学历情况
	var chartDom = document.getElementById('edu_container');
	var myChart = echarts.init(chartDom);
	var edu_option;
	var firstEdu = [
		{value: 548, name: '硕士研究生'},
		{value: 2775, name: '大学本科'},
		{value: 979, name: '大学专科'},
		{value: 127, name: '中等专科'},
		{value: 679, name: '其它'}
	];
		
	var highEdu = [
		{value: 0, name: '博士研究生'},
		{value: 147, name: '硕士研究生'},
		{value: 2875, name: '大学本科'},
		{value: 1089, name: '大学专科'},
		{value: 127, name: '中等专科'},
		{value: 679, name: '其它'}
	];
	var schoolCategory = [
			{value: 26, name: '双一流'},
			{value: 478, name: '985'},
			{value: 909, name: '211'},
			{value: 89, name: '海外学校'},
			{value: 4178, name: '其它'}
	];
	
	edu_option = {
		title: [{
		    text: '学历汇总',
		    left: 'left',
		}, {
		    subtext: '第一学历统计',
		    left: '15.67%',
			top:'15%',
		    textAlign: 'center',
		    subtextStyle:{
		        fontSize:16,
		        color:'black'
		    }
		}, {
		    subtext: '最高学历统计',
		    left: '50%',
			top:'15%',
		    textAlign: 'center',
		    subtextStyle:{
		        fontSize:16,
		        color:'black'
		    }
		}, {
		    subtext: '院校类别统计',
		    left: '83.33%',
			top:'15%',
		    textAlign: 'center',
		    subtextStyle:{
		        fontSize:16,
		        color:'black'
		    }
		}],
		tooltip: {
		    trigger: 'item',
			formatter: '{a} <br/>{b}: {c} ({d}%)'
		},
		legend: {
		    left: 'center',
			top:'6%',
		    textStyle:{
		        fontSize:14
		    }
		},
		series: [{
		    name:'第一学历统计',
		    type: 'pie',
		    radius: '50%',
		    center: ['50%', '50%'],
		    data: firstEdu,
		    label: {
		        position: 'outer',
		        bleedMargin: 5,
		        formatter: '{b}：{d}% ',
		        fontSize:14
		    },
		    left: 0,
		    right: '66.6667%',
		    top: 0,
		    bottom: 0
		}, {
		    name:'最高学历统计',
		    type: 'pie',
		    radius: '50%',
		    center: ['50%', '50%'],
		    data: highEdu,
		    label: {
		        position: 'outer',
		        bleedMargin: 5,
		        formatter: '{b}：{d}% ',
		        fontSize:14
		    },
		    left: '33.3333%',
		    right: '33.3333%',
		    top: 0,
		    bottom: 0
		}, {
		    name:'院校类别统计',
		    type: 'pie',
		    radius: '50%',
		    center: ['50%', '50%'],
		    data: schoolCategory,
		    label: {
		        position: 'outer',
		        margin: 20,
		        formatter: '{b}：{d}% ',
		        fontSize:14
		    },
		    left: '66.6667%',
		    right: 0,
		    top: 0,
		    bottom: 0
		}]
	};
	
	edu_option && myChart.setOption(edu_option);
	// 学历情况
	
	// 一级建造师人员备案情况
	var chartDom = document.getElementById('CD_container');
	var myChart = echarts.init(chartDom);
	var CD_container_option;
	
	CD_container_option = {
		title:{
			 text:'一级建造师持证情况'
		},
	    tooltip: {
	        trigger: 'item',
	        formatter: '{a} <br/>{b}: {c} ({d}%)'
	    },
	    legend: {
			data: ['注册在一公司人数','注册在一局人数','可用备案注册人数','可持证上岗人数'],
			top:'top'
	    },
	    series: [
	        {
	            name: '备案情况',
	            type: 'pie',
	            selectedMode: 'single',
	            radius: [0, '30%'],
	            label: {
	                position: 'inner',
	                fontSize: 14,
	            },
	            labelLine: {
	                show: false
	            },
	            data: [
	                {value: 610, name: '备案人员'},
	                {value: 274, name: '其他人员'}
	            ]
	        },
	        {
	            name: '备案情况',
	            type: 'pie',
	            radius: ['45%', '60%'],
	            labelLine: {
	                length: 30,
	            },
	            data: [
	                {value: 158, name: '注册在一公司人数'},
	                {value: 236, name: '注册在一局人数'},
	                {value: 75, name: '可用备案注册人数'},
	                {value: 89, name: '可持证上岗人数'}
	            ],
	            label: {
	                formatter: '{b}:{d}%  ',
	                borderWidth: 1,
	                borderRadius: 2,
					fontSize:16
	            }
	        }
	    ]
	};
	
	CD_container_option && myChart.setOption(CD_container_option);
	
	// 一级建造师人员备案情况
	// 持证情况
	var chartDom = document.getElementById('certificate_container');
	var myChart = echarts.init(chartDom);
	var certificate_option;
	
	certificate_option = {
	    title: {
	        text: '职业资格证书分类',
	        left: 'center'
	    },
	    tooltip: {
	        trigger: 'item',
	        formatter: '{a} <br/>{b}: {c} ({d}%)'
	    },
	    legend: {
	        orient: 'vertical',
	        left: 'left',
	    },
	    series: [
	        {
	            name: '持证情况',
	            type: 'pie',
	            radius: '60%',
	            data: [
	                {value: 88, name: '注册造价工程师'},
	                {value: 57, name: '注册安全工程师'},
	                {value: 7, name: '注册会计师'},
	                {value: 19, name: '法律职业资格'},
	                {value: 46, name: '其它注册类证书'}
	            ],
	            label: {
	                formatter: '{b}:{d}%}  ',
	                borderWidth: 1,
	                borderRadius: 2,
					fontSize:16
	            },
	            emphasis: {
	                itemStyle: {
	                    shadowBlur: 10,
	                    shadowOffsetX: 0,
	                    shadowColor: 'rgba(0, 0, 0, 0.5)'
	                }
	            }
	        }
	    ]
	};
	certificate_option && myChart.setOption(certificate_option);
	// 持证情况
	// 全周期人员配置情况
	var chartDom = document.getElementById('personnel_allocation_container');
	var myChart = echarts.init(chartDom);
	var personnel_allocation_option;
	
	personnel_allocation_option = {
	    title: {
	        text: '全周期人员配置曲线'
	    },
	    tooltip: {
	        trigger: 'axis'
	    },
	    legend: {
	        data: ['实际人数', '计划人员']
	    },
	    grid: {
	        left: '3%',
	        right: '4%',
	        bottom: '3%',
	        containLabel: true
	    },
	    toolbox: {
	        feature: {
	            saveAsImage: {}
	        },
			feature: {
			    dataView: {show: true, readOnly: false},
			    magicType: {show: true, type: ['line', 'bar']},
			    restore: {show: true},
			    saveAsImage: {show: true}
			}
	    },
	    xAxis: {
	        name:'分公司',
	        type: 'category',
	        boundaryGap: false,
			axisLabel:{
				interval:0
			},
	        data: ['基础设施事业部','西南分','华东分','山东分', '江苏分', '河南分','安徽分','南方分','安装分','菲律宾分']
	    },
	    yAxis: {
	        name:'人数',
	        type: 'value'
	    },
	    series: [
	        {
	            name: '实际人数',
	            type: 'line',
	            data: [420, 514, 647, 815, 604, 1116,787,1047,125,89]
	        },
	        {
	            name: '计划人员',
	            type: 'line',
	            data: [308, 420, 704, 830, 548, 1256,698,987,230,78]
	        }
	    ]
	};
	
	personnel_allocation_option && myChart.setOption(personnel_allocation_option);
	// 全周期人员配置情况
	
	// 人均营收&人均利润
	var chartDom = document.getElementById('personnel_Effect_container');
	var myChart = echarts.init(chartDom);
	var personnel_Effect_option;
	
	personnel_Effect_option = {
		title:{
			text:'人员创效'
		},
	   tooltip: {
	           trigger: 'axis',
	           axisPointer: {
	               type: 'cross',
	               crossStyle: {
	                   color: '#999'
	               }
	           }
	       },
	       toolbox: {
	           feature: {
	               dataView: {show: true, readOnly: false},
	               magicType: {show: true, type: ['line', 'bar']},
	               restore: {show: true},
	               saveAsImage: {show: true}
	           }
	       },
	       legend: {
	           data: ['人均营收', '人均利润', '工资利润率']
	       },
	    toolbox: {
	        show: true,
	        feature: {
	            dataView: {show: true, readOnly: false},
	            magicType: {show: true, type: ['line', 'bar']},
	            restore: {show: true},
	            saveAsImage: {show: true}
	        }
	    },
	    calculable: true,
	    xAxis: [
	        {
	            type: 'category',
				axisLabel:{
					interval:0
				},
	            data: ['基础设施事业部', '西南分', '华东分', '山东分', '江苏分', '河南分','安徽分','南方分','安装分','菲律宾分'],
	            name:'2021年'
	       }
	    ],
	    yAxis: [
	        {
	            type: 'value',
	            name: '万元'
	        },
			{
				type: 'value',
				name: '利润率',
				axisLabel: {
					formatter: '{value}%'
				}
			}
	    ],
	    series: [
	        {
	            name: '人均营收',
	            type: 'bar',
	            data: [545.6, 567.7, 614.4, 634.32, 673.2, 627.3, 609.8, 685.3,874.6,714.4],
	            markPoint: {
	                data: [
	                    {type: 'max', name: '最大值'},
	                    {type: 'min', name: '最小值'}
	                ]
	            },
	            label:{
	                show:true,
	                position:'inside'
	            },
	            markLine: {
	                data: [
	                    {type: 'average', name: '平均值'}
	                ]
	            }
	        },
	        {
	            name: '人均利润',
	            type: 'line',
				yAxisIndex: 1,
	            data: [11.6, 13.9, 14.4, 14.87, 15.7, 15.9, 16.6, 17.2, 16.9,17.5],
	            label:{
	                show:true,
	                position:'top',
					formatter:"{c}%"
	            },
	            markLine: {
	                data: [
	                    {type: 'average', name: '平均值'}
	                ]
	            }
	        }
	    ]
	};
	
	personnel_Effect_option && myChart.setOption(personnel_Effect_option);
	// 人均营收&人均利润
	// 工资利润率&工资产值率
	var chartDom = document.getElementById('Wage_rate_container');
	var myChart = echarts.init(chartDom);
	var Wage_rate_option;
	
	Wage_rate_option = {
	    title: {
	        text: '工资利润率&工资产值率',
	    },
	    tooltip: {
	        trigger: 'axis'
	    },
	    legend: {
	        data: ['工资利润率', '工资产值率']
	    },
	    toolbox: {
	        show: true,
	        feature: {
	            dataView: {readOnly: false},
	            magicType: {type: ['line', 'bar']},
	            restore: {},
	            saveAsImage: {}
	        }
	    },
	    xAxis: {
	        type: 'category',
			axisLabel:{
				interval:0
			},
	        data:['基础设施事业部','西南分','华东分','山东分', '江苏分', '河南分','安徽分','南方分','安装分','菲律宾分'],
	        name:'分公司'
	    },
	    yAxis: {
	        type: 'value',
	        axisLabel: {
	            formatter: '{value}%'
	        }
	    },
	    series: [
	        {
	            name: '工资利润率',
	            type: 'line',
	            data: [11.8, 12.7, 13.5, 13.8, 14.1, 14.25, 14.98,15.14,15.83,16.05],
	            label:{
	                show: true,
	                position:'top'
	            },
	            markPoint: {
	                data: [
	                    {type: 'max', name: '最大值'},
	                    {type: 'min', name: '最小值'}
	                ]
	            },
	            markLine: {
	                data: [
	                    {type: 'average', name: '平均值'}
	                ]
	            }
	        },
	        {
	            name: '工资产值率',
	            type: 'line',
	            data: [40.59, 42.38, 43.79, 45.55, 46.17, 47.08, 47.96,48.56,51.26,50.89],
	            label:{
	                show: true,
	                position:'top'
	            },
	            markPoint: {
	                data: [
	                    {type: 'max', name: '最大值'},
	                    {type: 'min', name: '最小值'}
	                ]
	            },
	            markLine: {
	                data: [
	                    {type: 'average', name: '平均值'},
	                    [{
	                        symbol: 'none',
	                        x: '90%',
	                        yAxis: 'max'
	                    }, {
	                        symbol: 'circle',
	                        label: {
	                            position: 'start',
	                            formatter: '最大值'
	                        },
	                        type: 'max',
	                        name: '最高点'
	                    }]
	                ]
	            }
	        }
	    ]
	};
	
	Wage_rate_option && myChart.setOption(Wage_rate_option);
	// 工资利润率&工资产值率
	// 人工成本
	var chartDom = document.getElementById('labor_cost_container');
	var myChart = echarts.init(chartDom);
	var labor_cost_option;
	
	labor_cost_option = {
		title: {
			text:'人工成本'
		},
	    tooltip: {
	        trigger: 'axis',
	        axisPointer: {
	            type: 'cross',
	            crossStyle: {
	                color: '#999'
	            }
	        }
	    },
	    toolbox: {
	        feature: {
	            dataView: {show: true, readOnly: false},
	            magicType: {show: true, type: ['line', 'bar']},
	            restore: {show: true},
	            saveAsImage: {show: true}
	        }
	    },
	    legend: {
	        data: ['工资总额', '其它人工成本']
	    },
	    xAxis: [
	        {
	            type: 'category',
	            data: ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月'],
	            axisPointer: {
	                type: 'shadow'
	            },
	            axisLabel:{
					interval:0
				},
				name:'2021年'
	        }
	    ],
	    yAxis: [
	        {
	            type: 'value',
	            name: '金额(万元)',
	            min: 0,
	            max: 7000 ,
	            interval:500
	        }
	    ],
	    series: [
	        {
	            name: '工资总额',
	            type: 'bar',
	           
	            data: [3079,2800,2856,3041,3351,2836,2917,3304,3016,3434,3242,3069],
	            label:{
	                show:true,
	                position:'top',
	                textStyle:{
	                    fontWeight:'bold'
	                }
	            }
	        },
	        {
	            name: '其它人工成本',
	            type: 'bar',
	            data: [1738,1611,1249,1763,1678,1782,1554,1828,1230,1394,1406,1254],
	            label:{
	                show:true,
	                position:'top'
	            }
	        }
	    ]
	};
	
	labor_cost_option && myChart.setOption(labor_cost_option);
	// 人工成本
	// 各单位薪酬占比
	var chartDom = document.getElementById('unit_salary_propotion_container');
	var myChart = echarts.init(chartDom);
	var unit_salary_propotion_option;
	
	unit_salary_propotion_option = {
	    title: {
	        text: '各单位薪酬占比',
	        left: 'center'
	    },
	    tooltip: {
	        trigger: 'item',
			formatter: '{a} <br/>{b}: {c}万 ({d}%)'
	    },
	    legend: {
	        orient: 'zhanbi',
	        left: 'left',
	    },
	    series: [
	        {
	            name: '薪酬占比',
	            type: 'pie',
	            radius: '50%',
	            label: {
	                formatter: '{b}:{d}%  ',
	                borderWidth: 1,
	                borderRadius: 4,
					fontSize:16
	            },
	            data: [
					{value: 221, name: '公司总部'},
	                {value: 1048, name: '基础设施事业部'},
	                {value: 1722, name: '西南分公司'},
	                {value: 1966, name: '华东分公司'},
	                {value: 1740, name: '山东分公司'},
	                {value: 1923, name: '江苏分公司'},
	                {value: 1884, name: '河南分公司'},
	                {value: 1647, name: '安徽分公司'},
	                {value: 2140, name: '南方分公司'},
	                {value: 440, name: '安装分公司'},
	                {value: 130, name: '菲律宾分公司'},
	            ],
	            emphasis: {
	                itemStyle: {
	                    shadowBlur: 10,
	                    shadowOffsetX: 0,
	                    shadowColor: 'rgba(0, 0, 0, 0.5)'
	                }
	            }
	        }
	    ]
	};
	
	unit_salary_propotion_option && myChart.setOption(unit_salary_propotion_option);
	// 各单位薪酬占比
	// 各单位人员五元薪酬结构总额
	var chartDom = document.getElementById('salary_structure_proportion_container');
	var myChart = echarts.init(chartDom);
	var salary_structure_proportion_option;
	
	salary_structure_proportion_option = {
		title:{
			text:'单位人员薪酬结构'
		},
	    tooltip: {
	        trigger: 'axis',
	        axisPointer: {
	            type: 'cross',
	            crossStyle: {
	                color: '#999'
	            }
	        }
	    },
	    legend: {
	        data: ['基本工资', '绩效工资', '单项事项奖罚','津补贴','效益奖金']
	    },
	    xAxis: [
	        {
	            type: 'category',
	            data:['基础设施事业部','西南分','华东分','山东分', '江苏分', '河南分','安徽分','南方分','安装分','菲律宾分'],
		        name:'分公司',
		        axisLabel:{
					interval:0
				},
	        }
	    ],
	    yAxis: [
	        {
	            type: 'value',
	            name: '金额(万元)',
	            min: 0,
	            max: 3000,
	            interval: 500
	        }
	    ],
	    series: [
	        {
	            name: '基本工资',
	            type: 'bar',
	            data: [581,1054,1139,749,1154,1191,932,990,560,1033],
	            markLine: {
	                data: [
	                    {type: 'average', name: '平均值'}
	                ]
	            },
				label: {
				    formatter: '{d}万}  ',
				    borderWidth: 1,
				    borderRadius: 4
				}
	        },
	        {
	            name: '绩效工资',
	            type: 'bar',
	            data: [495,322,463,329,374,428,524,600,470,553],
	            markLine: {
	                data: [
	                    {type: 'average', name: '平均值'}
	                ]
	            }
	        },
	        {
	            name: '单项事项奖罚',
	            type: 'bar',
	            data: [212,256,370,228,264,222,285,296,139,363],
	            markLine: {
	                data: [
	                    {type: 'average', name: '平均值'}
	                ]
	            }
				
	        },
	        {
	            name: '津补贴',
	            type: 'bar',
	            data: [315,313,355,310,473,428,303,483,150,367],
	            markLine: {
	                data: [
	                    {type: 'average', name: '平均值'}
	                ]
	            }
	        },
	        {
	            name: '效益奖金',
	            type: 'bar',
	            data: [1692,1137,1330,1560,1629,1260,1755,1662,763,561],
	            markLine: {
	                data: [
	                    {type: 'average', name: '平均值'}
	                ]
	            }
	        }
	    ]
	};
	
	salary_structure_proportion_option && myChart.setOption(salary_structure_proportion_option);
	// 各单位人员五元薪酬结构总额
	
	// 各单位人员平均薪酬
	var chartDom = document.getElementById('unit_salary_avg_container');
	var myChart = echarts.init(chartDom);
	var unit_salary_avg_option;
	
	unit_salary_avg_option = {
	    title: {
	        text: '各单位平均薪酬',
	    },
	    tooltip: {
	        trigger: 'axis'
	    },
	    legend: {
	        data: ['月平均薪酬', '年平均薪酬']
	    },
	    calculable: true,
	    xAxis: [
	        {
	           type: 'category',
		        name:'分公司',
		        data: ['基础设施', '西南分', '华东分', '山东分', 
		        '江苏分', '河南分','安徽分','南方分','安装分','菲律宾分'],
				axisLabel:{
					interval:0
				}
	        }
	    ],
	    yAxis: [
	        {
	            type: 'value',
				name:'金额(元)'
	        }
	    ],
	    series: [
	        {
	            name: '月平均薪酬',
	            type: 'bar',
	            data: [6059,4704,6196,5709,6371,5933,5157,4738,4971,4933],
	            markLine: {
	                data: [
	                    {type: 'average', name: '平均值'}
	                ]
	            },
	            label:{
	                show:true,
	                position:'top',
	                textStyle:{
	                    fontWeight:'bold'
	                }
	            }
	        },
	        {
	            name: '年平均薪酬',
	            type: 'bar',
	            data: [87938,79849,89032,80106,93809,71016,70767,93948,92500,85607],
	            markLine: {
	                data: [
	                    {type: 'average', name: '平均值'}
	                ]
	            },
	            label:{
	                show:true,
	                position:'top',
	                textStyle:{
	                    fontWeight:'bold'
	                }
	            }
	        }
	    ]
	};
	
	unit_salary_avg_option && myChart.setOption(unit_salary_avg_option);
	// 各单位人员平均薪酬
	// 单位人员分位值
	var chartDom = document.getElementById('personal_score_container');
	var myChart = echarts.init(chartDom);
	var personal_score_option;
	
	personal_score_option = {
	    title: {
	        text: '单位人员分位值',
	    },
	    tooltip: {
	        trigger: 'axis'
	    },
	    legend: {
	        data: ['25分位值', '50分位值','75分位值']
	    },
	    calculable: true,
	    xAxis: [
	        {
	           type: 'category',
		        name:'分公司',
		        data: ['基础设施', '西南分', '华东分', '山东分', 
		        '江苏分', '河南分','安徽分','南方分','安装分','菲律宾分'],
				axisLabel:{
					interval:0
				}
	        }
	    ],
	    yAxis: [
	        {
	            type: 'value',
	            name: '金额'
	        }
	    ],
	    series: [
	        {
	            name: '25分位值',
	            type: 'line',
	            data: [3960,2603,3178,3176,3555,2888,3624,2623,496,415],
	            markPoint: {
	                data: [
	                    {type: 'max', name: '最大值'},
	                    {type: 'min', name: '最小值'}
	                ]
	            },
	            markLine: {
	                data: [
	                    {type: 'average', name: '平均值'}
	                ]
	            }
	        },
	        {
	            name: '50分位值',
	            type: 'line',
	            data: [6647,6561,6262,6871,5580,6234,4172,4786,1178,931],
	            markPoint: {
	                data: [
	                    {type: 'max', name: '最大值'},
	                    {type: 'min', name: '最小值'}
	                ]
	            },
	            markLine: {
	                data: [
	                    {type: 'average', name: '平均值'}
	                ]
	            }
	        },
	        {
	            name: '75分位值',
	            type: 'line',
	            data: [7796,7866,8286,8732,6244,7499,9440,8193,780,694],
	            markPoint: {
	                data: [
	                    {type: 'max', name: '最大值'},
	                    {type: 'min', name: '最小值'}
	                ]
	            },
	            markLine: {
	                data: [
	                    {type: 'average', name: '平均值'}
	                ]
	            }
	        }
	    ]
	};
	
	personal_score_option && myChart.setOption(personal_score_option);
	// 单位人员分位值
	
	
	// 本单位各类人员薪酬结构，与上年对比
	var chartDom = document.getElementById('unit_personal_structure_container');
	var myChart = echarts.init(chartDom);
	var unit_personal_structure_option;
	// 基本工资
	var basicPay = [480,1347,1207,1047,1121,1109,911,1180,930,848];
	// 绩效工资
	var meritPay = [578,570,907,847,783,811,874,978];
	// 单项事项奖罚
	var itemRP =  [147,212,256,370,228,264,222,285];
	// 津补贴
	var subsidies = [109,315,313,355,310,473,428,303];
	// 效益奖金
	var Performance_bonus = [689,1692,1137,1010,897,764,754,730];
	
	var total_pay = function(){
		var pays = [];
		for(var i = 0;i<basicPay.length;i++){
			pays.push(basicPay[i] + meritPay[i] + itemRP[i] + subsidies[i] + Performance_bonus[i]);
		}
		return pays;
	}
	
	unit_personal_structure_option = {
		title:{
			text:'各类人员薪酬结构'
		},
	    tooltip: {
	        trigger: 'axis',
	        axisPointer: {
	            type: 'shadow'
	        }
	    },
	    // toolbox: {
	    //     feature: {
	    //         dataView: {show: true, readOnly: false},
	    //         magicType: {show: true, type: ['line', 'bar']},
	    //         restore: {show: true},
	    //         saveAsImage: {show: true}
	    //     }
	    // },
	    legend: {
	        data: ['基本工资', '绩效工资', '单项事项奖罚','津补贴','效益奖金']
	    },
	    grid: {
	        left: '3%',
	        bottom: '3%',
	        containLabel: true
	    },
	    xAxis: [
	        {
	            type: 'category',
	            data:['领导班子','副总师级','部门经理','部门副经理',
	            '部门助理经理','部门业务经理','部门业务主管',
	            '部门业务主办'],
		        name:'人员层级',
		        axisLabel:{
					interval:0
				}
	        }
	    ],
	    yAxis: [
	        {
	            name: '金额(万元)',
	            type:'value',
	            min: 0,
	            max: 5000,
	            interval: 500,
				splitLine:{
	                    show:false,
	            }
	        }
	    ],
	    series: [
	        {
	            name: '基本工资',
	            type: 'bar',
	            stack: '合计',
	            label: {
	                show: true
	            },
	            emphasis: {
	                focus: 'series'
	            },
	            data:basicPay
	        },
	        {
	            name: '绩效工资',
	            type: 'bar',
	            stack:'合计',
	            label: {
	                show: true
	            },
	            emphasis: {
	                focus: 'series'
	            },
	            data: meritPay
	        },
	        {
	            name: '单项事项奖罚',
	            type: 'bar',
	            stack:'合计',
	            label: {
	                show: true
	            },
	            emphasis: {
	                focus: 'series'
	            },
	            data:itemRP
	        },
	        {
	            name: '津补贴',
	            type: 'bar',
	            stack:'合计',
	            label: {
	                show: true
	            },
	            emphasis: {
	                focus: 'series'
	            },
	            data: subsidies
	        },
	        {
	          name: '效益奖金',
	            type: 'bar',
	            stack:'合计',
	            label: {
	                show: true
	            },
	            emphasis: {
	                focus: 'series'
	            },
	          data: Performance_bonus
	        },
	        {
	              name: '总计',
	              type: 'bar',
	              stack: '合计',
	              label: {
	                  normal: {
	                      show: true,
	                      position: 'insideBottom',
	                      formatter: '{c}',
	                      textStyle: {
	                          color: 'black',
							  fontWeight:'bold'
	                      }
	                  }
	              },
	              itemStyle: {
	                  normal: {
	                      color: 'rgba(128, 128, 128, 0)'
	                  }
	              },
	              data: total_pay()
	         }
	    ]
	};
	unit_personal_structure_option && myChart.setOption(unit_personal_structure_option);
	// 本单位各类人员薪酬结构，与上年对比
	// 各层级人员单独事项奖罚明细
	var chartDom = document.getElementById('particular_rp_container');
	var myChart = echarts.init(chartDom);
	var particular_rp_option;
	
	particular_rp_option = {
		title:{
			text:'项目部各层级人员单独事项奖罚'
		},
	    tooltip: {
	        trigger: 'axis',
	        axisPointer: {
	            type: 'cross',
	            crossStyle: {
	                color: '#999'
	            }
	        }
	    },
		grid: {
			left: '1%',
			bottom: '3%',
			containLabel: true
		},
	    legend: {
	        data: ['CI创优','安全创优','质量创优',
	        '商务创效','过程考核奖励','最终考核兑现','其他奖励','罚款'],
			left:'right'
	    },
	    xAxis: [
	        {
	            type: 'category',
	            data: ['项目经理','项目班子成员','项目部门经理以上','项目一般员工'],
	            axisPointer: {
	                type: 'shadow'
	            },
	             axisLabel:{
					interval:0
				},
				name:'人员层级'
	        }
	    ],
	    yAxis: [
	        {
	            type: 'value',
	            name: '金额(万元)',
	        }
	    ],
	    series: [
	        {
	            name: 'CI创优',
	            type: 'bar',
	            data: [782,933,978,882],
	            label:{
					show:true,
					position:'inside'
				}
	        },{
	            name: '安全创优',
	            type: 'bar',
	            data: [497,426,554,454],
	            label:{
	            	show:true,
	            	position:'top'
	            }
	        },{
	            name: '质量创优',
	            type: 'bar',
	            data: [490,457,458,263],
	            label:{
	            	show:true,
	            	position:'inside'
	            }
	        },{
	            name: '商务创效',
	            type: 'bar',
	            data: [552,429,564,351],
	            label:{
	            	show:true,
	            	position:'top'
	            }
	        },{
	            name: '过程考核奖励',
	            type: 'bar',
	            data: [2143,1670,1150,508],
	            label:{
	            	show:true,
	            	position:'inside'
	            }
	        },{
	            name: '最终考核兑现',
	            type: 'bar',
	            data: [1816,1598,1216,720],
	            label:{
	            	show:true,
	            	position:'top'
	            }
	        },{
	            name: '其它奖励',
	            type: 'bar',
	            data: [714,574,318,132],
	            label:{
	            	show:true,
	            	position:'inside'
	            }
	        },{
	            name: '罚款',
	            type: 'bar',
	            data: [206,152,107,19],
	            label:{
	            	show:true,
	            	position:'top'
	            }
	        }
	    ]
	};
	
	particular_rp_option && myChart.setOption(particular_rp_option);
	// 各层级人员单独事项奖罚明细
	
	// 人才九宫格
	var chartDom = document.getElementById('talnet_sudoku_container');
	var myChart = echarts.init(chartDom);
	var formatUtil = echarts.format;
	var modalData =[
	    {
	        value: 14,
	        name: '公司领导班子',
	        label: {
	            rich: {
	                height: 50,
	            },
	        }
	    },
	    {
	        value: 9,
	        name: '公司副总师级',
	        label: {
			   rich: {
				   height: 50,
			   },
	         }
	     },{
	        value: 12,
	        name: '总部部门经理',
	        label: {
				rich: {
						height: 40,
					}
			},
	    },
	    {
	        value: 8,
	        name: '总部部门副经理',
	        label: {
				rich: {
					height: 50,
				},
				height: 48,
			}
	    },
	    {
	        value: 25,
	        name: '总部部门助理经理',
	        label: {
				rich: {
					img: {
						height: 50,
					},
					height: 55,
				},
			}
	    },
		{
		    value: 67,
		    name: '总部部门业务经理',
		    label: {
				rich: {
					img: {
						height: 50,
					},
					height: 55,
				}
			}
		},
	    {
	        value: 44,
	        name: '总部部门业务主管',
	        label: {
				rich: {
					img: {
						height: 50,
					},
					height: 55,
				}
			}
	    },
	    {
	        value: 56,
	        name: '总部部门业务主办',
	        label: {
	            rich: {
	                img: {
	                    height: 50,
	                },
	                height: 47,
	            },
			}
	    }
	];
	//  [
	//     {
	//         value: 9,
	//         name: '总助级',
	//         label: {
	//             rich: {
	//                 height: 50,
	//             },
	//         }
	//     },
	//     {
	//         value: 69,
	//         name: '部门正副职、M7人员',
	//         label: {
	// 		   rich: {
	// 			   height: 50,
	// 		   },
	//          }
	//      },{
	//         value: 26,
	//         name: '分公司班子',
	//         label: {
	// 			rich: {
	// 					height: 40,
	// 				}
	// 		},
	//     },
	//     {
	//         value: 17,
	//         name: '大项目经理',
	//         label: {
	// 			rich: {
	// 				height: 50,
	// 			},
	// 			height: 48,
	// 		}
	//     },
	// 	{
	// 	    value: 202,
	// 	    name: '项目经理',
	// 	    label: {
	// 			rich: {
	// 				img: {
	// 					height: 50,
	// 				},
	// 				height: 55,
	// 			}
	// 		}
	// 	},
	//     {
	//         value: 683	,
	//         name: '项目核心担当体',
	//         label: {
	// 			rich: {
	// 				img: {
	// 					height: 50,
	// 				},
	// 				height: 55,
	// 			}
	// 		}
	//     },
	//     {
	//         value: 56,
	//         name: '两级总部一般员工',
	//         label: {
	//             rich: {
	//                 img: {
	//                     height: 50,
	//                 },
	//                 height: 47,
	//             },
	// 		}
	//     },
	//     {
	//         value: 3054,
	//         name: '项目部一般员工',
	//         label: {
	// 			rich: {
	// 				img: {
	// 					height: 50,
	// 				},
	// 				height: 55,
	// 			},
	// 		}
	//     }
	// ];
	function getLevelOption() {
	    return [
	        {
	            visualDimension: 0,
	            itemStyle: {
	                color: '#028DD7',
	                borderWidth: 12,
	                borderColor: '#05212c',
	            },
	        },
	        {
	            itemStyle: {
	                borderWidth: 2,
	                borderColor: '#034a50',
	            },
	        },
	    ];
	}
	var talnet_sudoku_option = {
	    tooltip: {
	        formatter: function (info) {
	            var value = info.value;
	            var treePathInfo = info.treePathInfo;
	            var treePath = [];
	            for (var i = 1; i < treePathInfo.length; i++) {
	                treePath.push(treePathInfo[i].name);
	            }
	            return [
	                '<div class="tooltip-title">' + formatUtil.encodeHTML(treePath.join('/')) + '</div>',
	                '人数: ' + formatUtil.addCommas(value) + ' 人',
	            ].join('');
	        },
	    },
	    series: [
	        {
	            name: '人数',
	            type: 'treemap',
	            visibleMin: 300,
	            width: '100%',
	            height: '100%',
	            zoomToNodeRatio: 0.5 * 0.5,
	            upperLabel: {
	                show: false,
	            },
	            label: {
	                fontSize: 14, 
	                show: true,
	                position: [5, 5],
	                formatter: function (params) {
	                    var arr = [
	                        '{association|' + params.data.name + '}',
	                        '{peoNum|' + params.data.value + '}' + '人',
	                        '{img|}',
	                    ];
	                    return arr.join('\n\n');
	                },
	                rich: {
	                    association: {
	                        fontSize: 16,
	                        color: '#fff',
	                    },
	                    peoNum: {
	                        fontSize: 25,
	                        color: '#fff',
	                        fontFamily: 'liquidCrystal',
	                    },
	                },
	            },
	            data: modalData,
	        },
	    ],
	}
	
	talnet_sudoku_option && myChart.setOption(talnet_sudoku_option);
	// 人才九宫格
	
	// 部门考核结果分析
	var chartDom = document.getElementById('assess_dept_container');
	var myChart = echarts.init(chartDom);
	var assess_dept_option;
	
	var modelData = [
		{"deptName":"办公室","semester_score":82,"year_score":92},
		{"deptName":"人力资源部","semester_score":88,"year_score":89},
		{"deptName":"党群工作部","semester_score":80,"year_score":94},
		{"deptName":"纪检监督工作部","semester_score":84,"year_score":91},
		{"deptName":"审计部","semester_score":65,"year_score":77},
		{"deptName":"综合服务中心","semester_score":84,"year_score":85},
		{"deptName":"市场部","semester_score":93,"year_score":87},
		{"deptName":"项目管理部","semester_score":81,"year_score":93},
		{"deptName":"信息中心","semester_score":65,"year_score":91},
		{"deptName":"安全生产监督管理部","semester_score":74,"year_score":80},
		{"deptName":"融投资建造部","semester_score":92,"year_score":84},
		{"deptName":"房地产开发部","semester_score":83,"year_score":81},
		{"deptName":"基础设施事业部","semester_score":79,"year_score":94},
		{"deptName":"财务部","semester_score":79,"year_score":82},
		{"deptName":"资金部","semester_score":80,"year_score":84},
		{"deptName":"商务管理部","semester_score":88,"year_score":90},
		{"deptName":"法律部","semester_score":66,"year_score":76},
		{"deptName":"技术部","semester_score":70,"year_score":78},
		{"deptName":"质量部","semester_score":91,"year_score":84},
		{"deptName":"设计中心","semester_score":84,"year_score":86},
		{"deptName":"海外事业部","semester_score":84,"year_score":79}
	]
	var textColors = [];
	function getData(params){
		var datas = [];
		switch(params){
			case 1:
				for(var i=0;i<modelData.length;i++){
					if(modelData[i].year_score < modelData[i].semester_score){
						modelData[i].color= 'red';
					}else{
						modelData[i].color= 'black';
					}
					datas.push(modelData[i].deptName)
				}
			break;
			case 2:
				for(var i=0;i<modelData.length;i++){
					datas.push(modelData[i].semester_score)
				}
			break;
			case 3:
				for(var i=0;i<modelData.length;i++){
					datas.push(modelData[i].year_score)
				}
			break;
			default:console.log("param not find!");
		}
		return datas;
	}
	assess_dept_option = {
	    title: {
	        text: '部门考核结果分析',
	    },
	    tooltip: {
	        trigger: 'axis',
	        axisPointer: {
	            type: 'shadow'
	        }
	    },
	    legend: {
	        data: ['半年考核得分', '年度考核得分']
	    },
	    grid: {
	        left: '3%',
	        bottom: '3%',
	        containLabel: true
	    },
	    xAxis: {
	        type: 'value',
	        name:'得分'
	    },
	    yAxis: {
	        type: 'category',
	        name: '部门',
	        data: getData(1),
	        axisPointer: {
	            type: 'shadow'
	        },
	        axisLabel:{
				color:function(k){
					for(var i =0;i<modelData.length;i++){
						if(modelData[i].deptName == k){
							return modelData[i].color;
						}
					}
				}
			}
	    },
	    series: [
	        {
	            name: '半年考核得分',
	            type: 'bar',
	            data: getData(2),
	            label:{
	                show:true,
	                position:'right',
					formatter:function(param){
						if(param.data >= 95 & param.data<100){
							return 'A+';
						}else if(param.data >= 90 & param.data < 95){
							return 'A';
						}else if(param.data >= 85 & param.data < 90){
							return 'B+';
						}else if(param.data >= 80 & param.data < 85){
							return 'B';
						}else if(param.data >= 60 & param.data < 80){
							return 'C';
						}else{
							return '不合格';
						}
					}
	            }
	        },
	        {
	            name: '年度考核得分',
	            type: 'bar',
	            data: getData(3),
	            label:{
	                show:true,
	                position:'right',
					formatter:function(param){
						if(param.data >= 95 & param.data<100){
							return 'A+';
						}else if(param.data >= 90 & param.data < 95){
							return 'A';
						}else if(param.data >= 85 & param.data < 90){
							return 'B+';
						}else if(param.data >= 80 & param.data < 85){
							return 'B';
						}else if(param.data >= 60 & param.data < 80){
							return 'C';
						}else{
							return '不合格';
						}
					}
	            }
	        }
	    ]
	};
	
	assess_dept_option && myChart.setOption(assess_dept_option);
	// 部门考核结果分析
	//各层级人员考核分析
	 var chartDom = document.getElementById('asses_personal_container');
	 var myChart = echarts.init(chartDom);
	 var asses_personal_option;
	 
	 asses_personal_option = {
	         calculable: true,
			title: {
	         text: '各层级人员考核分析',
	     },
	     tooltip: {
	         trigger: 'axis'
	     },
	     legend: {
	         data: ['一年内3次及以上考核为A', '一年内2次及以上考核为C']
	     },
	     calculable: true,
	     xAxis: [
	         {
	             type: 'category',
	             name:'人员层级',
	             data: ['一般员工','项目班子','分公司部门正副职','分公司班子','总部部门正副职','总部总助级'],
	 	        axisLabel:{
	 				interval:0
	 			}
	         }
	     ],
	     yAxis: [
	         {
	             type: 'value',
	             name:'人数'
	         }
	     ],
	     series: [
	         {
	             name: '一年内3次及以上考核为A',
	             type: 'bar',
	             data: [195,75,7,6,4,2],
	             label: {
	                 show:true,
	                 position:'top'
	             }
	         },
	         {
	             name: '一年内2次及以上考核为C',
	             type: 'bar',
	             data: [83,35,4,2,2,1],
	               label: {
	                 show:true,
	                 position:'top'
	             }
	         }
	     ]
	 };
	 
	 asses_personal_option && myChart.setOption(asses_personal_option);
	 // 各层级人员考核分析
	 // 项目经理&大项目经理考核分析
	 var chartDom = document.getElementById('asses_projectManganer_container');
	 var myChart = echarts.init(chartDom);
	 var asses_projectManganer_option;
	 
	 asses_projectManganer_option = {
	         calculable: true,
	 
	 title: {
	         text: '项目经理及大项目经理考核分析',
	     },
	     tooltip: {
	         trigger: 'axis'
	     },
	     legend: {
	         data: ['三年内2次及以上考核为A', '三年内2次及以上考核为C']
	     },
	     calculable: true,
	     xAxis: [
	         {
	             type: 'category',
	             name:'人员层级',
	             data: ['项目经理','大项目经理'],
	 	        axisLabel:{
	 				interval:0
	 			}
	         }
	     ],
	     yAxis: [
	         {
	             type: 'value',
	             name:'人数'
	         }
	     ],
	     series: [
	         {
	             name: '三年内2次及以上考核为A',
	             type: 'bar',
	             data: [15,3],
	             label: {
	                 show:true,
	                 position:'top'
	             }
	         },
	         {
	             name: '三年内2次及以上考核为C',
	             type: 'bar',
	             data: [6,8],
	               label: {
	                 show:true,
	                 position:'top'
	             }
	         }
	     ]
	 };
	 
	 asses_projectManganer_option && myChart.setOption(asses_projectManganer_option);
	 // 项目经理&大项目经理考核分析
	// 人员岗位序列分析
	var chartDom = document.getElementById('position_sequence_container');
	var myChart = echarts.init(chartDom);
	var position_sequence_option;
	
	position_sequence_option = {
	    title: {
	        text: '人员岗位序列分析',
	        left: 'center'
	    },
	    tooltip: {
	        trigger: 'item',
			formatter: '{a} <br/>{b}: {c}万 ({d}%)'
	    },
	    legend: {
	        orient: 'vertical',
	        left: 'left',
	    },
	    series: [
	        {
	            name: '人员数量',
	            type: 'pie',
	            radius: '50%',
	            label: {
	                formatter: '{b}:{d}%}  ',
	                fontSize:16,
	                borderWidth: 1,
	                borderRadius: 4
		       },
	            data: [
	                {value: 205, name: '管理序列(M)'},
	                {value: 4161, name: '专业序列(P)'},
	                {value: 143, name: '项目经理序列(V)'},
	                {value: 8, name: '大项目经理序列(W)'},
	                {value: 7, name: '操作序列(O)'}
	            ],
	            emphasis: {
	                itemStyle: {
	                    shadowBlur: 10,
	                    shadowOffsetX: 0,
	                    shadowColor: 'rgba(0, 0, 0, 0.5)'
	                }
	            }
	        }
	    ]
	};
	
	position_sequence_option && myChart.setOption(position_sequence_option);
	// 人员岗位序列分析
	// 人员职级序列分析
	var chartDom = document.getElementById('rank_sequence_container');
	var myChart = echarts.init(chartDom);
	var rank_sequence_option;
	
	rank_sequence_option = {
	    title: {
	        text: '人员岗位序列分析',
			right:'600'
	    },
	    tooltip: {
	        trigger: 'item',
			formatter: '{a} <br/>{b}: {c} ({d}%)'
	    },
	    legend: {
	        orient: 'vertical',
	        left: 'left',
	    },
	    series: [
	        {
	            name: '',
	            type: 'pie',
	            radius: '50%',
	            label: {
	                formatter: '{b}：{d}% ',
	                fontSize:16
		       },
	            data: [
	                {"name":"M10","value":18},
	                {"name":"M11","value":14},
	                {"name":"M12","value":10},
	                {"name":"M13","value":4},
	                {"name":"M14","value":1},
	                {"name":"M15","value":13},
	                {"name":"M16","value":1},
	                {"name":"M17","value":1},
	                {"name":"M18","value":2},
	                {"name":"M2","value":2},
	                {"name":"M4","value":2},
	                {"name":"M5","value":13},
	                {"name":"M6","value":43},
	                {"name":"M7","value":21},
	                {"name":"M8","value":31},
	                {"name":"M9","value":13},
	                {"name":"O","value":4},
	                {"name":"P1","value":245},
	                {"name":"P10","value":243},
	                {"name":"P11","value":45},
	                {"name":"P12","value":7},
	                {"name":"P13","value":18},
	                {"name":"P14","value":9},
	                {"name":"P15","value":1},
	                {"name":"P2","value":2},
	                {"name":"P20","value":1},
	                {"name":"P4","value":405},
	                {"name":"P5","value":192},
	                {"name":"P6","value":39},
	                {"name":"P7","value":693},
	                {"name":"P8","value":579},
	                {"name":"P9","value":102},
	                {"name":"V1","value":129},
	                {"name":"V10","value":1},
	                {"name":"V4","value":20},
	                {"name":"V7","value":1},
	                {"name":"其它","value":2241},
	                
	                ],
	            emphasis: {
	                itemStyle: {
	                    shadowBlur: 10,
	                    shadowOffsetX: 0,
	                    shadowColor: 'rgba(0, 0, 0, 0.5)'
	                }
	            }
	        }
	    ]
	};
	
	rank_sequence_option && myChart.setOption(rank_sequence_option);
	// 人员职级序列分析
	// 各层级人员数据
	var chartDom = document.getElementById('level_personalNums_container');
	var myChart = echarts.init(chartDom);
	var level_personalNums_option;
	
	level_personalNums_option = {
	    title: {
	        text: '各层级人员数量',
	    },
	    tooltip: {
	        trigger: 'axis',
	        axisPointer: {
	            type: 'shadow'
	        }
	    },
	    grid: {
	        left: '3%',
	        bottom: '3%',
	        containLabel: true
	    },
	    xAxis: {
	        type: 'value',
	        boundaryGap: [0, 0.01],
	        name:'人数'
	    },
	    yAxis: {
	        type: 'category',
	        data: ['项目部一般员工', '项目班子成员', '项目经理', '分公司部门业务主办', 
	        '分公司部门业务主管', '分公司部门业务经理','分公司部门副经理',
	        '分公司部门经理','分公司经理','总部部门业务主办','总部部门业务主管','总部部门助理经理',
	        '总部部门副经理','总部部门经理','公司副总师级','公司领导班子'],
	        name:'层级'
	    },
	    series: [
	        {
	            type: 'bar',
	            data: [2623,639,232,311,15,24,22,43,12,208,19,24,11,11,9,16],
				label:{
					show:true,
					position:'right'
				}
				
	        }
	    ]
	};
	
	level_personalNums_option && myChart.setOption(level_personalNums_option);
	// 各层级人员数据
	// 年龄结构
	var chartDom = document.getElementById('age_structure_container');
	var myChart = echarts.init(chartDom);
	var age_structure_option;
	
	age_structure_option = {
		title:{
			text:'年龄结构'
		},
	    legend: {
	        top: 'bottom'
	    },
	    legend:{
	        textStyle:{
	            fontSize:18
	        }
	    },
	    tooltip: {
	        trigger: 'item',
	        formatter: '{a} <br/>{b} : {c} ({d}%)'
	    },
	    series: [
	        {
	            name: '人员数量',
	            type: 'pie',
	            radius: [50, 150],
	            center: ['50%', '50%'],
	            roseType: 'area',
	            label:{
	                fontSize:18,
	                formatter:'{b}：{d}%'
	            },
	            emphasis: {
	                label: {
	                    show: true
	                }
	            },
	            itemStyle: {
	                borderRadius: 8
	            },
	            data: [
	                {value: 1713, name: '30岁以下'},
	                {value: 2115, name: '30-35岁'},
	                {value: 659, name: '35-40岁'},
	                {value: 723, name: '40岁以上'}
	            ]
	        }
	    ]
	};
	
	age_structure_option && myChart.setOption(age_structure_option);
	// 年龄结构
	// 项目经理数量
	var chartDom = document.getElementById('PMnums_container');
	var myChart = echarts.init(chartDom);
	var PMnums_option;
	
	PMnums_option = {
		title:{
			text:'项目经理队伍'
		},
	    tooltip: {
	        trigger: 'axis',
	        axisPointer: {
	            type: 'cross',
	            crossStyle: {
	                color: '#999'
	            }
	        }
	    },
	    legend: {
	        data: ['项目经理数量', '项目数量']
	    },
	    xAxis: [
	        {
	            type: 'category',
	            data: ['基础设施事业部','西南分','华东分','山东分', '江苏分', '河南分','安徽分','南方分','安装分','菲律宾分'],
	            axisPointer: {
	                type: 'shadow'
	            },
	            axisLabel:{
						interval:0
				}
	        }
	    ],
	    yAxis: [
	        {
	            type: 'value',
	            name: '数量',
	            min: 0,
	            max: 100
	        }
	    ],
	    series: [
	        {
	            name: '项目经理数量',
	            type: 'bar',
	            data: [3,20,11,35,44,26,16,30,14,1],
	            label:{
	                show:true,
	                position:'top'
	            }
	        },
	        {
	            name: '项目数量',
	            type: 'bar',
	            data: [5,17,24,52,65,43,25,68,12,3],
	            label:{
	                show:true,
	                position:'top'
	            }
	        }
	    ]
	};
	PMnums_option && myChart.setOption(PMnums_option);
	// 项目经理数量
	// 项目经理持证率
	var chartDom = document.getElementById('PMchizhenlv_container');
	var myChart = echarts.init(chartDom);
	var PMchizhenlv_option;
	
	var ygsdata = [{
	    name: '持证',
	    value: 170
	}, {
	    name: '无证',
	    value: 34
	}];
	var jsfzdata = [{
	    name: '持证',
	    value: 247
	}, {
	    name: '无证',
	    value: 26
	}];
	var bjydata = [{
	    name: '持证',
	    value: 587
	}, {
	    name: '无证',
	    value: 49
	}];
	
	PMchizhenlv_option = {
	    title: [{
	        text: '项目经理持证率',
	        left: 'center',
	    }, {
	        subtext: '一公司项目经理持证率',
	        left: '16.67%',
	        top: '75%',
	        textAlign: 'center',
	        subtextStyle:{
	            fontSize:16,
	            color:'black'
	        }
	    }, {
	        subtext: '建设发展公司项目经理持证率',
	        left: '50%',
	        top: '75%',
	        textAlign: 'center',
	        subtextStyle:{
	            fontSize:16,
	            color:'black'
	        }
	    }, {
	        subtext: '八局一公司项目经理持证率',
	        left: '83.33%',
	        top: '75%',
	        textAlign: 'center',
	        subtextStyle:{
	            fontSize:16,
	            color:'black'
	        }
	    }],
	    tooltip: {
	        trigger: 'item',
			formatter: '{a} <br/>{b}: {c} ({d}%)'
	    },
	    series: [{
	        name:'一公司项目经理持证率',
	        type: 'pie',
	        radius: '50%',
	        center: ['50%', '50%'],
	        data: ygsdata,
	        label: {
	            position: 'outer',
	            alignTo: 'none',
	            bleedMargin: 5,
	            formatter: '{b}：{d}% ',
		        fontSize:14
	        },
	        left: 0,
	        right: '66.6667%',
	        top: 0,
	        bottom: 0
	    }, {
			name:'建设发展公司项目经理持证率',
	        type: 'pie',
	        radius: '50%',
	        center: ['50%', '50%'],
	        data: jsfzdata,
	        label: {
	            position: 'outer',
	            alignTo: 'labelLine',
	            bleedMargin: 5,
	            formatter: '{b}：{d}% ',
		        fontSize:14
	        },
	        left: '33.3333%',
	        right: '33.3333%',
	        top: 0,
	        bottom: 0
	    }, {
			name:'八局一公司项目经理持证率',
	        type: 'pie',
	        radius: '50%',
	        center: ['50%', '50%'],
	        data: bjydata,
	        label: {
	            position: 'outer',
	            alignTo: 'edge',
	            margin: 20,
	            formatter: '{b}：{d}% '
	        },
	        left: '66.6667%',
	        right: 0,
	        top: 0,
	        bottom: 0
	    }]
	};
	
	PMchizhenlv_option && myChart.setOption(PMchizhenlv_option);
	// 项目经理持证率
	// 项目经理学历情况
	var chartDom = document.getElementById('PM_edu_container');
	var myChart = echarts.init(chartDom);
	var PM_edu_option;
	
	var xmjldata = [{
	    name: '硕士研究生',
	    value: 2
	}, {
	    name: '大学本科',
	    value: 91
	}, {
	    name: '大学专科',
	    value: 71
	}, {
	    name: '中等专科',
	    value: 23
	}, {
	    name: '高中',
	    value: 11
	}, {
	    name: '职业高中',
	    value: 1
	}];
	
	var zsygdata = [{
	    name: '硕士研究生',
	    value: 122
	}, {
	    name: '大学本科',
	    value: 2152
	}, {
	    name: '大学专科',
	    value: 675
	}, {
	    name: '中等专科',
	    value: 148
	}, {
	    name: '高中',
	    value: 117
	}, {
	    name: '职业高中',
	    value: 10
	}];
	var xmbanzidata = [{
	    name: '硕士研究生',
	    value: 8
	}, {
	    name: '大学本科',
	    value: 319
	}, {
	    name: '大学专科',
	    value: 266
	}, {
	    name: '中等专科',
	    value: 48
	}, {
	    name: '高中',
	    value: 33
	}, {
	    name: '职业高中',
	    value: 1
	}];
	PM_edu_option = {
	    title: [{
	        text: '项目经理学历情况',
	        left: 'center',
	    }, {
	        subtext: '项目经理学历情况',
	        left: '16.67%',
	        top: '75%',
	        textAlign: 'center',
	        subtextStyle:{
	            fontSize:16,
	            color:'black'
	        }
	    }, {
	        subtext: '项目班子学历情况',
	        left: '50%',
	        top: '75%',
	        textAlign: 'center',
	        subtextStyle:{
	            fontSize:16,
	            color:'black'
	        }
	    }, {
	        subtext: '公司正式员工学历情况',
	        left: '83.33%',
	        top: '75%',
	        textAlign: 'center',
	        subtextStyle:{
	            fontSize:16,
	            color:'black'
	        }
	    }],
	    tooltip: {
	        trigger: 'item',
			formatter: '{a} <br/>{b}: {c} ({d}%)'
	    },
	    series: [{
	        name:'人数',
	        type: 'pie',
	        radius: '50%',
	        center: ['50%', '50%'],
	        data: xmjldata,
	        label: {
	            position: 'outer',
	            alignTo: 'none',
	            bleedMargin: 5,
	            formatter: '{b}：{d}% ',
		        fontSize:14
	        },
	        left: 0,
	        right: '66.6667%',
	        top: 0,
	        bottom: 0
	    }, {
	        name:'人数',
	        type: 'pie',
	        radius: '50%',
	        center: ['50%', '50%'],
	        data: xmbanzidata,
	        label: {
	            position: 'outer',
	            alignTo: 'none',
	            bleedMargin: 5,
	            formatter: '{b}：{d}% ',
		        fontSize:14
	        },
	        left: '33.3333%',
	        right: '33.3333%',
	        top: 0,
	        bottom: 0
	    }, {
	        name:'人数',
	        type: 'pie',
	        radius: '50%',
	        center: ['50%', '50%'],
	        data: zsygdata,
	        label: {
	            position: 'outer',
	            margin: 20,
	            formatter: '{b}：{d}% ',
		        fontSize:14
	        },
	        left: '66.6667%',
	        right: 0,
	        top: 0,
	        bottom: 0
	    }]
	};
	
	PM_edu_option && myChart.setOption(PM_edu_option);
	// 项目经理学历情况
	// 业绩情况
	var chartDom = document.getElementById('PM_performance_container');
	var myChart = echarts.init(chartDom);
	var PM_performance_option;
	
	PM_performance_option = {
	
	    title: {
	        text: '项目经理业绩情况',
	        left: 'left',
	        top: 20,
	        left:40
	    },
	
	    tooltip: {
	        trigger: 'item'
	    },
	    legend:{
	        
	    },
	    series: [
	        {
	            name: '',
	            type: 'pie',
	            radius: '55%',
	            center: ['50%', '50%'],
	            data: [
	                {value: 25, name: '项目超盈利3%以上人数'},
	                {value: 10, name: '项目亏损人数'}
	            ],
	            label: {
	                position: 'outer',
	                formatter: '{b}：{c}% ',
	                fontSize:14
	            },
	            labelLine: {
	                lineStyle: {
	                    color: 'gray'
	                }
	            }
	        }
	    ]
	};
	
	PM_performance_option && myChart.setOption(PM_performance_option);
	// 业绩情况
	// 远航后备情况
	var chartDom = document.getElementById('sailing_backup_container');
	var myChart = echarts.init(chartDom);
	var sailing_backup_option;
	
	sailing_backup_option = {
	    title: {
	        text: '远航后备情况',
	    },
	    tooltip: {
	        trigger: 'axis',
	        axisPointer: {
	            type: 'shadow'
	        }
	    },
	    grid: {
	        left: '3%',
	        right: '4%',
	        bottom: '3%',
	        containLabel: true
	    },
	    xAxis: {
	        type: 'value',
	        boundaryGap: [0, 0.01],
	        name:'人数'
	    },
	    yAxis: {
	        type: 'category',
	        data: ['项目经理后备',' 总工程师后备',' 商务经理后备'
	        ,'现场经理后备',' 执行经理后备',' 机电经理后备'
	        ,'安全总监后备','质量总监后备'],
	        name:'后备岗位'
	    },
	    series: [
	        {
	            name: '数量',
	            type: 'bar',
	            data: [35,64,64,70,50,46,39,39],
	            label:{
	                show:true,
	                position:'right'
	            }
	        },
	    ]
	};
	
	sailing_backup_option && myChart.setOption(sailing_backup_option);
	// 远航后备情况
	// 扬帆精英人才
	var chartDom = document.getElementById('setsail_elite_container');
	var myChart = echarts.init(chartDom);
	var setsail_elite_option;
	
	setsail_elite_option = {
	    title: {
	        text: '各单位扬帆精英人才',
	    },
	    tooltip: {
	        trigger: 'axis',
	        axisPointer: {
	            type: 'shadow'
	        }
	    },
	    grid: {
	        left: '3%',
	        bottom: '3%',
	        containLabel: true
	    },
	    xAxis: {
	        type: 'value',
	        boundaryGap: [0, 0.01],
	        name:'人数'
	    },
	    yAxis: {
	        type: 'category',
	        data: ['公司总部','基础设施事业部','西南分','华东分','山东分', '江苏分', '河南分','安徽分','南方分','安装分','菲律宾分'],
	        name:'分公司'
	    },
	    series: [
	        {
	            name: '数量',
	            type: 'bar',
	            data: [95,39,124,87,132,261,181,107,184,47,12],
	            label:{
	                show:true,
	                position:'right'
	            },
	            itemStyle: {
	             	normal: {
	                	color: '#9edf7f'
	            	}
	        	},
	        },
	    ]
	};
	
	setsail_elite_option && myChart.setOption(setsail_elite_option);
	// 扬帆精英人才
	// 专业人才库
	var chartDom = document.getElementById('professional_talent_pool_container');
	var myChart = echarts.init(chartDom);
	var professional_talent_pool_option;
	
	professional_talent_pool_option = {
	    title: {
	        text: '专业人才占比',
	        left: 'center'
	    },
	    tooltip: {
	        trigger: 'item',
	        formatter: '{a} <br/>{b}: {c} ({d}%)'
	    },
	    legend: {
	        orient: 'vertical',
	        left: 'left',
	        textStyle:{
	            fontSize:16
	        }
	    },
	    series: [
	        {
	            name: '人数',
	            type: 'pie',
	            radius: '60%',
	            data: [
	                {value: 485, name: 'TOPN人才'},
	                {value: 269, name: 'EPC人才'},
	                {value: 79, name: '海外人才'},
	                {value: 284, name: '基础设施人才'},
	                {value: 160, name: '融投资人才'},
	                {value: 78, name: '海外意愿人才'},
	                {value: 578, name: 'BIM人才'}
	            ],
	            label:{
	                formatter:'{b}：{d}%',
	                fontSize:16
	            },
	            emphasis: {
	                itemStyle: {
	                    shadowBlur: 10,
	                    shadowOffsetX: 0,
	                    shadowColor: 'rgba(0, 0, 0, 0.5)'
	                }
	            }
	        }
	    ]
	};
	
	professional_talent_pool_option && myChart.setOption(professional_talent_pool_option);
	// 专业人才库
	// 内部课程资源数量
	
	// 内部课程资源数量
	// 各分公司内训师数量
	var chartDom = document.getElementById('internal_trainer_container');
	var myChart = echarts.init(chartDom);
	var internal_trainer_option;
	
	internal_trainer_option = {
	    title: {
	        text: '各单位内训师数量',
	    },
	    tooltip: {
	        trigger: 'axis',
	        axisPointer: {
	            type: 'shadow'
	        }
	    },
	    grid: {
	        left: '3%',
	        bottom: '3%',
	        containLabel: true
	    },
	    xAxis: {
	        type: 'value',
	        boundaryGap: [0, 0.01],
	        name:'人数'
	    },
	    yAxis: {
	        type: 'category',
	        data: ['公司总部','基础设施事业部','西南分','华东分','山东分', '江苏分', '河南分','安徽分','南方分','安装分','菲律宾分'],
	        name:'单位'
	    },
	    series: [
	        {
	            name: '数量',
	            type: 'bar',
	            data: [12,35,64,64,70,50,46,39,39,13,6],
	            label:{
	                show:true,
	                position:'right'
	            },
	            itemStyle: {
	             	normal: {
	                	color: '#9FE080'
	            	}
	        	},
	        },
	    ]
	};
	
	internal_trainer_option && myChart.setOption(internal_trainer_option);
	// 各分公司内训师数量
	// 离职率分析
	var chartDom = document.getElementById('dimission_analyse_container');
	var myChart = echarts.init(chartDom);
	var dimission_analyse_option;
	
	dimission_analyse_option = {
	    title: {
	        text: '离职率分析'
	    },
	    tooltip: {
	        trigger: 'axis',
	        formatter: '{a} <br/>{b}: {c}%'
	    },
	    xAxis: {
	        type: 'category',
	        boundaryGap: false,
	        data: ['整体人员离职率','自有员工离职率','关键员工离职率',
	        '5年内校招生离职率','司龄5年以上员工离职率'],
	        name:'维度'
	    },
	    yAxis: {
	        type: 'value',
	        axisLabel: {
	            formatter: '{value}%'
	        },
	        name:'离职率'
	    },
	    series: [
	        {
	            name: '',
	            type: 'line',
	            data: [12, 13, 7, 11,9],
	            label:{
	                show:true,
	                formatter:'{c}%'
	            }
	        }
	    ]
	};
	
	dimission_analyse_option && myChart.setOption(dimission_analyse_option);
	// 离职率分析
	// 离职原因分布
	var chartDom = document.getElementById('reasonsForLeave_container');
	var myChart = echarts.init(chartDom);
	var reasonsForLeave_option;
	
	var reasonsForLeave_option = {
	    legend: {},
	    tooltip: {},
	    title: [{
	        text: '离职原因分布',
	        left: 'left',
	    }, {
	        subtext: '整体人员离职原因分布',
	        subtextStyle:{
	            color:'black',
	            fontSize:14
	        },
	        left: '25%',
	        top: '47%',
	        textAlign: 'center'
	    }, {
	        subtext: '自有员工离职原因分布',
	        subtextStyle:{
	            color:'black',
	            fontSize:14
	        },
	        left: '75%',
	        top: '47%',
	        textAlign: 'center'
	    }, {
	        subtext: '关键员工离职原因分布',
	        subtextStyle:{
	            color:'black',
	            fontSize:14
	        },
	        left: '25%',
	        top: '93%',
	        textAlign: 'center'
	    }, {
	        subtext: '5年内校招生离职原因分布',
	        subtextStyle:{
	            color:'black',
	            fontSize:14
	        },
	        left: '75%',
	        top: '93%',
	        textAlign: 'center'
	    }],
	    series: [{
	        type: 'pie',
	        radius: '30%',
	        center: ['25%', '30%'],
			data:[
				{"value":90,"name":"薪酬原因"},
				{"value":41,"name":"家庭原因"},
				{"value":24,"name":"企业文化"},
				{"value":13,"name":"上下级和同事关系"},
				{"value":55,"name":"职业发展"},
				{"value":7,"name":"工作艰苦"},
				{"value":16,"name":"更换行业"},
				{"value":13,"name":"其它"},

				],
				itemStyle:{
					normal:{ 
						label:{ 
							show: true, 
							formatter: '{b} : {c} ({d}%)' 
						}, 
						labelLine :{show:true} 
					} 
				}
	    }, {
	        type: 'pie',
	        radius: '30%',
	        center: ['75%', '30%'],
			data:[
			{"value":43,"name":"薪酬原因"},
			{"value":22,"name":"家庭原因"},
			{"value":30,"name":"企业文化"},
			{"value":26,"name":"上下级和同事关系"},
			{"value":61,"name":"职业发展"},
			{"value":4,"name":"工作艰苦"},
			{"value":54,"name":"更换行业"},
			{"value":14,"name":"其它"},

			],
			itemStyle:{
				normal:{ 
					label:{ 
						show: true, 
						formatter: '{b} : {c} ({d}%)' 
					}, 
					labelLine :{show:true} 
				} 
			}
	    }, {
	        type: 'pie',
	        radius: '30%',
	        center: ['25%', '75%'],
			data:[
				{"value":17,"name":"薪酬原因"},
				{"value":25,"name":"家庭原因"},
				{"value":17,"name":"企业文化"},
				{"value":4,"name":"上下级和同事关系"},
				{"value":19,"name":"职业发展"},
				{"value":2,"name":"工作艰苦"},
				{"value":8,"name":"更换行业"},
				{"value":24,"name":"其它"},

			],
			itemStyle:{
				normal:{ 
					label:{ 
						show: true, 
						formatter: '{b} : {c} ({d}%)' 
					}, 
					labelLine :{show:true} 
				} 
			}
	    }, {
	        type: 'pie',
	        radius: '30%',
	        center: ['75%', '75%'],
			data:[
				{"value":60,"name":"薪酬原因"},
				{"value":8,"name":"家庭原因"},
				{"value":88,"name":"企业文化"},
				{"value":54,"name":"上下级和同事关系"},
				{"value":52,"name":"职业发展"},
				{"value":11,"name":"工作艰苦"},
				{"value":97,"name":"更换行业"},
				{"value":48,"name":"其它"},

			],
			itemStyle:{
				normal:{ 
					label:{ 
						show: true, 
						formatter: '{b} : {c} ({d}%)' 
					}, 
					labelLine :{show:true} 
				} 
			}
	    }]
	};
	reasonsForLeave_option && myChart.setOption(reasonsForLeave_option);
	// 离职原因分布
	// 离职去向分布
	var chartDom = document.getElementById('dimission_levaveto_container');
	var myChart = echarts.init(chartDom);
	var dimission_levaveto_ption;
	
	var dimission_levaveto_option = {
		    legend: {},
		    tooltip: {},
		    title: [{
		        text: '离职去向分布',
		        left: 'left',
		    }, {
		        subtext: '整体人员离职去向分布',
		        subtextStyle:{
		            color:'black',
		            fontSize:14
		        },
		        left: '25%',
		        top: '50%',
		        textAlign: 'center'
		    }, {
		        subtext: '自有员工离职去向分布',
		        subtextStyle:{
		            color:'black',
		            fontSize:14
		        },
		        left: '75%',
		        top: '47%',
		        textAlign: 'center'
		    }, {
		        subtext: '关键员工离职去向分布',
		        subtextStyle:{
		            color:'black',
		            fontSize:14
		        },
		        left: '25%',
		        top: '93%',
		        textAlign: 'center'
		    }, {
		        subtext: '5年内校招生离职去向分布',
		        subtextStyle:{
		            color:'black',
		            fontSize:14
		        },
		        left: '75%',
		        top: '93%',
		        textAlign: 'center'
		    }],
		    series: [{
		        type: 'pie',
		        radius: '30%',
		        center: ['25%', '30%'],
				data:[
	                {"value":75,"name":"中建系统内"},
	                {"value":85,"name":"中建一局"},
	                {"value":11,"name":"政府机关/事业单位"},
	                {"value":23,"name":"其他央企"},
	                {"value":13,"name":"升学或考研"},
	                {"value":57,"name":"民营企业"},
	                {"value":50,"name":"自主创业"},
	                {"value":57,"name":"其它"},
	                ],
					itemStyle:{
						normal:{ 
							label:{ 
								show: true, 
								formatter: '{b} : {c} ({d}%)' 
							}, 
							labelLine :{show:true} 
						} 
					}
		    }, {
		        type: 'pie',
		        radius: '30%',
		        center: ['75%', '30%'],
				data:[
	            {"value":36,"name":"中建系统内"},
	            {"value":58,"name":"中建一局"},
	            {"value":57,"name":"政府机关/事业单位"},
	            {"value":31,"name":"其他央企"},
	            {"value":15,"name":"升学或考研"},
	            {"value":33,"name":"民营企业"},
	            {"value":43,"name":"自主创业"},
	            {"value":36,"name":"其它"},
	            
	            ],
				itemStyle:{
					normal:{ 
						label:{ 
							show: true, 
							formatter: '{b} : {c} ({d}%)' 
						}, 
						labelLine :{show:true} 
					} 
				}
		    }, {
		        type: 'pie',
		        radius: '30%',
		        center: ['25%', '75%'],
				data:[
	                {"value":31,"name":"中建系统内"},
	                {"value":4,"name":"中建一局"},
	                {"value":9,"name":"政府机关/事业单位"},
	                {"value":12,"name":"其他央企"},
	                {"value":4,"name":"升学或考研"},
	                {"value":25,"name":"民营企业"},
	                {"value":32,"name":"自主创业"},
	                {"value":26,"name":"其它"},
	                
	                ],
				itemStyle:{
					normal:{ 
						label:{ 
							show: true, 
							formatter: '{b} : {c} ({d}%)' 
						}, 
						labelLine :{show:true} 
					} 
				}
		    }, {
		        type: 'pie',
		        radius: '30%',
		        center: ['75%', '75%'],
				data:[
	                {"value":8,"name":"中建系统内"},
	                {"value":5,"name":"中建一局"},
	                {"value":16,"name":"政府机关/事业单位"},
	                {"value":12,"name":"其他央企"},
	                {"value":23,"name":"升学或考研"},
	                {"value":47,"name":"民营企业"},
	                {"value":23,"name":"自主创业"},
	                {"value":135,"name":"其它"},
	            ],
				itemStyle:{
					normal:{ 
						label:{ 
							show: true, 
							formatter: '{b} : {c} ({d}%)' 
						}, 
						labelLine :{show:true} 
					} 
				}
		    }]
		};
		dimission_levaveto_option && myChart.setOption(dimission_levaveto_option);
	// 离职去向分布
	// 合同签订情况
	var chartDom = document.getElementById('contract_analyse_container');
	var myChart = echarts.init(chartDom);
	var contract_analyse_option;
	
	var fixed_term_data = [198,8, 202, 139, 217, 376, 253,237,233,123,14];
		var non_fixed_term_data = [33,1, 2, 13, 17, 36, 4,5,12,24,3];
		var hire_agreement_data = [19,9, 24, 8, 14, 6, 24,19,3,17,2];
		
		var total_emps = function(){
			var totals = [];
			for(var i = 0;i<fixed_term_data.length;i++){
				totals.push(fixed_term_data[i] + non_fixed_term_data[i]+hire_agreement_data[i]);
			}
			return totals;
		}
		
		var contract_analyse_option;
		contract_analyse_option = {
		    title: {
		        text: '合同签订情况'
		    },
		    tooltip: {
		        trigger: 'axis',
		        axisPointer: {
		            type: 'shadow'
		        }
		    },
		    legend: {
		        data: ['签订固定期限人数', '签订无固定期限人数','签订返聘协议人数']
		    },
		    xAxis: {
		        type: 'category',
		        name:'分公司',
		        data: ['公司总部','基础设施事业部', '西南分', '华东分', '山东分', 
		        '江苏分', '河南分','安徽分','南方分','安装分','菲律宾分'],
				axisLabel:{
					interval:0
				}
		    },
		    yAxis: {
				type: 'value',
				min:0,
				max:500,
				interval: 50,
				name:'人数'
		    },
		    series: [
				 {
					name: '签订固定期限人数',
					type: 'bar',
					stack: 'total',
					label: {
						show: true
					},
					emphasis: {
						focus: 'series'
					},
					data: fixed_term_data
				},
				{
					name: '签订无固定期限人数',
					type: 'bar',
					stack: 'total',
					label: {
						show: true,
					},
					emphasis: {
						focus: 'series'
					},
					data: non_fixed_term_data
				},
				{
					name: '签订返聘协议人数',
					type: 'bar',
					stack: 'total',
					label: {
						show: true,
					},
					emphasis: {
						focus: 'series'
					},
					data: hire_agreement_data
				},
		        {
		              name: '总计',
		              type: 'bar',
		              stack: 'total',
		              label: {
		                  normal: {
		                      show: true,
		                      position: 'insideBottom',
		                      formatter: '{c}',
		                      textStyle: {
		                          color: 'black',
								  fontWeight:'bold'
		                      }
		                  }
		              },
		              itemStyle: {
		                  normal: {
		                      color: 'rgba(128, 128, 128, 0)'
		                  }
		              },
		              data: total_emps()
		         }
		    ]
		};
	
	contract_analyse_option &&  myChart.setOption(contract_analyse_option);
	// 合同签订情况