/*
 * Project data.
 * The whole portfolio grid is rendered from this array — to add, remove or edit a
 * project just change an object here. No HTML edits needed.
 *
 * media:
 *   { kind: 'youtube', id: 'VIDEO_ID' }          -> lazy YouTube facade (thumbnail + play)
 *   { kind: 'image',   src: '...', href: '...' } -> static image (href optional = open full)
 *   { kind: 'webgl',   demo: 'cube' }            -> lazy interactive WebGL demo
 *
 * links: optional store badges -> { store: 'play' | 'app', url: '...' }
 */
window.PROJECTS = [
	{
		title: 'Interactive WebGL Cube',
		role: 'Demo',
		tags: ['WebGL', 'Graphics', 'Shaders'],
		description:
			'A little playground baked right into this page. The preview stays idle until you click — ' +
			'then a WebGL context spins up and renders a lit, rotating cube. Grab it with your mouse or ' +
			'finger to spin it around; let go and it keeps its momentum.',
		media: { kind: 'webgl', demo: 'cube' },
		featured: true
	},

	/* --- Highlights also listed as project cards (to compare against the slideshow) --- */
	{
		title: 'Sundsvall–Timrå Airport',
		role: 'CTO, Lead Developer',
		tags: ['Training', 'VR'],
		description:
			'I led the development of an immersive training experience for Sundsvall–Timrå Airport, ' +
			'covering aircraft marshalling and fire-extinguishing procedures in a safe, repeatable virtual environment.',
		media: { kind: 'image', src: 'assets/img/projects/SundsvalTimraAirport.jpg' }
	},
	{
		title: 'SJ Time Journey',
		role: 'CTO, Lead Developer',
		tags: ['Interactive Experience', 'Trains', 'History'],
		description:
			'I led the architecture and development of an interactive timeline experience for SJ (Swedish State Railways), guiding users ' +
			'through the history of trains in Sweden with a clear narrative, polished visuals, and robust technical execution.',
		media: { kind: 'image', src: 'assets/img/projects/SJTidsresan.jpg' }
	},
	{
		title: 'FujiFilm',
		role: 'CTO, Lead Developer',
		tags: ['Unity', 'AR'],
		description:
			'I led the continued development of FujiFilm’s application by delivering new features, resolving legacy issues, ' +
			'and improving overall stability, usability, and product quality.',
		media: { kind: 'image', src: 'assets/img/projects/FujiFilm.jpg' }
	},
	{
		title: 'AlixLabs',
		role: 'CTO, Lead Developer',
		tags: ['Guided Tour', 'Unity'],
		description:
			'I led the creation of an immersive guided tour through the semiconductor process, visualising how ' +
			'microchips are manufactured step by step.',
		note: '*Environment and specific details cannot be shown due to NDA.',
		media: { kind: 'image', src: 'assets/img/projects/AlixLabs.jpg' }
	},
	{
		title: 'Atlant3D',
		role: 'CTO, Lead Developer',
		tags: ['Guided Tour', 'Unity'],
		description:
			'I directed an interactive guided tour of Atlant3D’s atomic-scale manufacturing, walking viewers ' +
			'through the complete microchip printing process.',
		note: '*Environment and specific details cannot be shown due to NDA.',
		media: { kind: 'image', src: 'assets/img/projects/Atlant3D.jpg' }
	},
	{
		title: 'Wind Turbine Repair',
		role: 'CTO, Lead Developer',
		tags: ['Guided Tour', 'VR'],
		description:
			'I developed an immersive guided tour demonstrating the step-by-step repair of a damaged wind ' +
			'turbine, turning a complex maintenance procedure into a clear visual walkthrough.',
		media: { kind: 'image', src: 'assets/img/projects/Wind Turbine Repair.jpg' }
	},
	{
		title: 'Volvo Stone Crusher',
		role: 'CTO, Lead Developer',
		tags: ['Volvo', 'Interactive'],
		description:
			'I built an interactive demonstration of Volvo’s new electric stone crusher and its eco mode, ' +
			'controlled through a virtual iPad that drives the machine in real time.',
		media: { kind: 'image', src: 'assets/img/projects/Volvo Stonecrusher.jpg' }
	},
	{
		title: 'TactoTek',
		role: 'CTO, Lead Developer',
		tags: ['Automotive', 'AR'],
		description:
			'I created an experience showcasing TactoTek’s smart surfaces inside a vehicle interior, ' +
			'highlighting their seamless, touch-sensitive technology.',
		media: { kind: 'image', src: 'assets/img/projects/TactoTek.jpg' }
	},
	{
		title: 'Car Showroom',
		role: 'CTO, Lead Developer',
		tags: ['Mixed Reality', 'Automotive'],
		description:
			'I designed a compact Mixed Reality platform for showcasing vehicles, letting customers explore ' +
			'cars virtually at full scale.',
		media: { kind: 'image', src: 'assets/img/projects/Car Showroom.jpg' }
	},
	{
		title: 'PC Emulator',
		role: 'Solo Developer',
		tags: ['Emulation', 'C/C++'],
		description:
			'Designed and implemented a complete virtual 500 MHz computer inside Unity, featuring a custom ' +
			'CPU, memory model, and runtime capable of executing C/C++ programs in real time. Engineered for ' +
			'live scripting, deterministic performance, and zero-allocation execution.',
		media: { kind: 'image', src: 'assets/img/projects/PC Emulator.jpg' }
	},
	{
		title: 'RISC-V Emulator',
		role: 'Solo Developer',
		tags: ['Emulation', 'RISC-V'],
		description:
			'I built a full RISC-V microprocessor emulator, faithfully reproducing the architecture’s ' +
			'instruction set and execution pipeline.',
		media: { kind: 'image', src: 'assets/img/projects/RISCV Emulator.jpg' }
	},
	{
		title: 'Mars Quest',
		role: 'CTO, Lead Developer',
		tags: ['VR'],
		description:
			'Mars Quest is a short but intense VR adventure where groups explore the planet Mars through ' +
			'interactive and challenging gameplay designed for both newcomers and experienced VR users. ' +
			'The experience was tested and approved by astronauts Marcos Pontes, Raja Chari, Nora Al Matrooshi, and Christer Fuglesang.',
		media: { kind: 'youtube', id: 'TOWI0ScpDSk' }
	},

	{
		title: 'Pop-In & Play — Space Journey',
		role: 'Lead Developer, 3D Content Creator',
		tags: ['AR', 'Unity'],
		description:
			'Pop-In & Play brings Christer Fuglesang’s Space Journey book to life through AR, turning the ' +
			'printed story into an interactive educational experience for children and families.',
		media: { kind: 'youtube', id: 'Fjn9oJV25qQ' },
		links: [
			{ store: 'play', url: 'https://play.google.com/store/apps/details?id=com.imitera' },
			{ store: 'app', url: 'https://apps.apple.com/se/app/pop-in-play/id1537075113' }
		]
	},
	{
		title: 'Magic Chess',
		role: 'Lead Developer',
		tags: ['AR', 'Unity', 'GDC', 'Networking'],
		description:
			'Magic Chess is a networked mixed-reality chess experience with multiple themed boards and pieces, ' +
			'showcased at GDC 2018 as an example of social AR gameplay.',
		media: { kind: 'youtube', id: 'z0SsKjW8gOc' },
		links: [
			{ store: 'play', url: 'https://play.google.com/store/apps/details?id=com.imitera.mrchess' },
			{ store: 'app', url: 'https://apps.apple.com/us/app/magic-chess-mr/id1443756289' }
		]
	},
	{
		title: 'Virtual Lego',
		role: 'Solo Developer, 3D Content Creator',
		tags: ['AR', 'Unity', 'Lego'],
		description:
			'Virtual Lego uses a 6DOF marker solution to let users build with digital LEGO bricks in AR, ' +
			'follow guided instructions, and save progress between sessions.',
		media: { kind: 'youtube', id: 'hGfI2FcKA2A' }
	},
	{
		title: 'Fleet of Steel',
		role: 'Lead Developer',
		tags: ['AR', 'Unity', 'Networking'],
		description:
			'Fleet of Steel reimagines the classic Battleship formula as a shared AR tabletop game with ' +
			'real-time multiplayer and cinematic battle presentation.',
		media: { kind: 'youtube', id: 'og2i9L5KLtY' }
	},
	{
		title: 'BikeAround',
		role: 'Solo Developer',
		tags: ['C++', 'OpenGL', 'Shaders', 'Networking'],
		description:
			'BikeAround combines Google Street View with custom bike hardware to create an interactive ' +
			'cycling simulator that links physical pedaling to immersive 360-degree navigation.',
		media: { kind: 'youtube', id: 'dM8lMxVKxNM' }
	},
	{
		title: 'My own scripting language',
		role: 'Solo Developer',
		tags: ['Parser', 'Virtual Machine', 'Byte Code', 'C#'],
		description:
			'I developed a custom scripting language with parser, bytecode VM, and tooling for code completion ' +
			'and error handling, plus optional script-to-C# translation for higher runtime performance.',
		media: { kind: 'image', src: 'assets/img/projects/BollLang.jpg' }
	},
	{
		title: 'Slipstream',
		role: 'Lead Developer',
		tags: ['VR', 'Unity'],
		description:
			'Slipstream is a VR experience collection built around a custom locomotion model that enables ' +
			'natural movement and stronger immersion than traditional teleport-based interaction.',
		media: { kind: 'youtube', id: 'p3LnKVI_y18' }
	},
	{
		title: 'Hallwylska',
		role: 'Lead Developer, 3D Content Creator',
		tags: ['VR', 'Unity', 'Photogrammetry'],
		description:
			'Hallwylska is a photogrammetry-based VR reconstruction of the Hallwyl Museum, designed to provide ' +
			'an accurate and accessible digital visit experience on standalone VR hardware.',
		media: { kind: 'youtube', id: '8L6H5o6dGRk' }
	},
	{
		title: 'Raytracers',
		role: 'Solo Developer',
		tags: ['C++', 'OpenGL', 'GLSL', 'Shaders'],
		description:
			'Raytracers is a graphics research project focused on custom ray tracing and ray casting techniques, ' +
			'including a full raycaster implemented in GLSL as part of my Master’s thesis work.',
		media: { kind: 'youtube', id: 'qCk8DNCnrvU' }
	},
	{
		title: 'Shader development',
		role: 'Solo Developer',
		tags: ['Unity', 'Shaders'],
		description:
			'I optimized and developed production shaders for Unity projects, improving visual quality and runtime ' +
			'performance, including AR reflection workflows for stronger scene integration.',
		media: { kind: 'youtube', id: 'hzsXPAK9sJA' }
	},
	{
		title: 'Twilight Imperium 4',
		role: 'Solo Developer',
		tags: ['AR', 'Unity'],
		description:
			'I built an AR setup assistant for Twilight Imperium 4 that streamlines map assembly, reduces setup ' +
			'time, and improves onboarding for new players.',
		media: { kind: 'youtube', id: '7197pnik900' }
	},
	{
		title: 'Fun projects',
		role: 'Lead Developer',
		tags: ['Unity', 'AR'],
		description:
			'A collection of rapid AR prototypes created to test new ideas, validate interaction concepts, ' +
			'and explore emerging technology directions outside core product work.',
		media: { kind: 'image', src: 'assets/img/projects/AR_Pistol_and_amour.jpg', href: 'assets/img/projects/AR_Pistol_and_amour.jpg' }
	},
	{
		title: 'Product Display — Actiste MR',
		role: 'Lead Developer',
		tags: ['AR', 'Unity'],
		description:
			'The Actiste Mixed Reality Demo shows the complete user flow: taking a blood sample, checking blood sugar, ' +
			'uploading data to the cloud, and receiving guidance on when to use insulin and how much to take.',
		media: { kind: 'youtube', id: 'R83UI7Wq8fk' },
		links: [
			{ store: 'play', url: 'https://play.google.com/store/apps/details?id=com.Brighter.ActisteAR' },
			{ store: 'app', url: 'https://itunes.apple.com/us/app/actiste-mr-demonstration/id1186806013?mt=8' }
		]
	},
	{
		title: 'Product Display — Bestic AR',
		role: 'Lead Developer',
		tags: ['AR', 'Unity'],
		description:
			'Bestic AR is an interactive product demonstration that presents true-to-scale device visualization ' +
			'and core functionality in mixed reality before physical hardware is available.',
		media: { kind: 'youtube', id: 'TtiKRi8Qf1I' },
		links: [
			{ store: 'play', url: 'https://play.google.com/store/apps/details?id=com.Brighter.jDomeAR&gl=SE' },
			{ store: 'app', url: 'https://apps.apple.com/us/app/camanio-mr-demonstration/id1153631603' }
		]
	},
	{
		title: 'UVR Nordic Architecture',
		role: 'Solo Developer',
		tags: ['C++', 'Intel RealSense'],
		description:
			'I developed a prototype AR platform for urban planning that enables architects to position, adjust, ' +
			'and evaluate building layouts directly in an interactive 3D context.',
		media: { kind: 'image', src: 'assets/img/projects/UVR.jpg' }
	},
	{
		title: 'Volvo Cars',
		role: 'Solo Developer',
		tags: ['C++', 'Neural Network', 'AI'],
		description:
			'I developed an image-recognition solution for paint durability testing that classifies stone-chip ' +
			'damage and generates objective, repeatable quality reports.',
		media: { kind: 'image', src: 'assets/img/projects/volvo.jpg', href: 'assets/img/projects/volvo.jpg' }
	},
	{
		title: 'jDome Tilt',
		role: 'Solo Developer',
		tags: ['C++', 'Intel RealSense'],
		description:
			'jDome Tilt integrates head-tracking with first-person gameplay so natural leaning and movement ' +
			'translate into real in-game control for a more immersive player experience.',
		media: { kind: 'youtube', id: 'AHN5mMZijTQ' }
	},
	{
		title: 'jDome Tilt Toolkit',
		role: 'Solo Developer',
		tags: ['C++', 'Intel RealSense'],
		description:
			'A reusable toolkit for adding head-movement controls to games, enabling independent look and ' +
			'movement behavior such as directional peeking and corner viewing.',
		media: { kind: 'youtube', id: '9kQ701404PA' }
	},
	{
		title: 'jDome Walkaround',
		role: 'Developer',
		tags: ['Unity', 'Kinect'],
		description:
			'jDome Walkaround is a body-tracked virtual mobility platform that lets users navigate digital ' +
			'environments through natural movement, including safe training and wellness scenarios.',
		media: { kind: 'youtube', id: 'aqDdf0WtFis' }
	}
];

