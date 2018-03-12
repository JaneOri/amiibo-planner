/*
  Scale info for the current images.
  scale = 100 means the standard amiibo base will fit exactly in its container at img width = 100%
  scale = 385 means the standard amiibo base will fit exactly in its container at img width = 390% (guardian)

  left = 50 means that the center of the amiibo base is 50% from the left of the image.
  so left: 50% and transform: translateX(-50%) will center the image
  left = 43 (guardian) means that with left: 43% and transform: translateX(-50%) will center the image
*/

const getScaleInfo = function (id) {
  switch (id) {
    case 'FFFFFFFF-FFFFFFFF': return { scale: 100, left: 50 } // None - -none-
    case '00000000-00000000': return { scale: 100, left: 50 } // Placeholder - -any-
    case '00000000-00000002': return { scale: 129, left: 45 } // Mario - Super Smash Bros.
    case '00000000-00340102': return { scale: 100, left: 50 } // Mario - Super Mario Bros.
    case '00000000-003c0102': return { scale: 109, left: 46 } // Mario - Gold Edition - Super Mario Bros.
    case '00000000-003d0102': return { scale: 109, left: 46 } // Mario - Silver Editon - Super Mario Bros.
    case '00000000-02380602': return { scale: 135, left: 44 } // 8-Bit Mario Classic Color - 8-bit Mario
    case '00000000-02390602': return { scale: 135, left: 44 } // 8-Bit Mario Modern Color - 8-bit Mario
    case '00000000-03710102': return { scale: 115, left: 57 } // Mario - Wedding - Super Mario Bros.
    case '00000100-00190002': return { scale: 102, left: 50 } // Dr. Mario - Super Smash Bros.
    case '00010000-000c0002': return { scale: 100, left: 50 } // Luigi - Super Smash Bros.
    case '00010000-00350102': return { scale: 100, left: 50 } // Luigi - Super Mario Bros.
    case '00020000-00010002': return { scale: 118, left: 57 } // Peach - Super Smash Bros.
    case '00020000-00360102': return { scale: 100, left: 50 } // Peach - Super Mario Bros.
    case '00020000-03720102': return { scale: 110, left: 51 } // Peach - Wedding - Super Mario Bros.
    case '00030000-00020002': return { scale: 111, left: 53 } // Yoshi - Super Smash Bros.
    case '00030000-00370102': return { scale: 100, left: 50 } // Yoshi - Super Mario Bros.
    case '00030102-00410302': return { scale: 132, left: 53 } // Green Yarn Yoshi - Yoshi's Woolly World
    case '00030102-00420302': return { scale: 132, left: 53 } // Pink Yarn Yoshi - Yoshi's Woolly World
    case '00030102-00430302': return { scale: 132, left: 53 } // Light Blue Yarn Yoshi - Yoshi's Woolly World
    case '00030102-023e0302': return { scale: 270, left: 50 } // Mega Yarn Yoshi - Yoshi's Woolly World
    case '00040000-02620102': return { scale: 118, left: 50 } // Rosalina - Super Mario Bros.
    case '00040100-00130002': return { scale: 162, left: 45 } // Rosalina & Luma - Super Smash Bros.
    case '00050000-00140002': return { scale: 173, left: 68 } // Bowser - Super Smash Bros.
    case '00050000-00390102': return { scale: 170, left: 63 } // Bowser - Super Mario Bros.
    case '00050000-03730102': return { scale: 190, left: 32 } // Bowser - Wedding - Super Mario Bros.
    case '0005ff00-023a0702': return { scale: 180, left: 65 } // Hammer Slam Bowser - Skylanders
    case '00060000-00150002': return { scale: 110, left: 48 } // Bowser Jr. - Super Smash Bros.
    case '00070000-001a0002': return { scale: 133, left: 45 } // Wario - Super Smash Bros.
    case '00070000-02630102': return { scale: 143, left: 51 } // Wario - Super Mario Bros.
    case '00080000-00030002': return { scale: 169, left: 57 } // Donkey Kong - Super Smash Bros.
    case '00080000-02640102': return { scale: 153, left: 40 } // Donkey Kong - Super Mario Bros.
    case '0008ff00-023b0702': return { scale: 103, left: 50 } // Turbo Charge Donkey Kong - Skylanders
    case '00090000-000d0002': return { scale: 138, left: 38 } // Diddy Kong - Super Smash Bros.
    case '00090000-02650102': return { scale: 108, left: 53 } // Diddy Kong - Super Mario Bros.
    case '000a0000-00380102': return { scale: 100, left: 50 } // Toad - Super Mario Bros.
    case '00130000-02660102': return { scale: 100, left: 50 } // Daisy - Super Mario Bros.
    case '00140000-02670102': return { scale: 103, left: 52 } // Waluigi - Super Mario Bros.
    case '00170000-02680102': return { scale: 100, left: 50 } // Boo - Super Mario Bros.
    case '00800102-035d0302': return { scale: 200, left: 50 } // Poochy - Yoshi's Woolly World
    case '01000000-00040002': return { scale: 150, left: 61 } // Link - Super Smash Bros.
    case '01000000-034b0902': return { scale: 103, left: 50 } // Link - Ocarina of Time - Legend Of Zelda
    case '01000000-034c0902': return { scale: 100, left: 50 } // Link - Majora's Mask - Legend Of Zelda
    case '01000000-034d0902': return { scale: 120, left: 41 } // Link - Twilight Princess - Legend Of Zelda
    case '01000000-034e0902': return { scale: 140, left: 64 } // Link - Skyward Sword - Legend Of Zelda
    case '01000000-034f0902': return { scale: 113, left: 44 } // 8-Bit Link - Legend Of Zelda
    case '01000000-03530902': return { scale: 125, left: 63 } // Link (Archer) - Legend Of Zelda
    case '01000000-03540902': return { scale: 116, left: 47 } // Link (Rider) - Legend Of Zelda
    case '01000100-00160002': return { scale: 119, left: 49 } // Toon Link - Super Smash Bros.
    case '01000100-03500902': return { scale: 160, left: 80 } // Toon Link - The Wind Waker - Legend Of Zelda
    case '01010000-000e0002': return { scale: 105, left: 45 } // Zelda - Super Smash Bros.
    case '01010000-03520902': return { scale: 100, left: 50 } // Toon Zelda - The Wind Waker - Legend Of Zelda
    case '01010000-03560902': return { scale: 100, left: 50 } // Zelda - Legend Of Zelda
    case '01010100-00170002': return { scale: 100, left: 50 } // Sheik - Super Smash Bros.
    case '01020100-001b0002': return { scale: 152, left: 53 } // Ganondorf - Super Smash Bros.
    case '01030000-024f0902': return { scale: 180, left: 61 } // Midna & Wolf Link - Legend Of Zelda
    case '01050000-03580902': return { scale: 195, left: 45 } // Daruk - Legend Of Zelda
    case '01060000-03590902': return { scale: 161, left: 49 } // Urbosa - Legend Of Zelda
    case '01070000-035a0902': return { scale: 183, left: 39 } // Mipha - Legend Of Zelda
    case '01080000-035b0902': return { scale: 171, left: 42 } // Revali - Legend Of Zelda
    case '01400000-03550902': return { scale: 390, left: 43 } // Guardian - Legend Of Zelda
    case '01410000-035c0902': return { scale: 132, left: 47 } // Bokoblin - Legend Of Zelda
    case '01800000-00080002': return { scale: 100, left: 50 } // Villager - Super Smash Bros.
    case '01810000-024b0502': return { scale: 100, left: 50 } // Isabelle - Summer Outfit - Animal Crossing
    case '01810100-023f0502': return { scale: 100, left: 50 } // Isabelle - Animal Crossing
    case '01820000-02400502': return { scale: 100, left: 50 } // K. K. Slider - Animal Crossing
    case '01830000-02420502': return { scale: 100, left: 50 } // Tom Nook - Animal Crossing
    case '01840000-024d0502': return { scale: 100, left: 50 } // Timmy & Tommy - Animal Crossing
    case '01880000-02410502': return { scale: 100, left: 50 } // Mabel - Animal Crossing
    case '018a0000-02450502': return { scale: 100, left: 50 } // Reese - Animal Crossing
    case '018b0000-02460502': return { scale: 100, left: 50 } // Cyrus - Animal Crossing
    case '018c0000-02430502': return { scale: 100, left: 50 } // Digby - Animal Crossing
    case '018d0000-024c0502': return { scale: 100, left: 50 } // Rover - Animal Crossing
    case '018e0000-02490502': return { scale: 100, left: 50 } // Resetti - Animal Crossing
    case '01920000-02470502': return { scale: 100, left: 50 } // Blathers - Animal Crossing
    case '01930000-02480502': return { scale: 100, left: 50 } // Celeste - Animal Crossing
    case '01940000-024a0502': return { scale: 100, left: 50 } // Kicks - Animal Crossing
    case '01960000-024e0502': return { scale: 100, left: 50 } // Kapp'n - Animal Crossing
    case '01c10000-02440502': return { scale: 100, left: 50 } // Lottie - Animal Crossing
    case '05800000-00050002': return { scale: 131, left: 43 } // Fox - Super Smash Bros.
    case '05810000-001c0002': return { scale: 138, left: 69 } // Falco - Super Smash Bros.
    case '05c00000-00060002': return { scale: 114, left: 46 } // Samus - Super Smash Bros.
    case '05c00000-03651302': return { scale: 116, left: 51 } // Samus Aran - Metroid
    case '05c00100-001d0002': return { scale: 121, left: 51 } // Zero Suit Samus - Super Smash Bros.
    case '05c10000-03661302': return { scale: 168, left: 53 } // Metroid - Metroid
    case '06000000-00120002': return { scale: 145, left: 60 } // Captain Falcon - Super Smash Bros.
    case '06400100-001e0002': return { scale: 129, left: 64 } // Olimar - Super Smash Bros.
    case '06c00000-000f0002': return { scale: 110, left: 53 } // Little Mac - Super Smash Bros.
    case '07000000-00070002': return { scale: 150, left: 34 } // Wii Fit Trainer - Super Smash Bros.
    case '07400000-00100002': return { scale: 150, left: 65 } // Pit - Super Smash Bros.
    case '07410000-00200002': return { scale: 149, left: 54 } // Dark Pit - Super Smash Bros.
    case '07420000-001f0002': return { scale: 157, left: 47 } // Palutena - Super Smash Bros.
    case '07800000-002d0002': return { scale: 128, left: 35 } // Mr. Game & Watch - Super Smash Bros.
    case '07810000-002e0002': return { scale: 148, left: 64 } // R.O.B (Famicom) - Super Smash Bros.
    case '07810000-00330002': return { scale: 148, left: 64 } // R.O.B. (NES) - Super Smash Bros.
    case '07820000-002f0002': return { scale: 151, left: 47 } // Duck Hunt - Super Smash Bros.
    case '07c00000-00210002': return { scale: 100, left: 50 } // Mii Brawler - Super Smash Bros.
    case '07c00100-00220002': return { scale: 105, left: 50 } // Mii Swordfighter - Super Smash Bros.
    case '07c00200-00230002': return { scale: 108, left: 46 } // Mii Gunner - Super Smash Bros.
    case '08000100-003e0402': return { scale: 126, left: 47 } // Inkling Girl - Splatoon
    case '08000100-025f0402': return { scale: 126, left: 47 } // Inkling Girl (Lime Green) - Splatoon
    case '08000100-03690402': return { scale: 137, left: 56 } // Inkling Girl (Neon Pink) - Splatoon
    case '08000200-003f0402': return { scale: 107, left: 53 } // Inkling Boy - Splatoon
    case '08000200-02600402': return { scale: 108, left: 54 } // Inkling Boy (Purple) - Splatoon
    case '08000200-036a0402': return { scale: 127, left: 37 } // Inkling Boy (Neon Green) - Splatoon
    case '08000300-00400402': return { scale: 105, left: 52 } // Inkling Squid - Splatoon
    case '08000300-02610402': return { scale: 105, left: 52 } // Inkling Squid (Orange) - Splatoon
    case '08000300-036b0402': return { scale: 128, left: 46 } // Inkling Squid (Neon Purple) - Splatoon
    case '08010000-025d0402': return { scale: 100, left: 50 } // Callie - Splatoon
    case '08020000-025e0402': return { scale: 100, left: 50 } // Marie - Splatoon
    case '19060000-00240002': return { scale: 203, left: 41 } // Charizard - Super Smash Bros.
    case '19190000-00090002': return { scale: 123, left: 60 } // Pikachu - Super Smash Bros.
    case '19270000-00260002': return { scale: 111, left: 51 } // Jigglypuff - Super Smash Bros.
    case '19960000-023d0002': return { scale: 150, left: 76 } // Mewtwo - Super Smash Bros.
    case '1ac00000-00110002': return { scale: 112, left: 49 } // Lucario - Super Smash Bros.
    case '1b920000-00250002': return { scale: 174, left: 50 } // Greninja - Super Smash Bros.
    case '1f000000-000a0002': return { scale: 113, left: 46 } // Kirby - Super Smash Bros.
    case '1f000000-02540c02': return { scale: 120, left: 49 } // Kirby - Kirby
    case '1f010000-00270002': return { scale: 189, left: 50 } // Meta Knight - Super Smash Bros.
    case '1f010000-02550c02': return { scale: 172, left: 37 } // Meta Knight - Kirby
    case '1f020000-00280002': return { scale: 130, left: 44 } // King Dedede - Super Smash Bros.
    case '1f020000-02560c02': return { scale: 135, left: 42 } // King Dedede - Kirby
    case '1f030000-02570c02': return { scale: 114, left: 49 } // Waddle Dee - Kirby
    case '1f400000-035e1002': return { scale: 100, left: 50 } // Qbby - BoxBoy!
    case '21000000-000b0002': return { scale: 145, left: 27 } // Marth - Super Smash Bros.
    case '21010000-00180002': return { scale: 143, left: 45 } // Ike - Super Smash Bros.
    case '21020000-00290002': return { scale: 158, left: 62 } // Lucina - Super Smash Bros.
    case '21030000-002a0002': return { scale: 123, left: 39 } // Robin - Super Smash Bros.
    case '21040000-02520002': return { scale: 150, left: 44 } // Roy - Super Smash Bros.
    case '21050000-025a0002': return { scale: 129, left: 64 } // Corrin - Super Smash Bros.
    case '21050100-03630002': return { scale: 146, left: 63 } // Corrin (Player 2) - Super Smash Bros.
    case '21060000-03601202': return { scale: 170, left: 54 } // Alm - Fire Emblem
    case '21070000-03611202': return { scale: 161, left: 50 } // Celica - Fire Emblem
    case '21080000-036f1202': return { scale: 138, left: 49 } // Chrom - Fire Emblem
    case '21090000-03701202': return { scale: 150, left: 50 } // Tiki - Fire Emblem
    case '22400000-002b0002': return { scale: 121, left: 46 } // Shulk - Super Smash Bros.
    case '22800000-002c0002': return { scale: 100, left: 50 } // Ness - Super Smash Bros.
    case '22810000-02510002': return { scale: 104, left: 49 } // Lucas - Super Smash Bros.
    case '22c00000-003a0202': return { scale: 117, left: 46 } // Chibi Robo - Chibi-Robo!
    case '32000000-00300002': return { scale: 108, left: 52 } // Sonic - Super Smash Bros.
    case '32400000-025b0002': return { scale: 160, left: 48 } // Bayonetta - Super Smash Bros.
    case '32400100-03640002': return { scale: 160, left: 51 } // Bayonetta (Player 2) - Super Smash Bros.
    case '33400000-00320002': return { scale: 125, left: 44 } // Pac-Man - Super Smash Bros.
    case '34800000-00310002': return { scale: 108, left: 48 } // Mega Man - Super Smash Bros.
    case '34800000-02580002': return { scale: 108, left: 48 } // Mega Man (Gold Edition) - Super Smash Bros.
    case '34c00000-02530002': return { scale: 100, left: 50 } // Ryu - Super Smash Bros.
    case '35000100-02e10f02': return { scale: 245, left: 60 } // One-Eyed Rathalos and Rider (Male) - Monster Hunter
    case '35000200-02e20f02': return { scale: 211, left: 53 } // One-Eyed Rathalos and Rider (Female) - Monster Hunter
    case '35010000-02e30f02': return { scale: 100, left: 50 } // Nabiru - Monster Hunter
    case '35020100-02e40f02': return { scale: 208, left: 49 } // Rathian and Cheval - Monster Hunter
    case '35030100-02e50f02': return { scale: 196, left: 68 } // Barioth and Ayuria - Monster Hunter
    case '35040100-02e60f02': return { scale: 193, left: 30 } // Qurupeco and Dan - Monster Hunter
    case '35c00000-02500a02': return { scale: 111, left: 49 } // Shovel Knight - Shovel Knight
    case '36000000-02590002': return { scale: 132, left: 48 } // Cloud - Super Smash Bros.
    case '36000100-03620002': return { scale: 112, left: 47 } // Cloud (Player 2) - Super Smash Bros.
    case '06420000-035f1102': return { scale: 162, left: 46 } // Pikmin - Pikmin
    case '00150000-03670102': return { scale: 136, left: 50 } // Goomba - Super Mario Bros.
    case '00230000-03680102': return { scale: 136, left: 50 } // Koopa Troopa - Super Mario Bros.
    case '37400001-03741402': return { scale: 100, left: 50 } // Super Mario Cereal - Kellogs
  }
}

export default getScaleInfo
