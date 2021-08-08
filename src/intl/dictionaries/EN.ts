import { Dictionary } from '../Dict';

export const DictionaryEN: Dictionary = {
    step: 'Step',
    steps: 'Steps',
    stepXOutOfY: 'Step {0} out of {1}',
    startingState: 'Starting State',
    author: 'Author',

    untitled: 'Untitled',
    untitledProject: 'Untitled Project',

    userManual: 'User Manual',

    networkCanvasPage: {
        msgStepXFails: 'Scenario fails at step {0}',
    },

    stepSequence: {
        addStep: 'Add Step',
        msgYouHaveNoActors: 'You have no actors yet. Before you can build your scenario, please add actors first.',
        goToActors: 'Go To Actors',
        stepSequence_msgYouHaveNoSteps: 'You have no steps yet. Please add steps to build your scenario.',
    },

    initialStateInspector: {
        msgNavigateSteps: 'Navigate through steps to see detailed information here.',
        msgYouHaveNoSteps: 'You have no steps yet. Add a step to see its details here.',
    },

    stepInspector: {
        msgStepIsFailing: 'This step fails.',
        titleOutcomes: 'Outcomes',
    },

    misc: {
        emptyListIndicator: 'none',
        btnClose: 'Close',
        btnSave: 'Save',
        btnAdd: 'Add',
        btnCancel: 'Cancel',
        btnEdit: 'Edit',
    },

    actorInspector: {
        allActors: 'All Actors',
        selectedActor: 'Selected Actor',
        actorProperties: 'Properties',
        btnEditProperties: 'Edit Properties',
        assets: 'Assets',
        btnAddAsset: 'Add Asset',
    },

    assetKind: {
        feature: 'Feature',
        data: 'Data',
        physical: 'Physical Things',
        software: 'Software',
        flag: 'Flags',
    },

    actorList: {
        titleActors: 'Actors',
        btnAddActor: 'Add Actor',
        msgYouHaveNoActors: 'You have no actors yet. Add an actor to start building your scenario.',
        msgFirstRemoveActionsOfActorX: 'First remove all actions in which {0} is involved.',
        hintRemoveActorX: 'remove {0}.',
    },

    assetPanel: {
        msgNoAssetSelected: {
            title: 'No asset selected',
            description: 'Select an asset to view its details here.',
        },
    },

    assetInspector: {
        assetsOfX: 'Assets of {0}',
        selectedAsset: 'Selected asset',
        assetContent: 'Contents',
        btnAddChildAsset: 'Add',
    },

    metaDialog: {
        title: 'Change Scenario Description',
        explanation: 'You can change the scenario description here.',
    },

    optionPanel: {
        titleOptions: 'Settings',
        btnHideSnackbar: 'Hide Notifications',
        btnShowSnackbar: 'Show Notifications',
    },

    actorDefinitionDialog: {
        titleCreateActor: 'Create Actor',
        titleEditActor: 'Edit Actor',
        labelActorType: 'Actor Type',
        labelActorName: 'Name',
        labelActorDescription: 'Description',
    },

    assetDialog: {
        titleCreateAsset: 'Create Asset',
        titleEditAsset: 'Edit Asset',
        labelAssetType: 'Asset Type',
    },

    actionDialog: {
        titleCreateStep: 'Create Step',
        titleEditStep: 'Edit Step',
        labelStepType: 'Step Type',
    },

    projectDrawer: {
        msgConfirmDeleteProject: 'Are you sure you wish to delete this project?',
        msgFileLoaded: 'File was successfully loaded!',
        btnSaveToFile: 'Save',
        btnLoadFromFile: 'Load',
    },
};
