// Update the Prescription interface to include diagnoses array
export interface Prescription {
  id: string;
  prescriptionId: string;
  visitId: string;
  patientId: string;
  date: string;
  vitalSigns: VitalSigns;
  symptoms: string;
  diagnoses: string[]; // Changed from single diagnosis to array
  medications: Medication[];
  labTests: string[];
}

// Rest of the types remain the same
export interface Patient {
  id: string;
  patientId: string;
  name: string;
  age: number;
  gender: 'male' | 'female' | 'other';
  phoneNumber: string;
  visits: Visit[];
}

export interface Visit {
  id: string;
  visitId: string;
  patientId: string;
  date: string;
  prescriptionId?: string;
  vitalSigns?: VitalSigns;
}

export interface VitalSigns {
  bloodPressure: string;
  pulseRate: number;
  temperature: number;
  weight: number;
}

export interface Medication {
  name: string;
  dosage: string;
  interval: string;
  duration: string;
  instructions: string;
}
