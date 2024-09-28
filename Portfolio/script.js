document.addEventListener("DOMContentLoaded", () => {
    const investmentForm = document.getElementById("investment-form");
    const portfolioList = document.getElementById("portfolio-list");
    const totalValueDisplay = document.getElementById("total-value");
    const ctx = document.getElementById("portfolio-chart").getContext('2d');
    let investments = [];
    let chart;

    // Add Investment
    investmentForm.addEventListener("submit", (e) => {
        debugger    
        e.preventDefault();
        const assetName = document.getElementById("asset-name").value;
        const amountInvested = parseFloat(document.getElementById("amount-invested").value);
        const currentValue = parseFloat(document.getElementById("current-value").value);
        
        const investment = {
            id: Date.now(),
            assetName,
            amountInvested,
            currentValue,
            percentageChange: ((currentValue - amountInvested) / amountInvested * 100).toFixed(2)
        };

        investments.push(investment);
        updatePortfolio();
        investmentForm.reset();
    });

    // Update Portfolio
    function updatePortfolio() {
        portfolioList.innerHTML = "";
        let totalValue = 0;

        investments.forEach((investment) => {
            totalValue += investment.currentValue;
            portfolioList.innerHTML += `
                <tr>
                    <td>${investment.assetName}</td>
                    <td>$${investment.amountInvested.toFixed(2)}</td>
                    <td>$${investment.currentValue.toFixed(2)}</td>
                    <td>${investment.percentageChange}%</td>
                    <td>
                        <button onclick="updateInvestment(${investment.id})">Update</button>
                        <button onclick="removeInvestment(${investment.id})">Remove</button>
                    </td>
                </tr>
            `;
        });

        totalValueDisplay.innerText = `$${totalValue.toFixed(2)}`;
        updateChart();
    }

    // Update Investment
    window.updateInvestment = function(id) {
        const investment = investments.find(inv => inv.id === id);
        const newCurrentValue = parseFloat(prompt("Enter new current value", investment.currentValue));
        if (newCurrentValue && !isNaN(newCurrentValue)) {
            investment.currentValue = newCurrentValue;
            investment.percentageChange = ((investment.currentValue - investment.amountInvested) / investment.amountInvested * 100).toFixed(2);
            updatePortfolio();
        }
    };

    // Remove Investment
    window.removeInvestment = function(id) {
        investments = investments.filter(inv => inv.id !== id);
        updatePortfolio();
    };

    // Update Chart
    function updateChart() {
        const assetNames = investments.map(inv => inv.assetName);
        const currentValues = investments.map(inv => inv.currentValue);

        if (chart) chart.destroy();

        chart = new Chart(ctx, {
            type: 'pie',
            data: {
                labels: assetNames,
                datasets: [{
                    data: currentValues,
                    backgroundColor: ['#ff6384', '#36a2eb', '#cc65fe', '#ffce56'],
                }]
            }
        });
    }
});
