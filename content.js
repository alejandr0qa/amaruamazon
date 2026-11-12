/* Eight existing experiences retained; new confirmed activities added without changing their routes. */
const experiences = [
  {
    "id": "tarapoto",
    "cat": "water",
    "time": "day",
    "image": "tarapoto",
    "en": [
      "Lake Tarapoto",
      "Follow the waterways in search of river dolphins and the quiet beauty of the lakes.",
      "Explore Lake Tarapoto by day, with time for the waterside landscapes and the search for river dolphins. This experience centres on the lake and its wildlife, rather than paddling or forest trails. Dolphins live in the wild, so each outing is different and sightings are never guaranteed.",
      [
        "River and lake landscapes",
        "Dolphin watching when conditions allow",
        "Meeting point and duration confirmed together"
      ]
    ],
    "es": [
      "Lago Tarapoto",
      "Recorre los canales en busca de delfines de río y de la belleza tranquila de los lagos.",
      "Descubre el entorno del lago Tarapoto de día, con tiempo para sus paisajes y la búsqueda de delfines de río. Esta experiencia se centra en el lago y su fauna, a diferencia del kayak o las caminatas de selva. Los delfines viven en libertad: cada salida es distinta y no se garantiza su avistamiento.",
      [
        "Paisajes de río y lago",
        "Delfines si las condiciones lo permiten",
        "Punto de encuentro y duración por confirmar"
      ]
    ],
    "fr": [
      "Lac Tarapoto",
      "Parcourez les voies d’eau à la recherche des dauphins et de la beauté paisible des lacs.",
      "Découvrez les paysages du lac Tarapoto de jour et partez à la recherche des dauphins de rivière. Cette expérience privilégie le lac et sa faune, à la différence du kayak ou des randonnées en forêt. Les dauphins vivent en liberté : chaque sortie est différente et leur observation n’est jamais garantie.",
      [
        "Paysages du fleuve et des lacs",
        "Dauphins selon les conditions",
        "Rendez-vous et durée à confirmer"
      ]
    ],
    "effort": "effortLow"
  },
  {
    "id": "kayak",
    "cat": "water",
    "time": "day",
    "image": "kayak",
    "en": [
      "Kaya · daytime paddling",
      "Slow down on the water. A daylight kayaking experience, shaped by the river.",
      "Kaya is our daytime paddling experience in the Amazon. Follow the water at a slower pace and take in the forest surroundings by natural light. It is a separate outing from the rainforest night walk; the route, equipment and suitability for your group need to be discussed before choosing it.",
      [
        "Daylight outings only",
        "Route adapted to water levels and weather",
        "Equipment and requirements confirmed in your proposal"
      ]
    ],
    "es": [
      "Kaya · kayak diurno",
      "Baja el ritmo sobre el agua. Una experiencia en kayak con luz de día, al ritmo del río.",
      "Kaya es nuestra experiencia de kayak diurno en el Amazonas. Baja el ritmo sobre el agua y observa el entorno de selva con luz natural. Es una salida distinta de la caminata nocturna; antes de elegirla, consulta la ruta, el equipo y las condiciones para tu grupo.",
      [
        "Salidas únicamente con luz de día",
        "Ruta adaptada al nivel del agua y al clima",
        "Equipo y requisitos confirmados en la propuesta"
      ]
    ],
    "fr": [
      "Kaya · kayak de jour",
      "Ralentissez sur l’eau. Une expérience de kayak à la lumière du jour, au rythme du fleuve.",
      "Kaya est notre expérience de kayak de jour en Amazonie. Ralentissez sur l’eau et découvrez la forêt environnante à la lumière naturelle. Cette sortie est distincte de la promenade nocturne ; discutez du parcours, du matériel et des conditions pour votre groupe avant de la choisir.",
      [
        "Sorties uniquement en journée",
        "Parcours adapté au niveau de l’eau et à la météo",
        "Matériel et conditions précisés dans la proposition"
      ]
    ]
  },
  {
    "id": "birdwatching",
    "cat": "forest",
    "time": "dawn",
    "image": "birdwatching-new",
    "en": [
      "Birdwatching",
      "An early start, a quieter forest. Listen, look closer and follow the calls.",
      "A dedicated birdwatching experience for those who want to spend time listening, watching branches and following the calls of the forest. The focus is on birds, with an early start arranged for your visit. This is a standalone tour, independent of the cacao experience, and sightings vary with the conditions.",
      [
        "An independent birdwatching experience",
        "Early-morning departure arranged together",
        "Bring binoculars if you have them; sightings vary"
      ]
    ],
    "es": [
      "Avistamiento de aves",
      "Una salida temprano, una selva más tranquila. Escucha, observa y sigue sus cantos.",
      "Una experiencia dedicada a quienes quieren detenerse a escuchar, mirar entre las ramas y seguir los cantos de la selva. El foco son las aves, con una salida temprana por coordinar para tu visita. Es un tour independiente del cacao y los avistamientos varían según las condiciones.",
      [
        "Experiencia independiente de avistamiento de aves",
        "Salida temprano en la mañana por coordinar",
        "Trae binoculares si tienes; los avistamientos varían"
      ]
    ],
    "fr": [
      "Observation des oiseaux",
      "Partir tôt, écouter la forêt. Regarder de plus près et suivre les chants.",
      "Une expérience pour prendre le temps d’écouter, de regarder parmi les branches et de suivre les chants de la forêt. La sortie est consacrée aux oiseaux, avec un départ matinal à convenir pour votre visite. Elle est indépendante du cacao et les observations varient selon les conditions.",
      [
        "Une expérience indépendante",
        "Départ matinal à convenir ensemble",
        "Apportez vos jumelles ; les observations varient"
      ]
    ],
    "effort": "effortModerate"
  },
  {
    "id": "cacao",
    "cat": "culture",
    "time": "day",
    "image": "cacao",
    "en": [
      "Amazonian cacao",
      "Explore cacao cultivation and the steps that turn the fruit into local chocolate.",
      "Discover the cultivation and preparation of Amazonian cacao, from the fruit towards artisanal chocolate. Discuss which stages are shown during the visit and how a tasting with seasonal fruit or products to take away may feature in your proposal. The host, activities and inclusions are confirmed for your dates. This experience remains independent of birdwatching.",
      [
        "A dedicated cacao experience",
        "Cultivation and local knowledge",
        "Host availability and itinerary confirmed before booking"
      ]
    ],
    "es": [
      "Cacao amazónico",
      "Conoce el cultivo del cacao y los procesos que transforman el fruto en chocolate local.",
      "Descubre el cultivo y la elaboración del cacao amazónico, desde el fruto hasta el chocolate artesanal. Consulta qué etapas se muestran durante la visita y cómo una degustación con frutas de temporada o productos para llevar pueden formar parte de tu propuesta. El anfitrión, las actividades y las inclusiones se confirman para tus fechas. Es una experiencia independiente del avistamiento de aves.",
      [
        "Una experiencia dedicada al cacao",
        "Cultivo y saberes locales",
        "Disponibilidad e itinerario confirmados antes de reservar"
      ]
    ],
    "fr": [
      "Cacao amazonien",
      "Découvrez la culture du cacao et les étapes qui transforment le fruit en chocolat local.",
      "Découvrez la culture et la préparation du cacao amazonien, du fruit vers le chocolat artisanal. Demandez quelles étapes sont présentées et comment une dégustation avec des fruits de saison ou des produits à emporter peuvent figurer dans votre proposition. Hôtes, activités et prestations sont confirmés pour vos dates. Cette expérience reste indépendante de l’observation des oiseaux.",
      [
        "Une expérience dédiée au cacao",
        "Culture et savoirs locaux",
        "Disponibilité et programme confirmés avant réservation"
      ]
    ],
    "effort": "effortLow"
  },
  {
    "id": "night-walk",
    "cat": "forest",
    "time": "night",
    "image": "night-walk",
    "en": [
      "Wochine & rainforest night walk",
      "Begin at Wochine Reserve, then discover the forest after dark with a local guide. One combined experience, with a return rather than an overnight stay.",
      "This outing combines a visit to Wochine Reserve with a guided night walk. As daylight fades, the forest is experienced through sounds, movement and close observation. Natural paths, roots, mud and low visibility call for balance and comfortable walking. Ask about the sequence, access arrangements, equipment and return for your group; wildlife encounters are never guaranteed.",
      [
        "Wochine and a night walk in one outing",
        "Moderate to high physical effort",
        "A night activity, without sleeping in the forest"
      ]
    ],
    "es": [
      "Wochine y caminata nocturna",
      "Comienza en la reserva Wochine y descubre después la selva de noche con un guía local. Una experiencia combinada, con regreso y sin pernoctación.",
      "Esta salida combina la visita a la reserva Wochine con una caminata nocturna guiada. Al caer la luz, los sonidos, el movimiento y la observación atenta permiten conocer otra faceta del bosque. Los senderos naturales, las raíces, el barro y la poca visibilidad requieren equilibrio y comodidad al caminar. Consulta el orden de la visita, accesos, equipo y regreso para tu grupo; los encuentros con fauna nunca se garantizan.",
      [
        "Wochine y caminata nocturna en una sola salida",
        "Exigencia física moderada a alta",
        "Actividad nocturna, sin dormir en la selva"
      ]
    ],
    "fr": [
      "Wochine et promenade nocturne",
      "Commencez à la réserve Wochine, puis découvrez la forêt de nuit avec un guide local. Une expérience combinée, avec retour et sans nuitée en forêt.",
      "Cette sortie associe une visite de la réserve Wochine à une promenade nocturne guidée. À la tombée du jour, sons, mouvements et observation attentive révèlent un autre visage de la forêt. Sentiers naturels, racines, boue et faible visibilité demandent de l’équilibre et de l’aisance à la marche. Confirmez l’ordre des visites, les accès, le matériel et le retour pour votre groupe ; les rencontres avec la faune ne sont jamais garanties.",
      [
        "Wochine et marche nocturne en une seule sortie",
        "Effort physique modéré à élevé",
        "Une activité nocturne, sans nuitée en forêt"
      ]
    ],
    "effort": "effortModerateHigh"
  },
  {
    "id": "camp",
    "cat": "forest",
    "time": "overnight",
    "image": "camp",
    "en": [
      "A night in the rainforest",
      "Stay for the sounds, the stories and the feeling of waking up somewhere different.",
      "Stay beyond the evening walk and spend a night in the rainforest in a hammock with a mosquito net. This is a demanding immersion: walking over uneven, damp ground with basic luggage, adapting to darkness, insects and the absence of conventional comforts. Prepare the sleeping place, meals, water, equipment and return with Amaru before confirming your personalised proposal.",
      [
        "Overnight forest immersion",
        "Walking and camp arrangements tailored together",
        "Equipment, meals and inclusions to confirm with Amaru"
      ]
    ],
    "es": [
      "Una noche en la selva",
      "Quédate por los sonidos, las historias y la emoción de despertar en otro lugar.",
      "Quédate más allá de una caminata nocturna y pasa una noche en la selva en hamaca con mosquitero. Es una inmersión exigente: caminar por terreno húmedo e irregular con equipaje básico y adaptarse a la oscuridad, los insectos y la ausencia de comodidades convencionales. Acuerda con Amaru el lugar de descanso, alimentación, agua, equipo y regreso antes de confirmar tu propuesta personalizada.",
      [
        "Inmersión en selva con pernocte",
        "Caminatas y campamento acordados juntos",
        "Equipo, comidas y servicios por confirmar con Amaru"
      ]
    ],
    "fr": [
      "Une nuit dans la forêt",
      "Restez pour les sons, les histoires et la sensation de vous réveiller ailleurs.",
      "Prolongez la découverte au-delà d’une promenade nocturne et passez une nuit en forêt dans un hamac avec moustiquaire. Cette immersion est exigeante : marcher sur un terrain humide et irrégulier avec un bagage réduit, s’adapter à l’obscurité, aux insectes et à l’absence de confort habituel. Préparez avec Amaru le lieu de repos, les repas, l’eau, le matériel et le retour avant de confirmer votre proposition.",
      [
        "Immersion avec nuit en forêt",
        "Marche et campement préparés ensemble",
        "Matériel, repas et prestations à confirmer avec Amaru"
      ]
    ],
    "effort": "effortHigh"
  },
  {
    "id": "community",
    "cat": "culture",
    "time": "day",
    "image": "community",
    "en": [
      "Stories of the Amazon",
      "Meet the region through craft, everyday life and the stories of its people.",
      "Discover the region through local stories, everyday life and the knowledge that hosts choose to share. These cultural encounters focus on people and exchange, rather than a wildlife outing. Visits depend on the hosts’ availability and wishes; approach as a guest, ask permission for photographs and follow their guidance.",
      [
        "Local stories and cultural encounters",
        "Host-led visits, subject to availability",
        "Respect for customs and permission for portraits"
      ]
    ],
    "es": [
      "Historias del Amazonas",
      "Conoce la región a través de los oficios, la vida cotidiana y las historias de su gente.",
      "Conoce la región a través de las historias, la vida cotidiana y los conocimientos que los anfitriones decidan compartir. Estos encuentros culturales se centran en las personas y el intercambio. Las visitas dependen de su disponibilidad y voluntad: acércate como invitado, pide permiso para fotografiar y sigue sus indicaciones.",
      [
        "Historias y encuentros culturales",
        "Visitas con anfitriones según disponibilidad",
        "Respeto por las costumbres y permiso para retratos"
      ]
    ],
    "fr": [
      "Histoires d’Amazonie",
      "Rencontrez la région à travers les savoir-faire, le quotidien et les récits de ses habitants.",
      "Découvrez la région à travers les récits, le quotidien et les savoirs que les hôtes souhaitent partager. Ces rencontres culturelles privilégient les personnes et l’échange. Les visites dépendent de leur disponibilité et de leurs souhaits : venez en invité, demandez la permission avant les portraits et suivez leurs indications.",
      [
        "Récits et rencontres culturelles",
        "Visites avec les hôtes selon disponibilité",
        "Respect des coutumes et autorisation pour les portraits"
      ]
    ]
  },
  {
    "id": "wildlife",
    "cat": "forest",
    "time": "day",
    "image": "wildlife",
    "en": [
      "Forest & wildlife walks",
      "Look up, slow your steps and discover the life between the leaves.",
      "Explore the rainforest on foot, paying attention to trees, plants and the wildlife between the leaves. Unlike the dedicated birdwatching outing, this walk takes a broader look at forest life during the day. The route depends on your interests and local conditions; observe wildlife from a distance, without touching or feeding animals.",
      [
        "Forest trails and Amazonian plants",
        "Wildlife observation when possible",
        "Walking distance and difficulty agreed together"
      ]
    ],
    "es": [
      "Caminatas de selva y fauna",
      "Mira hacia arriba, camina despacio y descubre la vida entre las hojas.",
      "Explora la selva a pie y detente a observar los árboles, las plantas y la vida entre las hojas. A diferencia de la salida dedicada a las aves, esta caminata diurna ofrece una mirada más amplia al bosque. La ruta depende de tus intereses y de las condiciones locales; observa la fauna a distancia, sin tocar ni alimentar animales.",
      [
        "Senderos y plantas amazónicas",
        "Observación de fauna cuando sea posible",
        "Distancia y dificultad acordadas juntos"
      ]
    ],
    "fr": [
      "Forêt et faune sauvage",
      "Levez les yeux, ralentissez et découvrez la vie entre les feuilles.",
      "Explorez la forêt à pied en observant les arbres, les plantes et la vie entre les feuilles. À la différence de la sortie consacrée aux oiseaux, cette promenade de jour s’intéresse plus largement à la forêt. Le parcours dépend de vos envies et des conditions locales ; observez à distance, sans toucher ni nourrir les animaux.",
      [
        "Sentiers et plantes d’Amazonie",
        "Observation de la faune selon les possibilités",
        "Distance et difficulté convenues ensemble"
      ]
    ]
  },
  {
    "id": "city-tour",
    "cat": "culture",
    "time": "byArrangement",
    "image": "city-tour",
    "effort": "effortLow",
    "en": [
      "Puerto Nariño City Tour",
      "Discover the town on foot, with local stories, river views and places to pause.",
      "Walk through Puerto Nariño’s pedestrian streets and get to know the town through its cultural and natural surroundings. The team’s proposed route includes Natütama and a viewpoint; ask which stops and entrances are available for your visit. The walk includes some steps and uphill stretches, particularly towards the Naipata viewpoint.",
      [
        "Walking discovery of Puerto Nariño",
        "Cultural stops and viewpoints to confirm",
        "Low effort, with steps and slopes"
      ]
    ],
    "es": [
      "City Tour de Puerto Nariño",
      "Descubre el pueblo a pie, entre historias locales, vistas al río y lugares para detenerte.",
      "Recorre las calles peatonales de Puerto Nariño y acércate al pueblo desde su entorno cultural y natural. La propuesta del equipo contempla Natütama y un mirador; consulta qué paradas y entradas están disponibles para tu visita. Hay tramos con escaleras y subidas, especialmente hacia el mirador Naipata.",
      [
        "Puerto Nariño a pie",
        "Paradas culturales y miradores por confirmar",
        "Exigencia baja, con escaleras y subidas"
      ]
    ],
    "fr": [
      "Visite de Puerto Nariño à pied",
      "Découvrez le village à pied, entre récits locaux, vues sur le fleuve et haltes pour observer.",
      "Parcourez les rues piétonnes de Puerto Nariño pour découvrir son environnement culturel et naturel. Le parcours proposé par l’équipe comprend Natütama et un point de vue ; demandez quelles haltes et entrées sont possibles pour votre visite. Certains passages comportent des marches et des montées, notamment vers le mirador Naipata.",
      [
        "Découverte de Puerto Nariño à pied",
        "Haltes culturelles et points de vue à confirmer",
        "Effort faible, avec marches et montées"
      ]
    ]
  },
  {
    "id": "oje",
    "cat": "forest",
    "time": "byArrangement",
    "image": "oje",
    "effort": "effortModerate",
    "duration": {
      "en": "The walking portion is approximately 1–2 hours, depending on the route. Confirm the total outing time.",
      "es": "El tramo de caminata es de aproximadamente 1–2 horas, según el recorrido. Confirma la duración total de la salida.",
      "fr": "La partie à pied dure environ 1 à 2 heures selon le parcours. Confirmez la durée totale de la sortie."
    },
    "en": [
      "The Ojé tree",
      "Follow a forest path towards a great tree and take time to notice its remarkable roots.",
      "Discover the tree known locally as Ojé, presented by the Amaru team as a forest outing centred on its impressive roots and surroundings. Getting there involves walking on natural paths where mud, roots, uneven ground and humidity are part of the preparation. Plan for moderate effort and discuss the actual terrain and walking time before choosing the outing.",
      [
        "A forest walk towards the Ojé tree",
        "Roots, vegetation and time to observe",
        "Moderate effort on natural terrain"
      ]
    ],
    "es": [
      "El árbol Ojé",
      "Sigue un sendero de selva hacia un gran árbol y detente a observar sus raíces.",
      "Descubre el árbol conocido localmente como Ojé, en una propuesta del equipo de Amaru centrada en sus grandes raíces y el entorno del bosque. La llegada implica caminar por senderos naturales donde puede haber barro, raíces, desniveles y humedad. Prepara una salida de exigencia moderada y conversa sobre el terreno y el tiempo de caminata antes de elegirla.",
      [
        "Caminata de selva hacia el árbol Ojé",
        "Raíces, vegetación y tiempo para observar",
        "Exigencia moderada en terreno natural"
      ]
    ],
    "fr": [
      "L’arbre Ojé",
      "Suivez un sentier forestier vers un grand arbre et prenez le temps d’observer ses racines.",
      "Découvrez l’arbre appelé localement Ojé, dans une sortie proposée par l’équipe d’Amaru autour de ses grandes racines et de la forêt environnante. L’accès se fait à pied sur des sentiers naturels pouvant présenter boue, racines, dénivelés et humidité. Prévoyez un effort modéré et discutez du terrain et du temps de marche avant de choisir la sortie.",
      [
        "Marche en forêt vers l’arbre Ojé",
        "Racines, végétation et observation",
        "Effort modéré sur terrain naturel"
      ]
    ]
  },
  {
    "id": "caimans",
    "cat": "water",
    "time": "night",
    "image": "sunset",
    "effort": "effortLow",
    "photoContext": {
      "en": "Context photograph of the riverside landscape at sunset; it does not show a caiman sighting.",
      "es": "Fotografía de contexto del paisaje fluvial al atardecer; no muestra un avistamiento de caimanes.",
      "fr": "Photographie du paysage fluvial au crépuscule ; elle ne montre pas d’observation de caïmans."
    },
    "en": [
      "Caiman watching after dark",
      "A nocturnal boat outing to look for caimans while discovering the river after sunset.",
      "Explore the river environment after dark with a local guide, looking for caimans from a boat without handling or pursuing wildlife. This is a separate outing from the forest night walk. Effort is generally low, but you need the mobility and balance to board and leave the boat, remain seated as instructed and be comfortable with darkness and insects. Sightings are never guaranteed.",
      [
        "Nocturnal observation from a boat",
        "A separate experience from the night walk",
        "Low effort, with boarding and balance requirements"
      ]
    ],
    "es": [
      "Avistamiento nocturno de caimanes",
      "Una salida en embarcación para buscar caimanes y descubrir el río después del atardecer.",
      "Explora el entorno fluvial de noche con un guía local, buscando caimanes desde una embarcación sin manipular ni perseguir fauna. Es una salida distinta de la caminata nocturna por el bosque. La exigencia suele ser baja, pero se necesita movilidad y equilibrio para subir y bajar, permanecer sentado según las indicaciones y adaptarse a la oscuridad y los insectos. No se garantizan avistamientos.",
      [
        "Observación nocturna desde una embarcación",
        "Experiencia independiente de la caminata nocturna",
        "Exigencia baja, con requisitos de embarque y equilibrio"
      ]
    ],
    "fr": [
      "Observation nocturne des caïmans",
      "Une sortie en bateau pour rechercher les caïmans et découvrir le fleuve après le coucher du soleil.",
      "Découvrez le milieu fluvial de nuit avec un guide local, en recherchant les caïmans depuis une embarcation sans manipuler ni poursuivre les animaux. Cette sortie est distincte de la promenade nocturne en forêt. L’effort est généralement faible, mais il faut pouvoir embarquer et débarquer, rester assis selon les indications et être à l’aise dans l’obscurité et avec les insectes. Aucune observation n’est garantie.",
      [
        "Observation nocturne depuis une embarcation",
        "Expérience distincte de la promenade nocturne",
        "Effort faible, avec conditions d’embarquement et d’équilibre"
      ]
    ]
  },
  {
    "id": "flooded-forest",
    "cat": "water",
    "time": "byArrangement",
    "image": "flooded-forest",
    "effort": "effortModerate",
    "en": [
      "Canoeing in flooded forest",
      "Paddle among forest trees when water levels make this watery landscape accessible.",
      "Explore a flooded-forest setting in a canoe, with natural channels, trees and vegetation close to the water. This experience depends on water levels and local conditions, so the route and possibility of going ahead need confirmation for your dates. Paddling requires coordination, balance and some arm and shoulder endurance. It is offered separately from Kaya daytime kayaking.",
      [
        "Canoeing in a flooded-forest setting",
        "Water levels and route confirmed for your dates",
        "Moderate effort involving paddling and balance"
      ]
    ],
    "es": [
      "Canotaje en selva inundada",
      "Rema entre los árboles cuando el nivel del agua permite conocer este paisaje de selva.",
      "Explora en canoa un entorno de bosque inundado, entre canales naturales, árboles y vegetación cercana al agua. La experiencia depende del nivel del río y de las condiciones locales: la ruta y la posibilidad de realizarla se confirman para tus fechas. Remar requiere coordinación, equilibrio y cierta resistencia de brazos y hombros. Se ofrece por separado de Kaya, el kayak diurno.",
      [
        "Canotaje en un entorno de selva inundada",
        "Nivel del agua y ruta por confirmar para tus fechas",
        "Exigencia moderada: remar y mantener el equilibrio"
      ]
    ],
    "fr": [
      "Canoë en forêt inondée",
      "Pagayez parmi les arbres lorsque le niveau de l’eau permet de découvrir ce paysage forestier.",
      "Explorez en canoë un milieu de forêt inondée, entre chenaux naturels, arbres et végétation au bord de l’eau. L’expérience dépend du niveau du fleuve et des conditions locales : parcours et possibilité de sortie sont à confirmer pour vos dates. Pagayer demande coordination, équilibre et une certaine endurance des bras et des épaules. Cette sortie est distincte de Kaya, le kayak de jour.",
      [
        "Canoë dans un milieu de forêt inondée",
        "Niveau de l’eau et parcours à confirmer",
        "Effort modéré : pagayer et garder l’équilibre"
      ]
    ]
  }
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
    "Nénuphars géants"
  ],
  [
    "birdwatching",
    "A quiet moment in the branches",
    "Un instante entre las ramas",
    "Un instant paisible dans les branches"
  ],
  [
    "frog",
    "The tiny wonders of the forest",
    "Las pequeñas maravillas de la selva",
    "Les petites merveilles de la forêt"
  ],
  [
    "forest-canoe",
    "Paddling through the forest by day",
    "Navegando por la selva de día",
    "Pagayer dans la forêt de jour"
  ],
  [
    "roots",
    "The roots of the rainforest",
    "Las raíces de la selva",
    "Les racines de la forêt"
  ],
  [
    "sunset",
    "The river at the end of the day",
    "El río al final del día",
    "Le fleuve en fin de journée"
  ],
  [
    "city-tour",
    "Puerto Nariño from above",
    "Puerto Nariño desde lo alto",
    "Puerto Nariño vu d’en haut"
  ],
  [
    "flooded-forest",
    "A canoe journey among forest trees",
    "Un recorrido en canoa entre árboles",
    "En canoë parmi les arbres"
  ]
];
