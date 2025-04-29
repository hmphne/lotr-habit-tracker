import { supabase } from "./supabase";

export const createHabit = async (userId, name, category) => {
  const { data, error } = await supabase
    .from('habits')
    .insert({ user_id: userId, name, category })
    .select();
  return { data, error };
};

export const getUserHabits = async (userId) => {
  const { data, error } = await supabase
    .from('habits')
    .select('*')
    .eq('user_id', userId);
  return { data, error };
};

export const assignQuest = async (userId, questId) => {
  const { data, error } = await supabase
    .from('user_quests')
    .insert({ user_id: userId, quest_id: questId, status: 'active', progress: { habits_completed: 0 } })
    .select();
  return { data, error };
};

export const getUserQuests = async (userId) => {
  const { data, error } = await supabase
    .from('user_quests')
    .select('*, quests(name, description, objective, xp_reward)')
    .eq('user_id', userId);
  return { data, error };
};