'use client';

import { useMemo, useState } from 'react';

const plans = {
  'EYEMED': {
    note: 'Use Good / Best pairings only. EyeMed progressives are now Varilux only.',
    highlights: ['EyeMed progressives = Varilux only', 'Gray only for Hoya Sensity SV jobs'],
    quick: {
      sv: {
        best: 'Poly Kodak Clean & CleAR UV or Shore Select Blue',
        good: 'Poly Viso XC',
        transitions: 'Poly Hoya Sensity 2 EX3 + AR (Gray only)',
        sunglasses: 'Poly Polarized with Xperio UV',
      },
      progressive: {
        best: 'Poly Varilux XR Design with Crizal Sapphire or Crizal Prevencia',
        good: 'Poly Varilux Comfort Max with Crizal Sapphire or Crizal Prevencia',
        transitions: 'Poly Varilux XR Design with Crizal Sapphire and Transitions Gen S / XTRActive',
        sunglasses: 'Poly Polarized Varilux XR Design with Xperio UV',
      }
    },
    details: {
      singleVision: {
        lenses: ['Poly', 'Hi-Index'],
        ar: {
          'Best AR': 'Kodak Clean & CleAR, Shore Select Blue',
          'Good AR': 'Viso XC',
          'Standard': 'Sharpview+ (No UV protection)',
        },
        photochromic: 'Hoya Sensity 2 EX3 + AR (Gray only)',
        rules: ['Always add UV charge with any AR.']
      },
      flatTop: {
        lenses: ['Poly', 'Hi-Index'],
        ar: {
          'Tier 3': 'Crizal Sapphire, Prevencia, Rock',
          'Tier 2': 'Crizal Easy Pro',
          'Tier 1': 'Crizal Easy, Xperio UV',
          'Standard': 'Sharpview+ (No UV protection)'
        },
        photochromic: 'Transitions Gen S / XTRActive',
        rules: ['Always add UV charge with any AR.']
      },
      progressive: {
        lenses: ['Varilux Physio W3+ / Extensee', 'Varilux Comfort Max', 'Varilux Comfort DRx', 'Essilor Natural'],
        ar: {
          'Premium AR': 'Crizal Sapphire, Prevencia, Rock',
          'Mid AR': 'Crizal Easy Pro',
          'Entry AR': 'Crizal Easy, Xperio UV',
          'Standard': 'Sharpview+ (No UV protection)'
        },
        photochromic: 'Transitions Gen S / XTRActive',
        rules: ['No Kodak progressives for EyeMed.', 'Always add UV charge with any AR.']
      }
    }
  },
  'VSP': {
    note: 'Use Crizal Rock / Prevencia as primary premium ARs whenever available.',
    highlights: ['Prioritize Crizal Rock and Prevencia', 'Good / Best only'],
    quick: {
      sv: {
        best: 'Poly Crizal Rock or Prevencia',
        good: 'Poly Kodak Clean & CleAR',
        transitions: 'Poly Crizal Rock and Transitions Gen S (Gray only)',
        sunglasses: 'Poly Polarized with Xperio UV',
      },
      progressive: {
        best: 'Poly Varilux XR Design with Crizal Sapphire or Crizal Prevencia',
        good: 'Poly Varilux Comfort Max with Crizal Sapphire or Crizal Prevencia',
        transitions: 'Poly Varilux XR Design with Crizal Sapphire and Transitions Gen S / XTRActive',
        sunglasses: 'Poly Polarized Varilux XR Design with Xperio UV',
      }
    },
    details: {
      singleVision: {
        lenses: ['Poly', 'Hi-Index'],
        ar: {
          'Category D': 'Crizal Rock, Prevencia',
          'Category C': 'Kodak Clean & CleAR, Xperio UV',
          'Category A': 'Sharpview+ (No UV protection)'
        },
        photochromic: 'Crizal Rock with Transitions Gen S (Gray only)',
        rules: ['Always add UV charge with any AR.', 'For Xperio UV, use Category C AR (no UV charge).']
      },
      flatTop: {
        lenses: ['Poly', 'Hi-Index'],
        ar: {
          'Category D': 'Crizal Sapphire, Prevencia, Rock',
          'Category C': 'Crizal Easy Pro, Xperio UV',
          'Category B': 'Crizal Easy',
          'Category A': 'Sharpview+ (No UV protection)'
        },
        photochromic: 'Transitions Gen S / XTRActive',
        rules: ['Always add UV charge with any AR.']
      },
      progressive: {
        lenses: ['Varilux XR, Physio Extensee', 'Varilux X Design', 'Comfort Max', 'Essilor Natural', 'Varilux Immersia'],
        ar: {
          'Category D': 'Crizal Sapphire, Prevencia, Rock',
          'Category C': 'Crizal Easy Pro, Xperio UV',
          'Category B': 'Crizal Easy',
          'Category A': 'Sharpview+ (No UV protection)'
        },
        photochromic: 'Transitions Gen S / XTRActive',
        rules: ['Always add UV charge with any AR.']
      }
    }
  },
  'DAVIS / SUPERIOR': {
    note: 'Kodak progressives are allowed for Davis / Superior.',
    highlights: ['Kodak progressives allowed', 'Gray only for Hoya Sensity SV jobs'],
    quick: {
      sv: {
        best: 'Poly Kodak Clean & CleAR UV or Shore Select Blue',
        good: 'Poly Viso XC',
        transitions: 'Poly Hoya Sensity 2 EX3 + AR (Gray only)',
        sunglasses: 'Poly Polarized with Xperio UV',
      },
      progressive: {
        best: 'Poly Kodak Unique DRO HD with Total CleAR or Crizal Prevencia',
        good: 'Poly Kodak Unique with Total CleAR or Crizal Prevencia',
        transitions: 'Poly Kodak Unique DRO HD with Total CleAR and Transitions Gen S / XTRActive',
        sunglasses: 'Poly Polarized Kodak Unique with Xperio UV',
      }
    },
    details: {
      singleVision: {
        lenses: ['Poly', 'Hi-Index'],
        ar: {
          'Ultimate': 'Kodak Clean & CleAR, Shore Select Blue',
          'Ultra': 'Viso XC',
          'Standard': 'Sharpview+ (No UV protection)'
        },
        photochromic: 'Hoya Sensity 2 EX3 + AR (Gray only)',
        rules: ['Always add UV charge with any AR.', 'Transitions should be entered as Plastic Photosensitive Lenses.']
      },
      flatTop: {
        lenses: ['Poly', 'Hi-Index'],
        ar: {
          'Ultimate': 'Crizal Sapphire, Prevencia, Rock',
          'Ultra': 'Crizal Easy Pro',
          'Standard': 'Sharpview+ (No UV protection)'
        },
        photochromic: 'Transitions Gen S / XTRActive',
        rules: ['Always add UV charge with any AR.']
      },
      progressive: {
        lenses: ['Kodak Unique DRO HD', 'Kodak Unique', 'Varilux Immersia', 'Essilor Natural'],
        ar: {
          'Ultimate': 'Kodak Total CleAR, Prevencia',
          'Ultra': 'Kodak Clean & CleAR UV',
          'Standard': 'Sharpview+ (No UV protection)'
        },
        photochromic: 'Transitions Gen S / XTRActive',
        rules: ['Always add UV charge with any AR.']
      }
    }
  },
  'SPECTERA': {
    note: 'No backside UV charge for Spectera.',
    highlights: ['No backside UV charge', 'Varilux-based progressive strategy'],
    quick: {
      sv: {
        best: 'Poly Crizal Sapphire or Crizal Prevencia',
        good: 'Poly Crizal Easy Pro',
        transitions: 'Poly Crizal Sapphire and Transitions Gen S / XTRActive',
        sunglasses: 'Poly Polarized with Xperio UV',
      },
      progressive: {
        best: 'Poly Varilux XR Design with Crizal Sapphire or Prevencia',
        good: 'Poly Varilux Comfort Max with Crizal Sapphire or Prevencia',
        transitions: 'Poly Varilux XR Design with Crizal Sapphire and Transitions Gen S / XTRActive',
        sunglasses: 'Poly Polarized Varilux XR Design with Xperio UV',
      }
    },
    details: {
      singleVision: {
        lenses: ['Poly', 'Hi-Index'],
        ar: {
          'Tier IV': 'Crizal Sapphire, Rock, Prevencia',
          'Tier III': 'Crizal Easy Pro, Xperio UV',
          'Tier II': 'Crizal Easy',
          'Tier I': 'Sharpview+ (No UV protection)'
        },
        photochromic: 'Transitions Gen S / XTRActive',
        rules: ['No backside UV charge for Spectera.']
      },
      flatTop: {
        lenses: ['Poly', 'Hi-Index'],
        ar: {
          'Tier IV': 'Crizal Sapphire, Prevencia, Rock',
          'Tier III': 'Crizal Easy Pro, Xperio UV',
          'Tier II': 'Crizal Easy',
          'Tier I': 'Sharpview+ (No UV protection)'
        },
        photochromic: 'Transitions Gen S / XTRActive',
        rules: ['No backside UV charge for Spectera.']
      },
      progressive: {
        lenses: ['Varilux XR', 'Varilux Physio Extensee', 'Varilux Comfort Max', 'Varilux Comfort DRx', 'Essilor Natural / Immersia'],
        ar: {
          'Tier IV': 'Crizal Sapphire, Prevencia, Rock',
          'Tier III': 'Crizal Easy Pro, Xperio UV',
          'Tier II': 'Crizal Easy',
          'Tier I': 'Sharpview+ (No UV protection)'
        },
        photochromic: 'Transitions Gen S / XTRActive',
        rules: ['No backside UV charge for Spectera.']
      }
    }
  },
  'VBA': {
    note: 'VBA includes published internal pricing references and a Varilux-centered progressive ladder.',
    highlights: ['Prism no-copay note', 'Varilux pricing ladder'],
    quick: {
      sv: {
        best: 'Poly Crizal Sapphire or Crizal Prevencia',
        good: 'Poly Crizal Easy Pro',
        transitions: 'Poly Crizal Sapphire and Transitions Gen S / XTRActive',
        sunglasses: 'Poly Polarized with Xperio UV',
      },
      progressive: {
        best: 'Poly Varilux XR Design with Crizal Sapphire or Prevencia',
        good: 'Poly Varilux Comfort Max with Crizal Sapphire or Prevencia',
        transitions: 'Poly Varilux XR Design with Crizal Sapphire and Transitions Gen S / XTRActive',
        sunglasses: 'Poly Polarized Varilux XR Design with Xperio UV',
      }
    },
    details: {
      singleVision: {
        lenses: ['Poly', 'Hi-Index', 'EyeZen (Digital Lens) - $48'],
        ar: {
          'Ultra': '$94 - Crizal Sapphire, Prevencia',
          'Premium 2': '$81 - Crizal Rock',
          'Premium 1': '$69 - Crizal Easy Pro / Xperio UV',
          'Standard 2': '$52 - Crizal Easy',
          'Standard 1': '$31 - Sharpview'
        },
        photochromic: 'Transitions Gen S / XTRActive',
        rules: ['Always add UV charge with any AR.']
      },
      flatTop: {
        lenses: ['Poly', 'Hi-Index'],
        ar: {
          'Ultra': '$94 - Crizal Sapphire, Prevencia',
          'Premium 2': '$81 - Crizal Rock',
          'Premium 1': '$69 - Crizal Easy Pro / Xperio UV',
          'Standard 2': '$52 - Crizal Easy'
        },
        photochromic: 'Transitions Gen S / XTRActive',
        rules: ['Always add UV charge with any AR.']
      },
      progressive: {
        lenses: ['D ($220) Varilux XR', 'V ($175) Varilux Physio Extensee', 'C ($130) Comfort Max', 'B ($90) Comfort DRx', 'A ($65) Essilor Natural'],
        ar: {
          'Ultra': '$94 - Crizal Sapphire, Prevencia',
          'Premium 2': '$81 - Crizal Rock',
          'Premium 1': '$69 - Crizal Easy Pro / Xperio UV',
          'Standard 2': '$52 - Crizal Easy'
        },
        photochromic: 'Transitions Gen S / XTRActive',
        rules: ['Always add UV charge with any AR.']
      }
    }
  },
  'NVA': {
    note: 'Kodak progressives are allowed for NVA.',
    highlights: ['Kodak progressives allowed', 'Good / Best only'],
    quick: {
      sv: {
        best: 'Poly Kodak Clean & CleAR UV or Shore Select Blue',
        good: 'Poly Viso XC',
        transitions: 'Poly Hoya Sensity 2 EX3 + AR (Gray only)',
        sunglasses: 'Poly Polarized with Xperio UV',
      },
      progressive: {
        best: 'Poly Kodak Unique DRO HD with Total CleAR or Crizal Prevencia',
        good: 'Poly Kodak Unique with Total CleAR or Crizal Prevencia',
        transitions: 'Poly Kodak Unique DRO HD with Total CleAR and Transitions Gen S / XTRActive',
        sunglasses: 'Poly Polarized Kodak Unique with Xperio UV',
      }
    },
    details: {
      singleVision: {
        lenses: ['Poly', 'Hi-Index'],
        ar: {
          'Ultra': 'Kodak Clean & CleAR, Shore Select Blue',
          'Premium': 'Viso XC',
          'Standard': 'Sharpview+ (No UV protection)'
        },
        photochromic: 'Hoya Sensity 2 EX3 + AR (Gray only)',
        rules: ['Always add UV charge with any AR.', 'For Xperio UV use Premium T2 AR.']
      },
      flatTop: {
        lenses: ['Poly', 'Hi-Index'],
        ar: {
          'Ultra': 'Crizal Sapphire, Prevencia, Rock',
          'Premium T3': 'Crizal Easy Pro',
          'Premium T2': 'Crizal Easy, Xperio UV',
          'Standard T1': 'Sharpview+ (No UV protection)'
        },
        photochromic: 'Transitions Gen S / XTRActive',
        rules: ['Always add UV charge with any AR.']
      },
      progressive: {
        lenses: ['Premium T4 Kodak Unique DRO HD / Varilux Immersia', 'Premium T3 Kodak Unique', 'Standard T2 Essilor Natural'],
        ar: {
          'Ultra T4': 'Kodak Total CleAR, Prevencia',
          'Premium T3': 'Kodak Clean & CleAR UV',
          'Premium T2': 'Xperio UV',
          'Standard T1': 'Sharpview+'
        },
        photochromic: 'Transitions Gen S / XTRActive',
        rules: ['Always add UV charge with any AR.']
      }
    }
  },
  'PRIVATE PAY': {
    note: 'Use package pricing and keep recommendations tight.',
    highlights: ['Package pricing', 'No extra UV / blue light charge'],
    quick: {
      sv: {
        best: 'Poly Kodak Clean & CleAR UV or Shore Select Blue',
        transitions: 'Poly Hoya Sensity 2 EX3 + AR (Gray only)',
        sunglasses: 'Poly Polarized with Xperio UV',
      },
      progressive: {
        best: 'Poly Varilux XR Design with Crizal Sapphire or Prevencia',
        good: 'Poly Varilux Physio Extensee with Crizal Sapphire or Prevencia',
        value: 'Poly Varilux Comfort Max with Crizal Sapphire or Prevencia',
      }
    },
    details: {
      singleVision: {
        lenses: ['Poly', 'Hi-Index'],
        ar: {
          'Premium': 'Kodak Clean & CleAR, Shore Select Blue',
          'Crizal Premium': 'Crizal Sapphire, Rock, Prevencia'
        },
        photochromic: 'Hoya Sensity 2 EX3 + AR (Gray only)',
        rules: ['Use package pricing.']
      },
      flatTop: {
        lenses: ['Poly', 'Hi-Index'],
        ar: {
          'Premium': 'Crizal Sapphire, Prevencia, Rock',
          'Good': 'Crizal Easy Pro',
          'Value': 'Crizal Easy'
        },
        photochromic: 'Transitions Gen S / XTRActive',
        rules: []
      },
      progressive: {
        lenses: ['Best Varilux XR', 'Good Varilux Physio Extensee', 'Value Varilux Comfort Max', 'Also available Varilux Comfort DRx / Immersia'],
        ar: {
          'Premium': 'Crizal Sapphire, Prevencia, Rock',
          'Good': 'Crizal Easy Pro',
          'Value': 'Crizal Easy'
        },
        photochromic: 'Transitions Gen S / XTRActive',
        rules: []
      }
    }
  }
};

