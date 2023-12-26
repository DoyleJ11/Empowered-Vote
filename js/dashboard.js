document.addEventListener("DOMContentLoaded", function () {
    const params = new URLSearchParams(window.location.search);
    const zipCode = params.get('zipcode');
    const sortButtons = document.querySelectorAll('.sort-button');

    let allPoliticians = [];

    async function fetchPoliticians(zipCode) {
        const apiKey = 'AIzaSyAiGJQ1KX1fijZ9QLCQM4FC8Am9CYt_oTc';
        const url = `https://www.googleapis.com/civicinfo/v2/representatives?key=${apiKey}&address=${zipCode}`;

        try {
            const response = await fetch(url);
            if (!response.ok) throw new Error('Network response was not ok.');
            const data = await response.json();
            processPoliticiansData(data);
        } catch (error) {
            console.error('Fetch error:', error);
        }
    }

    function processPoliticiansData(data) {
        allPoliticians = data.officials.map((official, index) => {
            const office = data.offices.find(office => office.officialIndices.includes(index));
            return {
                name: official.name,
                office: office.name,
                level: office.levels,
                photoUrl: official.photoUrl
            };
        });

        fillInfoCards(data);
        renderPoliticians(allPoliticians);
    }

    function renderPoliticians(politicians) {
        const container = document.getElementById('politiciansContainer');
        container.innerHTML = ''; // Clear existing content
        container.className = 'card-grid'

        politicians.forEach(politician => {
            const card = document.createElement('div');
            card.className = 'card';
            card.innerHTML = `
                <h3>${politician.name}</h3>
                <img class="politician-image" src="${politician.photoUrl || 'assets/placeholder.png'}" />
                <p>${politician.office}</p>
            `;
            politiciansContainer.appendChild(card);
        });
    }



    sortButtons.forEach(button => {
        button.addEventListener('click', function() {
            sortButtons.forEach(btn => btn.classList.remove('selected'));
            this.classList.add('selected');
            const level = this.getAttribute('data-tab');
            renderSortedPoliticians(level);
        });
    });

    function renderSortedPoliticians(level) {
        const filteredPoliticians = level === 'all' 
            ? allPoliticians 
            : allPoliticians.filter(p => p.level && p.level.includes(level));
        renderPoliticians(filteredPoliticians);
    }
    

    
    // Fetch and display data
    fetchPoliticians(zipCode);
    
});


    // async function fetchPoliticianImage(politicianName) {
    //     const apiKey = '93283553d330421c9c2dfc4f94f9557a'; // Replace with your actual API key
    //     const url = `https://api.bing.microsoft.com/v7.0/images/search?q=${encodeURIComponent(politicianName)}&count=1`;
    
    //     try {
    //         const response = await fetch(url, {
    //             headers: { 'Ocp-Apim-Subscription-Key': apiKey }
    //         });
    //         const data = await response.json();
    //         return data.value[0]?.contentUrl; // Get the URL of the first image
    //     } catch (error) {
    //         console.error('Error fetching image: ', error);
    //     }
    // }

    async function fetchCityImage(cityName) {
        const apiKey = '93283553d330421c9c2dfc4f94f9557a'; // Replace with your actual API key
        const url = `https://api.bing.microsoft.com/v7.0/images/search?q=${encodeURIComponent(cityName)}&count=1`;

        try {
            const response = await fetch(url, {
                headers: { 'Ocp-Apim-Subscription-Key': apiKey }
            });
            const data = await response.json();
            return data.value[0].contentUrl;
        } catch (error) {
            console.error('Error fetching image: ', error);
        }
    }

    function fillInfoCards(data) {
        fetchCityImage(data.normalizedInput.city)
        const address = `${data.normalizedInput.city}, ${data.normalizedInput.state} ${data.normalizedInput.zip}`;
        const addressHTML = document.getElementById('zip-code')
        addressHTML.innerHTML = address;

        const location = document.getElementById('location')
        location.innerHTML += ` ${data.normalizedInput.city}, ${data.normalizedInput.state}`
    }