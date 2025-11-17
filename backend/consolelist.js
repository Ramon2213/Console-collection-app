const allConsoles = [
    // ==========================
    // HOME CONSOLES
    // ==========================

    // ATARI ------------------------------------------------------------------------------------------------------------------------------------------------------
    {
        name: "Atari 2600",
        image: "/images/atari2600.png",
        year: 1977,
        type: "home",
        manufacturer: "Atari",
        colors: ["Woody", "Zwart"],
        controllerColors: ["joystick-zwart", "joystick-woody", "paddle-zwart", "keyboard-zwart"],
        sound: false, // Geen opstartgeluid of softwarematige jingle
        dimensions: { length: 34.5, width: 18.0, height: 8.0 } // cm
    },
    {
        name: "Atari 2600 Jr.",
        image: "/images/atari2600jr.png",
        year: 1986,
        type: "home",
        manufacturer: "Atari",
        colors: ["Zwart", "Zwart-Zilver", "Zwart-Zilver Early"],
        controllerColors: [],
        sound: false, // Geen softwarematige opstartgeluiden
        dimensions: { length: 23.0, width: 15.0, height: 4.0 } // cm
    },
    {
        name: "Atari 5200",
        image: "/images/atari5200.png",
        year: 1982,
        type: "home",
        manufacturer: "Atari",
        colors: ["Zwart", "Grijs"],
        controllerColors: [],
        sound: false, // Geen opstartgeluid of BIOS-jingle
        dimensions: { length: 38.0, width: 33.0, height: 10.0 } // cm
    },
    {
        name: "Atari 7800",
        image: "/images/atari7800.png",
        year: 1986,
        type: "home",
        manufacturer: "Atari",
        colors: ["Zwart", "Beige"],
        controllerColors: [],
        sound: false, // Geen opstartgeluid; toont enkel Atari-logo zonder audio
        dimensions: { length: 26.0, width: 17.0, height: 4.0 } // cm
    },
    {
        name: "Atari Jaguar",
        image: "/images/atarijaguar.png",
        year: 1993,
        type: "home",
        manufacturer: "Atari",
        colors: ["Zwart"],
        controllerColors: [],
        sound: true, // Heeft softwarematige opstartanimatie met geluid (Atari Jaguar logo)
        dimensions: { length: 33.0, width: 25.0, height: 7.0 } // cm
    },
    {
        name: "Atari Panther (Prototype)",
        image: "/images/ataripanther.png",
        year: 1990,
        type: "home",
        manufacturer: "Atari",
        colors: ["Zwart"],
        controllerColors: [],
        sound: false, // Console nooit uitgebracht, geen bevestigde opstartsoftware
        dimensions: { length: 38.1, width: 30.5, height: 12.7 } // Prototype, geen exacte afmetingen bekend
    },
    {
        name: "Atari Pong",
        image: "/images/ataripong.png",
        year: 1975,
        type: "home",
        manufacturer: "Atari",
        colors: ["Grijs", "Bruin", "SuperPong"],
        controllerColors: [],
        sound: false, // Geen opstartsoftware; directe game-uitvoer zonder jingle
        dimensions: { length: 28.0, width: 17.0, height: 8.0 } // cm
    },

// COLECO ------------------------------------------------------------------------------------------------------------------------------------------------------
{
        name: "Coleco Gemini",
        image: "/images/colecogemini.png",
        year: 1983,
        type: "home",
        manufacturer: "Coleco",
        colors: ["Grijs"],
        controllerColors: [],
        sound: false, // Atari 2600-compatible clone, geen software-opstartgeluid
        dimensions: { length: 30.0, width: 20.0, height: 6.0 } // cm
    },
    {
        name: "Coleco Vision",
        image: "/images/colecovision.png",
        year: 1982,
        type: "home",
        manufacturer: "Coleco",
        colors: ["Grijs", "Zwart"],
        controllerColors: [],
        sound: false, // Start direct in gamecartridge, geen BIOS-jingle
        dimensions: { length: 33.0, width: 24.0, height: 8.0 } // cm
    },

    // CBM ------------------------------------------------------------------------------------------------------------------------------------------------------
    {
        name: "Commodore 64",
        image: "/images/commodore64.png",
        year: 1982,
        type: "home",
        manufacturer: "CBM",
        colors: ["Beige"],
        controllerColors: [],
        sound: false, // Geen opstartgeluid, enkel stil BASIC-scherm
        dimensions: { length: 40.5, width: 21.0, height: 8.5 } // cm
    },

    // MATTEL ------------------------------------------------------------------------------------------------------------------------------------------------------
    {
        name: "Intellivision",
        image: "/images/intellivision.png",
        year: 1979,
        type: "home",
        manufacturer: "Mattel",
        colors: ["Grijs", "Blauw"],
        controllerColors: [],
        sound: false, // Geen software-opstartgeluid; start direct spel
        dimensions: { length: 33.0, width: 24.0, height: 7.0 } // cm
    },

    // SNK ------------------------------------------------------------------------------------------------------------------------------------------------------
    {
        name: "Neo Geo AES",
        image: "/images/neogeoaes.png",
        year: 1990,
        type: "home",
        manufacturer: "SNK",
        colors: ["Zwart"],
        controllerColors: [],
        sound: true, // BIOS-opstartgeluid (kenmerkende Neo-Geo-jingle)
        dimensions: { length: 33.5, width: 26.0, height: 6.5 } // cm
    },

    // MAGNAVOX ------------------------------------------------------------------------------------------------------------------------------------------------------
    {
        name: "Magnavox Odyssey",
        image: "/images/magnavoxodyssey.png",
        year: 1972,
        type: "home",
        manufacturer: "Magnavox",
        colors: ["Beige"],
        controllerColors: ["standard"],
        sound: false, // Geen geluid; puur analoge schakeling zonder software-jingle
        dimensions: { length: 42.0, width: 23.0, height: 9.0 } // cm
    },
    {
        name: "Magnavox Odyssey 2",
        image: "/images/magnavoxodyssey2.png",
        year: 1978,
        type: "home",
        manufacturer: "Magnavox",
        colors: ["zilver"],
        controllerColors: ["Zwart"],
        sound: false, // Start direct in BIOS-scherm zonder geluid
        dimensions: { length: 47.0, width: 25.0, height: 10.0 } // cm
    },


// NINTENDO ------------------------------------------------------------------------------------------------------------------------------------------------------
{
        name: "Color TV-Game",
        image: "/images/colortvgame.png",
        year: 1977,
        type: "home",
        manufacturer: "Nintendo",
        colors: ["6", "15"],
        controllerColors: [],
        sound: false, // Geen softwarematige opstartgeluiden, analoge circuits
        dimensions: { length: 26.0, width: 15.0, height: 8.0 } // cm
    },
    {
        name: "Color TV-Game Racing 112",
        image: "/images/comperttvgameracing.png",
        year: 1978,
        type: "home",
        manufacturer: "Nintendo",
        colors: [],
        controllerColors: [],
        sound: false, // Analoog systeem, geen softwarematige boot
        dimensions: { length: 34.0, width: 20.0, height: 9.0 } // cm
    },
    {
        name: "Color TV-Game Block Kuzushi",
        image: "/images/colortvgameblockkuzushi.png",
        year: 1979,
        type: "home",
        manufacturer: "Nintendo",
        colors: [],
        controllerColors: [],
        sound: false, // Geen opstartgeluid
        dimensions: { length: 30.0, width: 17.0, height: 8.0 } // cm
    },
    {
        name: "Computer TV-Game",
        image: "/images/computertvgame.png",
        year: 1980,
        type: "home",
        manufacturer: "Nintendo",
        colors: [],
        controllerColors: [],
        sound: false, // Geen boot software, direct game-uitvoer
        dimensions: { length: 33.0, width: 18.0, height: 9.0 } // cm
    },
    {
        name: "NES",
        image: "/images/nes.png",
        year: 1983,
        type: "home",
        manufacturer: "Nintendo",
        colors: ["Grijs", "Rood"],
        controllerColors: [],
        sound: false, // Geen BIOS-geluid of softwarematige opstartjingle
        dimensions: { length: 25.4, width: 20.3, height: 8.9 } // cm
    },
    {
        name: "SNES",
        image: "/images/snes.png",
        year: 1990,
        type: "home",
        manufacturer: "Nintendo",
        colors: ["Grijs", "Rood"],
        controllerColors: [],
        sound: false, // Geen bootjingle, start direct cartridge
        dimensions: { length: 20.0, width: 24.0, height: 7.0 } // cm
    },
    {
        name: "Famicom",
        image: "/images/famicom.png",
        year: 1983,
        type: "home",
        manufacturer: "Nintendo",
        colors: ["Rood/Wit"],
        controllerColors: [],
        sound: false, // Geen softwarematige opstartgeluid
        dimensions: { length: 26.0, width: 19.0, height: 7.3 } // cm
    },
    {
        name: "Virtual Boy",
        image: "/images/virtualboy.png",
        year: 1995,
        type: "home",
        manufacturer: "Nintendo",
        colors: ["Rood"],
        controllerColors: [],
        sound: false, // Geen opstartgeluid, start direct in spel of menu
        dimensions: { length: 25.5, width: 25.0, height: 20.0 } // cm (met standaard)
    },
    {
        name: "Nintendo 64",
        image: "/images/n64.png",
        year: 1996,
        type: "home",
        manufacturer: "Nintendo",
        colors: ["Grijs", "Zwart", "Paars"],
        controllerColors: [],
        sound: false, // Geen softwarematige bootjingle, enkel logo op scherm
        dimensions: { length: 26.0, width: 19.0, height: 7.3 } // cm
    },
    {
        name: "Nintendo GameCube",
        image: "/images/gamecube.png",
        year: 2001,
        type: "home",
        manufacturer: "Nintendo",
        colors: ["Paars", "Zwart", "Platinum"],
        controllerColors: [],
        sound: true, // Bekend GameCube-opstartgeluid met kubusanimatie
        dimensions: { length: 15.0, width: 15.0, height: 11.0 } // cm
    },
    {
        name: "Wii",
        image: "/images/wii.png",
        year: 2006,
        type: "home",
        manufacturer: "Nintendo",
        colors: ["Wit", "Zwart"],
        controllerColors: [],
        sound: true,
        dimensions: { length: 21.5, width: 15.7, height: 4.4 } // cm
    },
    {
        name: "Wii U",
        image: "/images/wiiu.png",
        year: 2012,
        type: "home",
        manufacturer: "Nintendo",
        colors: ["Wit", "Zwart"],
        controllerColors: [],
        sound: true, // Softwarematige opstartjingle bij logo-animatie
        dimensions: { length: 26.8, width: 17.2, height: 4.6 } // cm
    },
    {
        name: "Nintendo Switch",
        image: "/images/switch.png",
        year: 2017,
        type: "home",
        manufacturer: "Nintendo",
        colors: ["Grijs", "Neon Rood/Blauw", "Blauw/Neon Rood"],
        controllerColors: [],
        sound: true, // Softwarematige bootgeluid bij logo
        dimensions: { length: 23.9, width: 10.2, height: 1.4 } // cm (console zonder dock)
    },
    {
        name: "Nintendo Switch 2",
        image: "/images/switch2.png",
        year: 2025,
        type: "home",
        manufacturer: "Nintendo",
        colors: ["Grijs", "Neon Rood/Blauw"],
        controllerColors: [],
        sound: true, // Verwacht voortzetting van Switch-stijl bootjingle
        dimensions: { length: 26.0, width: 11.0, height: 1.5 } // cm (geschat, opvolger)
    },

// OUYA ------------------------------------------------------------------------------------------------------------------------------------------------------
{
        name: "Ouya",
        image: "/images/ouya.png",
        year: 2013,
        type: "home",
        manufacturer: "OUYA",
        colors: ["Wit"],
        controllerColors: [],
        sound: true, // Softwarematige boot-animatie met OUYA-geluid bij opstart
        dimensions: { length: 7.5, width: 7.5, height: 8.2 } // cm — zeer compacte kubusvormige behuizing
    },
 // SONY ------------------------------------------------------------------------------------------------------------------------------------------------------
    {
        name: "PlayStation",
        image: "/images/playstation.png",
        year: 1994,
        type: "home",
        manufacturer: "Sony",
        colors: ["Grijs"],
        controllerColors: [],
        sound: true,    
        dimensions: { length: 27.4, width: 18.8, height: 6.0 } // cm (PS1 originele model)
    },
    {
        name: "PlayStation 2",
        image: "/images/playstation2.png",
        year: 2000,
        type: "home",
        manufacturer: "Sony",
        colors: ["Zwart", "Blauw"],
        controllerColors: [],
        sound: true, // Heeft een kenmerkend opstartgeluid met het PS2-logo
        dimensions: { length: 30.1, width: 17.8, height: 7.8 } // cm (PS2 fat model)
    },
    {
        name: "PlayStation 3",
        image: "/images/ps3.png",
        year: 2006,
        type: "home",
        manufacturer: "Sony",
        colors: ["Zwart", "Rood", "Wit"],
        controllerColors: [],
        sound: true, // Heeft een opstartgeluid met het PS3-logo (vooral in vroege modellen/firmware)
        dimensions: { length: 32.5, width: 27.4, height: 9.8 } // cm (PS3 fat model)
    },
    {
        name: "PlayStation 4",
        image: "/images/ps4.webp",
        year: 2013,
        type: "home",
        manufacturer: "Sony",
        colors: ["Zwart", "Blauw", "Rood"],
        controllerColors: [],
        sound: true, // Geen specifieke boot jingle, enkel systeemgeluid bij inschakelen
        dimensions: { length: 27.5, width: 30.5, height: 5.3 } // cm (PS4 originele model)
    },
    {
        name: "PlayStation 5",
        image: "/images/ps5.png",
        year: 2020,
        type: "home",
        manufacturer: "Sony",
        colors: ["Wit/Blauw", "Zwart"],
        controllerColors: [],
        sound: true, // Geen aparte opstartjingle, enkel systeemgeluid bij inschakelen
        dimensions: { length: 39.0, width: 26.0, height: 10.4 } // cm (PS5 disc version)
    },

// SEGA ------------------------------------------------------------------------------------------------------------------------------------------------------
{
        name: "Sega Dreamcast",
        image: "/images/dreamcast.png",
        year: 1999,
        type: "home",
        manufacturer: "Sega",
        colors: ["Wit", "Blauw"],
        controllerColors: [],
        sound: true, // Bekende swirl-bootanimatie met geluid
        dimensions: { length: 19, width: 19, height: 7.5 }
    },
    {
        name: "Sega Genesis / Mega Drive",
        image: "/images/segagenesis.png",
        year: 1988,
        type: "home",
        manufacturer: "Sega",
        colors: ["Zwart", "Grijs"],
        controllerColors: [],
        sound: false, // Geen systeemgeluid of softwarematige boot
        dimensions: { length: 26, width: 21, height: 7.2 }
    },
    {
        name: "Sega Master System",
        image: "/images/segamastersystem.png",
        year: 1985,
        type: "home",
        manufacturer: "Sega",
        colors: ["Wit", "Zwart"],
        controllerColors: [],
        sound: false, // Geen bootgeluid
        dimensions: { length: 36, width: 17, height: 7.5 }
    },
    {
        name: "Sega Saturn",
        image: "/images/segasaturn.png",
        year: 1994,
        type: "home",
        manufacturer: "Sega",
        colors: ["Zwart", "Grijs"],
        controllerColors: [],
        sound: true, // Opstartlogo met kenmerkend SEGA-geluid
        dimensions: { length: 26, width: 23, height: 8.3 }
    },
    {
        name: "Sega SG-1000",
        image: "/images/segasg1000.png",
        year: 1983,
        type: "home",
        manufacturer: "Sega",
        colors: ["Zwart"],
        controllerColors: [],
        sound: false, // Geen systeemgeluid
        dimensions: { length: 28, width: 19, height: 7.5 }
    },

    // NEC ------------------------------------------------------------------------------------------------------------------------------------------------------
    {
        name: "Turbografx 16",
        image: "/images/turbografx16.png",
        year: 1989,
        type: "home",
        manufacturer: "NEC",
        colors: ["Zwart"],
        controllerColors: [],
        sound: true, // Bekende "HuCARD" intro bij sommige games, systeemgeluid bij CD-variant (PC Engine CD)
        dimensions: { length: 19, width: 14, height: 3.8 }
    },

    // MICROSOFT ------------------------------------------------------------------------------------------------------------------------------------------------------
    {
        name: "Xbox",
        image: "/images/xbox.png",
        year: 2001,
        type: "home",
        manufacturer: "Microsoft",
        colors: ["Zwart"],
        controllerColors: [],
        sound: true, // Groene Xbox-opstart met geluid
        dimensions: { length: 32, width: 26, height: 10 }
    },
    {
        name: "Xbox 360",
        image: "/images/xbox360.png",
        year: 2005,
        type: "home",
        manufacturer: "Microsoft",
        colors: ["Zwart", "Wit", "Chrome"],
        controllerColors: [],
        sound: true, // Opstartgeluid met Xbox-animatie
        dimensions: { length: 31, width: 26, height: 8.3 }
    },
    {
        name: "Xbox One",
        image: "/images/xboxone.png",
        year: 2013,
        type: "home",
        manufacturer: "Microsoft",
        colors: ["Zwart", "Wit"],
        controllerColors: [],
        sound: true, // Opstartgeluid + animatie
        dimensions: { length: 33.3, width: 27.4, height: 7.9 }
    },
    {
        name: "Xbox Series X",
        image: "/images/xboxsx.png",
        year: 2020,
        type: "home",
        manufacturer: "Microsoft",
        colors: ["Zwart", "Wit", "Galaxy"],
        controllerColors: [],
        sound: true, // Opstartgeluid bij logo, softwarematig
        dimensions: { length: 15.1, width: 15.1, height: 30.1 } // cm
    },
    {
        name: "Xbox Series S",
        image: "/images/xboxss.png",
        year: 2020,
        type: "home",
        manufacturer: "Microsoft",
        colors: ["Zwart", "Wit"],
        controllerColors: [],
        sound: true, // Opstartgeluid bij logo, softwarematig
        dimensions: { length: 27.5, width: 15.1, height: 6.5 } // cm
    },
























    // =================================================================================================================================================
    // HANDHELDS
    // =================================================================================================================================================



    // NINTENDO ------------------------------------------------------------------------------------------------------------------------------------------------------
    {
        name: "Game & Watch",
        image: "/images/gameandwatch.png",
        year: 1983,
        type: "handheld",
        manufacturer: "Nintendo",
        colors: ["Zwart", "Grijs", "Rood"],
        controllerColors: [],
        sound: false, // Geen softwarematige boot
        dimensions: { length: 11.5, width: 7.0, height: 1.7 }
    },
    {
        name: "Game Boy",
        image: "/images/gameboy.png",
        year: 1989,
        type: "handheld",
        manufacturer: "Nintendo",
        colors: ["Grijs", "Rood", "Groen"],
        controllerColors: [],
        sound: false, // Start direct in spelcartridge
        dimensions: { length: 14.5, width: 8.0, height: 3.0 }
    },
    {
        name: "Game Boy Advance",
        image: "/images/gba.png",
        year: 2001,
        type: "handheld",
        manufacturer: "Nintendo",
        colors: ["Paars", "Zilver", "Rood", "Blauw"],
        controllerColors: [],
        sound: false, // Geen boot-jingle, start direct
        dimensions: { length: 14.0, width: 8.0, height: 2.0 }
    },
    {
        name: "Game Boy Advance SP",
        image: "/images/sp.png",
        year: 2003,
        type: "handheld",
        manufacturer: "Nintendo",
        colors: ["Paars", "Zilver", "Rood", "Blauw"],
        controllerColors: [],
        sound: false, // Geen softwarematige boot
        dimensions: { length: 8.2, width: 8.0, height: 2.4 }
    },
    {
        name: "Game Boy Color",
        image: "/images/gameboycolor.png",
        year: 1998,
        type: "handheld",
        manufacturer: "Nintendo",
        colors: ["Paars", "Blauw", "Rood", "Groen", "Geel", "AtomicPurple"],
        controllerColors: [],
        sound: true, // Softwarematige opstartgeluid bij logo
        dimensions: { length: 14.8, width: 9.0, height: 3.2 }
    },
    {
        name: "Game Boy Micro",
        image: "/images/gameboymicro.png",
        year: 2005,
        type: "handheld",
        manufacturer: "Nintendo",
        colors: ["Zwart", "Rood", "Blauw", "Groen"],
        controllerColors: [],
        sound: false, // Start direct in spel
        dimensions: { length: 10.5, width: 5.3, height: 1.8 }
    },
    {
        name: "Game Boy Pocket",
        image: "/images/gameboypocket.png",
        year: 1996,
        type: "handheld",
        manufacturer: "Nintendo",
        colors: ["Grijs", "Zwart", "Rood", "Groen"],
        controllerColors: [],
        sound: false,
        dimensions: { length: 12.0, width: 6.5, height: 1.9 }
    },
    {
        name: "Nintendo 2DS",
        image: "/images/2ds.png",
        year: 2013,
        type: "handheld",
        manufacturer: "Nintendo",
        colors: ["Blauw", "Rood", "Zwart"],
        controllerColors: [],
        sound: true, // Bootgeluid bij systeemlogo
        dimensions: { length: 13.3, width: 7.3, height: 1.4 }
    },
    {
        name: "Nintendo 2DS XL",
        image: "/images/2dsxl.webp",
        year: 2017,
        type: "handheld",
        manufacturer: "Nintendo",
        colors: ["Blauw", "Zwart", "Rood"],
        controllerColors: [],
        sound: true,
        dimensions: { length: 16.2, width: 8.6, height: 1.5 }
    },
    {
        name: "Nintendo DS",
        image: "/images/nds.png",
        year: 2004,
        type: "handheld",
        manufacturer: "Nintendo",
        colors: ["Blauw", "Rood", "Zwart", "Wit"],
        controllerColors: [],
        sound: true, // Opstartgeluid bij systeemlogo
        dimensions: { length: 13.3, width: 7.4, height: 2.3 }
    },
    {
        name: "Nintendo DS Lite",
        image: "/images/ndslite.png",
        year: 2006,
        type: "handheld",
        manufacturer: "Nintendo",
        colors: ["Blauw", "Rood", "Zwart", "Wit", "Roze"],
        controllerColors: [],
        sound: true,
        dimensions: { length: 13.4, width: 7.4, height: 1.9 }
    },
    {
        name: "New Nintendo 3DS XL",
        image: "/images/3dsxl.png",
        year: 2014,
        type: "handheld",
        manufacturer: "Nintendo",
        colors: ["Zwart", "Blauw", "Rood", "Wit"],
        controllerColors: [],
        sound: true,
        dimensions: { length: 16.5, width: 9.3, height: 2.2 }
    },
    {
        name: "Nintendo Switch Lite",
        image: "/images/switchlite.png",
        year: 2019,
        type: "handheld",
        manufacturer: "Nintendo",
        colors: ["Geel", "Turkoois", "Grijs", "Koraal", "Blauw"],
        controllerColors: [],
        sound: true,
        dimensions: { length: 20.0, width: 9.1, height: 1.4 }
    },
    {
        name: "DSi XL",
        image: "/images/dsixl.png",
        year: 2009,
        type: "handheld",
        manufacturer: "Nintendo",
        colors: ["Blauw", "Rood"],
        controllerColors: [],
        sound: true,
        dimensions: { length: 16.5, width: 9.3, height: 2.3 }
    },
    {
        name: "Pocket Pikachu",
        image: "/images/pocketpikachu.webp",
        year: 2002,
        type: "handheld",
        manufacturer: "Nintendo",
        colors: ["Geel"],
        controllerColors: [],
        sound: false,
        dimensions: { length: 9.0, width: 6.0, height: 2.0 }
    },
    {
        name: "Pokemon Mini",
        image: "/images/pokemonmini.png",
        year: 2001,
        type: "handheld",
        manufacturer: "Nintendo",
        colors: ["Rood", "Blauw", "Geel"],
        controllerColors: [],
        sound: false,
        dimensions: { length: 10.0, width: 7.0, height: 1.5 }
    },


    // SONY ------------------------------------------------------------------------------------------------------------------------------------------------------
    {
        name: "PSP Go",
        image: "/images/pspgo.png",
        year: 2009,
        type: "handheld",
        manufacturer: "Sony",
        colors: ["Zwart"],
        controllerColors: [],
        sound: true, // Opstartgeluid/logo bij software
        dimensions: { length: 13.3, width: 6.8, height: 1.3 }
    },
    {
        name: "PlayStation Portable (PSP)",
        image: "/images/psp.png",
        year: 2004,
        type: "handheld",
        manufacturer: "Sony",
        colors: ["Zwart", "Wit", "Blauw"],
        controllerColors: [],
        sound: true, // Softwarematige boot-logo geluid
        dimensions: { length: 17.2, width: 7.4, height: 1.3 }
    },
    {
        name: "PlayStation Vita",
        image: "/images/psvita.png",
        year: 2011,
        type: "handheld",
        manufacturer: "Sony",
        colors: ["Blauw", "Zwart", "Wit"],
        controllerColors: [],
        sound: true, // Boot-logo met geluid
        dimensions: { length: 18.2, width: 8.2, height: 1.0 }
    },

    // STEAM ------------------------------------------------------------------------------------------------------------------------------------------------------
    {
        name: "Steam Deck",
        image: "/images/steamdeck.png",
        year: 2022,
        type: "handheld",
        manufacturer: "Valve",
        colors: ["Grijs"],
        controllerColors: [],
        sound: true, // Boot-logo met Valve-jingle
        dimensions: { length: 29.7, width: 11.7, height: 4.9 }
    },

    // TAPWAVE ------------------------------------------------------------------------------------------------------------------------------------------------------
    {
        name: "Tapwave Zodiac",
        image: "/images/tapwavezodiac.png",
        year: 2003,
        type: "handheld",
        manufacturer: "Tapwave",
        colors: ["Zwart"],
        controllerColors: [],
        sound: false, // Start direct in OS, geen bootjingle
        dimensions: { length: 13.0, width: 7.6, height: 1.6 }
    },

    // BANDAI ------------------------------------------------------------------------------------------------------------------------------------------------------
    {
        name: "WonderSwan",
        image: "/images/wonderswan.png",
        year: 1999,
        type: "handheld",
        manufacturer: "Bandai",
        colors: ["Grijs", "Blauw"],
        controllerColors: [],
        sound: false, // Geen softwarematige opstartgeluiden
        dimensions: { length: 13.0, width: 7.4, height: 2.0 }
    },

    // ATARI ------------------------------------------------------------------------------------------------------------------------------------------------------
    {
        name: "Atari Lynx",
        image: "/images/atarilynx.png",
        year: 1989,
        type: "handheld",
        manufacturer: "Atari",
        colors: ["Blauw", "Zwart"],
        controllerColors: [],
        sound: false, // Start direct in spel, geen opstartgeluid
        dimensions: { length: 22.0, width: 10.5, height: 3.8 }
    },

    // SNK ------------------------------------------------------------------------------------------------------------------------------------------------------
    {
        name: "Neo Geo Pocket",
        image: "/images/neogeopocket.png",
        year: 1998,
        type: "handheld",
        manufacturer: "SNK",
        colors: ["Zwart"],
        controllerColors: [],
        sound: false, // Start direct in spel, geen boot-logo geluid
        dimensions: { length: 11.5, width: 7.5, height: 2.3 }
    },
    {
        name: "Neo Geo Pocket Color",
        image: "/images/neogeopocketcolor.png",
        year: 1999,
        type: "handheld",
        manufacturer: "SNK",
        colors: ["Zwart"],
        controllerColors: [],
        sound: true, // Boot-logo met klein jingle-geluid
        dimensions: { length: 11.5, width: 7.5, height: 2.3 }
    },


];



allConsoles.sort((a, b) => a.year - b.year);// Sorteer automatisch op releasejaar (oud naar nieuw)

export default allConsoles;
