import { useState, useEffect } from 'react';
import type { Prescription, VitalSigns, Medication } from '../types';
import { MEDICATIONS_BY_DIAGNOSIS } from '../constants/medications';
import { LAB_TESTS_BY_DIAGNOSIS } from '../constants/labTests';

export const usePrescription = (patientId: string, initialData?: Partial<Prescription>) => {
  const [prescription, setPrescription] = useState<Partial<Prescription>>({
    patientId,
    date: new Date().toISOString(),
    diagnoses: [],
    medications: [],
    labTests: [],
    ...initialData,
  });

  useEffect(() => {
    if (initialData) {
      setPrescription(prev => ({ ...prev, ...initialData }));
    }
  }, [initialData]);

  const updateVitalSigns = (vitalSigns: VitalSigns) => {
    setPrescription(prev => ({ ...prev, vitalSigns }));
  };

  const updateSymptoms = (symptoms: string) => {
    setPrescription(prev => ({ ...prev, symptoms }));
  };

  const updateDiagnoses = (diagnoses: string[]) => {
    // Combine medications and lab tests from all selected diagnoses
    const allMedications = diagnoses.flatMap(diagnosis => 
      MEDICATIONS_BY_DIAGNOSIS[diagnosis as keyof typeof MEDICATIONS_BY_DIAGNOSIS] || []
    );

    const allLabTests = diagnoses.flatMap(diagnosis => 
      LAB_TESTS_BY_DIAGNOSIS[diagnosis as keyof typeof LAB_TESTS_BY_DIAGNOSIS] || []
    );

    // Remove duplicates from lab tests
    const uniqueLabTests = Array.from(new Set(allLabTests));

    setPrescription(prev => ({
      ...prev,
      diagnoses,
      medications: allMedications,
      labTests: uniqueLabTests,
    }));
  };

  const updateMedications = (medications: Medication[]) => {
    setPrescription(prev => ({ ...prev, medications }));
  };

  return {
    prescription,
    updateVitalSigns,
    updateSymptoms,
    updateDiagnoses,
    updateMedications,
  };
};
