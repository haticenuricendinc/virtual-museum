document.addEventListener('DOMContentLoaded', () => {
    const artifactContainer = document.getElementById('artifact-container');
    const loadingMessage = document.querySelector('.loading-message');

    // YOUR SHEETBEST JSON API URL
    // This is the URL you got from sheet.best after publishing your Google Sheet
    const sheetBestUrl = 'https://api.sheetbest.com/sheets/021ec7e4-9832-4fe2-8ac0-9616b1354fbc';

    fetch(sheetBestUrl)
        .then(response => {
            if (!response.ok) {
                // If the response is not OK (e.g., 404, 500), throw an error
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            return response.json(); // Parse the JSON response
        })
        .then(data => {
            // Remove the loading message once data is fetched
            if (loadingMessage) {
                loadingMessage.remove();
            }

            // Check if data is an array and not empty
            if (Array.isArray(data) && data.length > 0) {
                data.forEach(artifact => {
                    const artifactDiv = document.createElement('div');
                    artifactDiv.classList.add('artifact-card');

                    // Create and append elements for each piece of artifact info
                    const img = document.createElement('img');
                    img.src = artifact.image_link;
                    img.alt = artifact.name;
                    // Add a fallback for broken images
                    img.onerror = function() { this.onerror=null; this.src='https://via.placeholder.com/250x250?text=Image+Not+Found'; };
                    artifactDiv.appendChild(img);

                    const name = document.createElement('h2');
                    name.textContent = artifact.name;
                    artifactDiv.appendChild(name);

                    const description = document.createElement('p');
                    description.innerHTML = `<strong>Description:</strong> ${artifact.description}`;
                    artifactDiv.appendChild(description);

                    const findspot = document.createElement('p');
                    findspot.innerHTML = `<strong>Findspot:</strong> ${artifact.findspot || 'N/A'}`;
                    artifactDiv.appendChild(findspot);

                    const date = document.createElement('p');
                    date.innerHTML = `<strong>Date:</strong> ${artifact.date || 'N/A'}`;
                    artifactDiv.appendChild(date);

                    const material = document.createElement('p');
                    material.innerHTML = `<strong>Material:</strong> ${artifact.material || 'N/A'}`;
                    artifactDiv.appendChild(material);

                    artifactContainer.appendChild(artifactDiv);
                });
            } else {
                artifactContainer.innerHTML = '<p class="error-message">No artifacts found or data is empty.</p>';
            }
        })
        .catch(error => {
            // Handle any errors during the fetch operation
            console.error('Error fetching artifacts:', error);
            if (loadingMessage) {
                loadingMessage.remove();
            }
            artifactContainer.innerHTML = '<p class="error-message">Failed to load museum artifacts. Please check your internet connection or the data source.</p>';
        });
});