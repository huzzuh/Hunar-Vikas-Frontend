/**
 * Small static India state -> district sample list for the profile Details
 * tab. Covers the demo districts (Pune, Nashik, Nagpur) plus a spread of
 * other states. A backend would replace this with a full master list.
 */

export type StateDistricts = {
  state: string;
  districts: string[];
};

export const INDIA_STATES: StateDistricts[] = [
  { state: 'Maharashtra', districts: ['Mumbai', 'Pune', 'Nashik', 'Nagpur', 'Thane', 'Aurangabad'] },
  { state: 'Gujarat', districts: ['Ahmedabad', 'Surat', 'Vadodara'] },
  { state: 'Karnataka', districts: ['Bengaluru Urban', 'Mysuru', 'Hubballi-Dharwad'] },
  { state: 'Tamil Nadu', districts: ['Chennai', 'Coimbatore', 'Madurai'] },
  { state: 'Uttar Pradesh', districts: ['Lucknow', 'Kanpur Nagar', 'Varanasi'] },
  { state: 'West Bengal', districts: ['Kolkata', 'Howrah', 'Siliguri'] },
  { state: 'Rajasthan', districts: ['Jaipur', 'Udaipur', 'Jodhpur'] },
  { state: 'Delhi', districts: ['New Delhi', 'Central Delhi', 'South Delhi'] },
];

export function districtsFor(state: string): string[] {
  return INDIA_STATES.find((s) => s.state === state)?.districts ?? [];
}

export const LANGUAGES = ['Marathi', 'Hindi', 'English', 'Gujarati', 'Kannada', 'Tamil'];
