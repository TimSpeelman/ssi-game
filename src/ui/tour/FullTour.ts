import { GameActions } from '../../state/actions';
import { ProjectActions } from '../../state/project/actions';
import {
    selectActiveActorDescs,
    selectActiveSidebarTab,
    selectActiveStepIndex,
    selectAssetDefinitions,
    selectEditing,
    selectSelectedActorId,
    selectSelectedAssetId,
    selectStepDescs,
} from '../../state/selectors';
import { SidebarTab } from '../components/Sidebar/SidebarTab';
import { TourStep } from './TourStep';

const actorJohnID = 'human_1';
const actorShopID = 'shop_1';
const assetPassportID = 'subject-passport-1';
const authResID = '11';
const passportIssuanceTypeName = 'Issuance';

export const FullTour: TourStep[] = [
    {
        title: {
            NL: 'Rondleiding',
            EN: 'Guided Tour',
        },
        message: {
            NL:
                'Welkom bij de Identity Game, dé tool om inzicht' +
                ' te krijgen in de complexe wereld van (digitale)' +
                ' identiteit.\n\n' +
                'De Identity Game helpt beleidsmakers, juristen,' +
                ' IT-architecten en anderen om te praten over' +
                ' **identificatie, authenticatie en autorisatie**' +
                ' op basis van _traditionele_ middelen zoals' +
                ' paspoorten, of complexere technologiën zoals ' +
                ' Self-Sovereign Identity.\n\n' +
                '**Klik op volgende om met de rondleiding te beginnen.**',
            EN: '',
        },
        nextEnabled: true,
        onActivate: (ctx) => {
            ctx.dispatch(GameActions.NAVIGATE_SIDEBAR({ to: SidebarTab.INFO }));
            ctx.dispatch(GameActions.TOGGLE_EDITING({ editing: false }));
            ctx.dispatch(ProjectActions.GOTO_STEP_INDEX({ index: -1 }));
        },
    },
    {
        title: {
            NL: 'Scenario',
            EN: '',
        },
        message: {
            NL:
                'In de Identity Game staat telkens een bepaald' +
                ' **scenario** centraal. Het vertelt een concreet' +
                ' verhaal, waaruit blijkt dat identiteitsmiddelen' +
                ' moeten worden ingezet om een bepaald doel te' +
                ' bereiken.\n\n' +
                'In het eerste zijmenu' +
                ' (het **info-menu**) lees je de beschrijving' +
                ' van dit scenario.' +
                ' Voor deze rondleiding gebruiken we een heel' +
                ' simpel scenario: het kopen van alcohol in een' +
                ' fysieke slijterij. \n\n' +
                '**Lees de beschrijving en druk op volgende.**',
            EN: '',
        },
        nextEnabled: true,
        highlight: { q: '.sidebar-main' },
        onActivate: (ctx) => {
            ctx.dispatch(GameActions.NAVIGATE_SIDEBAR({ to: SidebarTab.INFO }));
            ctx.dispatch(ProjectActions.GOTO_STEP_INDEX({ index: -1 }));
        },
    },
    {
        title: {
            NL: 'Canvas',
            EN: '',
        },
        message: {
            NL:
                'Op het "canvas" worden schematisch de drie kernelementen van de Identity Game afgebeeld:\n' +
                '1. **Actoren** zijn de mensen en organisaties die in dit scenario zijn betrokken.\n' +
                '2. **Assets** zijn de relevante kennis en middelen waar zij over beschikken.\n' +
                '3. **Acties** zijn de acties die zij alleen of samen uitvoeren om een doel te bereiken.\n\n' +
                'Er wordt altijd een **momentopname** afgebeeld. ' +
                'Op dit moment zien we twee actoren, John en de slijterij.' +
                ' Bij John staat een **paspoort** (asset). Dat betekent dat John nu in het scenario, beschikt over een paspoort.' +
                ' Er wordt nu nog géén actie uitgevoerd.' +
                '\n\n**Klik op volgende.**',
            EN: '',
        },
        nextEnabled: true,
        highlight: { q: '#network-svg-root', expand: 1 },
    },
    {
        title: {
            NL: 'Tijdregelaar',
            EN: '',
        },
        message: {
            NL:
                'Een scenario bestaat niet uit één momentopname, maar' +
                ' uit een reeks **stappen** die de actoren uitvoeren om' +
                ' hun doel(en) te bereiken.\n\n' +
                'Om door het scenario heen te lopen kun' +
                ' je gebruik maken van de tijdregelaar rechtsonderin.\n\n' +
                ' _**Tip:** navigeer sneller door de tijd met sneltoetsen:' +
                ' probeer eens de toetsen 0 t/m 9 en de pijltjestoetsen._\n\n' +
                '**Ga naar Stap 1 en klik op volgende.**',
            EN: '',
        },
        nextEnabled: (s) => selectActiveStepIndex(s) === 0,
        highlight: { q: '.time-navigation', expand: 1 },
    },
    {
        title: {
            NL: 'Interactie',
            EN: '',
        },
        message: {
            NL:
                'Wanneer je naar stap 1 gaat zie je dat op het canvas' +
                ' een nieuwe situatie wordt afgebeeld. In deze stap' +
                ' laat John zijn fysieke paspoort zien aan de verkoper.' +
                ' Je ziet dat John naar de slijterij toe is gegaan.' +
                ' Ook is er een nieuw icoon verschenen naast de slijterij' +
                ' omdat de slijterij nieuwe kennis over John heeft vergaard.' +
                ' Daarover later meer.\n\n' +
                '**Klik op volgende.**',
            EN: '',
        },
        nextEnabled: true,
        highlight: { q: '#network-svg-root', expand: 1 },
    },
    {
        title: {
            NL: 'Stapinformatie',
            EN: '',
        },
        message: {
            NL:
                'Deze stap wordt toegelicht in het zij-menu **stapdetails**.\n\n' +
                '**Ga naar het zij-menu stapdetails om verder te gaan.**',
            EN: '',
        },
        nextEnabled: false,
        highlight: { q: `#sidebar-menu-item-${SidebarTab.STEP}` },
        onStateChange: (ctx) => {
            if (selectActiveSidebarTab(ctx.state) === SidebarTab.STEP) {
                ctx.next();
            }
        },
    },
    {
        title: {
            NL: 'Stapinformatie',
            EN: '',
        },
        message: {
            NL:
                'Het zij-menu **stapdetails** vertelt wat er op dit' +
                ' moment in het scenario gaande is.\n\n' +
                '**Lees de beschrijving en druk op volgende.**',
            EN: '',
        },
        nextEnabled: true,
        highlight: { q: `.sidebar-main` },
    },
    {
        title: {
            NL: 'Uitkomsten',
            EN: '',
        },
        message: {
            NL:
                'Onder de stapinformatiekaart staat een lijst uitkomsten.' +
                ' Uitkomsten geven concreet aan wat de relevante gevolgen' +
                ' zijn van een actie. \n\n' +
                'In dit geval zien we dat de Slijterij' +
                ' nieuwe kennis heeft vergaard.\n\n' +
                '**Klik op "Authenticatieresultaat" om verder te gaan.**',
            EN: '',
        },
        nextEnabled: false,
        highlight: { q: `#outcome-list`, expand: 1 },
        onStateChange: (ctx) => {
            if (selectSelectedAssetId(ctx.state) === authResID) {
                ctx.next();
            }
        },
    },
    {
        title: {
            NL: 'Assetinformatie',
            EN: '',
        },
        message: {
            NL:
                'Je hebt zojuist het "Authenticatieresultaat" geselecteerd' +
                ' waardoor je in het zij-menu **assetdetails** meer informatie' +
                ' over asset (een stuk kennis in dit geval) te zien krijgt.\n\n' +
                '**Lees de omschrijving op de assetkaart en klik op volgende**',
            EN: '',
        },
        nextEnabled: true,
        highlight: { q: `.sidebar-main` },
    },
    {
        title: {
            NL: 'Asseticoon',
            EN: '',
        },
        message: {
            NL:
                'Merk ook op dat het "Authenticatieresultaat" op het canvas is verschenen.' +
                ' De gele ring geeft aan dat de asset is geselecteerd.\n\n' +
                '**Klik op volgende**',
            EN: '',
        },
        nextEnabled: true,
        highlight: { q: `#asset-${authResID}`, expand: 1 },
    },
    {
        title: {
            NL: 'Tijdlijn',
            EN: '',
        },
        message: {
            NL:
                'Om alle stappen in het scenario te zien ga je naar het zij-menu **tijdlijn**.\n\n' +
                '**Ga naar het zij-menu tijdlijn om verder te gaan.**',
            EN: '',
        },
        nextEnabled: false,
        highlight: { q: `#sidebar-menu-item-${SidebarTab.TIMELINE}` },
        onStateChange: (ctx) => {
            if (selectActiveSidebarTab(ctx.state) === SidebarTab.TIMELINE) {
                ctx.next();
            }
        },
    },
    {
        title: {
            NL: 'Tijdlijn',
            EN: '',
        },
        message: {
            NL:
                'Het zij-menu **tijdlijn** toont de lijst van stappen waaruit' +
                ' het scenario is opgebouwd. De iconen geven aan welke actoren' +
                ' bij elke stap betrokken zijn. Dit simpele voorbeeld bestaat uit' +
                ' slechts twee stappen.\n\n' +
                '**Dubbel-klik op de tweede stap om verder te gaan.**',
            EN: '',
        },
        nextEnabled: false,
        onStateChange: (ctx) => {
            if (selectActiveSidebarTab(ctx.state) === SidebarTab.STEP && selectActiveStepIndex(ctx.state) === 1) {
                ctx.next();
            }
        },
        highlight: { q: `.sidebar` },
    },
    {
        title: {
            NL: 'Tweede interactie',
            EN: '',
        },
        message: {
            NL:
                "Nadat de verkoper John's paspoort heeft bekeken overhandigt" +
                ' hij de drank. Hiermee is het doel bereikt en het scenario' +
                ' afgerond.\n\n' +
                '**Klik op volgende.**',
            EN: '',
        },
        nextEnabled: true,
        // highlight: { q: '#network-svg-root', expand: 1 },
        highlight: { q: `.sidebar` },
    },
    {
        title: {
            NL: 'Actordetails',
            EN: '',
        },
        message: {
            NL:
                'In het zij-menu **actoren** vind je meer informatie over' +
                ' actoren.\n\n' +
                '_**Tip:** je kunt op meerdere manieren bij John komen:_ \n' +
                '1. _door op de onderstreepte naam John te klikken;_ \n' +
                '2. _door in het canvas op John te klikken; of,_ \n' +
                '3. _door in het zij-menu **actoren** op John te klikken._ \n\n' +
                '**Selecteer John om verder te gaan.**',
            EN: '',
        },
        nextEnabled: false,
        onStateChange: (ctx) => {
            if (
                selectActiveSidebarTab(ctx.state) === SidebarTab.ACTORS &&
                selectSelectedActorId(ctx.state) === actorJohnID
            ) {
                ctx.next();
            }
        },
    },
    {
        title: {
            NL: 'Actorinformatie',
            EN: '',
        },
        message: {
            NL:
                'Wanneer je een Actor hebt geselecteerd zie je' +
                ' in het tweede zijmenu (het **actor-menu**) meer' +
                ' informatie over die Actor.\n\n' +
                '**Klik op volgende.**',
            EN: '',
        },
        onActivate: (ctx) => {
            ctx.dispatch(GameActions.NAVIGATE_SIDEBAR({ to: SidebarTab.ACTORS }));
        },
        nextEnabled: true,
        highlight: { q: '#sidebar-main' },
    },
    {
        title: {
            NL: 'Eigenschappen van een Actor',
            EN: '',
        },
        message: {
            NL:
                'Deze tabel bevat _eigenschappen_ van deze actor' +
                ' die voor dit scenario relevant zijn.' +
                ' In dit voorbeeld is de geboortedatum van John' +
                ' belangrijk.' +
                ' De Identity Game gaat voornamelijk over kennis.' +
                ' Om veilig zaken te kunnen doen moeten actoren' +
                ' immers relevante en betrouwbare kennis over' +
                ' elkaar kunnen verzamelen.\n\n' +
                'Echter, kennis kan afwezig, verouderd of onjuist zijn.' +
                ' Om duidelijk onderscheid te kunnen maken tussen wat _is_' +
                ' en wat Actoren _weten_ (of denken te weten) beschrijft deze' +
                ' tabel de werkelijkheid.\n\n' +
                '**Klik op volgende.**',
            EN: '',
        },
        onActivate: (ctx) => {
            ctx.dispatch(GameActions.NAVIGATE_SIDEBAR({ to: SidebarTab.ACTORS }));
        },
        nextEnabled: true,
        highlight: { q: '#actor-properties', expand: 1 },
    },
    {
        title: {
            NL: 'Assets',
            EN: '',
        },
        message: {
            NL:
                'Deze lijst bevat de kennis en materialen ' +
                ' die deze actor, op dit moment in het scenario,' +
                ' bezit.' +
                ' In dit voorbeeld beschikte John al bij het' +
                ' begin van het scenario over een paspoort en' +
                ' verkreeg hij in stap 2 de fles wijn waar het' +
                ' hem om te doen was.\n\n' +
                '**Klik op volgende.**',
            EN: '',
        },
        nextEnabled: true,
        highlight: { q: '#actor-assets', expand: 1 },
        onActivate: (ctx) => {
            ctx.dispatch(GameActions.NAVIGATE_SIDEBAR({ to: SidebarTab.ACTORS }));
        },
    },

    {
        title: {
            NL: 'Scenario Bewerken',
            EN: '',
        },
        message: {
            NL:
                'Nu we de kernconcepten van de Identity Game hebben besproken' +
                ' kunnen we écht aan de slag. De ware kracht van het spel ligt ' +
                " in de mogelijkheid om zelf scenario's te ontwikkelen. Tot" +
                ' nu toe was bewerken uitgeschakeld.\n\n' +
                '**Schakel bewerken in en klik op volgende.**',
            EN: '',
        },
        nextEnabled: (s) => selectEditing(s),
        highlight: { q: '#btn-editing' },
        onActivate: (ctx) => ctx.dispatch(ProjectActions.GOTO_STEP_INDEX({ index: 2 })),
    },
    {
        title: {
            NL: 'Het scenario uitbreiden',
            EN: '',
        },
        message: {
            NL:
                'Stel we willen dit scenario uitbreiden door de uitgifte van het' +
                ' paspoort erin te betrekken. Daarvoor moeten we drie aanpassingen doen:\n' +
                "1. John's paspoort in de begintoestand verwijderen.\n" +
                '2. Een nieuwe actor toevoegen: de overheid.\n' +
                '3. Een nieuwe stap toevoegen: uitgifte van een paspoort.\n\n' +
                '_**Tip:** indien gewenst kun je met ctrl+z of de knoppen in het bovenmenu je wijzigingen ongedaan maken._\n\n' +
                '**Klik op volgende**',
            EN: '',
        },
        nextEnabled: (s) => true,
    },
    {
        title: {
            NL: "John's paspoort verwijderen",
            EN: '',
        },
        message: {
            NL:
                "Omdat we willen uitbeelden dat de overheid John's paspoort uitgeeft," +
                ' stellen we eerst in dat John begint zónder paspoort.\n\n' +
                '**Selecteer John om verder te gaan**',
            EN: '',
        },
        nextEnabled: (s) => false,
        onStateChange: (ctx) => {
            if (
                selectActiveSidebarTab(ctx.state) === SidebarTab.ACTORS &&
                selectSelectedActorId(ctx.state) === actorJohnID
            ) {
                ctx.next();
            }
        },
    },
    {
        title: {
            NL: "John's paspoort verwijderen",
            EN: '',
        },
        message: {
            NL:
                'We kunnen het paspoort alleen verwijderen als we in de begintoestand zijn.\n\n' +
                "**Klik op de knop 'Begintoestand aanpassen' om verder te gaan**",
            EN: '',
        },
        nextEnabled: (s) => false,
        onStateChange: (ctx) => {
            if (selectActiveStepIndex(ctx.state) === -1) {
                ctx.next();
            }
        },
        highlight: { q: '#btn-goto-initial-state' },
    },
    {
        title: {
            NL: "John's paspoort verwijderen",
            EN: '',
        },
        message: {
            NL:
                'In de begintoestand is te zien dat John beschikt over een paspoort.\n\n' +
                '**Verwijder het paspoort om verder te gaan**',
            EN: '',
        },
        nextEnabled: (s) => false,
        onStateChange: (ctx) => {
            if (!(assetPassportID in selectAssetDefinitions(ctx.state))) {
                ctx.next();
            }
        },
        highlight: { q: '#actor-assets', expand: 1 },
    },
    {
        title: {
            NL: 'Foutmelding',
            EN: '',
        },
        message: {
            NL:
                'Heel goed. Nu het paspoort is verwijderd verschijnt een foutmelding.' +
                ' Klik op de foutmelding om te zien wat er mis gaat.\n\n' +
                '**Klik op Tonen om verder te gaan**',
            EN: '',
        },
        nextEnabled: false,
        onStateChange: (ctx) => {
            if (selectActiveSidebarTab(ctx.state) === SidebarTab.STEP && selectActiveStepIndex(ctx.state) === 0) {
                ctx.next();
            }
        },
        highlight: { q: '.scenario-status' },
    },
    {
        title: {
            NL: 'Foutmelding',
            EN: '',
        },
        message: {
            NL:
                'In het zij-menu stapdetails zie je dat bij stap 1 iets misgaat.' +
                ' Een paspoort is immers vereist voor deze stap "Fysieke authenticatie o.b.v. paspoort".\n\n' +
                ' De Identity Game bevat dergelijke eenvoudige controles om de gebruiker te helpen' +
                " kloppende scenario's te bouwen. Deze controles zijn echter niet sluitend.\n\n" +
                '**Ga met de tijdregelaar naar stap 2 om verder te gaan**',
            EN: '',
        },
        nextEnabled: false,
        onStateChange: (ctx) => {
            if (selectActiveSidebarTab(ctx.state) === SidebarTab.STEP && selectActiveStepIndex(ctx.state) === 1) {
                ctx.next();
            }
        },
        highlight: { q: '.sidebar' },
    },
    {
        title: {
            NL: 'Waarschuwing',
            EN: '',
        },
        message: {
            NL:
                'In stap 2 zie je ook een melding. Omdat er iets fout gaat in stap 1 kan het zijn dat' +
                ' de rest van het scenario niet meer klopt.\n\n' +
                '**Ga naar het zij-menu "actoren" om verder te gaan.**',
            EN: '',
        },
        nextEnabled: false,
        onStateChange: (ctx) => {
            if (selectActiveSidebarTab(ctx.state) === SidebarTab.ACTORS) {
                ctx.next();
            }
        },
        highlight: { q: '.sidebar-main' },
    },
    {
        title: {
            NL: 'Actor Toevoegen',
            EN: '',
        },
        message: {
            NL:
                'Voordat John een paspoort kan krijgen van de overheid, moet' +
                ' de overheid eerst als partij worden toegevoegd aan het scenario.\n\n' +
                ' Met de knop "Actor Toevoegen" krijg je een dialoogvenster waar je' +
                ' gewenste actoren kan toevoegen. Zorg dat je bij "Actor Type" in ieder' +
                ' geval voor Overheid hebt gekozen.\n\n' +
                '**Voeg de actor Overheid toe en klik op volgende.**',
            EN: '',
        },
        nextEnabled: (s) =>
            selectActiveActorDescs(s).length > 2 &&
            !!selectActiveActorDescs(s).find((a) => !a.isHuman && a.id !== actorShopID),
    },
    {
        title: {
            NL: 'Actor Toegevoegd',
            EN: '',
        },
        message: {
            NL:
                'Goed zo. De laatste aanpassing die we moeten maken is het toevoegen van een stap:' +
                ' de uitgifte van het paspoort.\n\n' +
                '**Ga naar het zij-menu "tijdlijn" om verder te gaan.**',
            EN: '',
        },
        nextEnabled: false,
        onStateChange: (ctx) => {
            if (selectActiveSidebarTab(ctx.state) === SidebarTab.TIMELINE) {
                ctx.next();
            }
        },
    },
    {
        title: {
            NL: 'Stap Toevoegen',
            EN: '',
        },
        message: {
            NL:
                'Met de knop "Stap Toevoegen" krijg je een dialoogvenster waarin je acties kunt kiezen.\n' +
                '1. Kies bij "Handeling" voor "Paspoortuitgifte".\n' +
                '2. Kies bij "Uitgever" voor de Overheid.\n' +
                '3. Kies bij "Subject" voor John. John is immers het subject van het uit te geven paspoort.' +
                '4. Vul naar wens de resterende velden in, of laat ze leeg.\n\n' +
                '**Voeg de stap "paspoortuitgifte" toe om verder te gaan.**',
            EN: '',
        },
        nextEnabled: false,
        onStateChange: (ctx) => {
            if (!!selectStepDescs(ctx.state).find((s) => s.action.type === passportIssuanceTypeName)) {
                ctx.next();
            }
        },
    },
    {
        title: {
            NL: 'Stap Toegevoegd',
            EN: '',
        },
        message: {
            NL:
                'Heel goed. De paspoortuitgifte is nu opgenomen in het scenario. Er is echter nog één' +
                ' laatste aanpassing te doen. De paspoortuitgifte vindt plaatst nádat John wijn heeft' +
                ' willen kopen, dus stap 1 mislukt nog steeds.\n\n' +
                'Je kunt de volgorde van stappen veranderen door ze te slepen.\n\n' +
                '**Sleep de paspoortuitgifte naar het begin om verder te gaan.**',
            EN: '',
        },
        nextEnabled: false,
        onStateChange: (ctx) => {
            if (selectStepDescs(ctx.state).findIndex((s) => s.action.type === passportIssuanceTypeName) === 0) {
                ctx.next();
            }
        },
    },
    {
        title: {
            NL: 'Geslaagd!',
            EN: '',
        },
        message: {
            NL:
                'Top! Het scenario is compleet!\n\n' +
                '**Dit was de rondleiding. Hierna volgen nog enkele tips. Veel plezier met de Identity Game!**',
            EN: '',
        },
        nextEnabled: true,
    },
    {
        title: {
            NL: 'Tip: projectbeheer en import/export',
            EN: '',
        },
        message: {
            NL:
                "Je kunt scenario's opslaan als bestanden en ze op die manier met anderen uitwisselen." +
                ' In het bestandsmenu links zie je een overzicht van alle projecten die tijdelijk in je browser' +
                ' staan opgeslagen. In dit menu kun je nieuwe projecten aanmaken, ze exporteren en importeren.',
            EN: '',
        },
        nextEnabled: true,
        onActivate: (ctx) => ctx.dispatch(GameActions.OPEN_PROJECT_DRAWER()),
        beforeNext: (ctx) => ctx.dispatch(GameActions.CLOSE_PROJECT_DRAWER()),
        highlight: { q: `#project-drawer` },
    },

    {
        onActivate: (ctx) => ctx.dispatch(GameActions.CLOSE_PROJECT_DRAWER()),
        title: {
            NL: 'Tip: Sneltoetsen',
            EN: '',
        },
        message: {
            NL:
                'Diverse sneltoetsen zijn beschikbaar om snel' +
                ' door de Identity Game te navigeren:\n' +
                '-   Deselecteren: `escape` \n' +
                '-   Ongedaan maken: `ctrl+z` \n' +
                '-   Opnieuw: `ctrl+y` of `ctrl+shift+z` \n' +
                '-   Vorige actie: `links` of `omhoog` \n' +
                '-   Volgende actie: `rechts` of `omlaag` \n' +
                '-   Naar begintoestand: `ctrl+links` of `ctrl+omhoog` of `0` \n' +
                '-   Naar laatste actie: `ctrl+rechts` of `ctrl+omlaag` \n' +
                '-   Naar acties 1 t/m 9: `1` t/m `9` \n' +
                '-   Open het menu Info: `z` \n' +
                '-   Open het menu Actoren: `x` \n' +
                '-   Open het menu Assetdetails: `c` \n' +
                '-   Open het menu Acties: `v` \n' +
                '-   Open het menu Actiedetails: `b` \n' +
                '-   Open het menu Instellingen: `n` \n' +
                '-   Toon handleiding: `h` \n',
            EN: '',
        },
        nextEnabled: true,
        highlight: { q: `.sidebar-menu` },
    },
    {
        title: {
            NL: 'Tip: Handleiding',
            EN: '',
        },
        message: {
            NL: 'Alles nog eens rustig nalezen? Klik op het vraagteken om de handleiding te tonen.',
            EN: '',
        },
        nextEnabled: true,
        highlight: { q: `#btn-help` },
    },
];
