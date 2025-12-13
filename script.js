document.getElementById('captureBtn').addEventListener('click', function() {
    const urlInput = document.getElementById('urlInput').value.trim();
    const resultDiv = document.getElementById('result');
    const captureBtn = this; // Reference to the button

    // Clear previous results
    resultDiv.innerHTML = '';

    // Basic URL validation
    const urlPattern = /^(https?:\/\/)?([\w\-]+\.)+[\w\-]+(\/[\w\- .\/?%&=]*)?$/i;
    if (!urlPattern.test(urlInput)) {
        resultDiv.innerHTML = `<p style="color: red;">❌ Please enter a valid URL (e.g., https://example.com)</p>`;
        return;
    }

    // --- START LOADING STATE ---
    function showLoading(isLoading) {
        if (isLoading) {
            captureBtn.disabled = true;
            captureBtn.textContent = 'Capturing...';
            resultDiv.innerHTML = `
                <p style="color: green;">Processing <strong>${urlInput}</strong></p>
                <div class="loader"></div>
            `;
        } else {
            captureBtn.disabled = false;
            captureBtn.textContent = 'Capture Screenshot';
        }
    }

    showLoading(true); // Activate spinner & disable button
    // --- END LOADING STATE ---

    // Simulate API call (MOCK — we replace with real backend later)
// Replace the setTimeout block (starting from line ~30) with this:
fetch('http://localhost:3001/capture', {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json',
    },
    body: JSON.stringify({ url: urlInput })
})
.then(response => {
    if (!response.ok) {
        throw new Error(`Server error: ${response.status}`);
    }
    return response.json();
})
.then(data => {
    // Hide spinner, re-enable button
    showLoading(false);
    
    if (data.success) {
        // Display the REAL short link from your backend
        resultDiv.innerHTML = `
            <p style="color: green;">✅ ${data.message}</p>
            <p>Your snapshot link:</p>
            <a href="${data.shortLink}" target="_blank" style="
                display: inline-block;
                background: black;
                color: white;
                padding: 10px 20px;
                border-radius: 5px;
                text-decoration: none;
                margin-top: 10px;
            ">${data.shortLink}</a>
            <p><small>Click to view the actual screenshot!</small></p>
        `;
    } else {
        resultDiv.innerHTML = `<p style="color: red;">❌ ${data.error}</p>`;
    }
})
.catch(error => {
    showLoading(false);
    resultDiv.innerHTML = `<p style="color: red;">❌ Failed to capture: ${error.message}</p>`;
    console.error('Fetch error:', error);
});
}       
