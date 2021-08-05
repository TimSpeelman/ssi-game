export interface Dictionary {
    issuer: string;
    verifier: string;
    subject: string;
    attribute: string;
    attributeName: string;
    attributeValue: string;
    pseudonym: string;
    issuerPseudonym: string;
    subjectPseudonym: string;
    subjectPassport: string;
    verifierPseudonym: string;
    fromActor: string;
    toActor: string;
    description: string;

    name: string;
    firstName: string;
    dateOfBirth: string;
    placeOfIssuance: string;
    placeOfBirth: string;
    dateOfIssuance: string;
    dateOfExpiry: string;
    height: string;
    documentNumber: string;
    nationality: string;
    identifier: string;

    step: string;
    /** As in '3 out of 5' */
    outOf: string;
    steps: string;
    addStep: string;
    msgYouHaveNoActors: string;
    goToActors: string;
    stepSequence_msgYouHaveNoSteps: string;
    startingState: string;

    // Initial State Inspector

    initialStateInspector_msgNavigateSteps: string;
    initialStateInspector_msgYouHaveNoSteps: string;

    // Step Inspector

    msgStepIsFailing: string;
    titleOutcomes: string;
    emptyListIndicator: string;

    // Actor Inspector

    allActors: string;
    selectedActor: string;
    actorProperties: string;
    btnEditProperties: string;
    assets: string;
    btnAddAsset: string;

    kindFeature: string;
    kindData: string;
    kindPhysical: string;
    kindSoftware: string;
    kindFlag: string;

    // Actor List

    titleActors: string;
    btnAddActor: string;
    actorList_msgYouHaveNoActors: string;

    actorList_msgFirstRemoveActionsOfActorX: string;
    actorList_hintRemoveActorX: string;

    // Asset Inspector

    msgNoAssetSelected: string;
    assetsOfX: string;
    selectedAsset: string;
    assetContent: string;
    btnAddChildAsset: string;

    assetPanel_msgSelectAnAsset: string;

    author: string;
    btnEditScenarioMeta: string;
    btnClose: string;

    metaDialog_title: string;
    metaDialog_explanation: string;

    btnAdd: string;
    btnSave: string;
    btnCancel: string;

    titleOptions: string;
    btnHideSnackbar: string;
    btnShowSnackbar: string;

    titleCreateActor: string;
    titleEditActor: string;
    labelActorType: string;
    labelActorName: string;
    labelActorDescription: string;

    titleCreateAsset: string;
    titleEditAsset: string;
    labelAssetType: string;

    titleCreateStep: string;
    titleEditStep: string;
    labelStepType: string;

    networkCanvasPage_msgStepXFails: string;

    app_msgConfirmClear: string;
    app_msgConfirmReset: string;
    app_msgConfirmDeleteProject: string;
    app_msgFileLoaded: string;
    btnSaveToFile: string;
    btnLoadFromFile: string;

    untitled: string;
    untitledProject: string;

    userManual: string;
}
