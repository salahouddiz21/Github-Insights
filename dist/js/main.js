document.getElementById("ProfileInsights").addEventListener("click", function () {
    const searchUserSection = document.getElementById("searchUser");
    const firstSection = document.getElementById("firstSection");
  
    if (searchUserSection.style.display === "none") {
      searchUserSection.style.display = "block";
    } else {
      searchUserSection.style.display = "none";
    }
  
    if (firstSection.style.display === "none") {
      firstSection.style.display = "block";
    } else {
      firstSection.style.display = "none";
    }
  });
  


  const searchInput = document.getElementById('search');
  const firstSection = document.getElementById('firstSection');
  const repoCountElement = document.getElementById('repoCount');
  const languagesCountElement = document.getElementById('languagesCount');
  
  searchInput.addEventListener('input', async function() {
    const username = this.value;
    const userResponse = await fetch(`https://api.github.com/users/${username}`);
    const userData = await userResponse.json();
  
    // Clear previous data
    firstSection.innerHTML = '';
  
    if (userData.message === 'Not Found') {
      firstSection.innerHTML = '<p>User not found</p>';
      repoCountElement.textContent = 'Number of Repos: 0'; // Reset repo count
      languagesCountElement.textContent = 'Number of used languages: 0'; // Reset languages count
      return;
    }
  
    // Update the content of the username element with the fetched username
    const usernameElement = document.getElementById('username');
    usernameElement.textContent = userData.login;
  
    const repositoriesResponse = await fetch(`https://api.github.com/users/${username}/repos`);
    const reposData = await repositoriesResponse.json();
  
    // Display repositories
    reposData.forEach(repo => {
      const repoElement = document.createElement('div');
      repoElement.className = 'flex mt-10 ml-10 pl-3 pb-36 border-solid border border-gray-500 rounded-md bg-transparent h-9';
  
      repoElement.innerHTML = 
      `<div>
          <div> 
            <h3 class="flex pt-2 font-bold items-center text-sm text-blue-600">${repo.name}</h3>
          </div>
          <div class="flex ml-64 pr-4 ">
            <h3 class="ml-40 font-semibold items-center text-xs text-slate-500 border-solid border border-gray-500 rounded-xl px-2">${repo.private ? 'Private' : 'Public'}</h3>
          </div>
        </div>
        <div>
          <h3 class="font-semibold items-center text-xs text-slate-500">${repo.description || 'No description'}</h3>
        </div>
        <div class="mt-14">
          <h3 class="flex font-semibold items-center text-xs text-slate-500">
            <svg class="mr-1" width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg">
              <circle cx="7.5" cy="7.5" r="7" fill="${getLanguageColor(repo.language)}" stroke="#848D97"/>
            </svg>
            ${repo.language || 'Unknown'}
          </h3>
        </div>
      `;
  
      firstSection.appendChild(repoElement);
    });
  
    // Update the number of repos
    repoCountElement.textContent = `Number of Repos: ${reposData.length}`;
  
    // Calculate the number of used languages
    const usedLanguages = reposData.map(repo => repo.language).filter(language => language);
    const uniqueLanguages = [...new Set(usedLanguages)];
    languagesCountElement.textContent = `Number of used languages: ${uniqueLanguages.length}`;
  });
  
  function getLanguageColor(language) {

    const colors = {
      'JavaScript': '#f1e05a',
      'HTML': '#e34c26',
      'CSS': '#563d7c',
      'Python': '#3572A5',
      'Shell': '#89E051',
      'PHP': '#4F5D95',
      'C': '#555555',
      'C++': 'C++ ',
      'Java': '#B07219',
      'Ruby': '#701516',
      'Dockerfile': '#384D54',
      'Unknown': '#ccc',
    };
  
    return colors[language] || colors['Unknown'];
  }
  
  