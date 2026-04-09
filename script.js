const API_URL = "https://common-api.sparkexhibit.com/api/green-impact-contact";

// 🔥 WHATSAPP NUMBER
const WHATSAPP_NUMBER = "919582118311";

const btn = document.getElementById("submitBtn");

// 🎯 CUSTOM ALERT FUNCTION
function showAlert(message, type = "success") {
  const alertBox = document.getElementById("customAlert");
  const alertText = document.getElementById("alertText");

  alertText.innerText = message;
  alertBox.className = `custom-alert show ${type}`;

  setTimeout(() => {
    alertBox.classList.remove("show");
  }, 3000);
}

btn.addEventListener("click", async (e) => {
  e.preventDefault();

  const name = document.getElementById("name").value.trim();
  const organisationName = document.getElementById("orgName").value.trim();
  const email = document.getElementById("email").value.trim();
  const phone = document.getElementById("phone").value.trim();
  const organisationType = document.getElementById("orgType").value;

  // ❌ VALIDATION
  if (!name || !organisationName || !email || !phone || !organisationType) {
    showAlert("Please fill all fields!", "error");
    return;
  }

  try {
    btn.innerText = "Submitting...";
    btn.disabled = true;

    const res = await fetch(API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name,
        organisationName,
        email,
        phone,
        organisationType,
      }),
    });

    const data = await res.json();

    if (data.success) {

      // 📲 WhatsApp message
      const message = `🌿 *New Green Impact Request*  

👤 Name: ${name}
🏢 Organisation: ${organisationName}
📧 Email: ${email}
📞 Phone: ${phone}
🏫 Type: ${organisationType}`;

      const whatsappURL = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;

      // ✅ SUCCESS ALERT
      showAlert("Submitted successfully! Redirecting to WhatsApp...", "success");

      // ✅ DIRECT REDIRECT (NO BLOCK)
      window.location.href = whatsappURL;

      // 🔄 Reset form
      document.getElementById("name").value = "";
      document.getElementById("orgName").value = "";
      document.getElementById("email").value = "";
      document.getElementById("phone").value = "";
      document.getElementById("orgType").selectedIndex = 0;

    } else {
      throw new Error();
    }

  } catch (error) {
    console.error(error);
    showAlert("Something went wrong!", "error");
  } finally {
    btn.innerText = "🌿 Book My Green Impact Day — It's Free";
    btn.disabled = false;
  }
});