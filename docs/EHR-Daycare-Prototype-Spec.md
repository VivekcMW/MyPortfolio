# EHR Prototype — Indian Daycare Specialties

## Comprehensive Design & Development Specification

---

## 1. Executive Summary

A full-featured Electronic Health Record (EHR) system purpose-built for **Indian daycare hospitals and speciality centres**. Unlike generic EHR platforms retrofitted for Indian compliance, this system is designed ground-up around:

- **ABDM (Ayushman Bharat Digital Mission)** integration
- **ABHA ID** as the primary patient identifier
- **Daycare-first workflows** — optimized for same-day admission → procedure → discharge
- **Indian clinical coding** — ICD-11, NABH indicators, CGHS/ECHS rate lists
- **Multi-speciality daycare** coverage across 16 specialties

**Target users:** Daycare hospitals (50–200 beds), standalone daycare centres, hospital daycare wings, chain clinics across Tier 1–3 cities.

---

## 2. Indian Healthcare Context

### 2.1 Regulatory Landscape

| Framework | Relevance |
|-----------|-----------|
| **ABDM / ABHA** | Mandatory digital health ID; PHR integration; Health Information Exchange |
| **NABH** | National Accreditation Board for Hospitals — quality indicators, mandatory documentation |
| **CGHS / ECHS** | Central Government Health Scheme rate lists for procedure pricing |
| **PMJAY (Ayushman Bharat)** | Insurance scheme — pre-auth, claim workflows, package rates |
| **IRDAI** | Insurance regulatory compliance for TPA integration |
| **CDSCO** | Drug regulatory — Schedule H/H1 drug tracking |
| **PNDT Act** | Pre-natal diagnostic restrictions (Radiology/OB-GYN) |
| **MTP Act** | Medical Termination of Pregnancy regulations |
| **PCPNDT** | Pre-Conception and Pre-Natal Diagnostic Techniques — form F compliance |
| **Clinical Establishments Act** | State-level registration and compliance |
| **IT Act / DPDP Act 2023** | Data Protection — consent management, data localization |

### 2.2 Daycare vs. Inpatient — Key Differences

| Dimension | Daycare | Inpatient |
|-----------|---------|-----------|
| Stay duration | < 24 hours | ≥ 24 hours |
| Bed management | Recliner/procedure chair/bay | Ward/room/ICU |
| Billing | Package-based + consumables | Per-day + services |
| Discharge | Same-day with post-procedure observation | Multi-day with clinical milestones |
| Documentation | Focused procedure note | Detailed progress notes |
| Insurance | Pre-auth often instant/expedited | Standard pre-auth cycle |
| Follow-up | Tele-consult + 48hr check | OPD follow-up |

---

## 3. Daycare Specialties Covered (16)

### 3.1 Ophthalmology
**Common procedures:** Cataract (Phaco + IOL), LASIK/PRK, Pterygium excision, DCR, Intravitreal injection, Retinal laser, Glaucoma surgery, Squint correction, Chalazion excision

**Unique workflow needs:**
- Pre-op: Visual acuity, IOP, A-scan biometry, IOL power calculation
- Intra-op: IOL details (type, power, manufacturer, batch), microscope settings
- Post-op: Same-day vision check, eye patch protocol, drop schedule
- Equipment integration: Auto-refractometer, OCT, fundus camera
- PMJAY packages: Cataract surgery is highest-volume PMJAY procedure in India

### 3.2 ENT (Otorhinolaryngology)
**Common procedures:** Tonsillectomy, Adenoidectomy, Septoplasty, FESS (Functional Endoscopic Sinus Surgery), Myringotomy + Grommet, Microlaryngoscopy, Foreign body removal, Ear lobe repair

**Unique workflow needs:**
- Audiometry and tympanometry integration
- Endoscopy image/video capture and storage
- Voice assessment (pre/post surgery)
- Nasal packing tracking with removal schedule

### 3.3 Orthopedics (Daycare)
**Common procedures:** Arthroscopy (knee/shoulder), Carpal tunnel release, Trigger finger release, Ganglion excision, Fracture reduction under GA, PRP/Prolotherapy, Hardware removal

**Unique workflow needs:**
- Implant tracking (batch, manufacturer, size, sterility)
- Physiotherapy referral workflow
- Pre-op imaging viewer (X-ray, MRI integration via DICOM)
- Post-op immobilization documentation (cast type, duration)
- Return-to-activity timeline

### 3.4 Dermatology & Cosmetic
**Common procedures:** Laser hair removal, Scar revision, Mole/wart excision, Chemical peels, PRP for hair, Botox/fillers, Vitiligo surgery, Skin biopsy

