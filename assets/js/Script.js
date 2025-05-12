/*==================== SLIDESHOW ====================*/
let slideIndex = 0;
showSlides();

function showSlides() {
  let i;
  let slides = document.getElementsByClassName("mySlides");
  let dots = document.getElementsByClassName("dot");
  for (i = 0; i < slides.length; i++) {
    slides[i].style.display = "none";  
  }
  slideIndex++;
  if (slideIndex > slides.length) {slideIndex = 1}    
  for (i = 0; i < dots.length; i++) {
    dots[i].className = dots[i].className.replace(" active", "");
  }
  slides[slideIndex-1].style.display = "block";  
  dots[slideIndex-1].className += " active";
  setTimeout(showSlides, 2000); // Change image every 2 seconds
}


/*==================== NAVIGATION ====================*/
  
  document.addEventListener("DOMContentLoaded", function () {
    const hamburger = document.getElementById("hamburger-btn");
    const navMenu = document.getElementById("nav-menu");

    hamburger.addEventListener("click", () => {
      navMenu.classList.toggle("show");
    });

    // Optional: close nav when a link is clicked (mobile)
    document.querySelectorAll('.nav-link').forEach(link => {
      link.addEventListener('click', () => {
        navMenu.classList.remove('show');
      });
    });
  });



/*==================== LOGO SECTION ====================*/
document.addEventListener("DOMContentLoaded", () => {
    const track = document.getElementById("logo-track");
    let scrollAmount = 0;
    const speed = 0.5; // Adjust scroll speed here

    function animateScroll() {
        scrollAmount -= speed;
        // Reset scroll to loop
        if (Math.abs(scrollAmount) >= track.scrollWidth / 2) {
            scrollAmount = 0;
        }
        track.style.transform = `translateX(${scrollAmount}px)`;
        requestAnimationFrame(animateScroll);
    }

    animateScroll();
});
 


/*==================== BACK TO TOP BUTTON ====================*/
// Show or hide the "Back to Top" button based on scroll position
window.onscroll = () => {
    document.getElementById("topBtn").style.display =
        window.scrollY > 300 ? "block" : "none";
};

// Smooth scroll to top when the button is clicked
function scrollToTop() {
    window.scrollTo({
        top: 0,
        behavior: 'smooth' // Smooth scrolling effect
    });
}

console.log(document.getElementById("topBtn"));



