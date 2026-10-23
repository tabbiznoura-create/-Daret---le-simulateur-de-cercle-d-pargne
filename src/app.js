const nomCercle = document.querySelector("#nom-cercle");
const erreurNom = document.querySelector("#nom-cercle-erreur");
const regexNom = /^[A-Za-zÀ-ÖØ-öø-ÿ0-9 -]+$/;
const formulaire = document.querySelector("#daret-form");

formulaire.addEventListener("submit", function (event) {
  event.preventDefault();

  const nom = nomCercle.value.trim();

  if (nom.length < 3 || nom.length > 40 || !regexNom.test(nom)) {
    erreurNom.textContent =
      "Le nom doit contenir entre 3 et 40 caractères et ne doit pas contenir de caractères spéciaux (@, #, etc.).";
    erreurNom.classList.remove("hidden");
    nomCercle.setAttribute("aria-invalid", "true");
  } else {
    erreurNom.textContent = "";
    erreurNom.classList.add("hidden");
    erreurNom.removeAttribute("aria-invalid");
  }
});

const cotisation = document.querySelector("#cotisation");
const erreurCotisation = document.querySelector("#cotisation-erreur");

formulaire.addEventListener("submit", function (event) {
  event.preventDefault();

  const montant = Number(cotisation.value);

  if (montant < 100 || montant > 50000 || !Number.isInteger(montant)) {
    erreurCotisation.textContent =
      "La montant doit être supérieure à 100 MAD et inférieure à 50 000 MAD, sans décimales.";
    erreurCotisation.classList.remove("hidden");
    cotisation.setAttribute("aria-invalid", "true");
  } else {
    erreurCotisation.textContent = "";
    erreurCotisation.classList.add("hidden");
    erreurCotisation.removeAttribute("aria-invalid");
  }
});

const periodicite = document.querySelector("#periodicite");
const erreurPeriodicite = document.querySelector("#periodicite-erreur");

formulaire.addEventListener("submit", function (event) {
  event.preventDefault();

  const choix = periodicite.value;

  if (
    choix !== "hebdomadaire" &&
    choix !== "quinzaine" &&
    choix !== "mensuelle"
  ) {
    erreurPeriodicite.textContent = "Est invalide.";
    erreurPeriodicite.classList.remove("hidden");
    periodicite.setAttribute("aria-invalid", "true");
  } else {
    erreurPeriodicite.textContent = "";
    erreurPeriodicite.classList.add("hidden");
    erreurPeriodicite.removeAttribute("aria-invalid");
  }
});

// ---------------------Date de début -------------------------------

const date = document.querySelector("#date-debut");
const erreurDate = document.querySelector("#date-debut-erreur");
const aujourdHui = new Date().toLocaleDateString("sv-SE");
date.min = aujourdHui;

formulaire.addEventListener("submit", function (event) {
  event.preventDefault();

  if (date.value === "" || date.value < aujourdHui) {
    erreurDate.textContent =
      "La date de début doit être aujourd'hui ou une date ultérieure.";
    erreurDate.classList.remove("hidden");
    date.setAttribute("aria-invalid", "true");
  } else {
    erreurDate.textContent = "";
    erreurDate.classList.add("hidden");
    erreurDate.removeAttribute("aria-invalid");
  }
});

// ---------------------Participants -------------------------------

const participantsListe = document.querySelector("#participants-liste");
const participantsAjouter = document.querySelector("#ajouter-participant");

const erreurParticipants = document.querySelector("#participants-erreur");
const regexParticipant = /^[A-Za-zÀ-ÖØ-öø-ÿ' -]+$/;


const compteurParticipants = document.querySelector("#participants-compteur")

  function actualiserCompteur() {
    compteurParticipants.textContent =
      participantsListe.children.length + " participants";
  }

participantsAjouter.addEventListener("click", function (event) {
  event.preventDefault();

  if (participantsListe.children.length >= 20) {
    erreurParticipants.textContent = "La liste est plein !.";
    erreurParticipants.classList.remove("hidden");
    return;
  }

  const li = document.createElement("li");
  const btn = document.createElement("button");
  const input = document.createElement("input");



  input.type = "text";
  input.placeholder = "Nom du participant";

  btn.type = "button";
  btn.textContent = "Retirer";

  li.append(input, btn);
  participantsListe.append(li);
  actualiserRetirer()
  actualiserCompteur()
})


//---------------US-02 - Ajouter des participants -------------

for (let i = 0; i < 3; i++) {
  const li = document.createElement("li");
  const btn = document.createElement("button");
  const input = document.createElement("input");

  input.type = "text";
  input.placeholder = "Nom du participant";

  btn.type = "button";
  btn.textContent = "Retirer";

  li.append(input, btn);
  participantsListe.append(li);
}




function actualiserRetirer(){
const boutons = participantsListe.querySelectorAll("button")
boutons.forEach((btn) => {
  if(participantsListe.children.length <= 2){
    btn.classList.add("hidden")
  } else {
    btn.classList.remove("hidden")
  }})
}
actualiserRetirer()
actualiserCompteur()





participantsListe.addEventListener("click", (event)=> {

  if (event.target.tagName === "BUTTON") {
        if (participantsListe.children.length > 2) {
            event.target.parentElement.remove()
            actualiserCompteur()
            actualiserRetirer()
        }
    }
})


  









//^^^^^^^---------------US-02 - Ajouter des participants -------------

formulaire.addEventListener("submit", function (event) {
  event.preventDefault();

  const inputs = participantsListe.querySelectorAll("input");
  const noms = [];

  if (inputs.length < 2 || inputs.length > 20) {
    erreurParticipants.textContent =
      "Le nombre de participants doit être entre 2 et 20.";
    erreurParticipants.classList.remove("hidden");
    inputs[0]?.focus();
    return;
  }
  for (const input of inputs) {
    const nom = input.value.trim().toLowerCase();

    if (
      nom.length < 2 ||
      nom.length > 30 ||
      !regexParticipant.test(nom) ||
      noms.includes(nom)
    ) {
      erreurParticipants.textContent =
        "Prénom invalide ou déjà utilisé. Le prénom doit contenir entre 2 et 30 caractères, sans chiffres ni caractères spéciaux. Veuillez corriger le prénom et réessayer.";
      erreurParticipants.classList.remove("hidden");
      input.setAttribute("aria-invalid", "true");
      input.setAttribute("aria-describedby", "participants-erreur");
      input.focus();
      return;
    } else {
      noms.push(nom);
      input.removeAttribute("aria-invalid");
    }
  }

  erreurParticipants.textContent = "";
  erreurParticipants.classList.add("hidden");
});
