import { ReviewFormShell } from './components/review/ReviewFormShell';
import { SettingsProvider } from './context/SettingsContext';
import { AutoSyncWatcher } from './components/common/AutoSyncWatcher';
import { ScalingWrapper } from './components/common/ScalingWrapper';

function App() {
    return (
        <SettingsProvider>
            <AutoSyncWatcher />
            <ScalingWrapper>
                <ReviewFormShell />
            </ScalingWrapper>
        </SettingsProvider>
    );
}

export default App;
