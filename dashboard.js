document.addEventListener('DOMContentLoaded', function () {
    // Sales Chart (Line Chart)
    const salesCtx = document.getElementById('salesChart').getContext('2d');
    new Chart(salesCtx, {
        type: 'line',
        data: {
            labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
            datasets: [{
                label: 'Sales Overview',
                data: [10000, 15000, 20000, 25000, 30000, 40000, 45000, 60000, 55000, 48000, 52000, 63000],
                backgroundColor: 'rgba(54, 162, 235, 0.2)',
                borderColor: 'rgba(54, 162, 235, 1)',
                borderWidth: 2,
                fill: true
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            animation: {
                duration: 1000, // Adjust animation duration
                easing: 'easeInOutQuad' // Easing effect
            },
            tooltips: {
                enabled: true,
                mode: 'index',
                intersect: false,
                callbacks: {
                    label: function(tooltipItem) {
                        return `Sales: $${tooltipItem.yLabel}`;
                    }
                }
            }
        }
    });

    // Revenue Chart (Doughnut Chart)
    const revenueCtx = document.getElementById('revenueChart').getContext('2d');
    new Chart(revenueCtx, {
        type: 'doughnut',
        data: {
            labels: ['Laptop', 'Mobile', 'Accessories'],
            datasets: [{
                label: 'Revenue by Categories',
                data: [55, 30, 15],
                backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56'],
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            animation: {
                animateScale: true, // Animation scale effect
                animateRotate: true // Rotate chart on load
            },
            tooltips: {
                enabled: true,
                callbacks: {
                    label: function(tooltipItem, data) {
                        let dataset = data.datasets[tooltipItem.datasetIndex];
                        let currentValue = dataset.data[tooltipItem.index];
                        let label = data.labels[tooltipItem.index];
                        return `${label}: ${currentValue}%`;
                    }
                }
            }
        }
    });
});
