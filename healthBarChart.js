function showEntertainmentChart() {
  const container = document.getElementById("barChartContainer");
  container.style.display = "block";
  container.scrollIntoView({ behavior: 'smooth' });

  d3.select("#barChartContainer").select("svg").remove(); // 清除旧图
  d3.select(".tooltip").remove(); // 清除旧 tooltip

  const margin = { top: 50, right: 100, bottom: 100, left: 60 },
        width = 600 - margin.left - margin.right,
        height = 400 - margin.top - margin.bottom;

  const svg = d3.select("#barChartContainer").append("svg")
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom);

  const chartArea = svg.append("g")
      .attr("transform", `translate(${margin.left},${margin.top})`);

  // Tooltip div
  const tooltip = d3.select("body")
    .append("div")
    .attr("class", "tooltip")
    .style("position", "absolute")
    .style("background", "#333")
    .style("color", "#fff")
    .style("padding", "6px 10px")
    .style("border-radius", "4px")
    .style("font-size", "12px")
    .style("display", "none")
    .style("z-index", "1000");

  let clicked = false;

  d3.csv("data/Entertainment_Usage_Breakdown.csv", function(data) {
    const keys = ["Male", "Female"];

    // 转换数值字段
    data.forEach(d => {
      keys.forEach(k => d[k] = +d[k]);
    });

    const x = d3.scale.ordinal()
      .domain(data.map(d => d.Category))
      .rangeRoundBands([0, width], 0.1);

    const y = d3.scale.linear()
      .domain([0, d3.max(data, d => d.Male + d.Female)])
      .range([height, 0]);

    const color = d3.scale.ordinal()
      .domain(keys)
      .range(["#36A2EB", "#D5BA4C"]);

    // 创建堆叠数据
    const stackedData = [];
    data.forEach(d => {
      let y0 = 0;
      keys.forEach(k => {
        stackedData.push({
          category: d.Category,
          key: k,
          value: d[k],
          y0: y0,
          y1: y0 + d[k]
        });
        y0 += d[k];
      });
    });

    chartArea.selectAll(".bar")
      .data(stackedData)
      .enter().append("rect")
      .attr("x", d => x(d.category))
      .attr("y", d => y(d.y1))
      .attr("height", d => y(d.y0) - y(d.y1))
      .attr("width", x.rangeBand())
      .attr("fill", d => color(d.key))
      .on("mouseover", function (e, d) {
        if (!clicked) {
          tooltip
            .style("display", "block")
            .html(`<strong>${d.category}</strong><br>${d.key}: ${d.value} people`);
        }
      })
      .on("mousemove", function (e) {
        if (!clicked) {
          tooltip
            .style("left", (e.pageX + 10) + "px")
            .style("top", (e.pageY - 20) + "px");
        }
      })
      .on("mouseout", function () {
        if (!clicked) tooltip.style("display", "none");
      })
      .on("click", function (e, d) {
        clicked = true;
        tooltip
          .style("display", "block")
          .style("left", (e.pageX + 10) + "px")
          .style("top", (e.pageY - 20) + "px")
          .html(`<strong>${d.category}</strong><br><strong>${d.key}</strong>: ${d.value} people`);
      });

    // 按 ESC 清除点击效果
    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape") {
        clicked = false;
        tooltip.style("display", "none");
      }
    });

    // 添加 X 轴
    chartArea.append("g")
      .attr("transform", `translate(0,${height})`)
      .call(d3.svg.axis().scale(x).orient("bottom"))
      .selectAll("text")
      .style("text-anchor", "end")
      .attr("dx", "-0.8em")
      .attr("dy", "0.15em")
      .attr("transform", "rotate(-40)");

    // 添加 Y 轴
    chartArea.append("g")
      .call(d3.svg.axis().scale(y).orient("left"));

    // 添加标题
    svg.append("text")
      .attr("x", (width + margin.left + margin.right) / 2)
      .attr("y", 30)
      .attr("text-anchor", "middle")
      .style("font-size", "16px")
      .text("Entertainment Usage by Gender");

    // 图例（右上角）
    const legend = svg.selectAll(".legend")
      .data(keys)
      .enter().append("g")
      .attr("transform", (d, i) => `translate(${width - 0},${i * 20})`);

    legend.append("rect")
      .attr("x", 0)
      .attr("width", 14)
      .attr("height", 14)
      .attr("fill", d => color(d));

    legend.append("text")
      .attr("x", 20)
      .attr("y", 12)
      .style("font-size", "12px")
      .text(d => d);
  });
}



  document.getElementById("closeChart").onclick = function () {
    document.getElementById("barChartContainer").style.display = "none";
    d3.select("#barChartContainer").select("svg").remove();
    d3.selectAll(".tooltip").remove();
  };
  

//   function showEntertainmentChart() {
//     showBarChart("data/Entertainment_Usage_Breakdown.csv", "Entertainment Usage by Gender");
//   }
  
//   function showCommunicationChart() {
//     showBarChart("data/Communication.csv", "Communication Usage by Gender");
//   }
  
//   function showUtilityChart() {
//     showBarChart("data/Utility.csv", "Utility Usage by Gender");
//   }
  