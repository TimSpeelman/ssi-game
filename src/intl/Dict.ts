export interface Dictionary {
    step: string;
    steps: string;
    stepXOutOfY: string;
    startingState: string;
    author: string;

    networkCanvasPage: {
        msgStepXFails: string;
    };

    stepSequence: {
        addStep: string;
        msgYouHaveNoActors: string;
        goToActors: string;
        stepSequence_msgYouHaveNoSteps: string;
    };

    initialStateInspector: {
        msgNavigateSteps: string;
        msgYouHaveNoSteps: string;
    };

    stepInspector: {
        msgPreviousStepIsFailing: {
            title: string;
            messageFailsAtX: string;
        };
        msgStepIsFailing: string;
        titleOutcomes: string;
    };

    misc: {
        emptyListIndicator: string;
        btnClose: string;
        btnAdd: string;
        btnSave: string;
        btnCancel: string;
        btnEdit: string;
        btnShow: string;
    };

    actorInspector: {
        allActors: string;
        selectedActor: string;
        actorProperties: string;
        btnEditProperties: string;
        assets: string;
        btnAddAsset: string;
        thPropertyName: string;
        thPropertyValue: string;
    };

    assetKind: {
        feature: string;
        data: string;
        physical: string;
        software: string;
        flag: string;
    };

    actorList: {
        titleActors: string;
        btnAddActor: string;
        msgYouHaveNoActors: string;
        msgFirstRemoveActionsOfActorX: string;
        hintRemoveActorX: string;
    };

    assetPanel: {
        msgNoAssetSelected: {
            title: string;
            description: string;
        };
    };

    assetInspector: {
        assetsOfX: string;
        selectedAsset: string;
        assetContent: string;
        btnAddChildAsset: string;
    };

    metaDialog: {
        title: string;
        explanation: string;
        labelTitle: string;
        labelAuthor: string;
        labelBody: string;
    };

    optionPanel: {
        titleOptions: string;
        btnHideSnackbar: string;
        btnShowSnackbar: string;
    };

    actorDefinitionDialog: {
        titleCreateActor: string;
        titleEditActor: string;
        labelActorType: string;
        labelActorName: string;
        labelActorDescription: string;
    };

    editActorPropsDialog: {
        title: string;
        thPropertyName: string;
        thPropertyValue: string;
    };

    assetDialog: {
        titleCreateAsset: string;
        titleEditAsset: string;
        labelAssetType: string;
    };

    actionDialog: {
        titleCreateStep: string;
        titleEditStep: string;
        labelStepType: string;
    };

    projectDrawer: {
        msgConfirmDeleteProject: string;
        msgFileLoaded: string;
        btnSaveToFile: string;
        btnLoadFromFile: string;
        copyOfX: string;
        btnNewProject: string;
        titleActiveProject: string;
        titleSavedProjects: string;
        titleTemplates: string;
    };

    untitled: string;
    untitledProject: string;

    userManual: string;
}
