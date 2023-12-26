document.addEventListener('DOMContentLoaded', function() {
    const searchForm = document.querySelector('.search-container form');
    const politiciansContainer = document.getElementById('politiciansContainer');
    const sortButtons = document.querySelectorAll('.sort-button');
    const params = new URLSearchParams(window.location.search);
    const zipCode = params.get('zipcode');

    let allPoliticians = []; // Store all fetched politicians

    async function fetchPoliticians(zipCode) {
        const apiKey = 'AIzaSyAiGJQ1KX1fijZ9QLCQM4FC8Am9CYt_oTc';
        const requestURL = `https://www.googleapis.com/civicinfo/v2/representatives?key=${apiKey}&address=${zipCode}`;

        try {
            const response = await fetch(requestURL);
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
                level: office.level,
                photoUrl: official.photoUrl
            };
        });
        renderPoliticians(allPoliticians);
    }

    function renderPoliticians(politicians) {
        politiciansContainer.innerHTML = '';
        politicians.forEach(politician => {
            const card = document.createElement('div');
            card.className = 'card';
            card.innerHTML = `
                <h3>${politician.name}</h3>
                <p>${politician.office}</p>
                <img class="politician-image" src="${politician.photoUrl || 'default-image.jpg'}" />
            `;
            politiciansContainer.appendChild(card);
        });
    }

    searchForm.addEventListener('submit', function(event) {
        event.preventDefault();
        // const zipCode = searchForm.querySelector('input[type="text"]').value;
        fetchPoliticians(zipCode);
    });

    sortButtons.forEach(button => {
        button.addEventListener('click', function() {
            sortButtons.forEach(btn => btn.classList.remove('selected'));
            this.classList.add('selected');
            const level = this.getAttribute('data-tab');
            renderSortedPoliticians(level);
        });
    });

    function renderSortedPoliticians(level) {
        const filteredPoliticians = level === 'all' ? allPoliticians : allPoliticians.filter(p => p.level === level);
        renderPoliticians(filteredPoliticians);
    }
});
