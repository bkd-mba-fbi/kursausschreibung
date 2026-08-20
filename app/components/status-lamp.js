import Component from '@glimmer/component';
import { getString } from 'kursausschreibung/framework/translate';

const STATUSES = {
  green: {
    tooltip: getString('greenLamp'),
    className: 'lamp-green',
    icon: 'pencil',
  },
  chartreuse: {
    tooltip: getString('chartreuseLamp'),
    className: 'lamp-chartreuse',
    icon: 'check',
  },
  yellow: {
    tooltip: getString('yellowLamp'),
    className: 'lamp-yellow',
    icon: 'clock',
  },
  red: { tooltip: getString('redLamp'), className: 'lamp-red', icon: 'close' },
  orange: {
    tooltip: getString('orangeLamp'),
    className: 'lamp-orange',
    icon: 'ban',
  },
};

export default class StatusLampComponent extends Component {
  get statusConfig() {
    return STATUSES[this.args.status] ?? null;
  }

  get tooltip() {
    return this.statusConfig?.tooltip;
  }

  get colorClass() {
    return this.statusConfig?.className ?? '';
  }

  get icon() {
    return this.statusConfig?.icon;
  }
}
