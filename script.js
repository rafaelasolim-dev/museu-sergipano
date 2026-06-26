const destinationDetails = {
    aracaju: {
        tag: "Urbanismo e documentos",
        title: "Aracaju planejada",
        text: "Aracaju tornou-se capital em 1855 e é lembrada como uma das primeiras capitais planejadas do Brasil. Seu traçado geométrico, ligado ao rio Sergipe, pode ser contado por mapas, fotografias antigas, plantas urbanas e relatos sobre a mudança da capital."
    },
    "santo-antonio": {
        tag: "Bairro e memória urbana",
        title: "Santo Antônio",
        text: "O Santo Antônio é um território essencial para narrar a formação de Aracaju. O bairro guarda memórias de povoamento, mirante, igreja, casas antigas, festas e histórias de moradores que ajudam a explicar a cidade antes e depois do planejamento urbano."
    },
    "sao-cristovao": {
        tag: "Patrimônio histórico",
        title: "São Cristóvão",
        text: "São Cristóvão foi antiga capital sergipana e preserva ruas, igrejas e casario colonial. A Praça São Francisco, reconhecida pela UNESCO em 2010, pode formar uma sala digital com fotografias, documentos, mapas, depoimentos e registros de festas religiosas."
    },
    xingo: {
        tag: "Sertão, rio e paisagem",
        title: "Xingó",
        text: "Xingó reúne Rio São Francisco, cânions, sertão, memória arqueológica e modos de vida ribeirinhos. O acervo pode ter fotografias da paisagem, relatos de moradores, mapas, vídeos de navegação e histórias sobre água, seca e pertencimento."
    },
    estancia: {
        tag: "Festa, técnica e patrimônio",
        title: "Estância e barcos de fogo",
        text: "O barco de fogo é uma tradição junina de Estância, associada ao trabalho artesanal dos fogueteiros e à memória popular. A ficha pode reunir vídeos, entrevistas, desenhos técnicos, cartazes de concursos e histórias de famílias que preservam a prática."
    },
    gastronomia: {
        tag: "Saberes e sabores",
        title: "Gastronomia sergipana",
        text: "A culinária também é documento de memória. Caranguejo, mangaba, amendoim, milho, beiju, moquecas e receitas de família contam histórias de feira, litoral, roça, festa junina e acolhimento sergipano."
    },
    personalidades: {
        tag: "Biografias",
        title: "Personalidades sergipanas",
        text: "Esta sala pode apresentar sergipanos famosos e históricos, como Tobias Barreto, Sílvio Romero, João Ribeiro, Marcelo Déda, Aglaé Fontes, Clemilda, Rogério e Déda, além de mestres populares e personagens de cada comunidade."
    },
    receptividade: {
        tag: "Memória oral",
        title: "Receptividade do povo",
        text: "O jeito de receber, conversar, cozinhar, ensinar caminhos, brincar o São João e viver as ruas também compõe patrimônio. Aqui entram áudios de moradores, histórias de feira, lembranças de vizinhança e vídeos de festas tradicionais."
    }
};

const curiosities = [
    "Uma fotografia antiga pode virar peça de museu quando revela modos de vestir, ruas, casas, festas ou relações familiares.",
    "Uma receita de família também preserva memória: ela guarda ingredientes, afetos, festas e formas de viver.",
    "O barco de fogo de Estância é uma tradição que mistura arte, técnica, festa junina e memória coletiva.",
    "São Cristóvão foi antiga capital de Sergipe e sua Praça São Francisco foi reconhecida como Patrimônio Mundial em 2010.",
    "A história de um bairro pode ser contada por mapas, depoimentos, fachadas, fotografias e lembranças dos moradores."
];

const modal = document.querySelector("#detailsModal");
const modalImage = document.querySelector("#modalImage");
const modalTag = document.querySelector("#modalTag");
const modalTitle = document.querySelector("#modalTitle");
const modalText = document.querySelector("#modalText");
const lightbox = document.querySelector("#lightbox");
const lightboxImage = lightbox.querySelector("img");
const lightboxCaption = lightbox.querySelector("p");

