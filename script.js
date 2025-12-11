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
    setTimeout(() => {
        showLoading(false); // Deactivate spinner & re-enable button

        const mockShortCode = Math.random().toString(36).substring(7);
        const mockShortLink = `https://snaprl.xyz/${mockShortCode}`;
        resultDiv.innerHTML = `
            <p style="color: green;">✅ Screenshot captured!</p>
            <p>Your snapshot link:</p>
            <a href="${mockShortLink}" target="_blank" style="
                display: inline-block;
                background: black;
                color: white;
                padding: 10px 20px;
                border-radius: 5px;
                text-decoration: none;
                margin-top: 10px;
            ">${mockShortLink}</a>
            <p><small>This is a mock link. Real backend coming next.</small></p>
        `;
    }, 2000); // 2-second delay
});
