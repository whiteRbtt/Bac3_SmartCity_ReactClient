const url = 'http://localhost:3001'

const errorFetching =
    "Une erreur s'est produite, veuillez réessayer plus tard.";
const pwdSucces = 'Mot de passe modifié avec succès';
const pwdError = 'Le mot de passe actuel est erroné';
const minMaxCharNeeded = 'entre 6 et 32 caractères';
const noResults = 'Aucun évenement ne correspond à la recherche';
const strBlankError = 'Doit contenir des lettres';
const mailNotValid = "Le format de l'adresse est invalide";
const loginError = 'Utilisateur introuvable';
const missingFields = 'Champs manquants';
const ageMin = 'Vous devez avoir au moins 18 ans';
const samePwd = 'Les mots de passe doivent etre similaires';
const registerSucces = 'profil créé avec succes';
const pastEventMessage = "L'évenement à déja eu lieu, revenez l'année prochaine !"

export {
    url,
    loginError,
    mailNotValid,
    errorFetching,
    pwdSucces,
    pwdError,
    minMaxCharNeeded,
    noResults,
    strBlankError,
    missingFields,
    ageMin,
    samePwd,
    registerSucces,
    pastEventMessage,
};
