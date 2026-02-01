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
    showCursor: false   // 👈 ADD THIS
});


    /* ================= CIRCULAR SKILLS ================= */
    document.querySelectorAll(".circle").forEach(circle => {
        let percent = circle.getAttribute("data-percent");
        let radius = 60;
        let circumference = 2 * Math.PI * radius;

        let svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");

        let bg = document.createElementNS("http://www.w3.org/2000/svg", "circle");
        bg.setAttribute("cx", "70");
        bg.setAttribute("cy", "70");
        bg.setAttribute("r", radius);
        bg.classList.add("bg");

        let progress = document.createElementNS("http://www.w3.org/2000/svg", "circle");
        progress.setAttribute("cx", "70");
        progress.setAttribute("cy", "70");
        progress.setAttribute("r", radius);
        progress.classList.add("progress");

        progress.style.strokeDasharray = circumference;
        progress.style.strokeDashoffset =
            circumference - (percent / 100) * circumference;

        let number = document.createElement("span");
        number.textContent = percent + "%";

        svg.appendChild(bg);
        svg.appendChild(progress);
        circle.appendChild(svg);
        circle.appendChild(number);
    });

});

/* ================= SERVICE TOGGLE ================= */
function toggleDetails(id) {
    document.getElementById(id).classList.toggle("show");
}
/* ================= CONTACT FORM ================= */
document.addEventListener("DOMContentLoaded", () => {
    const form = document.querySelector(".contact-right form");

    form.addEventListener("submit", async (e) => {
        e.preventDefault();

        const formData = {
            name: form.querySelector("input[type='text']").value,
            email: form.querySelector("input[type='email']").value,
            subject: form.querySelectorAll("input[type='text']")[1].value,
            message: form.querySelector("textarea").value
        };

        try {
            const res = await fetch("http://localhost:5001/send",
 {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData)
            });

            const data = await res.json();

            if (data.success) {
                alert("Message Sent Successfully 🚀");
                form.reset();
            } else {
                alert("Server error ❌");
            }
        } catch (err) {
            console.error(err);
            alert("Connection error ❌");
        }
    });
});
