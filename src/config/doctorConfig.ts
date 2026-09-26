/**
 * Centralized Practice and Clinical Configuration for Dr. Awais Ahmad
 * Neuro Electrophysiologist
 * 
 * All details can be customized here or updated directly via the Clinic Management portal.
 */

export interface ServiceItem {
  id: string;
  title: string;
  shortTitle: string;
  category: 'eeg' | 'emg' | 'ncs' | 'evoked' | 'consult';
  description: string;
  clinicalPurpose: string;
  preparation: string[];
  estimatedDuration: string;
  reportTurnaround: string;
  isAvailable: boolean;
}

export interface ConditionItem {
  id: string;
  name: string;
  category: 'Central' | 'Peripheral' | 'Paroxysmal' | 'General';
  description: string;
  relevantAssessments: string[];
}

export interface FaqItem {
  id: string;
  question: string;
  answer: string;
  category: 'general' | 'procedure' | 'preparation';
}

export interface ArticleItem {
  id: string;
  title: string;
  readTime: string;
  category: string;
  publishedDate: string;
  excerpt: string;
  content: string[];
}

export interface DoctorConfig {
  name: string;
  salutation: string;
  specialty: string;
  specialtySubtitle: string;
  degree: string;
  experienceYears: string;
  currentHospital: string;
  academicAffiliation: string;
  city: string;
  country: string;
  phone: string;
  phoneDisplay: string;
  whatsapp: string;
  whatsappDisplay: string;
  email: string;
  clinicAddress: string;
  consultationHours: string;
  workingDays: string[];
  slotIntervalMinutes: number;
  availableSlots: string[];
  maxAppointmentsPerDay: number;
  services: ServiceItem[];
  conditions: ConditionItem[];
  faqs: FaqItem[];
  articles: ArticleItem[];
}

