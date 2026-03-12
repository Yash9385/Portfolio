document.addEventListener("DOMContentLoaded", function () {

    /* ================= TYPED TEXT ================= */
    new Typed(".text", {
        strings: [
            "Full Stack Developer",
            "Web Designer",
            "Freelancer",
            "Open Source Contributor"
        ],
        typeSpeed: 60,
        backSpeed: 40,
        backDelay: 1500,
        startDelay: 200,
        smartBackspace: true,
        loop: true,
        showCursor: false
    });

});

/* ================= SERVICE TOGGLE ================= */
function toggleDetails(id) {
    document.getElementById(id).classList.toggle("show");
}