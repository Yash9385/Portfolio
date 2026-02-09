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

    /* ================= CONTACT FORM ================= */
    const form = document.getElementById("contact-form");

    form.addEventListener("submit", async (e) => {
        e.preventDefault();

        const data = {
            name: document.getElementById("name").value,
            email: document.getElementById("email").value,
            subject: document.getElementById("subject").value,
            message: document.getElementById("message").value,
        };

        try {
            const res = await fetch("http://localhost:3000/send-email", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(data),
            });

            const result = await res.json();

            if (result.success) {
                alert("Message Sent Successfully ✅");
                form.reset();
            } else {
                alert("Server error ❌");
            }
        } catch (err) {
            alert("Connection error ❌");
            console.error(err);
        }
    });

});

/* ================= SERVICE TOGGLE ================= */
function toggleDetails(id) {
    document.getElementById(id).classList.toggle("show");
}
