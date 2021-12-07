import { GrantGreenFlagType } from '../../../content/DigitalIdentity1/actions/GrantGreenFlag';
import { PhysicalPassportAuthenticationType } from '../../../content/DigitalIdentity1/actions/PhysicalPassportAuthentication';
import { actorTypes } from '../../../content/DigitalIdentity1/actors/actorTypes';
import { GovPassportType } from '../../../content/DigitalIdentity1/assets/GovPassport';
import { GreenFlagType } from '../../../content/DigitalIdentity1/assets/GreenFlag';
import { Translation } from '../../../intl/Language';
import { GameActions } from '../../../state/actions';
import { ProjectActions } from '../../../state/project/actions';
import { makeScenarioDef } from '../../../state/project/state';
import {
    selectActionDefById,
    selectActiveSidebarTab,
    selectActiveStateDesc,
    selectActiveStepIndex,
    selectEditing,
    selectListActorDefs,
    selectSelectedActorConf,
    selectSelectedActorId,
    selectSelectedAssetId,
    selectStepDescs,
} from '../../../state/selectors';
import { RootState } from '../../../state/state';
import { SidebarTab } from '../../components/Sidebar/SidebarTab';
import { Tour } from '../Tour';
import { Context, IndexType, StatusType, TourStepState } from '../TourStep';
import { querySelectors as q } from './querySelectors';