/*
 * Slideshow highlights. One slide per image in assets/img/projects/.
 * Each slide: image on one side, { title, text, tags } on the other.
 */
window.SLIDES = [
	{
		file: 'SundsvalTimraAirport.jpg',
		title: 'Sundsvall–Timrå Airport',
		text: 'As CTO and Lead Developer I led the development of an immersive training experience for Sundsvall–Timrå Airport, covering aircraft marshalling and fire-extinguishing procedures in a safe, repeatable virtual environment.',
		tags: ['CTO', 'Lead Developer', 'Training', 'VR']
	},
	{
		file: 'FujiFilm.jpg',
		title: 'FujiFilm',
		text: 'As CTO and Lead Developer I led the continued development of FujiFilm’s application by delivering new features, resolving legacy issues, and improving overall stability, usability, and product quality.',
		tags: ['CTO', 'Lead Developer', 'Unity', 'AR']
	},
	{
		file: 'AlixLabs.jpg',
		title: 'AlixLabs',
		text: 'As CTO and Lead Developer I led the creation of an immersive guided tour through the semiconductor process, visualising how microchips are manufactured step by step.',
		tags: ['CTO', 'Lead Developer', 'Guided Tour', 'Unity'],
		note: '*Environment and specific details cannot be shown due to NDA.'
	},
	{
		file: 'Atlant3D.jpg',
		title: 'Atlant3D',
		text: 'As CTO and Lead Developer I directed an interactive guided tour of Atlant3D’s atomic-scale manufacturing, walking viewers through the complete microchip printing process.',
		tags: ['CTO', 'Lead Developer', 'Guided Tour', 'Unity'],
		note: '*Environment and specific details cannot be shown due to NDA.'
	},
	{
		file: 'Wind Turbine Repair.jpg',
		title: 'Wind Turbine Repair',
		text: 'As CTO and Lead Developer I developed an immersive guided tour demonstrating the step-by-step repair of a damaged wind turbine, turning a complex maintenance procedure into a clear visual walkthrough.',
		tags: ['CTO', 'Lead Developer', 'Guided Tour', 'VR']
	},
	{
		file: 'Volvo Stonecrusher.jpg',
		title: 'Volvo Stone Crusher',
		text: 'As CTO and Lead Developer I built an interactive demonstration of Volvo’s new electric stone crusher and its eco mode, controlled through a virtual iPad that drives the machine in real time.',
		tags: ['CTO', 'Lead Developer', 'Volvo', 'Interactive']
	},
	{
		file: 'TactoTek.jpg',
		title: 'TactoTek',
		text: 'As CTO and Lead Developer I created an experience showcasing TactoTek’s smart surfaces inside a vehicle interior, highlighting their seamless, touch-sensitive technology.',
		tags: ['CTO', 'Lead Developer', 'Automotive', 'AR']
	},
	{
		file: 'Car Showroom.jpg',
		title: 'Car Showroom',
		text: 'As CTO and Lead Developer I designed a compact Mixed Reality platform for showcasing vehicles, letting customers explore cars virtually at full scale.',
		tags: ['CTO', 'Lead Developer', 'Mixed Reality', 'Automotive']
	},
	{
		file: 'PC Emulator.jpg',
		title: 'PC Emulator',
		text: 'As solo developer I implemented a complete virtual 500 MHz computer inside Unity, fully programmable in C/C++ and emulating a working machine in real time.',
		tags: ['Solo Developer', 'Emulation', 'C/C++']
	},
	{
		file: 'RISCV Emulator.jpg',
		title: 'RISC-V Emulator',
		text: 'As solo developer I built a full RISC-V microprocessor emulator, faithfully reproducing the architecture’s instruction set and execution pipeline.',
		tags: ['Solo Developer', 'Emulation', 'RISC-V']
	}
];

/* Interests cards */
window.INTERESTS = [
	{ icon: 'code', title: 'Technical exploration', text: 'I invest time in personal software projects to evaluate new technologies, test ideas, and refine engineering practices.' },
	{ icon: 'rocket', title: 'Applied science', text: 'I follow developments in computer science, mathematics, and related research to stay current and broaden technical perspective.' },
	{ icon: 'plane', title: 'International perspective', text: 'Travel helps me understand different cultures and user contexts, which strengthens communication and product thinking.' },
	{ icon: 'heart', title: 'Family and balance', text: 'I value family life and long-term balance, which supports sustained focus, reliability, and high-quality work.' }
];

/* Skills, grouped */
window.SKILLS = [
	{
		group: 'Programming',
		items: ['C/C++', 'OpenGL', 'GLSL', 'Shaders', 'C#', 'Unity', 'Java', 'PHP', 'Web', 'SQL', 'Mathematica', 'Cinema 4D', '3D Modelling', 'Photoshop', 'Networking']
	},
	{
		group: 'Other skills',
		items: ['Constraint programming', 'AI', 'Neural networks', 'Problem solving', 'Optimization', 'Leadership', 'Project management', 'Creative', 'Meticulous']
	}
];
