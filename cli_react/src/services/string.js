const url = 'http://localhost:3001';

// ERROR
const errorFetching = "Une erreur s'est produite, veuillez réessayer plus tard";
const noResults = 'Aucun évenement ne correspond à la recherche';
const credentialNotValid = 'Utilisateur introuvable ou information erronées';
const passwordsNotMatching = 'Les mots de passe doivent être similaires';
const imgTooLarge = "L'avatar ne peut pas dépasser 150 x 150 px";
const registerUpdateError = 'Veuillez plutôt supprimer et créer une nouvelle participation';
const passwordNotValid = 'Le mot de passe actuel est erroné';

// SUCCES
const passwordSucces = 'Mot de passe modifié avec succès';
const squalala = 'squalala nous sommes partis';
const avatarSucces = "L'avatar a été modifié avec succès";
const delSucces = "L'élément a été supprimé avec succès";
const updateSucces = "L'élément a été modifié avec succès";
const addSucces = "L'élément a été ajouté avec succès";

// HELP
const passwordHelper = 'Doit contenir entre 6 et 32 caractères';
const missingFields = 'Certains champs sont manquants ou erronés';
const blankFieldError = 'Ce champ ne peut être laissé vide';
const noRowSelected = 'Veuillez sélectionner une ligne';
const noTableSelected = 'Veuillez sélectionner une table';

const mailNotValid = "Le format de l'adresse mail est invalide";
const birthdateNotValid = "L'âge doit être compris entre 18 et 100 ans";
const idNotValid = "L'ID doit être un chiffre ou un nombre";
const priceNotValid = 'Veuillez entre un prix valide (une décimale)';
const nameNotValid = 'Le nom comporte des caractères interdits';
const mustBePositive = 'La valeur doit être supérieure à 0';
const securityNotValid = 'La valeur doit être comprise entre 1 et 5';
const missingAvatar = 'Veuillez sélectionner une image';
const registerUpdate = 'Veuillez plutôt supprimer et recréer une réservation';

export {
    registerUpdate,
    noTableSelected,
    url,
    credentialNotValid,
    mailNotValid,
    errorFetching,
    passwordSucces,
    passwordHelper,
    noResults,
    blankFieldError,
    missingFields,
    idNotValid,
    avatarSucces,
    imgTooLarge,
    delSucces,
    noRowSelected,
    addSucces,
    updateSucces,
    priceNotValid,
    nameNotValid,
    registerUpdateError,
    birthdateNotValid,
    mustBePositive,
    securityNotValid,
    missingAvatar,
    passwordsNotMatching,
    passwordNotValid,
    squalala,
};