export const BuildersTour: Tour = {
    title: {
        NL: 'Rondleiding Identity Game - Scenario Bouwen',
        EN: 'Guided Tour Identity Game - Building a Scenario',
    },
    steps: [
        {
            step: {
                title: {
                    NL: 'Rondleiding - Scenario Bouwen',
                    EN: 'Guided Tour - Build your own Scenario',
                },
                message: {
                    NL:
                        `De ware kracht van de Identity Game ligt in de mogelijkheid om zelf scenario's` +
                        ` te ontwikkelen. In deze rondleiding leer je hoe je dit kunt doen.` +
                        `\n\n` +
                        `Ben je nog niet bekend met de basisconcepten van de Identity Game? Volg dan` +
                        ` eerst een korte [introductie](/tour/intro).` +
                        `\n\n` +
                        `**Klik op volgende om te beginnen met bouwen.**`,
                    EN: '',
                },
                nextEnabled: true,
            },

            onActivate: (ctx) => {
                ctx.dispatch(
                    GameActions.CREATE_PROJECT({
                        id: 'tour',
                        definition: makeScenarioDef({}),
                        name: 'Rondleiding',
                    }),
                );
                ctx.dispatch(GameActions.ACTIVATE_PROJECT({ id: 'tour' }));
                navSidebar(ctx, SidebarTab.INFO);
                toggleEditing(ctx, false);
                gotoStepIndex(ctx, -1);
            },
            indexType: IndexType.NONE,
        },
        {
            step: (s) => {
                const success = selectEditing(s);
                return {
                    title: {
                        NL: 'Bewerken Inschakelen',
                        EN: '',
                    },
                    message: {
                        NL:
                            `Om bewerken in te schakelen klik je op het slotje. Op deze manier kun je elk` +
                            ` scenario bewerken. Je kunt niets verkeerd doen.` +
                            `\n\n` +
                            `**Schakel bewerken in en klik op volgende.**`,
                        EN: '',
                    },
                    status: success ? StatusType.SUCCESS : StatusType.NORMAL,
                    nextEnabled: success,
                    highlight: { q: q.btnEditLock },
                };
            },
            onActivate: (ctx) => gotoStepIndex(ctx, 2),
        },
        {
            step: (s) => {
                const d = selectTourStateElements(s);
                const success = d.numberOfActors === 2 && !!d.shopActorDef && !!d.humanActorDef;
                return {
                    title: {
                        NL: 'Actoren Toevoegen',
                        EN: '',
                    },
                    message: {
                        NL:
                            `We gaan een scenario bouwen waarin een mens bij een winkel moet bewijzen dat ` +
                            `hij of zij 18 jaar of ouder is. Als eerste hebben we daarvoor twee actoren` +
                            ` nodig: de mens en de winkel. ` +
                            `\n\n` +
                            ` Voeg in het zij-menu (rechts) twee actoren toe: een mens en een winkel. ` +
                            `Wijzig naar eigen smaak de namen en omschrijving.` +
                            `\n\n` +
                            `**Voeg een mens en een winkel toe en klik op volgende.**`,
                        EN: '',
                    },
                    status: success ? StatusType.SUCCESS : StatusType.NORMAL,
                    nextEnabled: success,
                };
            },
            onActivate: (ctx) => {
                navSidebar(ctx, SidebarTab.ACTORS);
            },
        },
        {
            step: stepWithPreconditionValidation(['hasHumanActor', 'hasShopActor'], (state) => {
                const d = selectTourStateElements(state);
                return {
                    title: {
                        NL: 'Assets Toevoegen',
                        EN: '',
                    },
                    message: {
                        NL:
                            `Heel goed, je scenario heeft nu 2 actoren. ${d.humanActorDef?.name} heeft` +
                            ` een identiteitsbewijs (asset) nodig om te bewijzen dat` +
                            ` ${d.humanActorDef?.type.isMale ? 'hij' : 'ze'} 18 jaar of ouder is.` +
                            `\n\n` +
                            `**Klik op ${d.humanActorDef?.name} om assets toe te wijzen.**`,
                        EN: '',
                    },
                    nextEnabled: false,
                };
            }),

            onStateChange: (ctx) => {
                const selectedActor = selectSelectedActorConf(ctx.state);
                if (selectedActor && selectedActor.definition.type.isHuman) {
                    ctx.next();
                }
            },
            onActivate: (ctx) => {
                clearSelection(ctx);
                navSidebar(ctx, SidebarTab.ACTORS);
            },
        },
        {
            step: stepWithPreconditionValidation(['hasHumanActor', 'hasShopActor'], (s) => {
                const d = selectTourStateElements(s);
                return {
                    title: {
                        NL: 'Assets Toevoegen',
                        EN: '',
                    },
                    message: {
                        NL:
                            `Heel goed, je scenario heeft nu 2 actoren. ${d.humanActorDef?.name} heeft` +
                            ` een identiteitsbewijs (asset) nodig om te bewijzen dat` +
                            ` ${d.humanActorDef?.type.isMale ? 'hij' : 'ze'} ouder is dan 18.` +
                            `\n\n` +
                            `**Klik op Asset Toevoegen en voeg een Paspoort toe.**`,
                        EN: '',
                    },
                    nextEnabled: false,
                };
            }),
            onStateChange: (ctx) => {
                const d = selectTourStateElements(ctx.state);
                if (!!d.passportDescOfHuman) {
                    ctx.next();
                }
            },
            indexType: IndexType.SAME_AS_PREVIOUS,
        },
        {
            step: stepWithPreconditionValidation(['hasHumanActor', 'hasShopActor', 'humanHasPassport'], (state) => {
                const d = selectTourStateElements(state);
                return {
                    title: {
                        NL: 'Een tijdlijn bouwen',
                        EN: '',
                    },
                    message: {
                        NL:
                            `Heel goed. ${d.humanActorDef?.name} heeft nu een paspoort. We kunnen nu de` +
                            ` tijdlijn van het scenario gaan opbouwen. In deze rondleiding maken we` +
                            ` twee stappen: allereerst bewijst ${d.shopActorDef?.name} dat ` +
                            ` ${d.humanActorDef?.type.isMale ? 'hij' : 'ze'} 18 jaar of ouder is door` +
                            ` ${d.humanActorDef?.type.isMale ? 'zijn' : 'haar'} paspoort te tonen. Na` +
                            ` die controle geeft de winkel (${d.shopActorDef?.name}) het product uit aan` +
                            ` ${d.humanActorDef?.name} en is het doel volbracht.` +
                            `\n\n` +
                            `**Ga naar het menu tijdlijn om stappen toe te voegen**`,
                        EN: '',
                    },
                    nextEnabled: false,
                };
            }),
            onStateChange: (ctx) => {
                if (selectActiveSidebarTab(ctx.state) === SidebarTab.TIMELINE) {
                    ctx.next();
                }
            },
            onActivate: (ctx) => {
                navSidebar(ctx, SidebarTab.ACTORS);
            },
        },
        {
            step: (state) => {
                const d = selectTourStateElements(state);
                return {
                    title: {
                        NL: 'Stap 1: Paspoortauthenticatie',
                        EN: '',
                    },
                    message: {
                        NL:
                            `Als eerste moet ${d.humanActorDef?.name} ` +
                            ` ${d.humanActorDef?.type.isMale ? 'zijn' : 'haar'} paspoort laten zien.` +
                            ` Je kunt deze actie toevoegen door op Stap Toevoegen te klikken en te` +
                            ` kiezen voor "Authenticatie o.b.v. Paspoort". Kies de controleur` +
                            ` (${d.shopActorDef?.name}) en het subject (${d.humanActorDef?.name}) en` +
                            ` tot slot het juiste paspoort.`,
                        EN: '',
                    },
                    nextEnabled: false,
                };
            },
            onStateChange: (ctx) => {
                const d = selectTourStateElements(ctx.state);
                if (d.stepOneIsValid) {
                    ctx.next();
                }
            },
        },
        {
            step: stepWithPreconditionValidation(
                [
                    'hasHumanActor',
                    'hasShopActor',
                    'stepOneExists',
                    'stepOneHasValidType',
                    'stepOneHasValidSubject',
                    'stepOneHasValidVerifier',
                    'stepOneHasValidAsset',
                ],
                (state) => {
                    const d = selectTourStateElements(state);
                    return {
                        title: {
                            NL: 'Stap 1: Paspoortauthenticatie',
                            EN: '',
                        },
                        message: {
                            NL:
                                `Heel goed. Reis in de tijd naar stap 1 om te zien wat er gebeurt.` +
                                `\n\n` +
                                `**Klik op stap 1**`,
                            EN: '',
                        },
                        nextEnabled: false,
                    };
                },
            ),
            onStateChange: (ctx) => {
                const d = selectTourStateElements(ctx.state);
                if (d.activeStepIndex === 0) {
                    ctx.next();
                }
            },
        },
        {
            step: (state) => {
                const d = selectTourStateElements(state);
                return {
                    title: {
                        NL: 'Stap 2: Paspoortauthenticatie',
                        EN: '',
                    },
                    message: {
                        NL:
                            `Je ziet dat ${d.shopActorDef?.name} nieuwe kennis heeft gekregen, het` +
                            ` "authenticatieresultaat". Nu de winkelier weet dat` +
                            ` ${d.humanActorDef?.name} oud genoeg is kunnen de producten worden verkocht` +
                            `\n\n` +
                            `Het is dus tijd om een tweede stap toe te voegen. We symboliseren dit de` +
                            ` verkoop van artikelen met een _groene vlag_. Voeg nogmaals een stap toe,` +
                            ` maar kies ditmaal voor "Groene vlag toekennen" van de winkel naar` +
                            ` ${d.humanActorDef?.name}. In de omschrijving kun je aangeven welke` +
                            ` producten worden verkocht.`,
                        EN: '',
                    },
                    nextEnabled: false,
                };
            },
            onStateChange: (ctx) => {
                const d = selectTourStateElements(ctx.state);
                if (d.stepTwoIsValid) {
                    ctx.next();
                }
            },
        },
        {
            step: (state) => {
                const d = selectTourStateElements(state);
                return {
                    title: {
                        NL: 'Stap 2: Paspoortauthenticatie',
                        EN: '',
                    },
                    message: {
                        NL: `Heel goed. Navigeer nu naar stap 2 om te zien dat de groene vlag wordt toegekend`,
                        EN: '',
                    },
                    nextEnabled: false,
                };
            },
            onStateChange: (ctx) => {
                const d = selectTourStateElements(ctx.state);
                if (d.activeStepIndex === 1) {
                    ctx.next();
                }
            },
        },
        {
            step: (state) => {
                const d = selectTourStateElements(state);
                return {
                    title: {
                        NL: 'Voltooid',
                        EN: '',
                    },
                    message: {
                        NL:
                            `Dat was de rondleiding. We hebben een heel simpel scenario gebouwd waarin` +
                            ` ${d.humanActorDef?.name} ${d.humanActorDef?.type.isMale ? 'zijn' : 'haar'}` +
                            ` paspoort laat zien aan ${d.shopActorDef?.name} om daar producten te mogen` +
                            ` kopen.` +
                            `\n\n` +
                            `Met de Identity Game zijn echter veel spannendere scenario's te bouwen.\n` +
                            `- Begin met een [leeg canvas](/app).\n` +
                            `- Bekijk [bestaande scenario's](/examples).\n`,
                        EN: '',
                    },
                    nextEnabled: false,
                };
            },
            onStateChange: (ctx) => {
                const d = selectTourStateElements(ctx.state);
                if (d.activeStepIndex === 2) {
                    ctx.next();
                }
            },
        },
    ],
};

