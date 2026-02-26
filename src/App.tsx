import { useState, useEffect } from 'react';
import { ReviewFormShell } from './components/review/ReviewFormShell';
import { SettingsProvider } from './context/SettingsContext';
import { AutoSyncWatcher } from './components/common/AutoSyncWatcher';
import { ScalingWrapper } from './components/common/ScalingWrapper';
import { TourGuide } from './components/common/TourGuide';
import { TOUR_STEPS } from './constants/tourSteps';

const ONBOARDING_KEY = 'ars_onboarding_completed';

function App() {
    const [isTourVisible, setIsTourVisible] = useState(false);

    useEffect(() => {
        if (!localStorage.getItem(ONBOARDING_KEY)) {
            // Give the UI 800ms to fully paint before measuring DOM elements
            const t = setTimeout(() => setIsTourVisible(true), 800);
            return () => clearTimeout(t);
        }
    }, []);

    const handleTourComplete = () => {
        localStorage.setItem(ONBOARDING_KEY, 'true');
        setIsTourVisible(false);
    };

    return (
        <SettingsProvider>
            <AutoSyncWatcher />
            <ScalingWrapper>
                <ReviewFormShell />
            </ScalingWrapper>
            {isTourVisible && (
                <TourGuide steps={TOUR_STEPS} onComplete={handleTourComplete} />
            )}
        </SettingsProvider>
    );
}

export default App;
