export type StatItem = {
  value: string;
  label: string;
};

export type StepItem = {
  title: string;
  body: string;
};

export type SymptomGroup = {
  heading: string;
  items: string[];
};

export type SupplementalSection =
  | {
      type: 'stats';
      items: StatItem[];
    }
  | {
      type: 'prose';
      heading: string;
      eyebrow?: string;
      paragraphs: string[];
    }
  | {
      type: 'symptoms';
      heading: string;
      eyebrow?: string;
      description?: string;
      groups: SymptomGroup[];
    }
  | {
      type: 'steps';
      heading: string;
      eyebrow?: string;
      description?: string;
      steps: StepItem[];
    }
  | {
      type: 'bullets';
      heading: string;
      eyebrow?: string;
      items: string[];
    };

export type SupplementalData = {
  sections: SupplementalSection[];
};