function selectActor(ctx: Context, actorId: string) {
    if (selectSelectedActorId(ctx.state) !== actorId) {
        ctx.dispatch(ProjectActions.SELECT_ACTOR({ id: actorId }));
    }
}

function selectAsset(ctx: Context, assetId: string) {
    if (selectSelectedAssetId(ctx.state) !== assetId) {
        ctx.dispatch(ProjectActions.SELECT_ASSET({ id: assetId }));
    }
}

function gotoStepIndex(ctx: Context, index: number) {
    if (selectActiveStepIndex(ctx.state) !== index) {
        ctx.dispatch(ProjectActions.GOTO_STEP_INDEX({ index }));
    }
}

function toggleEditing(ctx: Context, editing: boolean | undefined) {
    if (editing === undefined || selectEditing(ctx.state) !== editing) {
        ctx.dispatch(GameActions.TOGGLE_EDITING({ editing }));
    }
}

function navSidebar(ctx: Context, to: SidebarTab) {
    if (selectActiveSidebarTab(ctx.state) !== to) {
        ctx.dispatch(GameActions.NAVIGATE_SIDEBAR({ to }));
    }
}

function clearSelection(ctx: Context) {
    if (selectSelectedAssetId(ctx.state) || selectSelectedActorId(ctx.state)) {
        ctx.dispatch(ProjectActions.CLEAR_SELECTION());
    }
}

