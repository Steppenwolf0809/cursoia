import React from 'react';
import Technique from './Technique';

// Reusing Technique component but with a specific advanced styling wrapper or logic if needed
// For now, it seems it shares the exact structure but might want a dark theme or special highlight.
// Based on the requirements, it's "Similar to technique but with highlight info/success/danger"
// The base Technique component already supports 'highlight' prop.
// So this is basically a wrapper to ensure consistency or modify default styles.

const TechniqueAdvanced = (props) => {
    return (
        <div className="h-full relative">
            <div className="absolute inset-0 bg-gradient-to-br from-purple-50 to-blue-50 -z-10 rounded-[3rem]"></div>
            <Technique {...props} />
        </div>
    );
};

export default TechniqueAdvanced;