**Unique workflow needs:**
- Before/after photo documentation with consent
- Skin type documentation (Fitzpatrick scale)
- Laser parameters logging (wavelength, fluence, pulse duration)
- Product/consumable tracking (Botox units, filler ml)
- Session-based treatment plans (multiple visits)
- Cosmetic procedures — separate from medical billing (no insurance)

### 3.5 Gastroenterology
**Common procedures:** Upper GI endoscopy (OGD), Colonoscopy, Polypectomy, ERCP, Liver biopsy, Capsule endoscopy, Band ligation, PEG tube placement

**Unique workflow needs:**
- Bowel prep tracking and compliance
- Sedation monitoring (conscious sedation protocol)
- Endoscopy image annotation and reporting
- Polyp registry with histopathology correlation
- Biopsy tracking → pathology lab integration
- Prep instructions (diet, medication hold) via SMS/WhatsApp

### 3.6 Urology
**Common procedures:** Cystoscopy, ESWL (Lithotripsy), DJ stent placement/removal, Circumcision, Urodynamic studies, TURP (select daycare), Varicocelectomy

**Unique workflow needs:**
- Stone size/location documentation with imaging
- Lithotripsy session parameters (shocks, energy level)
- Catheter tracking (insertion, type, planned removal)
- Post-void residual documentation
- Stent registry with removal date tracking

### 3.7 Gynecology (Daycare)
**Common procedures:** D&C, Hysteroscopy, Colposcopy + biopsy, LEEP/LLETZ, IUI, Bartholin cyst drainage, Cervical cerclage

**Unique workflow needs:**
- Menstrual history and LMP tracking
- Pregnancy test mandatory pre-procedure
- PCPNDT compliance (Form F for all imaging)
- MTP Act compliance where applicable
- Fertility treatment cycle tracking
- Pap smear/HPV result integration

### 3.8 Dental Surgery
**Common procedures:** Impacted tooth extraction, Dental implants, Apicoectomy, Cyst enucleation, Alveoloplasty, TMJ arthrocentesis, Biopsy

**Unique workflow needs:**
- Dental chart (tooth numbering — FDI notation)
- OPG/CBCT image integration
- Implant registry (brand, size, lot number)
- Procedure-specific consent forms
- Local vs. GA documentation

### 3.9 Cardiology (Daycare)
**Common procedures:** Coronary angiography (CAG), Angioplasty (PTCA), Pacemaker implantation, EP study, Device closure (ASD/PDA), TEE

**Unique workflow needs:**
- Cath lab integration
- Stent/device registry (type, manufacturer, serial number, size)
- Heparin/anticoagulation protocol tracking
- Hemodynamic data recording
- Sheath removal and groin check protocol
- 6-hour post-procedure observation workflow
- PMJAY/CGHS package mapping for cardiac procedures

### 3.10 General Surgery (Daycare)
**Common procedures:** Hernia repair (laparoscopic), Lipoma excision, Abscess I&D, Pilonidal sinus, Fissure/fistula surgery, Circumcision, Appendectomy (lap), Cholecystectomy (lap — select daycare)

**Unique workflow needs:**
- Mesh/implant tracking for hernia
- Wound classification documentation
- Antibiotic prophylaxis protocol
- Drain output monitoring (short-duration)
- Laparoscopic equipment and trocar details

### 3.11 Oncology (Chemotherapy Daycare)
**Common procedures:** IV Chemotherapy, Immunotherapy, Targeted therapy, Intrathecal chemo, Port-a-cath insertion, Bone marrow biopsy

**Unique workflow needs:**
- Chemotherapy protocol management (NCCN/institution-specific)
- Drug dose calculation (BSA, weight-based, AUC)
- Cycle tracking (cycle number, day, regimen)
- Toxicity grading (CTCAE v5)
- Anti-emetic protocol
- Blood count verification workflow (chemo hold if counts low)
- Drug preparation and administration timing
- Extravasation protocol
- Consent per cycle
- Pharmacy integration for cytotoxic drug handling

### 3.12 Nephrology (Dialysis Daycare)
**Common procedures:** Hemodialysis, Peritoneal dialysis training, AV fistula assessment, Kidney biopsy, Renal artery stenting

**Unique workflow needs:**
- Dialysis prescription (duration, blood flow, dialysate composition)
- Machine parameters logging (Kt/V, URR)
- Access assessment (fistula/graft/catheter)
- Dry weight tracking
- Monthly lab panel tracking (Hb, Ca, PO4, PTH, KTV)
- EPO and iron dosing
- Water quality reports
- Infection tracking (exit site, bacteremia)
- PMJAY dialysis package — per-session billing

