// chart-internet.js

const ageData = {
    "Internet Accessibility None": { labels: ["16-24","25-34","35-44","45-54","55-64","65+"], values: [12, 7, 18, 36, 82, 451] },
    "Internet Accessibility Limited": { labels: ["16-24","25-34","35-44","45-54","55-64","65+"], values: [407, 656, 613, 538, 468, 900] },
    "Internet Accessibility Full": { labels: ["16-24","25-34","35-44","45-54","55-64","65+"], values: [63, 61, 64, 67, 33, 15] }
  };
  
  function showInternetBarChart(title) {
    const data = ageData[title];
    if (!data) return;
    const ctx = document.getElementById("barChart").getContext("2d");
    if (window.myChart) window.myChart.destroy();
    window.myChart = new Chart(ctx, {
      type: "bar",
      data: {
        labels: data.labels,
        datasets: [
          {
            label: "Population",
            data: data.values,
            backgroundColor: "rgba(52, 152, 219, 0.7)"
          }
        ]
      },
      options: {
        responsive: true,
        plugins: {
          title: { display: true, text: title },
          tooltip: {
            callbacks: {
              label: function(tooltipItem) {
                return ` ${tooltipItem.raw}`;
              }
            }
          }
        }
      }
    });
    document.getElementById("barChartContainer").style.display = "block";
  }
  
  function handleNodeClick(name) {
    if (ageData[name]) {
      showInternetBarChart(name);
    }
  }  // 在外部调用时，判断 name 是否匹配
  