import { Actor } from '../../../model/definition/Actor/Actor';
import { ucFirst } from '../../../util/util';
import { AttributeProof } from '../assets/AttributeProof';

export const urlActor = (actor: Actor, atStartOfSentence = false) =>
    `[#${actor.id}](${atStartOfSentence ? ucFirst(actor.nounPhrase) : actor.nounPhrase})`;

export const urlCredential = (credential: AttributeProof, atStartOfSentence = false) =>
    `[#${credential.id}](${
        atStartOfSentence ? ucFirst(credential.defProps.attributeName) : credential.defProps.attributeName
    } credential)`;
