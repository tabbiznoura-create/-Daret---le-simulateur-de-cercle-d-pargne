
const formulaire = document.querySelector("#daret-form");

// -------------------- Nom du cercle --------------------

const nomCercle = document.querySelector("#nom-cercle");
const erreurNom = document.querySelector("#nom-cercle-erreur");
const regexNom = /^[A-Za-zÀ-ÖØ-öø-ÿ0-9 -]+$/;

// -------------------- Cotisation --------------------

const cotisation = document.querySelector("#cotisation");
const erreurCotisation = document.querySelector("#cotisation-erreur");

// -------------------- Périodicité --------------------

const periodicite = document.querySelector("#periodicite");
const erreurPeriodicite = document.querySelector("#periodicite-erreur");

// -------------------- Date de début --------------------

const date = document.querySelector("#date-debut");
const erreurDate = document.querySelector("#date-debut-erreur");
const aujourdHui = new Date().toLocaleDateString("sv-SE");

date.min = aujourdHui;

// -------------------- Participants --------------------

const participantsListe = document.querySelector("#participants-liste");
const participantsAjouter = document.querySelector("#ajouter-participant");
const erreurParticipants = document.querySelector("#participants-erreur");
const compteurParticipants = document.querySelector("#participants-compteur");
const regexParticipant = /^[A-Za-zÀ-ÖØ-öø-ÿ' -]+$/;

function actualiserCompteur() {
  compteurParticipants.textContent =
    participantsListe.children.length + " participants";
}

function actualiserRetirer() {
  const boutons = participantsListe.querySelectorAll("button");

  boutons.forEach((btn) => {
    if (participantsListe.children.length <= 2) {
      btn.classList.add("hidden");
    } else {
      btn.classList.remove("hidden");
    }
  });
}

function creerParticipant() {
  const li = document.createElement("li");
  const input = document.createElement("input");
  const btn = document.createElement("button");

  input.type = "text";
  input.placeholder = "Nom du participant";

  btn.type = "button";
  btn.textContent = "Retirer";

  li.append(input, btn);
  participantsListe.append(li);
}

// Créer les 3 participants de départ
for (let i = 0; i < 3; i++) {
  creerParticipant();
}

actualiserRetirer();
actualiserCompteur();

// Ajouter un participant
participantsAjouter.addEventListener("click", function (event) {
  event.preventDefault();

  if (participantsListe.children.length >= 20) {
    erreurParticipants.textContent =
      "Le nombre maximum de participants est 20.";
    erreurParticipants.classList.remove("hidden");
    return;
  }

  creerParticipant();
  actualiserRetirer();
  actualiserCompteur();
});

// Retirer un participant avec la délégation d'événement
participantsListe.addEventListener("click", function (event) {
  if (event.target.tagName === "BUTTON") {
    if (participantsListe.children.length > 2) {
      event.target.parentElement.remove();
      actualiserRetirer();
      actualiserCompteur();
    }
  }
});

// -------------------- US-03 : Résultats --------------------

const etatVide = document.querySelector("#etat-vide");
const contenuResultat = document.querySelector("#contenu-resultat");

const resumeCagnotte = document.querySelector("#resume-cagnotte");
const resumeTotalCycle = document.querySelector("#resume-total-cycle");
const resumeNbTours = document.querySelector("#resume-nb-tours");
const resumeDates = document.querySelector("#resume-dates");

// Fonctions de calcul
function calculerMontant(cotisation, nombreParticipants) {
  return cotisation * nombreParticipants;
}

function calculerTotalParticipant(cotisation, nombreTours) {
  return cotisation * nombreTours;
}

function calculerDateTour(dateDebut, periodicite, numeroTour) {
  const dateTour = new Date(dateDebut);

  if (periodicite === "hebdomadaire") {
    dateTour.setDate(dateTour.getDate() + numeroTour * 7);
  } else if (periodicite === "quinzaine") {
    dateTour.setDate(dateTour.getDate() + numeroTour * 15);
  } else if (periodicite === "mensuelle") {
    const jour = dateTour.getDate();
    dateTour.setDate(1);
    dateTour.setMonth(dateTour.getMonth() + numeroTour);

    const dernierJour = new Date(
      dateTour.getFullYear(),
      dateTour.getMonth() + 1,
      0
    ).getDate();

    dateTour.setDate(Math.min(jour, dernierJour));
  }

  return dateTour;
}

// -------------------- UN SEUL SUBMIT --------------------

formulaire.addEventListener("submit", function (event) {
  event.preventDefault();

  let valide = true;
  let premierChampInvalide = null;

  function afficherErreur(champ, elementErreur, message) {
    elementErreur.textContent = message;
    elementErreur.classList.remove("hidden");
    champ.setAttribute("aria-invalid", "true");

    if (!premierChampInvalide) {
      premierChampInvalide = champ;
    }

    valide = false;
  }

  function effacerErreur(champ, elementErreur) {
    elementErreur.textContent = "";
    elementErreur.classList.add("hidden");
    champ.removeAttribute("aria-invalid");
  }

  // 1. Vérifier le nom du cercle
  const nom = nomCercle.value.trim();

  if (
    nom.length < 3 ||
    nom.length > 40 ||
    !regexNom.test(nom)
  ) {
    afficherErreur(
      nomCercle,
      erreurNom,
      "Le nom doit contenir entre 3 et 40 caractères, sans caractères spéciaux."
    );
  } else {
    effacerErreur(nomCercle, erreurNom);
  }

  // 2. Vérifier la cotisation
  const montant = Number(cotisation.value);

  if (
    cotisation.value.trim() === "" ||
    montant < 100 ||
    montant > 50000 ||
    !Number.isInteger(montant)
  ) {
    afficherErreur(
      cotisation,
      erreurCotisation,
      "La cotisation doit être un entier entre 100 et 50 000 MAD."
    );
  } else {
    effacerErreur(cotisation, erreurCotisation);
  }

  // 3. Vérifier la périodicité
  if (
    !["hebdomadaire", "quinzaine", "mensuelle"].includes(
      periodicite.value
    )
  ) {
    afficherErreur(
      periodicite,
      erreurPeriodicite,
      "Veuillez choisir une périodicité valide."
    );
  } else {
    effacerErreur(periodicite, erreurPeriodicite);
  }

  // 4. Vérifier la date
  if (date.value === "" || date.value < aujourdHui) {
    afficherErreur(
      date,
      erreurDate,
      "La date doit être aujourd'hui ou une date ultérieure."
    );
  } else {
    effacerErreur(date, erreurDate);
  }

  // 5. Vérifier les participants
  const inputs = participantsListe.querySelectorAll("input");
  const noms = [];

  if (inputs.length < 2 || inputs.length > 20) {
    erreurParticipants.textContent =
      "Le nombre de participants doit être entre 2 et 20.";
    erreurParticipants.classList.remove("hidden");
    valide = false;

    if (!premierChampInvalide) {
      premierChampInvalide = inputs[0] || participantsAjouter;
    }
  } else {
    for (const input of inputs) {
      const nomParticipant = input.value.trim().toLowerCase();

      if (
        nomParticipant.length < 2 ||
        nomParticipant.length > 30 ||
        !regexParticipant.test(nomParticipant) ||
        noms.includes(nomParticipant)
      ) {
        erreurParticipants.textContent =
          "Prénom invalide ou déjà utilisé. Vérifiez les noms des participants.";
        erreurParticipants.classList.remove("hidden");
        input.setAttribute("aria-invalid", "true");
        input.setAttribute("aria-describedby", "participants-erreur");

        if (!premierChampInvalide) {
          premierChampInvalide = input;
        }

        valide = false;
      } else {
        noms.push(nomParticipant);
        input.removeAttribute("aria-invalid");
        input.removeAttribute("aria-describedby");
      }
    }
  }

  // Arrêter si un champ est invalide
  if (!valide) {
    contenuResultat.classList.add("hidden");
    etatVide.classList.remove("hidden");
    premierChampInvalide?.focus();
    return;
  }

  erreurParticipants.textContent = "";
  erreurParticipants.classList.add("hidden");

  // 6. Calculer les montants et le nombre de tours
  const nombreParticipants = inputs.length;

  const montantBeneficiaire = calculerMontant(
    montant,
    nombreParticipants
  );

  const totalParticipant = calculerTotalParticipant(
    montant,
    nombreParticipants
  );

  resumeCagnotte.textContent = montantBeneficiaire + " MAD";
  resumeTotalCycle.textContent = totalParticipant + " MAD";
  resumeNbTours.textContent = nombreParticipants;

  // 7. Calculer la première et la dernière date
  const datePremierTour = calculerDateTour(
    date.value,
    periodicite.value,
    0
  );

  const dateDernierTour = calculerDateTour(
    date.value,
    periodicite.value,
    nombreParticipants - 1
  );

  resumeDates.textContent =
    datePremierTour.toLocaleDateString("fr-FR") +
    " - " +
    dateDernierTour.toLocaleDateString("fr-FR");

  // 8. Afficher les résultats
  etatVide.classList.add("hidden");
  contenuResultat.classList.remove("hidden");
});
