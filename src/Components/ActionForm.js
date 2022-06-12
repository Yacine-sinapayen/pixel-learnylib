import moment from "moment";
import React from "react";
import { v4 as uuid } from "uuid";

// action={form} qui contient le contenue de mon formulaire...
// onSubmit (ligne 34) fait appel à la fonction handleSubmit qui gère à la fois l'ajout et la modification des actions
const ActionForm = ({ action, onClose, onSubmit }) => {
  // Cette var permet de savoir si nous sommes dans le cas d'un ajout une d'une modification.
  // Si l'action passée au formulaire est vide, alors on est dans le cas d'un ajout
  // Si l'action passée au formulaire a déjà des propriétés, alors on est dans le cas d'une modification
  // Objet.keys().length renvoie le nombre de propriétés de l'objet. Elle renvoie la longueur du tableau. Si est vide, c'est qu'il n'y a pas de propriétés et donc que l'objet est vide.
  const add = Object.keys(action).length === 0;

  //Gère l'ajout et la modification d'une action après validation du formulaire.
  const handleSubmit = (e) => {
    e.preventDefault();
    // Si on est en mode ajout, on intencie un nouvelle objet vierge
    // Si c'est une modification on crée une copie de l'action existante
    let newAction = add ? {} : { ...action };

    // Si on est dans le cas d'un ajout, on affecte un nouvelle id à l'action ainsi qu'une date de création.
    // Si on est dans le cas d'une modification, on n'a pas besoin de créer un id, ni de date de création puisque ces propriétés sont déjà présentes dans l'objet action.
    if (add) {
      newAction.id = uuid();
      newAction.created_at = moment().format("YYYY-MM-DD HH:mm:ss");
    }

    // Dans tous les cas (ajout et modification), on actualise les données de l'action à partir du formulaire (saisie de l'utilisateur)
    ["title", "media", "tags", "target_url", "shipments"].map((k) => {
      newAction[k] = e.target[k].value;
      return true;
    });
// newAction correspond à l'action modifiée ou ajoutée après validation du formulaire.
    return onSubmit(newAction);
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <h2>Créer une nouvelle action marketing</h2>
        <button onClick={() => onClose()}>fermer</button>
        <br />
        <input
          type="text"
          maxLength="200"
          required={true}
          placeholder="Nom de l'action"
          name="title"
          defaultValue={action.title}
        />
        <input
          type="text"
          maxLength="200"
          required={true}
          placeholder="Média"
          name="media"
          defaultValue={action.media}
        />
        <input
          type="text"
          maxLength="200"
          placeholder="Mot clés"
          name="tags"
          defaultValue={action.tags}
        />
        <input
          type="text"
          maxLength="200"
          required={true}
          placeholder="Url cible"
          name="target_url"
          defaultValue={action.target_url}
        />
        <input
          type="number"
          min="0"
          step="1"
          required={true}
          placeholder="Nb d'envois"
          name="shipments"
          defaultValue={action.shipments}
        />
        {/* step permet d'incrémenter de 1 en 1, pas de nb à vrigule */}
        <button onSubmit={handleSubmit}>{add ? "Ajouter" : "Modifier"}</button>
      </form>
    </div>
  );
};

export default ActionForm;