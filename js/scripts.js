function loadCV() {
    fetch('cv.json')
    .then((response) => response.json())
    .then((data) => {
        const educations = data.educations;
        const educationHTML = document.getElementById("education-list");
        educationHTML.innerHTML = "";

        educations.forEach(education => {
            educationHTML.innerHTML += 
            `
            <li>
                <h3>${education.startYear} - ${education.endYear}</h3>
                <strong>${education.education}</strong><br>
                <em>${education.school}</em>
            </li>
        `;
        });


        const work = data.work;
        const workHTML = document.getElementById("job-list");
        workHTML.innerHTML = "";

        work.forEach(job => {
            workHTML.innerHTML += 
            `
            <li>
                <h3>${job.startYear} - ${job.endYear}</h3>
                <strong>${job.job}</strong><br>
                <em>${job.company}</em>
            </li>
        `;
        });

        const programmingSkills = data.programmingSkills;
        const skillsHTML = document.getElementById("skills-list");
        skillsHTML.innerHTML = "";

        programmingSkills.forEach(skill => {
            skillsHTML.innerHTML += 
            `
            <li>
                ${skill}
            </li>
        `;
        });

        const languages = data.languages;
        const languagesHTML = document.getElementById("language-list");
        languagesHTML.innerHTML = "";

        languages.forEach(language => {
            languagesHTML.innerHTML += 
            `
            <li>
                ${language}
            </li>
        `;
        });

        const other = data.other;
        const otherHTML = document.getElementById("other-list");
        otherHTML.innerHTML = "";

        other.forEach(otherItem => {
            otherHTML.innerHTML += 
            `
            <li>
                ${otherItem}
            </li>
        `;
        });
  });
}

let projects = [];

async function loadProjects() {


    document.getElementById('close').addEventListener("click", close);

    let responseProjects = await fetch('projects.json');
    projects = await responseProjects.json();
    let responseGithub = await fetch('https://api.github.com/users/LukuxDev/repos');
    let github = await responseGithub.json();

    document.getElementById('cards').innerHTML = "";
    for (let i = 0; i < projects.length; i++) {
        let gitBtn = "";
        if(projects[i].hasGithub) {
            const githubProject = github.find((p) => p.id == projects[i].id);
            projects[i].title = githubProject.name;
            projects[i].gameLink = "https://lukuxdev.github.io/" + projects[i].title;
            gitBtn = `<a class="show-btn" href="${githubProject.html_url}">Go to Github</a>`
        }
        let ShowBtn = "";
        if(projects[i].gameLink != null)
            ShowBtn = `<a class="show-btn" href="${projects[i].gameLink}">Show Project</a>`;
        
        let gridColumn = "";
        if(projects[i].size == "large")
            gridColumn = "large-card";

        document.getElementById('cards').innerHTML += `
        <div class="${gridColumn} card ">
        <img src="${projects[i].img}" alt="Image of ${projects[i].title}">
            <div class="container">
                <h2>${projects[i].title}</h2>
                <p>${projects[i].shortDescription}</p>
            </div>
            <div class="btn-group">
            <button class="read-more-btn" onclick="readmore(${i})">Read more</button>
            ${ShowBtn}
            ${gitBtn}
            </div>

        </div>
        `;

    }
}

function readmore(i) {
    
    document.getElementById('modal').style.display = "flex";

    
    document.getElementById("m-img").src = projects[i].img;
    
    document.getElementById("m-title").innerText = projects[i].title;
    
    document.getElementById("m-description").innerText = projects[i].longDescription;

    console.log(projects[i]);

}

function close() {
    document.getElementById('modal').style.display = "none";
}