/** Derive from the root state the elements that are required for the tour */
function selectTourStateElements(state: RootState) {
    const activeStepIndex = selectActiveStepIndex(state);
    const numberOfActors = selectListActorDefs(state).length;

    const shopActorDef = selectListActorDefs(state).find(
        (d) => d.definition.type.typeName === actorTypes.shop1.typeName,
    )?.definition;

    const humanActorDef = selectListActorDefs(state).find((d) => d.definition.type.isHuman)?.definition;

    const assetDescs = selectActiveStateDesc(state).assets;
    const passportDescs = Object.values(assetDescs).filter((a) => a.asset.type === GovPassportType.schema.typeName);
    const passportDescOfHuman = humanActorDef && passportDescs.find((p) => p.ownerId === humanActorDef.id)?.asset;

    const stepDescs = selectStepDescs(state);

    const stepOneExists = !!stepDescs[0];
    const stepOneDef = stepDescs[0] && selectActionDefById(stepDescs[0].action.id)(state);
    const stepOneHasValidType =
        stepOneDef && stepOneDef.typeName === PhysicalPassportAuthenticationType.schema.typeName;
    const stepOneHasValidSubject = stepOneDef && stepOneDef.props['subject'] === humanActorDef?.id;
    const stepOneHasValidVerifier = stepOneDef && stepOneDef.props['verifier'] === shopActorDef?.id;
    const stepOneHasValidAsset = stepOneDef && stepOneDef.props['subjectPassport'] === passportDescOfHuman?.id;
    const stepOneIsValid =
        stepOneExists &&
        stepOneHasValidType &&
        stepOneHasValidSubject &&
        stepOneHasValidVerifier &&
        stepOneHasValidAsset;

    const stepTwoExists = !!stepDescs[1];
    const stepTwoDef = stepDescs[1] && selectActionDefById(stepDescs[1].action.id)(state);
    const stepTwoHasValidType = stepTwoDef && stepTwoDef.typeName === GrantGreenFlagType.schema.typeName;
    const stepTwoHasValidFromActor = stepTwoDef && stepTwoDef.props['from'] === shopActorDef?.id;
    const stepTwoHasValidToActor = stepTwoDef && stepTwoDef.props['to'] === humanActorDef?.id;
    const stepTwoIsValid = stepTwoExists && stepTwoHasValidType && stepTwoHasValidFromActor && stepTwoHasValidToActor;

    return {
        activeStepIndex,
        numberOfActors,
        shopActorDef,
        humanActorDef,
        assetDescs,
        passportDescs,
        passportDescOfHuman,
        stepDescs,
        stepOneExists,
        stepOneDef,
        stepOneHasValidType,
        stepOneHasValidSubject,
        stepOneHasValidVerifier,
        stepOneHasValidAsset,
        stepOneIsValid,
        stepTwoExists,
        stepTwoDef,
        stepTwoHasValidType,
        stepTwoHasValidFromActor,
        stepTwoHasValidToActor,
        stepTwoIsValid,
    };
}

const stepOneTitle = PhysicalPassportAuthenticationType.schema.title;
const stepTwoTitle = GreenFlagType.schema.title;

