const claimForm = document.getElementById('claimForm');
const successMessage = document.getElementById('successMessage');
const claimsTable = document.getElementById('claimsTable').getElementsByTagName('tbody')[0];

let claims = [];

claimForm.addEventListener('submit', function(e) {
  e.preventDefault();
  
  // Validate form fields
  const policyNumber = document.getElementById('policyNumber').value;
  const incidentDate = document.getElementById('incidentDate').value;
  const incidentDescription = document.getElementById('incidentDescription').value;

  if (policyNumber && incidentDate && incidentDescription) {
    const newClaim = {
      id: claims.length + 1,
      policyNumber,
      incidentDate,
      status: 'Pending'
    };

    claims.push(newClaim);

    // Clear form
    claimForm.reset();
    
    // Show success message
    successMessage.textContent = 'Claim submitted successfully!';
    
    // Update claim tracking
    updateClaimsTable();
  }
});

function updateClaimsTable() {
  claimsTable.innerHTML = '';
  claims.forEach(claim => {
    const row = claimsTable.insertRow();
    row.insertCell(0).textContent = claim.id;
    row.insertCell(1).textContent = claim.incidentDate;
    row.insertCell(2).textContent = claim.status;
  });
}
