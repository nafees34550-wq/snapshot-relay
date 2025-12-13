document.getElementById('captureBtn').addEventListener('click', function() {
    const urlInput = document.getElementById('urlInput').value.trim();
    const resultDiv = document.getElementById('result');
    const captureBtn = this;

    // Clear previous results
    resultDiv.innerHTML = '';

    // Basic URL validation
    const urlPattern = /^(https?:\/\/)?([\w\-]+\.)+[\w\-]+(\/[\w\- .\/?%&=]*)?$/i;
    if (!urlPattern.test(urlInput)) {
        resultDiv.innerHTML = '<p style="color: red;">❌ Please enter a valid URL (e.g., https://example.com)</p>';
        return;
    }

    // --- LOADING STATE FUNCTION ---
    function showLoading(isLoading) {
        if (isLoading) {
            captureBtn.disabled = true;
            captureBtn.textContent = 'Capturing...';
            resultDiv.innerHTML = `
                <p style="color: green;">📸 Processing <strong>${urlInput}</strong></p>
                <div class="loader"></div>
            `;
        } else {
            captureBtn.disabled = false;
            captureBtn.textContent = 'Capture Screenshot';
        }
    }

    // Start loading
    showLoading(true);

    // --- REAL BACKEND CALL (replace mock) ---
    fetch('http://localhost:3001/capture', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
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
        showLoading(false); // Stop loading

        if (data.success) {
            // Display REAL short link from backend
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
            // Backend returned success:false
            resultDiv.innerHTML = `<p style="color: red;">❌ ${data.error || 'Unknown backend error'}</p>`;
        }
    })
    .catch(error => {
        showLoading(false);
        console.error('Fetch error:', error);
        resultDiv.innerHTML = `
            <p style="color: red;">❌ Request failed.</p>
            <p><small>Details: ${error.message}</small></p>
            <p><small>Check that your backend is running on localhost:3001</small></p>
        `;
    });
});
