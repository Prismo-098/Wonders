// information about each of the seven wonders
// (the script.js file uses this to build the page)

const wonders = [
  {
    id: "great-wall",
    name: "Great Wall of China",
    country: "China",
    when: "from the 7th century BC",
    colors: {
      sky1: "#33444d",
      sky2: "#546138",
      accent: "#b0d289",
      ground: "#191c12"
    },
    intro: "Separate walls were first joined under Qin Shi Huang and rebuilt by later dynasties, most famously the Ming. Watchtowers follow the ridgelines for mile after mile.",
    bigNumber: "21,000 km",
    bigNumberLabel: "of wall sections surveyed",
    story: "Several states built separate walls from the 7th century BC. Qin Shi Huang linked them after unifying China in 221 BC, and the Ming dynasty rebuilt much of the brick-and-stone wall visitors walk today.",
    visitText: "Badaling is the busiest section near Beijing. Mutianyu and Jinshanling are quieter. Spring and autumn are the most comfortable seasons.",
    bullets: [
      "Built and rebuilt over more than 2,000 years",
      "It is not visible to the naked eye from space",
      "Earlier sections used rammed earth, later ones brick and stone"
    ],
    photos: [
      "images/great-wall-1.jpg",
      "images/great-wall-2.jpg"
    ],
    photoAlts: [
      "Great Wall watchtowers and ramparts across forested ridges",
      "A restored watchtower and stone walkway of the Great Wall"
    ],
    caption: "A restored watchtower and paved walkway on a section near Beijing",
    moreToKnow: "The Ming sections are the best known, with brick walls, signal towers and garrison posts. Guards passed warnings along by smoke and fire from tower to tower. The wall was never a single barrier but a network of walls, trenches and natural defences.",
    quickFacts: [
      [
        "Total length",
        "21,196 km"
      ],
      [
        "Typical height",
        "6–7 m"
      ],
      [
        "Main builders",
        "Qin, Han, Ming"
      ],
      [
        "UNESCO",
        "1987"
      ]
    ],
    place: "Near Beijing, China",
    tip: "Restored sections near Beijing make an easy walk, while wild, unrestored stretches crumble along remote ridges.",
    timeline: [
      [
        "7th century BC",
        "Early states build the first defensive walls."
      ],
      [
        "221 BC",
        "Qin Shi Huang joins and extends the walls into one frontier."
      ],
      [
        "1368–1644",
        "The Ming dynasty rebuilds the wall in brick and stone."
      ],
      [
        "1987",
        "The Great Wall becomes a UNESCO World Heritage Site."
      ]
    ],
    didYouKnow: "The idea that you can see it from space is a myth. It is very long but also very narrow, so it is hard to pick out with the naked eye.",
    visitInfo: [
      [
        "When",
        "Spring (April–May) and autumn (September–October) are mild and clear."
      ],
      [
        "Getting there",
        "Day trips run from Beijing to restored sections such as Mutianyu and Badaling."
      ],
      [
        "Tickets",
        "Each section has its own ticket office, so check the one you plan to visit."
      ],
      [
        "Time needed",
        "Half a day to a full day."
      ]
    ],
    quiz: {
      question: "About how much wall has been surveyed in total?",
      options: [
        "2,100 km",
        "21,000 km",
        "210,000 km"
      ],
      answer: 1
    },
    coords: [
      40.43,
      116.57
    ]
  },
  {
    id: "petra",
    name: "Petra",
    country: "Jordan",
    when: "from the 4th century BC",
    colors: {
      sky1: "#5c3123",
      sky2: "#8a4427",
      accent: "#f39668",
      ground: "#1f130f"
    },
    intro: "The Nabataeans carved a trading capital out of rose-red sandstone. Visitors walk through the narrow Siq gorge, and the Treasury appears at its end.",
    bigNumber: "1.2 km",
    bigNumberLabel: "gorge walk to the Treasury",
    story: "Petra was the capital of the Nabataean kingdom and a hub for caravans carrying incense and spices. The Swiss explorer Johann Ludwig Burckhardt brought it to Western attention in 1812.",
    visitText: "Spring and autumn are best. The hike up to the Monastery climbs about 800 steps, so start early and carry water.",
    bullets: [
      "A UNESCO World Heritage Site since 1985",
      "The Treasury is about 40 m tall",
      "The Nabataeans built channels and cisterns to store desert water"
    ],
    photos: [
      "images/petra-1.jpg",
      "images/petra-2.jpg"
    ],
    photoAlts: [
      "The Siq, a narrow sandstone gorge leading into Petra",
      "Ad Deir, the Monastery, carved into the cliff at Petra"
    ],
    caption: "Ad Deir, the Monastery, reached by a stairway of about 800 steps",
    moreToKnow: "Petra is nicknamed the Rose City for the colour of its sandstone. Its wealth came from controlling caravan routes, until Rome annexed the Nabataean kingdom in AD 106. Much of the site is still unexcavated.",
    quickFacts: [
      [
        "Built by",
        "Nabataeans"
      ],
      [
        "Monastery width",
        "≈47 m"
      ],
      [
        "Rediscovered",
        "1812"
      ],
      [
        "UNESCO",
        "1985"
      ]
    ],
    place: "Southern Jordan",
    tip: "The Siq winds through the rock and ends at the carved front of the Treasury.",
    timeline: [
      [
        "4th century BC",
        "The Nabataeans make Petra their capital and carve its tombs."
      ],
      [
        "AD 106",
        "Rome annexes the Nabataean kingdom."
      ],
      [
        "1812",
        "Explorer Johann Ludwig Burckhardt brings Petra to Western attention."
      ],
      [
        "1985",
        "Petra is listed as a UNESCO World Heritage Site."
      ]
    ],
    didYouKnow: "Much of Petra has never been excavated. Archaeologists are still finding tombs and buildings.",
    visitInfo: [
      [
        "When",
        "Spring and autumn. Summer afternoons are very hot."
      ],
      [
        "Getting there",
        "About three hours by road from Amman, or stay in nearby Wadi Musa."
      ],
      [
        "Tickets",
        "Buy at the visitor centre, and check whether a Jordan Pass covers your entry."
      ],
      [
        "Time needed",
        "One to two days."
      ]
    ],
    quiz: {
      question: "Which people carved Petra into the rock?",
      options: [
        "The Nabataeans",
        "The Romans",
        "The Egyptians"
      ],
      answer: 0
    },
    coords: [
      30.33,
      35.44
    ]
  },
  {
    id: "christ",
    name: "Christ the Redeemer",
    country: "Brazil",
    when: "completed 1931",
    colors: {
      sky1: "#21365e",
      sky2: "#4575ba",
      accent: "#79a0e2",
      ground: "#0b1522"
    },
    intro: "The statue stands on Corcovado above Rio de Janeiro, built from reinforced concrete and clad in soapstone tiles. Its arms stretch wider than a basketball court is long.",
    bigNumber: "30 m",
    bigNumberLabel: "tall, with an arm span of 28 m",
    story: "Paul Landowski designed the statue with engineer Heitor da Silva Costa, and it was built between 1922 and 1931. The face was sculpted by Gheorghe Leonida.",
    visitText: "Reach the summit by the Corcovado cog train or a van. Clear mornings give the best views, as cloud often covers the top.",
    bullets: [
      "Opened on 12 October 1931",
      "It stands on an 8 m pedestal",
      "Lightning strikes it several times a year"
    ],
    photos: [
      "images/christ-1.jpg",
      "images/christ-2.jpg"
    ],
    photoAlts: [
      "Christ the Redeemer with arms outstretched against the sky",
      "Aerial view of Christ the Redeemer above Rio de Janeiro"
    ],
    caption: "From Corcovado, about 700 m up, the statue overlooks Guanabara Bay and Sugarloaf Mountain",
    moreToKnow: "The statue is an Art Deco landmark inside Tijuca National Park. It was paid for largely by public donations, and thousands of small triangular soapstone tiles cover the concrete.",
    quickFacts: [
      [
        "Statue height",
        "30 m"
      ],
      [
        "Pedestal",
        "8 m"
      ],
      [
        "Arm span",
        "28 m"
      ],
      [
        "Weight",
        "≈635 tonnes"
      ]
    ],
    place: "Rio de Janeiro, Brazil",
    tip: "From the platform at its feet, the view reaches Sugarloaf Mountain and Guanabara Bay.",
    timeline: [
      [
        "1850s",
        "A monument on Corcovado is first proposed."
      ],
      [
        "1922–1931",
        "The statue is built from reinforced concrete and soapstone."
      ],
      [
        "12 October 1931",
        "Christ the Redeemer is inaugurated."
      ],
      [
        "2007",
        "It is named one of the New Seven Wonders."
      ]
    ],
    didYouKnow: "Lightning strikes the statue several times a year, and a strike in 2014 damaged one of its fingers.",
    visitInfo: [
      [
        "When",
        "Clear mornings give the best views before clouds gather."
      ],
      [
        "Getting there",
        "Take the cog train from Cosme Velho, or an official van."
      ],
      [
        "Tickets",
        "Book train or van tickets ahead, especially at weekends."
      ],
      [
        "Time needed",
        "Two to three hours."
      ]
    ],
    quiz: {
      question: "What covers the statue’s concrete frame?",
      options: [
        "Marble slabs",
        "Soapstone tiles",
        "Bronze plates"
      ],
      answer: 1
    },
    coords: [
      -22.95,
      -43.21
    ]
  },
  {
    id: "machu",
    name: "Machu Picchu",
    country: "Peru",
    when: "15th century",
    colors: {
      sky1: "#294057",
      sky2: "#324b67",
      accent: "#7fa8dc",
      ground: "#1a1714"
    },
    intro: "The Inca built this citadel on a ridge high in the Andes. Farming terraces step down the slopes, and the stone walls fit together without mortar.",
    bigNumber: "2,430 m",
    bigNumberLabel: "above sea level",
    story: "The Inca built Machu Picchu around 1450, probably for the emperor Pachacuti, and left it about a century later. Hiram Bingham made it known worldwide in 1911.",
    visitText: "Entry is by timed ticket, so book ahead. The dry season from May to September usually has the clearest weather.",
    bullets: [
      "A UNESCO World Heritage Site since 1983",
      "Home to the Temple of the Sun and the Intihuatana stone",
      "Reached by train or on foot along the Inca Trail"
    ],
    photos: [
      "images/machu-1.jpg",
      "images/machu-2.jpg"
    ],
    photoAlts: [
      "Machu Picchu ruins with mountains behind in morning light",
      "The Temple of the Condor at Machu Picchu"
    ],
    caption: "The Temple of the Condor, where natural rock forms the bird’s outstretched wings",
    moreToKnow: "The site has a farming sector with terraces and an urban sector with temples, plazas and homes. The Inca fitted stones so tightly that a blade cannot slip between them, and hidden drainage kept the slopes stable in heavy rain.",
    quickFacts: [
      [
        "Elevation",
        "2,430 m"
      ],
      [
        "Built",
        "c. 1450"
      ],
      [
        "Made known",
        "1911"
      ],
      [
        "UNESCO",
        "1983"
      ]
    ],
    place: "Cusco region, Peru",
    tip: "Hikers on the Inca Trail get their first view from the Sun Gate, high above the ruins.",
    timeline: [
      [
        "c. 1450",
        "The Inca build Machu Picchu, probably as a royal estate."
      ],
      [
        "1532",
        "The Spanish conquest ends the Inca empire, and the site is later abandoned."
      ],
      [
        "1911",
        "Hiram Bingham brings Machu Picchu to world attention."
      ],
      [
        "1983",
        "It becomes a UNESCO World Heritage Site."
      ]
    ],
    didYouKnow: "The Spanish never found Machu Picchu, which is one reason it survived in such good shape.",
    visitInfo: [
      [
        "When",
        "The dry season, from May to September, has the clearest skies."
      ],
      [
        "Getting there",
        "Train from Cusco or Ollantaytambo to Aguas Calientes, then a bus or hike up."
      ],
      [
        "Tickets",
        "Timed entry tickets are limited, so book well ahead."
      ],
      [
        "Time needed",
        "Half a day to a full day."
      ]
    ],
    quiz: {
      question: "Which civilization built Machu Picchu?",
      options: [
        "The Aztecs",
        "The Maya",
        "The Inca"
      ],
      answer: 2
    },
    coords: [
      -13.16,
      -72.55
    ]
  },
  {
    id: "chichen",
    name: "Chichén Itzá",
    country: "Mexico",
    when: "peak c. 800–1200 AD",
    colors: {
      sky1: "#23305d",
      sky2: "#677198",
      accent: "#8698d5",
      ground: "#1c1a12"
    },
    intro: "This Maya city is known for El Castillo, a stepped pyramid with four stairways. At the equinoxes the sun casts a snake-shaped shadow down its side.",
    bigNumber: "365",
    bigNumberLabel: "steps counting the top platform",
    story: "Chichén Itzá was a major Maya city on the Yucatán peninsula, built near natural sinkholes called cenotes that supplied water. Later buildings show influence from central Mexico.",
    visitText: "Go early to beat the heat and crowds. The serpent shadow appears around 20–21 March and 22–23 September.",
    bullets: [
      "El Castillo is about 24 m tall",
      "Its ball court is among the largest in Mesoamerica",
      "Climbing the pyramid has been banned since 2006"
    ],
    photos: [
      "images/chichen-1.jpg",
      "images/chichen-2.jpg"
    ],
    photoAlts: [
      "El Castillo pyramid at Chichén Itzá under a blue sky",
      "Rows of carved skulls on the Tzompantli at Chichén Itzá"
    ],
    caption: "The Tzompantli, or skull platform, carved with rows of skulls",
    moreToKnow: "El Castillo honours the feathered serpent Kukulcán. Four stairways of 91 steps plus the top platform make 365. A clap at the foot of the stairs returns a chirp-like echo that visitors often compare to a bird call.",
    quickFacts: [
      [
        "Pyramid height",
        "≈24 m"
      ],
      [
        "Steps",
        "91 per side"
      ],
      [
        "Great Ball Court",
        "≈168 m long"
      ],
      [
        "UNESCO",
        "1988"
      ]
    ],
    place: "Yucatán, Mexico",
    tip: "At the equinoxes the afternoon sun casts a serpent of light and shadow down the north stairway.",
    timeline: [
      [
        "c. AD 600",
        "Chichén Itzá grows into a major Maya city."
      ],
      [
        "c. AD 800–1200",
        "El Castillo and the great ball court are built as the city peaks."
      ],
      [
        "1988",
        "The site becomes a UNESCO World Heritage Site."
      ],
      [
        "2007",
        "It is named one of the New Seven Wonders."
      ]
    ],
    didYouKnow: "El Castillo has an older pyramid hidden inside it. Archaeologists found it by tunnelling into the structure.",
    visitInfo: [
      [
        "When",
        "Arrive early, before the heat and the biggest crowds."
      ],
      [
        "Getting there",
        "About two and a half hours from Cancún, or ninety minutes from Mérida."
      ],
      [
        "Tickets",
        "Buy at the entrance, and check opening hours before you go."
      ],
      [
        "Time needed",
        "Two to three hours."
      ]
    ],
    quiz: {
      question: "How many steps do El Castillo’s four stairways and top platform add up to?",
      options: [
        "52",
        "365",
        "400"
      ],
      answer: 1
    },
    coords: [
      20.68,
      -88.57
    ]
  },
  {
    id: "colosseum",
    name: "Colosseum",
    country: "Italy",
    when: "opened AD 80",
    colors: {
      sky1: "#3a4046",
      sky2: "#947d6b",
      accent: "#d2ae89",
      ground: "#1d1811"
    },
    intro: "Rome’s great amphitheatre hosted public spectacles for centuries. Its stacked arches and passages beneath the arena shaped stadium design ever since.",
    bigNumber: "50,000",
    bigNumberLabel: "spectators it could hold",
    story: "Emperor Vespasian began the Colosseum around AD 70 and his son Titus opened it in AD 80. It hosted gladiator fights and animal hunts for centuries.",
    visitText: "Book timed tickets ahead of time. Tours that include the underground chambers and upper tiers are worth the extra cost.",
    bullets: [
      "Its original name was the Flavian Amphitheatre",
      "Built from travertine, tuff and brick-faced concrete",
      "Earthquakes and stone-taking destroyed part of the outer wall"
    ],
    photos: [
      "images/colosseum-1.jpg",
      "images/colosseum-2.jpg"
    ],
    photoAlts: [
      "The curved outer wall of the Colosseum in Rome",
      "Inside the Colosseum looking over the arena and underground passages"
    ],
    caption: "The arena floor is gone, exposing the passages where animals and stage machinery were kept",
    moreToKnow: "The outer wall stacks three tiers of columns in the Doric, Ionic and Corinthian styles. Crowds were shaded by a huge retractable awning, the velarium, worked by sailors. Later the building served as housing, workshops and a fortress.",
    quickFacts: [
      [
        "Length",
        "189 m"
      ],
      [
        "Width",
        "156 m"
      ],
      [
        "Height",
        "≈48 m"
      ],
      [
        "Entrances",
        "80 arches"
      ]
    ],
    place: "Rome, Italy",
    tip: "An arena ticket lets you stand on the floor where gladiators once fought.",
    timeline: [
      [
        "AD 70–72",
        "Emperor Vespasian begins building the amphitheatre."
      ],
      [
        "AD 80",
        "Titus opens it with games that last 100 days."
      ],
      [
        "6th century",
        "The spectacles end, and the building later becomes housing, workshops and a fortress."
      ],
      [
        "1980",
        "The historic centre of Rome, including the Colosseum, is listed by UNESCO."
      ]
    ],
    didYouKnow: "Its numbered entrances and stairways let huge crowds find their seats quickly, much like a modern stadium.",
    visitInfo: [
      [
        "When",
        "Early morning or late afternoon avoids the longest lines."
      ],
      [
        "Getting there",
        "Take Metro line B to the Colosseo stop."
      ],
      [
        "Tickets",
        "Book timed tickets ahead. Many include the Roman Forum and Palatine Hill."
      ],
      [
        "Time needed",
        "One and a half to two hours."
      ]
    ],
    quiz: {
      question: "What was the Colosseum’s giant retractable awning called?",
      options: [
        "The velarium",
        "The atrium",
        "The forum"
      ],
      answer: 0
    },
    coords: [
      41.89,
      12.49
    ]
  },
  {
    id: "taj",
    name: "Taj Mahal",
    country: "India",
    when: "begun 1632",
    colors: {
      sky1: "#2a3f56",
      sky2: "#8c7f73",
      accent: "#e0b27a",
      ground: "#1b1913"
    },
    intro: "Shah Jahan commissioned this white marble mausoleum in Agra for his wife Mumtaz Mahal. The marble shifts from pink to white to gold across the day.",
    bigNumber: "4",
    bigNumberLabel: "minarets frame the central dome",
    story: "Shah Jahan began the Taj Mahal in 1632 after his wife Mumtaz Mahal died. The main tomb was finished around 1648 and the wider complex around 1653.",
    visitText: "Sunrise is the most popular time to visit. It is closed to general visitors on Fridays, which is a prayer day.",
    bullets: [
      "Built from white Makrana marble",
      "The gardens follow a symmetrical charbagh layout",
      "A UNESCO World Heritage Site since 1983"
    ],
    photos: [
      "images/taj-1.jpg",
      "images/taj-2.jpg"
    ],
    photoAlts: [
      "The Taj Mahal reflected in its long pool",
      "Close view of the Taj Mahal’s white marble walls and arches"
    ],
    caption: "Marble walls inlaid with semi-precious stones in floral patterns",
    moreToKnow: "Thousands of craftsmen worked on the complex, and Ustad Ahmad Lahori is often credited as chief architect. The inlay technique is called pietra dura. Shah Jahan was later buried beside Mumtaz Mahal.",
    quickFacts: [
      [
        "Built",
        "1632–1653"
      ],
      [
        "Dome height",
        "≈35 m"
      ],
      [
        "Total height",
        "≈73 m"
      ],
      [
        "UNESCO",
        "1983"
      ]
    ],
    place: "Agra, India",
    tip: "Mehtab Bagh, a garden across the Yamuna River, offers one of the best views.",
    timeline: [
      [
        "1631",
        "Mumtaz Mahal dies, and Shah Jahan decides to build her a tomb."
      ],
      [
        "1632",
        "Construction of the Taj Mahal begins."
      ],
      [
        "1653",
        "The main complex is completed."
      ],
      [
        "1983",
        "The Taj Mahal becomes a UNESCO World Heritage Site."
      ]
    ],
    didYouKnow: "The four minarets are said to lean slightly outward, so that in an earthquake they would fall away from the tomb.",
    visitInfo: [
      [
        "When",
        "Sunrise in the cooler months, from October to March."
      ],
      [
        "Getting there",
        "Agra is about two to three hours from Delhi by train or road."
      ],
      [
        "Tickets",
        "Buy online to skip the longest queue. The main tomb needs an extra ticket."
      ],
      [
        "Time needed",
        "Two to three hours."
      ]
    ],
    quiz: {
      question: "Who was the Taj Mahal built for?",
      options: [
        "Mumtaz Mahal",
        "Cleopatra",
        "Queen Victoria"
      ],
      answer: 0
    },
    coords: [
      27.17,
      78.04
    ]
  }
];
