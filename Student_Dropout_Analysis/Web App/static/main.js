document.addEventListener("DOMContentLoaded", function () {
   
    const ctx = document.getElementById('myChart').getContext('2d');
    let myChart;
    let tabledata; 

    
    async function fetchData(category, selectedClass, year) {
        try {
            
            const url = `static/dataset.csv`;

            
            const response = await fetch(url);
            tabledata = await response.text(); 

            
            const labels = [];
            const data1 = [];
            const data2 = [];
            const data3 = [];

            
            const boysColumnName = `${category} - ${selectedClass} - Boys_${year}`;
            const girlsColumnName = `${category} - ${selectedClass} - Girls_${year}`;
            const totalColumnName = `${category} - ${selectedClass} - Total_${year}`;

            
            const table = tabledata.split('\n').slice(1);
            table.forEach(row => {
                const column = row.split(',');
                const state = column[0];
                const boysValue = parseFloat(column[getColumnIndex(boysColumnName)]);
                const girlsValue = parseFloat(column[getColumnIndex(girlsColumnName)]);
                const totalValue = parseFloat(column[getColumnIndex(totalColumnName)]);
                labels.push(state);
                data1.push(boysValue);
                data2.push(girlsValue);
                data3.push(totalValue);
            });

            return { labels, data1, data2, data3 };
        } catch (error) {
            console.error("Error fetching data:", error);
            throw error; 
        }
    }

    
    function getColumnIndex(columnName) {
        const headers = tabledata.split('\n')[0].split(',');
        return headers.indexOf(columnName);
    }

    
    async function updateChart() {
        const category = document.getElementById("categoryDropdown").value;
        const selectedClass = document.getElementById("classDropdown").value;
        const year = document.getElementById("yearDropdown").value;

        try {
            
            const data = await fetchData(category, selectedClass, year);

            
            if (myChart) {
                myChart.destroy(); 
            }

            myChart = new Chart(ctx, {
                type: 'line', 
                data: {
                    labels: data.labels,
                    datasets: [
                        {
                            label: 'Boys',
                            data: data.data1,
                            backgroundColor: 'rgba(54, 162, 235, 0.2)',
                            borderColor: 'rgba(54, 162, 235, 1)',
                            borderWidth: 1,
                        },
                        {
                            label: 'Girls',
                            data: data.data2,
                            backgroundColor: 'rgba(255, 26, 104, 0.2)',
                            borderColor: 'rgba(255, 26, 104, 1)',
                            borderWidth: 1,
                        },
                        {
                            label: 'Total',
                            data: data.data3,
                            backgroundColor: 'rgba(75, 192, 192, 0.2)',
                            borderColor: 'rgba(75, 192, 192, 1)',
                            borderWidth: 1,
                        },
                    ],
                },
                options: {
                    scales: {
                        y: {
                            beginAtZero: true,
                        },
                    },
                },
            });
        } catch (error) {
            console.error("Error updating chart:", error);
        }
    }

    
    document.getElementById("categoryDropdown").addEventListener("change", async () => {
        await updateChart(); 
    });
    document.getElementById("classDropdown").addEventListener("change", async () => {
        await updateChart(); 
    });
    document.getElementById("yearDropdown").addEventListener("change", async () => {
        await updateChart(); 
    });
  
    updateChart();
});
document.addEventListener("DOMContentLoaded", function () {
    const heatmapData = [
        { x: 100, y: 100, value: 0.5 },
        { x: 200, y: 200, value: 0.8 },
        { x: 300, y: 300, value: 0.3 },
        // Add more data points as needed
    ];

    // Create a heatmap instance
    const heatmapInstance = h337.create({
        container: document.getElementById('heatmapContainer'),
    });

    // Set the data
    heatmapInstance.setData({
        max: 1, // Maximum value in the dataset
        data: heatmapData,
    });
});
