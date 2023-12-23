// document.addEventListener("DOMContentLoaded", function () {
//     const params = new URLSearchParams(window.location.search);
//     const zipCode = params.get('zipcode');
//     let currentLevelFilter = 'All'; // Default filter

//     // Function to create sort buttons and add event listeners
//     function createSortButtons() {
//         const sortOptions = ['All', 'Federal', 'State', 'Local'];
//         const buttonsContainer = document.createElement('div');
//         buttonsContainer.id = 'sortButtonsContainer';

//         sortOptions.forEach(option => {
//             const button = document.createElement('button');
//             button.textContent = option;
//             button.addEventListener('click', () => {
//                 currentLevelFilter = option;
//                 fetchPoliticians(zipCode).then(renderPoliticians);
//             });
//             buttonsContainer.appendChild(button);
//         });

//         document.body.insertBefore(buttonsContainer, document.getElementById('politiciansContainer'));
//     }

//     // Function to sort politicians based on level
//     function sortPoliticians(officials, offices) {
//         if (currentLevelFilter === 'All') {
//             return officials;
//         }

//         return officials.filter((_, index) => {
//             const office = offices.find(office => office.officialIndices.includes(index));
//             // Assuming that the office names contain the level type
//             return office?.name.includes(currentLevelFilter);
//         });
//     }

//     // Function to fetch politicians' data
//     async function fetchPoliticians(zipCode) {
//         const apiKey = 'AIzaSyAiGJQ1KX1fijZ9QLCQM4FC8Am9CYt_oTc'; // Replace with your actual API key
//         const url = `https://www.googleapis.com/civicinfo/v2/representatives?key=${apiKey}&address=${zipCode}`;
    
//         try {
//             const response = await fetch(url);
//             const data = await response.json();
//             return { officials: data.officials, offices: data.offices };
//         } catch (error) {
//             console.error('Error fetching data: ', error);
//         }
//     }
    
//     // Function to fetch politician images
//     async function fetchPoliticianImage(politicianName) {
//         const apiKey = '93283553d330421c9c2dfc4f94f9557a'; // Replace with your actual API key
//         const url = `https://api.bing.microsoft.com/v7.0/images/search?q=${encodeURIComponent(politicianName)}&count=1`;
    
//         try {
//             const response = await fetch(url, {
//                 headers: { 'Ocp-Apim-Subscription-Key': apiKey }
//             });
//             const data = await response.json();
//             return data.value[0]?.contentUrl; // Get the URL of the first image
//         } catch (error) {
//             console.error('Error fetching image: ', error);
//         }
//     }
    
//     const delay = ms => new Promise(res => setTimeout(res, ms));

//     // Function to render politicians on the page
//     async function renderPoliticians(data) {
//         const { officials, offices } = data;
//         const container = document.getElementById('politiciansContainer');
//         container.className = 'card-grid';
//         container.innerHTML = ''; // Clear existing cards before rendering new ones
    
//         const sortedOfficials = sortPoliticians(officials, offices);
    
//         for (let i = 0; i < sortedOfficials.length; i += 3) { // Process in batches of 3
//             const batch = sortedOfficials.slice(i, i + 3);
    
//             const imagePromises = batch.map(async (politician, index) => {
//                 const office = offices.find(office => office.officialIndices.includes(index + i));
//                 const imageUrl = await fetchPoliticianImage(politician.name); // Fetch image
    
//                 return { politician, office, imageUrl };
//             });
    
//             // Wait for all the image fetches in this batch to complete
//             const results = await Promise.all(imagePromises);
    
//             results.forEach(({ politician, office, imageUrl }) => {
//                 const card = document.createElement('div');
//                 card.className = 'card';
//                 card.innerHTML = `
//                     <img src="${imageUrl}" alt="${politician.name}" class="politician-image">
//                     <h3>${politician.name}</h3>
//                     <p>${office?.name || 'Not Available'}</p>
//                 `;
//                 container.appendChild(card);
//             });
    
//             // Wait for 1 second before proceeding to the next batch
//             await delay(1000);
//         }
//     }
    
//     // Fetch and display data
//     fetchPoliticians(zipCode).then(renderPoliticians);

//     // Create sort buttons
//     createSortButtons();
// });


document.querySelectorAll('.sort-button').forEach(button => {
    button.addEventListener('click', function() {
        // Remove selected class from all buttons
        document.querySelectorAll('.sort-button').forEach(btn => btn.classList.remove('selected'));

        // Add selected class to the clicked button
        this.classList.add('selected');

        // Your sorting logic goes here
        // Example: sortList(this.dataset.tab);
    });
});




// // Azure apiKey = '93283553d330421c9c2dfc4f94f9557a';

// // Politician apiKey = 'AIzaSyAiGJQ1KX1fijZ9QLCQM4FC8Am9CYt_oTc';