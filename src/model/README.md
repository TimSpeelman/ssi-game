# Game Model
With the SSI game players can construct _narratives_ to model (electronic) identification **scenario's**; e.g. a human shows its passport to a store to prove that he exceeds an age threshold. The purpose of this modelling practice is for players to understand, explore and explain how (electronic) identitification processes work, and why.

The game model is separated in three stages:
1. **Definition**: the player **defines** his or her own scenario
2. **Computation (logic)**: the game logic takes a definition and computes the resulting states and outcomes.
3. **Description**: the states and outcomes are described/displayed to the user.

The player constructs a **scenario** by..
1. .. picking some **actors** (e.g. humans, organisations, governments, autonomous actors);
2. .. providing them with some initial **assets** (e.g. a passport, a piece of knowledge or a human trait or feature);
3. .. and then configuring a sequence of **(inter)actions** (e.g. passport authentication) between those actors. 

Based on this constructed scenario, the game..
1. .. displays which **(inter)actions** fail and why (e.g. authentication fails due to lack of passport);
2. .. and displays the development of **assets** (their creation, use, exchange and disappearance).

**Assets** are used, created, exchanged and destroyed by (inter)acting actors. These effects are called **outcomes** and used to illustrate and explain the positive and negative effects of each **(inter)action**. 

The initial set of **actors** and the **assets** they hold (defined in steps 1 and 2) is the initial **state**. This **state** changes due to the **outcomes** of each **(inter)action**, producing in turn a new **state**.

The scenario computation performs the following steps for each **(inter)action** in chronological order:
1. Validate the **pre-conditions** using the **pre-state** (the state at the start of the **(inter)action**). Unsatisfied **pre-conditions** result in a failed **(inter)action** and must be communicated to the player. 
2. Compute the **outcomes** using the **pre-state**. These are also communicated to the player.
3. Compute the **post-state** as a product of the **pre-state** and **outcomes**.

## Content
The actual content of the game consists of concrete **actors**, **assets**, **(inter)actions** and **outcomes**; and pre-defined **scenario's**. Adding content broadens the game's coverage, its ability to describe more (real world) scenario's. 

**Actors** and **assets** are static objects simply describing a person, organisation or thing. **Outcomes** describe the change of those objects. The actual (simplified) **domain logic** is programmed into **(inter)actions** and captures what can be done and what is the effect of those actions.

### Target Audience
So long as the _model_ is sufficiently generic, the quality and scope of the _content_ determine the breadth of audience and discussions that can be addressed with this game. However, to properly address several audiences (e.g. citizens, system architects, policy makers) the content must be polymorphic. Certain aspects may be simplified by letting out particular details. 


### XX


1. The user constructs the narrative in the UI.
2. The UI produces a `ScenarioDef` object, a scenario definition consisting of `ActorDefs`, `AssetDefs` and `ActionDefs`.
3. The `ScenarioDef` object is interpreted by the `Scenario` class, which initiates the computation:
    1. Each `AssetDef` is mapped to an `AssetType` and each `ActionDef` is mapped to an `ActionType`.
    2. The user-defined distribution of **Assets** and **Actors** composes the initial `ScenarioState`.
    3. The computation then runs through the first `Action`, providing the initial `ScenarioState`, which produces `IValidationResults` and `IOutcomes`. 
    4. The `IOutcomes` produce a new `ScenarioState`.  
    5. The computation repeats for all actions.
4. The computed `Scenario` can be presented to the user by producing a `ScenarioDesc`, a plain object description of the scenario, acting as a view model. The `ScenarioDesc` consists of `StepDescs` which consist of the `ActionDesc`, `ValidationResultDescs`, `OutcomeDescs` and the resulting `StateDesc`. The `StateDesc` in turn consists of `Actors` and `AssetDescs`.
5. The `ScenarioDesc` is display in the UI, in the `NetworkCanvas` and `Sidebar` panels. 
