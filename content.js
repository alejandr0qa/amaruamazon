/* Editorial content: [title, summary, detail, highlights]. No fixed prices or guarantees. */
const experiences = [
  {
    id: "tarapoto",
    cat: "water",
    time: "day",
    image: "tarapoto",
    en: [
      "Lake Tarapoto",
      "Follow the waterways in search of river dolphins and the quiet beauty of the lakes.",
      "Explore Lake Tarapoto by day, with time for the waterside landscapes and the search for river dolphins. This experience centres on the lake and its wildlife, rather than paddling or forest trails. Dolphins live in the wild, so each outing is different and sightings are never guaranteed.",
      [
        "River and lake landscapes",
        "Dolphin watching when conditions allow",
        "Meeting point and duration confirmed together",
      ],
    ],
    es: [
      "Lago Tarapoto",
      "Recorre los canales en busca de delfines de río y de la belleza tranquila de los lagos.",
      "Descubre el entorno del lago Tarapoto de día, con tiempo para sus paisajes y la búsqueda de delfines de río. Esta experiencia se centra en el lago y su fauna, a diferencia del kayak o las caminatas de selva. Los delfines viven en libertad: cada salida es distinta y no se garantiza su avistamiento.",
      [
        "Paisajes de río y lago",
        "Delfines si las condiciones lo permiten",
        "Punto de encuentro y duración por confirmar",
      ],
    ],
    fr: [
      "Lac Tarapoto",
      "Parcourez les voies d’eau à la recherche des dauphins et de la beauté paisible des lacs.",
      "Découvrez les paysages du lac Tarapoto de jour et partez à la recherche des dauphins de rivière. Cette expérience privilégie le lac et sa faune, à la différence du kayak ou des randonnées en forêt. Les dauphins vivent en liberté : chaque sortie est différente et leur observation n’est jamais garantie.",
      [
        "Paysages du fleuve et des lacs",
        "Dauphins selon les conditions",
        "Rendez-vous et durée à confirmer",
      ],
    ],
  },
  {
    id: "kayak",
    cat: "water",
    time: "day",
    image: "kayak",
    en: [
      "Kaya · daytime paddling",
      "Slow down on the water. A daylight kayaking experience, shaped by the river.",
      "Kaya is our daytime paddling experience in the Amazon. Follow the water at a slower pace and take in the forest surroundings by natural light. It is a separate outing from the rainforest night walk; the route, equipment and suitability for your group need to be discussed before choosing it.",
      [
        "Daylight outings only",
        "Route adapted to water levels and weather",
        "Equipment and requirements confirmed in your proposal",
      ],
    ],
    es: [
      "Kaya · kayak diurno",
      "Baja el ritmo sobre el agua. Una experiencia en kayak con luz de día, al ritmo del río.",
      "Kaya es nuestra experiencia de kayak diurno en el Amazonas. Baja el ritmo sobre el agua y observa el entorno de selva con luz natural. Es una salida distinta de la caminata nocturna; antes de elegirla, consulta la ruta, el equipo y las condiciones para tu grupo.",
      [
        "Salidas únicamente con luz de día",
        "Ruta adaptada al nivel del agua y al clima",
        "Equipo y requisitos confirmados en la propuesta",
      ],
    ],
    fr: [
      "Kaya · kayak de jour",
      "Ralentissez sur l’eau. Une expérience de kayak à la lumière du jour, au rythme du fleuve.",
      "Kaya est notre expérience de kayak de jour en Amazonie. Ralentissez sur l’eau et découvrez la forêt environnante à la lumière naturelle. Cette sortie est distincte de la promenade nocturne ; discutez du parcours, du matériel et des conditions pour votre groupe avant de la choisir.",
      [
        "Sorties uniquement en journée",
        "Parcours adapté au niveau de l’eau et à la météo",
        "Matériel et conditions précisés dans la proposition",
      ],
    ],
  },
  {
    id: "birdwatching",
    cat: "forest",
    time: "dawn",
    image: "birdwatching",
    en: [
      "Birdwatching",
      "An early start, a quieter forest. Listen, look closer and follow the calls.",
      "A dedicated birdwatching experience for those who want to spend time listening, watching branches and following the calls of the forest. The focus is on birds, with an early start arranged for your visit. This is a standalone tour, independent of the cacao experience, and sightings vary with the conditions.",
      [
        "An independent birdwatching experience",
        "Early-morning departure arranged together",
        "Bring binoculars if you have them; sightings vary",
      ],
    ],
    es: [
      "Avistamiento de aves",
      "Una salida temprano, una selva más tranquila. Escucha, observa y sigue sus cantos.",
      "Una experiencia dedicada a quienes quieren detenerse a escuchar, mirar entre las ramas y seguir los cantos de la selva. El foco son las aves, con una salida temprana por coordinar para tu visita. Es un tour independiente del cacao y los avistamientos varían según las condiciones.",
      [
        "Experiencia independiente de avistamiento de aves",
        "Salida temprano en la mañana por coordinar",
        "Trae binoculares si tienes; los avistamientos varían",
      ],
    ],
    fr: [
      "Observation des oiseaux",
      "Partir tôt, écouter la forêt. Regarder de plus près et suivre les chants.",
      "Une expérience pour prendre le temps d’écouter, de regarder parmi les branches et de suivre les chants de la forêt. La sortie est consacrée aux oiseaux, avec un départ matinal à convenir pour votre visite. Elle est indépendante du cacao et les observations varient selon les conditions.",
      [
        "Une expérience indépendante",
        "Départ matinal à convenir ensemble",
        "Apportez vos jumelles ; les observations varient",
      ],
    ],
  },
  {
    id: "cacao",
    cat: "culture",
    time: "day",
    image: "cacao",
    en: [
      "Amazonian cacao",
      "Discover a different side of the Amazon through the story of cacao.",
      "Discover the Amazon through cacao: its cultivation, its local context and the knowledge shared around it. This experience focuses on cacao rather than wildlife watching. It is an independent tour, separate from birdwatching; the host visit and activities depend on what is available for your dates.",
      [
        "A dedicated cacao experience",
        "Cultivation and local knowledge",
        "Host availability and itinerary confirmed before booking",
      ],
    ],
    es: [
      "Cacao amazónico",
      "Descubre otra cara del Amazonas a través de la historia del cacao.",
      "Acércate al Amazonas a través del cacao: su cultivo, su contexto local y los conocimientos que lo rodean. Esta experiencia se centra en el cacao y es un tour independiente del avistamiento de aves. La visita con anfitriones y las actividades concretas dependen de lo que sea posible para tus fechas.",
      [
        "Una experiencia dedicada al cacao",
        "Cultivo y saberes locales",
        "Disponibilidad e itinerario confirmados antes de reservar",
      ],
    ],
    fr: [
      "Cacao amazonien",
      "Découvrez une autre facette de l’Amazonie à travers l’histoire du cacao.",
      "Découvrez l’Amazonie à travers le cacao, sa culture, son contexte local et les savoirs qui l’entourent. Cette expérience est consacrée au cacao, indépendamment de l’observation des oiseaux. La rencontre avec les hôtes et les activités dépendent des possibilités à vos dates.",
      [
        "Une expérience dédiée au cacao",
        "Culture et savoirs locaux",
        "Disponibilité et programme confirmés avant réservation",
      ],
    ],
  },
  {
    id: "night-walk",
    cat: "forest",
    time: "night",
    image: "night-walk",
    en: [
      "The forest after dark",
      "A torchlight walk into a world of tiny creatures and extraordinary sounds.",
      "Discover another side of the rainforest on a guided walk after sunset. Move slowly by torchlight, listen to the forest and look for frogs, insects and other nocturnal life. This is a night walk, distinct from both daytime Kaya and an overnight forest stay; animal encounters cannot be guaranteed.",
      [
        "A guided walk after dark",
        "Nocturnal wildlife and forest sounds",
        "Footwear, torch and route confirmed together",
      ],
    ],
    es: [
      "La selva de noche",
      "Una caminata con linterna entre pequeñas criaturas y sonidos extraordinarios.",
      "Descubre otra cara de la selva en una caminata guiada después del atardecer. Avanza despacio con linterna, escucha el bosque y busca ranas, insectos y otra vida nocturna. Es una caminata, distinta de Kaya diurno y del pernocte en selva; los encuentros con animales no se pueden garantizar.",
      [
        "Caminata guiada después del anochecer",
        "Fauna nocturna y sonidos de la selva",
        "Calzado, linterna y ruta por confirmar",
      ],
    ],
    fr: [
      "La forêt après la nuit tombée",
      "Une promenade à la lampe parmi les petites créatures et les sons extraordinaires.",
      "Découvrez une autre facette de la forêt lors d’une promenade guidée après le coucher du soleil. Avancez lentement à la lampe, écoutez et cherchez grenouilles, insectes et autres animaux nocturnes. Cette promenade est distincte de Kaya de jour et d’une nuitée en forêt ; les rencontres animales ne sont jamais garanties.",
      [
        "Promenade guidée de nuit",
        "Faune nocturne et sons de la forêt",
        "Chaussures, lampe et parcours à confirmer",
      ],
    ],
  },
  {
    id: "camp",
    cat: "forest",
    time: "overnight",
    image: "camp",
    en: [
      "A night in the rainforest",
      "Stay for the sounds, the stories and the feeling of waking up somewhere different.",
      "Stay in the rainforest beyond a daytime outing and make a forest night part of your journey. The overnight experience leaves room for the sounds and changing atmosphere of the forest. It is different from simply taking a night walk: sleeping arrangements, walking distances, meals and equipment need to be discussed with Amaru.",
      [
        "Overnight forest immersion",
        "Walking and camp arrangements tailored together",
        "Equipment, meals and inclusions to confirm with Amaru",
      ],
    ],
    es: [
      "Una noche en la selva",
      "Quédate por los sonidos, las historias y la emoción de despertar en otro lugar.",
      "Quédate en la selva más allá de una salida de día e incorpora una noche de bosque a tu viaje. El pernocte permite dar espacio a sus sonidos y a los cambios del entorno. Es distinto de hacer solo una caminata nocturna: consulta con Amaru cómo se organiza el descanso, las distancias a pie, las comidas y el equipo.",
      [
        "Inmersión en selva con pernocte",
        "Caminatas y campamento acordados juntos",
        "Equipo, comidas y servicios por confirmar con Amaru",
      ],
    ],
    fr: [
      "Une nuit dans la forêt",
      "Restez pour les sons, les histoires et la sensation de vous réveiller ailleurs.",
      "Restez en forêt au-delà d’une sortie de jour et intégrez une nuitée à votre voyage. L’expérience laisse place aux sons et aux changements d’atmosphère de la forêt. Elle est différente d’une simple promenade nocturne : discutez avec Amaru du couchage, des distances à pied, des repas et du matériel.",
      [
        "Immersion avec nuit en forêt",
        "Marche et campement préparés ensemble",
        "Matériel, repas et prestations à confirmer avec Amaru",
      ],
    ],
  },
  {
    id: "community",
    cat: "culture",
    time: "day",
    image: "community",
    en: [
      "Stories of the Amazon",
      "Meet the region through craft, everyday life and the stories of its people.",
      "Discover the region through local stories, everyday life and the knowledge that hosts choose to share. These cultural encounters focus on people and exchange, rather than a wildlife outing. Visits depend on the hosts’ availability and wishes; approach as a guest, ask permission for photographs and follow their guidance.",
      [
        "Local stories and cultural encounters",
        "Host-led visits, subject to availability",
        "Respect for customs and permission for portraits",
      ],
    ],
    es: [
      "Historias del Amazonas",
      "Conoce la región a través de los oficios, la vida cotidiana y las historias de su gente.",
      "Conoce la región a través de las historias, la vida cotidiana y los conocimientos que los anfitriones decidan compartir. Estos encuentros culturales se centran en las personas y el intercambio. Las visitas dependen de su disponibilidad y voluntad: acércate como invitado, pide permiso para fotografiar y sigue sus indicaciones.",
      [
        "Historias y encuentros culturales",
        "Visitas con anfitriones según disponibilidad",
        "Respeto por las costumbres y permiso para retratos",
      ],
    ],
    fr: [
      "Histoires d’Amazonie",
      "Rencontrez la région à travers les savoir-faire, le quotidien et les récits de ses habitants.",
      "Découvrez la région à travers les récits, le quotidien et les savoirs que les hôtes souhaitent partager. Ces rencontres culturelles privilégient les personnes et l’échange. Les visites dépendent de leur disponibilité et de leurs souhaits : venez en invité, demandez la permission avant les portraits et suivez leurs indications.",
      [
        "Récits et rencontres culturelles",
        "Visites avec les hôtes selon disponibilité",
        "Respect des coutumes et autorisation pour les portraits",
      ],
    ],
  },
  {
    id: "wildlife",
    cat: "forest",
    time: "day",
    image: "wildlife",
    en: [
      "Forest & wildlife walks",
      "Look up, slow your steps and discover the life between the leaves.",
      "Explore the rainforest on foot, paying attention to trees, plants and the wildlife between the leaves. Unlike the dedicated birdwatching outing, this walk takes a broader look at forest life during the day. The route depends on your interests and local conditions; observe wildlife from a distance, without touching or feeding animals.",
      [
        "Forest trails and Amazonian plants",
        "Wildlife observation when possible",
        "Walking distance and difficulty agreed together",
      ],
    ],
    es: [
      "Caminatas de selva y fauna",
      "Mira hacia arriba, camina despacio y descubre la vida entre las hojas.",
      "Explora la selva a pie y detente a observar los árboles, las plantas y la vida entre las hojas. A diferencia de la salida dedicada a las aves, esta caminata diurna ofrece una mirada más amplia al bosque. La ruta depende de tus intereses y de las condiciones locales; observa la fauna a distancia, sin tocar ni alimentar animales.",
      [
        "Senderos y plantas amazónicas",
        "Observación de fauna cuando sea posible",
        "Distancia y dificultad acordadas juntos",
      ],
    ],
    fr: [
      "Forêt et faune sauvage",
      "Levez les yeux, ralentissez et découvrez la vie entre les feuilles.",
      "Explorez la forêt à pied en observant les arbres, les plantes et la vie entre les feuilles. À la différence de la sortie consacrée aux oiseaux, cette promenade de jour s’intéresse plus largement à la forêt. Le parcours dépend de vos envies et des conditions locales ; observez à distance, sans toucher ni nourrir les animaux.",
      [
        "Sentiers et plantes d’Amazonie",
        "Observation de la faune selon les possibilités",
        "Distance et difficulté convenues ensemble",
      ],
    ],
  },
];
/* Example stages, not promises of a fixed daily schedule. */
const journeys = {
  gentle: {
    image: "tarapoto",
    en: [
      "Days of discovery with a hotel base. An example to personalise together.",
      [
        "River & rainforest",
        "Puerto Nariño & local stories",
        "Lake Tarapoto; optional fourth day for daytime Kaya",
      ],
    ],
    es: [
      "Días de descubrimiento con noches en hotel. Un ejemplo para personalizar juntos.",
      [
        "Río y selva",
        "Puerto Nariño e historias locales",
        "Lago Tarapoto; cuarto día opcional con Kaya diurno",
      ],
    ],
    fr: [
      "Des journées de découverte avec des nuits à l’hôtel. Un exemple à personnaliser.",
      [
        "Fleuve et forêt",
        "Puerto Nariño et récits locaux",
        "Lac Tarapoto ; quatrième jour facultatif avec Kaya de jour",
      ],
    ],
  },
  adventure: {
    image: "camp",
    en: [
      "More time under the canopy, with forest nights arranged around your comfort.",
      [
        "Walk towards camp and settle into the forest rhythm",
        "Explore trails and arrange a separate guided night walk",
        "Follow the river; shape the final days around your route",
      ],
    ],
    es: [
      "Más tiempo bajo los árboles, con noches de selva adaptadas a tu comodidad.",
      [
        "Camina al campamento y descubre el ritmo del bosque",
        "Explora senderos y coordina una caminata nocturna guiada",
        "Sigue el río; adaptamos los días finales a tu ruta",
      ],
    ],
    fr: [
      "Plus de temps sous la canopée, avec des nuits en forêt adaptées à votre confort.",
      [
        "Marchez vers le camp et adoptez le rythme de la forêt",
        "Explorez les sentiers et prévoyez une sortie nocturne guidée",
        "Suivez le fleuve ; préparons les derniers jours ensemble",
      ],
    ],
  },
  mixed: {
    image: "forest-canoe",
    en: [
      "Combine a forest stay with hotel nights. We balance immersion and rest together.",
      [
        "Begin with the river, a walk or time in Puerto Nariño",
        "Add a forest night and guided exploration as agreed",
        "Return to a hotel and choose cacao, birds or daytime Kaya separately",
      ],
    ],
    es: [
      "Combina una estancia de selva con noches en hotel. Equilibramos aventura y descanso.",
      [
        "Comienza con el río, una caminata o Puerto Nariño",
        "Suma una noche en selva y exploración guiada según lo acordado",
        "Regresa al hotel y elige cacao, aves o Kaya diurno por separado",
      ],
    ],
    fr: [
      "Combinez un séjour en forêt et des nuits à l’hôtel. Trouvons votre équilibre.",
      [
        "Commencez par le fleuve, une promenade ou Puerto Nariño",
        "Ajoutez une nuit en forêt et des sorties selon le programme convenu",
        "Revenez à l’hôtel et choisissez cacao, oiseaux ou Kaya de jour séparément",
      ],
    ],
  },
};
const gallery = [
  [
    "water-lilies",
    "Giant water lilies",
    "Victorias amazónicas",
    "Nénuphars géants",
  ],
  [
    "birdwatching",
    "A quiet moment in the branches",
    "Un instante entre las ramas",
    "Un instant paisible dans les branches",
  ],
  [
    "frog",
    "The tiny wonders of the forest",
    "Las pequeñas maravillas de la selva",
    "Les petites merveilles de la forêt",
  ],
  [
    "forest-canoe",
    "Paddling through the forest by day",
    "Navegando por la selva de día",
    "Pagayer dans la forêt de jour",
  ],
  [
    "roots",
    "The roots of the rainforest",
    "Las raíces de la selva",
    "Les racines de la forêt",
  ],
  [
    "sunset",
    "The river at the end of the day",
    "El río al final del día",
    "Le fleuve en fin de journée",
  ],
];
