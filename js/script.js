    document.addEventListener("DOMContentLoaded", function () {
        const inputs = document.querySelectorAll('.zip-input');
        inputs.forEach((input, index) => {
            input.addEventListener('keydown', (e) => {
                if(e.key === "Backspace" && e.target.value === '' && index > 0) {
                    inputs[index - 1].focus();
                }
            });
            input.addEventListener('input', () => {
                let value = input.value;
                input.value = value ? value[0] : ''; // Ensures only 1 character
                if (input.nextElementSibling && value) {
                    input.nextElementSibling.focus();
                }
            });
        });
    
        document.getElementById('zipForm').addEventListener('submit', function (e) {
            e.preventDefault();
            let zipCode = Array.from(inputs).map(input => input.value).join('');
            window.location.href = 'dashboard.html?zipcode=' + zipCode;
        });
        
    
    // Initial animation for the welcome text
    gsap.from(".welcome-1", {
        y: 20,
        opacity: 0,
        ease: "power2.out",
        duration: 2,
        delay: 1
    });

    gsap.from(".welcome-2", {
        y: -20,
        opacity: 0,
        ease: "power2.out",
        duration: 2,
        delay: 1
    });

    // Stagger zipcode text boxes
    gsap.to(".zip-input", {
        duration: 1.5,
        ease: "power4.in",
        opacity: 1,
        delay: 2,
        stagger: 0.2
    });

    gsap.to(".submit", {
        duration: 2,
        ease: "power4.inOut",
        opacity: 1,
        delay: 4,
    })


    gsap.to(".subtext", {
        duration: 2,
        ease: "power4.in",
        opacity: 1,
        delay: 2,
    })

});
