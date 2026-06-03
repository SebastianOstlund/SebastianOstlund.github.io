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
		tags: ['Interactive Experience', 'Train', 'History'],
		description:
			'I led the architecture and development of an interactive timeline experience for SJ, guiding users ' +
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
			'I implemented a complete virtual 500 MHz computer inside Unity, fully programmable in C/C++ and ' +
			'emulating a working machine in real time.',
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
		title: 'Pop-In & Play — Space Journey',
		role: 'Lead Developer, 3D Content Creator',
		tags: ['AR', 'Unity'],
		description:
			'Space Journey is a children’s book by Sweden’s first and only astronaut, Christer ' +
			'Fuglesang. By applying Mixed Reality to his book series, we bridge the gap between the ' +
			'physical and digital world. Using our AR app, the storybook comes to life with interactive characters.',
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
			'Play chess in Mixed Reality with a friend — choose from four sets: Classic, Medieval, ' +
			'Holographic and the magical Wizard Chess. We took it to GDC 2018, where we met Charlie Fink, ' +
			'who wrote a page about Magic Chess in his book “Metaverse — An AR Enabled Guide to AR & VR”.',
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
			'Our 6DOF Touchcard solution lets you build with virtual LEGO® bricks using only a business ' +
			'card. Pick a set or search the virtual toolbox, follow real building instructions, and save your ' +
			'models in our AR app to reload and continue later.',
		media: { kind: 'youtube', id: 'hGfI2FcKA2A' }
	},
	{
		title: 'Fleet of Steel',
		role: 'Lead Developer',
		tags: ['AR', 'Unity', 'Networking'],
		description:
			'A classic reimagined. Everyone has played Battleship — with AR we make it alive, fighting a ' +
			'war right on top of your kitchen table. The visuals are so good you almost hope the opponent ' +
			'sinks your ships, just to watch it happen.',
		media: { kind: 'youtube', id: 'og2i9L5KLtY' }
	},
	{
		title: 'BikeAround',
		role: 'Solo Developer',
		tags: ['C++', 'OpenGL', 'Shaders', 'Networking'],
		description:
			'BikeAround lets you experience the world through Google Street View. Handlebars and a pedalling ' +
			'unit capture the feeling of real cycling as the user explores imagery in a 360° view, deciding ' +
			'for themselves when to stop or keep going.',
		media: { kind: 'youtube', id: 'dM8lMxVKxNM' }
	},
	{
		title: 'My own scripting language',
		role: 'Solo Developer',
		tags: ['Parser', 'Virtual Machine', 'Byte Code', 'C#'],
		description:
			'A scripting language that lets you change code without redeploying or restarting the app. ' +
			'Scripting languages are often slow, so I added a “script → C#” translation unit, ' +
			'letting code run at native speed on rebuild. It includes code completion and error handling, and ' +
			'drops into Unity as a console or in-game computer screen.',
		media: { kind: 'image', src: 'assets/img/projects/BollLang.png' }
	},
	{
		title: 'Slipstream',
		role: 'Lead Developer',
		tags: ['VR', 'Unity'],
		description:
			'A virtual theme park at home — a collection of VR worlds explored through our unique ' +
			'“jaywalking” system, which lets users physically traverse the world in an immersive way ' +
			'instead of teleporting or other methods that break immersion.',
		media: { kind: 'youtube', id: 'p3LnKVI_y18' }
	},
	{
		title: 'Hallwylska',
		role: 'Lead Developer, 3D Content Creator',
		tags: ['VR', 'Unity', 'Photogrammetry'],
		description:
			'Enter the palatial winter home of Count Walther and Countess Wilhelmina von Hallwyl, built in ' +
			'1898. The VR experience is captured with photogrammetry to create a virtual copy of the museum, ' +
			'shown on an Oculus Quest.',
		media: { kind: 'youtube', id: '8L6H5o6dGRk' }
	},
	{
		title: 'Raytracers',
		role: 'Solo Developer',
		tags: ['C++', 'OpenGL', 'GLSL', 'Shaders'],
		description:
			'Ray tracing and ray casting have always fascinated me — more beautiful than rasterized graphics, ' +
			'both visually and mathematically. I’ve spent plenty of time developing my own techniques. ' +
			'The raycaster in the video is implemented in one single big shader, created for my Master’s thesis.',
		media: { kind: 'youtube', id: 'qCk8DNCnrvU' }
	},
	{
		title: 'Shader development',
		role: 'Solo Developer',
		tags: ['Unity', 'Shaders'],
		description:
			'Performance optimization matters in all game development. For most of our games I personally went ' +
			'through every shader for efficiency and quality, writing my own or improving existing ones. For ' +
			'one project I added AR reflection so virtual objects blend into the environment — it’s the small details that matter.',
		media: { kind: 'youtube', id: 'hzsXPAK9sJA' }
	},
	{
		title: 'Twilight Imperium 4',
		role: 'Solo Developer',
		tags: ['AR', 'Unity'],
		description:
			'Setting up tile-based board games can be slow. TI4 has near-identical tiles you must match using ' +
			'corner numbers and a lookup table. So I built an AR demo that sets up TI4 beginner maps — everyone ' +
			'loves it, especially the visuals near the end of the video.',
		media: { kind: 'youtube', id: '7197pnik900' }
	},
	{
		title: 'Fun projects',
		role: 'Lead Developer',
		tags: ['Unity', 'AR'],
		description:
			'Alongside serious work it’s important to test new things, follow your imagination into new ' +
			'areas — and most importantly, to have fun. P.S. wearing the silly-looking box was not fun!',
		media: { kind: 'image', src: 'assets/img/projects/AR_Pistol_and_amour.jpg', href: 'assets/img/projects/AR_Pistol_and_amour.jpg' }
	},
	{
		title: 'Product Display — Actiste MR',
		role: 'Lead Developer',
		tags: ['AR', 'Unity'],
		description:
			'Brighter needed to showcase their IoT insulin device, Actiste, before a finished product existed. ' +
			'Our app gives an interactive virtual experience with a real-life feel of the product and a complete demonstration of its functions.',
		media: { kind: 'youtube', id: 'Xv3Q5QKtEzI' },
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
			'Camanio Care needed to show the true size of their products without shipping a physical unit. We ' +
			'built the Camanio MR Demonstration, where you can interact with products virtually to get a feel ' +
			'for how they would work in real life.',
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
			'For UVR Nordic I built a prototype AR platform for city planning, letting architects freely move ' +
			'houses around and make modifications to their city plan.',
		media: { kind: 'image', src: 'assets/img/projects/UVR.jpg' }
	},
	{
		title: 'Volvo Cars',
		role: 'Solo Developer',
		tags: ['C++', 'Neural Network', 'AI'],
		description:
			'Car paint must resist stone chips, tested by firing stones at a painted plate and guesstimating ' +
			'the damage. I replaced the guesswork with image recognition that classifies damage size and ' +
			'produces an objective damage report.',
		media: { kind: 'image', src: 'assets/img/projects/volvo.png', href: 'assets/img/projects/volvo.png' }
	},
	{
		title: 'jDome Tilt',
		role: 'Solo Developer',
		tags: ['C++', 'Intel RealSense'],
		description:
			'New players to a first-person game instinctively lean to dodge or turn — which normally does ' +
			'nothing. With Intel® RealSense and jDome® TILT we let you “relearn” that instinct ' +
			'for a more active, immersive gaming experience.',
		media: { kind: 'youtube', id: 'AHN5mMZijTQ' }
	},
	{
		title: 'jDome Tilt Toolkit',
		role: 'Solo Developer',
		tags: ['C++', 'Intel RealSense'],
		description:
			'A set of functionalities for adding a head-movement system to your game. Head movement is ' +
			'separated from the character’s body, so you can look one way while moving another — and even look around corners.',
		media: { kind: 'youtube', id: '9kQ701404PA' }
	},
	{
		title: 'jDome Walkaround',
		role: 'Developer',
		tags: ['Unity', 'Kinect'],
		description:
			'The world’s first public portal to a virtual world where you use body movement to move in the ' +
			'environment. Elderly users can “take a walk” in a forest with minimised risk of falling, ' +
			'on a treadmill with protective handlebars.',
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
