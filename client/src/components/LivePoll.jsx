import React, { useState, useEffect } from 'react';
import { BarChart3 } from 'lucide-react';

const LivePoll = ({ question: defaultQuestion, options: defaultOptions }) => {
    const [poll, setPoll] = useState({ id: null, question: defaultQuestion, options: defaultOptions });
    const [loading, setLoading] = useState(true);

    // Initialize votes and hasVoted state
    const [votes, setVotes] = useState(() => {
        // Initial state logic (could be improved to wait for poll data)
        return new Array(defaultOptions.length).fill(0);
    });

    const [hasVoted, setHasVoted] = useState(false);

    // Fetch active poll from server
    useEffect(() => {
        const fetchPoll = async () => {
            try {
                const response = await fetch('/api/polls/active');
                if (response.ok) {
                    const data = await response.json();
                    if (data && data.active) {
                        setPoll(prev => {
                            // Only update if ID changed to avoid unnecessary re-renders or loops, 
                            // though we need to update votes every time.
                            // We'll update votes separately.
                            if (prev.id !== data.id) {
                                return {
                                    id: data.id,
                                    question: data.question,
                                    options: data.options
                                };
                            }
                            return prev;
                        });

                        // Calculate votes from backend responses
                        if (data.responses && Array.isArray(data.responses)) {
                            const newVotes = new Array(data.options.length).fill(0);
                            data.responses.forEach(resp => {
                                const idx = data.options.indexOf(resp.answer);
                                if (idx !== -1) newVotes[idx]++;
                            });
                            setVotes(newVotes);
                        } else if (data.id) {
                            // If online but no responses, set to 0
                            setVotes(new Array(data.options.length).fill(0));
                        }
                    }
                }
            } catch (error) {
                // If backend fails, we might just keep local state driven by user interaction
                // console.error("Backend poll failed", error);
            } finally {
                setLoading(false);
            }
        };

        fetchPoll();
        const interval = setInterval(fetchPoll, 2000); // Poll every 2 seconds for live updates
        return () => clearInterval(interval);
    }, []);

    // Load hasVoted state from local storage (and votes ONLY if offline)
    useEffect(() => {
        const savedHasVoted = localStorage.getItem(`poll-voted-${poll.question}`);

        if (savedHasVoted) {
            setHasVoted(true);
        } else {
            setHasVoted(false);
        }

        // Only load local votes if we are NOT connected to a poll ID (offline mode)
        if (!poll.id) {
            const savedVotes = localStorage.getItem(`poll-${poll.question}`);
            if (savedVotes) {
                setVotes(JSON.parse(savedVotes));
            }
        }
    }, [poll.question, poll.id]);

    const totalVotes = votes.reduce((a, b) => a + b, 0);

    const handleVote = async (index) => {
        if (hasVoted) return;

        // Optimistic update (Local)
        const newVotes = [...votes];
        newVotes[index] += 1;
        setVotes(newVotes);
        setHasVoted(true);

        localStorage.setItem(`poll-${poll.question}`, JSON.stringify(newVotes));
        localStorage.setItem(`poll-voted-${poll.question}`, 'true');

        // Backend update
        if (poll.id) {
            try {
                await fetch(`/api/polls/${poll.id}/vote`, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ answer: poll.options[index] })
                });
            } catch (error) {
                console.error("Failed to send vote to backend:", error);
            }
        }
    };

    const handleGoLive = async () => {
        try {
            const response = await fetch('/api/polls', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    question: poll.question,
                    options: poll.options
                })
            });

            if (response.ok) {
                const newPoll = await response.json();
                setPoll(prev => ({ ...prev, id: newPoll.id }));
                // Clear local votes if you want to start fresh or keep them if you want to sync (complex)
                // For simplicity, we start fresh on the server, but we could try to sync.
                // Let's keep it simple: "Going Live" starts the session. 
            }
        } catch (error) {
            console.error("Failed to go live:", error);
        }
    };

    if (loading && !poll.question) return <div className="p-6 text-center text-slate-400">Cargando encuesta...</div>;

    return (
        <div className="bg-white p-6 rounded-xl shadow-lg border border-slate-100">
            <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-2 text-secondary">
                    <BarChart3 className="w-6 h-6" />
                    <span className="text-xs font-bold uppercase tracking-wider">Encuesta en vivo {poll.id ? '(Online)' : '(Local)'}</span>
                </div>
                {!poll.id && (
                    <button
                        onClick={handleGoLive}
                        className="px-3 py-1 bg-accent text-primary text-xs font-bold uppercase tracking-widest rounded-full hover:bg-yellow-400 transition-colors shadow-sm"
                    >
                        Iniciar Online
                    </button>
                )}
            </div>

            <h3 className="text-xl font-bold text-slate-800 mb-6 leading-tight">{poll.question}</h3>

            <div className="space-y-3">
                {poll.options.map((option, index) => {
                    const percentage = totalVotes === 0 ? 0 : Math.round((votes[index] / totalVotes) * 100);

                    return (
                        <div key={index} className="relative group">
                            <button
                                onClick={() => handleVote(index)}
                                disabled={hasVoted}
                                className={`w-full text-left p-4 rounded-xl border-2 transition-all relative z-10 overflow-hidden
                  ${hasVoted
                                        ? 'border-transparent cursor-default'
                                        : 'border-slate-200 hover:border-primary hover:bg-blue-50/30'}`}
                            >
                                <div className="relative z-10 flex justify-between items-center font-bold text-slate-700">
                                    <span>{option}</span>
                                    {hasVoted && (
                                        <span className="text-sm font-black text-slate-500">
                                            {percentage}%
                                        </span>
                                    )}
                                </div>
                            </button>

                            {hasVoted && (
                                <div
                                    className="absolute top-0 left-0 h-full bg-blue-100/50 rounded-xl transition-all duration-1000 ease-out z-0"
                                    style={{ width: `${percentage}%` }}
                                />
                            )}
                        </div>
                    );
                })}
            </div>

            {hasVoted && (
                <div className="mt-8 pt-6 border-t border-slate-100 text-center animate-in fade-in slide-in-from-top-2">
                    <div className="inline-flex items-center gap-2 px-4 py-2 bg-emerald-50 text-emerald-700 rounded-full text-xs font-black uppercase tracking-widest mb-4">
                        <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></div>
                        Voto Anónimo Registrado
                    </div>
                    <p className="text-sm text-slate-400 font-medium">Estadísticas basadas en {totalVotes} aportes grupales.</p>
                </div>
            )}
        </div>
    );
};

export default LivePoll;
