
const nomCercle = document.querySelector("#nom-cercle")
const erreurNom = document.querySelector("#nom-cercle-erreur")
const regexNom = /^[A-Za-zÀ-ÖØ-öø-ÿ0-9 -]+$/
const formulaire = document.querySelector("#daret-form");

formulaire.addEventListener("submit", function (event) {
    event.preventDefault()
    
    const nom = nomCercle.value.trim();

if (nom.length < 3 || nom.length > 40 || !regexNom.test(nom)) {
    erreurNom.textContent = "Le nom doit contenir entre 3 et 40 caractères et ne doit pas contenir de caractères spéciaux (@, #, etc.)."
    erreurNom.classList.remove("hidden")
    nomCercle.setAttribute("aria-invalid", "true")
} else {
    erreurNom.textContent = ""
    erreurNom.classList.add("hidden")
    erreurNom.removeAttribute("aria-invalid")
}
})




const cotisation = document.querySelector("#cotisation")
const erreurCotisation = document.querySelector("#cotisation-erreur")

formulaire.addEventListener("submit", function (event) {
    event.preventDefault()

    const montant = Number(cotisation.value)

    if (montant <= 100 || montant >= 50000 || !Number.isInteger(montant)){
        erreurCotisation.textContent = "La montant doit être supérieure à 100 MAD et inférieure à 50 000 MAD, sans décimales."
        erreurCotisation.classList.remove("hidden");
        erreurCotisation.setAttribute("aria-invalide", "true")
    } else {
        erreurCotisation.textContent = ""
        erreurCotisation.classList.add("hidden")
        erreurCotisation.removeAttribute("aria-invalid")
    }
})




















const participantsListe = document.querySelector("#participants-liste")

const participantsAjouter = document.querySelector("#ajouter-participant")

const erreurParticipants = document.querySelector("#participants-erreur")


formulaire.addEventListener("submit", function (event) {
    event.preventDefault()

    const inputs = participantsListe.querySelectorAll("input")
    
    if (inputs.length < 2 || inputs.length > 20) {
        erreurParticipants.textContent = "Le nombre de participants doit être entre 2 et 20."
        erreurParticipants.classList.remove("hidden")
        return
    } 


    for (const input of inputs) {
        const participant = input.value.trim()

        if(participant.length < 2 ){
            erreurParticipants.textContent = "le nom est trop court."
            erreurParticipants.classList.remove("hidden")
    }else if (participant.length > 30) {
        erreurParticipants.textContent = "le nom est trop long."
        erreurParticipants.classList.remove("hidden")
        return
    } else if (!regexNom.test(participant)){
    erreurParticipants.textContent = "Évitez les caractères spéciaux (@, #, etc.)"
    erreurParticipants.classList.remove("hidden")
    return
    } else { 
    erreurParticipants.textContent = "les participants a été enregistrer."

    }
    }})


participantsAjouter.addEventListener("click", function (event) {
event.preventDefault()

if (participantsListe.children.length >= 20) {
    erreurParticipants.textContent = "La liste est plein !."
    erreurParticipants.classList.remove("hidden")
    return
}

const li = document.createElement("li")
const input = document.createElement("input")

input.type = "text"
input.placeholder = "Nom du participant"

li.append(input)
participantsListe.append(li)


})
  



























