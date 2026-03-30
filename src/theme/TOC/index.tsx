import React from 'react';
import Link from '@docusaurus/Link';
import styles from './styles.module.css';

interface Person {
  name: string;
  path: string;
  blurb: string;
}

const people: Person[] = [
  {
    name: "Danny Casolaro",
    path: "/epstein/Details/Danny_Casolaro",
    blurb: "Age 44. Told friends: \"If I'm found dead, don't believe suicide.\" Wrists slashed 12 times in hotel. Investigation briefcase vanished. Body embalmed before family notified.",
  },
  {
    name: "Gary Caradori",
    path: "/epstein/Details/Gary_Caradori",
    blurb: "Called his boss: \"We got them by the short hairs.\" Plane disintegrated mid-air that night. His 8-year-old son was also killed. Evidence never found.",
  },
  {
    name: "Fred Hampton",
    path: "/intel/Details/Fred_Hampton",
    blurb: "Age 21. Shot twice in the head while drugged and asleep in bed. FBI informant drew the floor plan. FBI mailed the coordinating agent a bonus.",
  },
  {
    name: "Karen Silkwood",
    path: "/intel/Details/Karen_Silkwood",
    blurb: "Age 28. Driving to meet a NYT reporter with proof of nuclear fraud. Car rammed off road. Documents vanished from wreckage. Jury awarded $10.5 million.",
  },
  {
    name: "Mark Middleton",
    path: "/epstein/Details/Mark_Middleton",
    blurb: "Age 59. Found hanging AND shot in chest with shotgun. Gun found 30 feet from body. Arranged Epstein's White House visits. Death photos sealed by judge.",
  },
  {
    name: "Arthur Shapiro",
    path: "/epstein/Details/Arthur_Shapiro",
    blurb: "Age 43. Wexner's lawyer shot point-blank in his BMW. Weeks later, Epstein took his job managing the billionaire's fortune. The murder that created Epstein. Unsolved.",
  },
  {
    name: "Jamal Khashoggi",
    path: "/intel/Details/Jamal_Khashoggi",
    blurb: "Age 59. Strangled inside Saudi consulate. Dismembered with a bone saw while the doctor listened to music on headphones. Body dissolved in acid. Never recovered.",
  },
  {
    name: "Virginia Giuffre",
    path: "/epstein/Details/Virginia_Giuffre",
    blurb: "Age 41. Epstein's most prominent accuser. Mother of three. Shot dead in rural Australia\u2014strictest gun laws on earth. $20 million in settlements missing.",
  },
  {
    name: "Dorothy Kilgallen",
    path: "/intel/Details/Dorothy_Kilgallen",
    blurb: "Age 52. Only journalist to privately interview Jack Ruby. Told friends she'd \"break the JFK case wide open.\" Found dead. Her investigation file vanished forever.",
  },
  {
    name: "Gary Webb",
    path: "/intel/Details/Gary_Webb",
    blurb: "Age 49. Two gunshots to the head, ruled suicide. Proved CIA flooded Black neighborhoods with crack cocaine. LA Times assigned 17 reporters to destroy him.",
  },
  {
    name: "Pat Tillman",
    path: "/intel/Details/Pat_Tillman",
    blurb: "Age 27. NFL star. Three bullets to forehead in tight grouping from 10 yards by his own unit. Body armor, uniform, and diary all burned.",
  },
  {
    name: "Frank Olson",
    path: "/intel/Details/Frank_Olson",
    blurb: "Age 43. CIA scientist pushed from 13th-floor hotel window after witnessing interrogation deaths. CIA manual: \"Best assassination is a fall of 75 feet or more.\"",
  },
  {
    name: "Daniel Anderl",
    path: "/epstein/Details/Daniel_Anderl",
    blurb: "Age 20. Shot opening his front door to a fake FedEx driver. His mother, a judge, had received the Epstein-Deutsche Bank case exactly four days earlier.",
  },
  {
    name: "Alexander Litvinenko",
    path: "/intel/Details/Alexander_Litvinenko",
    blurb: "Age 43. Polonium-210 slipped into his tea at a London hotel. Died over three agonizing weeks. Was investigating Putin's role in bombings that killed hundreds.",
  },
  {
    name: "Victor Jara",
    path: "/intel/Details/Victor_Jara",
    blurb: "Age 40. Chile's beloved singer. Soldiers crushed his fingers, threw him a guitar: \"Now sing.\" He sang. Then they machine-gunned him with 44 bullets.",
  },
  {
    name: "Patrice Lumumba",
    path: "/intel/Details/Patrice_Lumumba",
    blurb: "Age 35. Congo's first elected leader. CIA sent poison for his toothpaste. Executed, dissolved in acid. A Belgian officer kept his gold tooth for 38 years.",
  },
  {
    name: "Enrique Camarena",
    path: "/intel/Details/Enrique_Camarena",
    blurb: "Age 37. DEA agent. Tortured 30+ hours. Skull drilled with power tool. Doctor injected stimulants to keep him conscious. He'd discovered CIA-cartel drug flights.",
  },
  {
    name: "Mohsen Fakhrizadeh",
    path: "/intel/Details/Mohsen_Fakhrizadeh",
    blurb: "Age 62. First known robot assassination. AI-controlled machine gun with facial recognition fired 15 rounds via satellite. Wife sitting beside him was untouched.",
  },
  {
    name: "Georgi Markov",
    path: "/intel/Details/Georgi_Markov",
    blurb: "Age 49. Stabbed with a ricin-tipped umbrella on a London bridge. Platinum pellet smaller than a pinhead. Died three days later. It was the dictator's birthday gift.",
  },
  {
    name: "Mary Pinchot Meyer",
    path: "/intel/Details/Mary_Pinchot_Meyer",
    blurb: "Age 43. JFK's mistress. Two shots\u2014head and heart\u2014on Georgetown towpath. CIA chief was picking her lock before the news broke. Diary destroyed.",
  },
  {
    name: "Daphne Caruana Galizia",
    path: "/intel/Details/Daphne_Caruana_Galizia",
    blurb: "Age 53. Mother of three. Car bomb detonated by text message, 30 minutes after her last blog post. Her son ran through the burning wreckage.",
  },
  {
    name: "Thomas Bowers",
    path: "/epstein/Details/Thomas_Bowers",
    blurb: "Age 55. Head of Deutsche Bank wealth management. Oversaw Epstein's accounts at two banks. Found hanged at home. FBI had been seeking to interview him.",
  },
  {
    name: "Steve Biko",
    path: "/intel/Details/Steve_Biko",
    blurb: "Age 30. Beaten until brain-damaged in custody. Driven 740 miles naked and shackled. Doctors certified \"no abnormality.\" The 46th to die in apartheid detention.",
  },
  {
    name: "David Kelly",
    path: "/intel/Details/David_Kelly",
    blurb: "Age 59. Britain's top weapons inspector. Said Iraq WMD dossier was \"sexed up.\" Found dead in woods. Autopsy sealed until 2073. Paramedic: \"More blood at a nosebleed.\"",
  },
  {
    name: "Jean-Luc Brunel",
    path: "/epstein/Details/Jean_Luc_Brunel",
    blurb: "Age 75. Epstein's modeling agent. Tried to flip on Epstein with incriminating photos. Found hanged in his Paris prison cell at 1 AM. Same method as Epstein.",
  },
  {
    name: "Sergei Magnitsky",
    path: "/intel/Details/Sergei_Magnitsky",
    blurb: "Age 37. Exposed $230 million government fraud. Handcuffed and beaten with rubber batons for an hour. Lost 40 pounds in prison. His case created laws in 35 countries.",
  },
  {
    name: "Philip Marshall",
    path: "/intel/Details/Philip_Marshall",
    blurb: "Former CIA pilot. Writing a book naming officials. Found shot alongside his children, ages 14 and 17, and the family dog. Ruled murder-suicide. No note.",
  },
  {
    name: "Oscar Romero",
    path: "/intel/Details/Oscar_Romero",
    blurb: "Age 62. Archbishop shot through the heart while saying Mass. Ordered soldiers to stop killing. Six days later, snipers fired into his funeral, killing 40.",
  },
  {
    name: "Thomas Sankara",
    path: "/intel/Details/Thomas_Sankara",
    blurb: "Age 37. Africa's most beloved president. Earned $450/month. Vaccinated 2.5 million children. Told colleagues \"It's me they want\" and walked out to face gunmen.",
  },
  {
    name: "Alexei Navalny",
    path: "/intel/Details/Alexei_Navalny",
    blurb: "Age 47. Father of two. Already survived Novichok poisoning. Died in Arctic prison from exotic frog toxin. Tricked his FSB poisoner into confessing on a recorded call.",
  },
  {
    name: "Boris Nemtsov",
    path: "/intel/Details/Boris_Nemtsov",
    blurb: "Age 55. Shot four times within sight of the Kremlin. Every camera on Moscow's most surveilled bridge was \"under maintenance.\" Was proving Russian soldiers were in Ukraine.",
  },
  {
    name: "Kim Jong-nam",
    path: "/intel/Details/Kim_Jong_nam",
    blurb: "Age 45. VX nerve agent smeared on his face at an airport by two women told it was a prank show. Paid $100 each. He carried the antidote.",
  },
  {
    name: "Anna Politkovskaya",
    path: "/intel/Details/Anna_Politkovskaya",
    blurb: "Age 48. Shot four times in her elevator. Killed on Putin's birthday as a \"gift.\" The journalist investigating her murder was poisoned with polonium weeks later.",
  },
  {
    name: "Natacha Jaitt",
    path: "/epstein/Details/Natacha_Jaitt",
    blurb: "Age 41. Exposed child trafficking on Argentine national TV. Tweeted: \"I won't kill myself or drown in a bathtub. If it happens, it wasn't me.\" Found dead.",
  },
  {
    name: "Craig Spence",
    path: "/epstein/Details/Craig_Spence",
    blurb: "Age 49. Ran DC sexual blackmail ring wired by CIA. Arranged midnight White House tour with a 15-year-old boy. Found dead at the Ritz-Carlton before grand jury testimony.",
  },
  {
    name: "Orlando Letelier",
    path: "/intel/Details/Orlando_Letelier",
    blurb: "Age 44. Car bomb on Embassy Row, DC\u2014two miles from the White House. Both legs severed. Kissinger blocked a warning five days earlier.",
  },
  {
    name: "Aaron Swartz",
    path: "/epstein/Details/Aaron_Swartz",
    blurb: "Age 26. Reddit co-founder. Found hanged. MIT prosecuted him while secretly taking $850,000 from Epstein. His father: \"He was killed by the government.\"",
  },
  {
    name: "Michael Hastings",
    path: "/intel/Details/Michael_Hastings",
    blurb: "Age 33. Brought down a NATO commander. Car exploded at 4 AM, engine ejected 200 feet. Had emailed: \"I'm onto a big story.\" Was investigating the CIA director.",
  },
  {
    name: "Yevgeny Prigozhin",
    path: "/intel/Details/Yevgeny_Prigozhin",
    blurb: "Age 62. Led armed march on Moscow. Putin called it \"treason\" and promised \"inevitable punishment.\" Plane bombed at 28,000 feet exactly two months later.",
  },
  {
    name: "Gerald Bull",
    path: "/intel/Details/Gerald_Bull",
    blurb: "Age 62. World's greatest ballistics genius. Shot five times outside his apartment. $20,000 cash untouched. Was building a supergun for Saddam Hussein. Never solved.",
  },
  {
    name: "Dag Hammarskjold",
    path: "/intel/Details/Dag_Hammarskjold",
    blurb: "Age 56. UN Secretary-General. Plane crashed with ace of spades card tucked in his collar. NSA intercepted a pilot's radio reporting he opened fire.",
  },
  {
    name: "Che Guevara",
    path: "/intel/Details/Che_Guevara",
    blurb: "Age 39. Executed in a Bolivian schoolhouse. CIA operative relayed the kill order. Last words: \"Shoot, coward\u2014you are only going to kill a man.\" Hands amputated.",
  },
  {
    name: "Robert Maxwell",
    path: "/epstein/Details/Robert_Maxwell",
    blurb: "Age 68. Ghislaine's father. Fell from his yacht. Alleged triple agent for Mossad, MI6, and KGB. Six intelligence chiefs attended his funeral. Died before fraud exposed.",
  },
  {
    name: "Diana Spencer",
    path: "/epstein/Details/Diana_Spencer",
    blurb: "Age 36. Mother of William and Harry. Wrote a note predicting \"an accident in my car.\" All tunnel cameras offline that night. Inquest jury: \"unlawful killing.\"",
  },
  {
    name: "Jill Dando",
    path: "/epstein/Details/Jill_Dando",
    blurb: "Age 37. BBC presenter. Execution-style gunshot to the temple on her doorstep. Had compiled a BBC pedophile ring dossier years before Savile was exposed. Unsolved.",
  },
  {
    name: "Sabrina Bittencourt",
    path: "/epstein/Details/Sabrina_Bittencourt",
    blurb: "Age 38. Mother of three. Exposed \"John of God\" baby farms\u2014girls forced to birth babies sold for $50,000. Son posted: \"They killed my mother.\" No body found.",
  },
  {
    name: "Nancy Schaefer",
    path: "/epstein/Details/Nancy_Schaefer",
    blurb: "Age 73. Married 52 years. State senator exposing CPS child trafficking. Shot in the back while sleeping. Murder weapon untraceable. Days from completing a documentary.",
  },
  {
    name: "John Ashe",
    path: "/epstein/Details/John_Ashe",
    blurb: "Age 61. UN General Assembly president. Barbell crushed his throat bench pressing alone. Days from court testimony. The UN initially lied, calling it a \"heart attack.\"",
  },
  {
    name: "Daniel Pearl",
    path: "/intel/Details/Daniel_Pearl",
    blurb: "Age 38. Wall Street Journal reporter. Beheaded investigating ISI-Al Qaeda links. His kidnapper had ties to both MI6 and Pakistani intelligence. Wife six months pregnant.",
  },
  {
    name: "Jan Kuciak",
    path: "/intel/Details/Jan_Kuciak",
    blurb: "Age 27. Shot alongside his fiancee Martina, also 27, who had no connection to journalism. Was exposing Italian mafia infiltration of the Slovak government.",
  },
  {
    name: "Berta Caceres",
    path: "/intel/Details/Berta_Caceres",
    blurb: "Age 44. Goldman Prize winner. Defeated the world's largest dam builder to protect indigenous land. Shot at home two days before her birthday. Mastermind: a West Point grad.",
  },
  {
    name: "Mark Lombardi",
    path: "/intel/Details/Mark_Lombardi",
    blurb: "Age 48. Artist who hand-drew maps connecting CIA, Bush, and bin Laden. Found hanged. After 9/11, FBI visited the museum to study his diagrams. Hard drives vanished.",
  },
  {
    name: "Salvador Allende",
    path: "/intel/Details/Salvador_Allende",
    blurb: "Age 65. Democratically elected president of Chile. Nixon: \"Make the economy scream.\" Died defending his bombed palace during CIA-backed coup. Pinochet tortured 40,000.",
  },
  {
    name: "William Colby",
    path: "/intel/Details/William_Colby",
    blurb: "Age 76. CIA Director who gave Congress the agency's darkest secrets. Kissinger called him a \"psychopath.\" Found drowned. Left behind half-eaten dinner, computer running.",
  },
  {
    name: "Bill Cooper",
    path: "/intel/Details/Bill_Cooper",
    blurb: "Age 58. Predicted 9/11 by name on his radio show, 10 weeks before it happened. Said: \"They'll shoot me on my doorstep.\" Shot dead two months after 9/11.",
  },
  {
    name: "Steven Hoffenberg",
    path: "/epstein/Details/Steven_Hoffenberg",
    blurb: "Age 77. Epstein's early partner. Publicly confessed the honey-trap blackmail operation. Found decomposed, dead at least 7 days. Part of the 2022 death cluster.",
  },
  {
    name: "Ruslana Korshunova",
    path: "/epstein/Details/Ruslana_Korshunova",
    blurb: "Age 20. Model documented on Epstein's plane. Fell from 9th floor in Manhattan. No drugs, no note. Another model from the same group died identically a year later.",
  },
  {
    name: "Chester Bennington",
    path: "/epstein/Details/Chester_Bennington",
    blurb: "Age 41. Linkin Park frontman. Childhood sex abuse survivor. Found hanged on Chris Cornell's birthday\u2014exactly two months after Cornell died the same way.",
  },
  {
    name: "Anthony Bourdain",
    path: "/epstein/Details/Anthony_Bourdain",
    blurb: "Age 61. Found hanged in a French hotel. No drugs in his system. No warning signs. His closest friend: \"There were absolutely no signs.\" Mother confirmed the same.",
  },
  {
    name: "Philip Haney",
    path: "/epstein/Details/Philip_Haney",
    blurb: "Age 66. DHS officer who testified Obama ordered him to delete terrorist files. Found shot in a parking lot. Was engaged, planning a wedding. \"Never believe suicide.\"",
  },
  {
    name: "Serena Shim",
    path: "/intel/Details/Serena_Shim",
    blurb: "Age 29. Documented ISIS fighters in UN food trucks crossing Turkey's border. Turkish intelligence accused her of espionage. Head-on collision with cement mixer two days later.",
  },
  {
    name: "Tracy Twyman",
    path: "/epstein/Details/Tracy_Twyman",
    blurb: "Age 41. Continued Isaac Kappy's Epstein research after he died. Recorded dead man's switch video documenting threats. Found hanged one month before Epstein's arrest.",
  },
  {
    name: "Isaac Kappy",
    path: "/epstein/Details/Isaac_Kappy",
    blurb: "Age 42. Accused Hollywood figures of pedophilia. Claimed hacked Epstein files. Fell from Arizona bridge exactly 60 days before Epstein's arrest. \"If I die, it wasn't suicide.\"",
  },
  {
    name: "Vince Foster",
    path: "/epstein/Details/Vince_Foster",
    blurb: "Age 48. Clinton's deputy counsel. Shot in mouth at Fort Marcy Park. Files removed from office before investigators arrived. Wrote: \"Ruining people is considered sport.\"",
  },
  {
    name: "Nikolai Glushkov",
    path: "/intel/Details/Nikolai_Glushkov",
    blurb: "Age 68. Russian exile in London. Strangled from behind, staged as hanging. Forensics exposed the staging. Killed one week after the Skripal Novichok attack.",
  },
  {
    name: "Ravil Maganov",
    path: "/intel/Details/Ravil_Maganov",
    blurb: "Age 67. Chairman of Russia's largest private oil company. Called for ending the Ukraine war. Fell from 6th-floor hospital window. Eighth Russian energy exec to die that year.",
  },
  {
    name: "Andrew Breitbart",
    path: "/epstein/Details/Andrew_Breitbart",
    blurb: "Age 43. Tweeted about Podesta's \"underage sex slave op\" coverup. Collapsed walking near home. Body was bright red. Coroner's technician died of arsenic weeks later.",
  },
  {
    name: "Ngo Dinh Diem",
    path: "/intel/Details/Ngo_Dinh_Diem",
    blurb: "Age 62. South Vietnam's president. CIA funded the coup. Promised safe passage from a church, then bayoneted in an armored vehicle. JFK was killed 20 days later.",
  },
  {
    name: "Olof Palme",
    path: "/intel/Details/Olof_Palme",
    blurb: "Age 59. Swedish Prime Minister. Shot in the back walking home from a cinema. 34-year investigation, 10,000 interviews, 134 false confessions. Still unsolved.",
  },
  {
    name: "Seth Rich",
    path: "/epstein/Details/Seth_Rich",
    blurb: "Age 27. DNC staffer. Shot twice in the back at 4 AM walking home in DC. Nothing stolen\u2014wallet, watch, phone all left. Murder unsolved nearly a decade later.",
  },
  {
    name: "Chris Cornell",
    path: "/epstein/Details/Chris_Cornell",
    blurb: "Age 52. Soundgarden frontman. Found hanged after a concert in Detroit. Wife hired forensic pathologist who concluded investigation was prematurely closed.",
  },
  {
    name: "John Deroo",
    path: "/epstein/Details/John_Deroo",
    blurb: "Shot six times in the face. Killer Berry Kessler also murdered the man whose job Epstein took at Wexner's firm. Kessler proved Epstein's network used contract killers.",
  },
  {
    name: "Roy Den Hollander",
    path: "/epstein/Details/Roy_Den_Hollander",
    blurb: "Age 72. Former CIA/Kroll operative with Kremlin ties. Shot Judge Salas's son four days after she got the Epstein-Deutsche Bank case. Dead within 24 hours\u2014no interrogation.",
  },
  {
    name: "Deborah Jeane Palfrey",
    path: "/epstein/Details/Deborah_Jeane_Palfrey",
    blurb: "Age 52. The \"DC Madam\" whose records could expose Washington's powerful. Told her mother and lawyer she'd never kill herself. Found hanged before trial.",
  },
  {
    name: "Yuri Shchekochikhin",
    path: "/intel/Details/Yuri_Shchekochikhin",
    blurb: "Russian journalist. Skin peeled off, hair fell out, organs failed\u2014classic thallium poisoning. Medical records classified as state secret. Was investigating FSB corruption.",
  },
  {
    name: "Maxim Kuzminov",
    path: "/intel/Details/Maxim_Kuzminov",
    blurb: "Russian pilot who defected to Ukraine with a military helicopter. Shot and run over in Spain. Face deliberately disfigured to delay identification.",
  },
  {
    name: "Monica Petersen",
    path: "/epstein/Details/Monica_Petersen",
    blurb: "Age 32. Researcher investigating child trafficking in Haiti. Found dead, ruled suicide. Was connecting Clinton Foundation activities to trafficking networks. No details released.",
  },
  {
    name: "Trevor Moore",
    path: "/epstein/Details/Trevor_Moore",
    blurb: "Age 41. Comedian. Father of a young son. Used comedy to expose Epstein connections to millions on national TV. Fell from second-story balcony at 2:30 AM.",
  },
];

export default function TOC(): React.ReactElement {
  return (
    <div className={styles.sidebar}>
      <div className={styles.header}>The Dead</div>
      {people.map((person, i) => (
        <div key={i} className={styles.entry}>
          <Link className={styles.name} to={person.path}>
            {person.name}
          </Link>
          <p className={styles.blurb}>{person.blurb}</p>
        </div>
      ))}
      <div className={styles.count}>
        80 profiles from 250+ documented cases
      </div>
    </div>
  );
}
