function startAnimation() {
    // Überprüfen, ob die Animation bereits gestartet wurde
    const animationStarted = sessionStorage.getItem("animationStarted");
  
    // Elemente auswählen
    const animationLogoWhite = document.getElementById("animation_logo_white");
    const animationLogoBlack = document.getElementById("animation_logo_blue");
    const background = document.getElementById('login_animation_container');
  
  
    // Hintergrund animieren, wenn die Animation nicht gestartet wurde
    if (!animationStarted) {
      setTimeout(() => {
        background.style.backgroundColor = "rgba(0, 0, 0, 0)";
        background.style.transition = "background-color 2s";
      }, 1000);
  
      // Buchstabe animieren
      animationLogoWhite.style.transform = "translate(-50%, -50%)"; // In der Mitte zentriert
      animationLogoBlack.style.transform = "translate(-50%, -50%)"; // In der Mitte zentriert
  
  
  
  
      // Warte kurz und bewege dann nach oben links
      setTimeout(() => {
        animationLogoWhite.style.transform = "translate(-45vw, -47vh)";
        animationLogoBlack.style.transform = "translate(-45vw, -47vh)";
        animationLogoWhite.style.opacity = 0;
        animationLogoBlack.style.opacity = 1;
        background.style.backgroundColor = "rgba(0, 0, 0, 0)"; // Mache den Hintergrund komplett transparent
  
        // Markiere, dass die Animation gestartet wurde
        sessionStorage.setItem("animationStarted", "true");
      }, 1000); // Starte die Bewegung nach 1 Sekunde
  
      setTimeout(() => {
        background.className = "z-index: -1"
      }, 2500);
    }
  }
  
  document.addEventListener("DOMContentLoaded", startAnimation);
  
  // Funktion erneut aufrufen, wenn die Seite neu geladen wird
  window.addEventListener("beforeunload", () => {
    // Zurücksetzen des Markierungsflags beim Neuladen der Seite
    sessionStorage.removeItem("animationStarted");
  });