//  ==================== JOIN US ==================== 

        document.addEventListener("DOMContentLoaded", function() {
            // Load saved form data if available
            loadFormData();
            
            // Show/hide registration number field based on membership type
            document.querySelectorAll('input[name="memberType"]').forEach(radio => {
                radio.addEventListener('change', function() {
                    document.getElementById('regNoGroup').style.display = 
                        this.value === 'Bonafide' ? 'block' : 'none';
                });
            });
            
            // Form submission handler
            document.getElementById('signupForm').addEventListener('submit', function(e) {
                e.preventDefault();
                
                // Save form data
                saveFormData();
                
                // Create celebration effect
                createConfetti();
                
                // Show success animation
                const form = this;
                form.style.animation = 'pulse 0.5s ease';
                
                setTimeout(() => {
                    form.style.animation = '';
                    
                    // Show success message
                    alert('Merci! Your application has been submitted successfully!');
                    
                    // Clear form after submission (optional)
                    // form.reset();
                    // clearFormData();
                }, 500);
            });
            
            // Form reset handler
            document.getElementById('signupForm').addEventListener('reset', function() {
                // Clear saved form data
                clearFormData();
                
                // Show reset animation
                const form = this;
                form.style.animation = 'fadeOut 0.5s ease';
                
                setTimeout(() => {
                    form.style.animation = 'fadeIn 0.5s ease';
                    setTimeout(() => {
                        form.style.animation = '';
                    }, 500);
                }, 500);
            });
            
            // Function to save form data to localStorage
            function saveFormData() {
                const form = document.getElementById('signupForm');
                const formData = new FormData(form);
                const formObject = {};
                
                formData.forEach((value, key) => {
                    formObject[key] = value;
                });
                
                localStorage.setItem('frenchClubFormData', JSON.stringify(formObject));
                
                // Track form submissions
                const submissionCount = localStorage.getItem('frenchClubSubmissions') || 0;
                localStorage.setItem('frenchClubSubmissions', parseInt(submissionCount) + 1);
            }
            
            // Function to load saved form data
            function loadFormData() {
                const savedData = localStorage.getItem('frenchClubFormData');
                if (savedData) {
                    const formObject = JSON.parse(savedData);
                    const form = document.getElementById('signupForm');
                    
                    for (const key in formObject) {
                        if (formObject.hasOwnProperty(key)) {
                            const element = form.elements[key];
                            if (element) {
                                if (element.type === 'radio') {
                                    document.querySelector(`input[name="${key}"][value="${formObject[key]}"]`).checked = true;
                                } else {
                                    element.value = formObject[key];
                                }
                            }
                        }
                    }
                    
                    // Trigger change event for membership type to show/hide reg no field
                    const memberType = document.querySelector('input[name="memberType"]:checked');
                    if (memberType) {
                        document.getElementById('regNoGroup').style.display = 
                            memberType.value === 'Bonafide' ? 'block' : 'none';
                    }
                    
                    // Show welcome back message if data exists
                    if (formObject.firstName) {
                        const welcomeElement = document.createElement('div');
                        welcomeElement.textContent = `Welcome back, ${formObject.firstName}!`;
                        welcomeElement.style.position = 'fixed';
                        welcomeElement.style.top = '10px';
                        welcomeElement.style.right = '10px';
                        welcomeElement.style.background = 'rgba(0, 85, 164, 0.9)';
                        welcomeElement.style.color = 'white';
                        welcomeElement.style.padding = '8px 16px';
                        welcomeElement.style.borderRadius = '20px';
                        welcomeElement.style.zIndex = '1000';
                        welcomeElement.style.animation = 'fadeIn 0.5s ease';
                        document.body.appendChild(welcomeElement);
                        
                        setTimeout(() => {
                            welcomeElement.style.animation = 'fadeOut 1s ease';
                            setTimeout(() => {
                                welcomeElement.remove();
                            }, 1000);
                        }, 3000);
                    }
                }
            }
            
            // Function to clear saved form data
            function clearFormData() {
                localStorage.removeItem('frenchClubFormData');
            }
            
            // Function to create confetti effect
            function createConfetti() {
                const colors = ['#0055a4', '#ef4135', '#ffffff', '#28a745'];
                
                for (let i = 0; i < 100; i++) {
                    const confetti = document.createElement('div');
                    confetti.className = 'confetti';
                    confetti.style.left = `${Math.random() * 100}vw`;
                    confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
                    confetti.style.width = `${Math.random() * 10 + 5}px`;
                    confetti.style.height = `${Math.random() * 10 + 5}px`;
                    confetti.style.animationDelay = `${Math.random() * 2}s`;
                    document.body.appendChild(confetti);
                    
                    setTimeout(() => {
                        confetti.remove();
                    }, 3000);
                }
            }
            
            // Add floating "+1" animation to radio buttons when selected
            document.querySelectorAll('input[type="radio"]').forEach(radio => {
                radio.addEventListener('click', function() {
                    if (this.checked) {
                        const label = this.closest('label');
                        const animation = document.createElement('div');
                        animation.textContent = '+1';
                        animation.style.position = 'absolute';
                        animation.style.color = '#28a745';
                        animation.style.fontWeight = 'bold';
                        animation.style.fontSize = '1.2rem';
                        animation.style.pointerEvents = 'none';
                        animation.style.animation = 'floatUp 1s forwards';
                        animation.style.zIndex = '1000';
                        
                        const rect = label.getBoundingClientRect();
                        animation.style.left = `${rect.left + rect.width/2 - 10}px`;
                        animation.style.top = `${rect.top - 10}px`;
                        
                        document.body.appendChild(animation);
                        
                        setTimeout(() => {
                            animation.remove();
                        }, 1000);
                    }
                });
            });
        });
    