const pricing = {
  base: [
    ['Single Vision', '$70'],
    ['EyeZen (add to SV)', '$70'],
    ['Bi-Focal', '$110'],
    ['Tri-Focal', '$120'],
    ['PR - Varilux Comfort DRx', '$260'],
    ['PR - Varilux Immersia', '$260'],
    ['PR - Varilux Comfort Max', '$370'],
    ['PR - Varilux Physio Extensee / Kodak Unique', '$410'],
    ['PR - Varilux X Design / Kodak Unique DRO HD', '$510'],
    ['PR - Varilux XR Design', '$580'],
  ],
  materials: [
    ['Polycarbonate', '$55'],
    ['Trivex', '$65'],
    ['Hi-Index 1.60', '$80'],
    ['Hi-Index 1.67', '$110'],
    ['Hi-Index 1.74', '$160'],
  ],
  addons: [
    ['Transitions (all types)', '$110'],
    ['Polarized (no UV protection)', '$100'],
    ['Xperio UV (add on to Polarized)', '$130'],
    ['UV Protection', '$30'],
    ['Tint', '$40'],
    ['Prism', '$30'],
    ['Flash Mirror', '$90'],
  ]
};

function Choice({ label, value, tone = '' }: { label: string; value: string; tone?: string }) {
  return (
    <div className={`choice ${tone}`}>
      <div className="label">{label}</div>
      <div className="value">{value}</div>
    </div>
  );
}