export const INITIAL_DOCTOR_CONFIG: DoctorConfig = {
  name: "Dr. Awais Ahmad",
  salutation: "Dr.",
  specialty: "Neuro Electrophysiologist",
  specialtySubtitle: "Specialist Neurological Evaluation & Diagnostic Neurophysiology",
  degree: "Bachelor of Science in Neurophysiology Technology (BSNT)",
  experienceYears: "5+ Years Clinical Practice",
  currentHospital: "Mayo Hospital Lahore",
  academicAffiliation: "King Edward Medical University Lahore",
  city: "Lahore",
  country: "Pakistan",
  phone: "+923081839483",
  phoneDisplay: "0308-1839483",
  whatsapp: "923081839483",
  whatsappDisplay: "+92 308 1839483",
  email: "electrophysiology7@gmail.com",
  clinicAddress: "Department of Neurophysiology, Mayo Hospital / King Edward Medical University, Nelagumbad, Anarkali, Lahore, Punjab, Pakistan",
  consultationHours: "Monday to Saturday: 09:00 AM – 06:00 PM",
  workingDays: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
  slotIntervalMinutes: 30,
  availableSlots: [
    "09:00 AM",
    "09:30 AM",
    "10:00 AM",
    "10:30 AM",
    "11:00 AM",
    "11:30 AM",
    "12:00 PM",
    "04:00 PM",
    "04:30 PM",
    "05:00 PM",
    "05:30 PM",
    "06:00 PM"
  ],
  maxAppointmentsPerDay: 20,
  services: [
    {
      id: "eeg-routine",
      title: "Electroencephalography (Routine EEG)",
      shortTitle: "Routine EEG",
      category: "eeg",
      description: "Non-invasive recording and analysis of spontaneous electrical patterns in cerebral cortex to investigate neurological activity.",
      clinicalPurpose: "Evaluates cerebral electrical activity, identifies paroxysmal discharges, and aids in the clinical evaluation of seizures and transient altered consciousness.",
      preparation: [
        "Wash hair thoroughly the night before; do not use oils, gels, or styling sprays.",
        "Take regular medications as advised by your physician, unless explicitly instructed otherwise.",
        "Avoid caffeinated drinks (tea, coffee, energy drinks) 6-8 hours before testing."
      ],
      estimatedDuration: "35 - 45 Minutes",
      reportTurnaround: "Within 24 - 48 hours",
      isAvailable: true
    },
    {
      id: "video-eeg",
      title: "Video Electroencephalography (Video EEG)",
      shortTitle: "Video EEG Monitoring",
      category: "eeg",
      description: "Synchronized continuous electroencephalographic recording with high-definition digital video capture.",
      clinicalPurpose: "Provides continuous correlation between observable physical events or behaviors and corresponding cerebral electrical rhythms.",
      preparation: [
        "Arrive with clean, dry scalp free from oils or hair products.",
        "Wear comfortable, loose front-buttoned clothing.",
        "Bring a family member or caregiver if clinical episodes are frequent."
      ],
      estimatedDuration: "1 - 3 Hours (or extended based on protocol)",
      reportTurnaround: "Detailed reviewed report within 48 hours",
      isAvailable: true
    },
    {
      id: "emg-needle",
      title: "Electromyography (EMG)",
      shortTitle: "Electromyography (EMG)",
      category: "emg",
      description: "Precision neurophysiological evaluation of intrinsic electrical properties of skeletal muscle fibers at rest and during voluntary contraction.",
      clinicalPurpose: "Differentiates primary myopathic processes from neuropathic denervation and neuromuscular junction disorders.",
      preparation: [
        "Bathe or shower before the appointment; do not apply body lotions or creams to limbs.",
        "Wear loose, easily rolled-up garments.",
        "Inform the clinician if you are on blood thinners (anticoagulants) or have a pacemaker."
      ],
      estimatedDuration: "30 - 45 Minutes",
      reportTurnaround: "Preliminary review same-day, final report within 24 hours",
      isAvailable: true
    },
    {
      id: "nerve-conduction",
      title: "Nerve Conduction Studies (NCS)",
      shortTitle: "NCS / Nerve Velocity",
      category: "ncs",
      description: "Measurement of the transmission speed and amplitude of electrical signals through sensory and motor peripheral nerves.",
      clinicalPurpose: "Assesses peripheral nerve integrity, focal entrapments (e.g., Carpal Tunnel Syndrome), radiculopathies, and peripheral neuropathies.",
      preparation: [
        "Keep hands and feet comfortably warm before the test.",
        "Do not apply lotions, emollients, or moisturizers to arms and legs.",
        "Remove bracelets, rings, or tight jewelry from tested limbs."
      ],
      estimatedDuration: "30 - 50 Minutes",
      reportTurnaround: "Same-day or next business day",
      isAvailable: true
    },
    {
      id: "evoked-potentials",
      title: "Evoked Potential Studies (VEP / BAEP / SSEP)",
      shortTitle: "Evoked Potentials",
      category: "evoked",
      description: "Measurement of electrical responses generated by the nervous system in response to specific sensory stimuli.",
      clinicalPurpose: "Detects subclinical slowing or interruption in visual, auditory, or somatosensory central conduction pathways.",
      preparation: [
        "Clean hair without hair products for scalp electrode application.",
        "Bring corrective eyeglasses if undergoing Visual Evoked Potentials (VEP).",
        "Avoid eye makeup for visual pathway testing."
      ],
      estimatedDuration: "45 - 60 Minutes",
      reportTurnaround: "Within 48 hours",
      isAvailable: true
    },
    {
      id: "neuromuscular-assessment",
      title: "Comprehensive Neuromuscular Evaluation",
      shortTitle: "Neuromuscular Evaluation",
      category: "emg",
      description: "Integrated clinical protocol combining motor/sensory nerve conduction testing with focused electromyographic evaluation.",
      clinicalPurpose: "Investigates generalized weakness, motor neuron disease features, plexopathies, or polyneuropathies.",
      preparation: [
        "Bring recent MRI, CT scans, and laboratory blood reports if available.",
        "Ensure limbs are warm and skin is clean and unlotioned.",
        "List all current medications."
      ],
      estimatedDuration: "60 Minutes",
      reportTurnaround: "1 - 2 business days",
      isAvailable: true
    },
    {
      id: "neuro-consultation",
      title: "Neurophysiological Consultation",
      shortTitle: "Diagnostic Consultation",
      category: "consult",
      description: "Initial clinical evaluation to determine optimal neurophysiological diagnostic protocols based on patient symptoms.",
      clinicalPurpose: "Detailed review of presenting neurological symptoms, prior test findings, and tailored selection of electrophysiological modalities.",
      preparation: [
        "Compile a written timeline of symptoms.",
        "Bring all previous medical reports, imaging discs, and physician referral notes.",
        "Bring a current list of all prescribed medications."
      ],
      estimatedDuration: "30 Minutes",
      reportTurnaround: "Clinical summary provided immediately",
      isAvailable: true
    },
    {
      id: "followup-consultation",
      title: "Follow-Up & Report Review",
      shortTitle: "Follow-Up Consultation",
      category: "consult",
      description: "Detailed review of completed electrophysiological findings, test correlations, and collaborative guidance for referring physicians.",
      clinicalPurpose: "Clear explanation of diagnostic waveforms, significance of findings, and coordination with primary neurologist/physician.",
      preparation: [
        "Bring your original neurophysiology report and test recordings.",
        "Prepare any questions regarding your test outcome.",
        "Family members or caregivers are welcome to attend."
      ],
      estimatedDuration: "20 - 30 Minutes",
      reportTurnaround: "Immediate consultation notes",
      isAvailable: true
    }
  ],
  conditions: [
    {
      id: "seizures",
      name: "Seizures",
      category: "Paroxysmal",
      description: "Sudden surges of abnormal electrical activity in the brain causing changes in behavior, movements, or consciousness.",
      relevantAssessments: ["Routine EEG", "Video EEG Monitoring"]
    },
    {
      id: "epilepsy",
      name: "Epilepsy",
      category: "Paroxysmal",
      description: "A neurological condition characterized by a predisposition to recurrent, unprovoked epileptic seizures.",
      relevantAssessments: ["Routine EEG", "Sleep-Deprived EEG", "Video EEG"]
    },
    {
      id: "unexplained-consciousness",
      name: "Unexplained Loss of Consciousness",
      category: "Paroxysmal",
      description: "Transient blackout episodes, syncope, or drop attacks that require differential diagnosis between neurogenic and cardiogenic origins.",
      relevantAssessments: ["Routine EEG", "Video EEG", "Cardiac sync review"]
    },
    {
      id: "numbness-tingling",
      name: "Numbness & Tingling",
      category: "Peripheral",
      description: "Paresthesia, pins-and-needles sensations, or sensory loss in extremities indicating potential peripheral nerve dysfunction.",
      relevantAssessments: ["Nerve Conduction Studies (NCS)", "Sensory Evoked Potentials"]
    },
    {
      id: "muscle-weakness",
      name: "Muscle Weakness",
      category: "Peripheral",
      description: "Reduced muscle strength in arms, legs, or facial musculature investigated for neuropathic versus myopathic etiology.",
      relevantAssessments: ["Electromyography (EMG)", "Motor Nerve Conduction"]
    },
    {
      id: "nerve-pain",
      name: "Nerve Pain (Neuropathic Pain)",
      category: "Peripheral",
      description: "Burning, sharp, shooting, or electric shock-like sensations caused by nerve compression or irritated pathways.",
      relevantAssessments: ["Nerve Conduction Studies", "EMG"]
    },
    {
      id: "neuropathy",
      name: "Peripheral Neuropathy",
      category: "Peripheral",
      description: "Systemic damage to peripheral nerves, often symmetrical, affecting distal extremities (e.g., diabetic neuropathy).",
      relevantAssessments: ["Comprehensive NCS", "Late Responses (F-Wave / H-Reflex)"]
    },
    {
      id: "neuromuscular-disorders",
      name: "Neuromuscular Disorders",
      category: "Central",
      description: "Conditions impairing the functioning of muscles directly or through peripheral nerve connections and motor end-plates.",
      relevantAssessments: ["Repetitive Nerve Stimulation (RNS)", "Needle EMG"]
    },
    {
      id: "tremors",
      name: "Tremors & Involuntary Movements",
      category: "Central",
      description: "Rhythmic involuntary muscle contractions causing shaking movements in hands, arms, head, or legs.",
      relevantAssessments: ["Neurophysiological Tremor Analysis", "Surface EMG"]
    },
    {
      id: "sleep-concerns",
      name: "Sleep-Related Neurological Concerns",
      category: "Paroxysmal",
      description: "Nocturnal paroxysmal motor events, parasomnias, or nocturnal seizures needing continuous electrographic analysis.",
      relevantAssessments: ["Sleep-Stage EEG Recording", "Video EEG"]
    },
    {
      id: "other-symptoms",
      name: "Other Neurological Symptoms",
      category: "General",
      description: "Limb clumsiness, radicular back pain with radiating symptoms, or cranial nerve sensory alterations.",
      relevantAssessments: ["Tailored Neurophysiological Protocol"]
    }
  ],
  faqs: [
    {
      id: "faq-1",
      question: "What is neurophysiology?",
      answer: "Neurophysiology is the specialized branch of medical science focused on evaluating the function and electrical activities of the central and peripheral nervous system. Using advanced bioelectrical recording instruments, neurophysiologists measure the functional integrity of the brain, spinal cord, nerves, and muscles to assist physicians in reaching an accurate, evidence-based diagnosis.",
      category: "general"
    },
    {
      id: "faq-2",
      question: "What does an EEG test evaluate?",
      answer: "An Electroencephalogram (EEG) records the spontaneous electrical oscillations (brain waves) generated by neurons in the cerebral cortex. It is primarily used to evaluate paroxysmal episodes, help differentiate epileptic from non-epileptic events, assess brain activity in altered consciousness, and evaluate patterns in sleep and encephalopathic conditions.",
      category: "procedure"
    },
    {
      id: "faq-3",
      question: "What is an EMG test?",
      answer: "Electromyography (EMG) evaluates the electrical activity of muscle fibers at rest and during voluntary muscle activation. A very thin, sterile recording pin is gently inserted into specific muscles to detect signs of electrical irritability, denervation, or myopathic change, helping distinguish between nerve diseases, muscle disorders, and junction conditions.",
      category: "procedure"
    },
    {
      id: "faq-4",
      question: "What are nerve conduction studies?",
      answer: "Nerve Conduction Studies (NCS) measure how efficiently and rapidly electrical impulses travel through peripheral nerves. Small electrical pulses are applied over a nerve while surface electrodes record the response down the pathway. This test determines whether nerve damage is localized (such as a pinched nerve in the wrist) or generalized (such as peripheral neuropathy).",
      category: "procedure"
    },
    {
      id: "faq-5",
      question: "How should I prepare for my appointment?",
      answer: "Preparation depends on your specific test: for an EEG, wash your hair the night prior and avoid oils, gels, and caffeine; for EMG and NCS, ensure your skin is clean and completely free from body lotions, moisturizers, or oils, and wear loose clothing that easily rolls above the elbows and knees. You should take all regular medications unless your referring doctor advised otherwise.",
      category: "preparation"
    },
    {
      id: "faq-6",
      question: "How long does a neurophysiological test take?",
      answer: "Most routine procedures—such as a standard EEG or focused Nerve Conduction Study—typically require between 30 and 45 minutes to complete. Combined EMG/NCS studies or specialized evoked potential recordings can take between 45 and 60 minutes. Extended video EEG monitoring may require several hours depending on the clinical query.",
      category: "procedure"
    },
    {
      id: "faq-7",
      question: "Can I book an appointment online?",
      answer: "Yes. You can submit an appointment request through our secure online scheduling system by choosing your preferred date, available time slot, and consultation or test type. Our clinic administrative team will review your request, verify slot availability, and contact you via phone or WhatsApp to finalize your appointment.",
      category: "general"
    },
    {
      id: "faq-8",
      question: "What should I bring to my appointment?",
      answer: "Please bring a valid photo identification, your doctor's referral letter or prescription, all previous diagnostic reports (including earlier EEGs, EMGs, MRIs, or CT scans on disc or film), and a complete written list of your current medications and dosages.",
      category: "preparation"
    }
  ],
  articles: [
    {
      id: "understanding-eeg",
      title: "Understanding EEG Testing: What Brain Wave Rhythms Reveal",
      readTime: "4 min read",
      category: "Brain Physiology",
      publishedDate: "Clinical Educational Resource",
      excerpt: "An accessible guide to how electroencephalography measures neural rhythms and helps clinicians evaluate neurological events.",
      content: [
        "The human brain contains billions of interconnected neurons communicating via rhythmic electrical impulses. An electroencephalogram (EEG) captures these microvolt signals through non-invasive surface sensors applied gently to the scalp.",
        "During an EEG recording, neurophysiologists analyze rhythmic brain patterns including alpha, beta, theta, and delta waves. Differences in symmetry, frequency, and background continuity provide crucial diagnostic insights into cerebral function.",
        "Routine recordings may include brief activation procedures such as intermittent photic stimulation or hyperventilation to evaluate how cortical pathways respond under controlled physiological conditions."
      ]
    },
    {
      id: "what-is-emg",
      title: "What Is an EMG? Deciphering Muscle & Motor Function",
      readTime: "5 min read",
      category: "Neuromuscular",
      publishedDate: "Clinical Educational Resource",
      excerpt: "Discover how electromyography detects subtle electrical signals within skeletal muscles to identify nerve and muscle conditions.",
      content: [
        "Electromyography (EMG) is a diagnostic technique designed to inspect the bioelectrical health of motor units—the motor neuron, its axon, and all muscle fibers it innervates.",
        "When skeletal muscles contract, they generate electrical currents that can be captured, amplified, and translated into visual waveforms and characteristic audio frequencies.",
        "By observing motor unit action potentials (MUAPs) during rest and graduated muscle activation, clinicians can differentiate between primary muscle disorders (myopathies) and denervating nerve conditions."
      ]
    },
    {
      id: "nerve-conduction-guide",
      title: "When Are Nerve Conduction Studies Recommended?",
      readTime: "4 min read",
      category: "Peripheral Nerves",
      publishedDate: "Clinical Educational Resource",
      excerpt: "Recognizing common indications for nerve conduction velocity assessments in numbness, tingling, and radiating weakness.",
      content: [
        "Peripheral nerves function as biological cables transmitting sensory information toward the central nervous system and motor commands out to muscles.",
        "NCS tests quantify latency (the time taken for an electrical impulse to travel a measured distance), amplitude (the volume of functional nerve fibers responding), and conduction velocity (speed in meters per second).",
        "Common indications include suspected entrapments such as Carpal Tunnel Syndrome or Cubital Tunnel Syndrome, diabetic polyneuropathies, and cervical or lumbosacral nerve root compression."
      ]
    },
    {
      id: "understanding-symptoms",
      title: "Understanding Neurological Symptoms: Numbness, Pain & Spasms",
      readTime: "5 min read",
      category: "Patient Care",
      publishedDate: "Clinical Educational Resource",
      excerpt: "How specialists systematically categorize tingling, unexplained loss of balance, and involuntary muscle contractions.",
      content: [
        "Neurological symptoms can originate from different tiers of the nervous system: cerebral hemispheres, brainstem, spinal cord, nerve roots, peripheral nerves, or muscle fibers.",
        "Accurate neurophysiological testing acts as an objective functional map, helping localize the precise level of disturbance without relying solely on subjective sensations.",
        "Understanding whether a symptom stems from focal entrapment or diffuse systemic involvement ensures appropriate therapy is selected by the patient's primary neurological care team."
      ]
    },
    {
      id: "preparing-for-test",
      title: "Preparing for Your Neurophysiology Test: A Practical Checklist",
      readTime: "3 min read",
      category: "Preparation Guide",
      publishedDate: "Clinical Educational Resource",
      excerpt: "Step-by-step guidance on how to prepare for your EEG, EMG, or Nerve Conduction appointment to ensure optimal diagnostic accuracy.",
      content: [
        "Proper preparation significantly improves the diagnostic clarity and comfort of any neurophysiological assessment.",
        "For scalp-based evaluations like EEG, removing hair oils and styling products ensures minimal electrical impedance across recording electrodes.",
        "For limb testing, maintaining comfortable warmth in the hands and feet before the examination ensures physiological conduction speeds are measured accurately."
      ]
    }
  ]
};
