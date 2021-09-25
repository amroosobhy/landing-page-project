/**
 * 
 * Manipulating the DOM exercise.
 * Exercise programmatically builds navigation,
 * scrolls to anchors from navigation,
 * and highlights section in viewport upon scrolling.
 * 
 * Dependencies: None
 * 
 * JS Version: ES2015/ES6
 * 
 * JS Standard: ESlint
 * 
*/

/**
 * Define Global Variables
 * 
*/

// list of all sections and nav links
let sections;
let links;

/**
 * End Global Variables
 * Start Helper Functions
 * 
*/
// update active-link class for links as per related sections
function updateLinks(target, intersected){
    links = document.querySelectorAll('.menu__link');

    links.forEach(function(link){        
        if(target.getAttribute('data-nav') === link.innerText){
            if(intersected){
                link.classList.add('active-link');            
            }else{
                link.classList.remove('active-link');
            }
        }
    });

}


/**
 * End Helper Functions
 * Begin Main Functions
 * 
*/

// build the nav
function buildNav(){
    let sectionName;
    let fragment = document.createDocumentFragment();
    let navItem;
    
    //loop over all sections to add navbar links for them
    //using fragment for better performance
    sections = document.querySelectorAll('section');
    for(const section of sections){    
        sectionName = section.getAttribute('data-nav');
        navItem = document.createElement('li');
        navItem.innerText = sectionName;
        navItem.className = 'menu__link';
        fragment.appendChild(navItem);
    }

    let navList = document.querySelector('#navbar__list');
    navList.appendChild(fragment);
}


// Add class 'active' to section when near top of viewport
let setActive = function(entries, observer){ 
    
    // update active class for section and link 
    entries.forEach(function(entry){

        if(entry.isIntersecting){                      
            entry.target.className='active-section'; 
            updateLinks(entry.target, true);
        }else{
            entry.target.className='';
            updateLinks(entry.target, false);
        } 
        
    });
};

//create IntersectionObserver object for each section
// and pass callback method setActive()
function createObserver(){     

    const targets = document.querySelectorAll('section');    
    targets.forEach(function(target){
       if(target){ 
           const observer = new IntersectionObserver((entries) => {
            setActive(entries, observer)
            },
            {threshold: 0.8});        
            observer.observe(target);
        }
        
    });

}


// Scroll to anchor ID using scrollTO event
function scrollToSection(clickedItem){
    let targetSection;
    let itemText = clickedItem.innerText;

    //get the corrosponding section
    sections.forEach(function(section){
        if(section.getAttribute('data-nav') === itemText){
            targetSection = section;                    
         }
        
    })
    
    //scroll smoothly to the section 
    targetSection.scrollIntoView({behavior: "smooth"});
}

/**
 * End Main Functions
 * Begin Events
 * 
*/

// Build menu
window.addEventListener('load', buildNav);

// Scroll to section on link click
document.addEventListener('click', function(event){
    //call the function if clicked element is nav item 
    if(event.target.className === 'menu__link'){
        scrollToSection(event.target);
    }
});

// Set sections as active
window.addEventListener('load', createObserver);
