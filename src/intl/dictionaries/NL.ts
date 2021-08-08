import { Dictionary } from '../Dict';

export const DictionaryNL: Dictionary = {
    step: 'Stap',
    steps: 'Stappen',
    stepXOutOfY: 'Stap {0} van {1}',
    startingState: 'Begintoestand',
    author: 'Auteur',
    untitled: 'Naamloos',
    untitledProject: 'Naamloos Project',

    userManual: 'Gebruikershandleiding',

    networkCanvasPage: {
        msgStepXFails: 'Scenario faalt bij stap {0}',
    },

    stepSequence: {
        addStep: 'Stap Toevoegen',
        msgYouHaveNoActors:
            'Je hebt nog geen actoren. Voordat je je scenario kunt opbouwen moet je eerst actoren toevoegen.',
        goToActors: 'Naar Actoren',
        stepSequence_msgYouHaveNoSteps: 'Je hebt nog geen stappen. Voeg stappen toe om een scenario te beschrijven.',
    },

    initialStateInspector: {
        msgNavigateSteps: 'Navigeer door de stappen om hier gedetailleerde informatie te zien.',
        msgYouHaveNoSteps: 'Je hebt nog geen stappen. Maak eerst een stap aan.',
    },

    stepInspector: {
        msgStepIsFailing: 'Deze stap mislukt..',
        titleOutcomes: 'Uitkomsten',
    },

    misc: {
        emptyListIndicator: 'geen',
        btnClose: 'Sluiten',
        btnSave: 'Opslaan',
        btnAdd: 'Toevoegen',
        btnCancel: 'Annuleren',
        btnEdit: 'Bewerken',
        btnShow: 'Tonen',
    },

    actorInspector: {
        allActors: 'Alle actoren',
        selectedActor: 'Geselecteerde Actor',
        actorProperties: 'Eigenschappen',
        btnEditProperties: 'Eigenschappen Bewerken',
        assets: 'Assets',
        btnAddAsset: 'Asset Toevoegen',
        thPropertyName: 'Eigenschap',
        thPropertyValue: 'Waarde',
    },

    assetKind: {
        feature: 'Kenmerken',
        data: 'Gegevens/kennis in bezit',
        physical: 'Fysieke Zaken in bezit',
        software: 'Software in bezit',
        flag: 'Vlaggen in bezit',
    },

    actorList: {
        titleActors: 'Actoren',
        btnAddActor: 'Actor Toevoegen',
        msgYouHaveNoActors: 'Je hebt nog geen actoren. Voeg een actor toe.',
        msgFirstRemoveActionsOfActorX: 'Verwijder eerst alle acties waar {0} in is betrokken.',
        hintRemoveActorX: '{0} verwijderen.',
    },

    assetPanel: {
        msgNoAssetSelected: {
            title: 'Geen asset geselecteerd',
            description: 'Selecteer een asset om de details ervan hier te bekijken.',
        },
    },

    assetInspector: {
        assetsOfX: 'Assets van {0}',
        selectedAsset: 'Geselecteerde asset',
        assetContent: 'Inhoud',
        btnAddChildAsset: 'Toevoegen',
    },

    metaDialog: {
        title: 'Scenario-omschrijving Aanpassen',
        explanation: 'Pas de omschrijving aan:',
        labelTitle: 'Titel',
        labelAuthor: 'Auteur',
        labelBody: 'Omschrijving',
    },

    optionPanel: {
        titleOptions: 'Instellingen',
        btnHideSnackbar: 'Verberg Meldingen',
        btnShowSnackbar: 'Toon Meldingen',
    },

    actorDefinitionDialog: {
        titleCreateActor: 'Actor Maken',
        titleEditActor: 'Actor Bewerken',
        labelActorType: 'Actortype',
        labelActorName: 'Naam',
        labelActorDescription: 'Beschrijving',
    },

    editActorPropsDialog: {
        title: 'Actoreigenschappen Bewerken',
        thPropertyName: 'Eigenschap',
        thPropertyValue: 'Waarde',
    },

    assetDialog: {
        titleCreateAsset: 'Asset Maken',
        titleEditAsset: 'Asset Bewerken',
        labelAssetType: 'Assettype',
    },

    actionDialog: {
        titleCreateStep: 'Stap Maken',
        titleEditStep: 'Stap Bewerken',
        labelStepType: 'Handeling',
    },

    projectDrawer: {
        msgConfirmDeleteProject: 'Weet je zeker dat je dit project wilt verwijderen?',
        msgFileLoaded: 'Bestand is geladen!',
        btnSaveToFile: 'Opslaan',
        btnLoadFromFile: 'Laden',
        copyOfX: 'Kopie van {0}',
        btnNewProject: 'Nieuw Project',
        titleActiveProject: 'Huidig Project',
        titleSavedProjects: 'Opgeslagen Projecten',
        titleTemplates: 'Sjablonen',
    },
};
