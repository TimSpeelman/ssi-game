import { Dictionary } from '../Dict';

export const DictionaryNL: Dictionary = {
    step: 'Stap',
    outOf: 'van',
    steps: 'Stappen',
    addStep: 'Stap Toevoegen',
    msgYouHaveNoActors:
        'Je hebt nog geen actoren. Voordat je je scenario kunt opbouwen moet je eerst actoren toevoegen.',
    goToActors: 'Naar Actoren',
    stepSequence_msgYouHaveNoSteps: 'Je hebt nog geen stappen. Voeg stappen toe om een scenario te beschrijven.',
    startingState: 'Begintoestand',
    initialStateInspector_msgNavigateSteps: 'Navigeer door de stappen om hier gedetailleerde informatie te zien.',
    initialStateInspector_msgYouHaveNoSteps: 'Je hebt nog geen stappen. Maak eerst een stap aan.',

    /** Step Inspector */
    msgStepIsFailing: 'Deze stap mislukt..',
    titleOutcomes: 'Uitkomsten',
    emptyListIndicator: 'geen',

    /** Actor Inspector */
    allActors: 'Alle actoren',
    selectedActor: 'Geselecteerde Actor',
    assets: 'Assets',
    btnAddAsset: 'Asset Toevoegen',

    kindFeature: 'Kenmerk',
    kindData: 'Gegevens',
    kindPhysical: 'Fysieke Zaken',
    kindSoftware: 'Software',
    kindFlag: 'Vlaggen',

    /** Actor List */
    titleActors: 'Actoren',
    btnAddActor: 'Actor Toevoegen',
    actorList_msgYouHaveNoActors: 'Je hebt nog geen actoren. Voeg een actor toe.',

    /** 0: actor name */
    actorList_msgFirstRemoveActionsOfActorX: 'Verwijder eerst alle acties waar {0} in is betrokken.',
    /** 0: actor name */
    actorList_hintRemoveActorX: '{0} verwijderen.',

    /** Asset Inspector */
    msgNoAssetSelected: 'Geen asset geselecteerd',
    /** 0: actor name */
    assetsOfX: 'Assets van {0}',
    selectedAsset: 'Geselecteerde asset',
    assetContent: 'Inhoud',
    btnAddChildAsset: 'Toevoegen',

    assetPanel_msgSelectAnAsset: 'Selecteer een asset om de details ervan hier te bekijken.',

    author: 'Auteur',
    btnEditScenarioMeta: 'Bewerken',
    btnClose: 'Sluiten',

    metaDialog_title: 'Scenario-omschrijving Aanpassen',
    metaDialog_explanation: 'Pas de omschrijving aan:',

    btnSave: 'Opslaan',
    btnAdd: 'Toevoegen',
    btnCancel: 'Annuleren',

    titleOptions: 'Instellingen',
    btnHideSnackbar: 'Verberg Meldingen',
    btnShowSnackbar: 'Toon Meldingen',

    titleCreateActor: 'Actor Maken',
    titleEditActor: 'Actor Bewerken',
    labelActorType: 'Actortype',
    labelActorName: 'Naam',
    labelActorDescription: 'Beschrijving',

    titleCreateAsset: 'Asset Maken',
    titleEditAsset: 'Asset Bewerken',
    labelAssetType: 'Assettype',

    titleCreateStep: 'Step Maken',
    titleEditStep: 'Stap Bewerken',
    labelStepType: 'Handeling',

    networkCanvasPage_msgStepXFails: 'string',

    app_msgConfirmClear: 'Weet je zeker dat je alles wilt wissen?',
    app_msgConfirmReset: 'Weet je zeker dat je alles terug wilt zetten?',
    app_msgFileLoaded: 'Bestand is geladen!',
    btnClear: 'Legen',
    btnReset: 'Reset',
    btnSaveToFile: 'Opslaan',
    btnLoadFromFile: 'Laden',
};
