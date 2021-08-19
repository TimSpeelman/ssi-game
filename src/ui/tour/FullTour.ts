import { GameActions } from '../../state/actions';
import { ProjectActions } from '../../state/project/actions';
import {
    selectActiveSidebarTab,
    selectActiveStepIndex,
    selectSelectedActorId,
    selectSelectedAssetId,
} from '../../state/selectors';
import { SidebarTab } from '../components/Sidebar/SidebarTab';
import { TourStep } from './TourStep';

const actorJohnID = 'human_1';
const assetPassportID = 'subject-passport-1';
const authResID = '11';

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
                'Het "canvas" is het hoofdpodium van de Identity Game.' +
                ' Hierop wordt een **momentopname** schematisch afgebeeld.\n\n' +
                'We zien in dit scenario twee actoren: John en de slijterij.' +
                ' Bij John staat een **paspoort**. Dat betekent dat John,' +
                ' op dit moment in het scenario, beschikt over een paspoort.\n\n' +
                '**Klik op volgende.**',
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
    {
        title: {
            NL: 'Tip: Sneltoetsen',
            EN: '',
        },
        message: {
            NL:
                'Diverse sneltoetsen zijn beschikbaar om snel' +
                ' door de Identity Game te navigeren. In de handleiding' +
                ' (achter het vraagteken) vind je onderstaand overzicht' +
                ' snel terug:\n' +
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
];
