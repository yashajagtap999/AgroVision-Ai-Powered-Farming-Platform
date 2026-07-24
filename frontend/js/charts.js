// Charts Manager - Binds Chart.js charts and live stats updates

const ChartsManager = {
    drawRoiChart(investment, subsidy, profit) {
        const ctx = document.getElementById('roi-pie-chart');
        if (!ctx) return;

        // Destroy previous instance to prevent layout flicker on recalculating
        if (window.pieChartInstance) {
            window.pieChartInstance.destroy();
        }

        const data = {
            labels: ['Your Investment', 'Govt. Subsidy', 'Profit Margin'],
            datasets: [{
                data: [investment, subsidy, profit],
                backgroundColor: [
                    '#64748b', // Slate gray
                    '#2563eb', // Blue primary
                    '#10b981'  // Emerald green
                ],
                borderWidth: 2,
                borderColor: '#ffffff',
                hoverOffset: 12
            }]
        };

        const config = {
            type: 'doughnut',
            data: data,
            options: {
                responsive: true,
                maintainAspectRatio: false,
                cutout: '60%',
                plugins: {
                    legend: {
                        position: 'bottom',
                        labels: {
                            font: {
                                family: 'Inter',
                                size: 12,
                                weight: '500'
                            },
                            color: '#475569',
                            usePointStyle: true,
                            padding: 20
                        }
                    },
                    tooltip: {
                        backgroundColor: '#0f172a',
                        titleFont: { family: 'Outfit', size: 13, weight: '700' },
                        bodyFont: { family: 'Inter', size: 12 },
                        padding: 12,
                        cornerRadius: 8,
                        callbacks: {
                            label: function(context) {
                                let label = context.label || '';
                                if (label) label += ': ';
                                if (context.parsed !== null) {
                                    label += new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(context.parsed);
                                }
                                return label;
                            }
                        }
                    }
                },
                animation: {
                    animateScale: true,
                    animateRotate: true,
                    duration: 1200,
                    ease: 'easeOutQuart'
                }
            }
        };

        window.pieChartInstance = new Chart(ctx, config);
    }
};
