import React, { useState, useEffect, useRef } from 'react';
import { assistantService } from '../services/api';
import { useAuth } from '../context/AuthContext';
import { useAssistant } from '../context/AssistantContext';

const SkillMatchAssistant = () => {
    const { user } = useAuth();
    const { contextRole } = useAssistant();
    const [isOpen, setIsOpen] = useState(false);

    // Chat State
    const [messages, setMessages] = useState([
        {
            sender: 'bot',
            text: "Hello! I'm your SkillMatch Assistant. I can explain your readiness score or help you plan next steps. Ask me anything!"
        }
    ]);
    const [input, setInput] = useState('');
    const [loading, setLoading] = useState(false);
    const messagesEndRef = useRef(null);

    // Drag State
    const [position, setPosition] = useState({ x: window.innerWidth - 80, y: window.innerHeight - 80 });
    const [isDragging, setIsDragging] = useState(false);
    const dragOffset = useRef({ x: 0, y: 0 });

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages, isOpen]);

    // Handle Dragging
    const handleMouseDown = (e) => {
        if (isOpen) return; // Don't drag if chat is open (optional preference)
        setIsDragging(true);
        dragOffset.current = {
            x: e.clientX - position.x,
            y: e.clientY - position.y
        };
    };

    const handleMouseMove = (e) => {
        if (!isDragging) return;
        setPosition({
            x: e.clientX - dragOffset.current.x,
            y: e.clientY - dragOffset.current.y
        });
    };

    const handleMouseUp = () => {
        setIsDragging(false);
    };

    useEffect(() => {
        if (isDragging) {
            window.addEventListener('mousemove', handleMouseMove);
            window.addEventListener('mouseup', handleMouseUp);
        } else {
            window.removeEventListener('mousemove', handleMouseMove);
            window.removeEventListener('mouseup', handleMouseUp);
        }
        return () => {
            window.removeEventListener('mousemove', handleMouseMove);
            window.removeEventListener('mouseup', handleMouseUp);
        };
    }, [isDragging]);

    const handleSend = async (textOverride = null, isSystemTrigger = false) => {
        const text = textOverride || input;
        if (!text.trim()) return;

        if (!isSystemTrigger) {
            setMessages(prev => [...prev, { sender: 'user', text }]);
            setInput('');
        }

        setLoading(true);
        try {
            const res = await assistantService.chat({
                user_id: user?.id,
                role_id: contextRole?.id,
                message: text
            });

            setMessages(prev => [
                ...prev,
                { sender: 'bot', text: res.data.response, actions: res.data.suggested_actions }
            ]);
        } catch (error) {
            console.error("Chat error", error);
            setMessages(prev => [...prev, { sender: 'bot', text: "Sorry, I'm having trouble connecting to the intelligence engine." }]);
        } finally {
            setLoading(false);
        }
    };

    // Prevent rendering if not logged in? Or allow limited generic help?
    if (!user) return null;

    return (
        <>
            {/* Floating Draggable Button */}
            {!isOpen && (
                <div
                    onMouseDown={handleMouseDown}
                    onClick={() => { if (!isDragging) setIsOpen(true); }} // Basic click vs drag distinction
                    className="animate-fade-in"
                    style={{
                        position: 'fixed',
                        left: position.x,
                        top: position.y,
                        width: '60px',
                        height: '60px',
                        borderRadius: '50%',
                        background: 'var(--brand-primary)',
                        color: 'white',
                        boxShadow: '0 4px 12px rgba(0,0,0,0.5)',
                        cursor: isDragging ? 'grabbing' : 'pointer',
                        zIndex: 9999,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontSize: '1.5rem',
                        userSelect: 'none',
                        border: '2px solid white'
                    }}
                >
                    🤖
                </div>
            )}

            {/* Chat Window - Fixed Position (or could be relative to button) */}
            {isOpen && (
                <div className="card animate-fade-in" style={{
                    position: 'fixed',
                    bottom: '2rem',
                    right: '2rem',
                    width: '350px',
                    height: '500px',
                    display: 'flex',
                    flexDirection: 'column',
                    zIndex: 10000,
                    padding: 0,
                    overflow: 'hidden',
                    border: '1px solid rgba(255,255,255,0.1)',
                    boxShadow: '0 10px 25px rgba(0,0,0,0.5)'
                }}>
                    {/* Header */}
                    <div style={{ padding: '1rem', background: 'var(--brand-secondary)', color: 'white', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <div>
                            <span style={{ fontWeight: 'bold' }}>SkillMatch Assistant</span>
                            {contextRole && <div style={{ fontSize: '0.75rem', opacity: 0.9 }}>Context: {contextRole.title}</div>}
                        </div>
                        <button onClick={() => setIsOpen(false)} style={{ background: 'none', border: 'none', color: 'white', fontSize: '1.2rem', cursor: 'pointer' }}>✕</button>
                    </div>

                    {/* Messages */}
                    <div style={{ flex: 1, overflowY: 'auto', padding: '1rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                        {messages.map((msg, idx) => (
                            <div key={idx} style={{ alignSelf: msg.sender === 'user' ? 'flex-end' : 'flex-start', maxWidth: '80%' }}>
                                <div style={{
                                    background: msg.sender === 'user' ? 'var(--brand-primary)' : 'rgba(255,255,255,0.1)',
                                    color: 'white', padding: '0.75rem', borderRadius: '8px', fontSize: '0.9rem'
                                }}>
                                    {msg.text}
                                </div>
                                {msg.actions && (
                                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem', marginTop: '0.5rem' }}>
                                        {msg.actions.map((action, i) => (
                                            <button
                                                key={i}
                                                onClick={() => handleSend(action)}
                                                style={{ fontSize: '0.75rem', padding: '0.25rem 0.5rem', borderRadius: '4px', border: '1px solid #334155', background: 'transparent', color: '#94a3b8', cursor: 'pointer' }}
                                            >
                                                {action}
                                            </button>
                                        ))}
                                    </div>
                                )}
                            </div>
                        ))}
                        {loading && <div style={{ color: '#94a3b8', fontSize: '0.8rem', fontStyle: 'italic' }}>Thinking...</div>}
                        <div ref={messagesEndRef} />
                    </div>

                    {/* Input */}
                    <div style={{ padding: '1rem', borderTop: '1px solid rgba(255,255,255,0.1)' }}>
                        <div style={{ display: 'flex', gap: '0.5rem' }}>
                            <input
                                type="text"
                                value={input}
                                onChange={(e) => setInput(e.target.value)}
                                onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                                placeholder="Ask about your score..."
                                style={{ flex: 1, padding: '0.5rem', borderRadius: '4px', border: '1px solid #334155', background: '#0f172a', color: 'white' }}
                            />
                            <button onClick={() => handleSend()} className="btn btn-primary" style={{ padding: '0.5rem 1rem' }}>
                                ➤
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default SkillMatchAssistant;
