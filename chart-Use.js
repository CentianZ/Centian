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