const validationMessages = {
    hasHumanActor: { NL: 'Een menselijke actor ontbreekt.', EN: 'A human actor is missing.' },
    hasShopActor: { NL: 'Een winkel (actor) ontbreekt.', EN: 'A shop (actor) is missing.' },
    humanHasPassport: { NL: 'De menselijke actor heeft geen paspoort.', EN: 'The human actor has no passport.' },
    stepOneExists: {
        NL: 'Stap 1 (' + stepOneTitle.NL + ') ontbreekt.',
        EN: 'Step 1 (' + stepOneTitle.EN + ') is missing.',
    },
    stepOneHasValidType: {
        NL: 'Stap 1 (' + stepOneTitle.NL + ') moet van het type ' + stepOneTitle.NL + ' zijn.',
        EN: 'Step 1 (' + stepOneTitle.EN + ') must be of the type ' + stepOneTitle.EN + '.',
    },
    stepOneHasValidSubject: {
        NL: 'In stap 1 (' + stepOneTitle.NL + ') moet de mens de rol van subject spelen.',
        EN: 'In step 1 (' + stepOneTitle.EN + ') the role of subject must be fulfilled by the human.',
    },
    stepOneHasValidVerifier: {
        NL: 'In stap 1 (' + stepOneTitle.NL + ') moet de winkel de rol van verifier spelen.',
        EN: 'In step 1 (' + stepOneTitle.EN + ') the role of verifier must be fulfilled by the shop.',
    },
    stepOneHasValidAsset: {
        NL: 'In stap 1 (' + stepOneTitle.NL + ') moet de mens de rol van subject spelen.',
        EN: 'In step 1 (' + stepOneTitle.EN + ') the role of subject must be fulfilled by the human.',
    },
    stepTwoExists: {
        NL: 'Stap 2 (' + stepTwoTitle.NL + ') ontbreekt.',
        EN: 'Step 2 (' + stepTwoTitle.EN + ') is missing.',
    },
    stepTwoHasValidType: {
        NL: 'Stap 2 moet van het type ' + stepTwoTitle.NL + ' zijn.',
        EN: 'Step 2 must be of the type ' + stepTwoTitle.EN + '.',
    },
    stepTwoHasValidFromActor: {
        NL: 'In stap 2 (' + stepTwoTitle.NL + ') moet de groene vlag van de winkel naar de mens gaan.',
        EN: 'In step 2 (' + stepTwoTitle.EN + ') the green flag must be passed from the shop to the human.',
    },
    stepTwoHasValidToActor: {
        NL: 'In stap 2 (' + stepTwoTitle.NL + ') moet de groene vlag van de winkel naar de mens gaan.',
        EN: 'In step 2 (' + stepTwoTitle.EN + ') the green flag must be passed from the shop to the human.',
    },
};

type Precond = keyof typeof validationMessages;

function validatePreConditions(state: RootState, conditions: Array<Precond>): Translation[] {
    const d = selectTourStateElements(state);
    const passingConditions: { [K in keyof typeof validationMessages]: boolean } = {
        hasHumanActor: !!d.humanActorDef,
        hasShopActor: !!d.shopActorDef,
        humanHasPassport: !!d.passportDescOfHuman,
        stepOneExists: d.stepOneExists,
        stepOneHasValidType: d.stepOneHasValidType !== false, // only fail when stepOneExists passes
        stepOneHasValidSubject: d.stepOneHasValidSubject !== false, // only fail when stepOneExists passes
        stepOneHasValidVerifier: d.stepOneHasValidVerifier !== false, // only fail when stepOneExists passes
        stepOneHasValidAsset: d.stepOneHasValidAsset !== false, // only fail when stepOneExists passes
        stepTwoExists: d.stepTwoExists,
        stepTwoHasValidType: d.stepTwoHasValidType !== false, // only fail when stepTwoExists passes
        stepTwoHasValidFromActor: d.stepTwoHasValidFromActor !== false, // only fail when stepTwoExists passes
        stepTwoHasValidToActor: d.stepTwoHasValidToActor !== false, // only fail when stepTwoExists passes
    };

    return conditions.filter((c) => !passingConditions[c]).map((key) => validationMessages[key]);
}

function stepWithPreconditionValidation(conds: Array<Precond>, step: (s: RootState) => Omit<TourStepState, 'index'>) {
    return (state: RootState) => {
        const errors = validatePreConditions(state, conds);
        return errors.length > 0 ? displayPreconditionWarning(errors) : step(state);
    };
}

function displayPreconditionWarning(
    errors: Translation[],
    step: Partial<TourStepState> = {},
): Omit<TourStepState, 'index'> {
    return {
        title: { NL: 'Oeps', EN: 'Whoops' },
        message: {
            NL: 'Er gaat iets fout:\n' + errors.map((e) => `- ${e.NL}`).join('\n'),
            EN: 'Something went wrong:\n' + errors.map((e) => `- ${e.EN}`).join('\n'),
        },
        status: StatusType.WARNING,
        nextEnabled: false,
        ...step,
    };
}