document.querySelectorAll(".read-more").forEach((button) => {
    button.addEventListener("click", () => {
        const card = button.closest(".card");
        const detail = destinationDetails[card.dataset.destination];
        const image = card.querySelector("img");

        modalImage.src = image.src;
        modalImage.alt = image.alt;
        modalTag.textContent = detail.tag;
        modalTitle.textContent = detail.title;
        modalText.textContent = detail.text;
        modal.showModal();
    });
});

document.querySelector(".close").addEventListener("click", () => modal.close());

document.querySelectorAll(".filter").forEach((button) => {
    button.addEventListener("click", () => {
        const filter = button.dataset.filter;

        document.querySelectorAll(".filter").forEach((item) => item.classList.remove("active"));
        button.classList.add("active");

        document.querySelectorAll(".gallery figure").forEach((figure) => {
            const shouldShow = filter === "todos" || figure.dataset.category === filter;
            figure.classList.toggle("hidden", !shouldShow);
        });
    });
});

document.querySelectorAll(".gallery figure").forEach((figure) => {
    figure.addEventListener("click", () => {
        const image = figure.querySelector("img");
        const caption = figure.querySelector("figcaption").textContent;

        lightboxImage.src = image.src;
        lightboxImage.alt = image.alt;
        lightboxCaption.textContent = caption;
        lightbox.classList.add("open");
        lightbox.setAttribute("aria-hidden", "false");
    });
});

document.querySelector(".close-lightbox").addEventListener("click", closeLightbox);
lightbox.addEventListener("click", (event) => {
    if (event.target === lightbox) {
        closeLightbox();
    }
});

function closeLightbox() {
    lightbox.classList.remove("open");
    lightbox.setAttribute("aria-hidden", "true");
}

document.querySelector("#surpriseBtn").addEventListener("click", () => {
    const randomIndex = Math.floor(Math.random() * curiosities.length);
    const contribute = document.querySelector("#contribuir");
    document.querySelector("#feedback").textContent = curiosities[randomIndex];
    contribute.scrollIntoView({ behavior: "smooth", block: "center" });
});

document.querySelector("#archiveForm").addEventListener("submit", (event) => {
    event.preventDefault();

    const form = event.currentTarget;
    const data = new FormData(form);
    const file = data.get("media");
    const name = data.get("name").trim();
    const place = data.get("place").trim();
    const type = data.get("type");
    const story = data.get("story").trim();
    const collection = document.querySelector("#submittedCollection");
    const feedback = document.querySelector("#feedback");
    const item = document.createElement("article");
    const mediaBox = document.createElement("div");
    const content = document.createElement("div");
    const category = document.createElement("span");
    const title = document.createElement("h3");
    const description = document.createElement("p");
    const author = document.createElement("small");

    item.className = "submitted-item";

    if (file && file.size > 0) {
        const fileUrl = URL.createObjectURL(file);
        const media = document.createElement(file.type.startsWith("video/") ? "video" : "img");

        media.src = fileUrl;

        if (media.tagName === "VIDEO") {
            media.controls = true;
        } else {
            media.alt = `Contribuição enviada por ${name}`;
        }

        item.append(media);
    } else {
        mediaBox.className = "submitted-placeholder";
        mediaBox.textContent = "Sem arquivo";
        item.append(mediaBox);
    }

    category.textContent = type;
    title.textContent = place;
    description.textContent = story;
    author.textContent = `Enviado por ${name}`;

    content.append(category, title, description, author);
    item.append(content);

    collection.prepend(item);
    feedback.textContent = "Contribuição adicionada ao acervo da página.";
    form.reset();
});

const menuLinks = document.querySelectorAll(".menu a");
const sections = [...menuLinks].map((link) => document.querySelector(link.getAttribute("href")));

window.addEventListener("scroll", () => {
    let activeSection = sections[0];

    sections.forEach((section) => {
        if (section && section.offsetTop <= window.scrollY + 120) {
            activeSection = section;
        }
    });

    menuLinks.forEach((link) => {
        link.classList.toggle("active", activeSection && link.getAttribute("href") === `#${activeSection.id}`);
    });
});
