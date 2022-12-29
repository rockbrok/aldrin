// REGEX Used to convert mission_name to URL string
// const removeParanthesis = data.mission_name.replace(/ *\([^)]*\) */g, '');
// const removeNonAlphaNumericExcept = removeParanthesis.replace(/[^a-z0-9 -]/gi, '');
// const removeSpace = removeNonAlphaNumericExcept.replace(/ +/g, '_');
// const removeHyphen = removeSpace.replace(/-+/g, '_');

export const LaunchMap = [
  { name: "Starlink_15", id: 109 },
  { name: "Sentinel_6_Michael_Freilich", id: 108 },
  { name: "Crew_1", id: 107 },
  { name: "GPS_III_SV04", id: 106 },
  { name: "Starlink_14", id: 105 },
  { name: "Starlink_13", id: 104 },
  { name: "Starlink_12", id: 103 },
  { name: "Starlink_11", id: 102 },
  { name: "SAOCOM_1B_GNOMES_1_Tyvak_0172", id: 101 },
  { name: "Starlink_10_SkySat_19_21", id: 100 },
  { name: "Starlink_9_BlackSky_Global_5_6", id: 99 },
  { name: "ANASIS_II", id: 98 },
  { name: "GPS_III_SV03", id: 97 },
  { name: "Starlink_8_SkySat_16_18", id: 96 },
  { name: "Starlink_7", id: 95 },
  { name: "CCtCap_Demo_Mission_2", id: 94 },
  { name: "Starlink_6", id: 93 },
  { name: "Starlink_5", id: 92 },
  { name: "CRS_20", id: 91 },
  { name: "Starlink_4", id: 90 },
  { name: "Starlink_3", id: 89 },
  { name: "Crew_Dragon_In_Flight_Abort_Test", id: 88 },
  { name: "Starlink_2", id: 87 },
  { name: "JCSat_18_Kacific_1", id: 86 },
  { name: "CRS_19", id: 85 },
  { name: "Starlink_1", id: 84 },
  { name: "Amos_17", id: 83 },
  { name: "CRS_18", id: 82 },
  { name: "STP_2", id: 81 },
  { name: "RADARSAT_Constellation", id: 80 },
  { name: "Starlink_v09", id: 79 },
  { name: "CRS_17", id: 78 },
  { name: "ArabSat_6A", id: 77 },
  { name: "CCtCap_Demo_Mission_1", id: 76 },
  { name: "Nusantara_Satu_S5_Beresheet", id: 75 },
  { name: "Starlink_2Iridium_NEXT_Mission_8", id: 74 },
  { name: "GPS_III_SV01", id: 73 },
  { name: "CRS_16", id: 72 },
  { name: "SSO_A", id: 71 },
  { name: "Eshail_2", id: 70 },
  { name: "SAOCOM_1A", id: 69 },
  { name: "Telstar_18V", id: 68 },
  { name: "Merah_Putih", id: 67 },
  { name: "Iridium_NEXT_Mission_7", id: 66 },
  { name: "Telstar_19V", id: 65 },
  { name: "CRS_15", id: 64 },
  { name: "SES_12", id: 63 },
  { name: "Iridium_NEXT_Mission_6", id: 62 },
  { name: "Bangabandhu_1", id: 61 },
  { name: "TESS", id: 60 },
  { name: "CRS_14", id: 59 },
  { name: "Iridium_NEXT_Mission_5", id: 58 },
  { name: "Hispasat_30W_6", id: 57 },
  { name: "Paz_Starlink_Demo", id: 56 },
  { name: "Falcon_Heavy_Test_Flight", id: 55 },
  { name: "SES_16_GovSat_1", id: 54 },
  { name: "ZUMA", id: 53 },
  { name: "Iridium_NEXT_Mission_4", id: 52 },
  { name: "CRS_13", id: 51 },
  { name: "KoreaSat_5A", id: 50 },
  { name: "SES_11_Echostar_105", id: 49 },
  { name: "Iridium_NEXT_Mission_3", id: 48 },
  { name: "Boeing_X_37B_OTV_5", id: 47 },
  { name: "FormoSat_5", id: 46 },
  { name: "CRS_12", id: 45 },
  { name: "Intelsat_35e", id: 44 },
  { name: "Iridium_NEXT_Mission_2", id: 43 },
  { name: "BulgariaSat_1", id: 42 },
  { name: "CRS_11", id: 41 },
  { name: "Inmarsat_5_F4", id: 40 },
  { name: "NROL_76", id: 39 },
  { name: "SES_10", id: 38 },
  { name: "EchoStar_23", id: 37 },
  { name: "CRS_10", id: 36 },
  { name: "Iridium_NEXT_Mission_1", id: 35 },
  { name: "Amos_6", id: 34 },
  { name: "JCSAT_16", id: 33 },
  { name: "CRS_9", id: 32 },
  { name: "ABS_2A_Eutelsat_117W_B", id: 31 },
  { name: "Thaicom_8", id: 30 },
  { name: "JCSAT_2B", id: 29 },
  { name: "CRS_8", id: 28 },
  { name: "SES_9", id: 27 },
  { name: "Jason_3", id: 26 },
  { name: "OG_2_Mission_2", id: 25 },
  { name: "CRS_7", id: 24 },
  { name: "Trkmenlem_52E_MonacoSAT", id: 23 },
  { name: "CRS_6", id: 22 },
  { name: "ABS_3A_Eutelsat_115W_B", id: 21 },
  { name: "DSCOVR", id: 20 },
  { name: "CRS_5", id: 19 },
  { name: "CRS_4", id: 18 },
  { name: "AsiaSat_6", id: 17 },
  { name: "AsiaSat_8", id: 16 },
  { name: "OG_2_Mission_1", id: 15 },
  { name: "CRS_3", id: 14 },
  { name: "Thaicom_6", id: 13 },
  { name: "SES_8", id: 12 },
  { name: "CASSIOPE", id: 11 },
  { name: "CRS_2", id: 10 },
  { name: "CRS_1", id: 9 },
  { name: "COTS_2", id: 8 },
  { name: "COTS_1", id: 7 },
  { name: "Falcon_9_Test_Flight", id: 6 },
  { name: "RazakSat", id: 5 },
  { name: "RatSat", id: 4 },
  { name: "Trailblazer", id: 3 },
  { name: "DemoSat", id: 2 },
  { name: "FalconSat", id: 1 }
]