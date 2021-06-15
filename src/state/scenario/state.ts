import { Language } from '../../intl/Language';
import { ScenarioDef } from '../../model/definition/ScenarioDef';
import { SidebarTab } from '../../ui/components/Sidebar/SidebarTab';

export interface RootState {
    scenario: ScenarioDef;
    showMeta: boolean;

    selectedActorId?: string;
    selectedAssetId?: string;
    selectedStepId?: string;
    activeStepId?: string;

    snackbarOn: boolean;
    activeSidebarTab: SidebarTab;

    language: Language;
}
