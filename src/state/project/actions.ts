import { ActionDef } from '../../model/definition/Action/ActionDef';
import { ActorConfig } from '../../model/definition/Actor/ActorConfig';
import { ActorDef } from '../../model/definition/Actor/ActorDef';
import { AssetDef } from '../../model/definition/Asset/AssetDef';
import { ScenarioDef } from '../../model/definition/Scenario/ScenarioDef';
import { ScenarioMeta } from '../../model/definition/Scenario/ScenarioMeta';
import { checkActionCreatorsRecord, event } from '../../util/redux';

export const ProjectActions = {
    RENAME_PROJECT: event<{ name: string }>('RENAME_PROJECT'),
    SET_SCENARIO: event<{ scenario: ScenarioDef }>('SET_SCENARIO'),
    SET_ACTORS: event<{ actors: ActorConfig[] }>('SET_ACTORS', true),

    // Definition Manipulation : Actors
    ADD_ACTOR: event<{ actor: ActorConfig }>('ADD_ACTOR', true),
    REMOVE_ACTOR: event<{ id: string }>('REMOVE_ACTOR', true),
    REORDER_ACTORS: event<{ sourceIndex: number; targetIndex: number }>('REORDER_ACTORS', true),
    UPDATE_ACTOR_DEFINITION: event<{ def: ActorDef }>('UPDATE_ACTOR_DEFINITION', true),

    // Definition Manipulation : Assets
    ADD_ASSET: event<{ actorId: string; asset: AssetDef }>('ADD_ASSET', true),
    UPDATE_ASSET: event<{ actorId: string; asset: AssetDef }>('UPDATE_ASSET', true),
    REMOVE_ASSET: event<{ actorId: string; id: string }>('REMOVE_ASSET', true),

    // Definition Manipulation : Steps
    INSERT_STEP: event<{ step: ActionDef<any>; index: number }>('INSERT_STEP', true),
    REMOVE_STEP: event<{ id: string }>('REMOVE_STEP', true),
    REORDER_STEPS: event<{ sourceIndex: number; targetIndex: number }>('REORDER_STEPS', true),
    UPDATE_STEP: event<{ step: ActionDef<any> }>('UPDATE_STEP', true),

    // Definition Manipulation : Meta
    CHANGE_META: event<{ meta: ScenarioMeta }>('CHANGE_META', true),

    // Selection
    CLEAR_SELECTION: event<void>('CLEAR_SELECTION'),
    SELECT_ACTOR: event<{ id: string }>('SELECT_ACTOR'),
    SELECT_ASSET: event<{ id: string }>('SELECT_ASSET'),
    SELECT_STEP: event<{ id: string }>('SELECT_STEP'),

    // Sequence Navigation
    GOTO_STEP: event<{ id: string | undefined }>('GOTO_STEP'),
    GOTO_STEP_INDEX: event<{ index: number }>('GOTO_STEP_INDEX'),
    NEXT_STEP: event<void>('NEXT_STEP'),
    PREV_STEP: event<void>('PREV_STEP'),
    FIRST_STEP: event<void>('FIRST_STEP'),
    LAST_STEP: event<void>('LAST_STEP'),

    // Display Meta Dialog
    HIDE_META: event<void>('HIDE_META'),
    SHOW_META: event<void>('SHOW_META'),
};

checkActionCreatorsRecord(ProjectActions);
