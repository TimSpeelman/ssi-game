/**
 * Smoke Test
 *
 * This smoke test takes a scenario and tries a mutation of every type
 * to see if any crashes occur.
 */
import { cleanup, render } from '@testing-library/react';
import React from 'react';
import { Issuance } from '../../content/DigitalIdentity1/actions/Issuance';
import { Pseudonym } from '../../content/DigitalIdentity1/assets/Pseudonym';
import { ContentLibraryDisplayScenario } from '../../content/DigitalIdentity1/scenarios/ContentLibraryDisplay';
import { ActorConfig } from '../../model/definition/Actor/ActorConfig';
import { ActorDef } from '../../model/definition/Actor/ActorDef';
import { GameActions } from '../../state/actions';
import { ProjectActions } from '../../state/project/actions';
import { selectAssetDefinitions, selectListActorDefs, selectStepDescs } from '../../state/selectors';
import { App } from '../App';
import { SidebarTab } from '../components/Sidebar/SidebarTab';
import { store } from '../store';

afterEach(cleanup);

it('does not crash', () => {
    render(<App />);
});

it('smoke test', () => {
    render(<App />);

    // We use the Content Library Display Scenario to ensure we have all the content
    store.dispatch(
        GameActions.CREATE_PROJECT({
            id: 'TESTPROJECT',
            name: '',
            definition: ContentLibraryDisplayScenario,
        }),
    );
    store.dispatch(GameActions.ACTIVATE_PROJECT({ id: 'TESTPROJECT' }));

    const actors = selectListActorDefs(store.getState());

    const manipulations = getManipulations(actors);

    activateEveryItem();

    // After every manipulation, we retry selecting/activating every item
    for (const m of manipulations) {
        m();
        activateEveryItem();
    }
});

/** Select all actors and assets, and navigates to every step to see if there is smoke */
function activateEveryItem() {
    const tabs = Object.values(SidebarTab);
    const steps = selectStepDescs(store.getState());
    const actors = selectListActorDefs(store.getState());
    const assets = Object.values(selectAssetDefinitions(store.getState()));

    // Open all tabs of the sidebar
    for (const tab of tabs) {
        store.dispatch(GameActions.NAVIGATE_SIDEBAR({ to: tab as SidebarTab }));
    }

    store.dispatch(ProjectActions.FIRST_STEP());
    store.dispatch(ProjectActions.NEXT_STEP());
    store.dispatch(ProjectActions.LAST_STEP());
    store.dispatch(ProjectActions.PREV_STEP());

    // Repeat for each Step in the scenario
    for (let index = -1; index < steps.length; index++) {
        store.dispatch(ProjectActions.GOTO_STEP_INDEX({ index }));

        store.dispatch(ProjectActions.CLEAR_SELECTION());

        // Select each actor
        for (const actor of actors) {
            store.dispatch(ProjectActions.SELECT_ACTOR({ id: actor.id }));
        }

        // Select each asset
        for (const asset of assets) {
            store.dispatch(ProjectActions.SELECT_ASSET({ id: asset.id }));
        }
    }
}

function getManipulations(actors: ActorConfig[]): Array<() => void> {
    const res: Array<() => void> = [];

    // Add an actor
    const actor: ActorDef = {
        id: 'TEST',
        name: 'TEST',
        nounPhrase: '',
        properties: [],
        type: {
            id: 'X',
            image: { type: 'image', url: '' },
            isHuman: true,
            isMale: true,
            typeName: 'X',
        },
    };

    res.push(() =>
        store.dispatch(
            ProjectActions.ADD_ACTOR({
                actor: {
                    definition: actor,
                    id: 'TEST',
                    initialAssets: [],
                },
            }),
        ),
    );

    // Update the actor
    res.push(() => store.dispatch(ProjectActions.UPDATE_ACTOR_DEFINITION({ def: { ...actor, name: 'TEST2' } })));

    // Select the actor
    res.push(() => store.dispatch(ProjectActions.SELECT_ACTOR({ id: actor.id })));

    // Remove the actor
    res.push(() => store.dispatch(ProjectActions.REMOVE_ACTOR({ id: 'TEST' })));

    // Reorder actors
    res.push(() => store.dispatch(ProjectActions.REORDER_ACTORS({ fromIndex: 0, toIndex: 1 })));

    // Add an asset
    res.push(() =>
        store.dispatch(
            ProjectActions.ADD_ASSET({
                actorId: actors[0].id,
                asset: new Pseudonym('TEST_NYM', {
                    identifier: 'XYZ',
                    image: 'cow',
                    subject: actors[0].id,
                }).serialize(),
            }),
        ),
    );

    // Update the asset
    res.push(() =>
        store.dispatch(
            ProjectActions.UPDATE_ASSET({
                actorId: actors[0].id,
                asset: new Pseudonym('TEST_NYM', {
                    identifier: 'ABC',
                    image: 'cow',
                    subject: actors[0].id,
                }).serialize(),
            }),
        ),
    );

    // Select the asset
    res.push(() => store.dispatch(ProjectActions.SELECT_ASSET({ id: 'TEST_NYM' })));

    // Remove the asset
    res.push(() => store.dispatch(ProjectActions.REMOVE_ASSET({ actorId: actors[0].id, id: 'TEST_NYM' })));

    // Add a step
    res.push(() =>
        store.dispatch(
            ProjectActions.ADD_STEP({
                afterIndex: 2,
                step: new Issuance('TEST_STEP', {
                    attributeName: '',
                    attributeValue: '',
                    explanation: '',
                    issuer: actors[0].id,
                    subject: actors[0].id,
                    issuerNym: undefined,
                    subjectNym: undefined,
                }).serialize(),
            }),
        ),
    );

    // Update the step
    res.push(() =>
        store.dispatch(
            ProjectActions.UPDATE_STEP({
                step: new Issuance('TEST_STEP', {
                    attributeName: 'ABC',
                    attributeValue: 'DEF',
                    explanation: '',
                    issuer: actors[0].id,
                    subject: actors[1].id,
                    issuerNym: undefined,
                    subjectNym: undefined,
                }).serialize(),
            }),
        ),
    );

    // Activate the step
    res.push(() => store.dispatch(ProjectActions.GOTO_STEP({ id: 'TEST_STEP' })));

    // Remove the step
    res.push(() => store.dispatch(ProjectActions.REMOVE_STEP({ id: 'TEST_STEP' })));

    // Update the scenario meta data
    res.push(() =>
        store.dispatch(
            ProjectActions.UPDATE_META({
                meta: {
                    author: 'A',
                    body: '# Title \n Hello **World. Bye **world**',
                    title: '## TEST',
                },
            }),
        ),
    );

    res.push(() => store.dispatch(ProjectActions.HIDE_META()));
    res.push(() => store.dispatch(ProjectActions.SHOW_META()));

    return res;
}
