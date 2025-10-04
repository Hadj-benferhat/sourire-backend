const wilayas = [
    "1-Adrar",
    "2-Chlef",
    "3-Laghouat",
    "4-Oum El Bouaghi",
    "5-Batna",
    "6-Béjaïa",
    "7-Biskra",
    "8-Béchar",
    "9-Blida",
    "10-Bouira",
    "11-Tamanrasset",
    "12-Tébessa",
    "13-Tlemcen",
    "14-Tiaret",
    "15-Tizi Ouzou",
    "16-Alger",
    "17-Djelfa",
    "18-Jijel",
    "19-Sétif",
    "20-Saida",
    "21-Skikda",
    "22-Sidi Bel Abbès",
    "23-Annaba",
    "24-Guelma",
    "25-Constantine",
    "26-Médéa",
    "27-Mostaganem",
    "28-M'Sila",
    "29-Mascara",
    "30-Ouargla",
    "31-Oran",
    "32-El Bayadh",
    "33-Illizi",
    "34-Bordj Bou Arréridj",
    "35-Boumerdès",
    "36-El Taref",
    "37-Tindouf",
    "38-Tissemsilt",
    "39-El Oued",
    "40-Khenchela",
    "41-Souk Ahras",
    "42-Tipaza",
    "43-Mila",
    "44-Aïn Defla",
    "45-Naâma",
    "46-Aïn Témouchent",
    "47-Ghardaïa",
    "48-Relizane",
    "49-El M'ghair",
    "50-El Menia",
    "51-Ouled Djellal",
    "52-Relizane",
    "53-Béni Abbès",
    "54-Timimoun",
    "55-Touggourt",
    "56-Djanet",
    "57-In Salah",
    "58-In Guezzam"
]

const Situations = [
    "Collégien/Lycéen",
    "Étudiant",
    "En activité",
    "En recherche d'emploi",
    "Retraité",
    "Employé",
    "Autre"
];

const donsTypes = [
    "Alimentation générale",
    "Médicaments",
    "Vêtements",
    "Outils scolaires"
]



const getAllWilayas = async (req,res) => {
    try {
        res.status(200).json(wilayas)
    } catch (error) {
        res.status(500).json({error})    
    }
}

const getAllSituations = async (req,res) => {
    try {
        res.status(200).json(Situations)
    } catch (error) {
        res.status(500).json({error})    
    }
}

const getAllDonTypes = async (req,res) => {
    try {
        res.status(200).json(donsTypes)
    } catch (error) {
        res.status(500).json({error})    
    }
}


module.exports = {
    getAllWilayas,
    getAllDonTypes,
    getAllSituations
};