### 3.13 Pulmonology
**Common procedures:** Bronchoscopy, BAL, Pleural tap/biopsy, Pleurodesis, Lung biopsy, Sleep study (polysomnography), Pulmonary function test

**Unique workflow needs:**
- PFT result documentation and trending
- Bronchoscopy image/video capture
- Specimen tracking (BAL, biopsy)
- Oxygen saturation continuous monitoring
- Sedation protocol
- TB screening documentation

### 3.14 Pain Management
**Common procedures:** Epidural steroid injection, Facet joint block, Nerve block, Trigger point injection, Radiofrequency ablation, Spinal cord stimulator trial, PRP injection

**Unique workflow needs:**
- Pain score documentation (VAS/NRS — pre, during, post)
- Fluoroscopy-guided procedure documentation
- Needle placement documentation with imaging
- Drug and volume logging per injection site
- Follow-up pain diary integration

### 3.15 Pediatric Daycare
**Common procedures:** Circumcision, Herniotomy, Tongue-tie release, Minor burns dressing, Ear/nose foreign body, Dental under GA, Vaccination catch-up

**Unique workflow needs:**
- Age-appropriate vital signs (pediatric normal ranges)
- Weight-based drug dosing
- Parent/guardian consent (mandatory)
- Immunization history integration (CoWIN)
- Pediatric pain assessment (FLACC scale)
- Child-friendly discharge instructions

### 3.16 Radiology (Interventional Daycare)
**Common procedures:** Image-guided biopsy, Abscess drainage, FNAC, Joint injection under guidance, Catheter placement, Embolization

**Unique workflow needs:**
- DICOM integration (PACS viewer)
- Radiation dose tracking
- Contrast allergy documentation
- Image-guided procedure reporting template
- PCPNDT compliance for all imaging involving pregnancy

---

## 4. Core Modules

### 4.1 Patient Registration & Identity

```
┌──────────────────────────────────────────────────────┐
│  Patient Registration                                │
│                                                      │
│  ┌─────────────┐  ┌──────────────┐  ┌─────────────┐ │
│  │ ABHA ID     │  │ Aadhaar OTP  │  │ Manual      │ │
│  │ Scan/Link   │  │ Verification │  │ Entry       │ │
│  └──────┬──────┘  └──────┬───────┘  └──────┬──────┘ │
│         │                │                  │        │
│         └────────────────┼──────────────────┘        │
│                          │                           │
│                 ┌────────▼────────┐                  │
│                 │  Patient Master │                  │
│                 │  Demographics   │                  │
│                 │  Insurance      │                  │
│                 │  Emergency Cx   │                  │
│                 └─────────────────┘                  │
└──────────────────────────────────────────────────────┘
```

**Fields:**
- ABHA ID (14-digit / ABHA address)
- Name (as per Aadhaar/ID proof)
- Gender (Male / Female / Transgender — as per Indian law)
- Date of Birth
- Aadhaar (last 4 digits stored, full verified via OTP)
- Mobile number (primary + alternate)
- Address (State, District, Pincode — LGDP codes)
- Blood group
- Allergies (drug, food, latex, contrast)
- Emergency contact
- Insurance details (TPA, policy number, PMJAY beneficiary ID)
- Language preference (for discharge summary generation)
- Religion / Diet preference (vegetarian/non-vegetarian — for meal planning)

### 4.2 Appointment & Scheduling

**Features:**
- Slot-based scheduling per doctor/procedure room
- OPD → Daycare conversion workflow
- Multi-resource booking (doctor + procedure room + equipment + anesthetist)
- Waiting list management
- SMS/WhatsApp appointment reminders
- Pre-procedure instructions delivery (bowel prep, fasting, medication hold)
- Online booking via patient app
- Walk-in with queue management (token system)

**Daycare-specific scheduling:**
- Procedure duration estimation per specialty
- Recovery bay/recliner allocation
- Staggered scheduling to maximize throughput
- NPO (nil per os) time slot enforcement
- Anesthetist availability check

### 4.3 OPD Module

**Workflow:**
```
Token/Queue → Vitals → Doctor Consultation → Investigation Orders →
→ Prescription → Daycare Scheduling (if procedure needed) →
→ Billing → Pharmacy
```

