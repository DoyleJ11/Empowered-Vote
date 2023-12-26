document.addEventListener("DOMContentLoaded", () => {
    const container = document.querySelector(".container");
    const sidebar = document.querySelector(".sidebar");
    const cards = gsap.utils.toArray(".nav-card");
    const overlayToggle = document.querySelector(".overlay-toggle");

    sidebar.style.pointerEvents = "none";

    function animateCardsIn() {
      gsap.to(overlayToggle, {
        top: "-500px",
        duration: 1,
        ease: "power4.out",
      });

      gsap.to(
        cards,
        {
          top: "0%",
          stagger: 0.075,
          duration: 1,
          ease: "power4.out",
        },
        "<"
      );

      gsap.to(
        container,
        {
          filter: "blur(15px)",
          duration: 1,
          immediateRender: false,
        },
        "<"
      );
      sidebar.style.pointerEvents = "all";
    }

    function animateCardsOut() {
      gsap.to(overlayToggle, {
        top: "0px",
        duration: 1,
        ease: "power4.out",
      });

      gsap.to(cards, {
        top: "-110%",
        stagger: 0.075,
        duration: 1,
        ease: "power4.out",
      });

      gsap.to(
        container,
        {
          filter: "blur(0px)",
          duration: 1,
          immediateRender: false,
        },
        "<"
      );
      sidebar.style.pointerEvents = "none";
    }

    overlayToggle.addEventListener("click", () => {
        if (sidebar.style.pointerEvents === "none") {
            animateCardsIn();
        } else {
            animateCardsOut();
        }
    });

    cards.forEach((card) => {
      card.addEventListener("click", () => {
        sidebar.style.pointerEvents = "none";
        animateCardsOut();
      });
    });

    const closeBtn = document.getElementById("close-btn");
    closeBtn.addEventListener("click", (e) => {
        e.stopPropagation();  // Prevent click event from bubbling up to the parent elements
        animateCardsOut();
    });

    const connect = document.getElementById("connect-card");
    connect.addEventListener("click", () => {
        window.location.href = "/connect.html";
    });

  });