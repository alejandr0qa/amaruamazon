// Territorial context is editorial content, not a description of Amaru's inclusions.
// Sources and scope reviewed in docs/editorial-sources-2026-11-11.md.
export const editorialSources = {
  tarapoto: { name: "Ramsar", url: "https://rsis.ramsar.org/ris/2336" },
  destination: { name: "Colombia Travel", url: "https://colombia.travel/es/puerto-narino" },
  cacao: { name: "Cancillería de Colombia", url: "https://www.cancilleria.gov.co/sala-de-prensa/noticias/direccion-para-el-desarrollo-y-la-integracion-fronteriza-de-la-cancilleria-inauguro-en-puerto-narino-una-planta-para-el-procesamiento-de-cacao-amazonico" },
  forest: { name: "Parques Nacionales", url: "https://www.parquesnacionales.gov.co/nuestros-parques/pnn-amacayacu/" },
};

export const editorialSourceLabel = {
  en: "Destination context sources",
  es: "Fuentes del contexto del destino",
  fr: "Sources sur le territoire",
};

// Original territorial context, separate from operating inclusions.
export const experienceEditorial = {
  tarapoto: {
    sources: ["tarapoto"],
    en: { paragraphs: [
      "Lake Tarapoto belongs to a network of lakes, rivers and creeks near Puerto Nariño, in the Colombian Amazon. Recognised as a Wetland of International Importance under the Ramsar Convention, the complex is a habitat for river dolphins, fish and birds. Looking beyond a single sighting reveals a landscape in which water connects many forms of life.",
      "Take time to notice the shoreline, the reflections and the activity around the water. A dolphin may be the moment you hope for, while the wider lake landscape gives the outing its character. Let the search remain patient and respectful: wild animals choose where they go, and each visit unfolds differently.",
    ] },
    es: { paragraphs: [
      "El lago Tarapoto forma parte de un conjunto de lagos, ríos y quebradas cercano a Puerto Nariño, en el Amazonas colombiano. El complejo está reconocido como Humedal de Importancia Internacional por la Convención Ramsar y es hábitat de delfines de río, peces y aves. Mirarlo con calma permite descubrir un paisaje en el que el agua conecta distintas formas de vida.",
      "Además de buscar delfines, vale la pena detener la mirada en las orillas, los reflejos y la actividad alrededor del agua. El encuentro que esperas puede ser un instante; el paisaje del lago acompaña toda la experiencia. Observa con paciencia y respeto: la fauna vive en libertad y cada visita es diferente.",
    ] },
    fr: { paragraphs: [
      "Près de Puerto Nariño, en Amazonie colombienne, le lac Tarapoto appartient à un ensemble de lacs reliés par des rivières et des cours d’eau. Ce complexe, reconnu comme zone humide d’importance internationale par la Convention de Ramsar, abrite dauphins de rivière, poissons et oiseaux. Prendre le temps de regarder permet de découvrir les liens entre l’eau et la vie qui l’entoure.",
      "Au-delà de la recherche des dauphins, observez les rives, les reflets et les mouvements autour de l’eau. La rencontre espérée peut ne durer qu’un instant ; les paysages du lac donnent toute sa profondeur à la sortie. Restez patient et discret : les animaux sont libres de leurs déplacements et chaque visite est différente.",
    ] },
  },
  kayak: {
    sources: ["destination"],
    en: { paragraphs: [
      "Water is part of everyday travel around Puerto Nariño. Paddling offers a closer perspective on the river landscape: the line of the bank, the shade of trees and the changing reflections. Kaya is Amaru’s daytime experience, with natural light for taking in the surroundings and time to enjoy the simple rhythm of moving across the water.",
      "The Amazon’s waterways change with water levels and weather. Those changes are part of planning a paddling outing, so choose your experience by discussing the conditions for your visit. If you are drawn to quiet scenery, photography or trying paddling for the first time, share that interest so Amaru can explain the options and requirements.",
    ] },
    es: { paragraphs: [
      "En Puerto Nariño, el agua también es camino. Remar ofrece otra perspectiva del paisaje fluvial: la línea de la orilla, la sombra de los árboles y los reflejos que cambian con el movimiento. Kaya es la experiencia diurna de Amaru, una invitación a observar el entorno con luz natural y disfrutar del ritmo de cada remada.",
      "El nivel del agua y el clima pueden cambiar las condiciones de navegación en el Amazonas. Por eso, planear una salida empieza por conversar sobre el momento de tu visita. Si te atraen los paisajes tranquilos, la fotografía o la idea de remar por primera vez, cuéntalo para conocer las opciones y los requisitos de la actividad.",
    ] },
    fr: { paragraphs: [
      "À Puerto Nariño, l’eau fait aussi partie des chemins du quotidien. Pagayer invite à regarder autrement les paysages fluviaux : la ligne des rives, l’ombre des arbres et les reflets qui accompagnent le mouvement. Kaya est l’expérience de jour d’Amaru, pour découvrir les environs à la lumière naturelle et apprécier le rythme de chaque coup de pagaie.",
      "Le niveau de l’eau et la météo peuvent modifier les conditions de navigation en Amazonie. Préparer une sortie commence donc par un échange sur la période de votre séjour. Paysages paisibles, photographie ou première découverte de la pagaie : précisez vos envies pour connaître les possibilités et les prérequis.",
    ] },
  },
  birdwatching: {
    sources: ["tarapoto"],
    en: { paragraphs: [
      "The forests and wetlands around Puerto Nariño make an inviting setting for an interest in birds. As one example of the region’s diversity, the Ramsar record for the Tarapoto wetlands documents a rich bird community. That regional picture offers context for your visit; the observation site for Amaru’s birdwatching outing is arranged separately.",
      "Birdwatching begins with a pause. Listen before looking, follow movement among the leaves and allow time for a bird to come into view. The pleasure can be in recognising a call or noticing a detail you would otherwise pass by. Share your interests, whether you are curious to begin or already enjoy keeping your own observation notes.",
    ] },
    es: { paragraphs: [
      "Los bosques y humedales de los alrededores de Puerto Nariño invitan a acercarse al mundo de las aves. Como referencia de esa diversidad regional, el registro Ramsar de Tarapoto documenta una amplia comunidad de aves. Ese contexto ayuda a comprender el destino; el lugar concreto de observación de la salida de Amaru se coordina por separado.",
      "Observar empieza por hacer una pausa. Escucha antes de buscar, sigue el movimiento entre las hojas y deja tiempo para que un ave se haga visible. Reconocer un canto o reparar en un detalle puede transformar una caminata. Cuéntanos si quieres iniciarte en la observación o si ya disfrutas llevando tus propios registros.",
    ] },
    fr: { paragraphs: [
      "Les forêts et les zones humides des environs de Puerto Nariño invitent à découvrir les oiseaux. Le registre Ramsar de Tarapoto illustre cette diversité régionale en décrivant une riche communauté d’oiseaux. Ce contexte éclaire votre découverte du territoire ; le lieu précis de la sortie ornithologique d’Amaru est convenu séparément.",
      "Observer commence par une pause. Écoutez avant de chercher, suivez un mouvement parmi les feuilles et laissez le temps à un oiseau de se montrer. Reconnaître un chant ou remarquer un détail peut changer votre regard sur la forêt. Indiquez si vous souhaitez vous initier à l’observation ou si vous aimez déjà tenir un carnet de terrain.",
    ] },
  },
  cacao: {
    sources: ["cacao"],
    en: { paragraphs: [
      "Cacao opens a window onto another side of the Colombian Amazon: cultivation, local work and the journey from a fresh bean towards chocolate. In 2022, Colombia’s Ministry of Foreign Affairs reported the opening of a cacao-processing plant in Puerto Nariño, linked to local producers. This regional initiative offers a glimpse of the work behind the chocolate.",
      "Fermentation, drying and transformation help explain why a cacao experience reaches beyond a finished bar of chocolate. They offer starting points for questions about the crop and the people working with it. With Amaru, ask which place, hosts and activities can be arranged for your dates, and let those confirmed details shape your expectations.",
    ] },
    es: { paragraphs: [
      "El cacao permite descubrir otra cara del Amazonas colombiano: el cultivo, el trabajo local y el camino del grano hacia el chocolate. En 2022, la Cancillería de Colombia informó sobre la inauguración de una planta de procesamiento en Puerto Nariño vinculada a productores de la región. Esta iniciativa del territorio permite acercarse al trabajo que hay detrás del chocolate.",
      "La fermentación, el secado y la transformación ayudan a comprender que la historia del cacao comienza mucho antes de una barra de chocolate. Son puntos de partida para preguntar por el cultivo y por quienes trabajan con él. Consulta con Amaru qué lugar, anfitriones y actividades pueden coordinarse para tus fechas, y construye tus expectativas a partir de esos detalles confirmados.",
    ] },
    fr: { paragraphs: [
      "Le cacao révèle une autre facette de l’Amazonie colombienne : les cultures, le travail local et le chemin de la fève vers le chocolat. En 2022, le ministère colombien des Affaires étrangères a annoncé l’inauguration d’une unité de transformation à Puerto Nariño, liée aux producteurs de la région. Cette initiative du territoire donne un aperçu du travail qui se cache derrière le chocolat.",
      "Fermentation, séchage et transformation rappellent que l’histoire du cacao commence bien avant une tablette de chocolat. Ce sont des pistes pour questionner les cultures et le travail des personnes qui s’y consacrent. Demandez à Amaru quels lieux, hôtes et activités peuvent être prévus à vos dates, puis préparez votre visite à partir de ces éléments confirmés.",
    ] },
  },
  "night-walk": {
    sources: ["forest"],
    en: { paragraphs: [
      "After dark, listening becomes a different way to discover the Amazon rainforest. With fewer distant views, attention shifts to nearby sounds, leaves and the small details picked out by a light. Night walks are among the nature activities described for this part of the Colombian Amazon; Amaru’s outing keeps that focus on careful observation with a guide.",
      "Choose this experience for the atmosphere of the forest after sunset and the chance to look more closely. Go at the pace indicated by your guide and leave wildlife undisturbed. The walk is a separate experience from an overnight stay, so discuss those two interests independently when planning your visit.",
    ] },
    es: { paragraphs: [
      "Cuando oscurece, escuchar se convierte en otra forma de descubrir la selva amazónica. La atención pasa del paisaje lejano a los sonidos cercanos, las hojas y los pequeños detalles que revela una luz. Las caminatas nocturnas forman parte de las actividades de naturaleza descritas para esta región del Amazonas colombiano; la salida de Amaru se centra en observar con atención junto al guía.",
      "Elige esta experiencia por el ambiente del bosque después del atardecer y por la oportunidad de mirar más de cerca. Camina al ritmo indicado por el guía y deja a la fauna seguir su actividad sin intervenir. La caminata es distinta del pernocte: si también te interesa dormir en la selva, conversemos sobre ambas experiencias por separado.",
    ] },
    fr: { paragraphs: [
      "À la nuit tombée, écouter devient une autre façon de découvrir la forêt amazonienne. Le regard quitte les paysages lointains pour s’attarder sur les sons proches, les feuilles et les petits détails révélés par une lumière. Les promenades nocturnes figurent parmi les activités de nature décrites pour cette région de l’Amazonie colombienne ; la sortie d’Amaru privilégie une observation attentive avec le guide.",
      "Choisissez cette expérience pour l’atmosphère de la forêt après le coucher du soleil et pour le plaisir de regarder de plus près. Avancez au rythme indiqué par le guide et laissez la faune poursuivre son activité. La promenade est distincte d’une nuitée : si dormir en forêt vous attire aussi, abordez ces deux expériences séparément.",
    ] },
  },
  camp: {
    sources: ["destination","forest"],
    en: { paragraphs: [
      "Staying until morning gives you time to experience the forest’s changing atmosphere: the evening sounds, the hours of darkness and the return of daylight. In the Colombian Amazon, warmth and humidity are part of preparing for that experience. An overnight stay invites a different rhythm from a walk followed by a return to your accommodation.",
      "Your comfort is part of choosing a forest night. Accommodation around Puerto Nariño takes different forms, so the words ‘a night in the rainforest’ should begin a conversation about the exact place and sleeping arrangements. Explain what matters to you, from rest and privacy to walking effort, before agreeing an itinerary with Amaru.",
    ] },
    es: { paragraphs: [
      "Quedarte hasta la mañana permite conocer los cambios de ambiente del bosque: los sonidos del atardecer, las horas de oscuridad y el regreso de la luz. En el Amazonas colombiano, el calor y la humedad forman parte de la preparación. Una noche en la selva invita a un ritmo distinto al de una caminata con regreso al alojamiento.",
      "Tu comodidad también forma parte de la elección. En los alrededores de Puerto Nariño existen distintas formas de alojamiento; por eso, hablar de una noche de selva debe abrir una conversación sobre el lugar concreto y las condiciones del descanso. Explica qué es importante para ti, desde el reposo y la privacidad hasta el esfuerzo de las caminatas, antes de acordar un itinerario con Amaru.",
    ] },
    fr: { paragraphs: [
      "Rester jusqu’au matin laisse le temps de découvrir les changements d’atmosphère de la forêt : les sons du soir, les heures d’obscurité et le retour de la lumière. En Amazonie colombienne, chaleur et humidité font partie des préparatifs. Une nuit en forêt propose un autre rythme qu’une promenade suivie d’un retour à son hébergement.",
      "Votre confort compte dans ce choix. Les environs de Puerto Nariño offrent différentes formes d’hébergement : parler d’une nuit en forêt doit donc ouvrir un échange sur le lieu précis et les conditions de couchage. Précisez ce qui vous importe, du repos et de l’intimité à l’effort de marche, avant de convenir d’un itinéraire avec Amaru.",
    ] },
  },
  community: {
    sources: ["destination"],
    en: { paragraphs: [
      "Puerto Nariño is also a place of living cultures, including the Ticuna, Cocama and Yagua peoples. That diversity is part of understanding the Colombian Amazon alongside its rivers and forests. A cultural encounter offers time to listen to the people who live here and to approach the region through everyday life, local knowledge and the stories they choose to share.",
      "Come with curiosity and room for an exchange. Ask what your hosts would like to tell you and follow their lead about photographs and participation. Each encounter depends on the people receiving you; confirm who will host the visit and what they wish to share, without assuming a particular community, ceremony or demonstration.",
    ] },
    es: { paragraphs: [
      "Puerto Nariño también es un territorio de culturas vivas, con presencia de los pueblos ticuna, cocama y yagua. Esa diversidad forma parte de comprender el Amazonas colombiano junto a sus ríos y bosques. Un encuentro cultural invita a escuchar a quienes habitan el lugar y a acercarse a la región desde la vida cotidiana, los saberes y las historias que decidan compartir.",
      "Llega con curiosidad y tiempo para conversar. Pregunta qué desean contarte tus anfitriones y sigue sus indicaciones sobre fotografías y participación. Cada encuentro depende de las personas que reciben: confirma quién será el anfitrión y qué desea compartir, sin dar por hecha una comunidad concreta, una ceremonia o una demostración.",
    ] },
    fr: { paragraphs: [
      "Puerto Nariño est aussi un territoire de cultures vivantes, où sont présents les peuples ticuna, cocama et yagua. Cette diversité participe à la découverte de l’Amazonie colombienne, au même titre que ses fleuves et ses forêts. Une rencontre culturelle invite à écouter les habitants et à aborder la région à travers leur quotidien, leurs savoirs et les récits qu’ils choisissent de partager.",
      "Venez avec curiosité et du temps pour échanger. Demandez ce que vos hôtes souhaitent raconter et suivez leurs indications pour les photos et la participation. Chaque rencontre dépend des personnes qui vous reçoivent : faites préciser les hôtes et ce qu’ils souhaitent partager, sans présumer une communauté, une cérémonie ou une démonstration particulière.",
    ] },
  },
  wildlife: {
    sources: ["forest"],
    en: { paragraphs: [
      "The Colombian Amazon brings together different forest environments, including areas that flood and others on higher ground. That variety is part of understanding the region’s plant and animal life. A forest walk invites you to look at the ecosystem as a whole: roots, leaves, sounds and traces of life can be as interesting as an animal briefly appearing among the trees.",
      "Give yourself permission to walk slowly and notice small changes in the surroundings. Ask questions about what you see, and leave plants and animals where you find them. This is Amaru’s daytime approach to exploring forest life; those whose main interest is birds or the forest after dark can enquire about those separate experiences.",
    ] },
    es: { paragraphs: [
      "El Amazonas colombiano reúne distintos ambientes de bosque, entre ellos zonas que se inundan y otras de tierra firme. Esa variedad ayuda a comprender la vida vegetal y animal de la región. Caminar invita a mirar el ecosistema en conjunto: raíces, hojas, sonidos y rastros pueden despertar tanto interés como un animal que aparece por un instante entre los árboles.",
      "Date permiso para ir despacio y reparar en pequeños cambios del entorno. Pregunta por lo que observas y deja las plantas y los animales en su lugar. Esta es la propuesta diurna de Amaru para acercarse a la vida del bosque; si tu interés principal son las aves o la selva después del anochecer, puedes consultar esas experiencias por separado.",
    ] },
    fr: { paragraphs: [
      "L’Amazonie colombienne rassemble différents milieux forestiers, dont des zones inondables et des terres restant hors d’eau. Cette diversité aide à comprendre la vie végétale et animale de la région. Marcher invite à regarder l’écosystème dans son ensemble : racines, feuilles, sons et traces de vie peuvent susciter autant de curiosité qu’un animal aperçu un instant entre les arbres.",
      "Accordez-vous le temps d’avancer lentement et de remarquer les changements autour de vous. Posez des questions sur ce que vous observez et laissez plantes et animaux à leur place. Cette découverte de jour proposée par Amaru s’intéresse à la vie de la forêt ; les oiseaux ou la forêt après la tombée de la nuit font l’objet d’expériences distinctes.",
    ] },
  },
  "city-tour": {
    sources: ["destination"],
    en: { paragraphs: [
      "Puerto Nariño invites a slower introduction to the Colombian Amazon. Walking between its streets, cultural spaces and viewpoints gives you a sense of the town before heading out onto the river or into the forest. Ask about each stop’s availability and bring time to listen to local stories.",
    ] },
    es: { paragraphs: [
      "Puerto Nariño invita a un primer encuentro pausado con el Amazonas colombiano. Caminar entre sus calles, espacios culturales y miradores permite conocer el pueblo antes de salir al río o al bosque. Consulta la disponibilidad de cada parada y reserva tiempo para escuchar las historias del lugar.",
    ] },
    fr: { paragraphs: [
      "Puerto Nariño invite à une première rencontre paisible avec l’Amazonie colombienne. Ses rues, lieux culturels et points de vue permettent de découvrir le village avant de partir sur le fleuve ou en forêt. Renseignez-vous sur les haltes possibles et gardez du temps pour les récits locaux.",
    ] },
  },
  oje: {
    sources: ["forest"],
    en: { paragraphs: [
      "Pause beside the roots and notice how they spread across the forest floor. Around the Ojé tree, smaller plants, textures and changing light invite a closer look at the living forest. Allow time to observe rather than treating the walk as a race to a single photograph.",
    ] },
    es: { paragraphs: [
      "Detente junto a las raíces y observa cómo se extienden por el suelo del bosque. Alrededor del árbol Ojé, las plantas más pequeñas, las texturas y los cambios de luz invitan a mirar la selva con atención. Reserva tiempo para observar y disfrutar el camino, además de llevarte una fotografía.",
    ] },
    fr: { paragraphs: [
      "Arrêtez-vous près des racines et observez leur déploiement sur le sol forestier. Autour de l’arbre Ojé, petites plantes, textures et lumière invitent à regarder la forêt de plus près. Prenez le temps d’observer et de profiter du chemin, au-delà d’une seule photographie.",
    ] },
  },
  caimans: {
    sources: ["tarapoto"],
    en: { paragraphs: [
      "The Amazon’s waterways are habitats as well as routes through the landscape. Looking for wildlife after dark calls for patience and restraint: let the guide lead the observation and leave animals free to move. A quiet evening on the river has value even when a particular animal does not appear.",
    ] },
    es: { paragraphs: [
      "Las aguas del Amazonas son hábitat y también camino. Buscar fauna de noche requiere paciencia y respeto: deja que el guía conduzca la observación y que los animales se desplacen libremente. Una salida tranquila por el río tiene valor aunque una especie concreta no aparezca.",
    ] },
    fr: { paragraphs: [
      "Les eaux de l’Amazonie sont à la fois un habitat et un chemin. Rechercher la faune de nuit demande patience et discrétion : laissez le guide conduire l’observation et les animaux se déplacer librement. Une soirée paisible sur le fleuve garde son intérêt même sans rencontre avec une espèce précise.",
    ] },
  },
  "flooded-forest": {
    sources: ["forest"],
    en: { paragraphs: [
      "In parts of the Amazon, higher water transforms the relationship between forest and river. Trees and vegetation surround the canoe, offering a different view from a dry-ground walk. The water level determines what is possible, so this experience is planned around conditions rather than a fixed promise of access.",
    ] },
    es: { paragraphs: [
      "En algunas zonas del Amazonas, el agua transforma la relación entre el bosque y el río. Los árboles y la vegetación rodean la canoa y ofrecen una perspectiva distinta de una caminata por tierra firme. El nivel del agua determina las posibilidades: la salida se prepara según las condiciones y no como una promesa fija de acceso.",
    ] },
    fr: { paragraphs: [
      "Dans certaines parties de l’Amazonie, la montée de l’eau transforme les liens entre forêt et fleuve. Arbres et végétation entourent le canoë et offrent un autre regard qu’une marche sur terre ferme. Le niveau de l’eau détermine les possibilités : la sortie se prépare selon les conditions, sans promesse fixe d’accès.",
    ] },
  },
  "san-antonio": {
    "sources": [
      "destination"
    ],
    "en": {
      "paragraphs": [
        "The journey begins on the river, with time to watch the changing banks before reaching San Antonio. Here, Victoria Regia and the chance of spotting sloths bring two different ways of looking at the Amazon together: across the water and up into the trees.",
        "Take time to notice the shapes of the leaves, the surrounding vegetation and movement among the branches. This excursion combines the destination and its natural attractions; Victoria Regia and sloths are not presented as separate tours. Wildlife remains free to move, so patience is part of the experience."
      ]
    },
    "es": {
      "paragraphs": [
        "El viaje comienza en el río, con tiempo para mirar las orillas antes de llegar a San Antonio. Allí, la Victoria Regia y la posibilidad de encontrar perezosos reúnen dos formas de descubrir el Amazonas: observar el agua y levantar la mirada hacia los árboles.",
        "Detente en las formas de las hojas, la vegetación cercana y el movimiento entre las ramas. Esta excursión combina el destino y sus atractivos naturales; Victoria Regia y perezosos forman parte de la misma propuesta. La fauna se desplaza libremente y observar con paciencia también es parte de la experiencia."
      ]
    },
    "fr": {
      "paragraphs": [
        "Le voyage commence sur le fleuve, avec le temps d’observer les rives avant de rejoindre San Antonio. La Victoria Regia et la possibilité d’apercevoir des paresseux réunissent deux regards sur l’Amazonie : à la surface de l’eau et dans les arbres.",
        "Prenez le temps d’observer les formes des feuilles, la végétation et les mouvements dans les branches. Cette excursion associe la destination et ses attraits naturels ; Victoria Regia et paresseux font partie de la même proposition. La faune se déplace librement et la patience fait aussi partie de l’expérience."
      ]
    }
  },
};
