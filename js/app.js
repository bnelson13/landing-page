/* Javascript for Landing Page*/


/* Building the Navigation Menu */

//Isolates teh navigation bar
const navbar_list = document.querySelector('#navbar__list');
//Determines how many sections there are in
const sectionAmount = document.querySelectorAll('section').length;
//Creates a new funciton call addLinks
const addLinks = function(ele) {
    //For loop that iterates as many # of times as the ele argument
    for(var i = 1; i <= ele; i++){
        //Creates a list item each time until i is maxed
        newLI = document.createElement('LI');
        //Adds a link with the section name of where i is currently
        newLI.innerHTML = `<a href='#section${i}' class='menu__link'>Section ${i}</a>`;
        //Appends this new child to the navigation bar
        navbar_list.appendChild(newLI);
    };
};
//Uses addLinks function for the number of sections there is
addLinks(sectionAmount);


/* Making Sections Active and changing their style */
//Setting up the conifiguration of our observer functions
const config = {
    //Keeps the window as the root
    root: null,
    //As soon as 1 pixel enters in reference frame it is triggered
    rootMargin: '0px',
    //20% of observed image may be in our threshold
    threshold: 0.2
};
let isLeaving = false;

let observer = new IntersectionObserver(function (entries) {
    entries.forEach(entry => {
        //If statement allows us to set whether the observed element is entering or leaving frame
        if(entry.isIntersecting) {
            isLeaving = true;
            entry.target.className = 'your-active-class';
        } else if (isLeaving) {
            isLeaving = false;
            entry.target.className = '';
            console.log(entry.target)
        } 
    });
}, config);

//Calls our observer function on all of the Sections
const sectionS = document.querySelectorAll('section');
sectionS.forEach(sectionPart => {
    observer.observe(sectionPart);
})


/* Slow Scroll to Internal Links */

//Puts all a tags with # targets in nodeList
let anchorLinks = document.querySelectorAll('a[href^="#"]')
//Iterates through each a tag
for (let anchorLink of anchorLinks) { 
    //Applies click listener on each tag and a function
    anchorLink.addEventListener('click', (e)=> {
        //Identify each links target
        let anchorValue = anchorLink.getAttribute('href')
        let anchorTarget = document.querySelector(anchorValue)
        //Uses behavior of scroll method to make it slow
        anchorTarget.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        })
        //Updates browswer url so it doesn't default to jumping to link
        history.pushState(null, null, anchorValue)
        //Prevents the link from functioning as normal
        e.preventDefault()
    })
}



