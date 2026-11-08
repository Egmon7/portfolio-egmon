(function () {
  // url : site en ligne. github : dépôt qui montre l'interface tant que le projet n'est pas terminé.
  var projects = [
    {
      id: "aide-scrabble",
      title: "Aide Scrabble",
      summary:
        "Application web qui permet d’entrer vos lettres et d’obtenir les mots possibles, avec scores et jokers.",
      points: [
        "Saisie des lettres disponibles",
        "Liste des mots possibles, avec leur score",
        "Prise en compte des jokers",
      ],
      stack: ["Django", "MySQL"],
      filter: "django",
      image: "./images/scrabble.png",
      alt: "Aperçu de l’application Aide Scrabble",
      cover: false,
      status: "",
      url: "",
      github: "",
    },
    {
      id: "generation-documents",
      title: "Génération des documents",
      summary:
        "Génération en masse de supports personnalisés (invitations, badges, certificats…) à partir d’une maquette, de champs dynamiques et d’une liste de personnes.",
      points: [
        "Une maquette sert de modèle",
        "Les champs se remplissent pour chaque personne",
        "Invitations, badges et certificats sortent en série",
      ],
      stack: ["Django", "PostgreSQL"],
      filter: "django",
      image: "./images/print.png",
      alt: "Aperçu de la génération des documents",
      cover: true,
      status: "En développement",
      url: "",
      github: "",
    },
    {
      id: "kadea-chat",
      title: "Kadea Chat",
      summary:
        "Application de chat en temps réel : échanger en privé, et créer des groupes pour discuter entre amis.",
      features: [
        {
          title: "Authentification",
          items: [
            "Créer un compte et confirmer l’e-mail",
            "Se connecter / se déconnecter",
            "Mot de passe oublié et réinitialisation",
          ],
        },
        {
          title: "Chat & temps réel",
          items: [
            "Conversations privées et groupes",
            "Envoyer et recevoir des messages",
            "Réception en direct, sans recharger la page",
          ],
        },
        {
          title: "Groupes & sécurité",
          items: [
            "Créer un groupe et gérer les membres",
            "Partager des fichiers dans la conversation",
            "Bloquer un utilisateur indésirable",
          ],
        },
      ],
      stack: ["AdonisJS", "TypeScript", "PostgreSQL"],
      filter: "adonis",
      image: "./images/kadea.png",
      alt: "Aperçu de Kadea Chat",
      cover: true,
      status: "",
      url: "https://kadea-chat-24ie.onrender.com/",
      github: "",
    },
    {
      id: "ngl",
      title: "NGL",
      summary: "Reçois des messages anonymes. En Pro, découvre qui a écrit — et réponds sur WhatsApp.",
      features: [
        {
          title: "Démarrage",
          items: [
            "Lien perso partageable (Instagram, Snap, WhatsApp, X…)",
            "Onboarding rapide (âge, canaux, @username)",
            "Connexion bot WhatsApp (QR)",
          ],
        },
        {
          title: "Messages",
          items: [
            "Envoi de messages anonymes",
            "Inbox organisateur + réponses dans l’app",
          ],
        },
        {
          title: "Basic",
          items: ["Mode gratuit, anonymat conservé"],
        },
        {
          title: "Pro",
          items: [
            "Voir le nom / numéro WhatsApp",
            "Répondre à l’expéditeur sur WhatsApp",
            "Page tarifs claire + parcours « Qui a envoyé ? »",
          ],
        },
      ],
      stack: ["Node", "AdonisJS", "Edge", "PostgreSQL"],
      filter: "adonis",
      image: "./images/ngl.png",
      alt: "Aperçu de NGL",
      cover: true,
      status: "En développement",
      url: "",
      github: "",
    },
    {
      id: "raccourcisseur-url",
      title: "Raccourcisseur d’URL",
      summary: "Service pour raccourcir et partager des liens rapidement.",
      points: ["Création d’un lien court", "Partage du lien généré"],
      stack: ["AdonisJS", "TypeScript", "PostgreSQL"],
      filter: "adonis",
      image: "",
      alt: "",
      cover: false,
      status: "",
      url: "",
      github: "",
    },
  ];

  function esc(value) {
    return String(value).replace(/[&<>"']/g, function (char) {
      return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[char];
    });
  }

  function safeUrl(url) {
    return /^https?:\/\//i.test(url || "") ? url : "";
  }

  function find(id) {
    for (var i = 0; i < projects.length; i += 1) {
      if (projects[i].id === id) return projects[i];
    }
    return null;
  }

  function tags(list) {
    return list
      .map(function (tag) {
        return '<span class="stack-tag">' + esc(tag) + "</span>";
      })
      .join("");
  }

  function actions(project) {
    var html = "";
    var url = safeUrl(project.url);
    var github = safeUrl(project.github);
    if (url) {
      html +=
        '<a class="project-link project-link--solid" href="' +
        esc(url) +
        '" target="_blank" rel="noopener noreferrer">Voir le site</a>';
    }
    if (github) {
      html +=
        '<a class="project-link" href="' +
        esc(github) +
        '" target="_blank" rel="noopener noreferrer">Voir sur GitHub</a>';
    }
    return html;
  }

  function media(project, shotClass) {
    if (!project.image) {
      return '<div class="project-card__placeholder"><span>Aperçu bientôt</span></div>';
    }
    var cover = project.cover ? " project-card__shot--cover" : "";
    return (
      '<img class="' +
      shotClass +
      cover +
      '" src="' +
      esc(project.image) +
      '" alt="' +
      esc(project.alt) +
      '" />'
    );
  }

  function renderGrid(grid) {
    var empty = document.getElementById("project-empty");
    var html = projects
      .map(function (project, index) {
        var href = "./projet.html?id=" + encodeURIComponent(project.id);
        var badge = project.status
          ? '<span class="project-card__badge">' + esc(project.status) + "</span>"
          : "";
        var links = actions(project);
        return (
          '<article class="project-card reveal" style="--reveal-delay:' +
          (60 + index * 80) +
          'ms" data-stack="' +
          esc(project.filter) +
          '">' +
          '<a class="project-card__open" href="' +
          href +
          '">' +
          '<div class="project-card__media"' +
          (project.image ? "" : ' aria-hidden="true"') +
          ">" +
          media(project, "project-card__shot") +
          "</div>" +
          '<div class="project-card__body">' +
          '<div class="project-card__heading"><h2 class="project-card__title">' +
          esc(project.title) +
          "</h2>" +
          badge +
          "</div>" +
          '<p class="project-card__text">' +
          esc(project.summary) +
          "</p>" +
          (project.stack.length
            ? '<div class="project-card__tags">' + tags(project.stack) + "</div>"
            : "") +
          "</div></a>" +
          (links ? '<div class="project-card__actions">' + links + "</div>" : "") +
          "</article>"
        );
      })
      .join("");

    if (empty) empty.insertAdjacentHTML("beforebegin", html);
    else grid.insertAdjacentHTML("beforeend", html);
  }

  function renderDetail(root) {
    var id = "";
    try {
      id = new URLSearchParams(window.location.search).get("id") || "";
    } catch (e) {}
    var project = find(id);

    if (!project) {
      document.title = "Projet — Egmon";
      root.innerHTML =
        '<a class="project-back" href="./projets.html">← Projets</a>' +
        '<p class="project-missing">Ce projet est introuvable.</p>' +
        '<div class="project-detail__actions"><a class="project-link" href="./projets.html">Retour aux projets</a></div>';
      return;
    }

    document.title = project.title + " — Egmon";
    var badge = project.status
      ? '<span class="project-card__badge">' + esc(project.status) + "</span>"
      : "";
    var points = (project.points || [])
      .map(function (point) {
        return "<li>" + esc(point) + "</li>";
      })
      .join("");
    var featureBlocks = (project.features || [])
      .map(function (group, index) {
        var number = (index + 1 < 10 ? "0" : "") + (index + 1);
        var items = (group.items || [])
          .map(function (item) {
            return "<li>" + esc(item) + "</li>";
          })
          .join("");
        return (
          '<article class="project-feature">' +
          '<p class="project-feature__index">' +
          number +
          "</p>" +
          "<div>" +
          '<h3 class="project-feature__title">' +
          esc(group.title) +
          "</h3>" +
          (items ? '<ul class="project-feature__items">' + items + "</ul>" : "") +
          "</div></article>"
        );
      })
      .join("");
    var features = featureBlocks
      ? '<section class="project-features" aria-label="Fonctionnalités">' +
        '<h2 class="project-features__label">Fonctionnalités</h2>' +
        '<div class="project-features__list">' +
        featureBlocks +
        "</div></section>"
      : "";
    var links = actions(project);
    var main =
      '<div class="project-detail__media"' +
      (project.image ? "" : ' aria-hidden="true"') +
      ">" +
      media(project, "project-card__shot") +
      "</div>" +
      '<div class="project-detail__heading"><h1 class="project-detail__title">' +
      esc(project.title) +
      "</h1>" +
      badge +
      "</div>" +
      '<p class="project-detail__summary">' +
      esc(project.summary) +
      "</p>";
    var tagsHtml = project.stack.length
      ? '<div class="project-detail__tags">' + tags(project.stack) + "</div>"
      : "";
    var actionsHtml = links ? '<div class="project-detail__actions">' + links + "</div>" : "";
    var back = '<a class="project-back" href="./projets.html">← Projets</a>';

    if (project.layout === "aside" && points) {
      root.classList.add("project-detail--wide");
      root.innerHTML =
        back +
        '<div class="project-detail__split">' +
        '<div class="project-detail__main">' +
        main +
        tagsHtml +
        actionsHtml +
        "</div>" +
        '<aside class="project-features project-features--aside" aria-label="Fonctionnalités">' +
        '<h2 class="project-features__label">Fonctionnalités</h2>' +
        '<ul class="project-detail__points">' +
        points +
        "</ul></aside></div>";
      return;
    }

    root.classList.remove("project-detail--wide");
    root.innerHTML =
      back +
      main +
      (features || (points ? '<ul class="project-detail__points">' + points + "</ul>" : "")) +
      tagsHtml +
      actionsHtml;
  }

  var grid = document.getElementById("project-grid");
  if (grid) renderGrid(grid);

  var detail = document.getElementById("project-detail");
  if (detail) renderDetail(detail);
})();
