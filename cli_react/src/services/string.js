const url = 'http://localhost:3001';

// ERROR
const errorFetching = "Une erreur s'est produite, veuillez réessayer plus tard";
const noResults = 'Aucun évenement ne correspond à la recherche';
const credentialNotValid = 'Utilisateur introuvable ou information erronées';
const passwordsNotMatching = 'Les mots de passe doivent être similaires';
const imgTooLarge = "L'avatar doit être un jpeg ou png de maximum 150 x 150 px";
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

const apiErrors = {
    ['No updatable attribute']: 'Aucune modification détectée',

    ['Invalid mail address, use the format : xxx@yyy.zz']: mailNotValid,
    ['Address mail already registered']: 'Il existe déja un compte lié à cette adresse',
    ['Participation already registered for this event']: "Cet utilisateur est déja inscrit à l'évenement",
    ['Insupported file type']: "Le format du fichier n'est pas supporté",
    ['Object already registered for this stand']: 'Le produit est déja vendu sur ce stand',
    ['Object already registered']: 'Le produit est déja vendu sur ce stand',
    ["New user already register for the specified event"] : 'Utilisateur déja inscrit',

    ['User not found']: 'Utilisateur introuvable',
    ['Stand not found']: 'Stand introuvable',
    ['Creator not found, please verify his mail address']: "L'email du créateur est erroné",
    ['Event not found']: 'Evenement introuvable',
    ['Product not found']: 'Produit introuvable',
};

export {
    apiErrors,
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
