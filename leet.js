document.addEventListener("DOMContentLoaded",function() {
    
    const searchButton=document.getElementById("search-btn");
    const userNameInput=document.getElementById("user-input");
    const statsContainer=document.querySelector(".stats-container");

    const easyProgressCircle=document.querySelector(".easy-progress");
    const mediumProgressCircle=document.querySelector(".medium-progress");
    const hardProgressCircle=document.querySelector(".hard-progress");

    const easyLabel=document.getElementById("easy-label");
    const mediumLabel=document.getElementById("medium-label");
    const hardLabel=document.getElementById("hard-label");

    const cardContainer=document.querySelector(".stats-card");

    
    function validateUserName(username) {
        if(username.trim()===""){
            alert("Please enter username");
            return false;
        }
        const regx=/^[a-zA-Z0-9_-]{1,15}$/;
        const isMatching= regx.test(username);
        if(!isMatching)
           {
            alert("Invalid username");
           }
           return isMatching;
    }

    async function fetchUserDetails(username) {
        const url=`https://leetcode-stats-api.herokuapp.com/${username}`;
    
        try{
            searchButton.textContent="Searching...";
            searchButton.disabled=true;
            const response= await fetch(url);
        
            if(!response.ok){
                throw new Error("unable to fetch user details");
                
            }
            const data= await response.json();
            console.log("Logging data", data);
            
            displayUserData(data);
        }
        catch(error){
            statsContainer.innerHTML=`<p>no data found<p/>`
        }
        finally{
            searchButton.textContent="Search";
            searchButton.disabled=false;
        }
    }

    function updateProgressBar(Solved,total,label,circle) {
        const progressDegree=(Solved/total)*100;
        circle.style.setProperty("--progress-degree",`${progressDegree}%`);
        label.textContent=`${Solved}/${total}`;

        
    }

    function displayUserData(data){
        const totalQues=data.totalQuestions;
        const totalEasy=data.totalEasy;
        const totalMedium=data.totalMedium;
        const totalHard=data.totalHard;

        const easySolved=data.easySolved;
        const mediumSolved=data.mediumSolved;
        const hardSolved=data.hardSolved;

        const totalSolved=data.totalSolved;


        updateProgressBar(easySolved,totalEasy,easyLabel,easyProgressCircle);
        updateProgressBar(mediumSolved,totalMedium,mediumLabel,mediumProgressCircle);
        updateProgressBar(hardSolved,totalHard,hardLabel,hardProgressCircle);


        const cardData=[
            {Label:"Overall-Submission",value:data.totalSolved},
            {Label:"Easy-Submission", value:data.easySolved},
            {Label:"Medium-Submission",value:data.mediumSolved},
            {Label:"Hard-Submission",value:data.hardSolved}
        ];
        console.log("Card-Data",cardData);
        
        cardContainer.innerHTML=cardData.map(
            data=>{
                return `
                <div class="card">
                <h3>${data.Label}</h3>
                <p>${data.value}</p>
                </div>
                `
            }
        ).join("");



        console.log("Total Ques ",totalQues);
        console.log("Total Solved Ques ",totalSolved);
        
        console.log("Total Easy Ques ",totalEasy);
        console.log("Total Medium Ques ",totalMedium);
        console.log("Total Hard Ques ",totalHard);

        console.log("Easy Solved ", easySolved);
        console.log("Medium Solved",mediumSolved);
        console.log("Hard Solved ", hardSolved);
          
        
    }

    searchButton.addEventListener('click',function(){
        const username= userNameInput.value;
        console.log(username);

        if(validateUserName(username)){
            fetchUserDetails(username);
        }
        
    })


})