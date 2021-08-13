# Developer Guide
This guide describes the architecture of the code base and explains how it can be extended.

The game lets users build a narrative. That narrative consists of **Actors**, **Assets** and **Actions**. The chronological sequence of **Actions** describes what happens to the **Actors** and **Assets**. Each action may perform some validation, and return **ValidationErrors** if criteria are not met. Each action may also have some **Outcomes** (such as the creation or transfer of an **Asset**) which produces a new **State**. A state consists of **Actors**, who have zero or more **Assets** in their possession. 

An example of an **Action** may be a _PassportAuthentication_ between a _Subject_ and a _Verifier_. The _Subject_ must hold a valid _Passport_ **Asset**, or validation fails. As a result of this **Action**, the _Verifier_ may gain some knowledge (**Outcome**), represented in another **Asset**, the _AuthenticationResult_. 

For a more detailed explanation fo the application's purpose and use, consult the user manual.

* Contributing to the game itself
* Creating new content

## Game Model
The above explanation clearly shows the game loop: the user adds something to the narrative, the game recomputes **ValidationErrors**, **Outcomes** and **States** and displays this to the user. This cycle is reflected in the architecture. 

`UI -> Definition -> Logic -> Description -> UI`

1. The user constructs a narrative in the UI.
2. The UI produces a `ScenarioDef` object containing the **Actors**, **Assets** and **Actions** as specified by the user.
3. The `Scenario` class consumes the `ScenarioDef` object and computes the **ValidationErrors**, **Outcomes** and thereby new **States**.
4. A `ScenarioDesc` is produced by the computed `Scenario` and acts as a view model, specifying images, text, etc.
5. The UI shows the result to the user, through its `NetworkCanvas` and various inspector panels. 

This computation is entirely functional. Every time the ScenarioDef is updated, the scenario is recomputed and a fresh ScenarioDesc is produced.

The ScenarioDef structure is also used for **persistence**. The ScenarioDef can be saved to file or local storage.

A more detailed description of the game model can be found [here](./src/model/README.md).

## Content Libraries
The game model is separated from its content. The content consists of the types of **Actors**, **Assets** and **Actions** that the user can choose from. These ContentTypes are registered in a `ContentLibrary`. The rest of this chapter explains how to build content libraries.

To create a new library, add a directory under `./src/content`. Add a `library.ts` file that exports the `ContentLibrary` object, the root object that collects all content types in that library.

To switch the library used by the UI, you must change the `DefaultLibrary` setting [here](./src/content/index.ts).

### Actors
**Actors** have a fixed schema (as opposed to **Actions** and **Actors**), meaning the content library cannot change its schema. The `ContentLibrary` specifies a list of `ActorType`, each having a name, description, image and some other properties. The user can add **Actors** to a scenario by picking from this list and either override the actor's name and description or leave the defaults.

```
// Example of an ActorType
const myActorType: ActorType = {
    id: 'person1',
    image: { type: 'image', url: 'path-to-image' },
    typeName: 'Alice',
    nounPhrase: 'Alice',
    isMale: false,
isHuman: true,
}
```

### Assets
**Assets** have a custom `AssetSchema`, meaning the content developer can specify zero or more parameters for that asset. The parameters can be strings or numbers, but also references to actors and to other assets. To create a new type of **Asset**, do the following:

1. Instantiate a new `AssetSchema` (API-reference is [here](./src/model/content/Asset/AssetSchema.ts))
2. Define a new class extending `Asset` (defined [here](./src/model/logic/Asset/Asset.ts))
3. Instantiate a new `AssetType` (defined [here](./src/model/content/Asset/AssetType.ts)) which combines the schema and the class.
4. Add the `AssetType` to the `ContentLibrary` list of assets.

An example of a custom Asset:

```
// Define a schema that describes the type itself and its parameters
const myCustomAssetSchema = new AssetSchema({
    typeName: 'Pseudonym',
    kindName: 'Data',
    title: { NL: 'Pseudoniem', EN: 'Pseudonym' },
    props: {
        // add parameters here
    },
})

export type Props = TypeOfAssetSchema<typeof Schema>;

// Provide a class for computation purposes
class MyAsset extends Asset<Props> { 
    describe(state: ScenarioState): AssetDesc {
        return {
            // add description information here
        }
    }
}

// Wrap it up in an AssetType
const myCustomAssetType = new AssetType(
    myCustomAssetSchema,
    (id, props, isInitial) => new MyAsset(id, props, isInitial) // factory function
)
```

### Actions
**Actions** have a custom `ActionSchema`, meaning the content developer can specify zero or more parameters for that action. The parameters can be strings or numbers, but also references to actors and to other assets. To create a new type of **Action**, do the following:

1. Instantiate a new `ActionSchema` (API-reference is [here](./src/model/content/Action/ActionSchema.ts))
2. Define a new class extending `Action` (defined [here](./src/model/logic/Action/Action.ts))
3. Instantiate a new `ActionType` (defined [here](./src/model/content/Action/ActionType.ts)) which combines the schema and the class.
4. Add the `ActionType` to the `ContentLibrary` list of action.

The `Action` class is more complex than the `Asset` class, because it must also do validation and outcome computation.

```
// Define a schema that describes the type itself and its parameters
const myCustomActionSchema = new ActionSchema({
    typeName: 'Authentication',
    title: { NL: 'Authenticatie', EN: 'Authentication' },
    props: {
        // add parameters here
    },
})

export type Props = TypeOfActionSchema<typeof Schema>;

// Provide a class for computation purposes
class MyAction extends Action<Props> { 

    validatePreConditions(): IValidationResult[] { ... }

    computeOutcomes(): IOutcome[] { ... }

    _describe(state: ScenarioState): ActionDesc {
        return {
            // add description information here
        }
    }
}

// Wrap it up in an ActionType
const myCustomActionType = new ActionType(
    myCustomActionSchema,
    (id, props) => new MyAction(id, props) // factory function
)
```

### Outcomes
**Actions** cannot directly manipulate the `ScenarioState`. Instead, they must produce an **Outcome**. This **Outcome** is used for both computing the new state, as well as describing the outcome/effect to the user. To define a new type of outcome, create a class that implements `IOutcome`, defined [here](./src/model/logic/Step/IOutcome.ts). Two methods must be implemented:

* `IOutcome.describe(state)` produces the view model that describes the outcome itself. Outcomes are displayed in the ActionInspector.
* `IOutcome.computeState(state)` computes a new state.

## Language
This application supports multiple languages. Every piece of text displayed to the user must be defined in all languages specified [here](./src/intl/Language.ts). This is usually done by providing a `Translation` object, a record with a string for each available language (e.g. `{ NL: 'hallo', EN: 'hello' }`).
