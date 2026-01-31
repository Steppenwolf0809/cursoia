import { useState, useEffect } from 'react';
import { supabase, SESSION_CODE } from '../lib/supabase';

export function usePolls(pollId) {
    const [votes, setVotes] = useState([]);
    const [loading, setLoading] = useState(true);
    const [hasVoted, setHasVoted] = useState(false);

    useEffect(() => {
        if (!pollId) return;

        // Check local storage for vote
        const localVote = localStorage.getItem(`poll_vote_${pollId}`);
        if (localVote) setHasVoted(true);

        fetchVotes();

        const subscription = supabase
            .channel('poll_votes_channel')
            .on('postgres_changes', {
                event: 'INSERT',
                schema: 'public',
                table: 'poll_votes',
                filter: `session_code=eq.${SESSION_CODE}`
            }, (payload) => {
                // Solo actualizar si el voto corresponde a este poll
                if (payload.new.poll_id === pollId) {
                    setVotes(current => [...current, payload.new]);
                }
            })
            .subscribe();

        return () => {
            subscription.unsubscribe();
        };
    }, [pollId]);

    async function fetchVotes() {
        const { data } = await supabase
            .from('poll_votes')
            .select('*')
            .eq('session_code', SESSION_CODE)
            .eq('poll_id', pollId);

        if (data) setVotes(data);
        setLoading(false);
    }

    async function submitVote(optionIndex, participantId) {
        if (hasVoted) return;

        const { error } = await supabase
            .from('poll_votes')
            .insert({
                session_code: SESSION_CODE,
                poll_id: pollId,
                option_index: optionIndex,
                participant_id: participantId
            });

        if (!error) {
            localStorage.setItem(`poll_vote_${pollId}`, 'true');
            setHasVoted(true);
        }
        return error;
    }

    return { votes, loading, submitVote, hasVoted };
}
