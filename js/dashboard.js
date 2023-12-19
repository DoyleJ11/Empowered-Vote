document.addEventListener("DOMContentLoaded", function () {
    const params = new URLSearchParams(window.location.search);
    const zipCode = params.get('zipcode');

    // Function to fetch politicians' data
    async function fetchPoliticians(zipCode) {
        const apiKey = 'AIzaSyAiGJQ1KX1fijZ9QLCQM4FC8Am9CYt_oTc'; // Replace with your actual API key
        const url = `https://www.googleapis.com/civicinfo/v2/representatives?key=${apiKey}&address=${zipCode}`;
    
        try {
            const response = await fetch(url);
            const data = await response.json();
            return { officials: data.officials, offices: data.offices };
        } catch (error) {
            console.error('Error fetching data: ', error);
        }
    }
    
    async function fetchPoliticianImage(politicianName) {
        const apiKey = '93283553d330421c9c2dfc4f94f9557a'; // Replace with your actual API key
        const url = `https://api.bing.microsoft.com/v7.0/images/search?q=${encodeURIComponent(politicianName)}&count=1`;
    
        try {
            const response = await fetch(url, {
                headers: { 'Ocp-Apim-Subscription-Key': apiKey }
            });
            const data = await response.json();
            return data.value[0]?.contentUrl; // Get the URL of the first image
        } catch (error) {
            console.error('Error fetching image: ', error);
        }
    }
    


    async function renderPoliticians(data) {
        const { officials, offices } = data;
        const container = document.getElementById('politiciansContainer');
    
        container.className = 'card-grid';
    
        for (const [index, politician] of officials.entries()) {
            const officeName = offices.find(office => office.officialIndices.includes(index))?.name;
            const imageUrl = await fetchPoliticianImage(politician.name); // Fetch image
    
            const card = document.createElement('div');
            card.className = 'card';
            card.innerHTML = `
                <img src="${imageUrl}" alt="${politician.name}" class="politician-image">
                <h3>${politician.name}</h3>
                <p>${officeName || 'Not Available'}</p>
            `;
            container.appendChild(card);
        }
    }
    
    // Fetch and display data
    fetchPoliticians(zipCode).then(renderPoliticians);
    
});
