import { TourScenario } from '../../../content/DigitalIdentity1/scenarios/TourScenario';
import { GameActions } from '../../../state/actions';
import { ProjectActions } from '../../../state/project/actions';
import {
    selectActiveSidebarTab,
    selectActiveStepIndex,
    selectEditing,
    selectSelectedActorId,
    selectSelectedAssetId,
} from '../../../state/selectors';
import { SidebarTab } from '../../components/Sidebar/SidebarTab';
import { Tour } from '../Tour';
import { Context, IndexType } from '../TourStep';

const actorJohnID = 'human_1';
const authResID = '11';

export const ViewersTour: Tour = {
    title: {
        NL: 'Rondleiding Identity Game - Introductie',
        EN: 'Guided Tour Identity Game - Introduction',
    },
    steps: [
        {
            title: {
                NL: 'Rondleiding - Eerste Introductie',
                EN: 'Guided Tour - First Introduction',
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
                ctx.dispatch(
                    GameActions.CREATE_PROJECT({
                        id: 'tour',
                        definition: TourScenario,
                        name: 'Rondleiding',
                    }),
                );
                ctx.dispatch(GameActions.ACTIVATE_PROJECT({ id: 'tour' }));
                navSidebar(ctx, SidebarTab.INFO);
                toggleEditing(ctx, false);
                gotoStepIndex(ctx, -1);
            },
            indexType: IndexType.NONE,
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
                    ' verhaal, waarin identiteitsmiddelen' +
                    ' moeten worden ingezet om een bepaald doel te' +
                    ' bereiken.\n\n' +
                    'In het **info-menu** (rechts)' +
                    ' lees je de beschrijving' +
                    ' van dit scenario.' +
                    ' Voor deze rondleiding gebruiken we een heel' +
                    ' simpel scenario: het kopen van alcohol in een' +
                    ' fysieke slijterij. \n\n' +
                    '**Druk op volgende.**',
                EN: '',
            },
            nextEnabled: true,
            highlight: { q: '.sidebar-main' },
            onActivate: (ctx) => {
                navSidebar(ctx, SidebarTab.INFO);
                gotoStepIndex(ctx, -1);
            },
            onStateChange: (ctx) => ctx.reactivate(),
        },
        {
            title: {
                NL: 'Canvas',
                EN: '',
            },
            message: {
                NL:
                    'Op het "canvas" wordt een situatie afgebeeld. Er zijn drie soorten elementen:\n' +
                    '1. **Actoren** zijn de mensen en organisaties die bij dit scenario zijn betrokken.\n' +
                    '2. **Assets** zijn de relevante kennis en middelen waar zij over beschikken.\n' +
                    '3. **Acties** zijn de acties die zij, alleen of samen, uitvoeren om een doel te bereiken.\n\n' +
                    'Het canvas laat nu de **beginsituatie** van dit scenario zien. ' +
                    ' Er zijn twee actoren, John en de slijterij en John beschikt over een **paspoort** (asset).' +
                    ' In de beginsituatie wordt nog géén actie uitgevoerd.' +
                    '\n\n**Klik op volgende.**',
                EN: '',
            },
            nextEnabled: true,
            highlight: { q: '#network-svg-root', expand: 1 },
            onActivate: (ctx) => {
                gotoStepIndex(ctx, -1);
            },
            onStateChange: (ctx) => ctx.reactivate(),
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
                    ' _**Tip:** navigeer sneller door de tijd met de pijltjestoetsen._\n\n' +
                    '**Ga naar Stap 1 en klik op volgende.**',
                EN: '',
            },
            nextEnabled: (s) => selectActiveStepIndex(s) === 0,
            highlight: { q: '.time-navigation', expand: 1 },
            onActivate: (ctx) => {
                gotoStepIndex(ctx, -1);
            },
        },
        {
            title: {
                NL: 'Interactie',
                EN: '',
            },
            message: {
                NL:
                    'Het canvas laat nu **stap 1** van het scenario zien. In deze stap' +
                    ' gaat John naar de slijterij en laat daar zijn fysieke paspoort zien.' +
                    ' Als gevolg daarvan heeft de slijterij nieuwe kennis over John' +
                    ' vergaard, namelijk kennis over wie hij is.' +
                    ' Dit is te zien aan het nieuwe icoon dat naast de slijterij is' +
                    ' verschenen. Daarover later meer.\n\n' +
                    '**Klik op volgende.**',
                EN: '',
            },
            nextEnabled: true,
            highlight: { q: '#network-svg-root', expand: 1 },
            onActivate: (ctx) => {
                gotoStepIndex(ctx, 0);
            },
            onStateChange: (ctx) => ctx.reactivate(),
        },
        {
            title: {
                NL: 'Stapinformatie',
                EN: '',
            },
            message: {
                NL:
                    'Deze stap wordt toegelicht in het zij-menu **stapdetails**.\n\n' +
                    `**Ga naar het zij-menu stapdetails om verder te gaan.**`,
                EN: '',
            },
            nextEnabled: false,
            highlight: { q: `#sidebar-menu-item-${SidebarTab.STEP}` },
            onStateChange: (ctx) => {
                if (selectActiveSidebarTab(ctx.state) === SidebarTab.STEP) {
                    ctx.next();
                } else {
                    ctx.reactivate();
                }
            },
            onActivate: (ctx) => {
                gotoStepIndex(ctx, 0);
            },
        },
        {
            title: {
                NL: 'Stapinformatie',
                EN: '',
            },
            message: {
                NL:
                    'Het zij-menu **stapdetails** toont de **stapinformatiekaart**' +
                    ' met een beschrijving van de actieve stap (nu stap 1).\n\n' +
                    'Onder de stapinformatiekaart staat een lijst **uitkomsten**,' +
                    ' de relevante gevolgen van de stap, zoals het verkrijgen of verliezen' +
                    ' van kennis en materialen. \n\n' +
                    'In dit geval heeft de Slijterij nieuwe kennis vergaard: een **authenticatieresultaat**.\n\n' +
                    '**Klik op "Authenticatieresultaat" om verder te gaan.**',
                EN: '',
            },
            indexType: IndexType.SAME_AS_PREVIOUS,
            nextEnabled: false,
            highlight: { q: `.sidebar-main` },
            onActivate: (ctx) => {
                navSidebar(ctx, SidebarTab.STEP);
                clearSelection(ctx);
                gotoStepIndex(ctx, 0);
            },
            onStateChange: (ctx) => {
                if (selectSelectedAssetId(ctx.state) === authResID) {
                    ctx.next();
                } else {
                    ctx.reactivate();
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
                    'Je hebt zojuist de asset "Authenticatieresultaat" geselecteerd.' +
                    ' In het zij-menu **assetdetails** vind je uitleg over deze asset.\n\n' +
                    '**Lees de omschrijving op de assetkaart (rechts) en klik hieronder op volgende.**',
                EN: '',
            },
            nextEnabled: true,
            highlight: { q: `.sidebar-main` },
            onActivate: (ctx) => {
                navSidebar(ctx, SidebarTab.ASSETS);
                gotoStepIndex(ctx, 0);

                selectAsset(ctx, authResID);
            },
            onStateChange: (ctx) => ctx.reactivate(),
        },
        {
            title: {
                NL: 'Tijdlijn',
                EN: '',
            },
            message: {
                NL:
                    'Om alle stappen in het scenario te zien ga je naar het zij-menu **tijdlijn**.\n\n' +
                    `**Ga naar het zij-menu tijdlijn om verder te gaan.**`,
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
            indexType: IndexType.SAME_AS_PREVIOUS,
            nextEnabled: false,
            onStateChange: (ctx) => {
                if (selectActiveSidebarTab(ctx.state) === SidebarTab.STEP && selectActiveStepIndex(ctx.state) === 1) {
                    ctx.next();
                } else {
                    ctx.reactivate();
                }
            },
            highlight: { q: `.sidebar` },
            onActivate: (ctx) => {
                navSidebar(ctx, SidebarTab.TIMELINE);
                gotoStepIndex(ctx, 0);
            },
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
            onActivate: (ctx) => {
                navSidebar(ctx, SidebarTab.STEP);
                gotoStepIndex(ctx, 1);
            },
            onStateChange: (ctx) => ctx.reactivate(),
        },
        {
            title: {
                NL: 'Actorinformatie',
                EN: '',
            },
            message: {
                NL:
                    'In het zij-menu **actoren** vind je meer informatie over' +
                    ' actoren. Selecteer John.\n\n' +
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
                    'Nu je John hebt geselecteerd zie je in het **actor-menu** meer informatie' +
                    ' over John.\n\n' +
                    '**Klik op volgende.**',
                EN: '',
            },
            indexType: IndexType.SAME_AS_PREVIOUS,
            onActivate: (ctx) => {
                navSidebar(ctx, SidebarTab.ACTORS);
                selectActor(ctx, actorJohnID);
            },
            nextEnabled: true,
            highlight: { q: '#sidebar-main' },
            onStateChange: (ctx) => ctx.reactivate(),
        },
        {
            title: {
                NL: 'Eigenschappen van een Actor',
                EN: '',
            },
            message: {
                NL:
                    'Deze tabel bevat _eigenschappen_ van deze actor' +
                    ' die voor dit scenario relevant zijn.\n\n' +
                    ' In dit voorbeeld is de geboortedatum van John' +
                    ' belangrijk.' +
                    ' De Identity Game gaat voornamelijk over kennis.' +
                    ' Om veilig zaken te kunnen doen moeten actoren' +
                    ' immers relevante en betrouwbare kennis over' +
                    ' elkaar kunnen verzamelen.\n\n' +
                    'Echter, kennis kan afwezig, verouderd of onjuist zijn.' +
                    ' Om duidelijk onderscheid te kunnen maken tussen de _feiten_' +
                    ' en wat Actoren _weten_ (of denken te weten) beschrijft deze' +
                    ' tabel de werkelijkheid.\n\n' +
                    '**Klik op volgende.**',
                EN: '',
            },
            onActivate: (ctx) => {
                navSidebar(ctx, SidebarTab.ACTORS);
                selectActor(ctx, actorJohnID);
            },
            onStateChange: (ctx) => ctx.reactivate(),
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
                    ' bezit.\n\n' +
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
                navSidebar(ctx, SidebarTab.ACTORS);
                selectActor(ctx, actorJohnID);
            },
            onStateChange: (ctx) => ctx.reactivate(),
        },
        {
            title: {
                NL: 'Einde',
                EN: 'The end',
            },
            message: {
                NL:
                    'Zo. Dit was de introductie van de Identity Game.' +
                    ' Je hebt gezien hoe je door een scenario kunt navigeren en ' +
                    ' meer informatie kunt vinden.\n\n' +
                    '**Vervolgstappen:**\n\n' +
                    "1. Leer hoe je zelf scenario's kunt bouwen.\n" +
                    "2. Bekijk voorbeeldscenario's.",
                EN: '',
            },
            indexType: IndexType.NONE,
            nextEnabled: false,
            // onActivate: (ctx) => {},
        },
    ],
};

