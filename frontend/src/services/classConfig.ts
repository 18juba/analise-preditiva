export const CLASS_CONFIG: Record<number, {
  label: string;
  modifier: string;
  message: string;
}> = {
  0: {
    label: 'Sem acidente',
    modifier: 'result-card--safe',
    message: '✅ Fluxo normal.',
  },
  1: {
    label: 'Acidente de trânsito moderado',
    modifier: 'result-card--moderado',
    message: '⚠️ Autoridades de trânsito notificadas.',
  },
  2: {
    label: 'Acidente de trânsito grave',
    modifier: 'result-card--grave',
    message: '⚠️ Serviços de emergência notificados.',
  },
};