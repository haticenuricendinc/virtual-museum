document.addEventListener('DOMContentLoaded', () => {
    const artifactContainer = document.getElementById('artifact-container');
    const loadingMessage = document.querySelector('.loading-message');

    const sheetBestUrl = 'https://api.sheetbest.com/sheets/df2de6e1-ff3f-4a08-96e6-d750d59a0ad3';

    fetch(sheetBestUrl)
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            return response.json();
        })
        .then(data => {
            if (loadingMessage) {
                loadingMessage.remove();
            }

            // Sheet Best'ten gelen verinin ilk elemanı kolon başlıkları olduğu için onu atlıyoruz
            // Ve verinin gerçekten bir dizi olup olmadığını kontrol ediyoruz
            if (Array.isArray(data) && data.length > 1) { // length > 1 because we skip the header row
                // data[0] başlık satırıdır, bu yüzden slice(1) ile ilk elemanı atlayarak başlıyoruz.
                data.slice(1).forEach(artifact => { // <--- BURAYI DEĞİŞTİRDİK: .slice(1) ekledik
                    const artifactDiv = document.createElement('div');
                    artifactDiv.classList.add('artifact-card');

                    // Create and append elements for each piece of artifact info
                    // NOT: Kolon isimleri yerine sayısal anahtarları kullanıyoruz (0, 1, 2, ...)
                    // İmageURL'ün 2. kolonda (indeks 2) olduğunu varsayıyorum.
                    const img = document.createElement('img');
                    img.src = artifact["2"]; // <--- BURAYI DEĞİŞTİRDİK: artifact.image_link yerine artifact["2"]
                    img.alt = artifact["0"]; // <--- BURAYI DEĞİŞTİRDİK: artifact.name yerine artifact["0"]
                    img.onerror = function() { this.onerror=null; this.src='https://via.placeholder.com/250x250?text=Image+Not+Found'; };
                    artifactDiv.appendChild(img);

                    const name = document.createElement('h2');
                    name.textContent = artifact["0"]; // <--- BURAYI DEĞİŞTİRDİK: artifact.name yerine artifact["0"]
                    artifactDiv.appendChild(name);

                    const description = document.createElement('p');
                    description.innerHTML = `<strong>Description:</strong> ${artifact["1"] || 'N/A'}`; // <--- BURAYI DEĞİŞTİRDİK: artifact.description yerine artifact["1"]
                    artifactDiv.appendChild(description);

                    const findspot = document.createElement('p');
                    findspot.innerHTML = `<strong>Findspot:</strong> ${artifact["3"] || 'N/A'}`; // <--- BURAYI DEĞİŞTİRDİK: artifact.findspot yerine artifact["3"]
                    artifactDiv.appendChild(findspot);

                    const date = document.createElement('p');
                    date.innerHTML = `<strong>Date:</strong> ${artifact["4"] || 'N/A'}`; // <--- BURAYI DEĞİŞTİRDİK: artifact.date yerine artifact["4"]
                    artifactDiv.appendChild(date);

                    const material = document.createElement('p');
                    material.innerHTML = `<strong>Material:</strong> ${artifact["5"] || 'N/A'}`; // <--- BURAYI DEĞİŞTİRDİK: artifact.material yerine artifact["5"]
                    artifactDiv.appendChild(material);

                    artifactContainer.appendChild(artifactDiv);
                });
            } else {
                artifactContainer.innerHTML = '<p class="error-message">No artifacts found or data is empty.</p>';
            }
        })
        .catch(error => {
            console.error('Error fetching artifacts:', error);
            if (loadingMessage) {
                loadingMessage.remove();
            }
            artifactContainer.innerHTML = '<p class="error-message">Failed to load museum artifacts. Please check your internet connection or the data source.</p>';
        });
});