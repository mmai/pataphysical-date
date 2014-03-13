/*
 *  PataphysicalDate.js  -- A javascript library which convert Gregorian dates to the Pataphysical Calendar
 *  Author:     Henri Bourcereau (henri AT bourcereau fr) 
 *  URL:         https://github.com/mmai/pataphysical-date
 */

(function(exports){

        PataphysicalDate = function(date){
            this.gregorian = typeof(date) !== 'undefined' ? date : new Date();
            var pDate = calculateDate(this.gregorian);

            this.year = pDate.year;
            this.month = pDate.month - 1;
            this.day = pDate.day;
        };  

        PataphysicalDate.prototype = {
            toString: function(){
                var day = this.day;
                if (this.day === 1) {
                    day = "1er";
                }
                return [this.getDayName(), day, this.getMonthName(), this.year].join(' ');
            },
            getFullYear: function(){
                return this.year;
            },
            getMonth: function(){
                return this.month;
            },
            getDay: function(){
                return this.day;
            },
            getDayName: function(){
                var days = ["Samedi", "Dimanche", "Lundi", "Mardi", "Mercredi", "Jeudi", "Vendredi"];

                var name = days[this.day % 7];
                if (this.day === 29) {
                    name = "Hunyadi";
                }

                return name;
            },
            getDayImportance: function(){
                var pmonth = pcalendar[this.month];
                return pmonth.days[this.day - 1].importance;
            },
            getMonthName: function(){
                var pmonth = pcalendar[this.month];
                return pmonth.month;
            }, 
            getSaintOfDay: function(){
                var pmonth = pcalendar[this.month];
                return pmonth.days[this.day - 1].saint;
            }
        };

        var calculateDate = function(date){
            var pDay, pMonth, pYear, pWeekDay;

            var gDay = date.getDate();
            var gMonth = date.getMonth()+1;
            var gYear = date.getFullYear();
            
            var ref;
            if ((gMonth > 9) || (gMonth==9 && gDay > 7)) {
                pYear = gYear - 1872;
                ref = new Date(gYear+"-09-08");
            } else {
                pYear = gYear - 1873;
                ref = new Date(gYear-1+"-09-08");
            }

            var days = dateDiff(date, ref); 

            var leapYear = isLeapYear(gYear);
            var leapDay = leapYear ? -1 : 0;

            if (leapYear && gMonth == 2 && gDay == 23) {
                pDay = 29;
                pMonth = Math.floor(days / 28);
            } else if ((gMonth == 2 && gDay > 23) || (gMonth > 2 && gMonth <7) || (gMonth == 7 && gDay < 13)) {
                pDay = (days + leapDay) % 28 + 1;
                pMonth = Math.floor((days + leapDay) / 28) + 1;
            } else if (gMonth == 7 && gDay == 13) {
                pDay = 29;
                pMonth = Math.floor(days / 28);
            } else if ((gMonth == 7 && gDay > 13) || (gMonth > 7 && gMonth < 9) || (gMonth == 9 && gDay < 8)) {
                pDay = (days + leapDay - 1) % 28 + 1;
                pMonth = Math.floor((days + leapDay - 1) / 28) + 1;
            } else {
                pDay = days % 28 + 1;
                pMonth = Math.floor(days / 28) + 1;
            }

            return {
                day: pDay,
                month: pMonth,
                year: pYear
            }

        };

        var isLeapYear = function (year){
            return dateDiff( new Date(year+"-12-31"), new Date(year+"-01-01")) == 365;
        }

        var dateDiff = function (date1, date2){
            date1 = Date.UTC(date1.getFullYear(), date1.getMonth(), date1.getDate());
            date2 = Date.UTC(date2.getFullYear(), date2.getMonth(), date2.getDate());
            var ms = Math.abs(date1-date2);
            return ms/1000/60/60/24;
        }

        var pcalendar = [
           { month:"Absolu",
               days:[
                   {importance:"fête suprême première première", saint:"NATIVITÉ d'ALFRED JARRY"},
                   {importance:"fête suprême quarte", saint:"St Ptyx, silentiaire (Abolition de)"},
                   {importance:"fête suprême quarte", saint:"St Phénix, solipsiste et St Hyx, factotum"},
                   {importance:"fête suprême quarte", saint:"St Lucien de Samosate, voyageur"},
                   {importance:"fête suprême quarte", saint:"St Bardamu, voyageur"},
                   {importance:"fête suprême quarte", saint:"Ste Vérola, assistante sociale"},
                   {importance:"fête suprême quarte", saint:"St Alambic, abstracteur"},
                   {importance:"fête suprême tierce", saint:"ABSINTHE, ci-devant *St Alfred"},
                   {importance:"fête suprême quarte", saint:"Descente du St Esprit (de Vin)"},
                   {importance:"vacuation", saint:"Dilution"},
                   {importance:"fête suprême quarte", saint:"Ste Purée, sportswoman"},
                   {importance:"vacuation", saint:"Vide"},
                   {importance:"fête suprême quarte", saint:"St Canterel, l'illuminateur"},
                   {importance:"fête suprême quarte", saint:"St Sophrotatos l'Arménien, pataphysicien"},
                   {importance:"fête suprême tierce", saint:"ÉTHERNITÉ"},
                   {importance:"fête suprême quarte", saint:"St Ibicrate le Géomètre, pataphysicien"},
                   {importance:"vacuation", saint:"Céphalorgie"},
                   {importance:"vacuation", saint:"Flûtes de Pan"},
                   {importance:"fête suprême quarte", saint:"Stes Grues, ophiophiles"},
                   {importance:"fête suprême quarte", saint:"Ste Mélusine, souillarde de cuisine"},
                   {importance:"fête suprême quarte", saint:"*St Venceslas, duc"},
                   {importance:"fête suprême seconde", saint:"EMMANUEL DIEU"},
                   {importance:"fête suprême quarte", saint:"Ste Varia-Miriam, amphibie"},
                   {importance:"fête suprême quarte", saint:"Sts Rakirs et Rastrons, porte-côtelettes"},
                   {importance:"fête suprême quarte", saint:"Nativité de Sa Magnificence Opach"},
                   {importance:"fête suprême quarte", saint:"St Joseb, notaire à la mode de Bretagne"},
                   {importance:"fête suprême quarte", saint:"Stes Gigolette et Gaufrette, dogaresses"},
                   {importance:"vacuation", saint:"Xylostomie"},
                   {importance:"vacuation", saint:"Le Jet Musical"}
               ]
           },
           { month:"Haha",
             days:[
                   {importance:"fête suprême seconde", saint:"L'ÂGE DU Dr FAUSTROLL"},
                   {importance:"fête suprême quarte", saint:"Dissolution d'E. Poe, dinomythurge"},
                   {importance:"fête suprême quarte", saint:"St Gibus, franc-maçon"},
                   {importance:"fête suprême quarte", saint:"Ste Berthe de Courrière, égérie"},
                   {importance:"fête suprême quarte", saint:"Ste Belgique, nourrice"},
                   {importance:"fête suprême quarte", saint:"Ste Tourte, lyrique et Ste Bévue, sociologue"},
                   {importance:"fête suprême quarte", saint:"St Prout, abbé"},
                   {importance:"fête suprême seconde", saint:"FÊTE DU HAHA"},
                   {importance:"vacuation", saint:"Tautologie"},
                   {importance:"fête suprême quarte", saint:"St Panmuphle, huissier"},
                   {importance:"fête suprême quarte", saint:"Sortie de St L. Cranach, apocalypticien"},
                   {importance:"fête suprême quarte", saint:"St Cosinus, savant"},
                   {importance:"fête suprême quarte", saint:"Bse Fenouillard, sainte famille"},
                   {importance:"fête suprême quarte", saint:"Exhibition de la Daromphe"},
                   {importance:"fête suprême tierce", saint:"NATIVITÉ DE L'OESTRE, artificier"},
                   {importance:"fête suprême quarte", saint:"Ste Vadrouille, emblème"},
                   {importance:"fête suprême quarte", saint:"St Homais d'Aquin, prudhomme"},
                   {importance:"fête suprême quarte", saint:"Nativité de Sa Magnificence le baron Mollet (*St Pipe)"},
                   {importance:"fête suprême quarte", saint:"*St Raphaël, apéritif et philistin"},
                   {importance:"fête suprême tierce", saint:"STRANGULATION DE BOSSE-DE-NAGE"},
                   {importance:"fête suprême tierce", saint:"ZIMZOUM DE BOSSE-DE-NAGE"},
                   {importance:"fête suprême seconde", saint:"RÉSURRECTION DE BOSSE-DE-NAGE"},
                   {importance:"fête suprême tierce", saint:"CHAPEAU DE BOSSE-DE-NAGE"},
                   {importance:"fête suprême quarte", saint:"St Cl. Terrasse, musicien des Phynances"},
                   {importance:"fête suprême quarte", saint:"St J.-P. Brisset, philologue, prince des penseurs"},
                   {importance:"fête suprême quarte", saint:"Commémoration du Cure-dent"},
                   {importance:"fête suprême première seconde", saint:"OCCULTATION D'ALFRED JARRY"},
                   {importance:"fête suprême quarte", saint:"Fuite d'Ablou"},
                   {importance:"vacuation", saint:"Marée Terrestre"}
               ]
           },
           { month:"As",
               days:[
                   {importance:"fête suprême tierce", saint:"NATIVITÉ DE PANTAGRUEL"},
                   {importance:"fête suprême quarte", saint:"Ste Rrose Sélavy, héroïne"},
                   {importance:"fête suprême quarte", saint:"Couronnement de Lord Patchogue, miroitier"},
                   {importance:"fête suprême quarte", saint:"St Cravan, boxeur"},
                   {importance:"fête suprême quarte", saint:"St Van Meegeren, faussaire"},
                   {importance:"fête suprême quarte", saint:"St Omnibus, satyre"},
                   {importance:"fête suprême quarte", saint:"St Cyrano de Bergerac, explorateur"},
                   {importance:"fête suprême tierce", saint:"St RIMBE, OISIF"},
                   {importance:"vacuation", saint:"Équarrissage pour tous"},
                   {importance:"fête suprême quarte", saint:"St Abstrait, bourreau"},
                   {importance:"fête suprême quarte", saint:"St Ossian, barde postiche"},
                   {importance:"fête suprême tierce", saint:"DISPUTE DU SIGNE + ET DU SIGNE -"},
                   {importance:"fête suprême tierce", saint:"MOUSTACHES DU Dr FAUSTROLL"},
                   {importance:"fête suprême quarte", saint:"St P. Bonnard, peintre des Phynances"},
                   {importance:"fête suprême première seconde", saint:"NAVIGATION DU Dr FAUSTROLL"},
                   {importance:"fête suprême quarte", saint:"St Cap, captain"},
                   {importance:"fête suprême quarte", saint:"St Pangloss, humoriste passif"},
                   {importance:"fête suprême quarte", saint:"St Chambernac, pauvriseur"},
                   {importance:"fête suprême quarte", saint:"St Courtial des Péreires, aérostier et inventeur"},
                   {importance:"fête suprême quarte", saint:"St Olibrius, augure"},
                   {importance:"fête suprême quarte", saint:"St Possible, schizophrène"},
                   {importance:"fête suprême seconde", saint:"St LAUTRÉAMONT"},
                   {importance:"fête suprême quarte", saint:"St Quincey, critique d'art"},
                   {importance:"fête suprême quarte", saint:"St Berbiguier, martyr"},
                   {importance:"fête suprême quarte", saint:"St Lewis Carroll, professeur"},
                   {importance:"fête suprême quarte", saint:"St Mensonger, évêque"},
                   {importance:"fête suprême quarte", saint:"Ste Visité, fille du précédent"},
                   {importance:"fête suprême quarte", saint:"Nativité de St Swift, chanoine"},
                   {importance:"vacuation", saint:"Traversée du Miroir"}
               ]
           },
           { month:"Sable",
            days:[
                   {importance:"fête suprême tierce", saint:"NOCES DE BALKIS ET DE SALOMON"},
                   {importance:"fête suprême quarte", saint:"St Doublemain, idéologue"},
                   {importance:"fête suprême quarte", saint:"St Phlegmon, doctrinaire"},
                   {importance:"fête suprême quarte", saint:"*Ste Barbe (femme à), femme-canon"},
                   {importance:"fête suprême quarte", saint:"Ste Savate, avocate"},
                   {importance:"fête suprême quarte", saint:"St Navet et Ste Perruque, humanistes"},
                   {importance:"fête suprême quarte", saint:"St Birbe, juge"},
                   {importance:"fête suprême seconde", saint:"CONCEPTION DU P. UBU (A. J.)"},
                   {importance:"fête suprême quarte", saint:"St Sagouin, homme d'État"},
                   {importance:"fête suprême première seconde", saint:"EXALTATION D'UBU ROI (Ubu d'hiver)"},
                   {importance:"fête suprême quarte", saint:"Nativité de St Grabbe, scherziste"},
                   {importance:"fête suprême quarte", saint:"Ste Choupe, mère de famille"},
                   {importance:"fête suprême quarte", saint:"*St Flaive, concierge"},
                   {importance:"fête suprême quarte", saint:"Don Quichotte, champion du monde"},
                   {importance:"fête suprême seconde", saint:"KHURMOOKUM DU Dr FAUSTROLL"},
                   {importance:"fête suprême quarte", saint:"St Nul, exempt"},
                   {importance:"fête suprême quarte", saint:"St Moyen, français"},
                   {importance:"fête suprême quarte", saint:"Ste Lurette, joconde"},
                   {importance:"fête suprême tierce", saint:"GRAVIDITÉ DE MÈRE UBU"},
                   {importance:"fête suprême quarte", saint:"St Sabre, allopathe"},
                   {importance:"fête suprême quarte", saint:"Ste Tape, pompette"},
                   {importance:"fête suprême première seconde", saint:"CÉSAR - ANTECHRIST"},
                   {importance:"fête suprême quarte", saint:"*Ste Viole, vierge et martyre"},
                   {importance:"fête suprême quarte", saint:"Ste Pochetée, gouvernante"},
                   {importance:"fête suprême tierce", saint:"NATIVITÉ DE L'ARCHÉOPTÉRYX"},
                   {importance:"fête suprême quarte", saint:"Monsieur Sisyphe"},
                   {importance:"fête suprême quarte", saint:"St Tic, conjoint"},
                   {importance:"fête suprême quarte", saint:"St Cervelas, penseur"},
                   {importance:"vacuation", saint:"Aleph"}
               ]                   
           },
           {
               month:"Décervelage",
            days:[
                   {importance:"fête suprême tierce", saint:"St ALAODINE, virtuose"},
                   {importance:"fête suprême quarte", saint:"Sts Hassassins, praticiens"},
                   {importance:"vacuation", saint:"Astu"},
                   {importance:"fête suprême première seconde", saint:"DÉCERVELAGE"},
                   {importance:"fête suprême quarte", saint:"Sts Giron, Pile et Cotice, palotins"},
                   {importance:"fête suprême quarte", saint:"Sts Polonais, prolétaires"},
                   {importance:"fête suprême quarte", saint:"Sts Forçats, poliorcètes"},
                   {importance:"fête suprême tierce", saint:"St BORDURE, CAPITAINE"},
                   {importance:"fête suprême quarte", saint:"Dormition de Jacques Vaché, interprète"},
                   {importance:"vacuation", saint:"Drapaud (érection du)"},
                   {importance:"fête suprême quarte", saint:"*St Eustache, libérateur"},
                   {importance:"fête suprême quarte", saint:"St Landru, gynécologue"},
                   {importance:"fête suprême quarte", saint:"St Guillotin, médecin"},
                   {importance:"fête suprême quarte", saint:"Sts 4 Sans-Cou, enchanteurs"},
                   {importance:"fête suprême tierce", saint:"CONSCIENCE D'UBU"},
                   {importance:"fête suprême quarte", saint:"St Mauvais, sujet"},
                   {importance:"fête suprême quarte", saint:"St Mandrin, poète et philosophe"},
                   {importance:"fête suprême quarte", saint:"Sts Pirates et Flibustiers, thaumaturges"},
                   {importance:"fête suprême quarte", saint:"St et Ste Cartouche, vétérinaires"},
                   {importance:"fête suprême quarte", saint:"St Outlaw, aristocrate"},
                   {importance:"fête suprême première seconde", saint:"CHAIRE DU Dr FAUSTROLL"},
                   {importance:"fête suprême seconde", saint:"OSTENTION DU BÂTON À PHYSIQUE"},
                   {importance:"fête suprême quarte", saint:"St Tank, animal"},
                   {importance:"fête suprême quarte", saint:"St Weidman, patriarche"},
                   {importance:"fête suprême quarte", saint:"St Petiot, expert"},
                   {importance:"vacuation", saint:"Escrime"},
                   {importance:"fête suprême quarte", saint:"Sts Chemins de fer, assassins"},
                   {importance:"vacuation", saint:"Repopulation"},
                   {importance:"vacuation", saint:"Lit de Procruste"}
               ]                   
           },
           {
               month:"Gueules",
            days:[
                   {importance:"fête suprême tierce", saint:"DÉPUCELAGE DE MÈRE UBU"},
                   {importance:"fête suprême quarte", saint:"St Sigisbée, eunuque"},
                   {importance:"fête suprême quarte", saint:"St Anthropoïde, policier"},
                   {importance:"fête suprême quarte", saint:"*Ste Goule ou Gudule, institutrice"},
                   {importance:"fête suprême quarte", saint:"Ste Gale, abbesse"},
                   {importance:"fête suprême quarte", saint:"Ste Touche, postulante"},
                   {importance:"fête suprême quarte", saint:"St Gueule, abbé"},
                   {importance:"fête suprême tierce", saint:"FÊTE DE LA CHANDELLE VERTE"},
                   {importance:"fête suprême quarte", saint:"Ste Crêpe, laïque"},
                   {importance:"fête suprême quarte", saint:"St Préservatif, bedeau"},
                   {importance:"fête suprême quarte", saint:"St Baobab, célibataire"},
                   {importance:"fête suprême quarte", saint:"St Membre, compilateur"},
                   {importance:"vacuation", saint:"Copulation"},
                   {importance:"fête suprême quarte", saint:"Nativité de St J. Verne, globe-trotter en chambre"},
                   {importance:"fête suprême tierce", saint:"ALICE AU PAYS DES MERVEILLES"},
                   {importance:"fête suprême quarte", saint:"St Münchhausen, baron"},
                   {importance:"fête suprême quarte", saint:"Le Bétrou, théurge"},
                   {importance:"fête suprême quarte", saint:"Nativité de St Deibler, prestidigitateur"},
                   {importance:"fête suprême quarte", saint:"St Sade ès liens"},
                   {importance:"fête suprême quarte", saint:"St Lafleur, valet"},
                   {importance:"vacuation", saint:"Lavement"},
                   {importance:"fête suprême première seconde", saint:"St SEXE, STYLITE"},
                   {importance:"fête suprême quarte", saint:"Occultation de St J. Torma, euphoriste"},
                   {importance:"fête suprême quarte", saint:"Conversion de St Matorel, bateleur"},
                   {importance:"fête suprême quarte", saint:"Ste Marmelade, inspirée"},
                   {importance:"fête suprême tierce", saint:"L'AMOUR ABSOLU, deliquium"},
                   {importance:"fête suprême quarte", saint:"Ste Tabagie, cosmogène"},
                   {importance:"fête suprême quarte", saint:"Sts Hylactor et Pamphagus"},
                   {importance:"vacuation", saint:"Mouvement Perpétuel"}
               ]                   
           },
           {
               month:"Pédale",
               days:[
                   {importance:"fête suprême tierce", saint:"DU SURMÂLE"},
                   {importance:"fête suprême quarte", saint:"St André Marcueil, ascète cycliste"},
                   {importance:"fête suprême quarte", saint:"St Ellen, hile"},
                   {importance:"fête suprême quarte", saint:"St Michet, idéaliste"},
                   {importance:"fête suprême quarte", saint:"St Ouducul, trouvère"},
                   {importance:"fête suprême quarte", saint:"Vers Belges"},
                   {importance:"fête suprême quarte", saint:"St Gavroche, forain"},
                   {importance:"fête suprême tierce", saint:"LA MACHINE À INSPIRER L'AMOUR"},
                   {importance:"fête suprême quarte", saint:"*St Remezy, évêque in partibus"},
                   {importance:"fête suprême quarte", saint:"Nativité de St Tancrède, jeune homme"},
                   {importance:"fête suprême quarte", saint:"Testament de P. Uccello, le mal illuminé"},
                   {importance:"fête suprême quarte", saint:"St Hari Seldon, psychohistorien galactique"},
                   {importance:"fête suprême quarte", saint:"*Ste Valburge, succube"},
                   {importance:"vacuation", saint:"Sabbat"},
                   {importance:"fête suprême tierce", saint:"Sts ADELPHES, ÉSOTÉRISTES"},
                   {importance:"fête suprême quarte", saint:"Sts Templiers, adeptes"},
                   {importance:"fête suprême quarte", saint:"St Dricarpe, prosélyte"},
                   {importance:"fête suprême quarte", saint:"St Nosocome, carabin"},
                   {importance:"fête suprême quarte", saint:"Ste Goutte, fête militaire"},
                   {importance:"fête suprême quarte", saint:"Ste Cuisse, dame patronnesse"},
                   {importance:"fête suprême quarte", saint:"St Inscrit, Converti"},
                   {importance:"fête suprême seconde", saint:"St SENGLE, DÉSERTEUR"},
                   {importance:"fête suprême quarte", saint:"St Masquarade, uniforme"},
                   {importance:"fête suprême quarte", saint:"Nativité de St Stéphane, faune"},
                   {importance:"fête suprême quarte", saint:"St Poligraf Poligrafovitch, chien"},
                   {importance:"fête suprême quarte", saint:"St Pâle, mineur"},
                   {importance:"fête suprême tierce", saint:"St VALENS, FRÈRE ONIRIQUE"},
                   {importance:"vacuation", saint:"Dédicace du Tripode"},
                   {importance:"fête suprême quarte", saint:"Bse Escampette, dynamiteuse"}
               ]
           },
           {
               month:"Clinamen",
            days:[
                   {importance:"fête suprême tierce", saint:"St ABLOU, PAGE et St HALDERN, DUC"},
                   {importance:"fête suprême quarte", saint:"Sts Hiboux, maîtres-chanteurs"},
                   {importance:"fête suprême quarte", saint:"La Mandragore, solanée androïde"},
                   {importance:"fête suprême quarte", saint:"St Pagne, confident"},
                   {importance:"fête suprême quarte", saint:"Sts Aster et Vulpian, violateurs du Néant"},
                   {importance:"fête suprême quarte", saint:"St Ganymède, professionnel"},
                   {importance:"vacuation", saint:"La Main de Gloire"},
                   {importance:"fête suprême seconde", saint:"LA MACHINE À PEINDRE"},
                   {importance:"fête suprême quarte", saint:"Ste Trique, lunatique"},
                   {importance:"fête suprême quarte", saint:"Rémission des Poissons"},
                   {importance:"fête suprême quarte", saint:"St Maquereau, intercesseur"},
                   {importance:"fête suprême quarte", saint:"St Georges Dazet, poulpe au regard de soie"},
                   {importance:"fête suprême quarte", saint:"Nativité de Maldoror, corsaire aux cheveux d'or"},
                   {importance:"fête suprême quarte", saint:"Sortie d'A. Dürer, hermétiste"},
                   {importance:"fête suprême première première", saint:"INVENTION de la 'PATAPHYSIQUE"},
                   {importance:"fête suprême quarte", saint:"Exit St Domenico Theotocopouli, el Greco"},
                   {importance:"fête suprême quarte", saint:"St Hiéronymus Bosch, démonarque"},
                   {importance:"vacuation", saint:"Les 27 Êtres Issus des Livres Pairs"},
                   {importance:"fête suprême quarte", saint:"St Barbeau, procureur et Ste Morue, juste"},
                   {importance:"vacuation", saint:"Capture du Fourneau"},
                   {importance:"fête suprême quarte", saint:"St Docteur Moreau, insulaire"},
                   {importance:"fête suprême seconde", saint:"FÊTE DES POLYÈDRES"},
                   {importance:"vacuation", saint:"Locus Solus"},
                   {importance:"fête suprême quarte", saint:"*St Tupetu de Tupetu, organisateur de loteries"},
                   {importance:"fête suprême quarte", saint:"Exit St Goya, alchimiste"},
                   {importance:"fête suprême quarte", saint:"St Escargot, sybarite"},
                   {importance:"fête suprême quarte", saint:"Ste Hure de Chasteté, pénitente"},
                   {importance:"fête suprême quarte", saint:"St Turgescent, iconoclaste"},
                   {importance:"vacuation", saint:"Cymbalum Mundi"}
               ]                   
           },
           {
               month:"Palotin",
               days:[
                   {importance:"fête suprême tierce", saint:"Sts CROCODILES, CROCODILES"},
                   {importance:"fête suprême quarte", saint:"Fête des Écluses"},
                   {importance:"fête suprême quarte", saint:"Sts Trolls, pantins"},
                   {importance:"fête suprême quarte", saint:"Ste Susan Calvin, docteur"},
                   {importance:"fête suprême quarte", saint:"Ste Poignée, veuve et Ste Jutte, recluse"},
                   {importance:"fête suprême quarte", saint:"Ste Oneille, gourgandine"},
                   {importance:"fête suprême quarte", saint:"St Fénéon ès Liens"},
                   {importance:"fête suprême tierce", saint:"St BOUGRELAS, PRINCE"},
                   {importance:"fête suprême quarte", saint:"Sts Boleslas et Ladislas, polonais"},
                   {importance:"fête suprême quarte", saint:"St Forficule, Barnabite"},
                   {importance:"vacuation", saint:"Explosion du Palotin"},
                   {importance:"vacuation", saint:"Réprobation du Travail"},
                   {importance:"fête suprême quarte", saint:"Esquive de St Léonard (de Vinci), illusionniste"},
                   {importance:"fête suprême quarte", saint:"St Équivoque, sans-culotte"},
                   {importance:"fête suprême tierce", saint:"ADORATION DU PAL"},
                   {importance:"fête suprême quarte", saint:"Déploration de St Achras, éleveur de Polyèdres"},
                   {importance:"fête suprême quarte", saint:"St Macrotatoure, caudataire"},
                   {importance:"vacuation", saint:"Canotage"},
                   {importance:"fête suprême quarte", saint:"Occultation de St Gauguin, océanide"},
                   {importance:"fête suprême quarte", saint:"St Ti Belot, séide"},
                   {importance:"fête suprême quarte", saint:"Occultation de Sa Magnificence le Dr Sandomir"},
                   {importance:"fête suprême seconde", saint:"Sts PALOTINS des PHYNANCES"},
                   {importance:"fête suprême quarte", saint:"Sts Quatrezoneilles, Herdanpo, Mousched-Gogh, palotins"},
                   {importance:"fête suprême quarte", saint:"Ste Lumelle, écuyère"},
                   {importance:"fête suprême quarte", saint:"Sts Potassons, acolythes"},
                   {importance:"fête suprême quarte", saint:"Ste Prétentaine, rosière"},
                   {importance:"fête suprême quarte", saint:"St Foin, coryphée"},
                   {importance:"fête suprême quarte", saint:"Nativité de St Satie, Grand Parcier de l'Église d'Art"},
                   {importance:"vacuation", saint:"Erratum"}
               ]
           },
           {
               month:"Merdre",
            days:[
                   {importance:"fête suprême tierce", saint:"ACCOUCHEMENT DE Ste JEANNE, PAPESSE"},
                   {importance:"vacuation", saint:"Le Moutardier du Pape"},
                   {importance:"fête suprême quarte", saint:"St Siège, sous-pape"},
                   {importance:"fête suprême quarte", saint:"Nativité de St H. Rousseau, douanier"},
                   {importance:"fête suprême quarte", saint:"St Crouducul, troupier"},
                   {importance:"fête suprême quarte", saint:"*St Cucufat, mécène"},
                   {importance:"fête suprême quarte", saint:"Nativité de M. Plume, propriétaire"},
                   {importance:"fête suprême seconde", saint:"COCUAGE DE M. LE P. UBU"},
                   {importance:"vacuation", saint:"Vidange"},
                   {importance:"fête suprême quarte", saint:"St Barbapoux, amant"},
                   {importance:"fête suprême quarte", saint:"St Memnon, vidangeur"},
                   {importance:"fête suprême quarte", saint:"Stes Miches, catéchumènes"},
                   {importance:"fête suprême quarte", saint:"Ste Lunette, solitaire"},
                   {importance:"fête suprême quarte", saint:"St Sphincter, profès"},
                   {importance:"fête suprême tierce", saint:"Sts SERPENTS D'AIRAIN"},
                   {importance:"fête suprême quarte", saint:"Nativité de *St Donatien A. François"},
                   {importance:"fête suprême quarte", saint:"St Woland, professeur"},
                   {importance:"fête suprême quarte", saint:"St Anal, cordelier et Ste Foire, anagogue"},
                   {importance:"fête suprême quarte", saint:"Ste Fétatoire, super"},
                   {importance:"fête suprême quarte", saint:"Ste Colombine, expurgée"},
                   {importance:"fête suprême quarte", saint:"Ste Pyrotechnie, illuminée"},
                   {importance:"fête suprême première première", saint:"ONTOGÉNIE PATAPHYSIQUE"},
                   {importance:"fête suprême tierce", saint:"INTERPRÉTATION DE L'UMOUR"},
                   {importance:"fête suprême quarte", saint:"Ste Purge, sage-femme"},
                   {importance:"fête suprême seconde", saint:"APPARITION D'UBU ROI"},
                   {importance:"fête suprême quarte", saint:"Ste Barbaque, naïade"},
                   {importance:"fête suprême quarte", saint:"Sts Courts et Longs, gendarmes"},
                   {importance:"fête suprême quarte", saint:"St Raca, cagot"},
                   {importance:"vacuation", saint:"Défaite du Mufle"}
               ]                   
           },
           {
               month:"Gidouille",
               days:[
                   {importance:"fête suprême tierce", saint:"Ste BOUZINE, ESPRIT"},
                   {importance:"fête suprême quarte", saint:"St Lucullus, amateur (Bloomsday)"},
                   {importance:"fête suprême quarte", saint:"Ste Dondon, amazone"},
                   {importance:"fête suprême quarte", saint:"Ste Tripe, républicaine"},
                   {importance:"fête suprême quarte", saint:"St Ugolin, mansuet"},
                   {importance:"fête suprême quarte", saint:"St Dieu, retraité"},
                   {importance:"fête suprême quarte", saint:"St Bébé Toutout, évangéliste"},
                   {importance:"fête suprême tierce", saint:"Ste BOUDOUILLE, BAYADÈRE"},
                   {importance:"fête suprême quarte", saint:"Ste Outre, psychiatre"},
                   {importance:"fête suprême quarte", saint:"St Boudin, recteur"},
                   {importance:"fête suprême quarte", saint:"Sacre de Talou VII, empereur du Ponukélé"},
                   {importance:"fête suprême quarte", saint:"Ste Confiture, dévote et Ste Cliche, donatrice"},
                   {importance:"fête suprême quarte", saint:"Sts Instintestins, conseillers intimes"},
                   {importance:"fête suprême quarte", saint:"St Colon, artilleur"},
                   {importance:"fête suprême tierce", saint:"Ste GIBORGNE, VÉNÉRABLE"},
                   {importance:"fête suprême quarte", saint:"St Inventaire, poète"},
                   {importance:"fête suprême quarte", saint:"Ste Femelle, technicienne"},
                   {importance:"fête suprême seconde", saint:"VISITATION DE MÈRE UBU"},
                   {importance:"fête suprême quarte", saint:"St Sein, tautologue"},
                   {importance:"fête suprême quarte", saint:"St Périnée, zélateur"},
                   {importance:"fête suprême quarte", saint:"St Spéculum, confesseur"},
                   {importance:"fête suprême seconde", saint:"FÊTE DE GIDOUILLE"},
                   {importance:"fête suprême quarte", saint:"St Ombilic, gymnosophiste"},
                   {importance:"fête suprême quarte", saint:"St Gris-gris, ventre"},
                   {importance:"fête suprême quarte", saint:"St Bouffre, pontife"},
                   {importance:"fête suprême quarte", saint:"Ste Goulache, odalisque"},
                   {importance:"fête suprême quarte", saint:"Ste Gandouse, hygiéniste"},
                   {importance:"vacuation", saint:"Poche du Père Ubu"},
                   {importance:"fête suprême seconde", saint:"NOM D'UBU"}
               ]
           },
           {
               month:"Tatane",
            days:[
                   {importance:"fête suprême première seconde", saint:"FÊTE DU P. UBU (Ubu d'été)"},
                   {importance:"fête suprême quarte", saint:"Commémoration du P. Ébé"},
                   {importance:"fête suprême quarte", saint:"Ste Crapule, puriste et St Fantomas, archange"},
                   {importance:"fête suprême quarte", saint:"Ascension du Mouchard, statisticien, psychiatre et policier"},
                   {importance:"fête suprême quarte", saint:"St Arsouille, patricien"},
                   {importance:"fête suprême quarte", saint:"Sts Robot et Cornard, citoyens"},
                   {importance:"fête suprême quarte", saint:"St Biribi, taulier"},
                   {importance:"fête suprême seconde", saint:"SUSCEPTION DU CROC À MERDRE"},
                   {importance:"fête suprême quarte", saint:"Sts Écrase-Merdre, sectateurs"},
                   {importance:"fête suprême quarte", saint:"Sts Pieds Nickelés, trinité"},
                   {importance:"fête suprême quarte", saint:"Stes Canicule et Canule, jouvencelles"},
                   {importance:"fête suprême quarte", saint:"Sts Cannibales, philanthropes"},
                   {importance:"fête suprême quarte", saint:"St Dada, prophète"},
                   {importance:"fête suprême quarte", saint:"Ste Anne, pèlerine, énergumène"},
                   {importance:"fête suprême seconde", saint:"PROCESSION AUX PHYNANCES"},
                   {importance:"fête suprême quarte", saint:"Transfiguration de St V. van Gogh, transmutateur"},
                   {importance:"fête suprême quarte", saint:"Ste Flamberge, voyante"},
                   {importance:"fête suprême quarte", saint:"St Trou, chauffeur"},
                   {importance:"fête suprême quarte", saint:"Ste Taloche, matrone"},
                   {importance:"fête suprême quarte", saint:"St Tiberge, frère quêteur"},
                   {importance:"fête suprême quarte", saint:"Sts Catoblepas, lord et Anoblepas, amiral"},
                   {importance:"fête suprême seconde", saint:"UBU ÈS LIENS"},
                   {importance:"fête suprême quarte", saint:"St Pissembock, oncle"},
                   {importance:"fête suprême quarte", saint:"St Pissedoux, caporal des hommes libres"},
                   {importance:"fête suprême quarte", saint:"St Panurge, moraliste"},
                   {importance:"fête suprême quarte", saint:"St Glé, neurologue-aliéniste"},
                   {importance:"fête suprême quarte", saint:"St Pistolet à Merdre, jubilaire"},
                   {importance:"fête suprême quarte", saint:"Nativité de St Bruggle"},
                   {importance:"vacuation", saint:"Le soleil solide froid"}
               ]                   
           },
           {
               month:"Phalle",
               days:[
                   {importance:"fête suprême tierce", saint:"St CHIBRE, PLANTON"},
                   {importance:"fête suprême quarte", saint:"*Ste Ruth, zélatrice"},
                   {importance:"fête suprême quarte", saint:"St Zebb, passe-partout"},
                   {importance:"fête suprême quarte", saint:"St Mnester, confesseur"},
                   {importance:"fête suprême seconde", saint:"ASSOMPTION DE Ste MESSALINE"},
                   {importance:"vacuation", saint:"Penis Angelicus"},
                   {importance:"fête suprême quarte", saint:"*St Patrobas, pompier"},
                   {importance:"fête suprême tierce", saint:"Ste LÉDA, AJUSTEUSE"},
                   {importance:"fête suprême quarte", saint:"St Godemiché, économe"},
                   {importance:"fête suprême quarte", saint:"Ste Nitouche, orante"},
                   {importance:"fête suprême quarte", saint:"Ste Lèchefrite, botteuse"},
                   {importance:"fête suprême quarte", saint:"Ste Andouille, amphibologue"},
                   {importance:"fête suprême quarte", saint:"Ste Bitre, ouvreuse et St Étalon, couvreur"},
                   {importance:"fête suprême tierce", saint:"BATAILLE DE MORSANG"},
                   {importance:"fête suprême tierce", saint:"MORT DE DIONYSOS, SURHOMME"},
                   {importance:"fête suprême quarte", saint:"Nativité de St Vibescu, pohète et Commémoration de Ste Cuculine d'Ancône"},
                   {importance:"fête suprême quarte", saint:"Ste Gallinacée, cocotte"},
                   {importance:"fête suprême quarte", saint:"St Lingam, bouche-trou"},
                   {importance:"fête suprême quarte", saint:"St Prélote, capucin"},
                   {importance:"fête suprême quarte", saint:"*St Pie VIII, navigant"},
                   {importance:"fête suprême tierce", saint:"St ERBRAND, POLYTECHNICIEN"},
                   {importance:"fête suprême seconde", saint:"Ste DRAGONNE, PYROPHAGE"},
                   {importance:"fête suprême quarte", saint:"*St Lazare, gare"},
                   {importance:"fête suprême quarte", saint:"Ste Orchidée, aumonière"},
                   {importance:"fête suprême quarte", saint:"Nativité apparente d'Artaud le Momo"},
                   {importance:"fête suprême quarte", saint:"Disparition de l'Ancien Breughel, incendiaire"},
                   {importance:"fête suprême quarte", saint:"*St Priape, franc-tireur"},
                   {importance:"fête suprême tierce", saint:"TRANSFIXION DE Ste MESSALINE"},
                   {importance:"vacuation", saint:"Le Termès"}
               ]
           }
       ];

       exports = PataphysicalDate;

   })(typeof exports === 'undefined'? {}: exports);