function DetailCard({ title, data }: { title: string; data: any }) {
  return (
    <div className="card">
      <h3>{title}</h3>
      <div className="muted small">Photochromic: {data.photochromic}</div>
      <div style={{ marginTop: 14 }}>
        <div className="label">Lens options</div>
        <div className="pills" style={{ marginTop: 10 }}>
          {data.lenses.map((item: string) => <div className="pill" key={item}>{item}</div>)}
        </div>
      </div>
      <div className="choices" style={{ marginTop: 14 }}>
        {Object.entries(data.ar).map(([k, v]) => (
          <Choice key={k} label={k} value={String(v)} />
        ))}
      </div>
      {data.rules && data.rules.length > 0 ? (
        <div className="rule-box">
          <div className="label">Rules</div>
          <ul>
            {data.rules.map((rule: string) => <li key={rule}>{rule}</li>)}
          </ul>
        </div>
      ) : null}
    </div>
  );
}

export default function Page() {
  const planNames = Object.keys(plans);
  const [selectedPlan, setSelectedPlan] = useState('EYEMED');
  const [mode, setMode] = useState<'quick' | 'full'>('quick');
  const [lensType, setLensType] = useState<'sv' | 'progressive'>('progressive');
  const [goal, setGoal] = useState('best');
  const [search, setSearch] = useState('');

  const filteredPlans = useMemo(() => {
    return planNames.filter(name => name.toLowerCase().includes(search.toLowerCase()));
  }, [search]);

  const plan = plans[selectedPlan as keyof typeof plans];

  const quickRecommendation = useMemo(() => {
    const bucket = plan.quick[lensType];
    return (bucket as any)[goal] || 'No option listed for this selection.';
  }, [plan, lensType, goal]);

  return (
    <main className="page">
      <section className="hero">
        <div className="hero-top">
          <div>
            <div className="eyebrow">Blackstone Eye Center</div>
            <h1>Optical Ordering Portal</h1>
            <p>
              A faster, staff-friendly internal site for plan lookup, approved Good / Best pairings,
              progressive guidance, and pricing reference.
            </p>
            <div className="badges">
              <div className="badge green">Good / Best guided</div>
              <div className="badge blue">Plan-specific workflow</div>
              <div className="badge amber">Ordering guardrails built in</div>
            </div>
          </div>
        </div>
      </section>

      <section className="grid-top">
        <div className="card">
          <h2>Plan Lookup</h2>
          <div className="muted">Search for a plan, then click to load its approved options.</div>
          <div className="stack" style={{ marginTop: 14 }}>
            <input
              className="input"
              placeholder="Search plan..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
            <div className="plan-list">
              {filteredPlans.map((name) => (
                <button
                  className={`plan-btn ${selectedPlan === name ? 'active' : ''}`}
                  onClick={() => setSelectedPlan(name)}
                  key={name}
                >
                  {name}
                </button>
              ))}
            </div>
          </div>
          <div className="warning">
            <strong>Hard rule:</strong> Do not pair high-tier lenses with low-tier AR. Use only the approved combinations shown for each plan.
          </div>
        </div>

        <div className="card">
          <h2>Quick Recommendation</h2>
          <div className="muted">Choose a plan, lens type, and target level to get an approved pairing instantly.</div>
          <div className="stack" style={{ marginTop: 14 }}>
            <select className="select" value={selectedPlan} onChange={(e) => setSelectedPlan(e.target.value)}>
              {planNames.map((name) => <option key={name}>{name}</option>)}
            </select>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
              <select className="select" value={lensType} onChange={(e) => setLensType(e.target.value as any)}>
                <option value="sv">Single Vision</option>
                <option value="progressive">Progressive</option>
              </select>
              <select className="select" value={goal} onChange={(e) => setGoal(e.target.value)}>
                <option value="best">Best</option>
                <option value="good">Good</option>
                <option value="transitions">Transitions</option>
                <option value="sunglasses">Sunglasses</option>
                <option value="value">Value</option>
              </select>
            </div>
            <div className="quick-box">
              <div className="quick-title">Approved Pairing</div>
              <div className="quick-value">{quickRecommendation}</div>
            </div>
          </div>
        </div>
      </section>

      <section className="grid-main">
        <aside className="card">
          <h2>Staff Rules</h2>
          <div className="choices" style={{ marginTop: 14 }}>
            <Choice label="Rule 1" value="Use Good / Best options only unless management approves an exception." tone="best" />
            <Choice label="Rule 2" value="Do not mix premium lenses with basic AR coatings." tone="warn" />
            <Choice label="Rule 3" value="EyeMed progressives are Varilux only. Do not use Kodak progressives." tone="best" />
            <Choice label="Rule 4" value="Gray is the standard photochromic color where noted." />
            <Choice label="Rule 5" value="If a request falls outside the sheet, stop and ask before ordering." tone="good" />
          </div>
        </aside>

        <section>
          <div className="card">
            <div className="topline">
              <div>
                <h2>{selectedPlan}</h2>
                <div className="muted">{plan.note}</div>
              </div>
              <div className="highlight-list">
                {plan.highlights.map((item) => <div className="highlight" key={item}>{item}</div>)}
              </div>
            </div>

            <div className="segment">
              <button className={mode === 'quick' ? 'active' : ''} onClick={() => setMode('quick')}>Quick Picks</button>
              <button className={mode === 'full' ? 'active' : ''} onClick={() => setMode('full')}>Full Plan Details</button>
            </div>

            {mode === 'quick' ? (
              <div className="columns">
                <div className="card" style={{ padding: 16 }}>
                  <h3>Single Vision</h3>
                  <div className="choices">
                    {(plan.quick.sv as any).best ? <Choice label="Best" value={(plan.quick.sv as any).best} tone="best" /> : null}
                    {(plan.quick.sv as any).good ? <Choice label="Good" value={(plan.quick.sv as any).good} tone="good" /> : null}
                    {(plan.quick.sv as any).transitions ? <Choice label="Transitions" value={(plan.quick.sv as any).transitions} tone="warn" /> : null}
                    {(plan.quick.sv as any).sunglasses ? <Choice label="Sunglasses" value={(plan.quick.sv as any).sunglasses} /> : null}
                  </div>
                </div>

                <div className="card" style={{ padding: 16 }}>
                  <h3>Progressive</h3>
                  <div className="choices">
                    {(plan.quick.progressive as any).best ? <Choice label="Best" value={(plan.quick.progressive as any).best} tone="best" /> : null}
                    {(plan.quick.progressive as any).good ? <Choice label="Good" value={(plan.quick.progressive as any).good} tone="good" /> : null}
                    {(plan.quick.progressive as any).value ? <Choice label="Value" value={(plan.quick.progressive as any).value} /> : null}
                    {(plan.quick.progressive as any).transitions ? <Choice label="Transitions" value={(plan.quick.progressive as any).transitions} tone="warn" /> : null}
                    {(plan.quick.progressive as any).sunglasses ? <Choice label="Sunglasses" value={(plan.quick.progressive as any).sunglasses} /> : null}
                  </div>
                </div>
              </div>
            ) : (
              <div className="detail-grid">
                <DetailCard title="Single Vision" data={plan.details.singleVision} />
                <DetailCard title="Flat Top" data={plan.details.flatTop} />
                <DetailCard title="Progressive" data={plan.details.progressive} />
              </div>
            )}
          </div>

          <div className="card" style={{ marginTop: 18 }}>
            <h2 className="section-title">Retail Pricing Reference</h2>
            <div className="pricing-grid">
              <div className="pricing-block">
                <h3>Base</h3>
                {pricing.base.map(([label, value]) => <Choice key={label} label={label} value={value} />)}
              </div>
              <div className="pricing-block">
                <h3>Materials</h3>
                {pricing.materials.map(([label, value]) => <Choice key={label} label={label} value={value} />)}
              </div>
              <div className="pricing-block">
                <h3>Add-ons</h3>
                {pricing.addons.map(([label, value]) => <Choice key={label} label={label} value={value} />)}
              </div>
            </div>
          </div>

          <div className="card" style={{ marginTop: 18, background: 'linear-gradient(135deg,#0f172a,#1e293b)', color: 'white' }}>
            <h2>Staff Reminders</h2>
            <div className="footer-notes">
              <div className="choice warn">
                <div className="label">Transitions</div>
                <div className="value">Use gray where noted. Avoid XTRActive unless the plan and job type support it.</div>
              </div>
              <div className="choice">
                <div className="label">Sunglasses</div>
                <div className="value">Standard sun pairing is Poly Polarized + Xperio UV unless the plan says otherwise.</div>
              </div>
              <div className="choice best">
                <div className="label">EyeMed</div>
                <div className="value">Progressives are Varilux only. No Kodak progressives for EyeMed.</div>
              </div>
              <div className="choice good">
                <div className="label">Escalation</div>
                <div className="value">If a patient asks for something outside the approved sheet, stop and check before ordering.</div>
              </div>
            </div>
          </div>
        </section>
      </section>
    </main>
  );
}