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
                return [this.getDayName(), (this.day), this.getMonthName(), this.year].join(' ');
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
            getMonthName: function(){
                var months = ["Absolu", "Haha", "As", "Sable", "Décervelage", "Gueules", "Pédale", "Clinamen", "Palotin", "Merdre", "Gidouille", "Tatane", "Phalle"];
                return months[this.month];
            }, 
            getSaintOfDay: function(){
                var saints = Array(
["NATIVITÉ d'ALFRED JARRY","St Ptyx, silentiaire (Abolition de)","St Phénix, solipsiste et St Hyx, factotum","St Lucien de Samosate, voyageur","St Bardamu, voyageur","Ste Vérola, assistante sociale","St Alambic, abstracteur","ABSINTHE, ci-devant *St Alfred","Descente du St Esprit (de Vin)","Dilution","Ste Purée, sportswoman","Vide","St Canterel, l'illuminateur","St Sophrotatos l'Arménien, pataphysicien","ÉTHERNITÉ","St Ibicrate le Géomètre, pataphysicien","Céphalorgie","Flûtes de Pan","Stes Grues, ophiophiles","Ste Mélusine, souillarde de cuisine","*St Venceslas, duc","EMMANUEL DIEU","Ste Varia-Miriam, amphibie","Sts Rakirs et Rastrons, porte-côtelettes","Nativité de Sa Magnificence Opach","St Joseb, notaire à la mode de Bretagne","Stes Gigolette et Gaufrette, dogaresses","Xylostomie","Le Jet Musical"],
["L'ÂGE DU Dr FAUSTROLL","Dissolution d'E. Poe, dinomythurge","St Gibus, franc-maçon","Ste Berthe de Courrière, égérie","Ste Belgique, nourrice","Ste Tourte, lyrique et Ste Bévue, sociologue","St Prout, abbé","FÊTE DU HAHA","Tautologie","St Panmuphle, huissier","Sortie de St L. Cranach, apocalypticien","St Cosinus, savant","Bse Fenouillard, sainte famille","Exhibition de la Daromphe","NATIVITÉ DE L'OESTRE, artificier","Ste Vadrouille, emblème","St Homais d'Aquin, prudhomme","Nativité de Sa Magnificence le baron Mollet (*St Pipe)","*St Raphaël, apéritif et philistin","STRANGULATION DE BOSSE-DE-NAGE","ZIMZOUM DE BOSSE-DE-NAGE","RÉSURRECTION DE BOSSE-DE-NAGE","CHAPEAU DE BOSSE-DE-NAGE","St Cl. Terrasse, musicien des Phynances","St J.-P. Brisset, philologue, prince des penseurs","Commémoration du Cure-dent","OCCULTATION D'ALFRED JARRY","Fuite d'Ablou","Marée Terrestre"],
["NATIVITÉ DE PANTAGRUEL","Ste Rrose Sélavy, héroïne","Couronnement de Lord Patchogue, miroitier","St Cravan, boxeur","St Van Meegeren, faussaire","St Omnibus, satyre","St Cyrano de Bergerac, explorateur","St RIMBE, OISIF","Équarrissage pour tous","St Abstrait, bourreau","St Ossian, barde postiche","DISPUTE DU SIGNE + ET DU SIGNE -","MOUSTACHES DU Dr FAUSTROLL","St P. Bonnard, peintre des Phynances","NAVIGATION DU Dr FAUSTROLL","St Cap, captain","St Pangloss, humoriste passif","St Chambernac, pauvriseur","St Courtial des Péreires, aérostier et inventeur","St Olibrius, augure","St Possible, schizophrène","St LAUTRÉAMONT","St Quincey, critique d'art","St Berbiguier, martyr","St Lewis Carroll, professeur","St Mensonger, évêque","Ste Visité, fille du précédent","Nativité de St Swift, chanoine","Traversée du Miroir"],
["NOCES DE BALKIS ET DE SALOMON","St Doublemain, idéologue","St Phlegmon, doctrinaire","*Ste Barbe (femme à), femme-canon","Ste Savate, avocate","St Navet et Ste Perruque, humanistes","St Birbe, juge","CONCEPTION DU P. UBU (A. J.)","St Sagouin, homme d'État","EXALTATION D'UBU ROI (Ubu d'hiver)","Nativité de St Grabbe, scherziste","Ste Choupe, mère de famille","*St Flaive, concierge","Don Quichotte, champion du monde","KHURMOOKUM DU Dr FAUSTROLL","St Nul, exempt","St Moyen, français","Ste Lurette, joconde","GRAVIDITÉ DE MÈRE UBU","St Sabre, allopathe","Ste Tape, pompette","CÉSAR - ANTECHRIST","*Ste Viole, vierge et martyre","Ste Pochetée, gouvernante","NATIVITÉ DE L'ARCHÉOPTÉRYX","Monsieur Sisyphe","St Tic, conjoint","St Cervelas, penseur","Aleph"],
["St ALAODINE, virtuose","Sts Hassassins, praticiens","Astu","DÉCERVELAGE","Sts Giron, Pile et Cotice, palotins","Sts Polonais, prolétaires","Sts Forçats, poliorcètes","St BORDURE, CAPITAINE","Dormition de Jacques Vaché, interprète","Drapaud (érection du)","*St Eustache, libérateur","St Landru, gynécologue","St Guillotin, médecin","Sts 4 Sans-Cou, enchanteurs","CONSCIENCE D'UBU","St Mauvais, sujet","St Mandrin, poète et philosophe","Sts Pirates et Flibustiers, thaumaturges","St et Ste Cartouche, vétérinaires","St Outlaw, aristocrate","CHAIRE DU Dr FAUSTROLL","OSTENTION DU BÂTON À PHYSIQUE","St Tank, animal","St Weidman, patriarche","St Petiot, expert","Escrime","Sts Chemins de fer, assassins","Repopulation","Lit de Procruste"],
["DÉPUCELAGE DE MÈRE UBU","St Sigisbée, eunuque","St Anthropoïde, policier","*Ste Goule ou Gudule, institutrice","Ste Gale, abbesse","Ste Touche, postulante","St Gueule, abbé","FÊTE DE LA CHANDELLE VERTE","Ste Crêpe, laïque","St Préservatif, bedeau","St Baobab, célibataire","St Membre, compilateur","Copulation","Nativité de St J. Verne, globe-trotter en chambre","ALICE AU PAYS DES MERVEILLES","St Münchhausen, baron","Le Bétrou, théurge","Nativité de St Deibler, prestidigitateur","St Sade ès liens","St Lafleur, valet","Lavement","St SEXE, STYLITE","Occultation de St J. Torma, euphoriste","Conversion de St Matorel, bateleur","Ste Marmelade, inspirée","L'AMOUR ABSOLU, deliquium","Ste Tabagie, cosmogène","Sts Hylactor et Pamphagus","Mouvement Perpétuel"],
["DU SURMÂLE","St André Marcueil, ascète cycliste","St Ellen, hile","St Michet, idéaliste","St Ouducul, trouvère","Vers Belges","St Gavroche, forain","LA MACHINE À INSPIRER L'AMOUR","*St Remezy, évêque in partibus","Nativité de St Tancrède, jeune homme","Testament de P. Uccello, le mal illuminé","St Hari Seldon, psychohistorien galactique","*Ste Valburge, succube","Sabbat","Sts ADELPHES, ÉSOTÉRISTES","Sts Templiers, adeptes","St Dricarpe, prosélyte","St Nosocome, carabin","Ste Goutte, fête militaire","Ste Cuisse, dame patronnesse","St Inscrit, Converti","St SENGLE, DÉSERTEUR","St Masquarade, uniforme","Nativité de St Stéphane, faune","St Poligraf Poligrafovitch, chien","St Pâle, mineur","St VALENS, FRÈRE ONIRIQUE","Dédicace du Tripode","Bse Escampette, dynamiteuse"],
["St ABLOU, PAGE et St HALDERN, DUC","Sts Hiboux, maîtres-chanteurs","La Mandragore, solanée androïde","St Pagne, confident","Sts Aster et Vulpian, violateurs du Néant","St Ganymède, professionnel","La Main de Gloire","LA MACHINE À PEINDRE","Ste Trique, lunatique","Rémission des Poissons","St Maquereau, intercesseur","St Georges Dazet, poulpe au regard de soie","Nativité de Maldoror, corsaire aux cheveux d'or","Sortie d'A. Dürer, hermétiste","INVENTION de la 'PATAPHYSIQUE","Exit St Domenico Theotocopouli, el Greco","St Hiéronymus Bosch, démonarque","Les 27 Êtres Issus des Livres Pairs","St Barbeau, procureur et Ste Morue, juste","Capture du Fourneau","St Docteur Moreau, insulaire","FÊTE DES POLYÈDRES","Locus Solus","*St Tupetu de Tupetu, organisateur de loteries","Exit St Goya, alchimiste","St Escargot, sybarite","Ste Hure de Chasteté, pénitente","St Turgescent, iconoclaste","Cymbalum Mundi"],
["Sts CROCODILES, CROCODILES","Fête des Écluses","Sts Trolls, pantins","Ste Susan Calvin, docteur","Ste Poignée, veuve et Ste Jutte, recluse","Ste Oneille, gourgandine","St Fénéon ès Liens","St BOUGRELAS, PRINCE","Sts Boleslas et Ladislas, polonais","St Forficule, Barnabite","Explosion du Palotin","Réprobation du Travail","Esquive de St Léonard (de Vinci), illusionniste","St Équivoque, sans-culotte","ADORATION DU PAL","Déploration de St Achras, éleveur de Polyèdres","St Macrotatoure, caudataire","Canotage","Occultation de St Gauguin, océanide","St Ti Belot, séide","Occultation de Sa Magnificence le Dr Sandomir","Sts PALOTINS des PHYNANCES","Sts Quatrezoneilles, Herdanpo, Mousched-Gogh, palotins","Ste Lumelle, écuyère","Sts Potassons, acolythes","Ste Prétentaine, rosière","St Foin, coryphée","Nativité de St Satie, Grand Parcier de l'Église d'Art","Erratum"],
["ACCOUCHEMENT DE Ste JEANNE, PAPESSE","Le Moutardier du Pape","St Siège, sous-pape","Nativité de St H. Rousseau, douanier","St Crouducul, troupier","*St Cucufat, mécène","Nativité de M. Plume, propriétaire","COCUAGE DE M. LE P. UBU","Vidange","St Barbapoux, amant","St Memnon, vidangeur","Stes Miches, catéchumènes","Ste Lunette, solitaire","St Sphincter, profès","Sts SERPENTS D'AIRAIN","Nativité de *St Donatien A. François","St Woland, professeur","St Anal, cordelier et Ste Foire, anagogue","Ste Fétatoire, super","Ste Colombine, expurgée","Ste Pyrotechnie, illuminée","ONTOGÉNIE PATAPHYSIQUE","INTERPRÉTATION DE L'UMOUR","Ste Purge, sage-femme","APPARITION D'UBU ROI","Ste Barbaque, naïade","Sts Courts et Longs, gendarmes","St Raca, cagot","Défaite du Mufle"],
["Ste BOUZINE, ESPRIT","St Lucullus, amateur (Bloomsday)","Ste Dondon, amazone","Ste Tripe, républicaine","St Ugolin, mansuet","St Dieu, retraité","St Bébé Toutout, évangéliste","Ste BOUDOUILLE, BAYADÈRE","Ste Outre, psychiatre","St Boudin, recteur","Sacre de Talou VII, empereur du Ponukélé","Ste Confiture, dévote et Ste Cliche, donatrice","Sts Instintestins, conseillers intimes","St Colon, artilleur","Ste GIBORGNE, VÉNÉRABLE","St Inventaire, poète","Ste Femelle, technicienne","VISITATION DE MÈRE UBU","St Sein, tautologue","St Périnée, zélateur","St Spéculum, confesseur","FÊTE DE GIDOUILLE","St Ombilic, gymnosophiste","St Gris-gris, ventre","St Bouffre, pontife","Ste Goulache, odalisque","Ste Gandouse, hygiéniste","Poche du Père Ubu","NOM D'UBU"],
["FÊTE DU P. UBU (Ubu d'été)","Commémoration du P. Ébé","Ste Crapule, puriste et St Fantomas, archange","Ascension du Mouchard, statisticien, psychiatre et policier","St Arsouille, patricien","Sts Robot et Cornard, citoyens","St Biribi, taulier","SUSCEPTION DU CROC À MERDRE","Sts Écrase-Merdre, sectateurs","Sts Pieds Nickelés, trinité","Stes Canicule et Canule, jouvencelles","Sts Cannibales, philanthropes","St Dada, prophète","Ste Anne, pèlerine, énergumène","PROCESSION AUX PHYNANCES","Transfiguration de St V. van Gogh, transmutateur","Ste Flamberge, voyante","St Trou, chauffeur","Ste Taloche, matrone","St Tiberge, frère quêteur","Sts Catoblepas, lord et Anoblepas, amiral","UBU ÈS LIENS","St Pissembock, oncle","St Pissedoux, caporal des hommes libres","St Panurge, moraliste","St Glé, neurologue-aliéniste","St Pistolet à Merdre, jubilaire","Nativité de St Bruggle","Le soleil solide froid"],
["St CHIBRE, PLANTON","*Ste Ruth, zélatrice","St Zebb, passe-partout","St Mnester, confesseur","ASSOMPTION DE Ste MESSALINE","Penis Angelicus","*St Patrobas, pompier","Ste LÉDA, AJUSTEUSE","St Godemiché, économe","Ste Nitouche, orante","Ste Lèchefrite, botteuse","Ste Andouille, amphibologue","Ste Bitre, ouvreuse et St Étalon, couvreur","BATAILLE DE MORSANG","MORT DE DIONYSOS, SURHOMME","Nativité de St Vibescu, pohète et Commémoration de Ste Cuculine d'Ancône","Ste Gallinacée, cocotte","St Lingam, bouche-trou","St Prélote, capucin","*St Pie VIII, navigant","St ERBRAND, POLYTECHNICIEN","Ste DRAGONNE, PYROPHAGE","*St Lazare, gare","Ste Orchidée, aumonière","Nativité apparente d'Artaud le Momo","Disparition de l'Ancien Breughel, incendiaire","*St Priape, franc-tireur","TRANSFIXION DE Ste MESSALINE","Le Termès"]);
            return saints[this.month][this.day - 1];
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

        exports = PataphysicalDate;

    })(typeof exports === 'undefined'? {}: exports);
