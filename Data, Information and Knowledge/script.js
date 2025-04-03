window.onload = function() {
    createDataTable();
    drawLineChart();
};

const canvas = document.getElementById('animationStudioTrends');
if (!canvas) {
    console.error("Canvas element not found!");
}
canvas.width = 1200;
canvas.height = 400;
const ctx = canvas.getContext('2d');
if (!ctx) {
    console.error("Canvas context could not be retrieved!");
}

document.body.style.textAlign = 'center';

document.getElementById('tableContainer').style.margin = 'auto';
document.getElementById('tableContainer').style.display = 'table';
canvas.style.display = 'block';
canvas.style.margin = '20px auto';

const data = {
    labels: ["2004-01", "2004-02", "2004-03", "2004-04", "2004-05", "2004-06", "2004-07", "2004-08", "2004-09", "2004-10", "2004-11", "2004-12", "2005-01", "2005-02", "2005-03", "2005-04", "2005-05", "2005-06", "2005-07", "2005-08", "2005-09", "2005-10", "2005-11", "2005-12"],
    datasets: [
        {
            label: 'Walt Disney Studios',
            data: [53, 45, 40, 39, 35, 30, 28, 25, 22, 20, 18, 15, 17, 19, 21, 24, 26, 29, 31, 34, 37, 40, 42, 44],
            color: 'red'
        },
        {
            label: 'Studio Ghibli',
            data: [0, 100, 0, 0, 0, 5, 10, 20, 15, 10, 5, 0, 0, 0, 0, 10, 15, 20, 25, 30, 35, 40, 45, 50],
            color: 'blue'
        },
        {
            label: 'Warner Bros. Pictures',
            data: [41, 43, 37, 41, 45, 50, 55, 52, 48, 45, 43, 40, 38, 36, 34, 33, 31, 30, 28, 27, 26, 25, 24, 23],
            color: 'green'
        }
    ]
};

function createDataTable() {
    const tableContainer = document.getElementById('tableContainer');
    if (!tableContainer) {
        console.error("Table container not found!");
        return;
    }
    let tableHTML = '<table border="1" cellpadding="5" cellspacing="0" style="margin: auto;">';
    tableHTML += '<tr><th>Month</th><th>Walt Disney Studios</th><th>Studio Ghibli</th><th>Warner Bros. Pictures</th></tr>';
    for (let i = 0; i < data.labels.length; i++) {
        tableHTML += `<tr><td>${data.labels[i]}</td><td>${data.datasets[0].data[i]}</td><td>${data.datasets[1].data[i]}</td><td>${data.datasets[2].data[i]}</td></tr>`;
    }
    tableHTML += '</table>';
    tableContainer.innerHTML = tableHTML;
}

function drawLineChart() {
    if (!ctx) return;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    const padding = 50;
    const width = canvas.width - padding * 2;
    const height = canvas.height - padding * 2;

    // Draw axes
    ctx.beginPath();
    ctx.lineWidth = 2;
    ctx.moveTo(padding, padding);
    ctx.lineTo(padding, height + padding);
    ctx.lineTo(width + padding, height + padding);
    ctx.stroke();

    // Draw Y-axis labels every 5 searches
    ctx.textAlign = 'right';
    ctx.textBaseline = 'middle';
    for (let i = 0; i <= 100; i += 5) {
        const y = height + padding - (i / 100) * height;
        ctx.fillText(i, padding - 10, y);
    }

    // Draw dataset lines
    data.datasets.forEach(dataset => {
        ctx.beginPath();
        ctx.strokeStyle = dataset.color;
        dataset.data.forEach((value, index) => {
            const x = padding + (index / (data.labels.length - 1)) * width;
            const y = height + padding - (value / 100) * height;
            if (index === 0) {
                ctx.moveTo(x, y);
            } else {
                ctx.lineTo(x, y);
            }
        });
        ctx.stroke();
    });

    // Draw legend at the bottom
    let legendX = padding;
    let legendY = canvas.height - 30;
    data.datasets.forEach(dataset => {
        ctx.fillStyle = dataset.color;
        ctx.fillRect(legendX, legendY, 15, 15);
        ctx.fillStyle = 'black';
        ctx.fillText(dataset.label, legendX + 20, legendY + 12);
        legendX += 200;
    });
}
