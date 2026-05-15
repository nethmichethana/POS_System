//  LINE CHART
const ctx1 = document.getElementById('revenueChart');

new Chart(ctx1, {
    type: 'line',
    data: {
        labels: ['Mon','Tue','Wed','Thu','Fri','Sat','Sun'],
        datasets: [{
            label: 'Revenue (Rs)',
            data: [5000, 7000, 6000, 8000, 5500, 9000, 7500],
            borderColor: '#ff5722',
            backgroundColor: 'rgba(255,87,34,0.2)',
            tension: 0.4,
            fill: true,
            pointRadius: 5
        }]
    },
    options: {
        responsive: true,
        plugins: {
            legend: {
                display: false
            }
        }
    }
});


// PIE CHART
const ctx2 = document.getElementById('orderChart');

new Chart(ctx2, {
    type: 'pie',
    data: {
        labels: ['Completed', 'Pending', 'Cancelled'],
        datasets: [{
            data: [70, 20, 10],
            backgroundColor: [
                '#ff5722',
                '#ffb300',
                '#4caf50'
            ]
        }]
    },
    options: {
        responsive: true
    }
});