**Doctor workspace:**
- Chief complaint (free text + coded)
- History of present illness
- Past medical/surgical history
- Family history
- Personal history (smoking, alcohol, tobacco — pan/gutka tracking specific to India)
- Review of systems
- Physical examination (specialty-specific templates)
- Assessment (ICD-11 coding with Indian disease prevalence suggestions)
- Plan (procedure scheduling, medical management, referral)
- Prescription (generic drug preference with brand mapping)
- Follow-up scheduling

**Indian-specific features:**
- AYUSH integration (Ayurveda, Yoga, Unani, Siddha, Homeopathy consultation)
- Prescription in Hindi/regional language option
- Generic drug mandate compliance
- Drug schedule classification (H, H1, X) display
- Jan Aushadhi generic alternatives suggestion

### 4.4 Daycare Admission (Pre-Procedure)

**Workflow:**
```
Pre-Auth (Insurance) → Pre-Procedure Assessment → Consent →
→ Pre-op Checklist → Anesthesia Assessment → Bay/Bed Allocation →
→ Procedure Start
```

**Pre-procedure assessment:**
- Fitness certification
- Anesthesia pre-assessment (ASA grading, Mallampati score, airway assessment)
- Investigation review (CBC, RFT, LFT, coagulation, ECG, CXR)
- Anticoagulant/antiplatelet medication hold verification
- NPO status verification
- Allergy verification (wristband printing)
- Site marking (laterality verification — WHO Surgical Safety Checklist)
- Blood arrangement (if applicable)

**Consent management:**
- Informed consent (procedure-specific, bilingual — English + regional language)
- Anesthesia consent
- High-risk consent
- Blood transfusion consent
- Photography/video consent (for endoscopy, cosmetic)
- PCPNDT Form F (where applicable)
- Digital signature capture (patient + witness + doctor)
- Consent audit trail

### 4.5 Procedure Documentation

**WHO Surgical Safety Checklist (mandatory):**
- Sign In (before anesthesia)
- Time Out (before incision)
- Sign Out (before patient leaves OR)

**Procedure note template:**
- Procedure name (coded — ICD-10-PCS / custom)
- Surgeon, assistant, anesthetist, scrub nurse
- Anesthesia type (LA, RA, GA, sedation)
- Incision time, procedure start, procedure end
- Findings
- Procedure performed (step-by-step)
- Specimens sent (with tracking)
- Implants/devices used (with manufacturer, serial, batch)
- Blood loss estimation
- Complications (if any)
- Post-op instructions

**Specialty templates (pre-built):**
- Ophthalmology: Phaco template, LASIK template, Vitrectomy template
- Cardiology: CAG report, PTCA report with stent details
- GI: Endoscopy report with image annotation, polyp documentation
- Orthopedics: Arthroscopy report with intra-op images
- Oncology: Chemo administration record
- Urology: Lithotripsy report, cystoscopy report
- (And so on for each of the 16 specialties)

### 4.6 Anesthesia Module

**Pre-anesthesia:**
- PAC (Pre-Anesthesia Checkup) template
- ASA classification
- Fasting assessment
- Airway assessment (Mallampati, mouth opening, neck mobility)
- Previous anesthesia history
- Drug allergy documentation

**Intra-procedure:**
- Anesthesia chart (real-time vitals plotting)
- Drug administration log (induction, maintenance, reversal)
- Fluid input/output
- Airway management details
- Intra-operative events
- Monitor integration (SpO2, ECG, NIBP, EtCO2, BIS)

**Post-anesthesia:**
- PACU scoring (Aldrete score)
- Pain assessment (VAS/NRS)
- Nausea/vomiting assessment (PONV)
- Discharge from recovery criteria

### 4.7 Nursing Module

**Daycare nursing workflow:**
- Patient receiving and identification (2-identifier check)
- Pre-procedure checklist execution
- Vitals monitoring (admission, pre-procedure, intra-procedure, post-procedure, discharge)
- Medication administration record (MAR)
- IV chart
- Intake/output chart
- Pain assessment at intervals
- Post-procedure observation chart
- Drain/catheter care documentation
- Patient education documentation
- Discharge checklist
- Handoff communication (SBAR format)

**Nursing assessment templates:**
- Fall risk assessment (Morse Fall Scale)
- Pressure injury risk (Braden Scale — for extended daycare)
- Nutritional screening
- VTE risk assessment

### 4.8 Pharmacy Module

**Features:**
- Drug master (Indian pharmacopeia)
- Generic + brand mapping
- Schedule H/H1/X drug tracking
- Drug-drug interaction alerts
- Drug-allergy cross-check
- Dose range checking (adult + pediatric weight-based)
- Narcotic drug register (NDPS Act compliance)
- Batch and expiry tracking
- Return drug management
- Jan Aushadhi alternative suggestions
- Auto-substitution rules
- Multi-location inventory

