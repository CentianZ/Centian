// chart-internet.js — 纯 D3.js v7 实现版本

const ageData = {
    "Internet Accessibility None": {
      labels: ["16-24", "25-34", "35-44", "45-54", "55-64", "65+"],
      values: [12, 7, 18, 36, 82, 451]
    },
    "Internet Accessibility Limited": {
      labels: ["16-24", "25-34", "35-44", "45-54", "55-64", "65+"],
      values: [407, 656, 613, 538, 468, 900]
    },
    "Internet Accessibility Full": {
      labels: ["16-24", "25-34", "35-44", "45-54", "55-64", "65+"],
      values: [63, 61, 64, 67, 33, 15]
    }
  };
  
  function handleNodeClick(name) {
    if (ageData[name]) {
      showInternetBarChart(name);
    }
  }

  function showInternetBarChart(title) {
    const dataObj = ageData[title];
    if (!dataObj) return;
  
    const labels = dataObj.labels;
    const values = dataObj.values;
    const data = labels.map((label, i) => ({ label, value: values[i] }));
  
    // 清空旧图表并显示容器
    const container = d3.select("#barChartContainer");
    container.style("display", "block").html("");
  
    // 添加退出按钮
    container.append("button")
      .text("✖ Close")
      .style("float", "right")
      .style("margin-bottom", "10px")
      .on("click", () => container.style("display", "none"));
  
    // 设置画布
    const margin = { top: 60, right: 30, bottom: 60, left: 100 },
          width = 700 - margin.left - margin.right,
          height = 400 - margin.top - margin.bottom;
  
    const svg = container
      .append("svg")
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom)
      .append("g")
      .attr("transform", `translate(${margin.left},${margin.top})`);
  
    const x = d3.scaleLinear()
      .domain([0, d3.max(data, d => d.value)])
      .range([0, width]);
  
    const y = d3.scaleBand()
      .domain(data.map(d => d.label))
      .range([0, height])
      .padding(0.1);
  
    // Tooltip
    const tooltip = d3.select("body").append("div")
      .attr("class", "tooltip")
      .style("background", "white")
      .style("border", "1px solid #ccc")
      .style("padding", "6px 10px")
      .style("font-size", "12px")
      .style("pointer-events", "none")
      .style("opacity", 0)
      .style("position", "absolute")
    .style("z-index", "9999")
                ;   
  
    // Bars
    svg.selectAll("rect")
      .data(data)
      .enter().append("rect")
      .attr("x", 0)
      .attr("y", d => y(d.label))
      .attr("width", d => x(d.value))
      .attr("height", y.bandwidth())
      .attr("fill", "#3498db")
      .on("mouseover", (event, d) => {
        tooltip.transition().duration(100).style("opacity", 1);
        tooltip.html(`<strong>${d.label}</strong>: ${d.value} people`)
          .style("left", (event.pageX + 10) + "px")
          .style("top", (event.pageY - 20) + "px");
      })
      .on("mousemove", event => {
        tooltip
          .style("left", (event.pageX + 10) + "px")
          .style("top", (event.pageY - 20) + "px");
      })
      .on("mouseout", () => {
        tooltip.transition().duration(100).style("opacity", 0);
      });
  
    // X Axis
    svg.append("g")
      .attr("transform", `translate(0, ${height})`)
      .call(d3.axisBottom(x))
      .append("text")
      .attr("x", width / 2)
      .attr("y", 40)
      .attr("fill", "#000")
      .style("text-anchor", "middle")
      .text("People");
  
    // Y Axis
    svg.append("g")
      .call(d3.axisLeft(y))
      .append("text")
      .attr("transform", "rotate(-90)")
      .attr("x", -height / 2)
      .attr("y", -80)
      .attr("fill", "#000")
      .style("text-anchor", "middle")
      .text("Age Group");
  
    // Title
    svg.append("text")
      .attr("x", width / 2)
      .attr("y", -20)
      .attr("text-anchor", "middle")
      .style("font-size", "18px")
      .style("font-weight", "bold")
      .text(title);
  }
  
  