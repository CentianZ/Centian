function showEntertainmentChart() {
  var container = document.getElementById("barChartContainer");
  container.style.display = "block";
  container.scrollIntoView({ behavior: 'smooth' });

  var ctx = document.getElementById("barChart").getContext("2d");

  // 清除旧图（如果存在）
  if (window.entertainmentChart) {
    window.entertainmentChart.destroy();
  }

  d3.csv("data/Entertainment_Usage_Breakdown.csv", function(data) {
    var labels = [];
    var maleData = [];
    var femaleData = [];

    data.forEach(function(d) {
      labels.push(d["Category"]);
      maleData.push(+d["Male"]);
      femaleData.push(+d["Female"]);
    });

    window.entertainmentChart = new Chart(ctx, {
      type: 'bar',
      data: {
        labels: labels,
        datasets: [
          {
            label: "Male",
            data: maleData,
            backgroundColor: "rgba(54, 162, 235, 0.7)", // 蓝色
            stack: "Gender"
          },
          {
            label: "Female",
            data: femaleData,
            backgroundColor: "rgba(213, 186, 76, 0.7)", // 红色
            stack: "Gender"
          }
        ]
      },
      options: {
        responsive: false,
        plugins: {
          tooltip: {
            callbacks: {
              label: function(context) {
                const label = context.dataset.label || '';
                const value = context.parsed.y;
                return label + ": " + value;
              }
            }
          },
          title: {
            display: true,
            text: "Entertainment Usage by Gender"
          }
        },
        scales: {
          x: {
            stacked: true,
            ticks: {
              autoSkip: false,
              maxRotation: 45,
              minRotation: 20
            }
          },
          y: {
            stacked: true,
            beginAtZero: true
          }
        }
      }
    });
  });
}

document.getElementById("closeChart").onclick = function() {
  document.getElementById("barChartContainer").style.display = "none";
};


function showCommunicationChart() {
  var container = document.getElementById("barChartContainer");
  container.style.display = "block";
  container.scrollIntoView({ behavior: 'smooth' });

  var ctx = document.getElementById("barChart").getContext("2d");

  if (window.entertainmentChart) {
    window.entertainmentChart.destroy();
  }

  d3.csv("data/Communication.csv", function(data) {
    var labels = [];
    var maleData = [];
    var femaleData = [];

    data.forEach(function(d) {
      labels.push(d["Category"]);
      maleData.push(+d["Male"]);
      femaleData.push(+d["Female"]);
    });

    window.entertainmentChart = new Chart(ctx, {
      type: 'bar',
      data: {
        labels: labels,
        datasets: [
          {
            label: "Male",
            data: maleData,
            backgroundColor: "rgba(54, 162, 235, 0.7)",
            stack: "Gender"
          },
          {
            label: "Female",
            data: femaleData,
            backgroundColor: "rgba(213, 186, 76, 0.7)",
            stack: "Gender"
          }
        ]
      },
      options: {
        responsive: false,
        plugins: {
          tooltip: {
            callbacks: {
              label: function(context) {
                return context.dataset.label + ": " + context.parsed.y;
              }
            }
          },
          title: {
            display: true,
            text: "Communication Usage by Gender"
          }
        },
        scales: {
          x: { stacked: true },
          y: { stacked: true, beginAtZero: true }
        }
      }
    });
  });
}

