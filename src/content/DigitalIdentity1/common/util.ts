import { Translation } from '../../../intl/Language';
import { ActorDesc } from '../../../model/description/Actor/ActorDesc';
import { ucFirst } from '../../../util/util';
import { Credential } from '../assets/Credential';
import { Pseudonym } from '../assets/Pseudonym';

export const urlActor = (actor: ActorDesc, atStartOfSentence = false) =>
    `[#${actor.id}](${atStartOfSentence ? ucFirst(actor.nounPhrase) : actor.nounPhrase})`;

export const urlCredential = (credential: Credential, atStartOfSentence = false) =>
    `[#${credential.id}](${
        atStartOfSentence ? ucFirst(credential.defProps.attributeName) : credential.defProps.attributeName
    } credential)`;

export const urlNym = (pseudonym: Pseudonym, atStartOfSentence = false): Translation => ({
    NL: `[#${pseudonym.id}](${atStartOfSentence ? 'Pseudoniem' : 'pseudoniem'} ${pseudonym.defProps.identifier})`,
    EN: `[#${pseudonym.id}](${atStartOfSentence ? 'Pseudoniem' : 'pseudoniem'} ${pseudonym.defProps.identifier})`,
});
