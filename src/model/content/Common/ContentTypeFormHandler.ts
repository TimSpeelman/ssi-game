import { ScenarioState } from '../../logic/State/ScenarioState';
import { ContentType } from './ContentType';
import { ContentTypeProps } from './PropRecord/ContentTypeProps';

/**
 * ContentTypeFormHandler is used by the UI to display a form allowing the user to parameterize a custom Action or Asset.
 *
 * It keeps the UI simple, whilst allowing the custom types to define complex (filtering) rules.
 */
export class ContentTypeFormHandler<Props extends ContentTypeProps> {
    constructor(readonly contentType: ContentType<Props>, readonly state: ScenarioState) {}
}
