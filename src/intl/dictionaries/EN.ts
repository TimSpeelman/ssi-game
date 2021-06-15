import { Dictionary } from '../Dict';

export const DictionaryEN: Dictionary = {
    step: 'Step',
    outOf: 'out of',
    steps: 'Steps',
    addStep: 'Add Step',
    msgYouHaveNoActors: 'You have no actors yet. Before you can build your scenario, please add actors first.',
    goToActors: 'Go To Actors',
    stepSequence_msgYouHaveNoSteps: 'You have no steps yet. Please add steps to build your scenario.',
    startingState: 'Starting State',

    initialStateInspector_msgNavigateSteps: 'Navigate through steps to see detailed information here.',
    initialStateInspector_msgYouHaveNoSteps: 'You have no steps yet. Add a step to see its details here.',

    /** Step Inspector */
    msgStepIsFailing: 'This step fails.',
    titleOutcomes: 'Outcomes',
    emptyListIndicator: 'none',

    /** Actor Inspector */
    allActors: 'All Actors',
    selectedActor: 'Selected Actor',
    assets: 'Assets',
    btnAddAsset: 'Add Asset',

    kindFeature: 'Feature',
    kindData: 'Data',
    kindPhysical: 'Physical Things',
    kindSoftware: 'Software',
    kindFlag: 'Flags',

    /** Actor List */
    titleActors: 'Actors',
    btnAddActor: 'Add Actor',
    actorList_msgYouHaveNoActors: 'You have no actors yet. Add an actor to start building your scenario.',

    /** 0: actor name */
    actorList_msgFirstRemoveActionsOfActorX: 'First remove all actions in which {0} is involved.',
    /** 0: actor name */
    actorList_hintRemoveActorX: 'remove {0}.',

    /** Asset Inspector */
    msgNoAssetSelected: 'No asset selected',
    /** 0: actor name */
    assetsOfX: 'Assets of {0}',
    selectedAsset: 'Selected asset',
    assetContent: 'Contents',
    btnAddChildAsset: 'Add',

    assetPanel_msgSelectAnAsset: 'Select an asset to view its details here.',

    author: 'Author',
    btnEditScenarioMeta: 'Edit',
    btnClose: 'Close',

    metaDialog_title: 'Change Scenario Description',
    metaDialog_explanation: 'You can change the scenario description here.',

    btnSave: 'Save',
    btnAdd: 'Add',
    btnCancel: 'Cancel',

    titleOptions: 'Settings',
    btnHideSnackbar: 'Hide Notifications',
    btnShowSnackbar: 'Show Notifications',

    titleCreateActor: 'Create Actor',
    titleEditActor: 'Edit Actor',
    labelActorType: 'Actor Type',
    labelActorName: 'Name',
    labelActorDescription: 'Description',

    titleCreateAsset: 'Create Asset',
    titleEditAsset: 'Edit Asset',
    labelAssetType: 'Asset Type',

    titleCreateStep: 'Create Step',
    titleEditStep: 'Edit Step',
    labelStepType: 'Step Type',

    networkCanvasPage_msgStepXFails: 'Scenario fails at step {0}',

    app_msgConfirmClear: 'Are you sure you wish to clear this scenario?',
    app_msgConfirmReset: 'Are you sure you wish to reset this scenario to its defaults?',
    app_msgFileLoaded: 'File was successfully loaded!',
    btnClear: 'Clear',
    btnReset: 'Reset',
    btnSaveToFile: 'Save',
    btnLoadFromFile: 'Load',
};