function showUtilityChart() {
  var container = document.getElementById("barChartContainer");
  container.style.display = "block";
  container.scrollIntoView({ behavior: 'smooth' });

  var ctx = document.getElementById("barChart").getContext("2d");

  if (window.entertainmentChart) {
    window.entertainmentChart.destroy();
  }

  d3.csv("data/Utility.csv", function(data) {
    var labels = [];
    var maleData = [];
    var femaleData = [];

    data.forEach(function(d) {
      labels.push(d["Category"]);
      maleData.push(+d["Male"]);
      femaleData.push(+d["Female"]);
    });

    window.entertainmentChart = new Chart(ctx, {
      type: 'bar',
      data: {
        labels: labels,
        datasets: [
          {
            label: "Male",
            data: maleData,
            backgroundColor: "rgba(54, 162, 235, 0.7)",
            stack: "Gender"
          },
          {
            label: "Female",
            data: femaleData,
            backgroundColor: "rgba(213, 186, 76, 0.7)",
            stack: "Gender"
          }
        ]
      },
      options: {
        responsive: false,
        plugins: {
          tooltip: {
            callbacks: {
              label: function(context) {
                return context.dataset.label + ": " + context.parsed.y;
              }
            }
          },
          title: {
            display: true,
            text: "Utility Usage by Gender"
          }
        },
        scales: {
          x: { stacked: true },
          y: { stacked: true, beginAtZero: true }
        }
      }
    });
  });
}

function showEntertainmentChartNew() {
  d3.select("#barChartContainer").html(""); // Clear chart

  var margin = {top: 40, right: 30, bottom: 100, left: 60},
      width = 700 - margin.left - margin.right,
      height = 400 - margin.top - margin.bottom;

  var svg = d3.select("#barChartContainer").append("svg")
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom)
    .append("g")
      .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

  var x = d3.scale.ordinal().rangeRoundBands([0, width], 0.2);
  var y = d3.scale.linear().range([height, 0]);
  var color = d3.scale.ordinal().range(["steelblue", "orange"]);

  var tooltip = d3.select("body").append("div")
      .attr("class", "tooltip");

  d3.csv("data/Entertainment_Usage_Breakdown.csv", function(error, data) {
    if (error) throw error;

    var categories = ["Male", "Female"];
    data.forEach(function(d) {
      var y0 = 0;
      d.total = 0;
      d.values = categories.map(function(name) {
        var val = +d[name];
        d.total += val;
        return {name: name, y0: y0, y1: y0 += val, value: val};
      });
    });

    x.domain(data.map(function(d) { return d.Category; }));
    y.domain([0, d3.max(data, function(d) { return d.total; })]);

    // Add category bars
    var category = svg.selectAll(".category")
        .data(data)
      .enter().append("g")
        .attr("class", "category")
        .attr("transform", function(d) { return "translate(" + x(d.Category) + ",0)"; });

    category.selectAll("rect")
        .data(function(d) { return d.values; })
      .enter().append("rect")
        .attr("width", x.rangeBand())
        .attr("y", function(d) { return y(d.y1); })
        .attr("height", function(d) { return y(d.y0) - y(d.y1); })
        .style("fill", function(d) { return color(d.name); })
        .on("mouseover", function(d) {
          tooltip.transition().duration(100).style("opacity", 0.9);
          tooltip.html(d.name + ": " + d.value)
            .style("left", (d3.event.pageX + 10) + "px")
            .style("top", (d3.event.pageY - 28) + "px");
        })
        .on("mouseout", function() {
          tooltip.transition().duration(200).style("opacity", 0);
        });

    // X Axis
    svg.append("g")
        .attr("class", "x axis")
        .attr("transform", "translate(0," + height + ")")
        .call(d3.svg.axis().scale(x).orient("bottom"))
      .selectAll("text")
        .attr("transform", "rotate(-45)")
        .style("text-anchor", "end");

    // Y Axis
    svg.append("g")
        .attr("class", "y axis")
        .call(d3.svg.axis().scale(y).orient("left"));

    // Legend
    var legend = svg.selectAll(".legend")
        .data(categories)
      .enter().append("g")
        .attr("class", "legend")
        .attr("transform", function(d, i) { return "translate(0," + i * 20 + ")"; });

    legend.append("rect")
        .attr("x", width - 18)
        .attr("width", 18)
        .attr("height", 18)
        .style("fill", color);

    legend.append("text")
        .attr("x", width - 24)
        .attr("y", 9)
        .attr("dy", ".35em")
        .style("text-anchor", "end")
        .text(function(d) { return d; });
  });
}
 
 