function selectActor(ctx: Context, actorId: string) {
    if (selectSelectedActorId(ctx.state) !== actorId) {
        ctx.dispatch(ProjectActions.SELECT_ACTOR({ id: actorId }));
    }
}

function selectAsset(ctx: Context, assetId: string) {
    if (selectSelectedAssetId(ctx.state) !== assetId) {
        ctx.dispatch(ProjectActions.SELECT_ASSET({ id: assetId }));
    }
}

function gotoStepIndex(ctx: Context, index: number) {
    if (selectActiveStepIndex(ctx.state) !== index) {
        ctx.dispatch(ProjectActions.GOTO_STEP_INDEX({ index }));
    }
}

function toggleEditing(ctx: Context, editing: boolean | undefined) {
    if (editing === undefined || selectEditing(ctx.state) !== editing) {
        ctx.dispatch(GameActions.TOGGLE_EDITING({ editing }));
    }
}

function navSidebar(ctx: Context, to: SidebarTab) {
    if (selectActiveSidebarTab(ctx.state) !== to) {
        ctx.dispatch(GameActions.NAVIGATE_SIDEBAR({ to }));
    }
}

function clearSelection(ctx: Context) {
    if (selectSelectedAssetId(ctx.state) || selectSelectedActorId(ctx.state)) {
        ctx.dispatch(ProjectActions.CLEAR_SELECTION());
    }
}
