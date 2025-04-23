 

  document.getElementById("closeChart").onclick = function () {
    document.getElementById("barChartContainer").style.display = "none";
    d3.select("#barChartContainer").select("svg").remove();
    d3.selectAll(".tooltip").remove();
  };
  

  function showEntertainmentChart() {
    const container = document.getElementById("barChartContainer");
    container.style.display = "block";
    container.scrollIntoView({ behavior: 'smooth' });
  
    d3.select("#barChartContainer").select("svg").remove(); // Remove previous chart
    d3.select(".tooltip").remove(); // Remove old tooltip
  
    const margin = { top: 50, right: 100, bottom: 120, left: 60 },
          width = 600 - margin.left - margin.right,
          height = 500 - margin.top - margin.bottom;
  
    const svg = d3.select("#barChartContainer").append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom);

    svg.append("text")
  .attr("x", (width + margin.left + margin.right) / 2)
  .attr("y", margin.top / 2)
  .attr("text-anchor", "middle")
  .style("font-size", "18px")
  .style("font-weight", "bold")
  .text("Online entertainment activities for the elderly");

  
    const chartArea = svg.append("g")
        .attr("transform", `translate(${margin.left},${margin.top})`);
  
    const tooltip = d3.select("body")
      .append("div")
      .attr("class", "tooltip")
      .style("position", "absolute")
      .style("opacity", 0)
      .style("background-color", "white")
      .style("border", "solid")
      .style("border-width", "2px")
      .style("border-radius", "5px")
      .style("padding", "6px 10px")
      .style("font-size", "12px")
      .style("pointer-events", "none");
  
    d3.csv("data/Entertainment_Usage_Breakdown.csv", function(data) {
      const keys = ["Male", "Female"];
  
      data.forEach(d => {
        keys.forEach(k => d[k] = +d[k]);
      });
  
      
      // Sort data by total (Male + Female) in descending order
    data.sort((a, b) => (b.Male + b.Female) - (a.Male + a.Female));

    // X Axis after sorting
    const x = d3.scale.ordinal()
      .domain(data.map(d => d.Category))
      .rangeRoundBands([0, width], 0.1);

  
      const y = d3.scale.linear()
        .domain([0, d3.max(data, d => d.Male + d.Female)])
        .range([height, 0]);
  
      const color = d3.scale.ordinal()
        .domain(keys)
        .range(["#36A2EB", "#D5BA4C"]);
  
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
        .style("stroke", "none")
        .style("opacity", 0.85)
        .on("mouseover", function(d) {
          tooltip.transition().duration(200).style("opacity", 1);
          d3.select(this)
            .style("stroke", "black")
            .style("stroke-width", 1.5)
            .style("opacity", 1);
          tooltip.html(`<strong>${d.category}</strong><br>${d.key}: ${d.value} people`)
            .style("left", (d3.event.pageX + 10) + "px")
            .style("top", (d3.event.pageY - 20) + "px");
        })
        .on("mousemove", function(d) {
          tooltip.style("left", (d3.event.pageX + 10) + "px")
                 .style("top", (d3.event.pageY - 20) + "px");
        })
        .on("mouseleave", function(d) {
          tooltip.transition().duration(200).style("opacity", 0);
          d3.select(this)
            .style("stroke", "none")
            .style("opacity", 0.85);
        });
  
      // X Axis
      chartArea.append("g")
        .attr("transform", `translate(0,${height})`)
        .call(d3.svg.axis().scale(x).orient("bottom"))
        .selectAll("text")
        .attr("transform", "rotate(-40)")
        .style("text-anchor", "end");
  
      // Y Axis
      chartArea.append("g")
        .call(d3.svg.axis().scale(y).orient("left"));
  
      // Legend
      const legend = chartArea.selectAll(".legend")
        .data(keys)
        .enter().append("g")
        .attr("transform", (d, i) => `translate(0,${i * 20})`);
  
      legend.append("rect")
        .attr("x", width + 20)
        .attr("width", 15)
        .attr("height", 15)
        .style("fill", d => color(d));
  
      legend.append("text")
        .attr("x", width + 40)
        .attr("y", 12)
        .text(d => d);
    });
  }
  
 
  
  function showCommunicationChart() {

    const container = document.getElementById("barChartContainer");
    container.style.display = "block";
    container.scrollIntoView({ behavior: 'smooth' });
  
    d3.select("#barChartContainer").select("svg").remove(); // Remove previous chart
    d3.select(".tooltip").remove(); // Remove old tooltip
  
    const margin = { top: 50, right: 100, bottom: 120, left: 60 },
          width = 600 - margin.left - margin.right,
          height = 500 - margin.top - margin.bottom;
  
    const svg = d3.select("#barChartContainer").append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom);

    svg.append("text")
  .attr("x", (width + margin.left + margin.right) / 2)
  .attr("y", margin.top / 2)
  .attr("text-anchor", "middle")
  .style("font-size", "18px")
  .style("font-weight", "bold")
  .text("Online Communication activities for the elderly");

  
    const chartArea = svg.append("g")
        .attr("transform", `translate(${margin.left},${margin.top})`);
  
    const tooltip = d3.select("body")
      .append("div")
      .attr("class", "tooltip")
      .style("position", "absolute")
      .style("opacity", 0)
      .style("background-color", "white")
      .style("border", "solid")
      .style("border-width", "2px")
      .style("border-radius", "5px")
      .style("padding", "6px 10px")
      .style("font-size", "12px")
      .style("pointer-events", "none");
  
    d3.csv("data/Communication.csv", function(data) {
      const keys = ["Male", "Female"];
  
      data.forEach(d => {
        keys.forEach(k => d[k] = +d[k]);
      });
  
      // Sort data by total (Male + Female) in descending order
    data.sort((a, b) => (b.Male + b.Female) - (a.Male + a.Female));

    // X Axis after sorting
    const x = d3.scale.ordinal()
      .domain(data.map(d => d.Category))
      .rangeRoundBands([0, width], 0.1);

  
      const y = d3.scale.linear()
        .domain([0, d3.max(data, d => d.Male + d.Female)])
        .range([height, 0]);
  
      const color = d3.scale.ordinal()
        .domain(keys)
        .range(["#36A2EB", "#D5BA4C"]);
  
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
        .style("stroke", "none")
        .style("opacity", 0.85)
        .on("mouseover", function(d) {
          tooltip.transition().duration(200).style("opacity", 1);
          d3.select(this)
            .style("stroke", "black")
            .style("stroke-width", 1.5)
            .style("opacity", 1);
          tooltip.html(`<strong>${d.category}</strong><br>${d.key}: ${d.value} people`)
            .style("left", (d3.event.pageX + 10) + "px")
            .style("top", (d3.event.pageY - 20) + "px");
        })
        .on("mousemove", function(d) {
          tooltip.style("left", (d3.event.pageX + 10) + "px")
                 .style("top", (d3.event.pageY - 20) + "px");
        })
        .on("mouseleave", function(d) {
          tooltip.transition().duration(200).style("opacity", 0);
          d3.select(this)
            .style("stroke", "none")
            .style("opacity", 0.85);
        });
  
      // X Axis
      chartArea.append("g")
        .attr("transform", `translate(0,${height})`)
        .call(d3.svg.axis().scale(x).orient("bottom"))
        .selectAll("text")
        .attr("transform", "rotate(-40)")
        .style("text-anchor", "end");
  
      // Y Axis
      chartArea.append("g")
        .call(d3.svg.axis().scale(y).orient("left"));
  
      // Legend
      const legend = chartArea.selectAll(".legend")
        .data(keys)
        .enter().append("g")
        .attr("transform", (d, i) => `translate(0,${i * 20})`);
  
      legend.append("rect")
        .attr("x", width + 20)
        .attr("width", 15)
        .attr("height", 15)
        .style("fill", d => color(d));
  
      legend.append("text")
        .attr("x", width + 40)
        .attr("y", 12)
        .text(d => d);
    });
  }




  
  function showUtilityChart() {
    const container = document.getElementById("barChartContainer");
    container.style.display = "block";
    container.scrollIntoView({ behavior: 'smooth' });
  
    d3.select("#barChartContainer").select("svg").remove(); // Remove previous chart
    d3.select(".tooltip").remove(); // Remove old tooltip
  
    const margin = { top: 50, right: 100, bottom: 120, left: 60 },
          width = 600 - margin.left - margin.right,
          height = 500 - margin.top - margin.bottom;
  
    const svg = d3.select("#barChartContainer").append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom);

    svg.append("text")
  .attr("x", (width + margin.left + margin.right) / 2)
  .attr("y", margin.top / 2)
  .attr("text-anchor", "middle")
  .style("font-size", "18px")
  .style("font-weight", "bold")
  .text("Online Utility activities for the elderly");

  
    const chartArea = svg.append("g")
        .attr("transform", `translate(${margin.left},${margin.top})`);
  
    const tooltip = d3.select("body")
      .append("div")
      .attr("class", "tooltip")
      .style("position", "absolute")
      .style("opacity", 0)
      .style("background-color", "white")
      .style("border", "solid")
      .style("border-width", "2px")
      .style("border-radius", "5px")
      .style("padding", "6px 10px")
      .style("font-size", "12px")
      .style("pointer-events", "none");
  
    d3.csv("data/Utility.csv", function(data) {
      const keys = ["Male", "Female"];
  
      data.forEach(d => {
        keys.forEach(k => d[k] = +d[k]);
      });
  
       
      // Sort data by total (Male + Female) in descending order
    data.sort((a, b) => (b.Male + b.Female) - (a.Male + a.Female));

    // X Axis after sorting
    const x = d3.scale.ordinal()
      .domain(data.map(d => d.Category))
      .rangeRoundBands([0, width], 0.1);

  
      const y = d3.scale.linear()
        .domain([0, d3.max(data, d => d.Male + d.Female)])
        .range([height, 0]);
  
      const color = d3.scale.ordinal()
        .domain(keys)
        .range(["#36A2EB", "#D5BA4C"]);
  
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
        .style("stroke", "none")
        .style("opacity", 0.85)
        .on("mouseover", function(d) {
          tooltip.transition().duration(200).style("opacity", 1);
          d3.select(this)
            .style("stroke", "black")
            .style("stroke-width", 1.5)
            .style("opacity", 1);
          tooltip.html(`<strong>${d.category}</strong><br>${d.key}: ${d.value} people`)
            .style("left", (d3.event.pageX + 10) + "px")
            .style("top", (d3.event.pageY - 20) + "px");
        })
        .on("mousemove", function(d) {
          tooltip.style("left", (d3.event.pageX + 10) + "px")
                 .style("top", (d3.event.pageY - 20) + "px");
        })
        .on("mouseleave", function(d) {
          tooltip.transition().duration(200).style("opacity", 0);
          d3.select(this)
            .style("stroke", "none")
            .style("opacity", 0.85);
        });
  
      // X Axis
      chartArea.append("g")
        .attr("transform", `translate(0,${height})`)
        .call(d3.svg.axis().scale(x).orient("bottom"))
        .selectAll("text")
        .attr("transform", "rotate(-40)")
        .style("text-anchor", "end");
  
      // Y Axis
      chartArea.append("g")
        .call(d3.svg.axis().scale(y).orient("left"));
  
      // Legend
      const legend = chartArea.selectAll(".legend")
        .data(keys)
        .enter().append("g")
        .attr("transform", (d, i) => `translate(0,${i * 20})`);
  
      legend.append("rect")
        .attr("x", width + 20)
        .attr("width", 15)
        .attr("height", 15)
        .style("fill", d => color(d));
  
      legend.append("text")
        .attr("x", width + 40)
        .attr("y", 12)
        .text(d => d);
    });
  }
  
 