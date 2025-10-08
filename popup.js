async function getWHSInfo(scenario) {
  try {
    const response = await fetch('https://whs-backend.onrender.com/check-safety', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ scenario })
    });

    const data = await response.json();
    return data.content; // Make sure your backend returns { content: "..." }
  } catch (error) {
    console.error('Error fetching WHS info:', error);
    return 'Error fetching data. Make sure your backend is running.';
  }
}

document.getElementById('checkButton').addEventListener('click', async () => {
  const scenario = document.getElementById('scenarioInput').value.trim();
  const resultArea = document.getElementById('resultArea');

  if (!scenario) {
    resultArea.innerHTML = '<p class="unsafe">Please enter a scenario description.</p>';
    return;
  }

  resultArea.innerHTML = '<p>Checking...</p>';

  const result = await getWHSInfo(scenario);
  resultArea.innerHTML = `<p>${result.replace(/\n/g, '<br>')}</p>`;
});
