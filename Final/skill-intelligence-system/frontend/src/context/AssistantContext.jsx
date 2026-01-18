import React, { createContext, useState, useContext } from 'react';

const AssistantContext = createContext();

export const useAssistant = () => useContext(AssistantContext);

export const AssistantProvider = ({ children }) => {
    const [contextRole, setContextRole] = useState(null); // { id, title }

    const updateContext = (role) => {
        setContextRole(role);
    };

    return (
        <AssistantContext.Provider value={{ contextRole, updateContext }}>
            {children}
        </AssistantContext.Provider>
    );
};