**Daycare-specific:**
- Pre-procedure medication orders (prophylactic antibiotics, anxiolytics)
- Intra-procedure drug logging
- Post-procedure take-home prescription
- Discharge medication counseling checklist

### 4.9 Laboratory Module

**Features:**
- Investigation ordering with clinical indication
- Barcode-based sample tracking
- Normal range by age/gender (Indian reference ranges)
- Critical value alerts
- Culture and sensitivity reporting
- Histopathology report integration
- NABL-accredited lab report format
- External lab integration (API — Thyrocare, SRL, Metropolis, Dr. Lal PathLabs)
- Trending (patient's historical values)
- Auto-reflex testing rules

### 4.10 Radiology / Imaging Module

**Features:**
- PACS integration (DICOM viewer)
- Modality worklist
- Structured radiology reporting (BIRADS, TIRADS, PIRADS)
- HL7/FHIR integration
- PCPNDT compliance (Form F auto-generation for OB/GYN scans)
- Radiation dose tracking
- Teleradiology support
- AI-assisted reporting (chest X-ray, mammography — future)

### 4.11 Billing & Revenue Cycle

**Indian healthcare billing complexity:**
```
┌──────────────────────────────────────────────────────────────────┐
│                     Billing Engine                                │
│                                                                  │
│  ┌────────────┐  ┌────────────┐  ┌────────────┐  ┌───────────┐ │
│  │ Cash/Self  │  │ Insurance  │  │ PMJAY      │  │ CGHS/ECHS │ │
│  │ Pay        │  │ (TPA)      │  │ (Govt)     │  │ (Govt)    │ │
│  └─────┬──────┘  └─────┬──────┘  └─────┬──────┘  └─────┬─────┘ │
│        │               │               │               │        │
│        └───────────────┼───────────────┼───────────────┘        │
│                        │               │                        │
│              ┌─────────▼───────────────▼──────┐                 │
│              │      Rate Master Engine        │                 │
│              │  (Package / Itemized / Hybrid) │                 │
│              └────────────────────────────────┘                 │
│                                                                  │
│  ┌───────────┐  ┌───────────┐  ┌──────────┐  ┌──────────────┐  │
│  │ GST (18%) │  │ Discounts │  │ Advance  │  │ Refund       │  │
│  │ Handling  │  │ & Schemes │  │ & Deposit │  │ Processing   │  │
│  └───────────┘  └───────────┘  └──────────┘  └──────────────┘  │
└──────────────────────────────────────────────────────────────────┘
```

**Billing models:**
1. **Package billing** (most daycare) — fixed price per procedure
2. **Itemized billing** — individual service charges
3. **Hybrid** — package + additional consumables/complications
4. **PMJAY billing** — HBP (Health Benefit Package) rates
5. **CGHS/ECHS billing** — government rate list
6. **Corporate billing** — employer rate agreements

**Features:**
- Multi-payer split billing (insurance + patient copay)
- GST handling (18% on non-medical services, exempt on healthcare)
- Advance/deposit management
- Refund processing
- Payment gateway integration (UPI, card, net banking, cash)
- Auto-billing triggers (investigation → billing, pharmacy → billing)
- Package management (inclusions, exclusions, validity)
- Dynamic pricing by room category / doctor tier
- Credit period management for corporate/TPA
- Revenue dashboard by specialty, doctor, procedure, payer mix

### 4.12 Insurance & TPA Integration

**Pre-authorization workflow:**
```
Patient Registration → Insurance Verification →
→ Pre-Auth Request → TPA Review →
→ Approval/Query/Denial → Procedure →
→ Discharge Summary → Final Claim →
→ TPA Processing → Payment Reconciliation
```

**Integrations:**
- E-claim submission (standard formats: Vidal Health, Medi Assist, FHPL, Paramount, etc.)
- Real-time eligibility verification
- Pre-auth tracking with TAT monitoring
- Claim status tracking
- Denial management and appeal workflow
- PMJAY portal integration (HBP claim submission)
- ROHINI code mapping (hospital registration)
- Cashless settlement tracking

### 4.13 Discharge & Follow-up

**Daycare discharge workflow:**
```
Post-Procedure Observation → Discharge Criteria Met →
→ Discharge Summary → Medication Counseling →
→ Follow-up Appointment → Billing Settlement →
→ Patient Feedback → Exit
```

**Discharge summary (bilingual):**
- Patient demographics
- Diagnosis (ICD-11 coded)
- Procedure performed
- Findings
- Drugs administered
- Condition at discharge
- Discharge medications (in table format)
- Follow-up instructions
- Warning signs to watch for
- Emergency contact numbers
- Next appointment date
- Doctor's digital signature

**Follow-up:**
- Automated 24-hour post-discharge call scheduling
- 48-hour and 7-day follow-up tracking
- Tele-consultation integration
- Patient-reported outcomes (PRO) collection
- WhatsApp follow-up message templates

### 4.14 Inventory & Supply Chain

**Features:**
- Multi-store management (main store, sub-store, OT store, pharmacy)
- Indenting and issuing workflow
- GRN (Goods Receipt Note)
- Purchase order management
- ABC/VED analysis
- Reorder level alerts
- Expiry alerts (30/60/90 day)
- Implant and high-value consumable tracking (per patient)
- Consignment inventory management
- Vendor management
- Rate contract management
- Drug license tracking (Form 20/21)
- Narcotics register (NDPS compliance)

### 4.15 Quality & Compliance (NABH)

**NABH indicators tracked:**
- Surgical site infection rate
- Re-admission within 48 hours
- Unplanned return to OT
- Adverse drug reaction reporting
- Patient fall rate
- Medication error rate
- Blood transfusion reaction rate
- Hand hygiene compliance
- Consent documentation compliance
- Time-out compliance rate
- Average length of stay (daycare)
- Patient satisfaction score
- Mortality rate (unexpected in daycare)

**Incident reporting:**
- Near-miss reporting
- Adverse event reporting
- Root cause analysis workflow
- CAPA (Corrective and Preventive Action) tracking

### 4.16 MIS & Analytics Dashboard

**Dashboards:**
- Daily daycare census
- Procedure volume by specialty
- Revenue by payer mix
- Doctor-wise productivity
- OT/procedure room utilization
- Average turnaround time per procedure
- Insurance claim status (pending, approved, denied, settled)
- Cancellation/no-show rates
- Patient satisfaction trends
- Clinical quality indicators
- Pharmacy stock alerts
- Revenue cycle KPIs (DSO, denial rate, collection ratio)

---

## 5. Technical Architecture

### 5.1 Stack

| Layer | Technology |
|-------|-----------|
| Frontend | Next.js (App Router), TypeScript, Tailwind CSS |
| State | React Query + Zustand |
| UI Components | Radix UI + custom design system |
| Backend | Node.js (Fastify) / Python (FastAPI) |
| Database | PostgreSQL (primary), Redis (cache/queues) |
| Search | Elasticsearch (patient search, drug search) |
| File Storage | MinIO / S3 (DICOM, documents, images) |
| Messaging | RabbitMQ / Kafka (event-driven) |
| Auth | Keycloak (RBAC, SSO, MFA) |
| Deployment | Docker + Kubernetes (on-premise + cloud hybrid) |
| Mobile | React Native (patient app, doctor app) |

### 5.2 ABDM Integration Architecture

```
┌──────────────────────────────────────────┐
│            EHR Application               │
│                                          │
│  ┌──────────────────────────────────┐    │
│  │      ABDM Gateway Client        │    │
│  │  (HIU + HIP + PHR App)          │    │
│  └──────────┬───────────────────────┘    │
│             │                            │
└─────────────┼────────────────────────────┘
              │ HTTPS (FHIR R4)
              │
┌─────────────▼────────────────────────────┐
│         ABDM Sandbox / Production        │
│                                          │
│  ┌─────────┐  ┌──────┐  ┌────────────┐  │
│  │ Health  │  │ HCX  │  │ Consent    │  │
│  │ ID (ABHA)│ │      │  │ Manager    │  │
│  └─────────┘  └──────┘  └────────────┘  │
│                                          │
│  ┌──────────────────────────────────┐    │
│  │ Health Information Exchange      │    │
│  │ (HIE — pull/push health records) │    │
│  └──────────────────────────────────┘    │
└──────────────────────────────────────────┘
```

**ABDM APIs to integrate:**
- ABHA creation and linking
- Patient consent management
- Health record push (as HIP — Health Information Provider)
- Health record pull (as HIU — Health Information User)
- FHIR R4 document bundles (DiagnosticReport, Prescription, DischargeSummary, OPConsultation)

### 5.3 Data Model (Simplified)

```
Patient
├── Demographics
├── ABHA Link
├── Insurance Policies[]
├── Allergies[]
├── Visit History[]
│   ├── OPD Visit
│   │   ├── Vitals
│   │   ├── Consultation Note
│   │   ├── Prescriptions[]
│   │   └── Investigation Orders[]
│   └── Daycare Admission
│       ├── Pre-Auth
│       ├── Pre-Procedure Assessment
│       ├── Anesthesia Record
│       ├── Consent[]
│       ├── Procedure Note
│       │   ├── WHO Checklist
│       │   ├── Implants/Devices[]
│       │   └── Specimens[]
│       ├── Nursing Observations[]
│       ├── Medication Administration[]
│       ├── Post-Procedure Observation
│       ├── Discharge Summary
│       ├── Billing
│       │   ├── Line Items[]
│       │   ├── Package[]
│       │   └── Payments[]
│       └── Follow-up[]
└── Documents[]
    ├── Lab Reports
    ├── Imaging
    ├── Consent Forms
    └── Referral Letters
```

### 5.4 Interoperability Standards

| Standard | Usage |
|----------|-------|
| **HL7 FHIR R4** | ABDM health record exchange, clinical data |
| **DICOM** | Radiology/imaging integration |
| **ICD-11** | Diagnosis coding |
| **ICD-10-PCS** | Procedure coding |
| **SNOMED CT** | Clinical terminology |
| **LOINC** | Laboratory observation codes |
| **RxNorm / Indian drug codes** | Medication coding |
| **HL7 v2.x** | Legacy lab/radiology equipment integration |

---

## 6. Security & Compliance

### 6.1 Data Protection (DPDP Act 2023)

- Explicit consent for data collection and processing
- Purpose limitation — data used only for healthcare delivery
- Data minimization — collect only what's needed
- Right to erasure (within legal retention limits)
- Data localization — health data stored within India
- Breach notification within 72 hours
- Data Protection Impact Assessment for high-risk processing
- Consent dashboard for patients

### 6.2 Access Control

- Role-based access (RBAC) — 20+ roles (doctor, nurse, pharmacist, billing, admin, etc.)
- Department-level data segregation
- Break-the-glass access for emergencies (with audit)
- IP-based access restrictions
- Session timeout (configurable by role)
- MFA for admin and sensitive operations
- Complete audit trail (who accessed what, when, from where)

### 6.3 Audit & Logging

- Every patient record access logged
- Prescription modification audit trail
- Billing edit audit
- Consent audit
- Login/logout tracking
- Failed access attempt alerting
- NABH audit readiness reports

---

## 7. User Interface Design Principles

### 7.1 Design Philosophy
- **Speed-first**: Daycare workflow moves fast — every screen must load in <200ms
- **Glanceable**: Critical info (allergies, alerts, pending consents) visible without clicks
- **Indian context**: Bilingual support, UPI QR for payments, WhatsApp integration
- **Touch-friendly**: Tablet-optimized for bedside and OT use (iPad/Android tablets)
- **Dark mode**: For OT and procedure room usage
- **Offline-capable**: Tier 2/3 city internet reliability — queue actions offline, sync when online

### 7.2 Key Screens (Prototype Scope)

1. **Login** — MFA, role selection, department context
2. **Patient search** — ABHA scan, name search, phone search, UHID
3. **Patient registration** — ABDM-linked registration flow
4. **OPD queue / Token display** — Waiting room TV display mode
5. **Doctor consultation** — SOAP note with specialty-specific templates
6. **Daycare admission** — Pre-auth + assessment wizard
7. **Consent capture** — Digital consent with signature pad
8. **WHO checklist** — Interactive Sign-In / Time-Out / Sign-Out
9. **Procedure note** — Template-based with image upload
10. **Anesthesia chart** — Real-time vitals timeline
11. **Nursing observation** — Vitals, I/O, pain, medication
12. **Pharmacy** — Prescription fulfillment, drug dispensing
13. **Lab dashboard** — Pending samples, results entry, report generation
14. **Billing** — Package selection, itemized billing, payment modes
15. **Insurance** — Pre-auth submission, claim tracking dashboard
16. **Discharge summary** — Auto-generated, bilingual, digitally signed
17. **MIS dashboard** — CEO/admin view with KPIs
18. **Procedure room board** — Today's schedule, status tracking (like an airport departure board)

### 7.3 Color System

| Token | Value | Usage |
|-------|-------|-------|
| bg-primary | `#0F172A` | App background (dark mode) |
| bg-surface | `#1E293B` | Cards, panels |
| bg-elevated | `#334155` | Modals, dropdowns |
| accent-primary | `#06B6D4` | Primary actions, links |
| accent-success | `#10B981` | Confirmed, approved, completed |
| accent-warning | `#F59E0B` | Pending, attention needed |
| accent-danger | `#EF4444` | Critical alerts, allergies, errors |
| accent-info | `#3B82F6` | Informational |
| text-primary | `#F1F5F9` | Primary text |
| text-secondary | `#94A3B8` | Secondary/muted text |
| border | `#334155` | Borders, dividers |

**Specialty accent colors (for visual differentiation):**
- Ophthalmology: `#8B5CF6` (purple)
- Cardiology: `#EF4444` (red)
- Orthopedics: `#F97316` (orange)
- Oncology: `#EC4899` (pink)
- Nephrology: `#14B8A6` (teal)
- Gastro: `#EAB308` (yellow)
- (Each specialty gets a unique accent for quick visual identification)

---

## 8. Prototype Build Plan

### Phase 1 — Foundation (Core Patient Journey)
- Patient registration with ABHA mock
- Appointment booking
- OPD consultation with 3 specialty templates
- Basic billing (cash + package)
- Discharge summary generation

### Phase 2 — Daycare Workflow
- Daycare admission wizard
- Consent capture with digital signature
- WHO surgical safety checklist
- Procedure note templates (5 specialties)
- Post-procedure observation
- Nursing charting

### Phase 3 — Ancillary Systems
- Pharmacy module
- Lab module with reporting
- Radiology module with DICOM viewer mock
- Anesthesia charting

### Phase 4 — Revenue & Insurance
- Insurance pre-auth workflow
- TPA integration mock
- PMJAY billing
- Advanced billing (split payment, corporate)
- Revenue dashboard

### Phase 5 — Advanced Features
- All 16 specialty templates
- Implant tracking registry
- Quality indicators dashboard (NABH)
- Patient mobile app mock
- WhatsApp integration mock
- ABDM health record exchange mock

---

## 9. Indian Market References

### 9.1 Existing Players
| Product | Segment | Notes |
|---------|---------|-------|
| Practo Ray | Clinic/OPD | Limited daycare |
| BahmniEMR | Open-source, hospital | ABDM compliant |
| Health-e | ABDM-focused | Government partnership |
| Eka Care | PHR + clinic | Patient-facing |
| DocPlix | Clinic management | OPD-focused |
| HINT (NHA) | ABDM compliance kit | Reference implementation |
| HIS (CDAC) | Government hospitals | E-Hospital platform |

### 9.2 Gap in Market
No existing product offers a **daycare-first EHR** with:
- All 16 daycare specialties pre-built
- Indian regulatory compliance (ABDM + NABH + PMJAY) out of the box
- Package-based billing as the default (not an afterthought)
- Same-day admission-to-discharge optimized workflow
- Tier 2/3 city deployment readiness (offline, low-bandwidth)

### 9.3 Market Size
- Indian healthcare IT market: ₹21,000 Cr (2025), growing 18% CAGR
- Daycare surgery market: ₹12,500 Cr (2025), growing 22% CAGR
- 50,000+ daycare facilities across India (estimated)
- ABDM has 600M+ ABHA IDs created (as of 2025)
- PMJAY covers 500M+ beneficiaries

---

## 10. Glossary

| Term | Meaning |
|------|---------|
| ABHA | Ayushman Bharat Health Account (14-digit health ID) |
| ABDM | Ayushman Bharat Digital Mission |
| HIP | Health Information Provider |
| HIU | Health Information User |
| TPA | Third Party Administrator (insurance) |
| PMJAY | Pradhan Mantri Jan Arogya Yojana |
| CGHS | Central Government Health Scheme |
| ECHS | Ex-Servicemen Contributory Health Scheme |
| NABH | National Accreditation Board for Hospitals |
| NABL | National Accreditation Board for Testing and Calibration Laboratories |
| ROHINI | Registry of Hospitals in Network of Insurance |
| NPO | Nil Per Os (nothing by mouth) |
| PAC | Pre-Anesthesia Checkup |
| PACU | Post-Anesthesia Care Unit |
| MAR | Medication Administration Record |
| SBAR | Situation, Background, Assessment, Recommendation |
| CAPA | Corrective and Preventive Action |
| HBP | Health Benefit Package (PMJAY procedure rates) |
| FHIR | Fast Healthcare Interoperability Resources |
| DICOM | Digital Imaging and Communications in Medicine |
| PCPNDT | Pre-Conception and Pre-Natal Diagnostic Techniques Act |

---

*Document version: 1.0 — April 2026*
*Prepared for: Vivekanand Choudhari Portfolio — EHR Daycare Prototype*
