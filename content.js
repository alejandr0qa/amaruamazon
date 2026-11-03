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
      "A daytime river outing around Lake Tarapoto. Explore the landscape and look for river wildlife with your guide. Sightings and activities depend on conditions.",
      [
        "River and lake landscapes",
        "Dolphin watching when conditions allow",
        "Meeting point and duration confirmed together",
      ],
    ],
    es: [
      "Lago Tarapoto",
      "Recorre los canales en busca de delfines de río y de la belleza tranquila de los lagos.",
      "Una salida diurna por el entorno del lago Tarapoto. Explora el paisaje y busca fauna de río con tu guía. Los avistamientos dependen de las condiciones.",
      [
        "Paisajes de río y lago",
        "Delfines si las condiciones lo permiten",
        "Punto de encuentro y duración por confirmar",
      ],
    ],
    fr: [
      "Lac Tarapoto",
      "Parcourez les voies d’eau à la recherche des dauphins et de la beauté paisible des lacs.",
      "Une sortie de jour autour du lac Tarapoto. Découvrez les paysages et cherchez la faune avec votre guide. Les observations dépendent des conditions.",
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
      "Kaya is a daytime activity. Discover the river surroundings by natural light. We confirm the route, equipment and suitability for your group before booking.",
      [
        "Daylight outings only",
        "Route adapted to water levels and weather",
        "Equipment and requirements confirmed in your proposal",
      ],
    ],
    es: [
      "Kaya · kayak diurno",
      "Baja el ritmo sobre el agua. Una experiencia en kayak con luz de día, al ritmo del río.",
      "Kaya es una actividad diurna. Descubre el entorno del río con luz natural. Antes de reservar confirmamos la ruta, el equipo y las condiciones para tu grupo.",
      [
        "Salidas únicamente con luz de día",
        "Ruta adaptada al nivel del agua y al clima",
        "Equipo y requisitos confirmados en la propuesta",
      ],
    ],
    fr: [
      "Kaya · kayak de jour",
      "Ralentissez sur l’eau. Une expérience de kayak à la lumière du jour, au rythme du fleuve.",
      "Kaya est une activité de jour. Découvrez les environs à la lumière naturelle. Nous confirmons le parcours, le matériel et les conditions pour votre groupe.",
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
      "A dedicated birdwatching tour, separate from the cacao experience. Take time to listen and observe, with the route and departure arranged for your visit.",
      [
        "An independent birdwatching experience",
        "Early-morning departure arranged together",
        "Bring binoculars if you have them; sightings vary",
      ],
    ],
    es: [
      "Avistamiento de aves",
      "Una salida temprano, una selva más tranquila. Escucha, observa y sigue sus cantos.",
      "Un tour dedicado a las aves, independiente de la experiencia de cacao. Tómate el tiempo para escuchar y observar. Coordinamos la ruta y la hora para tu visita.",
      [
        "Experiencia independiente de avistamiento de aves",
        "Salida temprano en la mañana por coordinar",
        "Trae binoculares si tienes; los avistamientos varían",
      ],
    ],
    fr: [
      "Observation des oiseaux",
      "Partir tôt, écouter la forêt. Regarder de plus près et suivre les chants.",
      "Une sortie consacrée aux oiseaux, indépendante de la visite du cacao. Prenez le temps d’écouter et d’observer ; le parcours et l’horaire sont convenus ensemble.",
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
      "A standalone cacao tour focused on its cultivation and local context, independently of birdwatching. The host visit and activities are confirmed when we plan your trip.",
      [
        "A dedicated cacao experience",
        "Cultivation and local knowledge",
        "Host availability and itinerary confirmed before booking",
      ],
    ],
    es: [
      "Cacao amazónico",
      "Descubre otra cara del Amazonas a través de la historia del cacao.",
      "Un tour independiente centrado en el cultivo de cacao y su contexto local, por separado del avistamiento de aves. Confirmamos la visita y las actividades al planear tu viaje.",
      [
        "Una experiencia dedicada al cacao",
        "Cultivo y saberes locales",
        "Disponibilidad e itinerario confirmados antes de reservar",
      ],
    ],
    fr: [
      "Cacao amazonien",
      "Découvrez une autre facette de l’Amazonie à travers l’histoire du cacao.",
      "Une visite indépendante consacrée à la culture du cacao et à son contexte local. Elle se réserve séparément de l’observation des oiseaux. La visite est confirmée ensemble.",
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
      "A guided night walk for discovering the rainforest after sunset. Move slowly and look for frogs, insects and other nocturnal life. This activity is separate from daytime Kaya.",
      [
        "A guided walk after dark",
        "Nocturnal wildlife and forest sounds",
        "Footwear, torch and route confirmed together",
      ],
    ],
    es: [
      "La selva de noche",
      "Una caminata con linterna entre pequeñas criaturas y sonidos extraordinarios.",
      "Una caminata guiada después del atardecer. Busca ranas, insectos y otra vida nocturna. Es una actividad distinta de Kaya, que es diurna.",
      [
        "Caminata guiada después del anochecer",
        "Fauna nocturna y sonidos de la selva",
        "Calzado, linterna y ruta por confirmar",
      ],
    ],
    fr: [
      "La forêt après la nuit tombée",
      "Une promenade à la lampe parmi les petites créatures et les sons extraordinaires.",
      "Une sortie guidée après le coucher du soleil. Cherchez grenouilles, insectes et autres animaux nocturnes. Une activité distincte de Kaya, pratiqué de jour.",
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
      "Spend a night in the forest as part of a tailored itinerary. Discuss walking distances, sleeping arrangements, meals and equipment with us to match your expectations.",
      [
        "Overnight forest immersion",
        "Walking and camp arrangements tailored together",
        "Equipment, meals and inclusions confirmed in writing",
      ],
    ],
    es: [
      "Una noche en la selva",
      "Quédate por los sonidos, las historias y la emoción de despertar en otro lugar.",
      "Pasa una noche en la selva dentro de un itinerario personalizado. Conversemos sobre las distancias, el descanso, las comidas y el equipo.",
      [
        "Inmersión en selva con pernocte",
        "Caminatas y campamento acordados juntos",
        "Equipo, comidas y servicios confirmados por escrito",
      ],
    ],
    fr: [
      "Une nuit dans la forêt",
      "Restez pour les sons, les histoires et la sensation de vous réveiller ailleurs.",
      "Passez une nuit en forêt dans le cadre d’un séjour sur mesure. Parlons des distances, du couchage, des repas et du matériel pour adapter l’expérience.",
      [
        "Immersion avec nuit en forêt",
        "Marche et campement préparés ensemble",
        "Matériel, repas et prestations confirmés par écrit",
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
      "Cultural encounters arranged with local hosts. Visits depend on the community’s availability and wishes. Ask permission for photographs and follow your hosts’ guidance.",
      [
        "Local stories and cultural encounters",
        "Host-led visits, subject to availability",
        "Respect for customs and permission for portraits",
      ],
    ],
    es: [
      "Historias del Amazonas",
      "Conoce la región a través de los oficios, la vida cotidiana y las historias de su gente.",
      "Encuentros coordinados con anfitriones locales. Las visitas dependen de la disponibilidad y voluntad de la comunidad. Pide permiso para fotografiar.",
      [
        "Historias y encuentros culturales",
        "Visitas con anfitriones según disponibilidad",
        "Respeto por las costumbres y permiso para retratos",
      ],
    ],
    fr: [
      "Histoires d’Amazonie",
      "Rencontrez la région à travers les savoir-faire, le quotidien et les récits de ses habitants.",
      "Des rencontres avec des hôtes locaux, selon la disponibilité et les souhaits de la communauté. Demandez la permission pour les portraits.",
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
      "Explore the world of trees, plants and wildlife. We plan the route according to your interests and conditions. Observe animals from a distance, without touching or feeding them.",
      [
        "Forest trails and Amazonian plants",
        "Wildlife observation when possible",
        "Walking distance and difficulty agreed together",
      ],
    ],
    es: [
      "Caminatas de selva y fauna",
      "Mira hacia arriba, camina despacio y descubre la vida entre las hojas.",
      "Conoce los árboles, las plantas y la fauna. Planeamos la ruta según tus intereses y las condiciones. Observa a distancia sin tocar ni alimentar a los animales.",
      [
        "Senderos y plantas amazónicas",
        "Observación de fauna cuando sea posible",
        "Distancia y dificultad acordadas juntos",
      ],
    ],
    fr: [
      "Forêt et faune sauvage",
      "Levez les yeux, ralentissez et découvrez la vie entre les feuilles.",
      "Découvrez arbres, plantes et faune. Le parcours dépend de vos envies et des conditions. Observez à distance, sans toucher ni nourrir les animaux.",
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
